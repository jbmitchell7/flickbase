import React, { useState } from 'react';
import { View, StyleSheet, SafeAreaView, SectionList, FlatList } from 'react-native';
import { connect } from 'react-redux';
import { Text } from 'react-native-paper';
import { useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { setPopular, setTrending, setTopRated, setLoginStatus } from '../../actions/actions';
import { fetchGet } from '../../api/tmdb';
import MediaBtn from '../MediaBtn';
import MediaCover from '../MediaCover';

const Home = (props) => {
    const [media, setMedia] = useState('movie');
    const [dataLoaded, setDataLoaded] = useState(false);
    const { trending, popular, topRated } = props;

    const SECTIONS = [
        {
            title: 'Popular',
            data: popular
        },
        {
            title: 'Trending This Week',
            data: trending
        },
        {
            title: 'Top Rated',
            data: topRated
        }
    ];

    useFocusEffect(
        React.useCallback(() => {
            let isActive = true;

            const getHomeData = async () => {
                try {
                    if (isActive) {

                        const newPopular = await fetchGet(`/3/${media}/popular`);
                        props.setPopular(newPopular.results);

                        const newTrending = await fetchGet(`/3/trending/${media}/week`);
                        props.setTrending(newTrending.results);

                        if (media != 'person') {
                            const newTopRated = await fetchGet(`/3/${media}/top_rated`);
                            props.setTopRated(newTopRated.results);
                        }

                        const userLoggedIn = await AsyncStorage.getItem('token');
                        if (userLoggedIn != null) {
                            props.setLoginStatus(true);
                        }

                        setDataLoaded(true);
                    }
                }
                catch (error) {
                    throw new Error('error getting home movie data');
                }
            };

            getHomeData();

            return () => {
                setDataLoaded(false);
                isActive = false;
            };
        }, [media])
    );

    return (
        <View style={styles.background}>
            <Text style={styles.header}>Flickbase</Text>
            <View style={styles.buttonContainer}>
                <MediaBtn
                    label='Movies'
                    setMedia={setMedia}
                    mediaState={media}
                    media='movie'
                    icon='movie-open' />
                <MediaBtn
                    label='TV'
                    setMedia={setMedia}
                    mediaState={media}
                    media='tv'
                    icon='television-classic' />
                <MediaBtn
                    label='People'
                    setMedia={setMedia}
                    mediaState={media}
                    media='person'
                    icon='account' />
            </View>
            <SafeAreaView style={styles.background}>
                {dataLoaded ?
                    <SectionList
                        contentContainerStyle={{ paddingHorizontal: 10 }}
                        stickySectionHeadersEnabled={false}
                        sections={SECTIONS}
                        extraData={media}
                        showsVerticalScrollIndicator={false}
                        renderSectionHeader={({ section }) => (
                            <>
                                <Text style={styles.sectionHeader}>{section.title}</Text>
                                <FlatList
                                    horizontal
                                    data={section.data}
                                    extraData={media}
                                    renderItem={({ item }) => <MediaCover media={item} key={item.id} navigation={props.navigation} page='home' />}
                                    showsHorizontalScrollIndicator={false}
                                    keyExtractor={item => item.id}
                                />
                            </>
                        )}
                        renderItem={() => {
                            return null;
                        }}
                    /> : null}
            </SafeAreaView>
        </View>
    )
}

const styles = StyleSheet.create({
    header: {
        marginVertical: 40,
        marginHorizontal: 20,
        fontSize: 30,
    },
    sectionHeader: {
        marginVertical: 20,
        marginHorizontal: 20,
        fontSize: 20,
    },
    background: {
        flex: 1
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'center'
    }
})

const mapStateToProps = state => {
    return {
        popular: state.popular,
        trending: state.trending,
        topRated: state.topRated,
        loginStatus: state.loginStatus
    }
}

export default connect(
    mapStateToProps, {
    setPopular,
    setTrending,
    setTopRated,
    setLoginStatus
})(Home);