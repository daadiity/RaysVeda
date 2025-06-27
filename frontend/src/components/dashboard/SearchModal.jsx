import { useState, useEffect } from "react"
import PropTypes from "prop-types"
import { Dialog } from "@headlessui/react"
import { X } from "lucide-react"
import { adminAPI } from "../../services/api"

export default function SearchModal({ onClose }) {
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

  const handleSearch = async () => {
    try {
      setLoading(true)
      let response
      if (activeTab === "Users") {
        response = await adminAPI.searchUsers({ query })
      } else {
        response = await adminAPI.searchBookings({ query })
      }
      setResults(response.data)
    } catch (err) {
      console.error("Search error:", err)
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
              <p className="text-gray-500">Searching...</p>
            ) : results.length === 0 ? (
              <p className="text-gray-500">No results found</p>
            ) : (
              <ul className="space-y-3">
                {results.map((item, index) => (
                  <li key={index} className="p-3 border rounded bg-gray-50">
                    {activeTab === "Users" ? (
                      <>
                        <p className="font-semibold">{item.name}</p>
                        <p className="text-sm text-gray-500">{item.email}</p>
                      </>
                    ) : (
                      <>
                        <p className="font-semibold">Booking #{item._id.slice(-6)}</p>
                        <p className="text-sm text-gray-500">User: {item.user?.name || "N/A"}</p>
                        <p className="text-sm text-gray-500">Pooja: {item.pooja?.name || "N/A"}</p>
                      </>
                    )}
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
