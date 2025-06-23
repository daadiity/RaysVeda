"use client"

import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { Calendar, Users, DollarSign, Star } from "lucide-react"
import StatsCard from "../../components/dashboard/StatsCard"
import RecentBookings from "../../components/dashboard/RecentBookings"
import QuickActions from "../../components/dashboard/QuickActions"
import DashboardCharts from "../../components/charts/DashboardCharts"
import { adminAPI } from "../../services/api" // Import adminAPI

const Dashboard = () => {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(true)
  const [statsData, setStatsData] = useState([])
  const [recentBookings, setRecentBookings] = useState([])
  const [chartData, setChartData] = useState({
    monthlyBookings: [],
    monthlyRevenue: [],
    popularPoojas: [],
    bookingStatus: [],
  })

  useEffect(() => {
    fetchDashboardData()
  }, [])

  const fetchDashboardData = async () => {
    try {
      setLoading(true)

      // Fetch real data from backend
      const [statsResponse, bookingsResponse, chartsResponse] = await Promise.all([
        adminAPI.getDashboardStats(),
        adminAPI.getRecentBookings(5),
        adminAPI.getChartData(),
      ])

      // Transform stats data to match component format
      const statsData = [
        {
          title: "Total Bookings",
          value: statsResponse.data.totalBookings.toString(),
          change: "+12%", // You can calculate this from historical data
          icon: Calendar,
          color: "text-orange-600",
          bgColor: "bg-orange-50",
        },
        {
          title: "Active Users",
          value: statsResponse.data.totalUsers.toString(),
          change: "+8%",
          icon: Users,
          color: "text-blue-600",
          bgColor: "bg-blue-50",
        },
        {
          title: "Revenue",
          value: `₹${statsResponse.data.totalRevenue.toLocaleString()}`,
          change: "+15%",
          icon: DollarSign,
          color: "text-green-600",
          bgColor: "bg-green-50",
        },
        {
          title: "Avg Rating",
          value: "4.8", // You can calculate this from booking ratings
          change: "+0.2",
          icon: Star,
          color: "text-yellow-600",
          bgColor: "bg-yellow-50",
        },
      ]

      setStatsData(statsData)
      setRecentBookings(bookingsResponse.data)
      setChartData(chartsResponse.data)
    } catch (error) {
      console.error("Error fetching dashboard data:", error)
      // Show error message to user
      alert("Failed to load dashboard data. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  const handleStatsCardClick = (stat) => {
    switch (stat.title) {
      case "Total Bookings":
        navigate("/admin/bookings")
        break
      case "Active Users":
        navigate("/admin/users")
        break
      case "Revenue":
        navigate("/admin/reports?type=revenue")
        break
      case "Avg Rating":
        navigate("/admin/stats?type=ratings")
        break
      default:
        break
    }
  }

  const handleViewBooking = (booking) => {
    navigate(`/admin/bookings/${booking._id}`)
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
      </div>
    )
  }

  return (
    <div>
      {/* Welcome Section */}
      <div className="mb-8">
        <div className="bg-white rounded-lg border p-6 shadow-sm">
          <h2 className="text-3xl font-bold text-gray-900 mb-2 flex items-center">
            Welcome to the Admin Dashboard
            <span className="ml-2 text-2xl">👋</span>
          </h2>
          <p className="text-gray-600">This is your control panel to manage users, bookings, and content.</p>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {statsData.map((stat, index) => (
          <StatsCard key={index} stat={stat} onClick={() => handleStatsCardClick(stat)} />
        ))}
      </div>

      {/* Charts Section */}
      <DashboardCharts chartData={chartData} />

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <RecentBookings bookings={recentBookings} onViewBooking={handleViewBooking} />
        <QuickActions />
      </div>
    </div>
  )
}

export default Dashboard
