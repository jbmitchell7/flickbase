import React from 'react';
import { StyleSheet } from 'react-native';
import { Button } from 'react-native-paper';

import colors from '../assets/colors';

const PopularBtn = (props) => {
    const { label, setMedia, media } = props;

    return (
        <Button compact={true}
            color={colors.yellow}
            dark={true}
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
        alignSelf: 'center'
    },
})

export default PopularBtn;