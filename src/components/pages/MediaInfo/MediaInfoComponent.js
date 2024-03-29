import React, { useState } from "react";
import { ScrollView, StyleSheet, View, Linking } from "react-native";
import { Button, Text } from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";
import { useFocusEffect } from "@react-navigation/native";

import MovieInfo from "./layouts/MovieInfo";
import PersonInfo from "./layouts/PersonInfo";
import TvShowInfo from "./layouts/TvShowInfo";
import { fetchGet } from "../../../api/tmdb";
import ImageComponent from "../../ui/ImageComponent";
import WatchlistBtn from "../../ui/WatchlistBtn";
import colors from "../../../assets/colors";
import Streamers from "../../ui/Streamers";
import { setMediaChoice } from "../../../redux/media/mediaSlice";
import Snack from "../../ui/Snack";
import CreditList from "../../ui/CreditList/CreditList";

const YOUTUBE_URL = "https://www.youtube.com/watch?v=";

const MediaInfoComponent = (props) => {
  const { mediaId, mediaType } = props.route.params;
  const dispatch = useDispatch();
  const snackVisible = useSelector((state) => state.snack.visible);

  const [streamers, setStreamers] = useState([]);
  const [freeStreamers, setFreeStreamers] = useState([]);
  const [cast, setCast] = useState([]);
  const [crew, setCrew] = useState([]);
  const [personMovieInfo, setPersonMovieInfo] = useState(null);
  const [personTvInfo, setPersonTvInfo] = useState(null);
  const [videos, setVideos] = useState([]);
  const media = useSelector((state) => state.media.value);

  const openVideo = async (key) => {
    try {
      Linking.openURL(`${YOUTUBE_URL}${key}`);
    } catch (error) {
      throw new Error("error getting trailer");
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      let isActive = true;

      const getMedia = async () => {
        try {
          if (isActive) {
            const mediaResponse = await fetchGet(`/3/${mediaType}/${mediaId}`);
            dispatch(setMediaChoice(mediaResponse));
            if (mediaType != "person") {
              const mediaCredits = await fetchGet(
                `/3/${mediaType}/${mediaId}/credits`
              );
              const cast = mediaCredits.cast;
              if (cast.length > 0) {
                setCast(mediaCredits.cast);
                setCrew(mediaCredits.crew);
              }

              const watchProviders = await fetchGet(
                `/3/${mediaType}/${mediaId}/watch/providers`
              );
              if (watchProviders.results.hasOwnProperty("US")) {
                const providers = watchProviders.results.US;
                if (providers.hasOwnProperty("flatrate")) {
                  setStreamers(providers.flatrate);
                }
                if (providers.hasOwnProperty("free")) {
                  setFreeStreamers(providers.free);
                }
              }
              const videos = await fetchGet(
                `/3/${mediaType}/${mediaId}/videos`
              );
              if (videos) {
                const videoList = videos.results;
                const trailers = videoList.filter(
                  (video) => video.type == "Trailer" && video.site == "YouTube"
                );
                setVideos(trailers);
              }
            }
            if (mediaType == "person") {
              const movieResponse = await fetchGet(
                `/3/${mediaType}/${mediaId}/movie_credits`
              );
              const tvResponse = await fetchGet(
                `/3/${mediaType}/${mediaId}/tv_credits`
              );
              setPersonMovieInfo(movieResponse);
              setPersonTvInfo(tvResponse);
            }
          }
        } catch (error) {
          throw new Error("error getting media");
        }
      };

      getMedia();

      return () => {
        isActive = false;
      };
    }, [snackVisible])
  );

  if (media) {
    return (
      <View style={styles.textContainer}>
        <ScrollView
          stickyHeaderIndices={[2]}
          showsVerticalScrollIndicator={false}
        >
          {mediaType == "movie" ? (
            <MovieInfo movie={media} styles={styles} streamers={streamers} />
          ) : mediaType == "person" ? (
            <PersonInfo
              person={media}
              styles={styles}
              movieInfo={personMovieInfo}
              tvInfo={personTvInfo}
              navigation={props.navigation}
            />
          ) : (
            <TvShowInfo show={media} styles={styles} streamers={streamers} />
          )}
          {mediaType == "movie" || mediaType == "tv" ? (
            <View style={styles.lastText}>
              <Text style={styles.bioText}>
                <Text style={styles.bioTextHeader}>Total Ratings: </Text>
                <Text>{media.vote_count}</Text>
                <Text style={styles.bioTextHeader}> Average Rating: </Text>
                <Text>{media.vote_average}/10</Text>
              </Text>
              <Text style={[styles.bioTextHeader, styles.bioText]}>Cast: </Text>
              {cast.length > 0 ? (
                <CreditList
                  list={cast}
                  mediaType="person"
                  listType="cast"
                  navigation={props.navigation}
                />
              ) : (
                <Text style={styles.streamText}>Cast Unavailable</Text>
              )}
              <Text style={[styles.bioTextHeader, styles.bioText]}>Crew: </Text>
              {crew.length > 0 ? (
                <CreditList
                  list={crew}
                  mediaType="person"
                  listType="crew"
                  navigation={props.navigation}
                />
              ) : (
                <Text style={styles.streamText}>Cast Unavailable</Text>
              )}
              <Streamers
                title="Streaming Free "
                items={freeStreamers}
                styles={styles}
              />
              <Streamers
                title="Streaming With Subscription "
                items={streamers}
                styles={styles}
              />
              <Text style={styles.attributionText}>Streaming info provided by JustWatch</Text>
              <View style={styles.buttonContainer}>
                <WatchlistBtn media={media} type={mediaType} buttonType="add" />
                <WatchlistBtn
                  media={media}
                  type={mediaType}
                  buttonType="remove"
                />
              </View>
              {videos.length > 0 ? (
                <Button
                  buttonColor={colors.yellow}
                  style={styles.yellowBtn}
                  mode="contained"
                  dark={true}
                  onPress={() => openVideo(videos[0].key)}
                >
                  Watch Trailer
                </Button>
              ) : null}
            </View>
          ) : null}
          <ImageComponent item={media} media={mediaType} />
        </ScrollView>
        <Snack />
      </View>
    );
  }

  return <Text>Loading...</Text>;
};

const styles = StyleSheet.create({
  textContainer: {
    flex: 1,
    justifyContent: "center",
    marginHorizontal: 20,
  },

  attributionText: {
    fontStyle: 'italic' 
  },

  lastText: {
    marginBottom: 20,
  },

  bioTextHeader: {
    color: colors.yellow,
  },

  bioText: {
    marginVertical: 10,
  },

  bioTextSummary: {
        marginHorizontal: 5
    },

  buttonContainer: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "nowrap",
    justifyContent: "center",
  },

  imageContainer: {
    marginBottom: 10,
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
  },

  image: {
    width: 60,
    height: 60,
    marginHorizontal: 5,
    marginVertical: 5,
  },

  streamText: {
    marginHorizontal: 20,
  },

  yellowBtn: {
    marginVertical: 20,
    padding: 1,
    marginHorizontal: 5,
    alignSelf: "center",
  },

  titleText: {
    fontWeight: "bold",
    fontSize: 25,
    marginVertical: 20,
  },
});

export default MediaInfoComponent;
