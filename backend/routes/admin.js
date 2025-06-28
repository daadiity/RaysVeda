const express = require("express");
const jwt = require("jsonwebtoken");
const Admin = require("../models/Admin");
const auth = require("../middleware/auth");
const upload = require("../middleware/upload"); // Assuming you have a middleware for file uploads
const User = require("../models/User");
const Booking = require("../models/Booking");
const Pooja = require("../models/Pooja");
const adminController = require("../controllers/admin.controller");

const router = express.Router();

// Admin login
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate input
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required",
      });
    }

    // Find admin
    const admin = await Admin.findOne({ email });
    if (!admin) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    // Check password
    const isMatch = await admin.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    // Check if admin is active
    if (!admin.isActive) {
      return res.status(401).json({
        success: false,
        message: "Account is inactive",
      });
    }

    // Update last login
    admin.lastLogin = new Date();
    await admin.save();

    // Generate JWT token
    const token = jwt.sign(
      { id: admin._id, email: admin.email },
      process.env.JWT_SECRET || "your-secret-key",
      {
        expiresIn: "24h",
      }
    );

    res.json({
      success: true,
      message: "Login successful",
      data: {
        admin,
        token,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
});

// Admin logout
router.post("/logout", auth, async (req, res) => {
  try {
    // In a real application, you might want to blacklist the token
    res.json({
      success: true,
      message: "Logout successful",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
});

// Get admin profile
router.get("/profile", auth, async (req, res) => {
  try {
    res.json({
      success: true,
      data: req.admin,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
});

// Update admin profile
router.put("/profile", auth, async (req, res) => {
  try {
    const { name, email, phone } = req.body;

    const admin = await Admin.findById(req.admin._id);

    if (name) admin.name = name;
    if (email) admin.email = email;
    if (phone) admin.phone = phone;

    await admin.save();

    res.json({
      success: true,
      message: "Profile updated successfully",
      data: admin,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
});

// File upload
router.post("/upload", auth, upload.single("file"), (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "No file uploaded",
      });
    }

    const fileUrl = `/uploads/${req.body.type || "general"}/${
      req.file.filename
    }`;

    res.json({
      success: true,
      message: "File uploaded successfully",
      data: {
        filename: req.file.filename,
        originalName: req.file.originalname,
        size: req.file.size,
        url: fileUrl,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Upload failed",
      error: error.message,
    });
  }
});

// Create default admin (run once)
router.post("/create-default", async (req, res) => {
  try {
    const existingAdmin = await Admin.findOne({ email: "admin@raysveda.com" });

    if (existingAdmin) {
      return res.status(400).json({
        success: false,
        message: "Default admin already exists",
      });
    }

    const admin = new Admin({
      name: "Super Admin",
      email: "admin@raysveda.com",
      password: "admin123",
      role: "super_admin",
    });

    await admin.save();

    res.json({
      success: true,
      message: "Default admin created successfully",
      data: {
        email: "admin@raysveda.com",
        password: "admin123",
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
});

// Get all users (with optional search and pagination)
router.get("/users", async (req, res) => {
  try {
    const { page = 1, limit = 10, search = "" } = req.query;

    const query = search
      ? {
          $or: [
            { name: { $regex: search, $options: "i" } },
            { email: { $regex: search, $options: "i" } },
            { phone: { $regex: search, $options: "i" } },
          ],
        }
      : {};

    const skip = (page - 1) * limit;

    const [users, totalCount] = await Promise.all([
      User.find(query)
        .sort({ createdAt: -1 })
        .skip(Number(skip))
        .limit(Number(limit)),
      User.countDocuments(query),
    ]);

    res.json({ users, totalCount });
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Search Users
router.get("/search/users", async (req, res) => {
  try {
    const query = req.query.query || "";
    const regex = new RegExp(query, "i"); // case-insensitive match

    const users = await User.find({
      $or: [{ name: regex }, { email: regex }, { phone: regex }],
    }).limit(10);

    res.json(users);
  } catch (err) {
    console.error("Error searching users:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Search Bookings
router.get("/search/bookings", async (req, res) => {
  try {
    const query = req.query.query || "";
    const regex = new RegExp(query, "i");

    const bookings = await Booking.find()
      .populate("user", "name email")
      .populate("pooja", "name");

    const filtered = bookings.filter((booking) => {
      const userMatch =
        booking.user?.name?.match(regex) || booking.user?.email?.match(regex);
      const poojaMatch = booking.pooja?.name?.match(regex);
      return userMatch || poojaMatch;
    });

    res.json({ bookings: filtered });
  } catch (err) {
    console.error("Error searching bookings:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.get("/poojas", adminController.getAllPoojas);




module.exports = router;
