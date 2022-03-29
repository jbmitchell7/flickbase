import React from 'react';
import { View, Image } from 'react-native';
import { Text } from 'react-native-paper';

import WatchlistBtn from '../WatchlistBtn';
import { IMAGE_URL } from '../ImageComponent';

const TvShowInfo = (props) => {
    const { show, styles, onToggleSnackBar, streamers } = props
    return (
        <View style={styles.textContainer}>
            <Text style={styles.titleText}>{show.name}</Text>
            <Text style={styles.bioText}>Synopsis: {show.overview}</Text>
            <Text style={styles.bioText}>Debuted: {show.first_air_date}</Text>
            <Text style={styles.bioText}>
                Total Ratings: {show.vote_count} | Average Rating: {show.vote_average}/10
            </Text>
            <Text style={styles.bioText}>Total Seasons: {show.number_of_seasons}</Text>
            <Text style={styles.bioText}>Total Episodes: {show.number_of_episodes}</Text>
            <Text style={styles.bioText}>Streaming With Subscription On:</Text>
            <View style={styles.imageContainer}>
                {(streamers) ?
                    streamers.map(provider => (
                        <Image style={styles.image} key={provider.provider_id} source={{ uri: `${IMAGE_URL}${provider.logo_path}` }} />
                    ))
                    : <Text style={styles.streamText}>N/A</Text>
                }
            </View>
            <WatchlistBtn media={show} type="tv" onToggleSnackBar={onToggleSnackBar} />
        </View>
    )
}

export default TvShowInfo;