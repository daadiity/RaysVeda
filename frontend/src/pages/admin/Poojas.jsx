"use client"

import { useState, useEffect } from "react"
import { Search, Plus, Edit, Trash2, Eye, Star } from "lucide-react"
import adminAPI from "../../services/api" // ✅ Make sure this file is correctly configured

const Poojas = () => {
  const [poojas, setPoojas] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const [poojasPerPage] = useState(10)

  useEffect(() => {
    fetchPoojas()
  }, [currentPage, searchTerm])

  const fetchPoojas = async () => {
    try {
      setLoading(true)
      const params = {
        page: currentPage,
        limit: poojasPerPage,
        search: searchTerm,
      }
      const response = await adminAPI.getPoojas(params)
      setPoojas(response.data.poojas || []) // Adjust according to your API response shape
    } catch (error) {
      console.error("Error fetching poojas:", error)
      alert("Failed to load poojas. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  const handleAddPooja = () => {
    alert("Add pooja functionality - implement form/modal with adminAPI.createPooja()")
  }

  const handleEditPooja = (poojaId) => {
    alert(`Edit pooja functionality - use adminAPI.updatePooja(${poojaId}, data)`)
  }

  const handleDeletePooja = async (poojaId) => {
    if (window.confirm("Are you sure you want to delete this pooja?")) {
      try {
        await adminAPI.deletePooja(poojaId)
        fetchPoojas()
        alert("Pooja deleted successfully")
      } catch (error) {
        console.error("Error deleting pooja:", error)
        alert("Failed to delete pooja. Please try again.")
      }
    }
  }

  const handleToggleStatus = async (poojaId, currentStatus) => {
    try {
      await adminAPI.updatePoojaStatus(poojaId, !currentStatus)
      fetchPoojas()
      alert("Pooja status updated successfully")
    } catch (error) {
      console.error("Error updating pooja status:", error)
      alert("Failed to update pooja status. Please try again.")
    }
  }

  const handleViewPooja = (poojaId) => {
    alert(`View pooja details - use adminAPI.getPoojaById(${poojaId})`)
  }

  const filteredPoojas = poojas.filter(
    (pooja) =>
      pooja.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      pooja.category.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const indexOfLastPooja = currentPage * poojasPerPage
  const indexOfFirstPooja = indexOfLastPooja - poojasPerPage
  const currentPoojas = filteredPoojas.slice(indexOfFirstPooja, indexOfLastPooja)
  const totalPages = Math.ceil(filteredPoojas.length / poojasPerPage)

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
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Poojas Management</h1>
        <p className="text-gray-600">Manage all pooja services and offerings</p>
      </div>

      {/* Search and Add Pooja */}
      <div className="bg-white rounded-lg border shadow-sm p-6 mb-6">
        <div className="flex flex-col sm:flex-row gap-4 justify-between items-center">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <input
              type="text"
              placeholder="Search poojas..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent w-full"
            />
          </div>
          <button
            onClick={handleAddPooja}
            className="bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 transition-colors flex items-center gap-2"
          >
            <Plus className="h-4 w-4" />
            Add Pooja
          </button>
        </div>
      </div>

      {/* Poojas Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {currentPoojas.map((pooja) => (
          <div
            key={pooja._id}
            className="bg-white rounded-lg border shadow-sm overflow-hidden hover:shadow-md transition-shadow"
          >
            <div className="aspect-w-16 aspect-h-9">
              <img src={pooja.image || "/placeholder.svg"} alt={pooja.name} className="w-full h-48 object-cover" />
            </div>
            <div className="p-6">
              <div className="flex items-start justify-between mb-2">
                <h3 className="text-lg font-semibold text-gray-900">{pooja.name}</h3>
                <span
                  className={`px-2 py-1 text-xs rounded-full ${
                    pooja.isActive ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                  }`}
                >
                  {pooja.isActive ? "Active" : "Inactive"}
                </span>
              </div>

              <p className="text-gray-600 text-sm mb-3 line-clamp-2">{pooja.description}</p>

              <div className="space-y-2 mb-4">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Price:</span>
                  <span className="font-medium text-gray-900">₹{pooja.price}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Duration:</span>
                  <span className="font-medium text-gray-900">{pooja.duration}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Category:</span>
                  <span className="font-medium text-gray-900">{pooja.category}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Bookings:</span>
                  <span className="font-medium text-gray-900">{pooja.totalBookings}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Rating:</span>
                  <div className="flex items-center">
                    <Star className="h-4 w-4 text-yellow-400 fill-current" />
                    <span className="font-medium text-gray-900 ml-1">{pooja.rating}</span>
                  </div>
                </div>
              </div>

              <div className="flex justify-between items-center pt-4 border-t">
                <button
                  onClick={() => handleToggleStatus(pooja._id, pooja.isActive)}
                  className={`px-3 py-1 text-xs rounded-md transition-colors ${
                    pooja.isActive
                      ? "bg-red-100 text-red-700 hover:bg-red-200"
                      : "bg-green-100 text-green-700 hover:bg-green-200"
                  }`}
                >
                  {pooja.isActive ? "Deactivate" : "Activate"}
                </button>

                <div className="flex space-x-2">
                  <button onClick={() => handleViewPooja(pooja._id)} className="text-blue-600 hover:text-blue-900 p-1">
                    <Eye className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => handleEditPooja(pooja._id)}
                    className="text-orange-600 hover:text-orange-900 p-1"
                  >
                    <Edit className="h-4 w-4" />
                  </button>
                  <button onClick={() => handleDeletePooja(pooja._id)} className="text-red-600 hover:text-red-900 p-1">
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="mt-8 flex justify-center">
          <div className="flex space-x-2">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="px-3 py-1 border border-gray-300 rounded-md text-sm disabled:opacity-50"
            >
              Previous
            </button>
            <span className="px-3 py-1 text-sm text-gray-700">
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="px-3 py-1 border border-gray-300 rounded-md text-sm disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default Poojas
