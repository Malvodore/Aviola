import { initializeApp, getApps } from '@react-native-firebase/app';

// Firebase configuration - this will be read from google-services.json automatically
const firebaseConfig = {
  // The config will be automatically loaded from google-services.json
  // No need to manually specify config here for React Native
};

// Initialize Firebase if not already initialized
if (getApps().length === 0) {
  initializeApp();
}

export default initializeApp;