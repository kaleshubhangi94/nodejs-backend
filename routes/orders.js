const express = require('express');
const router = express.Router();
const orderController = require('../controller/orderController');
const auth = require('../middleware/auth');

// Place a new order
router.post('/', auth, orderController.placeOrder);

// Get user orders
router.get('/:userId', auth, orderController.getUserOrders);

module.exports = router;
