// const mongoose = require("mongoose")

// const bookingSchema = new mongoose.Schema(
//   {
//     user: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "User",
//       required: true,
//     },
//     pooja: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "Pooja",
//       required: true,
//     },
//     date: {
//       type: Date,
//       required: true,
//     },
//     time: {
//       type: String,
//       required: true,
//     },
//     status: {
//       type: String,
//       enum: ["pending", "confirmed", "in_progress", "completed", "cancelled"],
//       default: "pending",
//     },
//     amount: {
//       type: Number,
//       required: true,
//       min: 0,
//     },
//     address: {
//       street: { type: String, required: true },
//       city: { type: String, required: true },
//       state: { type: String, required: true },
//       pincode: { type: String, required: true },
//       landmark: String,
//     },
//     specialRequests: {
//       type: String,
//       trim: true,
//     },
//     paymentStatus: {
//       type: String,
//       enum: ["pending", "partial", "completed", "refunded"],
//       default: "pending",
//     },
//     paymentMethod: {
//       type: String,
//       enum: ["cash", "online", "card", "upi"],
//       default: "cash",
//     },
//     paymentDetails: {
//       transactionId: String,
//       paidAmount: { type: Number, default: 0 },
//       paymentDate: Date,
//     },
//     assignedPandit: {
//       name: String,
//       phone: String,
//       experience: String,
//     },
//     rating: {
//       type: Number,
//       min: 1,
//       max: 5,
//     },
//     review: {
//       type: String,
//       trim: true,
//     },
//     notes: {
//       type: String,
//       trim: true,
//     },
//     cancellationReason: {
//       type: String,
//       trim: true,
//     },
//     completedAt: {
//       type: Date,
//     },
//   },
//   {
//     timestamps: true,
//   },
// )

// // Populate user and pooja details by default
// bookingSchema.pre(/^find/, function (next) {
//   this.populate("user", "name email phone").populate("pooja", "name price duration category")
//   next()
// })

// // Update user and pooja stats after booking changes
// bookingSchema.post("save", async function () {
//   try {
//     const User = mongoose.model("User")
//     const Pooja = mongoose.model("Pooja")

//     const user = await User.findById(this.user)
//     const pooja = await Pooja.findById(this.pooja)

//     if (user) await user.updateStats()
//     if (pooja) await pooja.updateStats()
//   } catch (error) {
//     console.error("Error updating stats:", error)
//   }
// })

// module.exports = mongoose.model("Booking", bookingSchema)


const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    pooja: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Pooja",
      required: true,
    },
    // ✅ Optional for guest booking (auto-filled from puja)
    date: {
      type: Date,
      required: false,
    },
    time: {
      type: String,
      required: false,
    },
    status: {
      type: String,
      enum: ["pending", "confirmed", "in_progress", "completed", "cancelled"],
      default: "pending",
    },
    amount: {
      type: Number,
      required: true,
      min: 0,
    },
    // ✅ Optional for guest booking
    address: {
      street: { type: String, required: false },
      city: { type: String, required: false },
      state: { type: String, required: false },
      pincode: { type: String, required: false },
      landmark: String,
    },
    specialRequests: {
      type: String,
      trim: true,
    },
    paymentStatus: {
      type: String,
      enum: ["pending", "partial", "completed", "refunded"],
      default: "pending",
    },
    paymentMethod: {
      type: String,
      enum: ["cash", "online", "card", "upi"],
      default: "cash",
    },
    paymentDetails: {
      transactionId: String,
      paidAmount: { type: Number, default: 0 },
      paymentDate: Date,
    },
    assignedPandit: {
      name: String,
      phone: String,
      experience: String,
    },
    rating: {
      type: Number,
      min: 1,
      max: 5,
    },
    review: {
      type: String,
      trim: true,
    },
    notes: {
      type: String,
      trim: true,
    },
    cancellationReason: {
      type: String,
      trim: true,
    },
    completedAt: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

// Populate user and pooja details by default
bookingSchema.pre(/^find/, function (next) {
  this.populate("user", "name email phone").populate(
    "pooja",
    "name price duration category"
  );
  next();
});

// Update user and pooja stats after booking changes
bookingSchema.post("save", async function () {
  try {
    const User = mongoose.model("User");
    const Pooja = mongoose.model("Pooja");

    const user = await User.findById(this.user);
    const pooja = await Pooja.findById(this.pooja);

    if (user) await user.updateStats();
    if (pooja) await pooja.updateStats();
  } catch (error) {
    console.error("Error updating stats:", error);
  }
});

module.exports = mongoose.model("Booking", bookingSchema);
