import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';
import { useApp } from '../Context/AppContext';

// Import screens
import LoginScreen from '../screens/auth/LoginScreen';
import RegisterScreen from '../screens/auth/RegisterScreen';
import HomeScreen from '../screens/main/HomeScreen';
import EventDetailScreen from '../screens/main/EventDetailScreen';
import TicketSelectionScreen from '../screens/main/TicketSelectionScreen';
import CheckoutScreen from '../screens/main/CheckoutScreen';
import ProfileScreen from '../screens/main/ProfileScreen';
import MyTicketsScreen from '../screens/main/MyTicketScreen';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const MainTabs = () => {
  const { isAuthenticated } = useApp();
  
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          
          if (route.name === 'Home') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'MyTickets') {
            iconName = focused ? 'ticket' : 'ticket-outline';
          } else if (route.name === 'Profile') {
            iconName = focused ? 'person' : 'person-outline';
          }
          
          return <Icon name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#FF1744',
        tabBarInactiveTintColor: 'gray',
        headerShown: false,
        tabBarStyle: {
          backgroundColor: 'black',
          borderTopColor: '#333',
        },
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen 
        name="MyTickets" 
        component={MyTicketsScreen}
        listeners={({ navigation }) => ({
          tabPress: (e) => {
            // If user is not authenticated, prevent default and show login
            if (!isAuthenticated) {
              e.preventDefault();
              navigation.navigate('Login');
            }
          },
        })}
      />
      <Tab.Screen 
        name="Profile" 
        component={ProfileScreen}
        listeners={({ navigation }) => ({
          tabPress: (e) => {
            // If user is not authenticated, prevent default and show login
            if (!isAuthenticated) {
              e.preventDefault();
              navigation.navigate('Login');
            }
          },
        })}
      />
    </Tab.Navigator>
  );
};

const AppNavigator = () => {
  const { isAuthenticated } = useApp();

  return (
    <NavigationContainer>
      <Stack.Navigator 
        screenOptions={{ 
          headerShown: false,
          cardStyle: { backgroundColor: 'white' }
        }}
        initialRouteName="Main"
      >
        {/* Main app - always accessible */}
        <Stack.Screen name="Main" component={MainTabs} />
        <Stack.Screen name="EventDetail" component={EventDetailScreen} />
        <Stack.Screen 
          name="TicketSelection" 
          component={TicketSelectionScreen}
          listeners={({ navigation }) => ({
            focus: () => {
              // Check if user is authenticated when accessing ticket selection
              if (!isAuthenticated) {
                navigation.navigate('Login');
              }
            },
          })}
        />
        <Stack.Screen 
          name="Checkout" 
          component={CheckoutScreen}
          listeners={({ navigation }) => ({
            focus: () => {
              // Check if user is authenticated when accessing checkout
              if (!isAuthenticated) {
                navigation.navigate('Login');
              }
            },
          })}
        />
        
        {/* Auth screens - shown when needed */}
        <Stack.Screen 
          name="Login" 
          component={LoginScreen}
          options={{
            presentation: 'modal', // Shows as modal overlay
          }}
        />
        <Stack.Screen 
          name="Register" 
          component={RegisterScreen}
          options={{
            presentation: 'modal', // Shows as modal overlay
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;