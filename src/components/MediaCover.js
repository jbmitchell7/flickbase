import React from 'react';
import { TouchableOpacity, View, StyleSheet, Image } from 'react-native';
import { Text } from 'react-native-paper';

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
    }}
      style={styles.imageContainer}>
      <Image style={styles.image} source={{ uri: `${IMAGE_URL}${media.poster_path}` }} />
    </TouchableOpacity>
  )
};

const styles = StyleSheet.create({
  imageContainer: {
    width: '50%',
    height: 250,
    marginBottom: 15,
    overflow: 'hidden'
  },

  image: {
    flex: 1,
    width: null,
    height: null,
    resizeMode: 'contain'
  },
});

export default MediaCover;
