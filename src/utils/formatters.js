export const formatCurrency = (amount, currency = ') => {
    if (typeof amount !== 'number') {
      return `${currency}0.00`;
    }
    return `${currency}${amount.toFixed(2)}`;
  };
  
  export const formatDate = (date, format = 'MMM DD, YYYY') => {
    if (!date) return '';
    
    const dateObj = new Date(date);
    if (isNaN(dateObj.getTime())) return '';
  
    const months = [
      'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
      'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
    ];
    
    const fullMonths = [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ];
  
    const day = dateObj.getDate();
    const month = dateObj.getMonth();
    const year = dateObj.getFullYear();
    const hours = dateObj.getHours();
    const minutes = dateObj.getMinutes();
  
    switch (format) {
      case 'MMM DD, YYYY':
        return `${months[month]} ${day.toString().padStart(2, '0')}, ${year}`;
      case 'MMMM DD, YYYY':
        return `${fullMonths[month]} ${day.toString().padStart(2, '0')}, ${year}`;
      case 'DD/MM/YYYY':
        return `${day.toString().padStart(2, '0')}/${(month + 1).toString().padStart(2, '0')}/${year}`;
      case 'YYYY-MM-DD':
        return `${year}-${(month + 1).toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
      case 'HH:mm':
        return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
      case 'h:mm A':
        const hour12 = hours % 12 || 12;
        const ampm = hours >= 12 ? 'PM' : 'AM';
        return `${hour12}:${minutes.toString().padStart(2, '0')} ${ampm}`;
      default:
        return dateObj.toLocaleDateString();
    }
  };
  
  export const formatTime = (time) => {
    if (!time) return '';
    
    // Handle time in HH:mm format
    const [hours, minutes] = time.split(':');
    const hour = parseInt(hours, 10);
    const minute = parseInt(minutes, 10);
    
    if (isNaN(hour) || isNaN(minute)) return time;
    
    const hour12 = hour % 12 || 12;
    const ampm = hour >= 12 ? 'PM' : 'AM';
    
    return `${hour12}:${minute.toString().padStart(2, '0')} ${ampm}`;
  };
  
  export const formatPhoneNumber = (phone) => {
    if (!phone) return '';
    
    // Remove all non-digit characters
    const digits = phone.replace(/\D/g, '');
    
    // Format as (XXX) XXX-XXXX for US numbers
    if (digits.length === 10) {
      return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`;
    }
    
    // Return original if not a standard format
    return phone;
  };
  
  export const formatEventDuration = (minutes) => {
    if (!minutes || minutes <= 0) return '';
    
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    
    if (hours === 0) {
      return `${remainingMinutes} mins`;
    } else if (remainingMinutes === 0) {
      return `${hours} ${hours === 1 ? 'hour' : 'hours'}`;
    } else {
      return `${hours}h ${remainingMinutes}m`;
    }
  };
  
  export const formatBookingReference = (reference) => {
    if (!reference) return '';
    
    // Format as XX-XXXXX-XX
    const digits = reference.replace(/\D/g, '');
    if (digits.length >= 9) {
      return `${digits.slice(0, 2)}-${digits.slice(2, 7)}-${digits.slice(7, 9)}`;
    }
    
    return reference;
  };
  
  export const formatCapacity = (capacity) => {
    if (!capacity || capacity <= 0) return '';
    
    if (capacity >= 1000000) {
      return `${(capacity / 1000000).toFixed(1)}M`;
    } else if (capacity >= 1000) {
      return `${(capacity / 1000).toFixed(1)}K`;
    }
    
    return capacity.toString();
  };
  
  export const formatPercentage = (value, total) => {
    if (!value || !total || total <= 0) return '0%';
    
    const percentage = (value / total) * 100;
    return `${Math.round(percentage)}%`;
  };
  
  export const formatRelativeTime = (date) => {
    if (!date) return '';
    
    const now = new Date();
    const eventDate = new Date(date);
    const diffInMs = eventDate.getTime() - now.getTime();
    const diffInDays = Math.ceil(diffInMs / (1000 * 60 * 60 * 24));
    
    if (diffInDays < 0) {
      return 'Past event';
    } else if (diffInDays === 0) {
      return 'Today';
    } else if (diffInDays === 1) {
      return 'Tomorrow';
    } else if (diffInDays <= 7) {
      return `In ${diffInDays} days`;
    } else if (diffInDays <= 30) {
      const weeks = Math.ceil(diffInDays / 7);
      return `In ${weeks} ${weeks === 1 ? 'week' : 'weeks'}`;
    } else {
      const months = Math.ceil(diffInDays / 30);
      return `In ${months} ${months === 1 ? 'month' : 'months'}`;
    }
  };
  
  export const truncateText = (text, maxLength = 100) => {
    if (!text || text.length <= maxLength) return text;
    
    return text.substring(0, maxLength).trim() + '...';
  };
  
  export const capitalizeFirstLetter = (string) => {
    if (!string) return '';
    return string.charAt(0).toUpperCase() + string.slice(1);
  };
  
  export const formatSearchQuery = (query) => {
    if (!query) return '';
    return query.trim().toLowerCase();
  };
  
  export default {
    formatCurrency,
    formatDate,
    formatTime,
    formatPhoneNumber,
    formatEventDuration,
    formatBookingReference,
    formatCapacity,
    formatPercentage,
    formatRelativeTime,
    truncateText,
    capitalizeFirstLetter,
    formatSearchQuery,
  };