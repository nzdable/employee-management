const Leave = require('../models/Leave');
const Customer = require('../models/Customer');

// Function to retrieve employee ID by name
const getEmployeeIdByName = async (employeeName) => {
  try {
    const customer = await Customer.findOne({ fullName: employeeName }); // Assuming fullName is a field in your Customer model that combines first name and last name
    return customer._id; // Assuming employeeId is stored in the _id field of the Customer model
  } catch (error) {
    console.error(error);
    return null; // Return null if employee is not found
  }
};

// Function to retrieve superior ID by name
const getSuperiorIdByName = async (superiorName) => {
  try {
    const customer = await Customer.findOne({ fullName: superiorName }); // Assuming fullName is a field in your Customer model that combines first name and last name
    return customer._id; // Assuming superiorId is stored in the _id field of the Customer model
  } catch (error) {
    console.error(error);
    return null; // Return null if superior is not found
  }
};

exports.createLeave = async (req, res) => {
  try {
    const { employeeName, superiorName, leaveType, leaveStatus, startDate, endDate } = req.body;

    // Assuming you have a function to retrieve the employee and superior IDs from their names
    const employeeId = await getEmployeeIdByName(employeeName);
    const superiorId = await getSuperiorIdByName(superiorName);

    if (!employeeId || !superiorId) {
      return res.status(400).json({ error: 'Invalid employee or superior name' });
    }

    // Fetch only superiors with position 'manager'
    const managerSuperiors = await Customer.find({ position: 'manager' });

    const newLeave = new Leave({
      employeeId,
      superiorId,
      leaveType,
      leaveStatus,
      startDate,
      endDate,
    });

    await newLeave.save();

    // Fetch the updated list of leave requests
    const leaveRequests = await Leave.find({ /* Add any conditions if necessary */ });

    // Render the view with only the leave information
    res.render('leave', { leaveRequests, managerSuperiors });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while saving leave details' });
  }
};

exports.getLeave = async (req, res) => {
  try {
    // Fetch the updated list of leave requests
    const leaveRequests = await Leave.find({ /* Add any conditions if necessary */ });

    // Fetch only superiors with position 'manager'
    const managerSuperiors = await Customer.find({ position: 'manager' });

    // Render the view with the leave information
    res.render('leave', { leaveRequests, managerSuperiors });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while fetching leave details' });
  }
};

// Function to handle editing of leave details
exports.editLeave = async (req, res) => {
  try {
    // Retrieve leave ID from request parameters
    const { id } = req.params;

    // Find leave by ID
    const leave = await Leave.findById(id);

    // Fetch only superiors with position 'manager'
    const managerSuperiors = await Customer.find({ position: 'manager' });

    // Render the edit leave form with leave details
    res.render('editLeave', { leave, managerSuperiors });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while rendering edit leave form' });
  }
};

exports.editLeaveForm = async (req, res) => {
  try {
    // Fetch leave details based on ID from the database
    const leave = await Leave.findById(req.params.id);
    // Render the leave form for editing with the fetched leave details
    res.render('editLeave', { leave });
  } catch (error) {
    console.error(error);
    // Handle errors appropriately
    res.status(500).json({ error: 'An error occurred while rendering the edit form' });
  }
};

exports.updateLeave = async (req, res) => {
  try {
    // Fetch leave details based on ID from the database
    const leave = await Leave.findById(req.params.id);
    // Update leave details with data from the request body
    // Assuming leave details are updated and saved here
    // Redirect to the leave table page after successful update
    res.redirect('/leave');
  } catch (error) {
    console.error(error);
    // Handle errors appropriately
    res.status(500).json({ error: 'An error occurred while updating leave details' });
  }
};