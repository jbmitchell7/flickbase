import React from 'react';
import { View } from 'react-native';
import { Text } from 'react-native-paper';


const MovieInfo = (props) => {
    const { movie, styles } = props;

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
        </View>
    )
}

export default MovieInfo;