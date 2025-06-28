import { useState } from "react";
import PropTypes from "prop-types";
// import { Dialog } from "@headlessui/react"
import { Dialog } from "@headlessui/react";

export default function AddPoojaModal({ isOpen, onClose, onCreate }) {
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    description: "",
    price: "",
    duration: "",
    image: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
  e.preventDefault();

  // Convert `image` string into `images` array
  const payload = {
    ...formData,
    images: formData.image ? [formData.image] : [], // ✅ new field expected by backend
  };
  delete payload.image; // Remove old image string

  await onCreate(payload); // Send updated payload to parent

  setFormData({
    name: "",
    category: "",
    description: "",
    price: "",
    duration: "",
    image: "",
  });
};


  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
      className="fixed z-50 inset-0 overflow-y-auto"
    >
      <div className="flex items-center justify-center min-h-screen px-4">
        {/* Replaced problematic Dialog.Overlay */}
        <div className="fixed inset-0 bg-black opacity-30" />

        <div className="bg-white rounded-xl shadow-xl p-6 max-w-lg w-full z-10">
          <Dialog.Title className="text-lg font-semibold mb-4">
            Add New Pooja
          </Dialog.Title>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              name="name"
              placeholder="Name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full border px-3 py-2 rounded-lg"
            />
            <input
              name="category"
              placeholder="Category"
              value={formData.category}
              onChange={handleChange}
              required
              className="w-full border px-3 py-2 rounded-lg"
            />
            <input
              name="price"
              placeholder="Price (₹)"
              value={formData.price}
              onChange={handleChange}
              required
              className="w-full border px-3 py-2 rounded-lg"
            />
            <input
              name="duration"
              placeholder="Duration (e.g. 1 hour)"
              value={formData.duration}
              onChange={handleChange}
              required
              className="w-full border px-3 py-2 rounded-lg"
            />
            <input
              name="image"
              placeholder="Image URL"
              value={formData.image}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded-lg"
            />
            <textarea
              name="description"
              placeholder="Description"
              value={formData.description}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded-lg"
            />
            <div className="flex justify-end gap-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-sm border rounded-lg"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="bg-orange-500 text-white px-4 py-2 rounded-lg"
              >
                Add
              </button>
            </div>
          </form>
        </div>
      </div>
    </Dialog>
  );
}

AddPoojaModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onCreate: PropTypes.func.isRequired,
};
