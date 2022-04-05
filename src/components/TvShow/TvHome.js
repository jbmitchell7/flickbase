import React, { useState } from 'react';
import { StyleSheet, SectionList, FlatList } from 'react-native';
import { Text } from 'react-native-paper';
import { useFocusEffect } from '@react-navigation/native';

import { fetchGet } from '../../api/tmdb';
import MediaCover from '../MediaCover';

const TvHome = (props) => {
    const [dataLoaded, setDataLoaded] = useState(false);
    const [popularPerson, setPopularPerson] = useState([]);
    const [airingToday, setAiringToday] = useState([]);
    const [onTheAir, setOnTheAir] = useState([]);
    const [topRatedTv, setTopRatedTv] = useState([]);
    const [trendingPerson, setTrendingPerson] = useState([]);

    const SECTIONS = [
        {
            title: 'Popular',
            data: popularPerson
        },
        {
            title: 'Trending This Week',
            data: trendingPerson
        },
        {
            title: 'Airing Today',
            data: airingToday
        },
        {
            title: 'On the Air',
            data: onTheAir
        },
        {
            title: 'Top Rated',
            data: topRatedTv
        },
    ];

    useFocusEffect(
        React.useCallback(() => {
            let isActive = true;

            const getPersonData = async () => {
                try {
                    if (isActive) {

                        const newPopular = await fetchGet(`/3/tv/popular`);
                        setPopularPerson(newPopular.results);

                        const newTrending = await fetchGet(`/3/trending/tv/week`);
                        setTrendingPerson(newTrending.results);

                        const newTopRated = await fetchGet(`/3/tv/top_rated`);
                        setTopRatedTv(newTopRated.results);

                        const newOnTheAir = await fetchGet(`/3/tv/on_the_air`);
                        setOnTheAir(newOnTheAir.results);

                        const newAiringToday = await fetchGet(`/3/tv/airing_today`);
                        setAiringToday(newAiringToday.results);

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
        )
    }

    return (
        <Text>Loading...</Text>
    )

}

const styles = StyleSheet.create({
    sectionHeader: {
        marginVertical: 20,
        marginHorizontal: 20,
        fontSize: 20,
    }
})

export default TvHome