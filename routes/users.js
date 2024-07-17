const express = require('express');
const router = express.Router();
const userController = require('../controller/userController');
const auth = require('../middleware/auth');

// User registration
router.post('/register', userController.registerUser);

// User login
router.post('/login', userController.loginUser);

// Get user profile
router.get('/profile', auth, userController.getUserProfile);

// Update user profile
router.put('/profile', auth, userController.updateUserProfile);

module.exports = router;
