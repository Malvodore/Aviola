const mongoose = require('mongoose');

const ticketCategorySchema = new mongoose.Schema({
  eventId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Event',
    required: true
  },
  name: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  totalSeats: {
    type: Number,
    required: true
  },
  availableSeats: {
    type: Number,
    required: true
  },
  description: {
    type: String,
    default: ''
  },
  color: {
    type: String,
    default: '#FF1744'
  },
  benefits: [{
    type: String
  }]
}, {
  timestamps: true
});

module.exports = mongoose.model('TicketCategory', ticketCategorySchema);