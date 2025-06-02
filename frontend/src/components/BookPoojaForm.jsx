import React, { useState } from "react";
import axios from "axios";

export default function BookPoojaForm({ onClose }) {
  const [form, setForm] = useState({
    name: "",
    gotra: "",
    address: "",
    phone: "",
    poojaType: "",
    email: ""
  });
  const [loading, setLoading] = useState(false);

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post("http://localhost:5000/api/book-pooja", form);
      const { orderId, amount, currency, key, name, email, poojaType } = res.data;

      const options = {
        key,
        amount,
        currency,
        name: "RaysVeda",
        description: `Booking for ${poojaType}`,
        order_id: orderId,
        handler: function (response) {
          window.location.href = "/success";
        },
        prefill: {
          name,
          email,
          contact: form.phone,
        },
        notes: {
          poojaType,
          gotra: form.gotra,
          address: form.address,
        },
        theme: {
          color: "#F59E42"
        }
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
      setLoading(false);
    } catch (err) {
      alert("Booking failed. Try again.");
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="name" value={form.name} onChange={handleChange} required placeholder="Name" />
      <input name="gotra" value={form.gotra} onChange={handleChange} placeholder="Gotra" />
      <input name="address" value={form.address} onChange={handleChange} required placeholder="Address" />
      <input name="phone" value={form.phone} onChange={handleChange} required placeholder="Phone" />
      <input name="email" value={form.email} onChange={handleChange} required placeholder="Email" />
      <select name="poojaType" value={form.poojaType} onChange={handleChange} required>
        <option value="">Select Pooja</option>
        <option value="Rudraabhishek">Rudraabhishek</option>
        <option value="Laxmi Puja">Laxmi Puja</option>
        <option value="Kalsarpadosh Puja">Kalsarpadosh Puja</option>
      </select>
      <button type="submit" disabled={loading}>
        {loading ? "Processing..." : "Proceed to Payment"}
      </button>
      <button type="button" onClick={onClose}>Cancel</button>
    </form>
  );
}