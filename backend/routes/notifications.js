const express = require("express")
const Notification = require("../models/Notification")
const auth = require("../middleware/auth")

const router = express.Router()

// Get all notifications
router.get("/", auth, async (req, res) => {
  try {
    const page = Number.parseInt(req.query.page) || 1
    const limit = Number.parseInt(req.query.limit) || 20
    const type = req.query.type || ""
    const read = req.query.read

    const query = {}

    if (type) {
      query.type = type
    }

    if (read !== undefined) {
      query.read = read === "true"
    }

    const notifications = await Notification.find(query)
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit)

    const total = await Notification.countDocuments(query)
    const unreadCount = await Notification.countDocuments({ read: false })

    res.json({
      success: true,
      data: notifications,
      pagination: {
        current: page,
        pages: Math.ceil(total / limit),
        total,
      },
      unreadCount,
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    })
  }
})

// Mark notification as read
router.patch("/:id/read", auth, async (req, res) => {
  try {
    const notification = await Notification.findById(req.params.id)

    if (!notification) {
      return res.status(404).json({
        success: false,
        message: "Notification not found",
      })
    }

    await notification.markAsRead()

    res.json({
      success: true,
      message: "Notification marked as read",
      data: notification,
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    })
  }
})

// Mark all notifications as read
router.patch("/read-all", auth, async (req, res) => {
  try {
    await Notification.updateMany(
      { read: false },
      {
        read: true,
        readAt: new Date(),
      },
    )

    res.json({
      success: true,
      message: "All notifications marked as read",
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    })
  }
})

// Delete notification
router.delete("/:id", auth, async (req, res) => {
  try {
    const notification = await Notification.findByIdAndDelete(req.params.id)

    if (!notification) {
      return res.status(404).json({
        success: false,
        message: "Notification not found",
      })
    }

    res.json({
      success: true,
      message: "Notification deleted successfully",
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    })
  }
})

// Create notification (for testing)
router.post("/", auth, async (req, res) => {
  try {
    const notification = new Notification(req.body)
    await notification.save()

    res.status(201).json({
      success: true,
      message: "Notification created successfully",
      data: notification,
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
