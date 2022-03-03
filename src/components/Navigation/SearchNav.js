import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import MediaInfo from '../MediaInfo';
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
            name="MediaInfo"
            component={MediaInfo}
            options={{ title: '' }}
        />
    </Stack.Navigator>
);


export default SearchNav;