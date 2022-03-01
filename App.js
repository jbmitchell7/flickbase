import React from 'react';
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
import { createStore } from 'redux';
import { Provider as ReduxProvider } from 'react-redux';
import { devToolsEnhancer } from 'redux-devtools-extension';
import { NavigationContainer } from '@react-navigation/native';

import flickbaseApp from './src/reducers/reducers';
import BottomNav from './src/components/BottomNav';

const store = createStore(flickbaseApp, devToolsEnhancer());

const theme = {
  ...DefaultTheme,
  dark: true,
  colors: {
    ...DefaultTheme.colors,
    primary: '#01C6AC',
    background: '#032541',
  },
};

const App = () => {
  return (
    <ReduxProvider store={store}>
      <PaperProvider theme={theme}>
        <NavigationContainer>
          <BottomNav />
        </NavigationContainer>
      </PaperProvider>
    </ReduxProvider>
  );
}

export default App;