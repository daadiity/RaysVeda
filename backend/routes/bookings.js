const express = require("express")
const Booking = require("../models/Booking")
const Notification = require("../models/Notification")
const auth = require("../middleware/auth")

const router = express.Router()

// Get all bookings with pagination and filters
router.get("/", auth, async (req, res) => {
  try {
    const page = Number.parseInt(req.query.page) || 1
    const limit = Number.parseInt(req.query.limit) || 10
    const search = req.query.search || ""
    const status = req.query.status || ""
    const startDate = req.query.startDate
    const endDate = req.query.endDate

    const query = {}

    if (search) {
      // Search in populated user name and pooja name
      const searchRegex = { $regex: search, $options: "i" }
      query.$or = [{ "user.name": searchRegex }, { "pooja.name": searchRegex }]
    }

    if (status) {
      query.status = status
    }

    if (startDate && endDate) {
      query.date = {
        $gte: new Date(startDate),
        $lte: new Date(endDate),
      }
    }

    const bookings = await Booking.find(query)
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit)

    const total = await Booking.countDocuments(query)

    res.json({
      success: true,
      data: bookings,
      pagination: {
        current: page,
        pages: Math.ceil(total / limit),
        total,
      },
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    })
  }
})

// Get booking by ID
router.get("/:id", auth, async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id)

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: "Booking not found",
      })
    }

    res.json({
      success: true,
      data: booking,
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    })
  }
})

// Create new booking
router.post("/", auth, async (req, res) => {
  try {
    const booking = new Booking(req.body)
    await booking.save()

    // Create notification
    await new Notification({
      title: "New Booking Created",
      message: `New booking created for ${booking.pooja.name}`,
      type: "booking",
      priority: "high",
      relatedId: booking._id,
      relatedModel: "Booking",
    }).save()

    res.status(201).json({
      success: true,
      message: "Booking created successfully",
      data: booking,
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    })
  }
})

// Update booking
router.put("/:id", auth, async (req, res) => {
  try {
    const booking = await Booking.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: "Booking not found",
      })
    }

    res.json({
      success: true,
      message: "Booking updated successfully",
      data: booking,
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    })
  }
})

// Update booking status
router.patch("/:id/status", auth, async (req, res) => {
  try {
    const { status } = req.body

    const booking = await Booking.findByIdAndUpdate(
      req.params.id,
      {
        status,
        ...(status === "completed" && { completedAt: new Date() }),
      },
      { new: true },
    )

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: "Booking not found",
      })
    }

    // Create notification for status change
    await new Notification({
      title: "Booking Status Updated",
      message: `Booking status changed to ${status}`,
      type: "booking",
      priority: "medium",
      relatedId: booking._id,
      relatedModel: "Booking",
    }).save()

    res.json({
      success: true,
      message: "Booking status updated successfully",
      data: booking,
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    })
  }
})

// Delete booking
router.delete("/:id", auth, async (req, res) => {
  try {
    const booking = await Booking.findByIdAndDelete(req.params.id)

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: "Booking not found",
      })
    }

    res.json({
      success: true,
      message: "Booking deleted successfully",
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
