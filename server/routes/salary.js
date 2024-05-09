const express = require('express');
const router = express.Router();
const salaryController = require('../controllers/salaryController');

router.get('/salaryList', salaryController.viewSalaryList); // GET request to view the salary list
router.post('/addSalary', salaryController.addSalary); // POST request to add a new salary
router.get('/addSalary', salaryController.renderAddSalaryPage); // GET request to render the add salary page
router.put('/editSalary/:id', salaryController.editSalary); // PUT request to edit an existing salary
router.get('/generatePayslip/:id', salaryController.generatePayslip); // GET request to generate a payslip for a specific salary
router.get('/generateOverallSalaryReport', salaryController.generateOverallSalaryReport); // GET request to generate an overall salary report

module.exports = router;