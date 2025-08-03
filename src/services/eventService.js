import ApiService from './api';

class EventService {
  async getAllEvents(params = {}) {
    try {
      const queryString = new URLSearchParams(params).toString();
      const endpoint = `/events${queryString ? `?${queryString}` : ''}`;
      
      const response = await ApiService.get(endpoint);
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

  async getEventById(eventId) {
    try {
      const response = await ApiService.get(`/events/${eventId}`);
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

  async getEventsByCategory(category) {
    try {
      const response = await ApiService.get(`/events/category/${category}`);
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

  async searchEvents(query, filters = {}) {
    try {
      const params = {
        search: query,
        ...filters,
      };
      
      return this.getAllEvents(params);
    } catch (error) {
      return {
        success: false,
        message: error.message,
      };
    }
  }

  // Admin functions
  async createEvent(eventData) {
    try {
      const response = await ApiService.post('/admin/events', eventData);
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

  async updateEvent(eventId, eventData) {
    try {
      const response = await ApiService.put(`/admin/events/${eventId}`, eventData);
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

  async deleteEvent(eventId) {
    try {
      const response = await ApiService.delete(`/admin/events/${eventId}`);
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

  async createTicketCategory(eventId, categoryData) {
    try {
      const response = await ApiService.post(`/admin/events/${eventId}/tickets`, categoryData);
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

export default new EventService();