const Salary = require('../models/Salary');
const Customer = require('../models/Customer');
const PDFDocument = require('pdfkit');
const blobStream = require('blob-stream');

// Function to calculate the Basic Daily Rate
const calculateBasicDailyRate = (monthlyRate) => {
  const numberOfMonthsInYear = 12;
  const totalWorkingDaysInYear = 260; // Assuming 260 working days in a year
  return (monthlyRate * numberOfMonthsInYear) / totalWorkingDaysInYear;
};

// Function to calculate various rates based on the Basic Daily Rate
const calculateRates = (basicDailyRate) => {
  return {
    specialDayRate: basicDailyRate * 1.3,
    specialDayRestDayRate: basicDailyRate * 1.5,
    regularHolidayRate: basicDailyRate * 2,
    regularHolidayRestDayRate: basicDailyRate * 2.6,
  };
};

// Function to calculate deductions for absences and tardiness
const calculateDeductions = (basicDailyRate, absences, tardinessHours) => {
  const hourlyRate = basicDailyRate / 8; // Assuming 8 working hours per day
  const absencesDeduction = hourlyRate * 8 * absences; // Assuming 8 hours per day
  const tardinessDeduction = hourlyRate * tardinessHours;
  return {
    absencesDeduction,
    tardinessDeduction,
  };
};

// Render the page to add a new salary
exports.renderAddSalaryPage = async (req, res) => {
  try {
    // Retrieve customers from the database
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

// Add a new salary
exports.addSalary = async (req, res) => {
  const {
    employeeName,
    monthlyRate,
    startingCutoff,
    endingCutoff,
    absences,
    tardinessHours,
    numberOfWorkingDays,
  } = req.body;

  try {
    const basicDailyRate = calculateBasicDailyRate(monthlyRate);
    const rates = calculateRates(basicDailyRate);
    const deductions = calculateDeductions(basicDailyRate, absences, tardinessHours);
    const totalEarnings = basicDailyRate * numberOfWorkingDays;
    const totalDeductions = deductions.absencesDeduction + deductions.tardinessDeduction;
    const netSalary = totalEarnings - totalDeductions;

    const newSalary = new Salary({
      employeeName,
      basicDailyRate,
      ...rates,
      ...deductions,
      totalEarnings,
      totalDeductions,
      netSalary,
      startingCutoff,
      endingCutoff,
    });

    await newSalary.save();

    res.redirect('/salaryList'); // Redirect to the salary list page
  } catch (error) {
    console.error(error);
    res.status(500).send('An error occurred while adding salary.');
  }
};

// Render the page to view all salaries
exports.viewSalaryList = async (req, res) => {
  try {
    const messages = await req.flash("info");
    const title = "Salary List";

    let perPage = 12;
    let page = req.query.page || 1;

    const salaries = await Salary.find()
      .skip(perPage * page - perPage)
      .limit(perPage)
      .exec();
    const count = await Salary.countDocuments({});

    res.render('salaryList', {
      title,
      salaries,
      current: page,
      pages: Math.ceil(count / perPage),
      messages,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send('An error occurred while fetching salary list.');
  }
};

// Render the page to view a specific salary
exports.viewSalary = async (req, res) => {
  try {
    const salary = await Salary.findById(req.params.id);
    res.render('viewSalary', { salary });
  } catch (error) {
    console.error(error);
    res.status(500).send('An error occurred while fetching salary details.');
  }
};

// Edit an existing salary
exports.editSalary = async (req, res) => {
  const {
    employeeName,
    salary,
    pagibig,
    sss,
    philhealth,
    tin,
    overtime,
    incentives,
    tardiness,
    absences,
    loans,
    violations,
    payrollDate,
    startingCutoff,
    endingCutoff
  } = req.body;

  try {
    await Salary.findByIdAndUpdate(req.params.id, {
      employeeName,
      salary,
      pagibig,
      sss,
      philhealth,
      tin,
      overtime,
      incentives,
      tardiness,
      absences,
      loans,
      violations,
      payrollDate,
      startingCutoff,
      endingCutoff,
      updatedAt: Date.now()
    });

    res.redirect('/salary/viewSalary/' + req.params.id);
  } catch (error) {
    console.error(error);
    res.status(500).send('An error occurred while editing salary.');
  }
};

// Generate a payslip for a specific salary
exports.generatePayslip = async (req, res) => {
  try {
    const salary = await Salary.findById(req.params.id);
    res.render('viewSalary', { salary });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while generating payslip' });
  }
};

// Generate an overall salary report
exports.generateOverallSalaryReport = async (req, res) => {
  try {
    const salaries = await Salary.find();
    // Implement your logic to generate overall salary report here
    // For example, you can calculate total earnings, total deductions, etc.
    // Then render a report template with the calculated values
    res.render('overallSalaryReport', { salaries });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while generating overall salary report' });
  }
};