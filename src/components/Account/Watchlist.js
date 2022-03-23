import React, { useState } from 'react';
import { StyleSheet, FlatList, SafeAreaView } from 'react-native'
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
  const [fbWatchlist, setFbWatchlist] = useState([]);

  const createFlickbaseList = async () => {
    try {
      const watchlistRes = await fetchPost(`/4/list`,
        {
          name: "Flickbase Watchlist",
          iso_639_1: "en"
        }
      );
      setFbWatchlist(watchlistRes.results)
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
          //searches for existing flickbase watchlist
          let fbListData = results.find(list => list.name === 'Flickbase Watchlist');
          // if screen is active and a flickbase watchlist exists,
          // sets watchlist state to existing watchlist
          if (isActive && fbListData) {
            let listId = fbListData.id;
            const fbList = await fetchGet(`/4/list/${listId}`);
            props.setWatchlist(fbList.results);
            await AsyncStorage.setItem('watchlistId', listId);
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
    }, [fbWatchlist])
  );

  if (!loginStatus) {
    return (
      <SafeAreaView style={styles.viewContainer}>
        <Text style={styles.header}>Watchlist</Text>
        <Text>Must be logged in to view watchlist</Text>
      </SafeAreaView>
    )
  }

  if (watchlist.length == 0) {
    return (
      <SafeAreaView style={styles.viewContainer}>
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
      </SafeAreaView>
    )
  }

  return (
    <SafeAreaView style={styles.viewContainer}>
      <Text style={styles.header}>Watchlist</Text>
      <FlatList
        data={watchlist}
        renderItem={({ item }) => (
          <MediaCover media={item} key={item.id} navigation={props.navigation} />
        )}
        keyExtractor={item => item.id}
        numColumns={2}
      />
    </SafeAreaView>
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
    padding: 1,
    alignSelf: 'center'
  },
  watchlistMsg: {
    marginBottom: 20,
    marginHorizontal: 20
  },
  viewContainer: {
    flex: 1
  }
});

const mapStateToProps = state => {
  return {
    watchlist: state.watchlist,
    loginStatus: state.loginStatus
  }
}

export default connect(mapStateToProps, { setWatchlist })(Watchlist);
