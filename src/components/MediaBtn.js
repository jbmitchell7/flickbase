import React from 'react';
import { StyleSheet } from 'react-native';
import { Button } from 'react-native-paper';

import colors from '../assets/colors';

const MediaBtn = (props) => {
    const { label, setMedia, media, icon, mediaState } = props;

    if (mediaState == media) {
        return (
            <Button compact={true}
                color={colors.yellow}
                dark={true}
                icon={icon}
                mode='contained'
                style={styles.yellowBtn}
                onPress={() => setMedia(media)}>
                {label}
            </Button>
        )
    }

    return (
        <Button compact={true}
            color={colors.yellow}
            dark={true}
            icon={icon}
            mode='outlined'
            style={styles.yellowBtn}
            onPress={() => setMedia(media)}>
            {label}
        </Button>
    )
}

const styles = StyleSheet.create({
    yellowBtn: {
        marginBottom: 20,
        padding: 1,
        marginHorizontal: 5,
        alignSelf: 'center'
    },
})

export default MediaBtn;