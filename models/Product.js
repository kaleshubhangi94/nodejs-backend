const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  PName: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  stock: { type: Number, required: true },
  categoryId: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: false }
});

// const Product = mongoose.model('Products', productSchema);
const Product = mongoose.model('Product', productSchema, 'products');

module.exports = Product;
