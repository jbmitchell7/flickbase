import React from 'react';
import { StyleSheet } from 'react-native';
import { Button } from 'react-native-paper';
import { fetchPost } from '../api/tmdb';

import colors from '../assets/colors';

const WatchlistBtn = (props) => {
    const { label, media, type } = props;

    const addToWatchlist = async () => {
        try {
            const userId = await AsyncStorage.getItem('userId');
            const response = await fetchPost(`/account/${userId}/watchlist`,
                { media_type: type, media_id: media.id, watchlist: true });
            console.log(response.results)
            //TODO add snack bar 
        }
        catch {
            //TODO add snack bar 
            console.log('error adding to watchlist');
        }
    }

    return (
        <Button compact={true}
            color={colors.yellow}
            dark={true}
            mode='outlined'
            style={styles.yellowBtn}
            onPress={() => null}>
            {label}
        </Button>
    )
}

const styles = StyleSheet.create({
    yellowBtn: {
        marginBottom: 20,
        width: 200,
        alignSelf: 'center'
    },
})

export default WatchlistBtn;