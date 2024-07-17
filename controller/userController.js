const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.registerUser = async (req, res) => {
  const { username, email, password } = req.body;
  try {
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ msg: 'User already exists' });
    }
    user = new User({ username, email, password });
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);
    await user.save();
    const payload = { user: { id: user.id } };
    jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '24h' }, (err, token) => {
      if (err) throw err;
      console.log("token",token);
      res.json({ message:"Register Sucessfully",token });
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

exports.loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    let user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ msg: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ msg: 'Invalid credentials' });
    }

    const payload = { user: { id: user.id } };
    jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' }, (err, token) => {
      if (err) throw err;
      res.json({ message:"Login Sucessfully",token });
    });
  } catch (error) {
    res.status(500).send('Server error');
  }
};

exports.getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password').populate('orders');
    res.json(user);
  } catch (error) {
    res.status(500).send('Server error');
  }
};

exports.updateUserProfile = async (req, res) => {
  const { username, email } = req.body;
  try {
    let user = await User.findById(req.user.id);
    if (user) {
      user.username = username || user.username;
      user.email = email || user.email;
      await user.save();
      res.json(user);
    } else {
      res.status(404).json({ msg: 'User not found' });
    }
  } catch (error) {
    res.status(500).send('Server error');
  }
};
