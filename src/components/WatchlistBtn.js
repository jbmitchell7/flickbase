import React from 'react';
import { IconButton } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { fetchPost, fetchDelete } from '../api/tmdb';
import colors from '../assets/colors';

const WatchlistBtn = (props) => {
    const { media, type, onToggleSnackBar, buttonType } = props;

    const addToWatchlist = async () => {
        try {
            const listId = await AsyncStorage.getItem('watchlistId');
            const response = await fetchPost(`/4/list/${listId}/items`,
                {
                    items: [{ media_type: type, media_id: media.id }]
                }
            );
            if (response) {
                onToggleSnackBar('Added to Watchlist');
            }
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

    if (buttonType == 'add') {
        return (
            <IconButton
                color={colors.blueGreen}
                size={30}
                icon="book-plus-multiple"
                onPress={() => addToWatchlist()}>
            </IconButton>
        )
    }

    return (
        <IconButton
            color={colors.yellow}
            size={30}
            icon="book-remove-multiple"
            onPress={() => removeFromWatchlist()}>
        </IconButton>
    )
}

export default WatchlistBtn;