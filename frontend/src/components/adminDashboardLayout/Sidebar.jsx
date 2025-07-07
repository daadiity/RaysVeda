"use client"
import { useNavigate, useLocation } from "react-router-dom"
import { BarChart3, Calendar, Users, BookOpen, TrendingUp, Settings, Bell, FileText, X, HelpCircle } from "lucide-react"
import { adminAPI } from "../../services/api" // Assuming adminAPI is in this path

const Sidebar = ({ sidebarOpen, setSidebarOpen }) => {
  const navigate = useNavigate()
  const location = useLocation()

  const navigationItems = [
    { name: "Dashboard", icon: BarChart3, path: "/admin" },
    { name: "Users", icon: Users, path: "/admin/users" },
    { name: "Bookings", icon: Calendar, path: "/admin/bookings" },
    { name: "Poojas", icon: BookOpen, path: "/admin/poojas" },
    { name: "Stats", icon: TrendingUp, path: "/admin/stats" },
    { name: "Reports", icon: FileText, path: "/admin/reports" },
    { name: "Notifications", icon: Bell, path: "/admin/notifications" },
    { name: "Settings", icon: Settings, path: "/admin/settings" },
  ]

  const handleNavigation = (path) => {
    navigate(path)
    setSidebarOpen(false) // Close sidebar on mobile after navigation
  }

  const handleGetSupport = async () => {
    try {
      const supportData = {
        message: "Need help with admin panel",
        priority: "medium",
        type: "general",
      }

      await adminAPI.createSupportRequest(supportData)
      alert("Support request submitted successfully!")
    } catch (error) {
      console.error("Error creating support request:", error)
      alert("Failed to submit support request. Please try again.")
    }
  }

  return (
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
        <button onClick={() => setSidebarOpen(false)} className="lg:hidden text-white hover:text-orange-200">
          <X className="h-6 w-6" />
        </button>
      </div>

      <nav className="mt-8">
        {navigationItems.map((item) => {
          const Icon = item.icon
          const isActive = location.pathname === item.path

          return (
            <button
              key={item.name}
              onClick={() => handleNavigation(item.path)}
              className={`w-full flex items-center px-6 py-3 text-left text-white hover:bg-orange-600 transition-colors ${
                isActive ? "bg-orange-600 border-r-4 border-white" : ""
              }`}
            >
              <Icon className="h-5 w-5" />
              <span className="ml-3 font-medium">{item.name}</span>
            </button>
          )
        })}
      </nav>

      {/* Help Section */}
      <div className="absolute bottom-0 left-0 right-0 p-4">
        <div className="bg-orange-600 rounded-lg p-4">
          <h4 className="text-white font-medium text-sm mb-1 flex items-center">
            <HelpCircle className="h-4 w-4 mr-2" />
            Need Help?
          </h4>
          <p className="text-orange-100 text-xs mb-3">Contact our support team</p>
          <button
            onClick={handleGetSupport}
            className="bg-white text-orange-600 text-xs px-3 py-2 rounded-md hover:bg-orange-50 transition-colors w-full"
          >
            Get Support
          </button>
        </div>
      </div>
    </div>
  )
}

export default Sidebar
