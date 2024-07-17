const express = require('express');
const router = express.Router();
const adminController = require('../controller/adminController');

// Admin registration
router.post('/register', adminController.registerAdmin);

// Admin login
router.post('/login', adminController.loginAdmin);

module.exports = router;
