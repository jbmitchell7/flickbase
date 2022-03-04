import React from 'react';
import { View, StyleSheet, Linking } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Text, Button } from 'react-native-paper';

import { fetchGet } from '../../api/tmdb';
import colors from '../../assets/colors';

const REQUEST_TOKEN_URL = 'https://www.themoviedb.org/authenticate/';

const Account = () => {

  const getApiToken = async () => {
    try {
      const token = await fetchGet(`/authentication/token/new?`);
      storeToken(token.request_token);
      Linking.openURL(`${REQUEST_TOKEN_URL}${token.request_token}`);
    }
    catch (error) {
      console.log('error getting api token');
      console.log(error);
    }
  };

  const getToken = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      console.log(token);
    }
    catch {
      console.log('error getting asyncstorage token')
    }
  }

  const storeToken = async (token) => {
    try {
      await AsyncStorage.setItem(
        'token', token
      )
    }
    catch {
      console.log('error saving token to asyncstorage');
    }
  }

  return (
    <View>
      <Text style={styles.header}>Account</Text>
      <Text style={styles.text}>
        Step 1: Create an account at tmdb.org
      </Text>
      <Text style={styles.text}>
        Step 2: Approve access to your TMDB account
      </Text>
      <Text style={styles.text}>
        Step 3: Login
      </Text>
      <Button
        color={colors.yellow}
        mode='contained'
        style={styles.btn}
        onPress={() => getApiToken()}>
        Approve Access
      </Button>
      <Button
        color={colors.yellow}
        disabled={true}
        mode='contained'
        style={styles.btn}
        onPress={() => null}>
        Login
      </Button>
    </View>
  )

};

const styles = StyleSheet.create({
  header: {
    fontSize: 30,
    marginVertical: 40,
    marginHorizontal: 20,
  },
  text: {
    fontSize: 15,
    marginHorizontal: 20,
    marginVertical: 20,
  },
  btn: {
    marginVertical: 20,
    width: 200,
    alignSelf: 'center',
  },
})

export default Account;
