const mongoose = require("mongoose")

const notificationSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    message: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      enum: ["booking", "payment", "user", "system", "general"],
      required: true,
    },
    priority: {
      type: String,
      enum: ["low", "medium", "high"],
      default: "medium",
    },
    read: {
      type: Boolean,
      default: false,
    },
    readAt: {
      type: Date,
    },
    relatedId: {
      type: mongoose.Schema.Types.ObjectId,
      refPath: "relatedModel",
    },
    relatedModel: {
      type: String,
      enum: ["User", "Booking", "Pooja"],
    },
    actionUrl: {
      type: String,
    },
  },
  {
    timestamps: true,
  },
)

// Mark as read
notificationSchema.methods.markAsRead = function () {
  this.read = true
  this.readAt = new Date()
  return this.save()
}

module.exports = mongoose.model("Notification", notificationSchema)
