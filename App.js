import React from 'react';
import { StatusBar } from 'react-native';
import { DefaultTheme as DefaultPaper, Provider as PaperProvider } from 'react-native-paper';
import { Provider as ReduxProvider } from 'react-redux';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import MediaInfo from './src/ui/MediaInfo';
import colors from './src/assets/colors';
import BottomNav from './src/components/Navigation/BottomNav';
import { store } from './src/redux/store/store';

const theme = {
  ...DefaultTheme,
  dark: true,
  colors: {
    ...DefaultTheme.colors,
    background: colors.backgroundBlue,
    text: colors.white,
  },
};

const paperTheme = {
  ...DefaultPaper,
  dark: true,
  colors: {
    ...DefaultPaper.colors,
    primary: colors.primaryBlue,
    background: colors.backgroundBlue,
    // button outline and other outlines
    outline: colors.white,
    // text color
    onSurface: colors.white,
    // disabled item theme
    surfaceDisabled: colors.lightGray,
    onSurfaceDisabled: colors.darkGray
  },
};

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <ReduxProvider store={store}>
      <PaperProvider theme={paperTheme}>
        <NavigationContainer theme={theme}>
          <StatusBar
            barStyle='light-content'
          />
          <Stack.Navigator
            initialRouteName='BottomNav'
            screenOptions={{
              headerStyle: {
                backgroundColor: colors.backgroundBlue,
                borderBottomWidth: 0,
              },
            }}
          >
            <Stack.Screen
              name='BottomNav'
              component={BottomNav}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name='MediaInfo'
              component={MediaInfo}
              options={{ title: '' }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </PaperProvider>
    </ReduxProvider>
  );
}

export default App;