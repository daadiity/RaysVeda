const jwt = require("jsonwebtoken");
const Admin = require("../models/Admin");

const authAdmin = async (req, res, next) => {
  try {
    const token = req.header("Authorization")?.replace("Bearer ", "");
    if (!token) {
      return res.status(401).json({ success: false, message: "No token provided" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const admin = await Admin.findById(decoded.userId);

    if (!admin || !admin.isActive) {
      return res.status(401).json({ success: false, message: "Admin not found or inactive" });
    }

    req.admin = admin;
    next();
  } catch (err) {
    res.status(401).json({ success: false, message: "Invalid token" });
  }
};

module.exports = authAdmin;
