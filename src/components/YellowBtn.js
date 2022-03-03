import React from 'react';
import { StyleSheet } from 'react-native';
import { Button } from 'react-native-paper';

import colors from '../assets/colors';

const YellowBtn = (props) => {
    const { label, setState, media } = props;

    return (
        <Button compact={true}
            color={colors.yellow}
            dark={true}
            mode='outlined'
            style={styles.yellowBtn}
            onPress={() => setState(media)}>
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

export default YellowBtn;