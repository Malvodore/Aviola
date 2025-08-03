import { VALIDATION_RULES } from './constants';

export const validateEmail = (email) => {
  if (!email) {
    return { isValid: false, message: 'Email is required' };
  }
  
  if (!VALIDATION_RULES.EMAIL_REGEX.test(email)) {
    return { isValid: false, message: 'Please enter a valid email address' };
  }
  
  return { isValid: true, message: '' };
};

export const validatePassword = (password) => {
  if (!password) {
    return { isValid: false, message: 'Password is required' };
  }
  
  if (password.length < VALIDATION_RULES.PASSWORD_MIN_LENGTH) {
    return { 
      isValid: false, 
      message: `Password must be at least ${VALIDATION_RULES.PASSWORD_MIN_LENGTH} characters long` 
    };
  }
  
  return { isValid: true, message: '' };
};

export const validateConfirmPassword = (password, confirmPassword) => {
  if (!confirmPassword) {
    return { isValid: false, message: 'Please confirm your password' };
  }
  
  if (password !== confirmPassword) {
    return { isValid: false, message: 'Passwords do not match' };
  }
  
  return { isValid: true, message: '' };
};

export const validateName = (name, fieldName = 'Name') => {
  if (!name) {
    return { isValid: false, message: `${fieldName} is required` };
  }
  
  if (name.trim().length < VALIDATION_RULES.NAME_MIN_LENGTH) {
    return { 
      isValid: false, 
      message: `${fieldName} must be at least ${VALIDATION_RULES.NAME_MIN_LENGTH} characters long` 
    };
  }
  
  if (name.trim().length > VALIDATION_RULES.NAME_MAX_LENGTH) {
    return { 
      isValid: false, 
      message: `${fieldName} must be less than ${VALIDATION_RULES.NAME_MAX_LENGTH} characters long` 
    };
  }
  
  return { isValid: true, message: '' };
};

export const validatePhoneNumber = (phone) => {
  if (!phone) {
    return { isValid: false, message: 'Phone number is required' };
  }
  
  if (!VALIDATION_RULES.PHONE_REGEX.test(phone)) {
    return { isValid: false, message: 'Please enter a valid phone number' };
  }
  
  return { isValid: true, message: '' };
};

export const validateRequired = (value, fieldName = 'Field') => {
  if (!value || (typeof value === 'string' && !value.trim())) {
    return { isValid: false, message: `${fieldName} is required` };
  }
  
  return { isValid: true, message: '' };
};

export const validateNumber = (value, fieldName = 'Value', min = null, max = null) => {
  if (value === null || value === undefined || value === '') {
    return { isValid: false, message: `${fieldName} is required` };
  }
  
  const numValue = Number(value);
  
  if (isNaN(numValue)) {
    return { isValid: false, message: `${fieldName} must be a valid number` };
  }
  
  if (min !== null && numValue < min) {
    return { isValid: false, message: `${fieldName} must be at least ${min}` };
  }
  
  if (max !== null && numValue > max) {
    return { isValid: false, message: `${fieldName} must be no more than ${max}` };
  }
  
  return { isValid: true, message: '' };
};

export const validateDate = (date, fieldName = 'Date') => {
  if (!date) {
    return { isValid: false, message: `${fieldName} is required` };
  }
  
  const dateObj = new Date(date);
  
  if (isNaN(dateObj.getTime())) {
    return { isValid: false, message: `Please enter a valid ${fieldName.toLowerCase()}` };
  }
  
  return { isValid: true, message: '' };
};

export const validateFutureDate = (date, fieldName = 'Date') => {
  const dateValidation = validateDate(date, fieldName);
  if (!dateValidation.isValid) {
    return dateValidation;
  }
  
  const dateObj = new Date(date);
  const now = new Date();
  
  if (dateObj <= now) {
    return { isValid: false, message: `${fieldName} must be in the future` };
  }
  
  return { isValid: true, message: '' };
};

export const validateUrl = (url, fieldName = 'URL') => {
  if (!url) {
    return { isValid: false, message: `${fieldName} is required` };
  }
  
  try {
    new URL(url);
    return { isValid: true, message: '' };
  } catch {
    return { isValid: false, message: `Please enter a valid ${fieldName.toLowerCase()}` };
  }
};

export const validateEventForm = (eventData) => {
  const errors = {};
  
  // Validate title
  const titleValidation = validateRequired(eventData.title, 'Event title');
  if (!titleValidation.isValid) {
    errors.title = titleValidation.message;
  }
  
  // Validate description
  const descriptionValidation = validateRequired(eventData.description, 'Event description');
  if (!descriptionValidation.isValid) {
    errors.description = descriptionValidation.message;
  }
  
  // Validate category
  const categoryValidation = validateRequired(eventData.category, 'Event category');
  if (!categoryValidation.isValid) {
    errors.category = categoryValidation.message;
  }
  
  // Validate date
  const dateValidation = validateFutureDate(eventData.date, 'Event date');
  if (!dateValidation.isValid) {
    errors.date = dateValidation.message;
  }
  
  // Validate venue name
  const venueNameValidation = validateRequired(eventData.venue?.name, 'Venue name');
  if (!venueNameValidation.isValid) {
    errors.venueName = venueNameValidation.message;
  }
  
  // Validate venue address
  const venueAddressValidation = validateRequired(eventData.venue?.address, 'Venue address');
  if (!venueAddressValidation.isValid) {
    errors.venueAddress = venueAddressValidation.message;
  }
  
  // Validate capacity
  const capacityValidation = validateNumber(eventData.venue?.capacity, 'Venue capacity', 1);
  if (!capacityValidation.isValid) {
    errors.capacity = capacityValidation.message;
  }
  
  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};

export const validateTicketCategoryForm = (categoryData) => {
  const errors = {};
  
  // Validate name
  const nameValidation = validateRequired(categoryData.name, 'Category name');
  if (!nameValidation.isValid) {
    errors.name = nameValidation.message;
  }
  
  // Validate price
  const priceValidation = validateNumber(categoryData.price, 'Price', 0);
  if (!priceValidation.isValid) {
    errors.price = priceValidation.message;
  }
  
  // Validate total seats
  const totalSeatsValidation = validateNumber(categoryData.totalSeats, 'Total seats', 1);
  if (!totalSeatsValidation.isValid) {
    errors.totalSeats = totalSeatsValidation.message;
  }
  
  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};

export const validateRegistrationForm = (formData) => {
  const errors = {};
  
  // Validate first name
  const firstNameValidation = validateName(formData.firstName, 'First name');
  if (!firstNameValidation.isValid) {
    errors.firstName = firstNameValidation.message;
  }
  
  // Validate last name
  const lastNameValidation = validateName(formData.lastName, 'Last name');
  if (!lastNameValidation.isValid) {
    errors.lastName = lastNameValidation.message;
  }
  
  // Validate email
  const emailValidation = validateEmail(formData.email);
  if (!emailValidation.isValid) {
    errors.email = emailValidation.message;
  }
  
  // Validate phone number
  const phoneValidation = validatePhoneNumber(formData.phoneNumber);
  if (!phoneValidation.isValid) {
    errors.phoneNumber = phoneValidation.message;
  }
  
  // Validate password
  const passwordValidation = validatePassword(formData.password);
  if (!passwordValidation.isValid) {
    errors.password = passwordValidation.message;
  }
  
  // Validate confirm password
  const confirmPasswordValidation = validateConfirmPassword(
    formData.password, 
    formData.confirmPassword
  );
  if (!confirmPasswordValidation.isValid) {
    errors.confirmPassword = confirmPasswordValidation.message;
  }
  
  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};

export default {
  validateEmail,
  validatePassword,
  validateConfirmPassword,
  validateName,
  validatePhoneNumber,
  validateRequired,
  validateNumber,
  validateDate,
  validateFutureDate,
  validateUrl,
  validateEventForm,
  validateTicketCategoryForm,
  validateRegistrationForm,
};