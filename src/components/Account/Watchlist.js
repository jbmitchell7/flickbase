import React, { useState } from 'react';
import { StyleSheet, FlatList, SafeAreaView, ScrollView, View } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import { Text, Button } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { connect } from 'react-redux';
import { useFocusEffect } from '@react-navigation/native';

import { setWatchlist } from '../../actions/actions';
import { fetchGet, fetchPost } from '../../api/tmdb';
import colors from '../../assets/colors';
import ListCard from '../ListCard';

const Watchlist = (props) => {
  const { watchlist, loginStatus, watchlistChanged } = props;
  const [fbWatchlist, setFbWatchlist] = useState([]);
  const [hasWatchlist, setHasWatchlist] = useState(false);
  const [totalPages, setTotalPages] = useState(1);
  const [watchlistPage, setWatchlistPage] = useState(1);
  const [filterBy, setFilterBy] = useState('primary_release_date.desc');

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
                  const fbList = await fetchGet(`/4/list/${listId}?page=${watchlistPage}&sort_by=${filterBy}`);
                  if (fbList) {
                    setHasWatchlist(true);
                    setTotalPages(fbList.total_pages);
                    props.setWatchlist(fbList.results);
                  }
                }
              }
            }
            if (watchlistId) {
              const fbList = await fetchGet(`/4/list/${watchlistId}?page=${watchlistPage}&sort_by=${filterBy}`);
              if (fbList) {
                setHasWatchlist(true);
                setTotalPages(fbList.total_pages);
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
    }, [fbWatchlist, watchlistPage, filterBy, watchlistChanged])
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

  if (!loginStatus) {
    return (
      <SafeAreaView style={styles.viewContainer}>
        <Text style={styles.header}>Watchlist</Text>
        <Text style={styles.watchlistMsg}>Must be logged in to view watchlist.</Text>
      </SafeAreaView>
    )
  }

  if (!hasWatchlist) {
    return (
      <SafeAreaView style={styles.viewContainer}>
        <Text style={styles.header}>Watchlist</Text>
        <Text style={styles.watchlistMsg}>You have not created a watchlist for Flickbase yet.</Text>
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
    <>
      <Text style={styles.header}>Watchlist</Text>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.pickerContainer}>
          <RNPickerSelect
            value={filterBy}
            style={pickerStyle}
            onValueChange={(value, index) => setFilterBy(value)}
            items={[
              { label: 'Release Date (Newest First)', value: 'primary_release_date.desc' },
              { label: 'Release Date (Oldest First)', value: 'primary_release_date.asc' },
              { label: 'Title (A->Z)', value: 'title.asc' },
              { label: 'Title (Z->A)', value: 'title.desc' },
              { label: 'Rating (Highest First)', value: 'vote_average.desc' },
              { label: 'Rating (Lowest First)', value: 'vote_average.asc' },
              { label: 'Recently Added (Recents First)', value: 'original_order.desc' },
              { label: 'Recently Added (Oldest First)', value: 'original_order.asc' }
            ]}
          />
        </View>
        <FlatList
          data={watchlist}
          keyExtractor={item => item.id}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => (
            <ListCard media={item} navigation={props.navigation} type='watchlist' />
          )}
        />
        {(totalPages > 1) ?
          <View style={styles.pageBtns}>
            {(watchlistPage != 1) ?
              <Button
                color={colors.yellow}
                dark={true}
                icon='arrow-left-circle'
                mode='contained'
                style={styles.pageBtn}
                onPress={() => setWatchlistPage(watchlistPage - 1)}>
                Prev
              </Button> : null
            }
            {(watchlistPage != totalPages) ?
              <Button
                color={colors.yellow}
                dark={true}
                icon='arrow-right-circle'
                mode='contained'
                style={styles.pageBtn}
                onPress={() => setWatchlistPage(watchlistPage + 1)}>
                Next
              </Button> : null}
          </View> : null}
      </ScrollView>
    </>
  )
}

const pickerStyle = {
  inputIOS: {
    color: 'white',
    backgroundColor: colors.yellow
  },
  placeholder: {
    color: 'white',
  },
  inputAndroid: {
    color: 'white',
    backgroundColor: colors.yellow,
  },
};

const styles = StyleSheet.create({
  header: {
    fontSize: 25,
    marginTop: 40,
    marginBottom: 20,
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
  pageBtns: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  pageBtn: {
    padding: 1,
    marginBottom: 20,
    marginHorizontal: 5
  },
  pickerContainer: {
    marginHorizontal: 50,
    marginBottom: 20
  }
});

const mapStateToProps = state => {
  return {
    watchlist: state.watchlist,
    watchlistChanged: state.watchlistChanged,
    loginStatus: state.loginStatus
  }
}

export default connect(mapStateToProps, { setWatchlist })(Watchlist);
