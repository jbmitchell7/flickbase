import React, { useState } from 'react';
import { ScrollView, StyleSheet, SafeAreaView, SectionList, FlatList } from 'react-native';
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

    return (
        <ScrollView>
            {dataLoaded ? <SafeAreaView style={styles.background}>
                <SectionList
                    contentContainerStyle={{ paddingHorizontal: 10 }}
                    stickySectionHeadersEnabled={false}
                    sections={SECTIONS}
                    showsVerticalScrollIndicator={false}
                    renderSectionHeader={({ section }) => (
                        <>
                            <Text style={styles.sectionHeader}>{section.title}</Text>
                            <FlatList
                                horizontal
                                data={section.data}
                                renderItem={({ item }) => <MediaCover media={item} key={item.id} navigation={props.navigation} page='home' />}
                                showsHorizontalScrollIndicator={false}
                                keyExtractor={item => item.id}
                            />
                        </>
                    )}
                    renderItem={() => {
                        return null;
                    }}
                />
            </SafeAreaView> : null}
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    sectionHeader: {
        marginVertical: 20,
        marginHorizontal: 20,
        fontSize: 20,
    },
    background: {
        flex: 1
    }
})

export default PersonHome