import React from 'react';
import { View, TouchableOpacity, FlatList, Image } from 'react-native';
import { Text } from 'react-native-paper';

import { IMAGE_URL } from '../ImageComponent';

const PersonInfo = (props) => {
    const { person, styles, movieCredits, tvCredits, movieCrew, tvCrew, navigation } = props;

    return (
        <View>
            <Text style={styles.titleText}>{person.name}</Text>
            <Text style={styles.bioText}>
                <Text style={styles.bioTextHeader}>Born: </Text>
                <Text>{person.birthday}</Text>
            </Text>
            {(person.deathday) ?
                <Text style={styles.bioText}>
                    <Text style={styles.bioTextHeader}>Died: </Text>
                    <Text>{person.deathday}</Text>
                </Text>
                :
                null
            }
            <Text style={styles.bioText}>
                <Text style={styles.bioTextHeader}>Profession: </Text>
                <Text>{person.known_for_department}</Text>
            </Text>
            {(movieCredits.length > 0) ?
                <>
                    <Text style={[styles.bioTextHeader, styles.bioText]}>Film Credits: </Text>
                    <FlatList
                        horizontal
                        data={movieCredits}
                        renderItem={({ item }) => (
                            <TouchableOpacity style={styles.personCard} onPress={() => {
                                navigation.push('MediaInfo',
                                    { mediaId: item.id, mediaType: 'movie' }
                                )
                            }}>
                                <Image style={styles.creditImage} source={{ uri: `${IMAGE_URL}${item.poster_path}` }} />
                                <Text style={[styles.personTextBold, styles.personText]}>{item.title}</Text>
                                <Text style={styles.personText}>{item.character}</Text>
                            </TouchableOpacity>
                        )}
                        showsHorizontalScrollIndicator={false}
                        keyExtractor={item => item.id}
                    />
                </> : <Text style={styles.bioText}>No Film Credits</Text>}
            {(tvCredits.length > 0) ?
                <>
                    <Text style={[styles.bioTextHeader, styles.bioText]}>Television Credits: </Text>
                    <FlatList
                        horizontal
                        data={tvCredits}
                        renderItem={({ item }) => (
                            <TouchableOpacity style={styles.personCard} onPress={() => {
                                navigation.push('MediaInfo',
                                    { mediaId: item.id, mediaType: 'tv' }
                                )
                            }}>
                                <Image style={styles.creditImage} source={{ uri: `${IMAGE_URL}${item.poster_path}` }} />
                                <Text style={[styles.personTextBold, styles.personText]}>{item.name}</Text>
                                <Text style={styles.personText}>{item.character}</Text>
                            </TouchableOpacity>
                        )}
                        showsHorizontalScrollIndicator={false}
                        keyExtractor={item => item.id}
                    />
                </>
                : <Text style={styles.bioText}>No Television Credits</Text>}
            <Text style={[styles.bioTextHeader, styles.bioText]}>Biography:</Text>
            <Text style={styles.bioTextSummary}>{person.biography}</Text>
        </View>
    )
}

export default PersonInfo;