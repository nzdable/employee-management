const express = require('express');
const router = express.Router();
const LeaveController = require('../controllers/leaveController');

// Route to create a new leave
router.post('/leave', LeaveController.createLeave);

// Add more routes as needed

module.exports = router;
