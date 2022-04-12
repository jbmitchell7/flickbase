import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Text } from 'react-native-paper';

import MediaCover from './MediaCover';
import WatchlistBtn from './WatchlistBtn';

const ListCard = (props) => {
    const { navigation, media, type } = props;

    const onToggleSnackBar = (result) => null;

    if (media.media_type == 'person') {
        return (
            <View style={styles.watchlistItemContainer}>
                <MediaCover media={media} key={media.id} navigation={navigation} />
                <View style={styles.column}>
                    <Text style={[styles.itemTitle, styles.itemText]}>{media.name}</Text>
                </View>
            </View>
        )
    }

    return (
        <View style={styles.watchlistItemContainer}>
            <MediaCover media={media} key={media.id} navigation={navigation} />
            <View style={styles.column}>
                <View>
                    {(media.media_type == 'movie') ?
                        <Text style={[styles.itemTitle, styles.itemText]}>{media.title}</Text>
                        : <Text style={[styles.itemTitle, styles.itemText]}>{media.name}</Text>
                    }
                    <Text style={styles.itemText}>Average Rating: {media.vote_average}/10</Text>
                </View>
                <View style={styles.buttonContainer}>
                    {(type == 'search') ?
                        <WatchlistBtn
                            media={media}
                            type={media.media_type}
                            onToggleSnackBar={onToggleSnackBar}
                            buttonType='add' />
                        : null
                    }
                    <WatchlistBtn
                        media={media}
                        type={media.media_type}
                        onToggleSnackBar={onToggleSnackBar}
                        buttonType='remove' />
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    watchlistItemContainer: {
        display: 'flex',
        flexDirection: 'row',
        marginHorizontal: 10,
    },
    column: {
        flexShrink: 1,
        paddingLeft: 10,
        alignSelf: 'center'
    },
    itemTitle: {
        fontSize: 20
    },
    itemText: {
        marginBottom: 10
    },
    buttonContainer: {
        display: 'flex',
        justifyContent: 'center'
    },
});

export default ListCard;