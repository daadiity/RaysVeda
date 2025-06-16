"use client"
import { useNavigate } from "react-router-dom"
import { Users, Calendar, BarChart3, BookOpen, Plus, FileText } from "lucide-react"

const QuickActions = () => {
  const navigate = useNavigate()

  const quickActions = [
    {
      icon: Users,
      title: "Add User",
      bgColor: "bg-orange-50",
      hoverColor: "hover:bg-orange-100",
      borderColor: "border-orange-200",
      iconColor: "text-orange-600",
      action: () => navigate("/admin/users?action=add"),
    },
    {
      icon: Calendar,
      title: "New Booking",
      bgColor: "bg-blue-50",
      hoverColor: "hover:bg-blue-100",
      borderColor: "border-blue-200",
      iconColor: "text-blue-600",
      action: () => navigate("/admin/bookings?action=add"),
    },
    {
      icon: BarChart3,
      title: "View Reports",
      bgColor: "bg-green-50",
      hoverColor: "hover:bg-green-100",
      borderColor: "border-green-200",
      iconColor: "text-green-600",
      action: () => navigate("/admin/reports"),
    },
    {
      icon: BookOpen,
      title: "Manage Poojas",
      bgColor: "bg-purple-50",
      hoverColor: "hover:bg-purple-100",
      borderColor: "border-purple-200",
      iconColor: "text-purple-600",
      action: () => navigate("/admin/poojas"),
    },
    {
      icon: Plus,
      title: "Add Pooja",
      bgColor: "bg-indigo-50",
      hoverColor: "hover:bg-indigo-100",
      borderColor: "border-indigo-200",
      iconColor: "text-indigo-600",
      action: () => navigate("/admin/poojas?action=add"),
    },
    {
      icon: FileText,
      title: "Generate Report",
      bgColor: "bg-pink-50",
      hoverColor: "hover:bg-pink-100",
      borderColor: "border-pink-200",
      iconColor: "text-pink-600",
      action: () => navigate("/admin/reports?action=generate"),
    },
  ]

  return (
    <div className="bg-white rounded-lg border shadow-sm">
      <div className="p-6 border-b">
        <h3 className="text-lg font-semibold text-gray-900">Quick Actions</h3>
        <p className="text-sm text-gray-500">Common tasks and shortcuts</p>
      </div>
      <div className="p-6">
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
          {quickActions.map((action, index) => {
            const Icon = action.icon
            return (
              <button
                key={index}
                onClick={action.action}
                className={`p-4 ${action.bgColor} ${action.hoverColor} rounded-lg border ${action.borderColor} transition-all duration-200 group hover:scale-105 hover:shadow-md`}
              >
                <Icon
                  className={`h-6 w-6 ${action.iconColor} mb-2 group-hover:scale-110 transition-transform duration-200`}
                />
                <p className="text-sm font-medium text-gray-900">{action.title}</p>
              </button>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default QuickActions
