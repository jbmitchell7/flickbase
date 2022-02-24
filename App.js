import React from 'react';
import { StyleSheet } from 'react-native';
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
import Welcome from './src/Welcome';

const theme = {
  ...DefaultTheme,
  dark: true,
  colors: {
    ...DefaultTheme.colors,
    primary: '#01C6AC',
    background: '#032541',
    text: 'yellow'
  },
};

export default function App() {
  return (
    <PaperProvider theme={theme}>
      <Welcome />
    </PaperProvider>
  );
}

const styles = StyleSheet.create({

});

