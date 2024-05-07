const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SalarySchema = new Schema({
    employeeName: {
        type: String,
        required: true
    },
    tin: {
        type: String,
        required: true
    },
    sss: {
        type: String,
        required: true
    },
    philhealth: {
        type: String,
        required: true
    },
    hdmf: {
        type: String,
        required: true
    },
    basicPay: {
        type: Number,
        required: true
    },
    nightDiff: {
        type: Number,
        required: true
    },
    overtimePay: {
        type: Number,
        required: true
    },
    holidayPay: {
        type: Number,
        required: true
    },
    internetAllowance: {
        type: Number,
        required: true
    },
    otherBonuses: {
        type: Number,
        required: true
    },
    attendanceIncentive: {
        type: Number,
        required: true
    },
    totalCompensation: {
        type: Number,
        required: true
    },
    totalNetPay: {
        type: Number,
        required: true
    },
    hoursWorked: {
        type: Number,
        required: true
    },
    regularOvertime: {
        type: Number,
        required: true
    },
    regularHoliday: {
        type: Number,
        required: true
    },
    specialNonWorkingDay: {
        type: Number,
        required: true
    },
    holidayOvertime: {
        type: Number,
        required: true
    },
    serviceIncentiveLeaveCredit: {
        type: Number,
        required: true
    },
    grossPayRate: {
        type: Number,
        required: true
    },
    grossRatePerHour: {
        type: Number,
        required: true
    },
    grossSalaryDollars: {
        type: Number,
        required: true
    },
    grossSalaryPesos: {
        type: Number,
        required: true
    },
    internetAllowanceBonuses: {
        type: Number,
        required: true
    },
    totalGrossCompensation: {
        type: Number,
        required: true
    },
    yearToDateCompensation: {
        type: Number,
        required: true
    },
    yearToDateDeductions: {
        type: Number,
        required: true
    },
    yearToDateGrossPay: {
        type: Number,
        required: true
    },
    yearToDateNetPay: {
        type: Number,
        required: true
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
