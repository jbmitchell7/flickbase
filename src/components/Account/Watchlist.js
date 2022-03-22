import React from 'react';
import { ScrollView, StyleSheet, FlatList } from 'react-native'
import { Text, Button } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { connect } from 'react-redux';
import { useFocusEffect } from '@react-navigation/native';

import { setWatchlist } from '../../actions/actions';
import { fetchGet, fetchPost } from '../../api/tmdb';
import MediaCover from '../MediaCover';
import colors from '../../assets/colors';

const Watchlist = (props) => {
  const { watchlist, loginStatus } = props;
  let myLists = [];

  const createFlickbaseList = async () => {
    try {
      const watchlistRes = await fetchPost(`/4/list`,
        {
          name: "Flickbase Watchlist",
          iso_639_1: "eng"
        }
      );
      console.log(watchlistRes.results);
    }
    catch (error) {
      console.log('error creating watchlist');
      console.log(error);
    }
  }

  useFocusEffect(
    React.useCallback(() => {
      let isActive = true;

      const getWatchlist = async () => {
        try {
          const id = await AsyncStorage.getItem('userId');
          const listRes = await fetchGet(`/4/account/${id}/lists`);
          let results = listRes.results;
          let fbList = results.find(list => list.name === 'Flickbase Watchlist');
          if (isActive && fbList) {
            props.setWatchlist(fbList);
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

  if (!loginStatus) {
    return (
      <ScrollView>
        <Text style={styles.header}>Watchlist</Text>
        <Text>Must be logged in to view watchlist</Text>
      </ScrollView>
    )
  }

  if (watchlist.length == 0) {
    return (
      <ScrollView>
        <Text style={styles.header}>Watchlist</Text>
        <Text style={styles.watchlistMsg}>You have not created a watchlist for flickbase yet.</Text>
        <Button
          color={colors.yellow}
          dark={true}
          mode='outlined'
          style={styles.yellowBtn}
          onPress={() => createFlickbaseList()}>
          Create Flickbase Watchlist
        </Button>
      </ScrollView>
    )
  }

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
  yellowBtn: {
    marginBottom: 20,
    alignSelf: 'center'
  },
  watchlistMsg: {
    marginBottom: 20,
    marginHorizontal: 20
  }
});

const mapStateToProps = state => {
  return {
    watchlist: state.watchlist,
    loginStatus: state.loginStatus
  }
}

export default connect(mapStateToProps, { setWatchlist })(Watchlist);
