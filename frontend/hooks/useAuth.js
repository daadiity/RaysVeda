"use client"

import { useState, useEffect, createContext, useContext } from "react"
import { adminAPI } from "../services/api"

const AuthContext = createContext()

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    checkAuth()
  }, [])

  const checkAuth = async () => {
    try {
      const token = localStorage.getItem("adminToken")
      if (token) {
        const response = await adminAPI.getProfile()
        setUser(response.data)
      }
    } catch (error) {
      console.error("Auth check failed:", error)
      localStorage.removeItem("adminToken")
      localStorage.removeItem("adminUser")
    } finally {
      setLoading(false)
    }
  }

  const login = async (credentials) => {
    const response = await adminAPI.login(credentials)
    if (response.success) {
      localStorage.setItem("adminToken", response.data.token)
      localStorage.setItem("adminUser", JSON.stringify(response.data.admin))
      setUser(response.data.admin)
      return response
    }
    throw new Error(response.message)
  }

  const logout = async () => {
    try {
      await adminAPI.logout()
    } catch (error) {
      console.error("Logout error:", error)
    } finally {
      localStorage.removeItem("adminToken")
      localStorage.removeItem("adminUser")
      setUser(null)
    }
  }

  const value = {
    user,
    login,
    logout,
    loading,
    isAuthenticated: !!user,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
