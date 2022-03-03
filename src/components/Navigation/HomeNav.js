import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import MediaInfo from '../MediaInfo';
import Popular from '../Popular';
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
            name="MediaInfo"
            component={MediaInfo}
            options={{ title: '' }}
        />
    </Stack.Navigator>
);


export default HomeNav;