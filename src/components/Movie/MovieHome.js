import React, { useState } from 'react';
import { ScrollView, StyleSheet, SafeAreaView, SectionList, FlatList } from 'react-native';
import { Text } from 'react-native-paper';
import { useFocusEffect } from '@react-navigation/native';

import { fetchGet } from '../../api/tmdb';
import MediaCover from '../MediaCover';

const MovieHome = (props) => {
    const [dataLoaded, setDataLoaded] = useState(false);
    const [popularMovies, setPopularMovies] = useState([]);
    const [trendingMovies, setTrendingMovies] = useState([]);
    const [topRatedMovies, setTopRatedMovies] = useState([]);
    const [nowPlayingMovies, setNowPlayingMovies] = useState([]);
    const [upcomingMovies, setUpcomingMovies] = useState([]);

    const SECTIONS = [
        {
            title: 'Popular',
            data: popularMovies
        },
        {
            title: 'Trending This Week',
            data: trendingMovies
        },
        {
            title: 'Now Playing',
            data: nowPlayingMovies
        },
        {
            title: 'Upcoming',
            data: upcomingMovies
        },
        {
            title: 'Top Rated',
            data: topRatedMovies
        }
    ];

    useFocusEffect(
        React.useCallback(() => {
            let isActive = true;

            const getMovieData = async () => {
                try {
                    if (isActive) {

                        const newPopular = await fetchGet(`/3/movie/popular`);
                        setPopularMovies(newPopular.results);

                        const newTrending = await fetchGet(`/3/trending/movie/week`);
                        setTrendingMovies(newTrending.results);

                        const newTopRated = await fetchGet(`/3/movie/top_rated`);
                        setTopRatedMovies(newTopRated.results);

                        const newNowPlaying = await fetchGet(`/3/movie/now_playing`);
                        setNowPlayingMovies(newNowPlaying.results);

                        const newUpcoming = await fetchGet(`/3/movie/upcoming`);
                        setUpcomingMovies(newUpcoming.results);

                        setDataLoaded(true);
                    }
                }
                catch (error) {
                    throw new Error('error getting home movie data');
                }
            };

            getMovieData();

            return () => {
                isActive = false;
            };
        }, [])
    );

    return (
        <ScrollView>
            {dataLoaded ? <SafeAreaView style={styles.background}>
                <SectionList
                    contentContainerStyle={{ paddingHorizontal: 10 }}
                    stickySectionHeadersEnabled={false}
                    sections={SECTIONS}
                    showsVerticalScrollIndicator={false}
                    renderSectionHeader={({ section }) => (
                        <>
                            <Text style={styles.sectionHeader}>{section.title}</Text>
                            <FlatList
                                horizontal
                                data={section.data}
                                renderItem={({ item }) => <MediaCover media={item} key={item.id} navigation={props.navigation} page='home' />}
                                showsHorizontalScrollIndicator={false}
                                keyExtractor={item => item.id}
                            />
                        </>
                    )}
                    renderItem={() => {
                        return null;
                    }}
                />
            </SafeAreaView> : null}
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    header: {
        marginTop: 40,
        marginBottom: 20,
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

export default MovieHome