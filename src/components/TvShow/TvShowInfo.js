import React from 'react';
import { View } from 'react-native';
import { Text } from 'react-native-paper';

import WatchlistBtn from '../WatchlistBtn';

const TvShowInfo = (props) => {
    const { show, styles, onToggleSnackBar } = props
    return (
        <View style={styles.textContainer}>
            <Text style={styles.titleText}>{show.name}</Text>
            <Text style={styles.bioText}>Synopsis: {show.overview}</Text>
            <Text style={styles.bioText}>Debuted: {show.first_air_date}</Text>
            <Text style={styles.bioText}>Total Episodes: {show.number_of_episodes}</Text>
            <WatchlistBtn media={show} type="tv" onToggleSnackBar={onToggleSnackBar} />
        </View>
    )
}

export default TvShowInfo;