import React from 'react';
import { View, StyleSheet, Linking } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Text, Button } from 'react-native-paper';

import { fetchPost } from '../../api/tmdb';
import colors from '../../assets/colors';

const Account = () => {

  const createRequest = async () => {
    try {
      const token = await fetchPost(`/4/auth/request_token`);
      Linking.openURL(`https://www.themoviedb.org/auth/access?request_token=${token.request_token}`);
      await AsyncStorage.setItem('token', token.request_token);
    }
    catch (error) {
      console.log('error getting request token');
      console.log(error);
    }
  };

  const loginToken = async (token) => {
    try {
      const asyncToken = await AsyncStorage.getItem('token');
      const token = await fetchPost(`/4/auth/access_token`, { request_token: asyncToken });
      //TODO set to redirect to user account page
      console.log(`logged in`);
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
        onPress={() => createRequest()}>
        Approve Access
      </Button>
      <Button
        color={colors.yellow}
        // disabled={true}
        mode='contained'
        style={styles.btn}
        onPress={() => loginToken()}>
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
