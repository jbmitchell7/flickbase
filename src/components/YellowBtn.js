import React from 'react';
import { StyleSheet } from 'react-native';
import { Button } from 'react-native-paper';

import colors from '../assets/colors';

const YellowBtn = (props) => {
    const { label } = props;
    return (
        <Button compact={true}
            color={colors.yellow}
            dark={true}
            mode='contained'
            style={styles.yellowBtn}>
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