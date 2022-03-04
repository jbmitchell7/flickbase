import React, { useState } from 'react';
import { View, StyleSheet, Linking, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Text, Button } from 'react-native-paper';

import { fetchPost } from '../../api/tmdb';
import colors from '../../assets/colors';

const Login = () => {
  const [approvedToken, setApprovedToken] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);

  const createRequest = async () => {
    try {
      await AsyncStorage.setItem('loggedIn', false);
      const token = await fetchPost(`/4/auth/request_token`);
      Linking.openURL(`https://www.themoviedb.org/auth/access?request_token=${token.request_token}`);
      await AsyncStorage.setItem('token', token.request_token);
      setApprovedToken(true);
    }
    catch (error) {
      //TODO add snack bar 
      console.log('error getting request token');
      console.log(error);
    }
  };

  const loginAccount = async () => {
    try {
      const asyncToken = await AsyncStorage.getItem('token');
      const response = await fetchPost(`/4/auth/access_token`, { request_token: asyncToken });
      await AsyncStorage.setItem('userId', response.account_id);
      await AsyncStorage.setItem('loggedIn', true);
      setLoggedIn(true);
      //TODO add snack bar 
    }
    catch {
      //TODO add snack bar 
      console.log('error logging in');
    }
  }

  const logout = async () => {
    try {
      await AsyncStorage.setItem('token', '');
      await AsyncStorage.setItem('loggedIn', false);
      setLoggedIn(false);
      setApprovedToken(false);
      //TODO add snack bar 
    }
    catch {
      //TODO add snack bar 
      console.log('failed to log out');
    }
  }

  if (!loggedIn) {
    return (
      <View>
        <Text style={styles.header}>Login</Text>
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
          disabled={approvedToken}
          onPress={() => createRequest()}>
          Approve Access
        </Button>
        <Button
          color={colors.yellow}
          mode='contained'
          disabled={!approvedToken}
          style={styles.btn}
          onPress={() => loginAccount()}>
          Login
        </Button>
      </View>
    )
  }

  return (
    <ScrollView>
      <Text style={styles.header}>Account</Text>
      <Button
        color={colors.yellow}
        mode='contained'
        style={styles.btn}
        onPress={() => logout()}>
        Logout
      </Button>
    </ScrollView>
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
});

export default Login;
