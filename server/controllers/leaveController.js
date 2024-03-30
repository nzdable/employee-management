const Leave = require("../models/Leave");

// Create a new leave
exports.createLeave = async (req, res) => {
  try {
    const { start_leave, end_leave, leave_type, leave_status, customer_id } = req.body;

    // Create a new leave instance
    const newLeave = new Leave({
      start_leave,
      end_leave,
      leave_type,
      leave_status,
      customer: customer_id // Assuming customer_id is sent from the request
    });

    // Save the leave to the database
    await newLeave.save();

    res.status(201).json({ message: "Leave created successfully", leave: newLeave });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "An error occurred while creating the leave" });
  }
};

// Get all leaves
exports.getAllLeaves = async (req, res) => {
  try {
    const leaves = await Leave.find();
    res.status(200).json(leaves);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "An error occurred while fetching leaves" });
  }
};

// Get a single leave by ID
exports.getLeaveById = async (req, res) => {
  try {
    const leave = await Leave.findById(req.params.id);
    if (!leave) {
      return res.status(404).json({ message: "Leave not found" });
    }
    res.status(200).json(leave);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "An error occurred while fetching the leave" });
  }
};

// Update a leave
exports.updateLeave = async (req, res) => {
  try {
    const { start_leave, end_leave, leave_type, leave_status } = req.body;
    const updatedLeave = await Leave.findByIdAndUpdate(req.params.id, {
      start_leave,
      end_leave,
      leave_type,
      leave_status
    }, { new: true });

    if (!updatedLeave) {
      return res.status(404).json({ message: "Leave not found" });
    }
    
    res.status(200).json({ message: "Leave updated successfully", leave: updatedLeave });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "An error occurred while updating the leave" });
  }
};

// Delete a leave
exports.deleteLeave = async (req, res) => {
  try {
    const deletedLeave = await Leave.findByIdAndDelete(req.params.id);
    if (!deletedLeave) {
      return res.status(404).json({ message: "Leave not found" });
    }
    res.status(200).json({ message: "Leave deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "An error occurred while deleting the leave" });
  }
};
