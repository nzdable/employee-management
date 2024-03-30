const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const CustomerSchema = new Schema({
  employeeId: {
    type: String,
    required: true,
    unique: true,
    default: generateEmployeeId
  },
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  tel: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  details: {
    type: String,
    required: true
  },
  department: {
    type: String,
    required: true
  },
  destination: {
    type: String,
    required: true
  },
  addressLine: {
    type: String,
    required: true
  },
  barangay: {
    type: String,
    required: true
  },
  province: {
    type: String,
    required: true
  },
  country: {
    type: String,
    required: true
  },
  zipcode: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now()
  },
  updatedAt: {
    type: Date, 
    default: Date.now()
  },
  leaves: [{
    start_leave: { type: Date, required: true },
    end_leave: { type: Date, required: true },
    leave_type: { type: String, enum: ['vacation', 'sick', 'maternity', 'paternity'], required: true },
    leave_status: { type: String, enum: ['approved', 'denied', 'pending'], required: true },
    type: Schema.Types.ObjectId,
    ref: 'Leave'
  }]
});

function generateEmployeeId() {
  // Generate employee ID with exactly 5 digits
  return Math.floor(10000 + Math.random() * 90000).toString();
}

module.exports = mongoose.model('Customer', CustomerSchema);
