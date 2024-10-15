const express = require("express");
const router = express.Router();
const path = require("path");
const { post } = require("../root");
const employeesController = require("../../controllers/employeeController");
const verifyJWT = require("../../middleware/verifyJWT");

router.route("/")
    .get(verifyJWT,employeesController.getAllEmployees)
    .post(employeesController.createNewEmployee)
    .put(employeesController.updateEmployee)
    .delete(employeesController.deleteEmployee)

router.route("/:id") 
    .get(employeesController.getEmployeeById)
    
module.exports = router;