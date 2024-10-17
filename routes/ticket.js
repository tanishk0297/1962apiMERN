// routes/tickets.js
const express = require('express');
const Ticket = require('../models/ticket.js'); // Ensure this model exists
const router = express.Router();

// Create a new ticket
router.post('/', async (req, res) => {
    try {
        const newTicket = new Ticket(req.body);
        const savedTicket = await newTicket.save();
        res.status(201).json(savedTicket);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Get all tickets
router.get('/', async (req, res) => {
    try {
        const tickets = await Ticket.find();
        res.status(200).json(tickets);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Fetch tickets by a specific date
router.get('/date', async (req, res) => {
    const { date } = req.query;

    try {
        // If no date is provided, send a bad request response
        if (!date) {
            return res.status(400).json({ message: 'Date is required' });
        }

        // Convert the date string to an actual Date object
        const targetDate = new Date(date);
        const startOfDay = new Date(targetDate.setHours(0, 0, 0, 0));
        const endOfDay = new Date(targetDate.setHours(23, 59, 59, 999));

        // Fetch tickets that match the specified date
        const tickets = await Ticket.find({
            date: {
                $gte: startOfDay, // Start of the selected date
                $lte: endOfDay    // End of the selected date
            }
        });

        // If no tickets are found, return a not found response
        if (tickets.length === 0) {
            return res.status(404).json({ message: 'No tickets found for the specified date' });
        }

        // Return the fetched tickets
        res.status(200).json(tickets);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

// Get a ticket by ID
router.get('/:id', async (req, res) => {
    try {
        const ticket = await Ticket.findById(req.params.id);
        if (!ticket) return res.status(404).json({ message: 'Ticket not found' });
        res.status(200).json(ticket);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Get the latest ticket for a specific car number and date
router.get('/latest/:carNumber', async (req, res) => {
    const { carNumber } = req.params;
    const { date } = req.query; // Get the date from query parameters

    try {
        // Convert the date to ISO format
        const targetDate = new Date(date);
        const startOfDay = new Date(targetDate.setHours(0, 0, 0, 0));
        const endOfDay = new Date(targetDate.setHours(23, 59, 59, 999));

        // Fetch the latest record from the database based on carNumber and date
        const latestRecord = await Ticket.findOne({
            carNumber,
            date: {
                $gte: startOfDay, // Start of the selected date
                $lte: endOfDay,   // End of the selected date
            }
        }).sort({ createdAt: -1 }); // Sort by createdAt in descending order

        if (!latestRecord) {
            return res.status(404).json({ message: 'No record found' });
        }
        return res.json(latestRecord);
    } catch (error) {
        return res.status(500).json({ message: 'Server error' });
    }
});

// Update a ticket by ID
router.put('/:id', async (req, res) => {
    try {
        const updatedTicket = await Ticket.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedTicket) return res.status(404).json({ message: 'Ticket not found' });
        res.status(200).json(updatedTicket);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Delete a ticket by ID
router.delete('/:id', async (req, res) => {
    try {
        const deletedTicket = await Ticket.findByIdAndDelete(req.params.id);
        if (!deletedTicket) return res.status(404).json({ message: 'Ticket not found' });
        res.status(200).json({ message: 'Ticket deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
