import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import MovieInfo from '../Movie/MovieInfo';
import PersonInfo from '../Person/PersonInfo';
import TvShowInfo from '../TvShow/TvShowInfo';
import Search from '../Search/Search';
import colors from '../../assets/colors';

const Stack = createNativeStackNavigator();

const SearchNav = () => (
    <Stack.Navigator
        initialRouteName='Search'
        screenOptions={{
            headerStyle: {
                backgroundColor: colors.backgroundBlue,
                borderBottomWidth: 0,
            },
        }}
    >
        <Stack.Screen
            name="SearchView"
            component={Search}
            options={{ headerShown: false }}
        />
        <Stack.Screen
            name="MovieInfo"
            component={MovieInfo}
            options={{ title: '' }}
        />
        <Stack.Screen
            name="PersonInfo"
            component={PersonInfo}
            options={{ title: '' }}
        />
        <Stack.Screen
            name="TvShowInfo"
            component={TvShowInfo}
            options={{ title: '' }}
        />
    </Stack.Navigator>
);


export default SearchNav;