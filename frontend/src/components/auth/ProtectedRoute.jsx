



"use client"

import { useEffect, useState } from "react"
import { Navigate, useLocation } from "react-router-dom"
import { adminAPI } from "../../services/api"

const ProtectedRoute = ({ children, role = "user" }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(null)
  const [loading, setLoading] = useState(true)
  const location = useLocation()

  useEffect(() => {
    checkAuth()
  }, [])

  const checkAuth = async () => {
    try {
      const tokenKey = role === "admin" ? "adminToken" : "token"
      const token = localStorage.getItem(tokenKey)

      if (!token) {
        setIsAuthenticated(false)
        setLoading(false)
        return
      }

      if (role === "admin") {
        // Verify admin token with backend
        await adminAPI.getProfile()
      } else {
        // Optional: Call your own `/api/user/profile` if needed
        // await userAPI.getProfile()
      }

      setIsAuthenticated(true)
    } catch (error) {
      console.error("Auth check failed:", error)
      localStorage.removeItem(role === "admin" ? "adminToken" : "token")
      localStorage.removeItem(role === "admin" ? "adminUser" : "user")
      setIsAuthenticated(false)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
      </div>
    )
  }

  if (!isAuthenticated) {
    return <Navigate to={role === "admin" ? "/admin/login" : "/login"} replace />
  }

  return children
}

export default ProtectedRoute
