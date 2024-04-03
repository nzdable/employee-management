const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const LeaveSchema = new Schema({
    employeeId: {
      type: Schema.Types.ObjectId, // Change type to ObjectId to store references to employees
      ref: 'Customer', // Reference the Customer model where employee details are stored
      required: true,
    },
    superiorId: {
      type: Schema.Types.ObjectId, // Change type to ObjectId to store references to superiors
      ref: 'Customer', // Reference the Customer model where superior details are stored
      required: true,
    },
    leaveType: {
      type: String,
      required: true,
    },
    leaveStatus: {
      type: String,
      enum: ['Pending', 'Approved', 'Rejected'],
      default: 'Pending',
    },
    startDate: {
      type: Date,
      required: true,
    },
    endDate: {
      type: Date,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now(),
    },
  });
  
  module.exports = mongoose.model('Leave', LeaveSchema);