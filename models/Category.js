const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String }
});

// const Category = mongoose.model('Category', categorySchema);
const Category = mongoose.model('Category', categorySchema, 'category');

module.exports = Category;
