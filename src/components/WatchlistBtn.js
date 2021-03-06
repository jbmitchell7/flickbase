import React, { useState } from 'react';
import { View } from 'react-native';
import { IconButton } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { fetchPost, fetchDelete } from '../api/tmdb';
import Snack from './Snack';
import colors from '../assets/colors';
import { setWatchlistChanged } from '../actions/actions';
import { connect } from 'react-redux';

const WatchlistBtn = (props) => {
    const { media, type, buttonType, watchlistChanged } = props;
    const [visible, setVisible] = useState(false);
    const [snackText, setSnackText] = useState('');

    const onToggleSnackBar = (result) => {
        setVisible(!visible);
        setSnackText(result);
        props.setWatchlistChanged(!watchlistChanged);
    };

    const onDismissSnackBar = () => setVisible(false);

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

    return (
        <View>
            {buttonType == 'add' ?
                <IconButton
                    color={colors.blueGreen}
                    size={30}
                    icon="book-plus-multiple"
                    onPress={() => addToWatchlist()}>
                </IconButton> :
                <IconButton
                    color={colors.yellow}
                    size={30}
                    icon="book-remove-multiple"
                    onPress={() => removeFromWatchlist()}>
                </IconButton>
            }
            <Snack visible={visible} onDismissSnackbar={onDismissSnackBar} snackText={snackText} />
        </View>

    )
}

const mapStateToProps = state => {
    return {
        watchlistChanged: state.watchlistChanged,
    }
}

export default connect(mapStateToProps, { setWatchlistChanged })(WatchlistBtn);