import React from 'react';
import { ScrollView, StyleSheet } from 'react-native'
import { Text } from 'react-native-paper';

const Watchlist = () => (
  <ScrollView>
    <Text style={styles.header}>Watchlist</Text>
  </ScrollView>
);

const styles = StyleSheet.create({
  header: {
    fontSize: 30,
    marginVertical: 40,
    marginHorizontal: 20,
  },
});

export default Watchlist;
