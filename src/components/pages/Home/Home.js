import React from "react";
import { View, StyleSheet } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { Text } from "react-native-paper";
import { useFocusEffect } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import MovieHome from "./layouts/MovieHome"
import PersonHome from "./layouts/PersonHome";
import TvHome from "./layouts/TvHome";
import { setLoginStatus, setUsername } from "../../../redux/user/userSlice";
import { setId } from "../../../redux/watchlist/watchlistSlice";

const HomeStack = createNativeStackNavigator();

const Home = () => {
  const dispatch = useDispatch();
  const loginStatus = useSelector(state => state.user.loginStatus);
  const watchlistId = useSelector((state) => state.watchlist.id);

  useFocusEffect(
    React.useCallback(() => {
      let isActive = true;

      checkLogin();

      return () => {
        isActive = false;
      };
    }, [])
  );

  const checkLogin = async () => {
    try {
      const userLoggedIn = await AsyncStorage.getItem("token");
      const localWatchlistId = await AsyncStorage.getItem("watchlistId");
      const username = await AsyncStorage.getItem("username");
      if (userLoggedIn && !loginStatus) {
        dispatch(setUsername(username));
        dispatch(setLoginStatus(true));
      }
      if (localWatchlistId && watchlistId === "") {
        dispatch(setId(localWatchlistId));
      }
    } catch {
      throw new Error("error setting Home info");
    }
  };

  return (
    <View style={styles.background}>
      <Text style={styles.header}>Flickbase</Text>
      <HomeStack.Navigator initialRouteName="movie">
        <HomeStack.Screen
          name="movie"
          component={MovieHome}
          options={{ headerShown: false }}
        />
        <HomeStack.Screen
          name="tv"
          component={TvHome}
          options={{ headerShown: false }}
        />
        <HomeStack.Screen
          name="person"
          component={PersonHome}
          options={{ headerShown: false }}
        />
      </HomeStack.Navigator>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    marginTop: 30,
    marginBottom: 20,
    marginHorizontal: 20,
    fontSize: 25,
  },
  background: {
    flex: 1,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "center",
  },
});

export default Home;
