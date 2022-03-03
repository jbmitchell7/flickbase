import React from 'react';
import { TouchableOpacity, View, StyleSheet, Image } from 'react-native';

const IMAGE_URL = "https://image.tmdb.org/t/p/w500";

const MediaCover = (props) => {
  const { navigation, media } = props;

  if ('gender' in media) {
    return (
      <TouchableOpacity onPress={() => {
        navigation.navigate('MediaInfo',
          { mediaId: media.id, mediaType: 'person' }
        )
      }}>
        <View style={styles.container}>
          <Image style={styles.image} source={{ uri: `${IMAGE_URL}${media.profile_path}` }} />
        </View>
      </TouchableOpacity>
    )
  }

  if ('first_air_date' in media) {
    return (
      <TouchableOpacity onPress={() => {
        navigation.navigate('MediaInfo',
          { mediaId: media.id, mediaType: 'tv' }
        )
      }}>
        <View style={styles.container}>
          <Image style={styles.image} source={{ uri: `${IMAGE_URL}${media.poster_path}` }} />
        </View>
      </TouchableOpacity>
    )
  }


  return (
    <TouchableOpacity onPress={() => {
      navigation.navigate('MediaInfo',
        { mediaId: media.id, mediaType: 'movie' }
      )
    }}>
      <View style={styles.container}>
        <Image style={styles.image} source={{ uri: `${IMAGE_URL}${media.poster_path}` }} />
      </View>
    </TouchableOpacity>
  )
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 500,
    marginBottom: 25,
    borderRadius: 15,
    overflow: 'hidden'
  },

  image: {
    flex: 1,
    width: null,
    height: null,
    resizeMode: 'contain'
  },

  textContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },

  text: {
    fontWeight: 'bold',
    fontSize: 20
  }
});

export default MediaCover;
