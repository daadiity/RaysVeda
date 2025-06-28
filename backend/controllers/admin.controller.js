const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const mongoose = require("mongoose");

const User = require("../models/User");
const Booking = require("../models/Booking");

const adminLogin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const admin = await User.findOne({ email });

    if (!admin || !admin.isAdmin) {
      return res.status(401).json({ message: "Not authorized as admin" });
    }

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { id: admin._id, role: "admin" },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.json({ token });
  } catch (err) {
    console.error("Admin login error:", err);
    res.status(500).json({ message: "Server error during admin login" });
  }
};

const getAllUsers = async (req, res) => {
  try {
    const { page = 1, limit = 10, search = "" } = req.query;

    const query = search
      ? {
          $or: [
            { name: { $regex: search, $options: "i" } },
            { email: { $regex: search, $options: "i" } },
          ],
        }
      : {};

    const skip = (page - 1) * limit;

    const [users, totalCount] = await Promise.all([
      User.find(query).skip(skip).limit(Number(limit)).sort({ createdAt: -1 }),
      User.countDocuments(query),
    ]);

    res.json({ users, totalCount });
  } catch (err) {
    console.error("Error in getAllUsers:", err);
    res.status(500).json({ message: "Server error" });
  }
};

const deleteUser = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.json({ message: "User deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Error deleting user" });
  }
};

const getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.find()
      .populate("user", "name email")
      .sort({ date: -1 });
    res.json(bookings);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

const deleteBooking = async (req, res) => {
  try {
    await Booking.findByIdAndDelete(req.params.id);
    res.json({ message: "Booking deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Error deleting booking" });
  }
};

const getDashboardStats = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const totalBookings = await Booking.countDocuments();

    const monthlyBookings = await Booking.aggregate([
      {
        $group: {
          _id: { $month: "$date" },
          count: { $sum: 1 },
        },
      },
      { $sort: { _id: 1 } },
    ]);

    const topPoojas = await Booking.aggregate([
      {
        $group: {
          _id: "$poojaType",
          count: { $sum: 1 },
        },
      },
      { $sort: { count: -1 } },
      { $limit: 5 },
    ]);

    res.json({ totalUsers, totalBookings, monthlyBookings, topPoojas });
  } catch (err) {
    res.status(500).json({ message: "Error fetching stats" });
  }
};

const getAllPoojas = async (req, res) => {
  try {
    const { page = 1, limit = 10, search = "" } = req.query;

    const query = search
      ? {
          $or: [
            { name: { $regex: search, $options: "i" } },
            { category: { $regex: search, $options: "i" } },
          ],
        }
      : {};

    const poojas = await Pooja.find(query)
      .skip((page - 1) * limit)
      .limit(parseInt(limit))
      .sort({ createdAt: -1 });

    const total = await Pooja.countDocuments(query);

    res.json({ poojas, total });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
};

// const generateReport = async (req, res) => {
//   try {
//     const { type } = req.params;
//     const { dateRange } = req.query;

//     // Get start and end date based on dateRange
//     let startDate = new Date();
//     let endDate = new Date();

//     switch (dateRange) {
//       case "last7days":
//         startDate.setDate(endDate.getDate() - 7);
//         break;
//       case "last30days":
//         startDate.setDate(endDate.getDate() - 30);
//         break;
//       case "last3months":
//         startDate.setMonth(endDate.getMonth() - 3);
//         break;
//       case "last6months":
//         startDate.setMonth(endDate.getMonth() - 6);
//         break;
//       case "lastyear":
//         startDate.setFullYear(endDate.getFullYear() - 1);
//         break;
//       default:
//         startDate.setDate(endDate.getDate() - 30); // fallback to 30 days
//     }

//     let summary = {};
//     let details = [];

//     if (type === "revenue") {
//       const bookings = await Booking.find({
//         date: { $gte: startDate, $lte: endDate },
//       });

//       const totalRevenue = bookings.reduce(
//         (acc, b) => acc + (b.amount || 0),
//         0
//       );
//       const totalBookings = bookings.length;
//       const averageBookingValue = totalBookings
//         ? (totalRevenue / totalBookings).toFixed(2)
//         : 0;
//       const growthRate = 12.5; // Placeholder – you can calculate it properly later

//       const grouped = {};
//       bookings.forEach((b) => {
//         const dateKey = b.date.toISOString().split("T")[0];
//         grouped[dateKey] = grouped[dateKey] || { value: 0, bookings: 0 };
//         grouped[dateKey].value += b.amount || 0;
//         grouped[dateKey].bookings += 1;
//       });

//       details = Object.entries(grouped).map(([date, data]) => ({
//         date,
//         value: data.value,
//         bookings: data.bookings,
//       }));

//       summary = {
//         totalRevenue,
//         totalBookings,
//         averageBookingValue,
//         growthRate,
//       };
//     }

//     // Add logic for "bookings", "users", and "poojas" types if needed

//     res.json({ summary, details });
//   } catch (err) {
//     console.error("Error generating report:", err);
//     res.status(500).json({ message: "Error generating report" });
//   }
// };


const generateReport = async (req, res) => {
  try {
    const { type } = req.params;
    const { dateRange } = req.query;

    // Get start and end date based on dateRange
    let startDate = new Date();
    let endDate = new Date();

    switch (dateRange) {
      case "last7days":
        startDate.setDate(endDate.getDate() - 7);
        break;
      case "last30days":
        startDate.setDate(endDate.getDate() - 30);
        break;
      case "last3months":
        startDate.setMonth(endDate.getMonth() - 3);
        break;
      case "last6months":
        startDate.setMonth(endDate.getMonth() - 6);
        break;
      case "lastyear":
        startDate.setFullYear(endDate.getFullYear() - 1);
        break;
      default:
        startDate.setDate(endDate.getDate() - 30); // fallback to 30 days
    }

    let summary = {};
    let details = [];

    if (type === "revenue") {
      const bookings = await Booking.find({
        date: { $gte: startDate, $lte: endDate },
      });

      const totalRevenue = bookings.reduce(
        (acc, b) => acc + (b.amount || 0),
        0
      );
      const totalBookings = bookings.length;
      const averageBookingValue = totalBookings
        ? (totalRevenue / totalBookings).toFixed(2)
        : 0;
      const growthRate = 12.5; // Placeholder

      const grouped = {};
      bookings.forEach((b) => {
        const dateKey = b.date.toISOString().split("T")[0];
        grouped[dateKey] = grouped[dateKey] || { value: 0, bookings: 0 };
        grouped[dateKey].value += b.amount || 0;
        grouped[dateKey].bookings += 1;
      });

      details = Object.entries(grouped).map(([date, data]) => ({
        date,
        value: data.value,
        bookings: data.bookings,
      }));

      summary = {
        totalRevenue,
        totalBookings,
        averageBookingValue,
        growthRate,
      };
    } else if (type === "bookings") {
      const bookings = await Booking.find({
        date: { $gte: startDate, $lte: endDate },
      });

      const totalBookings = bookings.length;

      const grouped = {};
      bookings.forEach((b) => {
        const dateKey = b.date.toISOString().split("T")[0];
        grouped[dateKey] = grouped[dateKey] || { bookings: 0 };
        grouped[dateKey].bookings += 1;
      });

      details = Object.entries(grouped).map(([date, data]) => ({
        date,
        bookings: data.bookings,
      }));

      summary = {
        totalBookings,
        averageBookingsPerDay: (totalBookings / Object.keys(grouped).length).toFixed(2),
      };
    } else if (type === "users") {
      const users = await User.find({
        createdAt: { $gte: startDate, $lte: endDate },
      });

      const totalUsers = users.length;

      const grouped = {};
      users.forEach((u) => {
        const dateKey = u.createdAt.toISOString().split("T")[0];
        grouped[dateKey] = grouped[dateKey] || { users: 0 };
        grouped[dateKey].users += 1;
      });

      details = Object.entries(grouped).map(([date, data]) => ({
        date,
        users: data.users,
      }));

      summary = {
        totalUsers,
        averageUsersPerDay: (totalUsers / Object.keys(grouped).length).toFixed(2),
      };
    } else if (type === "poojas") {
      const bookings = await Booking.find({
        date: { $gte: startDate, $lte: endDate },
      }).populate("pooja", "name");

      const grouped = {};
      bookings.forEach((b) => {
        const poojaName = b.pooja?.name || "Unknown";
        grouped[poojaName] = grouped[poojaName] || { count: 0 };
        grouped[poojaName].count += 1;
      });

      details = Object.entries(grouped).map(([pooja, data]) => ({
        pooja,
        bookings: data.count,
      }));

      summary = {
        totalPoojas: Object.keys(grouped).length,
        mostBooked: details.sort((a, b) => b.bookings - a.bookings)[0]?.pooja || "N/A",
      };
    } else {
      return res.status(400).json({ message: "Invalid report type" });
    }

    res.json({ summary, details });
  } catch (err) {
    console.error("Error generating report:", err);
    res.status(500).json({ message: "Error generating report" });
  }
};


const downloadReport = async (req, res) => {
  return res.status(501).json({ message: "Download report not implemented yet." });
};


module.exports = {
  adminLogin,
  getAllUsers,
  deleteUser,
  getAllBookings,
  deleteBooking,
  getDashboardStats,
  getAllPoojas,
  generateReport,
  downloadReport
};
