import React from 'react';
import { StyleSheet } from 'react-native';
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { devToolsEnhancer } from 'redux-devtools-extension';
import { BottomNavigation } from "react-native-paper";
import Watchlist from './src/components/Watchlist';
import Account from './src/components/Account';
import Home from './src/components/Home';
import flickbaseApp from './src/reducers/reducers';

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

const HomeRoute = () => <Home />
const WatchlistRoute = () => <Watchlist />
const AccountRoute = () => <Account />

export default function App() {
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: 'home', title: 'Home', icon: 'home' },
    { key: 'watchlist', title: 'Watchlist', icon: 'playlist-check' },
    { key: 'account', title: 'Account', icon: 'account' },
  ]);

  const renderScene = BottomNavigation.SceneMap({
    home: HomeRoute,
    watchlist: WatchlistRoute,
    account: AccountRoute,
  });

  return (
    <Provider store={store}>
      <PaperProvider theme={theme}>
        <BottomNavigation
          navigationState={{ index, routes }}
          onIndexChange={setIndex}
          renderScene={renderScene}
        />
      </PaperProvider>
    </Provider>
  );
}

const styles = StyleSheet.create({

});

