import React from 'react';
import { View, Image, StyleSheet } from 'react-native';
import { Text } from 'react-native-paper';

import WatchlistBtn from '../WatchlistBtn';
import { IMAGE_URL } from '../ImageComponent';
import { dateConvert } from '../MediaInfo';

//{dateConvert(movie.release_date)}

const MovieInfo = (props) => {
    const { movie, styles, onToggleSnackBar, streamers } = props;

    const convertDollars = (number) => {
        return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    return (
        <View style={styles.textContainer}>
            <Text style={styles.titleText}>{movie.title}</Text>
            <Text style={styles.bioText}>Synopsis: {movie.overview}</Text>
            <Text style={styles.bioText}>Release Date: {movie.release_date}</Text>
            {(movie.budget) ?
                <Text style={styles.bioText}>
                    Budget: ${convertDollars(movie.budget)}
                </Text> :
                <Text style={styles.bioText}>
                    Budget: N/A
                </Text>
            }
            {(movie.revenue) ?
                <Text style={styles.bioText}>
                    Revenue: ${convertDollars(movie.revenue)}
                </Text> :
                <Text style={styles.bioText}>
                    Revenue: N/A
                </Text>
            }
            <Text style={styles.bioText}>
                Total Ratings: {movie.vote_count} | Average Rating: {movie.vote_average}/10
            </Text>
            <Text style={styles.bioText}>Streaming With Subscription On:</Text>

            <View style={mediaInfoStyles.imageContainer}>
                {(streamers) ?
                    streamers.map(provider => (
                        <Image style={mediaInfoStyles.image} key={provider.provider_id} source={{ uri: `${IMAGE_URL}${provider.logo_path}` }} />
                    ))
                    : <Text style={mediaInfoStyles.streamText}>Not available to stream</Text>
                }
            </View>
            <WatchlistBtn media={movie} type="movie" onToggleSnackBar={onToggleSnackBar} />
        </View>
    )
}

export const mediaInfoStyles = StyleSheet.create({
    image: {
        width: 60,
        height: 60,
        marginHorizontal: 5
    },
    imageContainer: {
        marginBottom: 30,
        display: 'flex',
        flexDirection: 'row'
    },
    streamText: {
        marginHorizontal: 20
    }
})

export default MovieInfo;