const express = require("express");
const router = express.Router();
const path = require("path");
const { post } = require("../root");
const employeesController = require("../../controllers/employeeController");
const data = {};
data.employees = require("../../model/employees.json");

router.route("/")
    .get(employeesController.getAllEmployees)
    .post(employeesController.createNewEmployee)
    .put(employeesController.updateEmployee)
    .delete(employeesController.deleteEmployee)

router.route("/:id") 
    .get(employeesController.getEmployeeById)
    
module.exports = router;