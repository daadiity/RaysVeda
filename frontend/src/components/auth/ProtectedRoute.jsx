"use client"

import { useEffect, useState } from "react"
import { Navigate } from "react-router-dom"
import { adminAPI } from "../../services/api"

const ProtectedRoute = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    checkAuth()
  }, [])

  const checkAuth = async () => {
    try {
      const token = localStorage.getItem("adminToken")

      if (!token) {
        setIsAuthenticated(false)
        setLoading(false)
        return
      }

      // Verify token with backend
      await adminAPI.getProfile()
      setIsAuthenticated(true)
    } catch (error) {
      console.error("Auth check failed:", error)
      localStorage.removeItem("adminToken")
      localStorage.removeItem("adminUser")
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
    return <Navigate to="/admin/login" replace />
  }

  return children
}

export default ProtectedRoute
