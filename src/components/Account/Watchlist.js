import React from 'react';
import { ScrollView, StyleSheet } from 'react-native'
import { Text } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { connect } from 'react-redux';
import { useFocusEffect } from '@react-navigation/native';

import { setWatchlist } from '../../actions/actions';
import { fetchGet } from '../../api/tmdb';
import { MediaCover } from '../MediaCover';

const Watchlist = (props) => {
  const { watchlist } = props;

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
        <Text key={m.id}>{m.title}</Text>
        // <MediaCover key={m.id} media={m} navigation={props.navigation} />
      ))}
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
  }
}

export default connect(mapStateToProps, { setWatchlist })(Watchlist);
