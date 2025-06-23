const express = require("express")
const User = require("../models/User")
const Booking = require("../models/Booking")
const Pooja = require("../models/Pooja")
const auth = require("../middleware/auth")

const router = express.Router()

// Helper function to get date range
const getDateRange = (range) => {
  const now = new Date()
  let startDate,
    endDate = now

  switch (range) {
    case "last7days":
      startDate = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000)
      break
    case "last30days":
      startDate = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000)
      break
    case "last3months":
      startDate = new Date(now.getTime() - 90 * 24 * 60 * 60 * 1000)
      break
    case "last6months":
      startDate = new Date(now.getTime() - 180 * 24 * 60 * 60 * 1000)
      break
    case "lastyear":
      startDate = new Date(now.getTime() - 365 * 24 * 60 * 60 * 1000)
      break
    default:
      startDate = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000)
  }

  return { startDate, endDate }
}

// Generate revenue report
router.get("/revenue", auth, async (req, res) => {
  try {
    const { dateRange } = req.query
    const { startDate, endDate } = getDateRange(dateRange)

    const [summary, details] = await Promise.all([
      // Summary statistics
      Booking.aggregate([
        {
          $match: {
            createdAt: { $gte: startDate, $lte: endDate },
            status: { $in: ["confirmed", "completed"] },
          },
        },
        {
          $group: {
            _id: null,
            totalRevenue: { $sum: "$amount" },
            totalBookings: { $sum: 1 },
            averageBookingValue: { $avg: "$amount" },
          },
        },
      ]),

      // Daily breakdown
      Booking.aggregate([
        {
          $match: {
            createdAt: { $gte: startDate, $lte: endDate },
            status: { $in: ["confirmed", "completed"] },
          },
        },
        {
          $group: {
            _id: {
              $dateToString: { format: "%Y-%m-%d", date: "$createdAt" },
            },
            value: { $sum: "$amount" },
            bookings: { $sum: 1 },
          },
        },
        { $sort: { _id: 1 } },
      ]),
    ])

    const summaryData = summary[0] || {
      totalRevenue: 0,
      totalBookings: 0,
      averageBookingValue: 0,
    }

    // Calculate growth rate (mock calculation)
    const growthRate = 12.5 // You can implement actual growth calculation

    res.json({
      success: true,
      data: {
        summary: {
          ...summaryData,
          growthRate,
        },
        details: details.map((item) => ({
          date: item._id,
          value: item.value,
          bookings: item.bookings,
        })),
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

// Generate bookings report
router.get("/bookings", auth, async (req, res) => {
  try {
    const { dateRange } = req.query
    const { startDate, endDate } = getDateRange(dateRange)

    const [summary, details, statusBreakdown] = await Promise.all([
      // Summary statistics
      Booking.aggregate([
        {
          $match: {
            createdAt: { $gte: startDate, $lte: endDate },
          },
        },
        {
          $group: {
            _id: null,
            totalBookings: { $sum: 1 },
            confirmedBookings: {
              $sum: { $cond: [{ $eq: ["$status", "confirmed"] }, 1, 0] },
            },
            completedBookings: {
              $sum: { $cond: [{ $eq: ["$status", "completed"] }, 1, 0] },
            },
            cancelledBookings: {
              $sum: { $cond: [{ $eq: ["$status", "cancelled"] }, 1, 0] },
            },
          },
        },
      ]),

      // Daily breakdown
      Booking.aggregate([
        {
          $match: {
            createdAt: { $gte: startDate, $lte: endDate },
          },
        },
        {
          $group: {
            _id: {
              $dateToString: { format: "%Y-%m-%d", date: "$createdAt" },
            },
            bookings: { $sum: 1 },
            value: { $sum: "$amount" },
          },
        },
        { $sort: { _id: 1 } },
      ]),

      // Status breakdown
      Booking.aggregate([
        {
          $match: {
            createdAt: { $gte: startDate, $lte: endDate },
          },
        },
        {
          $group: {
            _id: "$status",
            count: { $sum: 1 },
          },
        },
      ]),
    ])

    res.json({
      success: true,
      data: {
        summary: summary[0] || {
          totalBookings: 0,
          confirmedBookings: 0,
          completedBookings: 0,
          cancelledBookings: 0,
        },
        details: details.map((item) => ({
          date: item._id,
          bookings: item.bookings,
          value: item.value,
        })),
        statusBreakdown,
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

// Generate users report
router.get("/users", auth, async (req, res) => {
  try {
    const { dateRange } = req.query
    const { startDate, endDate } = getDateRange(dateRange)

    const [summary, details] = await Promise.all([
      // Summary statistics
      User.aggregate([
        {
          $facet: {
            total: [{ $match: { createdAt: { $gte: startDate, $lte: endDate } } }, { $count: "count" }],
            active: [
              {
                $match: {
                  createdAt: { $gte: startDate, $lte: endDate },
                  status: "active",
                },
              },
              { $count: "count" },
            ],
            inactive: [
              {
                $match: {
                  createdAt: { $gte: startDate, $lte: endDate },
                  status: "inactive",
                },
              },
              { $count: "count" },
            ],
          },
        },
      ]),

      // Daily registrations
      User.aggregate([
        {
          $match: {
            createdAt: { $gte: startDate, $lte: endDate },
          },
        },
        {
          $group: {
            _id: {
              $dateToString: { format: "%Y-%m-%d", date: "$createdAt" },
            },
            registrations: { $sum: 1 },
          },
        },
        { $sort: { _id: 1 } },
      ]),
    ])

    const summaryData = summary[0]

    res.json({
      success: true,
      data: {
        summary: {
          totalUsers: summaryData.total[0]?.count || 0,
          activeUsers: summaryData.active[0]?.count || 0,
          inactiveUsers: summaryData.inactive[0]?.count || 0,
        },
        details: details.map((item) => ({
          date: item._id,
          registrations: item.registrations,
        })),
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

// Generate poojas performance report
router.get("/poojas", auth, async (req, res) => {
  try {
    const { dateRange } = req.query
    const { startDate, endDate } = getDateRange(dateRange)

    const [topPoojas, categoryPerformance] = await Promise.all([
      // Top performing poojas
      Booking.aggregate([
        {
          $match: {
            createdAt: { $gte: startDate, $lte: endDate },
            status: { $in: ["confirmed", "completed"] },
          },
        },
        {
          $group: {
            _id: "$pooja",
            bookings: { $sum: 1 },
            revenue: { $sum: "$amount" },
          },
        },
        {
          $lookup: {
            from: "poojas",
            localField: "_id",
            foreignField: "_id",
            as: "poojaDetails",
          },
        },
        { $sort: { bookings: -1 } },
        { $limit: 10 },
      ]),

      // Category performance
      Booking.aggregate([
        {
          $match: {
            createdAt: { $gte: startDate, $lte: endDate },
            status: { $in: ["confirmed", "completed"] },
          },
        },
        {
          $lookup: {
            from: "poojas",
            localField: "pooja",
            foreignField: "_id",
            as: "poojaDetails",
          },
        },
        {
          $group: {
            _id: "$poojaDetails.category",
            bookings: { $sum: 1 },
            revenue: { $sum: "$amount" },
          },
        },
        { $sort: { bookings: -1 } },
      ]),
    ])

    res.json({
      success: true,
      data: {
        topPoojas: topPoojas.map((item) => ({
          name: item.poojaDetails[0]?.name || "Unknown",
          bookings: item.bookings,
          revenue: item.revenue,
        })),
        categoryPerformance: categoryPerformance.map((item) => ({
          category: item._id[0] || "Unknown",
          bookings: item.bookings,
          revenue: item.revenue,
        })),
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

// Download report (placeholder - implement actual file generation)
router.get("/:type/download", auth, async (req, res) => {
  try {
    const { type } = req.params
    const { format, dateRange } = req.query

    // TODO: Implement actual file generation (PDF, Excel, CSV)
    // For now, return a success message
    res.json({
      success: true,
      message: `${format.toUpperCase()} download for ${type} report will be implemented`,
      downloadUrl: `/downloads/${type}-report-${Date.now()}.${format}`,
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
