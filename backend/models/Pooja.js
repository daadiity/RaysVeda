const mongoose = require("mongoose")

const poojaSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    duration: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
      enum: ["Festival", "Daily", "Special", "Seasonal", "Educational", "Wedding", "Other"],
    },
    images: [
      {
        type: String,
      },
    ],
    isActive: {
      type: Boolean,
      default: true,
    },
    requirements: [
      {
        item: String,
        quantity: String,
        provided: { type: Boolean, default: true },
      },
    ],
    benefits: [String],
    instructions: {
      beforePooja: [String],
      duringPooja: [String],
      afterPooja: [String],
    },
    totalBookings: {
      type: Number,
      default: 0,
    },
    averageRating: {
      type: Number,
      default: 0,
      min: 0,
      max: 5,
    },
    totalRatings: {
      type: Number,
      default: 0,
    },
    totalRevenue: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  },
)

// Update stats when booking is created/updated
poojaSchema.methods.updateStats = async function () {
  const Booking = mongoose.model("Booking")

  const stats = await Booking.aggregate([
    { $match: { pooja: this._id, status: { $in: ["confirmed", "completed"] } } },
    {
      $group: {
        _id: null,
        totalBookings: { $sum: 1 },
        totalRevenue: { $sum: "$amount" },
        averageRating: { $avg: "$rating" },
      },
    },
  ])

  if (stats.length > 0) {
    this.totalBookings = stats[0].totalBookings
    this.totalRevenue = stats[0].totalRevenue
    if (stats[0].averageRating) {
      this.averageRating = Math.round(stats[0].averageRating * 10) / 10
    }
  }

  await this.save()
}

module.exports = mongoose.model("Pooja", poojaSchema)
