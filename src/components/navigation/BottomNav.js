import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

import WatchlistComponent from "../pages/Watchlist/WatchlistComponent";
import Account from "../pages/Account/Account";
import Search from "../pages/Search/Search";
import Home from "../pages/Home/Home";
import colors from "../../assets/colors";

const Tab = createBottomTabNavigator();

const BottomNav = () => (
  <Tab.Navigator
    initialRouteName="Home"
    screenOptions={{
      tabBarStyle: {
        backgroundColor: colors.primaryBlue,
        borderColor: colors.primaryBlue,
        borderTopWidth: 0,
        height: 50,
        paddingTop: 5
      },
      tabBarShowLabel: false,
      tabBarActiveTintColor: colors.white,
      tabBarInactiveTintColor: colors.mediumGray,
      headerShown: false,
    }}
  >
    <Tab.Screen
      name="Home"
      component={Home}
      options={{
        tabBarLabel: "Home",
        tabBarIcon: ({ color }) => (
          <MaterialCommunityIcons name="home" color={color} size={25} />
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
          <MaterialCommunityIcons name="magnify" color={color} size={25} />
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
            size={25}
          />
        ),
      }}
    />
    <Tab.Screen
      name="Account"
      component={Account}
      options={{
        tabBarLabel: "Account",
        tabBarIcon: ({ color }) => (
          <MaterialCommunityIcons
            name="account-circle-outline"
            color={color}
            size={25}
          />
        ),
      }}
    />
  </Tab.Navigator>
);

export default BottomNav;
