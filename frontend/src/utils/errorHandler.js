// Error handling utility
export const handleApiError = (error, defaultMessage = "An error occurred") => {
  console.error("API Error:", error)

  if (error.response) {
    // Server responded with error status
    return error.response.data?.message || defaultMessage
  } else if (error.request) {
    // Request was made but no response received
    return "Network error. Please check your connection."
  } else {
    // Something else happened
    return error.message || defaultMessage
  }
}

export const showSuccessMessage = (message) => {
  // You can replace this with a toast library like react-hot-toast
  alert(message)
}

export const showErrorMessage = (error, defaultMessage) => {
  const message = handleApiError(error, defaultMessage)
  alert(message)
}
