import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ResetPasswordPage = () => {
  const [formData, setFormData] = useState({
    email: "",
    tempPassword: "",
    newPassword: "",
  });
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg("");
    setSuccessMsg("");
    setLoading(true);

    try {
      const { data } = await axios.post("/api/complete-profile", formData);

      setSuccessMsg(data.message || "Profile updated successfully!");
      setTimeout(() => navigate("/login"), 2000);
    } catch (error) {
      const msg =
        error.response?.data?.message || "Something went wrong. Try again.";
      setErrorMsg(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-orange-50 px-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded shadow-md max-w-md w-full"
      >
        <h2 className="text-2xl font-semibold mb-6 text-center">
          Complete Your Profile
        </h2>

        {errorMsg && (
          <p className="text-red-600 text-sm mb-4 text-center">{errorMsg}</p>
        )}
        {successMsg && (
          <p className="text-green-600 text-sm mb-4 text-center">
            {successMsg}
          </p>
        )}

        <input
          type="email"
          name="email"
          placeholder="Email"
          required
          className="w-full p-2 mb-4 border rounded"
          onChange={handleChange}
        />
        <input
          type="password"
          name="tempPassword"
          placeholder="Temporary Password"
          required
          className="w-full p-2 mb-4 border rounded"
          onChange={handleChange}
        />
        <input
          type="password"
          name="newPassword"
          placeholder="New Password"
          required
          className="w-full p-2 mb-4 border rounded"
          onChange={handleChange}
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-orange-600 text-white py-2 rounded hover:bg-orange-700 transition"
        >
          {loading ? "Updating..." : "Set New Password"}
        </button>
      </form>
    </div>
  );
};

export default ResetPasswordPage;
