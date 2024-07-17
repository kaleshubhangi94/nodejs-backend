const Order = require('../models/Order');

// Place a new order
exports.placeOrder = async (req, res) => {
  try {
    const { userId, items, total, address } = req.body;

    // Validate required fields
    if (!userId || !items || !total || !address) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // Create new order instance
    const order = new Order({ user: userId, items, total, address });

    // Save order to the database
    await order.save();

    // Respond with the created order
    res.status(201).json(order);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
};


// Get orders for a user
exports.getUserOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.params.userId }).populate('items.product');
    res.json(orders);
  } catch (error) {
    res.status(500).send('Server error');
  }
};

// Add item to cart (example implementation)
exports.addToCart = async (req, res) => {
  // Implementation depends on your cart management strategy
  // This is a simplified example
  try {
    // Logic to add item to cart
    res.json({ msg: 'Item added to cart' });
  } catch (error) {
    res.status(500).send('Server error');
  }
};

// Remove item from cart (example implementation)
exports.removeFromCart = async (req, res) => {
  // Implementation depends on your cart management strategy
  // This is a simplified example
  try {
    // Logic to remove item from cart
    res.json({ msg: 'Item removed from cart' });
  } catch (error) {
    res.status(500).send('Server error');
  }
};
