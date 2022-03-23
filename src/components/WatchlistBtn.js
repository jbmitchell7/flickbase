import React from 'react';
import { StyleSheet } from 'react-native';
import { Button } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { fetchPost } from '../api/tmdb';
import colors from '../assets/colors';

const WatchlistBtn = (props) => {
    const { media, type, onToggleSnackBar } = props;

    const addToWatchlist = async () => {
        try {
            const listId = await AsyncStorage.getItem('watchlistId');
            await fetchPost(`/4/list/${listId}/items`,
                {
                    items: [{ media_type: type, media_id: media.id }]
                }
            );
            onToggleSnackBar('Added to Watchlist')
        }
        catch {
            console.log('error adding to watchlist');
            onToggleSnackBar('Error Adding to Watchlist')
        }
    }

    return (
        <Button compact={true}
            color={colors.yellow}
            dark={true}
            mode='outlined'
            style={styles.yellowBtn}
            onPress={() => addToWatchlist()}>
            Add to Watchlist
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