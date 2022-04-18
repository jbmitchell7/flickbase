import React, { useState } from 'react';
import { StyleSheet, SectionList, FlatList, View } from 'react-native';
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

    if (dataLoaded) {
        return (
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
                            renderItem={({ item }) => (
                                <View style={styles.movieCard}>
                                    <MediaCover media={item} key={item.id} navigation={props.navigation} />
                                    <Text style={styles.movieText}>{item.title}</Text>
                                </View>
                            )}
                            showsHorizontalScrollIndicator={false}
                            keyExtractor={item => item.id}
                        />
                    </>
                )}
                renderItem={() => {
                    return null;
                }}
            />
        )
    }

    return (
        <Text>Loading...</Text>
    )

}

const styles = StyleSheet.create({
    sectionHeader: {
        marginVertical: 20,
        marginHorizontal: 20,
        fontSize: 20,
    },
    movieCard: {
        flex: 1,
        flexWrap: 'wrap',
        width: 160
    },
    movieText: {
        marginHorizontal: 5
    }
})

export default MovieHome