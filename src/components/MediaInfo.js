import React, { useState } from 'react';
import { ScrollView, StyleSheet, View, Image, FlatList, TouchableOpacity } from 'react-native';
import { Text } from 'react-native-paper';
import { connect } from 'react-redux';
import { useFocusEffect } from '@react-navigation/native';

import MovieInfo from './Movie/MovieInfo';
import PersonInfo from './Person/PersonInfo';
import TvShowInfo from './TvShow/TvShowInfo';
import { setChoice } from '../actions/actions';
import { fetchGet } from '../api/tmdb';
import ImageComponent from './ImageComponent';
import WatchlistBtn from './WatchlistBtn';
import Snack from './Snack';
import { IMAGE_URL } from './ImageComponent';
import colors from '../assets/colors';

export const dateConvert = (dateInput) => {
    let year = dateInput.substr(0, 4);
    let month = dateInput.substr(5, 2);
    let day = dateInput.substr(8, 2);
    let date = `${month}-${day}-${year}`;
    return date
}

const MediaInfo = (props) => {
    const { mediaId, mediaType } = props.route.params;
    const { choice } = props;
    const [visible, setVisible] = useState(false);
    const [snackText, setSnackText] = useState('');
    const [streamers, setStreamers] = useState([]);
    const [cast, setCast] = useState([]);
    const [crew, setCrew] = useState([]);
    const [movieCredits, setMovieCredits] = useState([]);
    const [tvCredits, setTvCredits] = useState([]);

    const onToggleSnackBar = (result) => {
        setVisible(!visible);
        setSnackText(result);
    };

    const onDismissSnackBar = () => setVisible(false);

    useFocusEffect(
        React.useCallback(() => {
            let isActive = true;

            const getMedia = async () => {
                try {
                    if (isActive) {
                        const mediaResponse = await fetchGet(`/3/${mediaType}/${mediaId}`);
                        props.setChoice(mediaResponse);
                        if (mediaType != 'person') {
                            const watchProviders = await fetchGet(`/3/${mediaType}/${mediaId}/watch/providers`);
                            const mediaCredits = await fetchGet(`/3/${mediaType}/${mediaId}/credits`);
                            const providers = watchProviders.results.US.flatrate;
                            if (providers.length > 0) {
                                setStreamers(providers);
                            }
                            if (mediaCredits.cast) {
                                setCast(mediaCredits.cast);
                                //setCrew(mediaCredits.crew);
                            }
                        }
                        if (mediaType == 'person') {
                            const movieResponse = await fetchGet(`/3/${mediaType}/${mediaId}/movie_credits`);
                            const tvResponse = await fetchGet(`/3/${mediaType}/${mediaId}/tv_credits`);
                            setMovieCredits(movieResponse.cast);
                            setTvCredits(tvResponse.cast);
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
                        <MovieInfo movie={choice} styles={styles} onToggleSnackBar={onToggleSnackBar} streamers={streamers} />
                        : (mediaType == 'person') ?
                            <PersonInfo person={choice} styles={styles} movieCredits={movieCredits} tvCredits={tvCredits} navigation={props.navigation} />
                            : <TvShowInfo show={choice} styles={styles} onToggleSnackBar={onToggleSnackBar} streamers={streamers} />}
                    {(mediaType == 'movie' || mediaType == 'tv') ?
                        <View style={styles.lastText}>
                            <Text style={styles.bioText}>
                                <Text style={styles.bioTextHeader}>Total Ratings: </Text>
                                <Text>{choice.vote_count}</Text>
                                <Text style={styles.bioTextHeader}> Average Rating: </Text>
                                <Text>{choice.vote_average}/10</Text>
                            </Text>
                            <Text style={[styles.bioTextHeader, styles.bioText]}>Cast: </Text>
                            {(cast) ?
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
                                                <Text style={styles.personText}>{item.name}</Text>
                                            </TouchableOpacity>
                                        )}
                                        showsHorizontalScrollIndicator={false}
                                        keyExtractor={item => item.id}
                                    />
                                </>
                                : <Text style={styles.bioText}>Cast Unavailable</Text>
                            }
                            <Text style={[styles.bioTextHeader, styles.bioText]}>Streaming With Subscription in the US On:</Text>

                            <View style={styles.imageContainer}>
                                {(streamers.length > 0) ?
                                    streamers.map(provider => (
                                        <Image style={styles.image} key={provider.provider_id} source={{ uri: `${IMAGE_URL}${provider.logo_path}` }} />
                                    ))
                                    : <Text style={styles.streamText}>Not available to stream.</Text>
                                }
                            </View>
                            <View style={styles.buttonContainer}>
                                <WatchlistBtn media={choice} type={mediaType} onToggleSnackBar={onToggleSnackBar} buttonType='add' />
                                <WatchlistBtn media={choice} type={mediaType} onToggleSnackBar={onToggleSnackBar} buttonType='remove' />
                            </View>
                        </View> : null}
                    <Snack
                        visible={visible}
                        onDismissSnackBar={onDismissSnackBar}
                        snackText={snackText} />
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
        flexWrap: 'wrap',
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
});

const mapStateToProps = state => {
    const { choice } = state;
    return { choice };
}

export default connect(mapStateToProps, { setChoice })(MediaInfo);