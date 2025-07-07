const express = require("express")
const Pooja = require("../models/Pooja")
const auth = require("../middleware/auth")

const router = express.Router()

// PUBLIC: Get all poojas (for browsing without login)
router.get("/", async (req, res) => {
  try {
    const page = Number.parseInt(req.query.page) || 1
    const limit = Number.parseInt(req.query.limit) || 10
    const search = req.query.search || ""
    const category = req.query.category || ""
    const isActive = req.query.isActive

    const query = { isActive: true } // Only show active poojas publicly

    if (search) {
      query.$or = [
        { name: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
        { category: { $regex: search, $options: "i" } },
      ]
    }

    if (category) {
      query.category = category
    }

    const poojas = await Pooja.find(query)
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit)

    const total = await Pooja.countDocuments(query)

    res.json({
      success: true,
      data: poojas,
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

// ADMIN ONLY: Get all poojas with full access
router.get("/admin/all", auth, async (req, res) => {
  try {
    // Check if user is admin
    if (req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Admin access required'
      });
    }

    const page = Number.parseInt(req.query.page) || 1
    const limit = Number.parseInt(req.query.limit) || 10
    const search = req.query.search || ""
    const category = req.query.category || ""
    const isActive = req.query.isActive

    const query = {}

    if (search) {
      query.$or = [
        { name: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
        { category: { $regex: search, $options: "i" } },
      ]
    }

    if (category) {
      query.category = category
    }

    if (isActive !== undefined) {
      query.isActive = isActive === "true"
    }

    const poojas = await Pooja.find(query)
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit)

    const total = await Pooja.countDocuments(query)

    res.json({
      success: true,
      data: poojas,
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

// PUBLIC: Get pooja by ID (for viewing details)
router.get("/:id", async (req, res) => {
  try {
    const pooja = await Pooja.findById(req.params.id)

    if (!pooja) {
      return res.status(404).json({
        success: false,
        message: "Pooja not found",
      })
    }

    res.json({
      success: true,
      data: pooja,
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    })
  }
})

// PROTECTED: Book a pooja (requires login)
router.post("/:id/book", auth, async (req, res) => {
  try {
    const pooja = await Pooja.findById(req.params.id)

    if (!pooja) {
      return res.status(404).json({
        success: false,
        message: "Pooja not found",
      })
    }

    if (!pooja.isActive) {
      return res.status(400).json({
        success: false,
        message: "This pooja is currently not available for booking",
      })
    }

    // Your booking logic here
    const bookingData = {
      userId: req.user._id,
      poojaId: pooja._id,
      ...req.body
    }

    // Create booking record (you'll need a Booking model)
    // const booking = new Booking(bookingData)
    // await booking.save()

    res.json({
      success: true,
      message: "Pooja booked successfully",
      data: bookingData
    })

  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    })
  }
})

// ADMIN ONLY: Create new pooja
router.post("/", auth, async (req, res) => {
  try {
    if (req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Admin access required'
      });
    }

    const pooja = new Pooja(req.body)
    await pooja.save()

    res.status(201).json({
      success: true,
      message: "Pooja created successfully",
      data: pooja,
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    })
  }
})

// ADMIN ONLY: Update pooja
router.put("/:id", auth, async (req, res) => {
  try {
    if (req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Admin access required'
      });
    }

    const pooja = await Pooja.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })

    if (!pooja) {
      return res.status(404).json({
        success: false,
        message: "Pooja not found",
      })
    }

    res.json({
      success: true,
      message: "Pooja updated successfully",
      data: pooja,
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    })
  }
})

// ADMIN ONLY: Toggle pooja status
router.patch("/:id/status", auth, async (req, res) => {
  try {
    if (req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Admin access required'
      });
    }

    const { isActive } = req.body

    const pooja = await Pooja.findByIdAndUpdate(req.params.id, { isActive }, { new: true })

    if (!pooja) {
      return res.status(404).json({
        success: false,
        message: "Pooja not found",
      })
    }

    res.json({
      success: true,
      message: "Pooja status updated successfully",
      data: pooja,
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    })
  }
})

// ADMIN ONLY: Delete pooja
router.delete("/:id", auth, async (req, res) => {
  try {
    if (req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Admin access required'
      });
    }

    const pooja = await Pooja.findByIdAndDelete(req.params.id)

    if (!pooja) {
      return res.status(404).json({
        success: false,
        message: "Pooja not found",
      })
    }

    res.json({
      success: true,
      message: "Pooja deleted successfully",
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    })
  }
})

// PUBLIC: Get pooja categories
router.get("/categories/list", async (req, res) => {
  try {
    const categories = await Pooja.distinct("category")

    res.json({
      success: true,
      data: categories,
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
