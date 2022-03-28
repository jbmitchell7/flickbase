import React from 'react';
import { StatusBar } from 'react-native';
import { DefaultTheme as DefaultPaper, Provider as PaperProvider } from 'react-native-paper';
import { createStore } from 'redux';
import { Provider as ReduxProvider } from 'react-redux';
import { devToolsEnhancer } from 'redux-devtools-extension';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import MediaInfo from './src/components/MediaInfo';
import colors from './src/assets/colors';
import flickbaseApp from './src/reducers/reducers';
import BottomNav from './src/components/Navigation/BottomNav';

const store = createStore(flickbaseApp, devToolsEnhancer());

const theme = {
  ...DefaultTheme,
  dark: true,
  colors: {
    ...DefaultTheme.colors,
    background: colors.backgroundBlue,
    text: 'white',
  },
};

const paperTheme = {
  ...DefaultPaper,
  dark: true,
  colors: {
    ...DefaultPaper.colors,
    primary: colors.blueGreen,
    background: colors.backgroundBlue,
    text: 'white',
    placeholder: 'white',
    surface: colors.primaryBlue
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
            initialRouteName='Popular'
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