import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

import Watchlist from "../User/Watchlist";
import WatchlistComponent from "../Watchlist/WatchlistComponent";
import Login from "../User/Login";
import Search from "../Search/Search";
import HomeLayout from "../Home/HomeLayout";

const Tab = createBottomTabNavigator();

const BottomNav = () => (
  <Tab.Navigator
    initialRouteName="Home"
    screenOptions={{
      tabBarStyle: {
        backgroundColor: "#01C6AC",
        borderColor: "#01C6AC",
        borderTopWidth: 0,
        height: 55,
      },
      tabBarShowLabel: false,
      tabBarActiveTintColor: "white",
      tabBarInactiveTintColor: "#cccccc",
      headerShown: false,
    }}
  >
    <Tab.Screen
      name="Home"
      component={HomeLayout}
      options={{
        tabBarLabel: "Home",
        tabBarIcon: ({ color }) => (
          <MaterialCommunityIcons name="home" color={color} size={26} />
        ),
        unmountOnBlur: true,
      }}
    />
    <Tab.Screen
      name="Search"
      component={Search}
      options={{
        tabBarLabel: "Search",
        tabBarIcon: ({ color }) => (
          <MaterialCommunityIcons name="magnify" color={color} size={26} />
        ),
      }}
    />
    <Tab.Screen
      name="Watchlist"
      component={WatchlistComponent}
      options={{
        tabBarLabel: "Watchlist",
        tabBarIcon: ({ color }) => (
          <MaterialCommunityIcons
            name="book-plus-multiple-outline"
            color={color}
            size={26}
          />
        ),
      }}
    />
    <Tab.Screen
      name="Account"
      component={Login}
      options={{
        tabBarLabel: "Account",
        tabBarIcon: ({ color }) => (
          <MaterialCommunityIcons
            name="account-circle-outline"
            color={color}
            size={26}
          />
        ),
      }}
    />
  </Tab.Navigator>
);

export default BottomNav;
