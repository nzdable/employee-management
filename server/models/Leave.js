const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const LeaveSchema = new Schema({
  start_leave: {
    type: Date,
    required: true
  },
  end_leave: {
    type: Date,
    required: true
  },
  leave_type: {
    type: String,
    enum: ['vacation', 'sick', 'maternity', 'paternity'],
    required: true
  },
  leave_status: {
    type: String,
    enum: ['approved', 'denied', 'pending'],
    required: true
  },
  customer: {
    type: Schema.Types.ObjectId,
    ref: 'Customer'
  }
});

module.exports = mongoose.model('Leave', LeaveSchema);
