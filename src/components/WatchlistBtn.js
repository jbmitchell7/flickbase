import React from 'react';
import { StyleSheet } from 'react-native';
import { Button } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { fetchPost, fetchDelete } from '../api/tmdb';
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
            throw new Error('error adding to watchlist');
            onToggleSnackBar('Error Adding to Watchlist')
        }
    }

    const removeFromWatchlist = async () => {
        try {
            const listId = await AsyncStorage.getItem('watchlistId');
            await fetchDelete(`/4/list/${listId}/items`,
                {
                    items: [{ media_type: type, media_id: media.id }]
                }
            );
            onToggleSnackBar('Removed to Watchlist')
        }
        catch {
            throw new Error('error removing to watchlist');
            onToggleSnackBar('Error Removing from Watchlist')
        }
    }

    return (
        <>
            <Button compact={true}
                color={colors.yellow}
                dark={true}
                //icon="book-plus-outline"
                mode='outlined'
                style={styles.yellowBtn}
                onPress={() => addToWatchlist()}>
                Add to Watchlist
            </Button>
            <Button compact={true}
                color={colors.yellow}
                dark={true}
                mode='outlined'
                style={styles.yellowBtn}
                onPress={() => removeFromWatchlist()}>
                Remove from Watchlist
            </Button>
        </>
    )
}

const styles = StyleSheet.create({
    yellowBtn: {
        marginBottom: 10,
        padding: 1,
        alignSelf: 'center'
    },
})

export default WatchlistBtn;