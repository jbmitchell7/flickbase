import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import MovieInfo from '../Movie/MovieInfo';
import Popular from '../Movie/Popular';
import colors from '../../assets/colors';

const Stack = createNativeStackNavigator();

const HomeNav = () => (
    <Stack.Navigator
        initialRouteName='Popular'
        screenOptions={{
            headerStyle: {
                backgroundColor: colors.backgroundBlue,
                borderBottomWidth: 0,
            },
        }}
    >
        <Stack.Screen
            name="Popular"
            component={Popular}
            options={{ headerShown: false }}
        />
        <Stack.Screen
            name="MovieInfo"
            component={MovieInfo}
            options={{ title: '' }}
        />
    </Stack.Navigator>
);


export default HomeNav;