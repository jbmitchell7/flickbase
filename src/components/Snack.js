import React from 'react';
import { StyleSheet } from 'react-native';
import { Snackbar } from 'react-native-paper';

const Snack = (props) => {

    const { visible, onDismissSnackBar, snackText } = props;

    return (
        <Snackbar
            visible={visible}
            onDismiss={onDismissSnackBar}
            duration={1000}
            style={styles.snack}
            wrapperStyle={styles.snackWrapper}
        >
            {snackText}
        </Snackbar>
    )
}

const styles = StyleSheet.create({
    snack: {
        padding: 5,
        alignSelf: 'center',
    },
    snackWrapper: {
        top: 0,
    }
})

export default Snack;