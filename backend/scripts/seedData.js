const mongoose = require("mongoose")
// const bcrypt = require("bcryptjs")
const dotenv = require("dotenv")

// Load environment variables
dotenv.config()

// Import models
const Admin = require("../models/Admin")
const User = require("../models/User")
const Pooja = require("../models/Pooja")
const Booking = require("../models/Booking")
const Notification = require("../models/Notification")

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost:27017/raysveda_admin", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})

const seedData = async () => {
  try {
    console.log("🌱 Starting database seeding...")

    // Clear existing data
    // NOTE: bcrypt is imported but not used. The admin password is stored as plain text.
    // To use bcrypt, hash the password before saving the admin user.
    // const hashedPassword = await bcrypt.hash("myStrongPassword@123!", 10)
    await Promise.all([
      Admin.deleteMany({}),
      User.deleteMany({}),
      Pooja.deleteMany({}),
      Booking.deleteMany({}),
      Notification.deleteMany({}),
    ])

    console.log("🗑️  Cleared existing data")

    // Create admin user
    const admin = new Admin({
      name: "Super Admin",
      email: "admin@raysveda.com",
      password: "myStrongPassword@123!", // Use hashed password instead of plain text
      phone: "+91 9876543210",
      role: "super_admin",
    })
    await admin.save()
    console.log("👤 Created admin user")

    // Create sample users
    const users = [
      {
        name: "Rajesh Kumar",
        email: "rajesh@example.com",
        phone: "+91 9876543210",
        address: {
          street: "123 Main Street",
          city: "Mumbai",
          state: "Maharashtra",
          pincode: "400001",
          country: "India",
        },
        status: "active",
      },
      {
        name: "Priya Sharma",
        email: "priya@example.com",
        phone: "+91 9876543211",
        address: {
          street: "456 Park Avenue",
          city: "Delhi",
          state: "Delhi",
          pincode: "110001",
          country: "India",
        },
        status: "active",
      },
      {
        name: "Amit Patel",
        email: "amit@example.com",
        phone: "+91 9876543212",
        address: {
          street: "789 Garden Road",
          city: "Ahmedabad",
          state: "Gujarat",
          pincode: "380001",
          country: "India",
        },
        status: "active",
      },
      {
        name: "Sunita Devi",
        email: "sunita@example.com",
        phone: "+91 9876543213",
        address: {
          street: "321 Temple Street",
          city: "Varanasi",
          state: "Uttar Pradesh",
          pincode: "221001",
          country: "India",
        },
        status: "active",
      },
    ]

    const createdUsers = await User.insertMany(users)
    console.log("👥 Created sample users")

    // Create sample poojas
    const poojas = [
      {
        name: "Ganesh Puja",
        description: "Traditional Ganesh worship ceremony for removing obstacles and bringing prosperity",
        price: 2500,
        duration: "2 hours",
        category: "Festival",
        isActive: true,
        requirements: [
          { item: "Flowers", quantity: "1 kg", provided: true },
          { item: "Fruits", quantity: "2 kg", provided: true },
          { item: "Sweets", quantity: "1 kg", provided: false },
        ],
        benefits: ["Removes obstacles", "Brings prosperity", "Enhances wisdom"],
        instructions: {
          beforePooja: ["Clean the worship area", "Arrange the items"],
          duringPooja: ["Maintain silence", "Follow pandit instructions"],
          afterPooja: ["Distribute prasad", "Keep the area clean"],
        },
      },
      {
        name: "Lakshmi Puja",
        description: "Goddess Lakshmi worship for wealth and prosperity",
        price: 3200,
        duration: "3 hours",
        category: "Festival",
        isActive: true,
        requirements: [
          { item: "Gold/Silver coins", quantity: "2 pieces", provided: false },
          { item: "Red cloth", quantity: "1 piece", provided: true },
          { item: "Lotus flowers", quantity: "11 pieces", provided: true },
        ],
        benefits: ["Attracts wealth", "Brings prosperity", "Removes financial problems"],
        instructions: {
          beforePooja: ["Clean the house thoroughly", "Decorate with rangoli"],
          duringPooja: ["Light diyas", "Chant mantras"],
          afterPooja: ["Keep lights on all night", "Share prasad with neighbors"],
        },
      },
      {
        name: "Saraswati Puja",
        description: "Goddess Saraswati worship for knowledge and wisdom",
        price: 1800,
        duration: "1.5 hours",
        category: "Educational",
        isActive: true,
        requirements: [
          { item: "White flowers", quantity: "500g", provided: true },
          { item: "Books/Instruments", quantity: "As available", provided: false },
          { item: "Yellow cloth", quantity: "1 piece", provided: true },
        ],
        benefits: ["Enhances knowledge", "Improves learning", "Brings wisdom"],
        instructions: {
          beforePooja: ["Place books and instruments for blessing", "Wear yellow clothes"],
          duringPooja: ["Offer white flowers", "Recite Saraswati mantras"],
          afterPooja: ["Seek blessings for studies", "Distribute sweet prasad"],
        },
      },
      {
        name: "Durga Puja",
        description: "Goddess Durga worship for protection and strength",
        price: 4500,
        duration: "4 hours",
        category: "Festival",
        isActive: true,
        requirements: [
          { item: "Red flowers", quantity: "1 kg", provided: true },
          { item: "Coconut", quantity: "5 pieces", provided: true },
          { item: "Red cloth", quantity: "2 pieces", provided: true },
        ],
        benefits: ["Provides protection", "Gives strength", "Removes negative energy"],
        instructions: {
          beforePooja: ["Fast before the puja", "Decorate with red flowers"],
          duringPooja: ["Offer red flowers", "Chant Durga mantras"],
          afterPooja: ["Break the fast with prasad", "Seek protection blessings"],
        },
      },
      {
        name: "Shiva Puja",
        description: "Lord Shiva worship for peace and spiritual growth",
        price: 2200,
        duration: "2.5 hours",
        category: "Daily",
        isActive: true,
        requirements: [
          { item: "Bilva leaves", quantity: "108 pieces", provided: true },
          { item: "Milk", quantity: "1 liter", provided: false },
          { item: "Honey", quantity: "250ml", provided: false },
        ],
        benefits: ["Brings peace", "Spiritual growth", "Removes sins"],
        instructions: {
          beforePooja: ["Take bath early morning", "Wear clean clothes"],
          duringPooja: ["Offer bilva leaves", "Pour milk on Shivling"],
          afterPooja: ["Meditate for few minutes", "Distribute prasad"],
        },
      },
    ]

    const createdPoojas = await Pooja.insertMany(poojas)
    console.log("🕉️  Created sample poojas")

    // Create sample bookings
    const bookings = []
    const statuses = ["pending", "confirmed", "completed", "cancelled"]
    const paymentStatuses = ["pending", "completed", "partial"]

    for (let i = 0; i < 20; i++) {
      const user = createdUsers[Math.floor(Math.random() * createdUsers.length)]
      const pooja = createdPoojas[Math.floor(Math.random() * createdPoojas.length)]
      const status = statuses[Math.floor(Math.random() * statuses.length)]

      const booking = {
        user: user._id,
        pooja: pooja._id,
        date: new Date(Date.now() + Math.random() * 30 * 24 * 60 * 60 * 1000), // Random date in next 30 days
        time: ["9:00 AM", "11:00 AM", "2:00 PM", "4:00 PM", "6:00 PM"][Math.floor(Math.random() * 5)],
        status: status,
        amount: pooja.price,
        address: {
          street: user.address.street,
          city: user.address.city,
          state: user.address.state,
          pincode: user.address.pincode,
          landmark: "Near temple",
        },
        paymentStatus: paymentStatuses[Math.floor(Math.random() * paymentStatuses.length)],
        paymentMethod: ["cash", "online", "upi"][Math.floor(Math.random() * 3)],
        specialRequests: i % 3 === 0 ? "Please bring all required items" : "",
        assignedPandit: {
          name: ["Pandit Sharma", "Pandit Gupta", "Pandit Verma"][Math.floor(Math.random() * 3)],
          phone: "+91 98765432" + (10 + i),
          experience: "10+ years",
        },
      }

      if (status === "completed") {
        booking.rating = Math.floor(Math.random() * 2) + 4 // 4 or 5 stars
        booking.review = "Excellent service and very knowledgeable pandit"
        booking.completedAt = new Date(Date.now() - Math.random() * 10 * 24 * 60 * 60 * 1000)
      }

      bookings.push(booking)
    }

    await Booking.insertMany(bookings)
    console.log("📅 Created sample bookings")

    // Update user and pooja stats
    for (const user of createdUsers) {
      await user.updateStats()
    }
    for (const pooja of createdPoojas) {
      await pooja.updateStats()
    }
    console.log("📊 Updated user and pooja statistics")

    // Create sample notifications
    const notifications = [
      {
        title: "New Booking Received",
        message: "Rajesh Kumar has booked Ganesh Puja for tomorrow",
        type: "booking",
        priority: "high",
        read: false,
      },
      {
        title: "Payment Received",
        message: "Payment of ₹2,500 received for booking #12345",
        type: "payment",
        priority: "medium",
        read: false,
      },
      {
        title: "New User Registration",
        message: "Priya Sharma has registered as a new user",
        type: "user",
        priority: "low",
        read: true,
      },
      {
        title: "System Backup Completed",
        message: "Daily system backup completed successfully",
        type: "system",
        priority: "low",
        read: true,
      },
      {
        title: "Booking Cancelled",
        message: "Booking #12346 has been cancelled by user",
        type: "booking",
        priority: "medium",
        read: false,
      },
    ]

    await Notification.insertMany(notifications)
    console.log("🔔 Created sample notifications")

    console.log("✅ Database seeding completed successfully!")
    console.log("\n📋 Login Credentials:")
    console.log("Email: admin@raysveda.com")
    console.log("Password: myStrongPassword@123!")

    process.exit(0)
  } catch (error) {
    console.error("❌ Error seeding database:", error)
    process.exit(1)
  }
}

seedData()
