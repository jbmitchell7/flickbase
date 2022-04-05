import React, { useState } from 'react';
import { StyleSheet, SectionList, FlatList, View } from 'react-native';
import { Text } from 'react-native-paper';
import { useFocusEffect } from '@react-navigation/native';

import { fetchGet } from '../../api/tmdb';
import MediaCover from '../MediaCover';

const PersonHome = (props) => {
    const [dataLoaded, setDataLoaded] = useState(false);
    const [popularPerson, setPopularPerson] = useState([]);
    const [trendingPerson, setTrendingPerson] = useState([]);

    const SECTIONS = [
        {
            title: 'Popular',
            data: popularPerson
        },
        {
            title: 'Trending This Week',
            data: trendingPerson
        }
    ];

    useFocusEffect(
        React.useCallback(() => {
            let isActive = true;

            const getPersonData = async () => {
                try {
                    if (isActive) {

                        const newPopular = await fetchGet(`/3/person/popular`);
                        setPopularPerson(newPopular.results);

                        const newTrending = await fetchGet(`/3/trending/person/week`);
                        setTrendingPerson(newTrending.results);

                        setDataLoaded(true);
                    }
                }
                catch (error) {
                    throw new Error('error getting home movie data');
                }
            };

            getPersonData();

            return () => {
                isActive = false;
            };
        }, [])
    );

    if (dataLoaded) {
        return (
            <SectionList
                contentContainerStyle={{ paddingHorizontal: 10 }}
                stickySectionHeadersEnabled={false}
                sections={SECTIONS}
                style={styles.sectionContainer}
                showsVerticalScrollIndicator={false}
                renderSectionHeader={({ section }) => (
                    <>
                        <Text style={styles.sectionHeader}>{section.title}</Text>
                        <FlatList
                            horizontal
                            data={section.data}
                            renderItem={({ item }) => (
                                <View style={styles.personCard}>
                                    <MediaCover media={item} key={item.id} navigation={props.navigation} page='home' />
                                    <Text style={styles.personText}>{item.name}</Text>
                                </View>

                            )}
                            showsHorizontalScrollIndicator={false}
                            keyExtractor={item => item.id}
                        />
                    </>
                )}
                renderItem={() => {
                    return null;
                }}
            />
        )
    }

    return (
        <Text>Loading...</Text>
    )

}

const styles = StyleSheet.create({
    sectionContainer: {
        paddingBottom: 40
    },
    sectionHeader: {
        marginVertical: 20,
        marginHorizontal: 20,
        fontSize: 20,
    },
    personCard: {
        flex: 1,
        flexWrap: 'wrap',
        width: 160
    },
    personText: {
        marginHorizontal: 5
    }
})

export default PersonHome