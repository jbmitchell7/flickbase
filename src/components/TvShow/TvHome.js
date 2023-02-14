import React, { useState } from "react";
import {
  StyleSheet,
  SectionList,
  FlatList,
  View,
  ScrollView,
} from "react-native";
import { Text } from "react-native-paper";
import { useFocusEffect } from "@react-navigation/native";

import { fetchGet } from "../../api/tmdb";
import MediaCoverComponent from "../../ui/MediaCoverComponent";

const TvHome = (props) => {
  const [dataLoaded, setDataLoaded] = useState(false);
  const [popularPerson, setPopularPerson] = useState([]);
  const [airingToday, setAiringToday] = useState([]);
  const [onTheAir, setOnTheAir] = useState([]);
  const [topRatedTv, setTopRatedTv] = useState([]);
  const [trendingPerson, setTrendingPerson] = useState([]);

  const SECTIONS = [
    {
      title: "Popular",
      data: popularPerson,
    },
    {
      title: "Trending This Week",
      data: trendingPerson,
    },
    {
      title: "Airing Today",
      data: airingToday,
    },
    {
      title: "On the Air",
      data: onTheAir,
    },
    {
      title: "Top Rated",
      data: topRatedTv,
    },
  ];

  useFocusEffect(
    React.useCallback(() => {
      let isActive = true;

      const getTvData = async () => {
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
        } catch (error) {
          throw new Error("error getting home movie data");
        }
      };

      getTvData();

      return () => {
        isActive = false;
      };
    }, [])
  );

  if (dataLoaded) {
    return (
      <ScrollView contentContainerStyle={styles.sectionContainer}>
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
                renderItem={({ item }) => (
                  <View style={styles.tvCard}>
                    <MediaCoverComponent
                      media={item}
                      key={item.id}
                      navigation={props.navigation}
                    />
                    <Text style={styles.tvText}>{item.name}</Text>
                  </View>
                )}
                showsHorizontalScrollIndicator={false}
                keyExtractor={(item) => item.id}
              />
            </>
          )}
          renderItem={() => {
            return null;
          }}
        />
      </ScrollView>
    );
  }

  return <Text>Loading...</Text>;
};

const styles = StyleSheet.create({
  sectionContainer: {
    paddingBottom: 40,
  },
  sectionHeader: {
    marginVertical: 20,
    marginHorizontal: 20,
    fontSize: 20,
  },
  tvCard: {
    flexWrap: "nowrap",
    width: 160,
  },
  tvText: {
    marginHorizontal: 5,
  },
});

export default TvHome;
