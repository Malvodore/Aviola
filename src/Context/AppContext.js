import React, { createContext, useContext, useReducer, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getApp } from '@react-native-firebase/app';
import auth from '@react-native-firebase/auth';

const AppContext = createContext();

const initialState = {
  user: null,
  isAuthenticated: false,
  cart: [],
  loading: false,
  token: null,
};

const appReducer = (state, action) => {
  switch (action.type) {
    case 'SET_LOADING':
      return { ...state, loading: action.payload };
    case 'LOGIN_SUCCESS':
      return {
        ...state,
        user: action.payload.user,
        token: action.payload.token,
        isAuthenticated: true,
        loading: false,
      };
    case 'LOGOUT':
      return {
        ...state,
        user: null,
        token: null,
        isAuthenticated: false,
        cart: [],
      };
    case 'ADD_TO_CART':
      return {
        ...state,
        cart: [...state.cart, action.payload],
      };
    case 'REMOVE_FROM_CART':
      return {
        ...state,
        cart: state.cart.filter((item, index) => index !== action.payload),
      };
    case 'CLEAR_CART':
      return {
        ...state,
        cart: [],
      };
    case 'SET_TOKEN':
      return {
        ...state,
        token: action.payload,
      };
    default:
      return state;
  }
};

export const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, initialState);

  useEffect(() => {
    checkAuthState();
  }, []);

  const checkAuthState = async () => {
    try {
      console.log('🔥 Firebase Auth State Check Starting...');
      
      // Get Firebase app instance
      const app = getApp();
      console.log('🔥 Firebase App:', app.name);
      
      // Get auth instance for the app
      const authInstance = auth(app);
      console.log('🔥 Auth instance created');
      
      const unsubscribe = authInstance.onAuthStateChanged((user) => {
        console.log('🔥 Auth State Changed:', user ? 'User logged in' : 'User logged out');
        if (user) {
          const userData = {
            uid: user.uid,
            email: user.email,
            firstName: user.displayName?.split(' ')[0] || '',
            lastName: user.displayName?.split(' ')[1] || '',
          };
          dispatch({ 
            type: 'LOGIN_SUCCESS', 
            payload: { 
              user: userData, 
              token: user.uid
            } 
          });
        } else {
          dispatch({ type: 'LOGOUT' });
        }
      });

      return unsubscribe;
    } catch (error) {
      console.error('🔥 Error checking auth state:', error);
    }
  };

  const login = async (email, password) => {
    dispatch({ type: 'SET_LOADING', payload: true });
    try {
      console.log('🔥 Attempting login...');
      const app = getApp();
      const authInstance = auth(app);
      
      const userCredential = await authInstance.signInWithEmailAndPassword(email, password);
      console.log('🔥 Login successful!', userCredential.user.email);
      
      const user = userCredential.user;
      const userData = {
        uid: user.uid,
        email: user.email,
        firstName: user.displayName?.split(' ')[0] || '',
        lastName: user.displayName?.split(' ')[1] || '',
      };

      await AsyncStorage.setItem('userData', JSON.stringify(userData));
      
      dispatch({ 
        type: 'LOGIN_SUCCESS', 
        payload: { 
          user: userData, 
          token: user.uid 
        } 
      });
      
      return { success: true };
    } catch (error) {
      console.error('🔥 Login error:', error);
      dispatch({ type: 'SET_LOADING', payload: false });
      
      let errorMessage = 'Login failed';
      if (error.code === 'auth/user-not-found') {
        errorMessage = 'No account found with this email';
      } else if (error.code === 'auth/wrong-password') {
        errorMessage = 'Incorrect password';
      } else if (error.code === 'auth/invalid-email') {
        errorMessage = 'Invalid email address';
      }
      
      return { success: false, message: errorMessage };
    }
  };

  const register = async (userData) => {
    console.log('🔥 Starting registration process...');
    console.log('🔥 User data:', userData);
    
    dispatch({ type: 'SET_LOADING', payload: true });
    try {
      const { firstName, lastName, email, password } = userData;
      
      console.log('🔥 Getting Firebase app instance...');
      const app = getApp();
      console.log('🔥 Getting auth instance...');
      const authInstance = auth(app);
      
      console.log('🔥 Calling Firebase createUserWithEmailAndPassword...');
      const userCredential = await authInstance.createUserWithEmailAndPassword(email, password);
      console.log('🔥 User created successfully!', userCredential.user.uid);
      
      const user = userCredential.user;
      
      console.log('🔥 Updating user profile...');
      await user.updateProfile({
        displayName: `${firstName} ${lastName}`,
      });
      console.log('🔥 Profile updated successfully!');

      const userDataFormatted = {
        uid: user.uid,
        email: user.email,
        firstName,
        lastName,
      };

      await AsyncStorage.setItem('userData', JSON.stringify(userDataFormatted));
      
      dispatch({ 
        type: 'LOGIN_SUCCESS', 
        payload: { 
          user: userDataFormatted, 
          token: user.uid 
        } 
      });
      
      console.log('🔥 Registration completed successfully!');
      return { success: true };
    } catch (error) {
      console.error('🔥 Registration error:', error);
      console.error('🔥 Error code:', error.code);
      console.error('🔥 Error message:', error.message);
      dispatch({ type: 'SET_LOADING', payload: false });
      
      let errorMessage = 'Registration failed';
      if (error.code === 'auth/email-already-in-use') {
        errorMessage = 'An account with this email already exists';
      } else if (error.code === 'auth/invalid-email') {
        errorMessage = 'Invalid email address';
      } else if (error.code === 'auth/weak-password') {
        errorMessage = 'Password is too weak';
      }
      
      return { success: false, message: errorMessage };
    }
  };

  const logout = async () => {
    try {
      const app = getApp();
      const authInstance = auth(app);
      await authInstance.signOut();
      await AsyncStorage.removeItem('userData');
      dispatch({ type: 'LOGOUT' });
    } catch (error) {
      console.error('🔥 Logout error:', error);
    }
  };

  const value = {
    ...state,
    login,
    register,
    logout,
    dispatch,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within AppProvider');
  }
  return context;
};