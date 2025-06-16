"use client"

import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { Calendar, Users, DollarSign, Star } from "lucide-react"
import StatsCard from "../../components/dashboard/StatsCard"
import RecentBookings from "../../components/dashboard/RecentBookings"
import QuickActions from "../../components/dashboard/QuickActions"
import DashboardCharts from "../../components/charts/DashboardCharts"

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

      // TODO: Replace with actual API calls
      // const [statsResponse, bookingsResponse, chartsResponse] = await Promise.all([
      //   adminAPI.getDashboardStats(),
      //   adminAPI.getRecentBookings(),
      //   adminAPI.getChartData()
      // ]);

      // Mock data - replace with actual API responses
      const mockStats = [
        {
          title: "Total Bookings",
          value: "1,234",
          change: "+12%",
          icon: Calendar,
          color: "text-orange-600",
          bgColor: "bg-orange-50",
        },
        {
          title: "Active Users",
          value: "856",
          change: "+8%",
          icon: Users,
          color: "text-blue-600",
          bgColor: "bg-blue-50",
        },
        {
          title: "Revenue",
          value: "₹45,678",
          change: "+15%",
          icon: DollarSign,
          color: "text-green-600",
          bgColor: "bg-green-50",
        },
        {
          title: "Avg Rating",
          value: "4.8",
          change: "+0.2",
          icon: Star,
          color: "text-yellow-600",
          bgColor: "bg-yellow-50",
        },
      ]

      const mockBookings = [
        {
          _id: "1",
          user: { name: "Rajesh Kumar" },
          poojaType: "Ganesh Puja",
          date: "2024-01-15",
          time: "10:00 AM",
          status: "Confirmed",
          amount: "2500",
        },
        {
          _id: "2",
          user: { name: "Priya Sharma" },
          poojaType: "Lakshmi Puja",
          date: "2024-01-16",
          time: "6:00 PM",
          status: "Pending",
          amount: "3200",
        },
      ]

      const mockChartData = {
        monthlyBookings: [
          { month: "Jan", bookings: 65 },
          { month: "Feb", bookings: 78 },
          { month: "Mar", bookings: 90 },
          { month: "Apr", bookings: 81 },
          { month: "May", bookings: 95 },
          { month: "Jun", bookings: 110 },
        ],
        monthlyRevenue: [
          { month: "Jan", revenue: 45000 },
          { month: "Feb", revenue: 52000 },
          { month: "Mar", revenue: 48000 },
          { month: "Apr", revenue: 61000 },
          { month: "May", revenue: 55000 },
          { month: "Jun", revenue: 67000 },
        ],
        popularPoojas: [
          { name: "Ganesh Puja", count: 45 },
          { name: "Lakshmi Puja", count: 38 },
          { name: "Saraswati Puja", count: 32 },
          { name: "Durga Puja", count: 28 },
          { name: "Shiva Puja", count: 25 },
        ],
        bookingStatus: [
          { name: "Confirmed", value: 45 },
          { name: "Pending", value: 25 },
          { name: "Completed", value: 20 },
          { name: "Cancelled", value: 10 },
        ],
      }

      setStatsData(mockStats)
      setRecentBookings(mockBookings)
      setChartData(mockChartData)
    } catch (error) {
      console.error("Error fetching dashboard data:", error)
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
