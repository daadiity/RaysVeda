"use client"

import { useState, useEffect } from "react"
import { Bell, Search, User, Menu, LogOut } from "lucide-react"
import { useNavigate } from "react-router-dom"

const Header = ({ setSidebarOpen }) => {
  const navigate = useNavigate()
  const [notifications, setNotifications] = useState([])
  const [adminProfile, setAdminProfile] = useState(null)
  const [showProfileMenu, setShowProfileMenu] = useState(false)

  useEffect(() => {
    fetchNotifications()
    fetchAdminProfile()
  }, [])

  const fetchNotifications = async () => {
    try {
      // TODO: Connect to backend notifications API
      // const response = await adminAPI.getNotifications();
      // setNotifications(response.data);

      // Placeholder data - replace with actual API call
      setNotifications([
        { id: 1, message: "New booking received", read: false },
        { id: 2, message: "User registration pending", read: false },
      ])
    } catch (error) {
      console.error("Error fetching notifications:", error)
    }
  }

  const fetchAdminProfile = async () => {
    try {
      // TODO: Connect to backend admin profile API
      // const response = await adminAPI.getProfile();
      // setAdminProfile(response.data);

      // Placeholder data - replace with actual API call
      setAdminProfile({
        name: "Admin User",
        email: "admin@raysveda.com",
        avatar: null,
      })
    } catch (error) {
      console.error("Error fetching admin profile:", error)
    }
  }

  const handleSearch = () => {
    // TODO: Implement search functionality
    // Navigate to search results page or open search modal
    console.log("Search functionality - implement search across users, bookings, etc.")
  }

  const handleNotifications = () => {
    navigate("/admin/notifications")
  }

  const handleLogout = async () => {
    try {
      // TODO: Connect to backend logout API
      // await adminAPI.logout();

      // Clear local storage
      localStorage.removeItem("adminToken")
      localStorage.removeItem("adminUser")

      // Redirect to login page
      navigate("/admin/login")
    } catch (error) {
      console.error("Error during logout:", error)
    }
  }

  const unreadCount = notifications.filter((n) => !n.read).length

  return (
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

        <div className="flex items-center space-x-4">
          <button
            onClick={handleSearch}
            className="text-gray-600 hover:text-orange-500 p-2 rounded-lg hover:bg-orange-50"
          >
            <Search className="h-5 w-5" />
          </button>

          <button
            onClick={handleNotifications}
            className="text-gray-600 hover:text-orange-500 p-2 rounded-lg hover:bg-orange-50 relative"
          >
            <Bell className="h-5 w-5" />
            {unreadCount > 0 && <span className="absolute top-1 right-1 h-2 w-2 bg-orange-500 rounded-full"></span>}
          </button>

          <div className="relative">
            <button
              onClick={() => setShowProfileMenu(!showProfileMenu)}
              className="text-gray-600 hover:text-orange-500 p-2 rounded-lg hover:bg-orange-50 flex items-center space-x-2"
            >
              <User className="h-5 w-5" />
              {adminProfile && <span className="text-sm font-medium">{adminProfile.name}</span>}
            </button>

            {showProfileMenu && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50">
                <button
                  onClick={() => navigate("/admin/settings")}
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                >
                  Profile Settings
                </button>
                <button
                  onClick={handleLogout}
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left flex items-center"
                >
                  <LogOut className="h-4 w-4 mr-2" />
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header
