import React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import { Card, Title, Paragraph } from 'react-native-paper';

const SearchResult = (props) => {
    const { item } = props;

    if (item.media_type == 'movie') {
        return (
            <TouchableOpacity style={styles.cardContainer}>
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
            <TouchableOpacity style={styles.cardContainer}>
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
        <TouchableOpacity style={styles.cardContainer}>
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