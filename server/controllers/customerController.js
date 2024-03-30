const Customer = require("../models/Customer");
const mongoose = require("mongoose");
const Leave = require("../models/Leave");


exports.homepage = async (req, res) => {
  try {
    const messages = await req.flash("info");
    const locals = {
      title: "NodeJs",
      description: "Free NodeJs User Management System",
    };
    const perPage = 12;
    const page = req.query.page || 1;

    const customers = await Customer.aggregate([
      { $sort: { createdAt: -1 } },
      { $skip: perPage * page - perPage },
      { $limit: perPage }
    ]);

    const count = await Customer.countDocuments({});

    res.render("index", {
      locals,
      customers,
      current: page,
      pages: Math.ceil(count / perPage),
      messages,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send("An error occurred while fetching customers.");
  }
};

exports.about = async (req, res) => {
  try {
    const locals = {
      title: "About",
      description: "Free NodeJs User Management System",
    };
    res.render("about", locals);
  } catch (error) {
    console.log(error);
    res.status(500).send("An error occurred while rendering about page.");
  }
};

exports.addCustomer = async (req, res) => {
  try {
    const locals = {
      title: "Add New Customer - NodeJs",
      description: "Free NodeJs User Management System",
    };
    res.render("customer/add", locals);
  } catch (error) {
    console.log(error);
    res.status(500).send("An error occurred while rendering add customer page.");
  }
};

exports.postCustomer = async (req, res) => {
  try {
    const newCustomer = new Customer(req.body);
    await newCustomer.save();
    await req.flash("info", "New employee has been added.");
    res.redirect("/");
  } catch (error) {
    console.log(error);
    res.status(500).send("An error occurred while adding a new customer.");
  }
};

exports.view = async (req, res) => {
  try {
    const customer = await Customer.findById(req.params.id)
      .populate('department')
      .populate('destination')
      .populate('leaves');

    const locals = {
      title: "View Customer Data",
      description: "Free NodeJs User Management System",
    };

    res.render("customer/view", { locals, customer });
  } catch (error) {
    console.log(error);
    res.status(500).send("An error occurred while viewing customer data.");
  }
};

exports.edit = async (req, res) => {
  try {
    const customer = await Customer.findById(req.params.id);

    const locals = {
      title: "Edit Customer Data",
      description: "Free NodeJs User Management System",
    };

    res.render("customer/edit", { locals, customer });
  } catch (error) {
    console.log(error);
    res.status(500).send("An error occurred while rendering edit customer page.");
  }
};

exports.editPost = async (req, res) => {
  try {
    const { firstName, lastName, tel, email, details, department, destination } = req.body;
    await Customer.findByIdAndUpdate(req.params.id, {
      firstName,
      lastName,
      tel,
      email,
      details,
      department,
      destination,
      updatedAt: Date.now(),
    });
    await req.flash("info", "Employee updated successfully.");
    res.redirect(`/view/${req.params.id}`);
  } catch (error) {
    console.error(error);
    res.status(500).send("An error occurred while updating the employee.");
  }
};

exports.deleteCustomer = async (req, res) => {
  try {
    await Customer.findByIdAndDelete(req.params.id);
    req.flash("info", "Employee deleted successfully.");
    res.redirect("/");
  } catch (error) {
    console.log(error);
    req.flash("error", "An error occurred while deleting the employee.");
    res.redirect("/");
  }
};

exports.postCustomerLeave = async (req, res) => {
  try {
    const { customer_id, start_leave, end_leave, leave_type, leave_status } = req.body;
    const customer = await Customer.findById(customer_id);
    if (!customer) {
      return res.status(404).send("Employee not found.");
    }
    customer.leaves.push({ start_leave, end_leave, leave_type, leave_status });
    await customer.save();
    res.redirect("/");
  } catch (error) {
    console.error(error);
    res.status(500).send("An error occurred while adding employee leave.");
  }
};
