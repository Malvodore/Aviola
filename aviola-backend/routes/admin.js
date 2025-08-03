const express = require('express');
const Booking = require('../models/Booking');
const TicketCategory = require('../models/TicketCategory');
const { auth } = require('../middleware/auth');

const router = express.Router();

// Create booking
router.post('/', auth, async (req, res) => {
  try {
    const { eventId, tickets } = req.body;
    
    let totalAmount = 0;
    const bookingTickets = [];
    
    // Process each ticket category
    for (const ticket of tickets) {
      const category = await TicketCategory.findById(ticket.categoryId);
      if (!category) {
        return res.status(404).json({ message: 'Ticket category not found' });
      }
      
      if (category.availableSeats < ticket.quantity) {
        return res.status(400).json({ 
          message: `Not enough seats available for ${category.name}` 
        });
      }
      
      const ticketTotal = category.price * ticket.quantity;
      totalAmount += ticketTotal;
      
      bookingTickets.push({
        categoryId: ticket.categoryId,
        quantity: ticket.quantity,
        unitPrice: category.price
      });
      
      // Update available seats
      category.availableSeats -= ticket.quantity;
      await category.save();
    }
    
    // Create booking
    const booking = new Booking({
      userId: req.user._id,
      eventId,
      tickets: bookingTickets,
      totalAmount
    });
    
    await booking.save();
    
    // Populate booking details
    await booking.populate([
      { path: 'eventId', select: 'title date time venue' },
      { path: 'tickets.categoryId', select: 'name price' }
    ]);
    
    res.status(201).json({
      message: 'Booking created successfully',
      booking
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get user bookings
router.get('/my-bookings', auth, async (req, res) => {
  try {
    const bookings = await Booking.find({ userId: req.user._id })
      .populate('eventId', 'title date time venue images')
      .populate('tickets.categoryId', 'name price')
      .sort({ createdAt: -1 });
    
    res.json({ bookings });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get booking by ID
router.get('/:id', auth, async (req, res) => {
  try {
    const booking = await Booking.findOne({ 
      _id: req.params.id,
      userId: req.user._id 
    })
    .populate('eventId', 'title date time venue')
    .populate('tickets.categoryId', 'name price');
    
    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }
    
    res.json({ booking });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Mock payment processing
router.post('/:id/payment', auth, async (req, res) => {
  try {
    const { paymentMethod } = req.body;
    
    const booking = await Booking.findOne({
      _id: req.params.id,
      userId: req.user._id
    });
    
    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }
    
    // Mock payment processing (always successful)
    const mockPaymentId = 'pay_' + Date.now() + Math.random().toString(36).substr(2, 9);
    
    booking.paymentStatus = 'paid';
    booking.bookingStatus = 'confirmed';
    booking.paymentId = mockPaymentId;
    
    await booking.save();
    
    res.json({
      message: 'Payment processed successfully',
      paymentId: mockPaymentId,
      booking
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;