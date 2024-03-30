const express = require('express');
const router = express.Router();
const customerController = require('../controllers/customerController');

// Routes
router.get('/', customerController.homepage);
router.get('/about', customerController.about);
router.get('/add', customerController.addCustomer);
router.post('/add', customerController.postCustomer);
router.get('/view/:id', customerController.view);
router.get('/edit/:id', customerController.edit);
router.post('/edit/:id', customerController.editPost);
router.delete('/delete/:id', customerController.deleteCustomer); // Updated to use DELETE request, assuming `id` is `employeeId`
router.post('/postCustomerLeave', customerController.postCustomerLeave);

module.exports = router;
