import React from 'react';
import { StyleSheet, View } from 'react-native';
import { IconButton } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { fetchPost, fetchDelete, fetchGet } from '../api/tmdb';
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
            onToggleSnackBar('Added to Watchlist');
        }
        catch {
            onToggleSnackBar('Error Adding to Watchlist');
            throw new Error('error adding to watchlist');
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
            onToggleSnackBar('Removed to Watchlist');
        }
        catch {
            onToggleSnackBar('Error Removing from Watchlist');
            throw new Error('error removing to watchlist');
        }
    }

    return (
        <View style={styles.buttonContainer}>
            <IconButton
                color={colors.blueGreen}
                size={30}
                icon="book-plus-multiple"
                onPress={() => addToWatchlist()}>
            </IconButton>
            <IconButton
                color={colors.red}
                size={30}
                icon="book-remove-multiple"
                onPress={() => removeFromWatchlist()}>
            </IconButton>
        </View>
    )
}

const styles = StyleSheet.create({
    buttonContainer: {
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center'
    },
})

export default WatchlistBtn;