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
                            if (watchProviders.results.US) {
                                setStreamers(watchProviders.results.US.flatrate);
                            }
                            if (mediaCredits.cast) {
                                setCast(mediaCredits.cast);
                                //setCrew(mediaCredits.crew);
                            }
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
                            <PersonInfo person={choice} styles={styles} />
                            : <TvShowInfo show={choice} styles={styles} onToggleSnackBar={onToggleSnackBar} streamers={streamers} />}
                    {(mediaType == 'movie' || mediaType == 'tv') ?
                        <View style={styles.lastText}>
                            <Text style={styles.bioText}>
                                Total Ratings: {choice.vote_count} | Average Rating: {choice.vote_average}/10
                            </Text>
                            {(cast) ?
                                <>
                                    <Text style={styles.bioText}>Cast: </Text>
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
                                : <Text style={styles.personText}>Cast Unavailable</Text>
                            }
                            <Text style={styles.bioText}>Streaming With Subscription On:</Text>

                            <View style={styles.imageContainer}>
                                {(streamers.length > 0) ?
                                    streamers.map(provider => (
                                        <Image style={styles.image} key={provider.provider_id} source={{ uri: `${IMAGE_URL}${provider.logo_path}` }} />
                                    ))
                                    : <Text style={styles.streamText}>Not available to stream</Text>
                                }
                            </View>
                            <WatchlistBtn media={choice} type={mediaType} onToggleSnackBar={onToggleSnackBar} />
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

    bioText: {
        marginVertical: 10
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
        marginHorizontal: 5,
        color: colors.yellow
    },
    personImage: {
        width: 70,
        height: 70,
        marginHorizontal: 5,
        marginVertical: 5
    },
});

const mapStateToProps = state => {
    const { choice } = state;
    return { choice };
}

export default connect(mapStateToProps, { setChoice })(MediaInfo);