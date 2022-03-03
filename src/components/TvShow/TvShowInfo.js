import React from 'react';
import { View } from 'react-native';
import { Text, Button } from 'react-native-paper';

import colors from '../../assets/colors';

const TvShowInfo = (props) => {
    const { show, styles } = props
    return (
        <View style={styles.textContainer}>
            <Text style={styles.titleText}>{show.name}</Text>
            <Text style={styles.bioText}>Synopsis: {show.overview}</Text>
            <Text style={styles.bioText}>Debuted: {show.first_air_date}</Text>
            <Text style={styles.bioText}>Total Episodes: {show.number_of_episodes}</Text>
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

export default TvShowInfo;