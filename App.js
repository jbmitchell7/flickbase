import React from 'react';
import { DefaultTheme as DefaultPaper, Provider as PaperProvider } from 'react-native-paper';
import { createStore } from 'redux';
import { Provider as ReduxProvider } from 'react-redux';
import { devToolsEnhancer } from 'redux-devtools-extension';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';

import colors from './src/assets/colors';
import flickbaseApp from './src/reducers/reducers';
import BottomNav from './src/components/BottomNav';

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

const App = () => {
  return (
    <ReduxProvider store={store}>
      <PaperProvider theme={paperTheme}>
        <NavigationContainer theme={theme}>
          <BottomNav />
        </NavigationContainer>
      </PaperProvider>
    </ReduxProvider>
  );
}

export default App;