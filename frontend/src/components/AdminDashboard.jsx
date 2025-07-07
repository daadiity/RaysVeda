"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import {
  BarChart3,
  Calendar,
  Users,
  BookOpen,
  TrendingUp,
  DollarSign,
  Star,
  Bell,
  Search,
  User,
  Menu,
  X,
  Clock,
} from "lucide-react";

export default function AdminDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("Dashboard");
  const [statsData, setStatsData] = useState([]);
  const [recentBookings, setRecentBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigationItems = [
    { name: "Dashboard", icon: BarChart3 },
    { name: "Users", icon: Users },
    { name: "Bookings", icon: Calendar },
    { name: "Stats", icon: TrendingUp },
  ];

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem("adminToken");
        const headers = { Authorization: `Bearer ${token}` };

        // Fetch stats data
        const statsResponse = await axios.get("http://localhost:3000/api/admin/dashboard-stats", { headers });
        const { totalUsers, totalBookings, monthlyBookings, topPoojas } = statsResponse.data;

        setStatsData([
          {
            title: "Total Bookings",
            value: totalBookings,
            change: "+12%", // Example change, replace with real data if available
            icon: Calendar,
            color: "text-orange-600",
            bgColor: "bg-orange-50",
          },
          {
            title: "Active Users",
            value: totalUsers,
            change: "+8%", // Example change, replace with real data if available
            icon: Users,
            color: "text-blue-600",
            bgColor: "bg-blue-50",
          },
          {
            title: "Revenue",
            value: "₹45,678", // Replace with real revenue data if available
            change: "+15%", // Example change, replace with real data if available
            icon: DollarSign,
            color: "text-green-600",
            bgColor: "bg-green-50",
          },
          {
            title: "Avg Rating",
            value: "4.8", // Replace with real rating data if available
            change: "+0.2", // Example change, replace with real data if available
            icon: Star,
            color: "text-yellow-600",
            bgColor: "bg-yellow-50",
          },
        ]);

        // Fetch recent bookings
        const bookingsResponse = await axios.get("http://localhost:3000/api/admin/bookings", { headers });
        setRecentBookings(bookingsResponse.data);
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  const getStatusColor = (status) => {
    switch (status) {
      case "Confirmed":
        return "bg-green-100 text-green-800";
      case "Pending":
        return "bg-yellow-100 text-yellow-800";
      case "Completed":
        return "bg-blue-100 text-blue-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <svg className="animate-spin h-10 w-10 text-orange-500" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
        </svg>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-orange-500 transform ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0`}
      >
        <div className="flex items-center justify-between h-16 px-6 bg-orange-600">
          <div className="flex items-center">
            <BookOpen className="h-8 w-8 text-white" />
            <div className="ml-3">
              <h2 className="text-xl font-bold text-white">RaysVeda Admin</h2>
              <p className="text-xs text-orange-100">Pooja Management</p>
            </div>
          </div>
        </div>
        <nav className="mt-8">
          {navigationItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.name}
                onClick={() => setActiveTab(item.name)}
                className={`w-full flex items-center px-6 py-3 text-left text-white hover:bg-orange-600 transition-colors ${
                  activeTab === item.name ? "bg-orange-600 border-r-4 border-white" : ""
                }`}
              >
                <Icon className="h-5 w-5" />
                <span className="ml-3 font-medium">{item.name}</span>
              </button>
            );
          })}
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 lg:ml-0">
        <header className="bg-white shadow-sm border-b">
          <div className="flex items-center justify-between px-6 py-4">
            <div className="flex items-center">
              <button onClick={() => setSidebarOpen(true)} className="lg:hidden text-gray-600 hover:text-orange-500 mr-4">
                <Menu className="h-6 w-6" />
              </button>
              <div>
                <h1 className="text-2xl font-semibold text-gray-900">Dashboard</h1>
                <p className="text-sm text-gray-500">Welcome back! Here's what's happening today.</p>
              </div>
            </div>
          </div>
        </header>

        <main className="p-6">
          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {statsData.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div
                  key={index}
                  className="bg-white rounded-lg border shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer group"
                >
                  <div className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-600 mb-1 group-hover:text-gray-700 transition-colors">
                          {stat.title}
                        </p>
                        <p className="text-2xl font-bold text-gray-900 group-hover:text-orange-600 transition-colors">
                          {stat.value}
                        </p>
                        <p className="text-sm text-green-600 font-medium">{stat.change}</p>
                      </div>
                      <div
                        className={`p-3 rounded-full ${stat.bgColor} group-hover:scale-110 transition-transform duration-200`}
                      >
                        <Icon className={`h-6 w-6 ${stat.color}`} />
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Recent Bookings */}
          <div className="bg-white rounded-lg border shadow-sm">
            <div className="p-6 border-b">
              <h3 className="text-lg font-semibold text-gray-900">Recent Bookings</h3>
              <p className="text-sm text-gray-500">Latest pooja bookings from your customers</p>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {recentBookings.map((booking) => (
                  <div key={booking._id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-1">
                        <h4 className="font-medium text-gray-900">{booking.user.name}</h4>
                        <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(booking.status)}`}>
                          {booking.status}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600">{booking.poojaType}</p>
                      <div className="flex items-center gap-4 mt-1">
                        <span className="text-xs text-gray-500 flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          {booking.date}
                        </span>
                        <span className="text-xs text-gray-500 flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {booking.time}
                        </span>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-gray-900">{booking.amount}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}