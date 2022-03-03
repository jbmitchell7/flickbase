import React from 'react';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import Watchlist from '../Account/Watchlist';
import Account from '../Account/Account';
import Home from '../Home';
import Search from '../Search/Search';

const Tab = createMaterialBottomTabNavigator();

const BottomNav = () => (

    <Tab.Navigator
        initialRouteName='Home'
        activeColor='white'
        barStyle={{ backgroundColor: '#01C6AC' }}
    >
        <Tab.Screen
            name='Home'
            component={Home}
            options={{
                tabBarLabel: 'Home',
                tabBarIcon: ({ color }) => (
                    <MaterialCommunityIcons name="home" color={color} size={26} />
                ),
            }}
        />
        <Tab.Screen
            name='Search'
            component={Search}
            options={{
                tabBarLabel: 'Search',
                tabBarIcon: ({ color }) => (
                    <MaterialCommunityIcons name="magnify" color={color} size={26} />
                ),
            }}
        />
        <Tab.Screen
            name='Watchlist'
            component={Watchlist}
            options={{
                tabBarLabel: 'Watchlist',
                tabBarIcon: ({ color }) => (
                    <MaterialCommunityIcons name="book-plus-multiple-outline" color={color} size={26} />
                ),
            }}
        />
        <Tab.Screen
            name='Account'
            component={Account}
            options={{
                tabBarLabel: 'Account',
                tabBarIcon: ({ color }) => (
                    <MaterialCommunityIcons name="account-circle-outline" color={color} size={26} />
                ),
            }}
        />
    </Tab.Navigator>

);

export default BottomNav;