"use client"

import { useState, useEffect } from "react"
import DashboardCharts from "../../components/charts/DashboardCharts"

const Stats = () => {
  const [loading, setLoading] = useState(true)
  const [chartData, setChartData] = useState({
    monthlyBookings: [],
    monthlyRevenue: [],
    popularPoojas: [],
    bookingStatus: [],
  })
  const [statsOverview, setStatsOverview] = useState({})

  useEffect(() => {
    fetchStatsData()
  }, [])

  const fetchStatsData = async () => {
    try {
      setLoading(true)
      // TODO: Connect to backend API
      // const response = await adminAPI.getDetailedStats();
      // setChartData(response.data.charts);
      // setStatsOverview(response.data.overview);

      // Mock data - replace with actual API call
      const mockChartData = {
        monthlyBookings: [
          { month: "Jan", bookings: 65 },
          { month: "Feb", bookings: 78 },
          { month: "Mar", bookings: 90 },
          { month: "Apr", bookings: 81 },
          { month: "May", bookings: 95 },
          { month: "Jun", bookings: 110 },
          { month: "Jul", bookings: 125 },
          { month: "Aug", bookings: 140 },
          { month: "Sep", bookings: 135 },
          { month: "Oct", bookings: 150 },
          { month: "Nov", bookings: 165 },
          { month: "Dec", bookings: 180 },
        ],
        monthlyRevenue: [
          { month: "Jan", revenue: 45000 },
          { month: "Feb", revenue: 52000 },
          { month: "Mar", revenue: 48000 },
          { month: "Apr", revenue: 61000 },
          { month: "May", revenue: 55000 },
          { month: "Jun", revenue: 67000 },
          { month: "Jul", revenue: 72000 },
          { month: "Aug", revenue: 85000 },
          { month: "Sep", revenue: 78000 },
          { month: "Oct", revenue: 92000 },
          { month: "Nov", revenue: 88000 },
          { month: "Dec", revenue: 105000 },
        ],
        popularPoojas: [
          { name: "Ganesh Puja", count: 145 },
          { name: "Lakshmi Puja", count: 138 },
          { name: "Saraswati Puja", count: 132 },
          { name: "Durga Puja", count: 128 },
          { name: "Shiva Puja", count: 125 },
          { name: "Hanuman Puja", count: 98 },
          { name: "Krishna Puja", count: 87 },
          { name: "Vishnu Puja", count: 76 },
        ],
        bookingStatus: [
          { name: "Confirmed", value: 245 },
          { name: "Pending", value: 125 },
          { name: "Completed", value: 320 },
          { name: "Cancelled", value: 45 },
        ],
      }

      const mockStatsOverview = {
        totalRevenue: 850000,
        totalBookings: 1234,
        averageBookingValue: 3500,
        customerRetentionRate: 78,
        topPerformingMonth: "December",
        growthRate: 15.5,
      }

      setChartData(mockChartData)
      setStatsOverview(mockStatsOverview)
    } catch (error) {
      console.error("Error fetching stats data:", error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
      </div>
    )
  }

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Statistics & Analytics</h1>
        <p className="text-gray-600">Detailed insights and performance metrics</p>
      </div>

      {/* Stats Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-lg border shadow-sm p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Total Revenue</h3>
          <p className="text-3xl font-bold text-green-600">₹{statsOverview.totalRevenue?.toLocaleString()}</p>
          <p className="text-sm text-gray-500 mt-1">All time earnings</p>
        </div>

        <div className="bg-white rounded-lg border shadow-sm p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Average Booking Value</h3>
          <p className="text-3xl font-bold text-blue-600">₹{statsOverview.averageBookingValue}</p>
          <p className="text-sm text-gray-500 mt-1">Per booking average</p>
        </div>

        <div className="bg-white rounded-lg border shadow-sm p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Customer Retention</h3>
          <p className="text-3xl font-bold text-purple-600">{statsOverview.customerRetentionRate}%</p>
          <p className="text-sm text-gray-500 mt-1">Returning customers</p>
        </div>

        <div className="bg-white rounded-lg border shadow-sm p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Growth Rate</h3>
          <p className="text-3xl font-bold text-orange-600">+{statsOverview.growthRate}%</p>
          <p className="text-sm text-gray-500 mt-1">Year over year</p>
        </div>

        <div className="bg-white rounded-lg border shadow-sm p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Top Performing Month</h3>
          <p className="text-3xl font-bold text-indigo-600">{statsOverview.topPerformingMonth}</p>
          <p className="text-sm text-gray-500 mt-1">Highest bookings</p>
        </div>

        <div className="bg-white rounded-lg border shadow-sm p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Total Bookings</h3>
          <p className="text-3xl font-bold text-red-600">{statsOverview.totalBookings}</p>
          <p className="text-sm text-gray-500 mt-1">All time bookings</p>
        </div>
      </div>

      {/* Charts Section */}
      <DashboardCharts chartData={chartData} />

      {/* Additional Stats Tables */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
        {/* Top Performing Poojas */}
        <div className="bg-white rounded-lg border shadow-sm">
          <div className="p-6 border-b">
            <h3 className="text-lg font-semibold text-gray-900">Top Performing Poojas</h3>
            <p className="text-sm text-gray-500">Most booked pooja services</p>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {chartData.popularPoojas.slice(0, 5).map((pooja, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center mr-3">
                      <span className="text-sm font-medium text-orange-600">{index + 1}</span>
                    </div>
                    <span className="font-medium text-gray-900">{pooja.name}</span>
                  </div>
                  <span className="text-sm text-gray-500">{pooja.count} bookings</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Monthly Performance */}
        <div className="bg-white rounded-lg border shadow-sm">
          <div className="p-6 border-b">
            <h3 className="text-lg font-semibold text-gray-900">Monthly Performance</h3>
            <p className="text-sm text-gray-500">Revenue and booking trends</p>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {chartData.monthlyRevenue.slice(-6).map((month, index) => (
                <div key={index} className="flex items-center justify-between">
                  <span className="font-medium text-gray-900">{month.month}</span>
                  <div className="text-right">
                    <div className="text-sm font-medium text-gray-900">₹{month.revenue.toLocaleString()}</div>
                    <div className="text-xs text-gray-500">
                      {chartData.monthlyBookings.find((b) => b.month === month.month)?.bookings} bookings
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Stats
