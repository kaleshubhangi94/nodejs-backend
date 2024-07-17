const express = require('express');
const router = express.Router();
const productController = require('../controller/productController');
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');


router.get('/', productController.getProducts);

// Get product by ID
router.get('/:id', productController.getProductById);

// Add a new product (admin only)
router.post('/',  productController.addProduct);
  
// Update a product (admin only)
router.put('/:id', [auth, admin], productController.updateProduct);

// Delete a product (admin only)
router.delete('/:id', [auth, admin], productController.deleteProduct);

module.exports = router;
