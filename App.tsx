/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import 'react-native-gesture-handler';
import React from 'react';
import { StatusBar } from 'react-native';
import { enableScreens } from 'react-native-screens';
import { initializeApp, getApps } from '@react-native-firebase/app';
import { AppProvider } from './src/Context/AppContext';
import AppNavigator from './src/navigation/AppNavigator';

// Initialize Firebase
if (getApps().length === 0) {
  initializeApp();
}

// Enable react-native-screens
enableScreens();

function App() {
  return (
    <AppProvider>
      <StatusBar barStyle="light-content" backgroundColor="#FF1744" />
      <AppNavigator />
    </AppProvider>
  );
}

export default App;