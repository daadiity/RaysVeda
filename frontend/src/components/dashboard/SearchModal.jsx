import { useState, useEffect } from "react"
import PropTypes from "prop-types"
import { Dialog } from "@headlessui/react"
import { X, ExternalLink } from "lucide-react"
import { adminAPI } from "../../services/api"
import { useNavigate } from "react-router-dom"

export default function SearchModal({ onClose }) {
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState("Users")
  const [query, setQuery] = useState("")
  const [results, setResults] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      if (query.trim()) {
        handleSearch()
      } else {
        setResults([])
      }
    }, 500)
    
    return () => clearTimeout(delayDebounce)
  }, [query, activeTab])

  const handleItemClick = (item) => {
    if (activeTab === "Users" && item?._id) {
      navigate(`/admin/users/${item._id}`)
      onClose()
    } else if (activeTab === "Bookings" && item?._id) {
      navigate(`/admin/bookings/${item._id}`)
      onClose()
    }
  }

  const handleSearch = async () => {
    try {
      setLoading(true)
      let response
      if (activeTab === "Users") {
        response = await adminAPI.searchUsers({ query })
      } else {
        response = await adminAPI.searchBookings({ query })
      }
      // Check if response is valid and has data property
      if (response && Array.isArray(response)) {
        setResults(response)
      } else if (response && Array.isArray(response.data)) {
        setResults(response.data)
      } else {
        setResults([])
        console.error("Invalid response format:", response)
      }
    } catch (err) {
      console.error("Search error:", err)
      setResults([])
      // Show error message to user
      alert(`Error searching ${activeTab.toLowerCase()}: ${err.message || 'Unknown error'}`)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog open={true} onClose={onClose} className="fixed z-50 inset-0 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen bg-black/30 px-4">
        <Dialog.Panel className="w-full max-w-2xl bg-white rounded-lg shadow-xl p-6 relative">
          <button
            onClick={onClose}
            className="absolute top-3 right-3 text-gray-500 hover:text-red-500"
          >
            <X className="w-5 h-5" />
          </button>

          <Dialog.Title className="text-xl font-semibold text-gray-800 mb-4">Search</Dialog.Title>

          {/* Tabs */}
          <div className="flex space-x-4 mb-4">
            {["Users", "Bookings"].map((tab) => (
              <button
                key={tab}
                className={`px-3 py-1 rounded ${
                  activeTab === tab ? "bg-orange-500 text-white" : "bg-gray-100 text-gray-700"
                }`}
                onClick={() => setActiveTab(tab)}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Search input */}
          <input
            type="text"
            className="w-full px-4 py-2 border rounded mb-4 focus:outline-none focus:ring-2 focus:ring-orange-500"
            placeholder={`Search ${activeTab.toLowerCase()}...`}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />

          {/* Results */}
          <div className="max-h-64 overflow-y-auto">
            {loading ? (
              <div className="flex justify-center items-center py-4">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-500"></div>
                <span className="ml-2 text-gray-500">Searching...</span>
              </div>
            ) : query.trim() === "" ? (
              <p className="text-gray-500 text-center py-4">Type to search {activeTab.toLowerCase()}...</p>
            ) : results.length === 0 ? (
              <p className="text-gray-500 text-center py-4">No results found for "{query}"</p>
            ) : (
              <ul className="space-y-3">
                {results.map((item, index) => (
                  <li 
                    key={index} 
                    className="p-3 border rounded bg-gray-50 hover:bg-orange-50 cursor-pointer transition-colors flex justify-between items-start"
                    onClick={() => handleItemClick(item)}
                  >
                    <div>
                      {activeTab === "Users" ? (
                        <>
                          <p className="font-semibold">{item?.name || "Unknown User"}</p>
                          <p className="text-sm text-gray-500">{item?.email || "No email"}</p>
                        </>
                      ) : (
                        <>
                          <p className="font-semibold">Booking #{item?._id ? item._id.slice(-6) : "Unknown"}</p>
                          <p className="text-sm text-gray-500">User: {item?.user?.name || "N/A"}</p>
                          <p className="text-sm text-gray-500">Pooja: {item?.pooja?.name || "N/A"}</p>
                          <p className="text-sm text-gray-500">Status: {item?.status || "N/A"}</p>
                        </>
                      )}
                    </div>
                    <ExternalLink className="h-4 w-4 text-gray-400 mt-1" />
                  </li>
                ))}
              </ul>
            )}
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  )
}

SearchModal.propTypes = {
  onClose: PropTypes.func.isRequired,
}
