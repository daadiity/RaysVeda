const express = require("express")
const Admin = require("../models/Admin")
const auth = require("../middleware/auth")

const router = express.Router()

// Get all settings
router.get("/", auth, async (req, res) => {
  try {
    const admin = await Admin.findById(req.admin._id)

    res.json({
      success: true,
      data: admin.settings,
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    })
  }
})

// Update settings section
router.put("/:section", auth, async (req, res) => {
  try {
    const { section } = req.params
    const updateData = req.body

    const admin = await Admin.findById(req.admin._id)

    if (!admin.settings[section]) {
      return res.status(400).json({
        success: false,
        message: "Invalid settings section",
      })
    }

    admin.settings[section] = { ...admin.settings[section], ...updateData }
    await admin.save()

    res.json({
      success: true,
      message: `${section} settings updated successfully`,
      data: admin.settings[section],
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    })
  }
})

module.exports = router
