import React from 'react';
import { View } from 'react-native';
import { Text } from 'react-native-paper';

import WatchlistBtn from '../WatchlistBtn';

const MovieInfo = (props) => {
    const { movie, styles } = props
    return (
        <View style={styles.textContainer}>
            <Text style={styles.titleText}>{movie.title}</Text>
            <Text style={styles.bioText}>Synopsis: {movie.overview}</Text>
            <Text style={styles.bioText}>Release Date: {movie.release_date}</Text>
            <Text style={styles.bioText}>Budget: {movie.budget}</Text>
            <WatchlistBtn label='Add to Watchlist' media={movie} type="movie" />
        </View>
    )
}


export default MovieInfo;