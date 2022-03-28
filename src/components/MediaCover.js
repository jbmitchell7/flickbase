import React from 'react';
import { TouchableOpacity, StyleSheet, Image } from 'react-native';

const IMAGE_URL = "https://image.tmdb.org/t/p/w500";

const MediaCover = (props) => {
  const { navigation, media, page } = props;

  if ('gender' in media) {
    return (
      <TouchableOpacity onPress={() => {
        navigation.navigate('MediaInfo',
          { mediaId: media.id, mediaType: 'person' }
        )
      }}
        style={(page == 'home') ? styles.imageContainer : styles.watchlistContainer}>
        <Image style={styles.image} source={{ uri: `${IMAGE_URL}${media.profile_path}` }} />
      </TouchableOpacity>
    )
  }

  if ('first_air_date' in media) {
    return (
      <TouchableOpacity onPress={() => {
        navigation.navigate('MediaInfo',
          { mediaId: media.id, mediaType: 'tv' }
        )
      }}
        style={(page == 'home') ? styles.imageContainer : styles.watchlistContainer}>
        <Image style={styles.image} source={{ uri: `${IMAGE_URL}${media.poster_path}` }} />
      </TouchableOpacity>
    )
  }


  return (
    <TouchableOpacity onPress={() => {
      navigation.navigate('MediaInfo',
        { mediaId: media.id, mediaType: 'movie' }
      )
    }}
      style={(page == 'home') ? styles.imageContainer : styles.watchlistContainer}>
      <Image style={styles.image} source={{ uri: `${IMAGE_URL}${media.poster_path}` }} />
    </TouchableOpacity>
  )
};

const styles = StyleSheet.create({
  watchlistContainer: {
    width: '50%',
    height: 250,
    marginBottom: 15,
  },
  imageContainer: {
    width: 160,
    height: 225,
    marginBottom: 15,
  },

  image: {
    flex: 1,
    width: null,
    height: null,
    resizeMode: 'contain'
  },
});

export default MediaCover;
