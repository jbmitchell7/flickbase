import React from 'react';
import { TouchableOpacity, View, StyleSheet, Image } from 'react-native';

const IMAGE_URL = "https://image.tmdb.org/t/p/w500";

const MovieCover = (props) => {
  const { navigation, movie } = props;

  return (
    <TouchableOpacity onPress={() => {
      navigation.navigate('MediaInfo',
        { mediaId: movie.id, mediaType: 'movie' }
      )
    }}>
      <View style={styles.container}>
        <Image style={styles.image} source={{ uri: `${IMAGE_URL}${movie.poster_path}` }} />
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

export default MovieCover;
