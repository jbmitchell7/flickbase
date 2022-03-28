import React from 'react';
import { View, Image, StyleSheet } from 'react-native';
import { Text } from 'react-native-paper';

import WatchlistBtn from '../WatchlistBtn';
import { IMAGE_URL } from '../ImageComponent';
import { imageStyles } from '../Movie/MovieInfo'

const TvShowInfo = (props) => {
    const { show, styles, onToggleSnackBar, streamers } = props
    return (
        <View style={styles.textContainer}>
            <Text style={styles.titleText}>{show.name}</Text>
            <Text style={styles.bioText}>Synopsis: {show.overview}</Text>
            <Text style={styles.bioText}>Debuted: {show.first_air_date}</Text>
            <Text style={styles.bioText}>Total Episodes: {show.number_of_episodes}</Text>
            <Text style={styles.bioText}>Streaming With Subscription On:</Text>
            <View style={imageStyles.imageContainer}>
                {streamers.map(provider => (
                    <Image style={imageStyles.image} key={provider.provider_id} source={{ uri: `${IMAGE_URL}${provider.logo_path}` }} />
                ))}
            </View>
            <WatchlistBtn media={show} type="tv" onToggleSnackBar={onToggleSnackBar} />
        </View>
    )
}

export default TvShowInfo;