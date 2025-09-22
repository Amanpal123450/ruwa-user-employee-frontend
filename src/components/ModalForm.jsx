
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function ModalForm({ isOpen, onClose }) {
  const main = useNavigate()
  const [formData, setFormData] = useState({
    name: "",
    mobile: "",
    email: "",
    city: "",
    agree: false,
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const res = await fetch("https://ruwa-backend.onrender.com/api/popup/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (res.ok) {
        setMessage(data.message);
        setFormData({
          name: "",
          mobile: "",
          email: "",
          city: "",
          agree: false,
        });
        main("/")
      } else {
        setMessage(data.message || "Something went wrong");
      }
    } catch (err) {
      setMessage("Server error, try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-box">
        <button className="modal-close" onClick={onClose}>×</button>

        <div className="modal-header">
          <h2 className="modal-title">
            RUWA <strong>India</strong>
          </h2>
        </div>

        <p className="modal-description">
          Empowering healthcare access across India. Fill in your details to
          stay connected with our initiatives and updates.
        </p>

        <form className="modal-form" onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="mobile"
            placeholder="Mobile No."
            value={formData.mobile}
            onChange={handleChange}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <select
            name="city"
            value={formData.city}
            onChange={handleChange}
            required
          >
            <option value="">Select City</option>
            <option>DELHI</option>
            <option>MUMBAI</option>
            <option>BANGALORE</option>
          </select>

          <label className="modal-checkbox">
            <input
              type="checkbox"
              name="agree"
              checked={formData.agree}
              onChange={handleChange}
              required
            />
            I agree to the{" "}
            <a href="#">Terms of Use</a>, <a href="#">Privacy Policy</a> &{" "}
            <a href="#">Data Collection Contract</a>
          </label>

          <button type="submit" className="modal-submit" disabled={loading}>
            {loading ? "Submitting..." : "SUBMIT"}
          </button>
        </form>

        {message && <p className="modal-message">{message}</p>}
      </div>
    </div>
  );
}

