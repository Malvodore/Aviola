export const API_ENDPOINTS = {
    BASE_URL: 'http://localhost:5000/api',
    AUTH: {
      LOGIN: '/auth/login',
      REGISTER: '/auth/register',
      ME: '/auth/me',
    },
    EVENTS: {
      ALL: '/events',
      BY_ID: (id) => `/events/${id}`,
      BY_CATEGORY: (category) => `/events/category/${category}`,
    },
    BOOKINGS: {
      CREATE: '/bookings',
      MY_BOOKINGS: '/bookings/my-bookings',
      BY_ID: (id) => `/bookings/${id}`,
      PAYMENT: (id) => `/bookings/${id}/payment`,
    },
    ADMIN: {
      EVENTS: '/admin/events',
      EVENT_BY_ID: (id) => `/admin/events/${id}`,
      TICKET_CATEGORIES: (eventId) => `/admin/events/${eventId}/tickets`,
    },
  };
  
  export const EVENT_CATEGORIES = [
    { id: 'concert', name: 'Concerts', icon: 'musical-notes' },
    { id: 'sports', name: 'Sports', icon: 'football' },
    { id: 'theater', name: 'Theater', icon: 'theater-masks' },
    { id: 'conference', name: 'Conferences', icon: 'people' },
    { id: 'comedy', name: 'Comedy', icon: 'happy' },
    { id: 'festival', name: 'Festivals', icon: 'balloon' },
  ];
  
  export const BOOKING_STATUS = {
    PENDING: 'pending',
    CONFIRMED: 'confirmed',
    CANCELLED: 'cancelled',
  };
  
  export const PAYMENT_STATUS = {
    PENDING: 'pending',
    PAID: 'paid',
    FAILED: 'failed',
    REFUNDED: 'refunded',
  };
  
  export const USER_ROLES = {
    USER: 'user',
    ADMIN: 'admin',
  };
  
  export const STORAGE_KEYS = {
    TOKEN: 'token',
    USER: 'user',
    CART: 'cart',
    FAVORITES: 'favorites',
    SEARCH_HISTORY: 'searchHistory',
  };
  
  export const SCREEN_NAMES = {
    // Auth Screens
    LOGIN: 'Login',
    REGISTER: 'Register',
    
    // Main Screens
    HOME: 'Home',
    EVENT_DETAIL: 'EventDetail',
    TICKET_SELECTION: 'TicketSelection',
    CHECKOUT: 'Checkout',
    MY_TICKETS: 'MyTickets',
    PROFILE: 'Profile',
    
    // Tab Names
    MAIN: 'Main',
  };
  
  export const ERROR_MESSAGES = {
    NETWORK_ERROR: 'Network error. Please check your internet connection.',
    SERVER_ERROR: 'Server error. Please try again later.',
    AUTHENTICATION_ERROR: 'Authentication failed. Please login again.',
    VALIDATION_ERROR: 'Please check your input and try again.',
    NOT_FOUND: 'The requested resource was not found.',
    PERMISSION_DENIED: 'Permission denied. You are not authorized to perform this action.',
    PAYMENT_FAILED: 'Payment failed. Please try again or use a different payment method.',
    BOOKING_FAILED: 'Booking failed. Please try again.',
    GENERIC_ERROR: 'Something went wrong. Please try again.',
  };
  
  export const SUCCESS_MESSAGES = {
    LOGIN_SUCCESS: 'Login successful!',
    REGISTER_SUCCESS: 'Account created successfully!',
    BOOKING_SUCCESS: 'Booking confirmed successfully!',
    PAYMENT_SUCCESS: 'Payment processed successfully!',
    LOGOUT_SUCCESS: 'Logged out successfully!',
    PROFILE_UPDATED: 'Profile updated successfully!',
    EVENT_CREATED: 'Event created successfully!',
    EVENT_UPDATED: 'Event updated successfully!',
    EVENT_DELETED: 'Event deleted successfully!',
  };
  
  export const VALIDATION_RULES = {
    EMAIL_REGEX: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    PHONE_REGEX: /^\+?[\d\s\-\(\)]+$/,
    PASSWORD_MIN_LENGTH: 6,
    NAME_MIN_LENGTH: 2,
    NAME_MAX_LENGTH: 50,
  };
  
  export const DATE_FORMATS = {
    DISPLAY: 'MMM DD, YYYY',
    API: 'YYYY-MM-DD',
    TIME: 'HH:mm',
    DATETIME: 'MMM DD, YYYY HH:mm',
    FULL: 'MMMM DD, YYYY [at] h:mm A',
  };
  
  export const CURRENCY = {
    SYMBOL: ',
    CODE: 'USD',
  };
  
  export const PAGINATION = {
    DEFAULT_LIMIT: 10,
    MAX_LIMIT: 100,
  };
  
  export const TICKET_COLORS = [
    '#FF1744', '#E91E63', '#9C27B0', '#673AB7',
    '#3F51B5', '#2196F3', '#03A9F4', '#00BCD4',
    '#009688', '#4CAF50', '#8BC34A', '#CDDC39',
    '#FFEB3B', '#FFC107', '#FF9800', '#FF5722',
  ];
  
  export default {
    API_ENDPOINTS,
    EVENT_CATEGORIES,
    BOOKING_STATUS,
    PAYMENT_STATUS,
    USER_ROLES,
    STORAGE_KEYS,
    SCREEN_NAMES,
    ERROR_MESSAGES,
    SUCCESS_MESSAGES,
    VALIDATION_RULES,
    DATE_FORMATS,
    CURRENCY,
    PAGINATION,
    TICKET_COLORS,
  };