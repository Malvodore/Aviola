import ApiService from './api';
import AsyncStorage from '@react-native-async-storage/async-storage';

class AuthService {
  async login(email, password) {
    try {
      const response = await ApiService.post('/auth/login', {
        email,
        password,
      });

      if (response.token) {
        await AsyncStorage.setItem('token', response.token);
        await AsyncStorage.setItem('user', JSON.stringify(response.user));
      }

      return {
        success: true,
        data: response,
      };
    } catch (error) {
      return {
        success: false,
        message: error.message,
      };
    }
  }

  async register(userData) {
    try {
      const response = await ApiService.post('/auth/register', userData);

      if (response.token) {
        await AsyncStorage.setItem('token', response.token);
        await AsyncStorage.setItem('user', JSON.stringify(response.user));
      }

      return {
        success: true,
        data: response,
      };
    } catch (error) {
      return {
        success: false,
        message: error.message,
      };
    }
  }

  async logout() {
    try {
      await AsyncStorage.multiRemove(['token', 'user']);
      return { success: true };
    } catch (error) {
      console.error('Logout error:', error);
      return { success: false, message: error.message };
    }
  }

  async getCurrentUser() {
    try {
      const response = await ApiService.get('/auth/me');
      return {
        success: true,
        data: response.user,
      };
    } catch (error) {
      return {
        success: false,
        message: error.message,
      };
    }
  }

  async getStoredUser() {
    try {
      const user = await AsyncStorage.getItem('user');
      return user ? JSON.parse(user) : null;
    } catch (error) {
      console.error('Error getting stored user:', error);
      return null;
    }
  }

  async isAuthenticated() {
    try {
      const token = await AsyncStorage.getItem('token');
      return !!token;
    } catch (error) {
      return false;
    }
  }
}

export default new AuthService();