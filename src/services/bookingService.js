import ApiService from './api';

class BookingService {
  async createBooking(bookingData) {
    try {
      const response = await ApiService.post('/bookings', bookingData);
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

  async getMyBookings() {
    try {
      const response = await ApiService.get('/bookings/my-bookings');
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

  async getBookingById(bookingId) {
    try {
      const response = await ApiService.get(`/bookings/${bookingId}`);
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

  async processPayment(bookingId, paymentData) {
    try {
      const response = await ApiService.post(`/bookings/${bookingId}/payment`, paymentData);
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

  async cancelBooking(bookingId) {
    try {
      const response = await ApiService.put(`/bookings/${bookingId}/cancel`);
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

  async downloadTicket(bookingId) {
    try {
      const response = await ApiService.get(`/bookings/${bookingId}/ticket`);
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
}

export default new BookingService();