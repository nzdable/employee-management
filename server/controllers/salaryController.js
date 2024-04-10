const Salary = require('../models/Salary');

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

exports.addSalary = async (req, res) => {
  const {
      employeeName,
      salary,
      startingCutoff,
      endingCutoff
  } = req.body;

  try {
      // Calculate semi-monthly payment based on cutoff dates
      const semiMonthlySalary = calculateSemiMonthlySalary(salary, startingCutoff, endingCutoff);

      // Calculate government deductions, additional earnings, and other deductions
      const { pagibig, sss, philhealth, tin } = calculateGovernmentDeductions(semiMonthlySalary);
      const { thirteenthMonth, incentives } = calculateAdditionalEarnings(semiMonthlySalary);
      const { tardiness, absences, loans, violations } = calculateOtherDeductions(semiMonthlySalary);

      const newSalary = new Salary({
          employeeName,
          salary: semiMonthlySalary,
          pagibig,
          sss,
          philhealth,
          tin,
          thirteenthMonth,
          incentives,
          tardiness,
          absences,
          loans,
          violations,
          startingCutoff,
          endingCutoff
      });

      await newSalary.save();
      res.redirect('/salary/viewSalary/' + newSalary._id);
  } catch (error) {
      console.error(error);
      res.status(500).send('An error occurred while adding salary.');
  }
};

exports.renderAddSalaryPage = async (req, res) => {
  try {
    const locals = {
      title: "Add New Salary",
    };

    res.render("salary/addSalary", locals);
  } catch (error) {
    console.error(error);
    res.status(500).send('An error occurred while rendering the add salary page.');
  }
};

exports.editSalary = async (req, res) => {
  const {
      employeeName,
      salary,
      pagibig,
      sss,
      philhealth,
      tin,
      thirteenthMonth,
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
          thirteenthMonth,
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

exports.generatePayslip = async (req, res) => {
  try {
      const salary = await Salary.findById(req.params.id);
      // Implement your logic to generate payslip here
      // For example, you can render a payslip template with salary details
      res.render('payslip', { salary });
  } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'An error occurred while generating payslip' });
  }
};

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
}