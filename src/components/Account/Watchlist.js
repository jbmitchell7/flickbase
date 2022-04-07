import React, { useState } from 'react';
import { StyleSheet, FlatList, SafeAreaView, View } from 'react-native'
import { Text, Button } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { connect } from 'react-redux';
import { useFocusEffect } from '@react-navigation/native';

import WatchlistBtn from '../WatchlistBtn';
import Snack from '../Snack';
import { setWatchlist } from '../../actions/actions';
import { fetchGet, fetchPost } from '../../api/tmdb';
import MediaCover from '../MediaCover';
import colors from '../../assets/colors';

const Watchlist = (props) => {
  const { watchlist, loginStatus } = props;
  const [fbWatchlist, setFbWatchlist] = useState([]);
  const [hasWatchlist, setHasWatchlist] = useState(false);
  const [visible, setVisible] = useState(false);
  const [snackText, setSnackText] = useState('');


  useFocusEffect(
    React.useCallback(() => {
      let isActive = true;

      const getWatchlist = async () => {
        try {
          if (isActive) {
            const watchlistId = await AsyncStorage.getItem('watchlistId');
            if (watchlistId == '' || watchlistId == null) {
              const id = await AsyncStorage.getItem('userId');
              const listRes = await fetchGet(`/4/account/${id}/lists`);
              if (listRes) {
                let results = listRes.results;
                let fbListData = results.find(list => list.name === 'Flickbase Watchlist');
                if (fbListData) {
                  let listId = fbListData.id;
                  await AsyncStorage.setItem('watchlistId', listId.toString());
                  const fbList = await fetchGet(`/4/list/${listId}`);
                  if (fbList) {
                    setHasWatchlist(true);
                    props.setWatchlist(fbList.results);
                  }
                }
              }
            }
            if (watchlistId) {
              const fbList = await fetchGet(`/4/list/${watchlistId}`);
              if (fbList) {
                setHasWatchlist(true);
                props.setWatchlist(fbList.results);
              }
            }
          }

        }
        catch (error) {
          await AsyncStorage.setItem('watchlistId', '');
          throw new Error('error getting watchlist');
        }
      }

      getWatchlist();

      return () => {
        isActive = false;
      };
    }, [fbWatchlist, watchlist])
  );

  const createFlickbaseList = async () => {
    try {
      const watchlistRes = await fetchPost(`/4/list`,
        {
          name: "Flickbase Watchlist",
          iso_639_1: "en"
        }
      );
      setFbWatchlist(watchlistRes.id);
      await AsyncStorage.setItem('watchlistId', fbWatchlist.toString());
      setHasWatchlist(true);
    }
    catch (error) {
      throw new Error('error creating watchlist');
    }
  }

  const onToggleSnackBar = (result) => {
    setVisible(!visible);
    setSnackText(result);
  };

  const onDismissSnackBar = () => setVisible(false);

  if (!loginStatus) {
    return (
      <SafeAreaView style={styles.viewContainer}>
        <Text style={styles.header}>Watchlist</Text>
        <Text style={styles.watchlistMsg}>Must be logged in to view watchlist</Text>
      </SafeAreaView>
    )
  }

  if (!hasWatchlist) {
    return (
      <SafeAreaView style={styles.viewContainer}>
        <Text style={styles.header}>Watchlist</Text>
        <Text style={styles.watchlistMsg}>You have not created a watchlist for flickbase yet.</Text>
        <Button
          color={colors.yellow}
          dark={true}
          icon='book-plus'
          mode='contained'
          style={styles.yellowBtn}
          onPress={() => createFlickbaseList()}>
          Create Flickbase Watchlist
        </Button>
      </SafeAreaView>
    )
  }

  if (watchlist.length == 0) {
    return (
      <SafeAreaView style={styles.viewContainer}>
        <Text style={styles.header}>Watchlist</Text>
        <Text style={styles.watchlistMsg}>
          Looks like your watchlist is empty.
          Find movies or TV shows to watch on the home screen
          or search for them with the search function.
        </Text>
      </SafeAreaView>
    )
  }

  return (
    <View style={styles.viewContainer}>
      <Text style={styles.header}>Watchlist</Text>
      <FlatList
        data={watchlist}
        renderItem={({ item }) => (
          <View style={styles.watchlistItemContainer}>
            <MediaCover media={item} key={item.id} navigation={props.navigation} />
            <WatchlistBtn media={item} type={item.media_type} onToggleSnackBar={onToggleSnackBar} />
          </View>
        )}
        keyExtractor={item => item.id}
        showsVerticalScrollIndicator={false}
      />
      <Snack
        visible={visible}
        onDismissSnackBar={onDismissSnackBar}
        snackText={snackText} />
    </View>
  )

}

const styles = StyleSheet.create({
  header: {
    fontSize: 25,
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
  },
  watchlistItemContainer: {
    display: 'flex',
    flexDirection: 'column'
  }
});

const mapStateToProps = state => {
  return {
    watchlist: state.watchlist,
    loginStatus: state.loginStatus
  }
}

export default connect(mapStateToProps, { setWatchlist })(Watchlist);
