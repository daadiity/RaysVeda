const express = require("express")
const Pooja = require("../models/Pooja")
const auth = require("../middleware/auth")

const router = express.Router()




// Get all poojas with pagination and search
router.get("/", auth, async (req, res) => {
  try {
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


// Public route - get all active poojas (no auth required)
// Get all active poojas (public)
// router.get("/public/active", async (req, res) => {
//   try {
//     const poojas = await Pooja.find({ isActive: true }).sort({ createdAt: -1 });

//     res.json({
//       success: true,
//       data: poojas,
//     });
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       message: "Server error",
//       error: error.message,
//     });
//   }
// });

// Get pooja by ID
router.get("/:id", auth, async (req, res) => {
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

// Create new pooja
router.post("/", auth, async (req, res) => {
  try {
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

// Update pooja
router.put("/:id", auth, async (req, res) => {
  try {
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

// Toggle pooja status
router.patch("/:id/status", auth, async (req, res) => {
  try {
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

// Delete pooja
router.delete("/:id", auth, async (req, res) => {
  try {
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

// Get pooja categories
router.get("/categories/list", auth, async (req, res) => {
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