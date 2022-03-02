import React from 'react';
import { ScrollView, StyleSheet, Image, View } from 'react-native';
import { Text, Button } from 'react-native-paper';
import colors from '../assets/colors';

const IMAGE_URL = "https://image.tmdb.org/t/p/w400";

const dateConvert = (date) => {
    const converted = date.split('-')
    const convertedObj = {
        year: converted[0],
        month: converted[1],
        day: converted[2]
    }
    return convertedObj;
}

const MovieInfo = (props) => {
    const { movie } = props.route.params;
    const movieRelease = dateConvert(movie.release_date);

    return (
        <ScrollView>
            <View style={styles.textContainer}>
                <Text style={styles.titleText}>{movie.title}</Text>
                <Text style={styles.synopsisText}>Synopsis: {movie.overview}</Text>
                <Text>Release Date: {movieRelease.month}-{movieRelease.day}-{movieRelease.year}</Text>
                <Text>{movie.budget}</Text>
                <Button mode='contained'
                    accessibilityLabel='add to watchlist'
                    dark={true}
                    style={styles.watchlistBtn}
                    color={colors.yellow}>
                    Add to Watchlist
                </Button>
            </View>
            <View style={styles.imageContainer}>
                <Image style={styles.image} source={`${IMAGE_URL}${movie.poster_path}`} />
            </View>
        </ScrollView>
    )

};

const styles = StyleSheet.create({

    textContainer: {
        flex: 1,
        justifyContent: 'center',
        marginHorizontal: 20,
        marginBottom: 20,
    },

    titleText: {
        fontWeight: 'bold',
        fontSize: 25,
        marginBottom: 20,
    },

    synopsisText: {
        marginBottom: 10
    },

    watchlistBtn: {
        marginTop: 20,
        width: 200,
        alignSelf: 'center'
    },

    imageContainer: {
        width: '100%',
        height: 400,
        marginBottom: 25,
        borderRadius: 15,
        overflow: 'hidden',
        paddingTop: 20
    },

    image: {
        flex: 1,
        width: null,
        height: null,
        resizeMode: 'contain'
    },
});


export default MovieInfo;