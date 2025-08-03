const express = require('express');
const Event = require('../models/Event');
const TicketCategory = require('../models/TicketCategory');

const router = express.Router();

// Get all events
router.get('/', async (req, res) => {
  try {
    const { page = 1, limit = 10, category, search } = req.query;
    
    let query = { status: 'active' };
    
    if (category) query.category = category;
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } }
      ];
    }
    
    const events = await Event.find(query)
      .sort({ date: 1 })
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .populate('createdBy', 'firstName lastName');
    
    const total = await Event.countDocuments(query);
    
    res.json({
      events,
      totalPages: Math.ceil(total / limit),
      currentPage: parseInt(page),
      total
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get event by ID
router.get('/:id', async (req, res) => {
  try {
    const event = await Event.findById(req.params.id).populate('createdBy', 'firstName lastName');
    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }
    
    const ticketCategories = await TicketCategory.find({ eventId: event._id });
    
    res.json({ event, ticketCategories });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get events by category
router.get('/category/:category', async (req, res) => {
  try {
    const events = await Event.find({ 
      category: req.params.category,
      status: 'active'
    }).sort({ date: 1 });
    
    res.json({ events });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;