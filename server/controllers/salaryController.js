const Salary = require('../models/Salary');
const Customer = require('../models/Customer');
// const PDFDocument = require('pdfkit');
// const blobStream = require('blob-stream');

// Function to calculate the Basic Daily Rate
// const calculateBasicDailyRate = (monthlyRate) => {
//     const numberOfMonthsInYear = 12;
//     const totalWorkingDaysInYear = 260; // Assuming 260 working days in a year
//     return (monthlyRate * numberOfMonthsInYear) / totalWorkingDaysInYear;
//   };
  
// // Function to calculate various rates based on the Basic Daily Rate
// const calculateRates = (basicDailyRate) => {
//     return {
//       specialDayRate: basicDailyRate * 1.3,
//       specialDayRestDayRate: basicDailyRate * 1.5,
//       regularHolidayRate: basicDailyRate * 2,
//       regularHolidayRestDayRate: basicDailyRate * 2.6,
//     };
//   };  
  
// // Function to calculate deductions for absences and tardiness
// const calculateDeductions = (basicDailyRate, absences, tardinessHours) => {
// const hourlyRate = basicDailyRate / 8; // Assuming 8 working hours per day
// const absencesDeduction = hourlyRate * 8 * absences; // Assuming 8 hours per day
// const tardinessDeduction = hourlyRate * tardinessHours;
//     return {
//       absencesDeduction,
//       tardinessDeduction,
//     };
//   };

// Define a function to calculate the gross pay rate based on the basic pay
function calculateGrossPayRate(basicPay) {
    return basicPay * 1.2;  // Example calculation, adjust as needed
}

// Example exchange rate
const exchangeRate = 50;

exports.renderAddSalaryPage = async (req, res) => {
    try {
      const customers = await Customer.find().exec();
      const locals = {
        title: "Add New Salary",
        customers: customers
      };
      res.render("salary/addSalary", locals);
    } catch (error) {
      console.error(error);
      res.status(500).send('An error occurred while rendering the add salary page.');
    }
};

exports.addSalary = async (req, res) => {
    const {
        employeeName, tin, sss, philhealth, hdmf, basicPay, nightDiff,
        overtimePay, holidayPay, internetAllowance, otherBonuses, attendanceIncentive,
        sssDeduction, philhealthDeduction, hdmfDeduction, startingCutoff, endingCutoff
    } = req.body;

    // Calculate grossPayRate
    const grossPayRate = calculateGrossPayRate(basicPay);  // You need to define this function

    // Assuming grossPayRate needs to be calculated or passed in.
    // If grossPayRate is not passed as part of the request, calculate it as needed:
    // const calculatedGrossPayRate = grossPayRate || calculateGrossPayRate(basicPay);  // You need to define this function

    const grossSalaryDollars = basicPay * exchangeRate;
    const grossSalaryPesos = basicPay;  // Already defined

    const newSalary = new Salary({
        employeeName, tin, sss, philhealth, hdmf,
        basicPay, nightDiff, overtimePay, holidayPay, internetAllowance,
        otherBonuses, attendanceIncentive, sssDeduction, philhealthDeduction,
        hdmfDeduction, payrollDate: new Date(), startingCutoff, endingCutoff,
        grossPayRate,
        grossSalaryDollars,
        grossSalaryPesos
    });

    try {
        await newSalary.save();
        res.redirect('/salaryList'); // Redirect to the salary list page
    } catch (error) {
        console.error(error);
        res.status(500).send('An error occurred while adding salary.');
    }
};

exports.viewSalaryList = async (req, res) => {
    try {
        const salaries = await Salary.find();
        res.render('salaryList', { title: "Salary List", salaries });
    } catch (error) {
        console.error(error);
        res.status(500).send('An error occurred while fetching salary list.');
    }
};

exports.editSalary = async (req, res) => {
    const { id } = req.params;
    const salaryUpdates = req.body;

    try {
        await Salary.findByIdAndUpdate(id, salaryUpdates);
        res.redirect(`salary/viewSalary/${id}`);
    } catch (error) {
        console.error(error);
        res.status(500).send('An error occurred while editing salary.');
    }
};

exports.viewSalary = async (req, res) => {
    const { id } = req.params;
    try {
        const salary = await Salary.findById(id);
        console.log(salary);  // Log the salary object to debug
        res.render('salary/viewSalary', { title: "View Salary", salary });
    } catch (error) {
        console.error(error);
        res.status(500).send('An error occurred while fetching salary details.');
    }
};
