const express = require("express")
const mongoose = require("mongoose")
const User = require("../models/User")
const Booking = require("../models/Booking")
const Pooja = require("../models/Pooja")
const auth = require("../middleware/auth")

const router = express.Router()

// Get dashboard statistics
router.get("/stats", auth, async (req, res) => {
  try {
    const [totalUsers, totalBookings, totalPoojas, revenueStats, monthlyBookings, popularPoojas, bookingStatusStats] =
      await Promise.all([
        User.countDocuments({ status: "active" }),
        Booking.countDocuments(),
        Pooja.countDocuments({ isActive: true }),

        // Revenue statistics
        Booking.aggregate([
          { $match: { status: { $in: ["confirmed", "completed"] } } },
          {
            $group: {
              _id: null,
              totalRevenue: { $sum: "$amount" },
              averageBookingValue: { $avg: "$amount" },
            },
          },
        ]),

        // Monthly bookings for the last 12 months
        Booking.aggregate([
          {
            $match: {
              createdAt: { $gte: new Date(Date.now() - 365 * 24 * 60 * 60 * 1000) },
            },
          },
          {
            $group: {
              _id: {
                year: { $year: "$createdAt" },
                month: { $month: "$createdAt" },
              },
              count: { $sum: 1 },
              revenue: { $sum: "$amount" },
            },
          },
          { $sort: { "_id.year": 1, "_id.month": 1 } },
        ]),

        // Popular poojas
        Booking.aggregate([
          { $match: { status: { $in: ["confirmed", "completed"] } } },
          {
            $group: {
              _id: "$pooja",
              count: { $sum: 1 },
            },
          },
          { $sort: { count: -1 } },
          { $limit: 10 },
          {
            $lookup: {
              from: "poojas",
              localField: "_id",
              foreignField: "_id",
              as: "poojaDetails",
            },
          },
        ]),

        // Booking status distribution
        Booking.aggregate([
          {
            $group: {
              _id: "$status",
              count: { $sum: 1 },
            },
          },
        ]),
      ])

    const revenue = revenueStats[0] || { totalRevenue: 0, averageBookingValue: 0 }

    res.json({
      success: true,
      data: {
        totalUsers,
        totalBookings,
        totalPoojas,
        totalRevenue: revenue.totalRevenue,
        averageBookingValue: Math.round(revenue.averageBookingValue || 0),
        monthlyBookings: monthlyBookings.map((item) => ({
          month: new Date(item._id.year, item._id.month - 1).toLocaleDateString("en-US", { month: "short" }),
          bookings: item.count,
          revenue: item.revenue,
        })),
        popularPoojas: popularPoojas.map((item) => ({
          name: item.poojaDetails[0]?.name || "Unknown",
          count: item.count,
        })),
        bookingStatus: bookingStatusStats.map((item) => ({
          name: item._id,
          value: item.count,
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

// Get recent bookings
router.get("/recent-bookings", auth, async (req, res) => {
  try {
    const limit = Number.parseInt(req.query.limit) || 5

    const bookings = await Booking.find()
      .sort({ createdAt: -1 })
      .limit(limit)
      .populate("user", "name email phone")
      .populate("pooja", "name price")

    res.json({
      success: true,
      data: bookings,
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    })
  }
})

// Get chart data
router.get("/charts", auth, async (req, res) => {
  try {
    const [monthlyData, poojaData, statusData] = await Promise.all([
      // Monthly bookings and revenue for last 12 months
      Booking.aggregate([
        {
          $match: {
            createdAt: { $gte: new Date(Date.now() - 365 * 24 * 60 * 60 * 1000) },
          },
        },
        {
          $group: {
            _id: {
              year: { $year: "$createdAt" },
              month: { $month: "$createdAt" },
            },
            bookings: { $sum: 1 },
            revenue: { $sum: "$amount" },
          },
        },
        { $sort: { "_id.year": 1, "_id.month": 1 } },
      ]),

      // Popular poojas
      Pooja.find({ isActive: true })
        .sort({ totalBookings: -1 })
        .limit(8)
        .select("name totalBookings"),

      // Booking status distribution
      Booking.aggregate([
        {
          $group: {
            _id: "$status",
            value: { $sum: 1 },
          },
        },
      ]),
    ])

    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]

    res.json({
      success: true,
      data: {
        monthlyBookings: monthlyData.map((item) => ({
          month: monthNames[item._id.month - 1],
          bookings: item.bookings,
        })),
        monthlyRevenue: monthlyData.map((item) => ({
          month: monthNames[item._id.month - 1],
          revenue: item.revenue,
        })),
        popularPoojas: poojaData.map((pooja) => ({
          name: pooja.name,
          count: pooja.totalBookings,
        })),
        bookingStatus: statusData.map((item) => ({
          name: item._id.charAt(0).toUpperCase() + item._id.slice(1),
          value: item.value,
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

module.exports = router
