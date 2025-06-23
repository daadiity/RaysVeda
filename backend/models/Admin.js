const mongoose = require("mongoose")
const bcrypt = require("bcryptjs")

const adminSchema = new mongoose.Schema(
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
    password: {
      type: String,
      required: true,
      minlength: 6,
    },
    phone: {
      type: String,
      trim: true,
    },
    avatar: {
      type: String,
      default: null,
    },
    role: {
      type: String,
      enum: ["admin", "super_admin"],
      default: "admin",
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    lastLogin: {
      type: Date,
      default: null,
    },
    settings: {
      notifications: {
        emailNotifications: { type: Boolean, default: true },
        smsNotifications: { type: Boolean, default: false },
        pushNotifications: { type: Boolean, default: true },
        bookingAlerts: { type: Boolean, default: true },
        paymentAlerts: { type: Boolean, default: true },
      },
      security: {
        twoFactorAuth: { type: Boolean, default: false },
        sessionTimeout: { type: Number, default: 30 },
        passwordExpiry: { type: Number, default: 90 },
      },
      system: {
        maintenanceMode: { type: Boolean, default: false },
        debugMode: { type: Boolean, default: false },
        backupFrequency: { type: String, default: "daily" },
        maxFileSize: { type: Number, default: 10 },
      },
    },
  },
  {
    timestamps: true,
  },
)

// Hash password before saving
adminSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next()

  try {
    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt)
    next()
  } catch (error) {
    next(error)
  }
})

// Compare password method
adminSchema.methods.comparePassword = async function (candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password)
}

// Remove password from JSON output
adminSchema.methods.toJSON = function () {
  const admin = this.toObject()
  delete admin.password
  return admin
}

module.exports = mongoose.model("Admin", adminSchema)
