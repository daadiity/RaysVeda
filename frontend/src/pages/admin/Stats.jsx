"use client"

import { useState, useEffect } from "react"
import DashboardCharts from "../../components/charts/DashboardCharts"
import { adminAPI } from "../../services/api" // Import adminAPI

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

      // Use the detailed stats endpoint or dashboard stats
      const [statsResponse, chartsResponse] = await Promise.all([adminAPI.getDashboardStats(), adminAPI.getChartData()])

      // Transform the data to match the component format
      const mockStatsOverview = {
        totalRevenue: statsResponse.data.totalRevenue,
        totalBookings: statsResponse.data.totalBookings,
        averageBookingValue: statsResponse.data.averageBookingValue,
        customerRetentionRate: 78, // Calculate this from user data
        topPerformingMonth: "December", // Calculate from monthly data
        growthRate: 15.5, // Calculate from historical data
      }

      setChartData(chartsResponse.data)
      setStatsOverview(mockStatsOverview)
    } catch (error) {
      console.error("Error fetching stats data:", error)
      alert("Failed to load statistics. Please try again.")
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
                      {chartData.monthlyBookings.find((b) => b.month === month.month)?.bookings}
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
