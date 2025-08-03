const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true,
    enum: ['concert', 'sports', 'theater', 'conference', 'comedy', 'festival']
  },
  venue: {
    name: {
      type: String,
      required: true
    },
    address: {
      type: String,
      required: true
    },
    city: {
      type: String,
      required: true
    },
    capacity: {
      type: Number,
      required: true
    }
  },
  date: {
    type: Date,
    required: true
  },
  time: {
    type: String,
    required: true
  },
  duration: {
    type: Number,
    default: 120
  },
  images: [{
    type: String
  }],
  organizer: {
    name: {
      type: String,
      required: true
    },
    contact: {
      type: String,
      required: true
    }
  },
  status: {
    type: String,
    enum: ['active', 'cancelled', 'sold_out'],
    default: 'active'
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Event', eventSchema);