import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import { useDispatch } from "react-redux";
import { Text } from "react-native-paper";
import { useFocusEffect } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import MediaBtn from "./MediaBtn";
import MovieHome from "../Movie/MovieHome";
import PersonHome from "../Person/PersonHome";
import TvHome from "../TvShow/TvHome";
import { setLoginStatus } from "../../redux/user/userSlice";

const HomeStack = createNativeStackNavigator();

const HomeLayout = (props) => {
  const [media, setMedia] = useState("movie");
  const dispatch = useDispatch();

  useFocusEffect(
    React.useCallback(() => {
      let isActive = true;

      const checkLogin = async () => {
        try {
          if (isActive) {
            const userLoggedIn = await AsyncStorage.getItem("token");
            if (userLoggedIn != null) {
              dispatch(setLoginStatus(true));
            }
          }
        } catch {
          throw new Error("error setting Home info");
        }
      };

      checkLogin();

      return () => {
        isActive = false;
      };
    }, [])
  );

  return (
    <View style={styles.background}>
      <Text style={styles.header}>Flickbase</Text>
      <View style={styles.buttonContainer}>
        <MediaBtn
          label="Movies"
          navigation={props.navigation}
          setMedia={setMedia}
          mediaState={media}
          media="movie"
          icon="movie-open"
        />
        <MediaBtn
          label="TV"
          navigation={props.navigation}
          setMedia={setMedia}
          mediaState={media}
          media="tv"
          icon="television-classic"
        />
        <MediaBtn
          label="People"
          navigation={props.navigation}
          setMedia={setMedia}
          mediaState={media}
          media="person"
          icon="account"
        />
      </View>
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
    marginTop: 40,
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

export default HomeLayout;
