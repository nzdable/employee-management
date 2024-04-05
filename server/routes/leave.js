const express = require('express');
const router = express.Router();
const LeaveController = require('../controllers/leaveController');

// Route to create a new leave
router.post('/leave', LeaveController.createLeave);
// Route to retrieve leave information
router.get('/leave', LeaveController.getLeave);
// Route to render edit leave form
router.get('/leave/:id/edit', LeaveController.editLeaveForm);
// Route to handle the submission of the updated leave form
router.post('/leave/:id/edit', LeaveController.updateLeave);

module.exports = router;
