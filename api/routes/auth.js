const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");

// Define authentication-related routes
router.post("/login", authController.login);

module.exports = router;
