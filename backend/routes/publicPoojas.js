const express = require("express");
const Pooja = require("../models/Pooja");

const router = express.Router();

// GET /api/poojas/public/active
router.get("/public/active", async (req, res) => {
  try {
    const poojas = await Pooja.find({ isActive: true }).sort({ createdAt: -1 });
    res.json({ success: true, data: poojas });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error", error: error.message });
  }
});

module.exports = router;
