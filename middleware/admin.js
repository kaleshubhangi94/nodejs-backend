const Admin = require('../models/Admin');

module.exports = async (req, res, next) => {
  try {
    const admin = await Admin.findById(req.admin.id);
    if (admin) {
      next();
    } else {
      res.status(403).json({ msg: 'Access denied, admin only' });
    }
  } catch (error) {
    res.status(500).send('Server error');
  }
};
