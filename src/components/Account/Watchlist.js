import React from 'react';
import { ScrollView, StyleSheet, FlatList } from 'react-native'
import { Text } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { connect } from 'react-redux';
import { useFocusEffect } from '@react-navigation/native';

import { setWatchlist } from '../../actions/actions';
import { fetchGet } from '../../api/tmdb';
import MediaCover from '../MediaCover';

const Watchlist = (props) => {
  const { watchlist, loginStatus } = props;

  if (!loginStatus) {
    return (
      <ScrollView>
        <Text style={styles.header}>Watchlist</Text>
        <Text>Must be logged in to view watchlist</Text>
      </ScrollView>
    )
  }

  useFocusEffect(
    React.useCallback(() => {
      let isActive = true;

      const getWatchlist = async () => {
        try {
          const id = await AsyncStorage.getItem('userId');
          const watchlistRes = await fetchGet(`/4/account/${id}/movie/watchlist`);
          if (isActive) {
            props.setWatchlist(watchlistRes.results);
          }
        }
        catch (error) {
          console.log('error getting watchlist');
          console.log(error);
        }
      }

      getWatchlist();

      return () => {
        isActive = false;
      };
    }, [])
  );

  return (
    <ScrollView>
      <Text style={styles.header}>Watchlist</Text>
      {watchlist.map(m => (
        <MediaCover key={m.id} media={m} navigation={props.navigation} />
      ))}
      <FlatList
        data={watchlist}
        renderItem={({ item }) => (
          <MediaCover media={item} key={item.id} navigation={props.navigation} />
        )}
        keyExtractor={item => item.id}
        numColumns={2}
      />
    </ScrollView>
  )

}

const styles = StyleSheet.create({
  header: {
    fontSize: 30,
    marginVertical: 40,
    marginHorizontal: 20,
  },
});

const mapStateToProps = state => {
  return {
    watchlist: state.watchlist,
    loginStatus: state.loginStatus
  }
}

export default connect(mapStateToProps, { setWatchlist })(Watchlist);
