  const Customer = require("../models/Customer");
  const mongoose = require("mongoose");
  const Employee = require('../models/Employee');

  exports.homepage = async (req, res) => {
    const messages = await req.flash("info");

    const locals = {
      title: "NodeJs",
      description: "Free NodeJs User Management System",
    };

    let perPage = 12;
    let page = req.query.page || 1;

    try {
      const customers = await Customer.aggregate([{ $sort: { createdAt: -1 } }])
        .skip(perPage * page - perPage)
        .limit(perPage)
        .exec();
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
    }
  };

  exports.about = async (req, res) => {
    const locals = {
      title: "About",
      description: "Free NodeJs User Management System",
    };

    try {
      res.render("about", locals);
    } catch (error) {
      console.log(error);
    }
  };
  
  exports.addCustomer = async (req, res) => {
    const locals = {
      title: "Add New Customer - NodeJs",
      description: "Free NodeJs User Management System",
    };

    res.render("customer/add", locals);
  };


  exports.postCustomer = async (req, res) => {
    console.log(req.body);
  
    const newCustomer = new Customer({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      details: req.body.details,
      tel: req.body.tel,
      email: req.body.email,
      department: req.body.department,
      destination: req.body.destination,  
      addressLine: req.body.addressLine, // Make sure these fields are added
      barangay: req.body.barangay,       // Make sure these fields are added
      province: req.body.province,       // Make sure these fields are added
      country: req.body.country,         // Make sure these fields are added
      zipcode: req.body.zipcode          // Make sure these fields are added
    });
  
    try {
      await Customer.create(newCustomer);
      await req.flash("info", "New customer has been added.");
  
      res.redirect("/");
    } catch (error) {
      console.log(error);
    }
  };
  

  /**
   * GET /
   * Customer Data
   */
  exports.view = async (req, res) => {
    try {
      const customer = await Customer.findOne({ _id: req.params.id })
      .populate('department')
        .populate('destination');

      const locals = {
        title: "View Customer Data",
        description: "Free NodeJs User Management System",
      };

      res.render("customer/view", {
        locals,
        customer,
      });
    } catch (error) {
      console.log(error);
    }
  };

  /**
   * GET /
   * Edit Customer Data
   */
  exports.edit = async (req, res) => {
    try {
      const customer = await Customer.findOne({ _id: req.params.id });

      const locals = {
        title: "Edit Customer Data",
        description: "Free NodeJs User Management System",
      };

      res.render("customer/edit", {
        locals,
        customer,
      });
    } catch (error) {
      console.log(error);
    }
  };

  /**
   * GET /
   * Update Customer Data
   */
  exports.editPost = async (req, res) => {
    const { firstName, lastName, tel, email, details, department, destination } = req.body;
    try {
      await Customer.findByIdAndUpdate(req.params.id, {
        firstName,
        lastName,
        tel,
        email,
        details,
        department, // Assuming this is the ObjectId of the department
        destination, // Assuming this is the ObjectId of the destination
        updatedAt: Date.now(),
      });

      await req.flash("info", "Customer updated successfully.");
      res.redirect(`/view/${req.params.id}`);
    } catch (error) {
      console.error(error);
      res.status(500).send("An error occurred while updating the customer.");
    }
  };


  /**
   * Delete /
   * Delete Customer Data
   */
  exports.deleteCustomer = async (req, res) => {
    try {
      await Customer.deleteOne({ _id: req.params.id });
      res.redirect("/");
    } catch (error) {
      console.log(error);
    }
  };

  /**
   * Get /
   * Search Customer Data
   */
  exports.searchCustomers = async (req, res) => {
    const locals = {
      title: "Search Customer Data",
      description: "Free NodeJs User Management System",
    };

    try {
      let searchTerm = req.body.searchTerm;
      const searchNoSpecialChar = searchTerm.replace(/[^a-zA-Z0-9 ]/g, "");

      const customers = await Customer.find({
        $or: [
          { firstName: { $regex: new RegExp(searchNoSpecialChar, "i") } },
          { lastName: { $regex: new RegExp(searchNoSpecialChar, "i") } },
        ],
      });

      res.render("search", {
        customers,
        locals,
      });
    } catch (error) {
      console.log(error);
    }
  };