import React from 'react';
import { View } from 'react-native';
import { Text } from 'react-native-paper';

const PersonInfo = (props) => {
    const { person, styles } = props
    return (
        <View style={styles.textContainer}>
            <Text style={styles.titleText}>{person.name}</Text>
            <Text style={styles.bioText}>Born: {person.birthday}</Text>
            <Text style={styles.bioText}>Biography: {person.biography}</Text>
        </View>
    )
}

export default PersonInfo;