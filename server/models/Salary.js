const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SalarySchema = new Schema({
    employeeName: { type: String, required: true },
    tin: { type: String, required: true },
    sss: { type: String, required: true },
    philhealth: { type: String, required: true },
    hdmf: { type: String, required: true },    
    basicPay: { type: Number, required: true },
    nightDiff: { type: Number, default: 0 },
    overtimePay: { type: Number, default: 0 },
    holidayPay: { type: Number, default: 0 },
    internetAllowance: { type: Number, default: 0 },
    otherBonuses: { type: Number, default: 0 },
    attendanceIncentive: { type: Number, default: 0 },
    // Deductions
    sssDeduction: { type: Number, default: 0 },
    philhealthDeduction: { type: Number, default: 0 },
    hdmfDeduction: { type: Number, default: 0 },
    // Calculated fields
    totalCompensation: { type: Number, default: 0 },
    totalNetPay: { type: Number, default: 0 },
    // Dates
    payrollDate: { type: Date, default: Date.now },
    startingCutoff: { type: Date, default: Date.now },
    endingCutoff: { type: Date, default: Date.now }
});

// Pre-save middleware to calculate total compensation and net pay
SalarySchema.pre('save', function(next) {
    this.totalCompensation = this.basicPay + this.nightDiff + this.overtimePay + this.holidayPay + this.internetAllowance + this.otherBonuses + this.attendanceIncentive;
    this.totalNetPay = this.totalCompensation - (this.sssDeduction + this.philhealthDeduction + this.hdmfDeduction);
    next();
});

const Salary = mongoose.model('Salary', SalarySchema);
module.exports = Salary;