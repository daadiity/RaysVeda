const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const dotenv = require("dotenv");
// const fs = require("fs");
// const path = require("path");
const User = require("./models/User");

dotenv.config();

const createAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);

    const email = "abhayray@raysveda.in";
    const existingAdmin = await User.findOne({ email });

    if (existingAdmin) {
      console.log("✅ Admin already exists.");
      // cleanup();
      process.exit();
      return;
    }

    const hashedPassword = await bcrypt.hash("myStrongPassword@123!", 10);

    const adminUser = new User({
      name: "Abhay Ray",
      email,
      password: hashedPassword,
      phone: "9161777666",
      address: "11/13/4-C, Tashkand Marg, Patrika Marg, Chauraha, Civil Lines, Prayagraj",
      isAdmin: true,
    });

    await adminUser.save();
    console.log("✅ Admin user created successfully!");

    // cleanup();
    process.exit();
  } catch (error) {
    console.error("❌ Error creating admin:", error);
    process.exit(1);
  }
};

// const cleanup = () => {
//   const scriptPath = path.resolve("createAdmin.js");
//   fs.unlink(scriptPath, (err) => {
//     if (err) {
//       console.error("⚠️ Failed to delete script:", err);
//     } else {
//       console.log("🧹 Script deleted automatically.");
//     }
//     process.exit();
//   });
// };

createAdmin();
