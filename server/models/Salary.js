const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SalarySchema = new Schema({
    employeeName: {
        type: String,
        required: true
    },
    salary: {
        type: Number,
        required: true
    },
    // Government Deductions
    pagibig: {
        type: Number,
        default: 0
    },
    sss: {
        type: Number,
        default: 0
    },
    philhealth: {
        type: Number,
        default: 0
    },
    tin: {
        type: Number,
        default: 0
    },
    // Additional Earnings
    thirteenthMonth: {
        type: Number,
        default: 0
    },
    incentives: {
        type: Number,
        default: 0
    },
    // Other Deductions
    tardiness: {
        type: Number,
        default: 0
    },
    absences: {
        type: Number,
        default: 0
    },
    loans: {
        type: Number,
        default: 0
    },
    violations: {
        type: Number,
        default: 0
    },
    // Dates
    payrollDate: {
        type: Date,
        default: Date.now()
    },
    startingCutoff: {
        type: Date,
        default: Date.now()
    },
    endingCutoff: {
        type: Date,
        default: Date.now()
    }
});

const Salary = mongoose.model('Salary', SalarySchema);
module.exports = Salary;
