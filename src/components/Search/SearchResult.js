import React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import { Card, Title, Paragraph } from 'react-native-paper';

//TODO pass ID as prop in order to get all data from item on info page

const SearchResult = (props) => {
    const { item, navigation } = props;

    if (item.media_type == 'movie') {
        return (
            <TouchableOpacity style={styles.cardContainer}
                onPress={() => {
                    navigation.navigate('MovieInfo', { movie: item })
                }}>
                <Card>
                    <Card.Content>
                        <Title>{item.title} (Film)</Title>
                        <Paragraph>{item.overview}</Paragraph>
                    </Card.Content>
                </Card>
            </TouchableOpacity>
        )
    }

    if (item.media_type == 'tv') {
        return (
            <TouchableOpacity style={styles.cardContainer}
                onPress={() => {
                    navigation.navigate('TvShowInfo', { tvshow: item })
                }}>
                <Card>
                    <Card.Content>
                        <Title>{item.name} (TV Show)</Title>
                        <Paragraph>{item.overview}</Paragraph>
                    </Card.Content>
                </Card>
            </TouchableOpacity>
        )
    }

    return (
        <TouchableOpacity style={styles.cardContainer}
            onPress={() => {
                navigation.navigate('PersonInfo', { person: item })
            }}>
            <Card>
                <Card.Content>
                    <Title>{item.name} (Actor)</Title>
                </Card.Content>
            </Card>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({

    cardContainer: {
        marginVertical: 5,
        marginHorizontal: 20,
    },
});

export default SearchResult;