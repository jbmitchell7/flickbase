import React from 'react';
import { View } from 'react-native';
import { Text } from 'react-native-paper';

const TvShowInfo = (props) => {
    const { show, styles } = props
    return (
        <View>
            <Text style={styles.titleText}>{show.name}</Text>
            <Text style={styles.bioText}>Synopsis: {show.overview}</Text>
            <Text style={styles.bioText}>Debuted: {show.first_air_date}</Text>
            <Text style={styles.bioText}>
                Total Ratings: {show.vote_count} | Average Rating: {show.vote_average}/10
            </Text>
            <Text style={styles.bioText}>Total Seasons: {show.number_of_seasons}</Text>
            <Text style={styles.bioText}>Total Episodes: {show.number_of_episodes}</Text>
        </View>
    )
}

export default TvShowInfo;