const { v4: uuidv4 } = require('uuid'); // Import UUID library
const Product = require('../models/Product');

// Get all products
exports.getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.status(500).send('Server error');
  }
};

// Get product by ID
exports.getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ msg: 'Product not found' });
    }
    res.json(product);
  } catch (error) {
    res.status(500).send('Server error');
  }
};


// Add a new product
exports.addProduct = async (req, res) => {
  try {
    const { PName, description, price, stock, categoryId } = req.body;
    const products = req.body; // Assuming req.body is an array of products

    // Validate if req.body is an array
    if (!Array.isArray(products)) {
      return res.status(400).json({ error: 'Expected an array of products' });
    }
    console.log('Request body:', req.body);  // Log the request body
      const newProduct = new Product({
        PName,
        description,
        price,
        stock,
        categoryId: categoryId ? mongoose.Types.ObjectId(categoryId) : undefined
      });
      console.log('New product:', newProduct); 
    // Insert products into database after checking if they already exist
    const insertedProducts = await Promise.all(products.map(async (product) => {
      // Check if product with same PName exists
      const existingProduct = await Product.findOne({ PName: product.PName });

      if (existingProduct) {
        // Product with PName already exists, handle error or skip insertion
        console.log(`Product with PName ${product.PName} already exists.`);
        return existingProduct;
      } else {
        // Insert new product with generated uuid
        const newProduct = new Product({
          ...product,
          id: uuidv4() // Generate unique id
        });
        return await newProduct.save();
      }
    }))
    res.status(201).json(insertedProducts);
  } catch (err) {
    console.log(err?.message);
    res.status(500).send('Server Error');
  }
};

// Update a product
exports.updateProduct = async (req, res) => {
  try {
    const productId = req.params.id;
    const updatedProductData = req.body;

    // Find product by id and update
    const updatedProduct = await Product.findByIdAndUpdate(productId, updatedProductData, { new: true });

    if (!updatedProduct) {
      return res.status(404).json({ error: 'Product not found' });
    }

    res.json(updatedProduct);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};


// Delete a product
exports.deleteProduct = async (req, res) => {
  try {
    const productId = req.params.id;

    // Find product by id and delete
    const deletedProduct = await Product.findOneAndDelete({ _id: productId });

    if (!deletedProduct) {
      return res.status(404).json({ error: 'Product not found' });
    }

    res.json({ message: 'Product deleted successfully', deletedProduct });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};
