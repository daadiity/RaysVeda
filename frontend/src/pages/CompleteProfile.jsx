import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const CompleteProfile = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    name: "",
    phone: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await axios.post("/api/users/complete-profile", formData);
      setSuccessMsg("🎉 Profile updated successfully!");
      setTimeout(() => navigate("/login"), 1500);
    } catch (err) {
      alert("❌ Failed to update profile. Try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-orange-50">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 shadow-xl rounded-lg w-full max-w-md"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">
          Complete Your Profile
        </h2>

        {successMsg && (
          <div className="mb-4 text-green-600 font-medium">{successMsg}</div>
        )}

        <input
          type="email"
          name="email"
          placeholder="Your Email"
          required
          onChange={handleChange}
          className="w-full mb-3 p-3 border border-gray-300 rounded"
        />
        <input
          type="text"
          name="name"
          placeholder="Your Name"
          required
          onChange={handleChange}
          className="w-full mb-3 p-3 border border-gray-300 rounded"
        />
        <input
          type="text"
          name="phone"
          placeholder="Phone Number"
          required
          onChange={handleChange}
          className="w-full mb-3 p-3 border border-gray-300 rounded"
        />
        <input
          type="password"
          name="password"
          placeholder="Set a New Password"
          required
          onChange={handleChange}
          className="w-full mb-4 p-3 border border-gray-300 rounded"
        />
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-orange-600 hover:bg-orange-700 text-white py-2 rounded font-medium"
        >
          {loading ? "Saving..." : "Save & Continue"}
        </button>
      </form>
    </div>
  );
};

export default CompleteProfile;
