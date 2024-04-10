const express = require('express');
const router = express.Router();
const salaryController = require('../controllers/salaryController');

router.post('/salaryList', salaryController.viewSalaryList);
router.post('/addSalary', salaryController.addSalary);
router.get('/addSalary', salaryController.renderAddSalaryPage);
router.put('/editSalary/:id', salaryController.editSalary);
router.get('/generatePayslip/:id', salaryController.generatePayslip);
router.get('/generateOverallSalaryReport', salaryController.generateOverallSalaryReport);
router.get('/salaryList', salaryController.viewSalaryList);

module.exports = router;
