import React from 'react';
import { View } from 'react-native';
import { Text, Button } from 'react-native-paper';

import colors from '../../assets/colors';

const MovieInfo = (props) => {
    const { movie, styles } = props
    return (
        <View style={styles.textContainer}>
            <Text style={styles.titleText}>{movie.title}</Text>
            <Text style={styles.bioText}>Synopsis: {movie.overview}</Text>
            <Text style={styles.bioText}>Release Date: {movie.release_date}</Text>
            <Text style={styles.bioText}>Budget: {movie.budget}</Text>
            <Button mode='contained'
                accessibilityLabel='add to watchlist'
                dark={true}
                style={styles.watchlistBtn}
                color={colors.yellow}>
                Add to Watchlist
            </Button>
        </View>
    )
}


export default MovieInfo;