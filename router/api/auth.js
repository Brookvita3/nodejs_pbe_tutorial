const express = require("express");
const router = express.Router();
const path = require("path");
const authController = require("../../controllers/authController");


router.route("/")
    .post(authController.handleRegister);
    
    
module.exports = router;