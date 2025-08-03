/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import { StatusBar } from 'react-native';
import { AppProvider } from './src/Context/AppContext';
import AppNavigator from './src/navigation/AppNavigator';

function App() {
  return (
    <AppProvider>
      <StatusBar barStyle="light-content" backgroundColor="#FF1744" />
      <AppNavigator />
    </AppProvider>
  );
}

export default App;
