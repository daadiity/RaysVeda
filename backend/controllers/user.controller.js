const User = require("../models/User");

const completeUserProfile = async (req, res) => {
  try {
    const { email, name, password, phone } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });

    user.name = name || user.name;
    user.phone = phone || user.phone;
    if (password) user.password = password;

    await user.save();

    res.status(200).json({ message: "Profile updated successfully" });
  } catch (err) {
    console.error("Profile completion error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = { completeUserProfile };
