const mongoose = require("mongoose")

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    phone: {
      type: String,
      required: true,
      trim: true,
    },
    address: {
      street: String,
      city: String,
      state: String,
      pincode: String,
      country: { type: String, default: "India" },
    },
    dateOfBirth: {
      type: Date,
    },
    gender: {
      type: String,
      enum: ["male", "female", "other"],
    },
    avatar: {
      type: String,
      default: null,
    },
    status: {
      type: String,
      enum: ["active", "inactive", "blocked"],
      default: "active",
    },
    preferences: {
      language: { type: String, default: "english" },
      notifications: { type: Boolean, default: true },
    },
    totalBookings: {
      type: Number,
      default: 0,
    },
    totalSpent: {
      type: Number,
      default: 0,
    },
    lastBookingDate: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
  },
)

// Update totalBookings and totalSpent when booking is created/updated
userSchema.methods.updateStats = async function () {
  const Booking = mongoose.model("Booking")

  const stats = await Booking.aggregate([
    { $match: { user: this._id, status: { $in: ["confirmed", "completed"] } } },
    {
      $group: {
        _id: null,
        totalBookings: { $sum: 1 },
        totalSpent: { $sum: "$amount" },
        lastBookingDate: { $max: "$date" },
      },
    },
  ])

  if (stats.length > 0) {
    this.totalBookings = stats[0].totalBookings
    this.totalSpent = stats[0].totalSpent
    this.lastBookingDate = stats[0].lastBookingDate
  } else {
    this.totalBookings = 0
    this.totalSpent = 0
    this.lastBookingDate = null
  }

  await this.save()
}

module.exports = mongoose.model("User", userSchema)
