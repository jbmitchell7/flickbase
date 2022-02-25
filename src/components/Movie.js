import React from 'react';
import { Card } from 'react-native-paper';

const Movie = (props) => (
  <Card>
    <Card.Title title="Title" />
    <Card source={{ uri: props.movie.results.title }} />
  </Card>
);

export default Movie;
