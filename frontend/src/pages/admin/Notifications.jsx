"use client"

import { useState, useEffect } from "react"
import { Bell, Check, Trash2 } from "lucide-react"
import { adminAPI } from "../../services/api"

const Notifications = () => {
  const [notifications, setNotifications] = useState([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState("all")

  useEffect(() => {
    fetchNotifications()
  }, [])

  const fetchNotifications = async () => {
    try {
      setLoading(true)
      const response = await adminAPI.getNotifications()
      setNotifications(response.data)
    } catch (error) {
      console.error("Error fetching notifications:", error)
      alert("Failed to load notifications. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  const markAsRead = async (notificationId) => {
    try {
      await adminAPI.markNotificationAsRead(notificationId)
      setNotifications((prev) =>
        prev.map((notification) =>
          notification._id === notificationId ? { ...notification, read: true } : notification,
        ),
      )
    } catch (error) {
      console.error("Error marking notification as read:", error)
      alert("Failed to mark notification as read.")
    }
  }

  const markAllAsRead = async () => {
    try {
      await adminAPI.markAllNotificationsAsRead()
      setNotifications((prev) => prev.map((notification) => ({ ...notification, read: true })))
    } catch (error) {
      console.error("Error marking all notifications as read:", error)
      alert("Failed to mark all notifications as read.")
    }
  }

  const deleteNotification = async (notificationId) => {
    try {
      await adminAPI.deleteNotification(notificationId)
      setNotifications((prev) => prev.filter((notification) => notification._id !== notificationId))
    } catch (error) {
      console.error("Error deleting notification:", error)
      alert("Failed to delete notification.")
    }
  }

  const getNotificationIcon = (type) => {
    switch (type) {
      case "booking":
        return "📅"
      case "payment":
        return "💰"
      case "user":
        return "👤"
      case "system":
        return "⚙️"
      default:
        return "🔔"
    }
  }

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "high":
        return "border-l-red-500"
      case "medium":
        return "border-l-yellow-500"
      case "low":
        return "border-l-green-500"
      default:
        return "border-l-gray-500"
    }
  }

  const filteredNotifications = notifications.filter((notification) => {
    if (filter === "all") return true
    if (filter === "unread") return !notification.read
    if (filter === "read") return notification.read
    return notification.type === filter
  })

  const unreadCount = notifications.filter((n) => !n.read).length

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
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Notifications</h1>
            <p className="text-gray-600">
              You have {unreadCount} unread notification{unreadCount !== 1 ? "s" : ""}
            </p>
          </div>
          {unreadCount > 0 && (
            <button
              onClick={markAllAsRead}
              className="bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 transition-colors flex items-center gap-2"
            >
              <Check className="h-4 w-4" />
              Mark All as Read
            </button>
          )}
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg border shadow-sm p-4 mb-6">
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setFilter("all")}
            className={`px-3 py-1 rounded-full text-sm transition-colors ${
              filter === "all" ? "bg-orange-100 text-orange-700" : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            All ({notifications.length})
          </button>
          <button
            onClick={() => setFilter("unread")}
            className={`px-3 py-1 rounded-full text-sm transition-colors ${
              filter === "unread" ? "bg-orange-100 text-orange-700" : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            Unread ({unreadCount})
          </button>
          <button
            onClick={() => setFilter("read")}
            className={`px-3 py-1 rounded-full text-sm transition-colors ${
              filter === "read" ? "bg-orange-100 text-orange-700" : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            Read ({notifications.length - unreadCount})
          </button>
          <button
            onClick={() => setFilter("booking")}
            className={`px-3 py-1 rounded-full text-sm transition-colors ${
              filter === "booking" ? "bg-orange-100 text-orange-700" : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            Bookings
          </button>
          <button
            onClick={() => setFilter("payment")}
            className={`px-3 py-1 rounded-full text-sm transition-colors ${
              filter === "payment" ? "bg-orange-100 text-orange-700" : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            Payments
          </button>
          <button
            onClick={() => setFilter("user")}
            className={`px-3 py-1 rounded-full text-sm transition-colors ${
              filter === "user" ? "bg-orange-100 text-orange-700" : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            Users
          </button>
        </div>
      </div>

      {/* Notifications List */}
      <div className="space-y-4">
        {filteredNotifications.length === 0 ? (
          <div className="bg-white rounded-lg border shadow-sm p-8 text-center">
            <Bell className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No notifications found</h3>
            <p className="text-gray-500">You're all caught up!</p>
          </div>
        ) : (
          filteredNotifications.map((notification) => (
            <div
              key={notification._id}
              className={`bg-white rounded-lg border shadow-sm border-l-4 ${getPriorityColor(notification.priority)} ${
                !notification.read ? "bg-orange-50" : ""
              }`}
            >
              <div className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-4 flex-1">
                    <div className="text-2xl">{getNotificationIcon(notification.type)}</div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className={`text-lg font-medium ${!notification.read ? "text-gray-900" : "text-gray-700"}`}>
                          {notification.title}
                        </h3>
                        {!notification.read && <span className="w-2 h-2 bg-orange-500 rounded-full"></span>}
                      </div>
                      <p className="text-gray-600 mb-2">{notification.message}</p>
                      <div className="flex items-center gap-4 text-sm text-gray-500">
                        <span>{new Date(notification.createdAt).toLocaleString()}</span>
                        <span className="capitalize">{notification.type}</span>
                        <span
                          className={`px-2 py-1 rounded-full text-xs ${
                            notification.priority === "high"
                              ? "bg-red-100 text-red-700"
                              : notification.priority === "medium"
                                ? "bg-yellow-100 text-yellow-700"
                                : "bg-green-100 text-green-700"
                          }`}
                        >
                          {notification.priority} priority
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2 ml-4">
                    {!notification.read && (
                      <button
                        onClick={() => markAsRead(notification._id)}
                        className="text-green-600 hover:text-green-700 p-1 rounded"
                        title="Mark as read"
                      >
                        <Check className="h-4 w-4" />
                      </button>
                    )}
                    <button
                      onClick={() => deleteNotification(notification._id)}
                      className="text-red-600 hover:text-red-700 p-1 rounded"
                      title="Delete notification"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}

export default Notifications
