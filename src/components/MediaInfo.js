import React, { useState } from 'react';
import { ScrollView, StyleSheet, View, Image, FlatList, TouchableOpacity, Linking } from 'react-native';
import { Button, Text } from 'react-native-paper';
import { connect } from 'react-redux';
import { useFocusEffect } from '@react-navigation/native';

import MovieInfo from './Movie/MovieInfo';
import PersonInfo from './Person/PersonInfo';
import TvShowInfo from './TvShow/TvShowInfo';
import { setChoice } from '../actions/actions';
import { fetchGet } from '../api/tmdb';
import ImageComponent from './ImageComponent';
import WatchlistBtn from './WatchlistBtn';
import { IMAGE_URL } from './ImageComponent';
import colors from '../assets/colors';
import Streamers from './Streamers';

const YOUTUBE_URL = 'https://www.youtube.com/watch?v=';

const MediaInfo = (props) => {
    const { mediaId, mediaType } = props.route.params;
    const { choice } = props;
    const [streamers, setStreamers] = useState([]);
    const [freeStreamers, setFreeStreamers] = useState([]);
    const [cast, setCast] = useState([]);
    const [crew, setCrew] = useState([]);
    const [movieCredits, setMovieCredits] = useState([]);
    const [tvCredits, setTvCredits] = useState([]);
    const [movieCrew, setMovieCrew] = useState([]);
    const [tvCrew, setTvCrew] = useState([]);
    const [videos, setVideos] = useState([]);

    const openVideo = async (key) => {
        try {
            Linking.openURL(`${YOUTUBE_URL}${key}`);
        }
        catch (error) {
            throw new Error('error getting trailer');
        }
    };

    useFocusEffect(
        React.useCallback(() => {
            let isActive = true;

            const getMedia = async () => {
                try {
                    if (isActive) {
                        const mediaResponse = await fetchGet(`/3/${mediaType}/${mediaId}`);
                        props.setChoice(mediaResponse);
                        if (mediaType != 'person') {
                            const mediaCredits = await fetchGet(`/3/${mediaType}/${mediaId}/credits`);
                            const cast = mediaCredits.cast;
                            if (cast.length > 0) {
                                setCast(mediaCredits.cast);
                                setCrew(mediaCredits.crew);
                            }

                            const watchProviders = await fetchGet(`/3/${mediaType}/${mediaId}/watch/providers`);
                            if (watchProviders.results.hasOwnProperty('US')) {
                                const providers = watchProviders.results.US;
                                if (providers.hasOwnProperty('flatrate')) {
                                    setStreamers(providers.flatrate);
                                }
                                if (providers.hasOwnProperty('free')) {
                                    setFreeStreamers(providers.free);
                                }
                            }
                            const videos = await fetchGet(`/3/${mediaType}/${mediaId}/videos`);
                            if (videos) {
                                const videoList = videos.results;
                                const trailers = videoList.filter(video => video.type == 'Trailer' && video.site == "YouTube");
                                setVideos(trailers);
                            }
                        }
                        if (mediaType == 'person') {
                            const movieResponse = await fetchGet(`/3/${mediaType}/${mediaId}/movie_credits`);
                            const tvResponse = await fetchGet(`/3/${mediaType}/${mediaId}/tv_credits`);
                            setMovieCredits(movieResponse.cast);
                            setTvCredits(tvResponse.cast);
                            setMovieCrew(movieResponse.crew);
                            setTvCrew(tvCrew.crew);
                        }
                    }
                }
                catch (error) {
                    throw new Error('error getting media');
                }
            }

            getMedia();

            return () => {
                isActive = false;
            }
        }, [])
    );

    if (choice) {
        return (
            <View style={styles.textContainer}>
                <ScrollView
                    stickyHeaderIndices={[2]}
                    showsVerticalScrollIndicator={false}>
                    {(mediaType == 'movie') ?
                        <MovieInfo movie={choice} styles={styles} streamers={streamers} />
                        : (mediaType == 'person') ?
                            <PersonInfo
                                person={choice}
                                styles={styles}
                                movieCredits={movieCredits}
                                tvCredits={tvCredits}
                                movieCrew={movieCrew}
                                tvCrew={tvCrew}
                                navigation={props.navigation} />
                            : <TvShowInfo show={choice} styles={styles} streamers={streamers} />}
                    {(mediaType == 'movie' || mediaType == 'tv') ?
                        <View style={styles.lastText}>
                            <Text style={styles.bioText}>
                                <Text style={styles.bioTextHeader}>Total Ratings: </Text>
                                <Text>{choice.vote_count}</Text>
                                <Text style={styles.bioTextHeader}> Average Rating: </Text>
                                <Text>{choice.vote_average}/10</Text>
                            </Text>
                            <Text style={[styles.bioTextHeader, styles.bioText]}>Cast: </Text>
                            {(cast.length > 0) ?
                                <>
                                    <FlatList
                                        horizontal
                                        data={cast}
                                        renderItem={({ item }) => (
                                            <TouchableOpacity style={styles.personCard} onPress={() => {
                                                props.navigation.push('MediaInfo',
                                                    { mediaId: item.id, mediaType: 'person' }
                                                )
                                            }}>
                                                <Image style={styles.personImage} source={{ uri: `${IMAGE_URL}${item.profile_path}` }} />
                                                <Text style={[styles.personText, styles.personTextBold]}>{item.name}</Text>
                                                <Text style={styles.personText}>{item.character}</Text>
                                            </TouchableOpacity>
                                        )}
                                        showsHorizontalScrollIndicator={false}
                                        keyExtractor={(item, index) => index}
                                    />
                                </>
                                : <Text style={styles.streamText}>Cast Unavailable</Text>
                            }
                            <Text style={[styles.bioTextHeader, styles.bioText]}>Crew: </Text>
                            {(crew.length > 0) ?
                                <>
                                    <FlatList
                                        horizontal
                                        data={crew}
                                        renderItem={({ item }) => (
                                            <TouchableOpacity style={styles.personCard} onPress={() => {
                                                props.navigation.push('MediaInfo',
                                                    { mediaId: item.id, mediaType: 'person' }
                                                )
                                            }}>
                                                <Image style={styles.personImage} source={{ uri: `${IMAGE_URL}${item.profile_path}` }} />
                                                <Text style={[styles.personText, styles.personTextBold]}>{item.name}</Text>
                                                <Text style={styles.personText}>{item.job}</Text>
                                            </TouchableOpacity>
                                        )}
                                        showsHorizontalScrollIndicator={false}
                                        keyExtractor={(item, index) => index}
                                    />
                                </>
                                : <Text style={styles.streamText}>Cast Unavailable</Text>
                            }
                            <Streamers title='Streaming Free ' items={freeStreamers} styles={styles} />
                            <Streamers title='Streaming With Subscription ' items={streamers} styles={styles} />
                            <View style={styles.buttonContainer}>
                                <WatchlistBtn media={choice} type={mediaType} buttonType='add' />
                                <WatchlistBtn media={choice} type={mediaType} buttonType='remove' />
                            </View>
                            {(videos.length > 0) ?
                                <Button
                                    buttonColor={colors.yellow}
                                    style={styles.yellowBtn}
                                    mode='contained'
                                    dark={true}
                                    onPress={() => openVideo(videos[0].key)}>
                                    Watch Trailer
                                </Button> : null}

                        </View> : null}
                    <ImageComponent item={choice} media={mediaType} />
                </ScrollView>
            </View>
        )
    }

    return <Text>Loading...</Text>

}

const styles = StyleSheet.create({

    textContainer: {
        flex: 1,
        justifyContent: 'center',
        marginHorizontal: 20,
    },

    lastText: {
        marginBottom: 20
    },

    titleText: {
        fontWeight: 'bold',
        fontSize: 25,
        marginVertical: 20,
    },

    bioTextHeader: {
        color: colors.yellow
    },

    bioText: {
        marginVertical: 10
    },

    bioTextSummary: {
        marginHorizontal: 5
    },
    buttonContainer: {
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'nowrap',
        justifyContent: 'center'
    },
    watchlistBtn: {
        marginTop: 20,
        width: 200,
        alignSelf: 'center'
    },
    image: {
        width: 60,
        height: 60,
        marginHorizontal: 5,
        marginVertical: 5
    },
    imageContainer: {
        marginBottom: 10,
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap'
    },
    streamText: {
        marginHorizontal: 20
    },
    personCard: {
        display: 'flex',
        width: 80
    },
    personTextBold: {
        fontWeight: 'bold'
    },
    personText: {
        fontSize: 10,
        marginHorizontal: 5
    },
    personImage: {
        width: 70,
        height: 70,
        marginHorizontal: 5,
        marginVertical: 5
    },
    creditImage: {
        width: 64,
        height: 90,
        marginHorizontal: 5,
        marginVertical: 5
    },
    yellowBtn: {
        marginVertical: 20,
        padding: 1,
        marginHorizontal: 5,
        alignSelf: 'center'
    },
});

const mapStateToProps = state => {
    const { choice } = state;
    return { choice };
}

export default connect(mapStateToProps, { setChoice })(MediaInfo);