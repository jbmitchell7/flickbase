import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import MovieInfo from './MovieInfo';
import Popular from './Popular';

const Stack = createNativeStackNavigator();

const Home = () => (
    <Stack.Navigator initialRouteName='Popular'>
        <Stack.Screen
            name="Popular"
            component={Popular}
            options={{ headerShown: false }}
        />
        <Stack.Screen
            name="MovieInfo"
            component={MovieInfo}
            options={{ headerShown: false }}
        />
    </Stack.Navigator>
);

export default Home;