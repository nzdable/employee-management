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
    res.render('leave', { leaveRequests });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while saving leave details' });
  }
};
