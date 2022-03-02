import React from 'react';
import { ScrollView, StyleSheet, Text, Image, View } from 'react-native';

const IMAGE_URL = "https://image.tmdb.org/t/p/w400";

const MovieInfo = (props) => {
    const { movie } = props.route.params;
    
    return (
        <ScrollView>
            <Text>{movie.title}</Text>
            <Text>{movie.overview}</Text>
            <Text>{movie.release_date}</Text>
            <Text>{movie.budget}</Text>
            <View style={styles.container}>
                <Image style={styles.image} source={`${IMAGE_URL}${movie.backdrop_path}`} />
            </View>
        </ScrollView>
    )
        
};
    
const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: 400,
        marginBottom: 25,
        borderRadius: 15,
        overflow: 'hidden'
    },
    
    image: {
        flex: 1,
        width: null,
        height: null,
        resizeMode: 'contain'
    },
    
    textContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    
    text: {
        fontWeight: 'bold',
        fontSize: 20
    }
});
    
    
    export default MovieInfo;