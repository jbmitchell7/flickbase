import React from 'react';
import { View, Image, StyleSheet } from 'react-native';
import { Text } from 'react-native-paper';

import WatchlistBtn from '../WatchlistBtn';
import { IMAGE_URL } from '../ImageComponent';

const MovieInfo = (props) => {
    const { movie, styles, onToggleSnackBar, streamers } = props
    return (
        <View style={styles.textContainer}>
            <Text style={styles.titleText}>{movie.title}</Text>
            <Text style={styles.bioText}>Synopsis: {movie.overview}</Text>
            <Text style={styles.bioText}>Release Date: {movie.release_date}</Text>
            <Text style={styles.bioText}>Budget: {movie.budget}</Text>
            <Text style={styles.bioText}>Streaming With Subscription On:</Text>
            <View style={imageStyles.imageContainer}>
                {streamers.map(provider => (
                    <Image style={imageStyles.image} key={provider.provider_id} source={{ uri: `${IMAGE_URL}${provider.logo_path}` }} />
                ))}
            </View>
            <WatchlistBtn media={movie} type="movie" onToggleSnackBar={onToggleSnackBar} />
        </View>
    )
}

export const imageStyles = StyleSheet.create({
    image: {
        width: 60,
        height: 60,
        marginHorizontal: 5
    },
    imageContainer: {
        marginBottom: 30,
        display: 'flex',
        flexDirection: 'row'
    }
})

export default MovieInfo;