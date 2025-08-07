import 'react-native-gesture-handler';
import React from 'react';
import { StatusBar } from 'react-native';
import { enableScreens } from 'react-native-screens';
import { initializeApp, getApps } from '@react-native-firebase/app';
import { AppProvider } from './src/Context/AppContext';
import AppNavigator from './src/navigation/AppNavigator';

// Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyCG5FXqY7bSEPh3hIBxsot2uujttkPpya0',
  authDomain: 'aviola-4adeb.firebaseapp.com', // Derived from project_id
  projectId: 'aviola-4adeb',
  storageBucket: 'aviola-4adeb.firebasestorage.app',
  messagingSenderId: '713667528425', // From project_number
  appId: '1:713667528425:android:edbaec4c5b01c8676ad278', // From mobilesdk_app_id
};

// Initialize Firebase
if (getApps().length === 0) {
  initializeApp(firebaseConfig);
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