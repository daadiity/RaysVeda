const moment = require("moment")

// Format date for display
const formatDate = (date, format = "DD/MM/YYYY") => {
  return moment(date).format(format)
}

// Format currency
const formatCurrency = (amount, currency = "₹") => {
  return `${currency}${amount.toLocaleString("en-IN")}`
}

// Generate random string
const generateRandomString = (length = 10) => {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"
  let result = ""
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length))
  }
  return result
}

// Validate email
const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

// Validate phone number (Indian format)
const isValidPhone = (phone) => {
  const phoneRegex = /^(\+91|91|0)?[6789]\d{9}$/
  return phoneRegex.test(phone.replace(/\s+/g, ""))
}

// Calculate age from date of birth
const calculateAge = (dateOfBirth) => {
  return moment().diff(moment(dateOfBirth), "years")
}

// Get date range for reports
const getDateRange = (period) => {
  const now = moment()
  let startDate,
    endDate = now

  switch (period) {
    case "today":
      startDate = now.clone().startOf("day")
      break
    case "yesterday":
      startDate = now.clone().subtract(1, "day").startOf("day")
      endDate = now.clone().subtract(1, "day").endOf("day")
      break
    case "last7days":
      startDate = now.clone().subtract(7, "days").startOf("day")
      break
    case "last30days":
      startDate = now.clone().subtract(30, "days").startOf("day")
      break
    case "thisMonth":
      startDate = now.clone().startOf("month")
      break
    case "lastMonth":
      startDate = now.clone().subtract(1, "month").startOf("month")
      endDate = now.clone().subtract(1, "month").endOf("month")
      break
    case "thisYear":
      startDate = now.clone().startOf("year")
      break
    default:
      startDate = now.clone().subtract(30, "days").startOf("day")
  }

  return {
    startDate: startDate.toDate(),
    endDate: endDate.toDate(),
  }
}

// Pagination helper
const getPagination = (page, limit) => {
  const offset = (page - 1) * limit
  return { offset, limit }
}

// Response helper
const sendResponse = (res, statusCode, success, message, data = null) => {
  return res.status(statusCode).json({
    success,
    message,
    ...(data && { data }),
  })
}

// Error response helper
const sendError = (res, statusCode, message, error = null) => {
  return res.status(statusCode).json({
    success: false,
    message,
    ...(process.env.NODE_ENV === "development" && error && { error: error.message }),
  })
}

module.exports = {
  formatDate,
  formatCurrency,
  generateRandomString,
  isValidEmail,
  isValidPhone,
  calculateAge,
  getDateRange,
  getPagination,
  sendResponse,
  sendError,
}
