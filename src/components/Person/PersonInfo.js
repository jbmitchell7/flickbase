import React from 'react';
import { View } from 'react-native';
import { Text } from 'react-native-paper';

const PersonInfo = (props) => {
    const { person, styles } = props;

    return (
        <View>
            <Text style={styles.titleText}>{person.name}</Text>
            <Text style={styles.bioText}>Born: {person.birthday}</Text>
            {(person.deathday) ?
                <Text style={styles.bioText}>Died: {person.deathday}</Text> :
                null
            }
            <Text style={styles.bioText}>Profession: {person.known_for_department}</Text>
            <Text style={styles.bioText}>Biography: {person.biography}</Text>
        </View>
    )
}

export default PersonInfo;