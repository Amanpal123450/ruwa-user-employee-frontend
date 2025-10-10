import React, { useState, useEffect } from "react";

export default function Empjansewa() {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  const [formData, setFormData] = useState({
    // User fields - matching backend expectations
    fullName: "",
    phoneNumber: "",
    aadhaarNumber: "",
    annualFamilyIncome: "",
    residentialArea: "",
    additionalNotes: "",
    idProof: null,
    
    // Employee info (auto-filled from profile)
    employeeId: "",
    employeeName: "",
    remarks: ""
  });

  // Fetch employee data on component mount
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;

    fetch("https://ruwa-backend.onrender.com/api/auth/profile", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => {
        const user = data?.user || {};
        setFormData((prev) => ({
          ...prev,
          employeeName: user.name || "",
          employeeId: user.employeeId || user._id || "",
        }));
      })
      .catch((err) => console.error("Profile fetch failed:", err));
  }, []);

  const services = [
    {
      icon: "🆔",
      title: "Welfare Eligibility Check",
      description: [
        "Available to low-income families and senior citizens.",
        "Priority for rural and semi-urban areas.",
        "Minimal documentation required.",
      ],
      gradient: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    },
    {
      icon: "🛡️",
      title: "Social Security Coverage",
      description: [
        "Access to welfare pensions and medical aid.",
        "Education benefits for children.",
        "Subsidized services for women and elderly.",
      ],
      gradient: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
    },
    {
      icon: "🧾",
      title: "Easy Documentation",
      description: [
        "Aadhaar card, income certificate accepted.",
        "Simple one-page application process.",
        "Assistance centers for document upload.",
      ],
      gradient: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
    },
    {
      icon: "🚑",
      title: "Free Ambulance & Emergency Services",
      description: [
        "24/7 ambulance access in rural areas.",
        "Priority support during medical emergencies.",
        "Includes transport to partnered hospitals.",
      ],
      gradient: "linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)",
    },
  ];

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prev) => ({ 
      ...prev, 
      [name]: files ? files[0] : value 
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        setError("You must be logged in to submit an application.");
        return;
      }

      // Create FormData for file upload
      const fd = new FormData();
      
      // Append user fields (matching backend controller expectations)
      fd.append("fullName", formData.fullName);
      fd.append("phoneNumber", formData.phoneNumber);
      fd.append("aadhaarNumber", formData.aadhaarNumber);
      fd.append("annualFamilyIncome", formData.annualFamilyIncome);
      fd.append("residentialArea", formData.residentialArea);
      fd.append("additionalNotes", formData.additionalNotes);
      
      // Employee reference info
      fd.append("employeeId", formData.employeeId);
      fd.append("employeeName", formData.employeeName);
      fd.append("remarks", formData.remarks);
      
      // File upload
      if (formData.idProof) {
        fd.append("idProof", formData.idProof);
      }

      const res = await fetch("https://ruwa-backend.onrender.com/api/services/sevaApplication/employee/apply", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`
          // Don't set Content-Type for FormData
        },
        body: fd
      });

      const result = await res.json();

      if (res.ok) {
        setFormSubmitted(true);
        setTimeout(() => setFormSubmitted(false), 4000);
        
        // Reset form but keep employee info
        setFormData(prev => ({
          ...prev,
          fullName: "",
          phoneNumber: "",
          aadhaarNumber: "",
          annualFamilyIncome: "",
          residentialArea: "",
          additionalNotes: "",
          idProof: null,
          remarks: ""
        }));
        
        // Clear file input
        const fileInput = document.querySelector('input[type="file"]');
        if (fileInput) fileInput.value = '';
        
      } else {
        setError(result.message || "Failed to submit application");
      }
    } catch (err) {
      console.error("Submission error:", err);
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="dashboard-container">
      <div className="container-fluid py-4">
        <div className="row">
          <div className="col-12">
            {/* Header */}
            <div className="welcome-card mb-4">
              <div className="welcome-overlay">
                <div className="row align-items-center">
                  <div className="col-lg-8 col-md-7">
                    <div className="welcome-content">
                      <div className="greeting-badge">
                        Employee Portal 👋
                      </div>
                      <h1 className="welcome-title">
                        Jan Swabhiman Seva Applications
                      </h1>
                      <p className="welcome-subtitle">
                        Submit welfare applications on behalf of users with your employee reference
                      </p>
                    </div>
                  </div>
                  <div className="col-lg-4 col-md-5 text-center">
                    <div className="profile-section">
                      <div className="profile-image-container">
                        <div className="service-icon-display">
                          <span className="icon-emoji">🆔</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Services Cards */}
            <div className="row mb-5">
              {services.map((service, index) => (
                <div className="col-12 col-md-6 col-lg-3 mb-4" key={index}>
                  <div className="service-card" style={{ '--gradient': service.gradient }}>
                    <div className="card-background"></div>
                    <div className="card-content">
                      <div className="card-icon">
                        <span className="icon-emoji">{service.icon}</span>
                      </div>
                      <div className="card-info">
                        <h4 className="card-title">{service.title}</h4>
                        <ul className="card-description">
                          {service.description.map((point, i) => (
                            <li key={i}>{point}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Application Form */}
            <div className="card user-table-card">
              <div className="card-header-custom">
                <h3 className="header-title">Employee Application Form</h3>
                <p className="header-subtitle">Submit Jan Swabhiman Seva applications on behalf of users</p>
              </div>
              
              <div className="card-body">
                {formSubmitted && (
                  <div className="alert alert-success alert-custom" role="alert">
                    <i className="fas fa-check-circle me-2"></i>
                    Jan Swabhiman Card application submitted successfully with Employee Reference!
                  </div>
                )}

                {error && (
                  <div className="alert alert-danger alert-custom" role="alert">
                    <i className="fas fa-exclamation-circle me-2"></i>
                    {error}
                  </div>
                )}

                <form onSubmit={handleSubmit}>
                  {/* User Details Section */}
                  <div className="row mb-4">
                    <div className="col-12">
                      <h5 className="section-title-with-icon">
                        <i className="fas fa-user me-2"></i>
                        User Details
                      </h5>
                      <hr className="section-divider" />
                    </div>
                    
                    <div className="col-md-6 mb-3">
                      <label className="form-label-custom">Full Name</label>
                      <input
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleChange}
                        type="text"
                        className="form-control-custom"
                        placeholder="Enter user's full name"
                        required
                      />
                    </div>
                    <div className="col-md-6 mb-3">
                      <label className="form-label-custom">Phone Number</label>
                      <input
                        name="phoneNumber"
                        value={formData.phoneNumber}
                        onChange={handleChange}
                        type="tel"
                        className="form-control-custom"
                        placeholder="e.g. 9876543210"
                        required
                      />
                    </div>
                    <div className="col-md-6 mb-3">
                      <label className="form-label-custom">Aadhaar Number</label>
                      <input
                        name="aadhaarNumber"
                        value={formData.aadhaarNumber}
                        onChange={handleChange}
                        type="text"
                        className="form-control-custom"
                        placeholder="XXXX-XXXX-XXXX"
                        required
                      />
                    </div>
                    <div className="col-md-6 mb-3">
                      <label className="form-label-custom">Annual Family Income</label>
                      <input
                        name="annualFamilyIncome"
                        value={formData.annualFamilyIncome}
                        onChange={handleChange}
                        type="number"
                        className="form-control-custom"
                        placeholder="In INR"
                        required
                      />
                    </div>
                    <div className="col-md-6 mb-3">
                      <label className="form-label-custom">Residential Area</label>
                      <select
                        name="residentialArea"
                        value={formData.residentialArea}
                        onChange={handleChange}
                        className="form-control-custom"
                        required
                      >
                        <option value="">-- Select Area --</option>
                        <option value="Urban">Urban</option>
                        <option value="Rural">Rural</option>
                        <option value="Semi-Urban">Semi-Urban</option>
                      </select>
                    </div>
                    <div className="col-md-6 mb-3">
                      <label className="form-label-custom">Upload User ID Proof</label>
                      <div className="file-input-container">
                        <input
                          name="idProof"
                          onChange={handleChange}
                          type="file"
                          className="file-input-custom"
                          accept="image/*,application/pdf"
                          required
                        />
                        <div className="file-upload-placeholder">
                          <i className="fas fa-upload me-2"></i>
                          Choose file
                        </div>
                      </div>
                    </div>
                    <div className="col-12 mb-3">
                      <label className="form-label-custom">Additional Notes</label>
                      <textarea
                        name="additionalNotes"
                        value={formData.additionalNotes}
                        onChange={handleChange}
                        className="form-control-custom"
                        rows="3"
                        placeholder="Any specific request or condition..."
                      />
                    </div>
                  </div>

                  {/* Employee Reference Section */}
                  <div className="row mb-4">
                    <div className="col-12">
                      <h5 className="section-title-with-icon">
                        <i className="fas fa-id-card me-2"></i>
                        Employee Reference
                      </h5>
                      <hr className="section-divider" />
                    </div>
                    
                    <div className="col-md-6 mb-3">
                      <label className="form-label-custom">Employee ID</label>
                      <input
                        name="employeeId"
                        value={formData.employeeId}
                        onChange={handleChange}
                        type="text"
                        className="form-control-custom"
                        placeholder="Enter your Employee ID"
                        required
                        readOnly
                      />
                    </div>
                    <div className="col-md-6 mb-3">
                      <label className="form-label-custom">Employee Name</label>
                      <input
                        name="employeeName"
                        value={formData.employeeName}
                        onChange={handleChange}
                        type="text"
                        className="form-control-custom"
                        placeholder="Enter your name"
                        required
                        readOnly
                      />
                    </div>
                    <div className="col-12 mb-3">
                      <label className="form-label-custom">Remarks for Admin</label>
                      <textarea
                        name="remarks"
                        value={formData.remarks}
                        onChange={handleChange}
                        className="form-control-custom"
                        rows="2"
                        placeholder="Any remarks for admin (optional)..."
                      />
                    </div>
                  </div>

                  <div className="text-center mt-4">
                    <button type="submit" className="btn-primary-custom px-5 py-2" disabled={loading}>
                      {loading ? (
                        <>
                          <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                          Submitting...
                        </>
                      ) : (
                        <>
                          <i className="fas fa-paper-plane me-2"></i>
                          Submit Application for User
                        </>
                      )}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .dashboard-container {
          background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
          min-height: 100vh;
          padding: 0;
        }

        .welcome-card {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          border-radius: 20px;
          margin-bottom: 2rem;
          overflow: hidden;
          position: relative;
          box-shadow: 0 20px 40px rgba(102, 126, 234, 0.3);
        }

        .welcome-overlay {
          padding: 2rem;
          position: relative;
          z-index: 2;
        }

        .welcome-content {
          color: white;
        }

        .greeting-badge {
          display: inline-block;
          background: rgba(255, 255, 255, 0.2);
          padding: 0.5rem 1rem;
          border-radius: 50px;
          font-size: 0.9rem;
          font-weight: 500;
          margin-bottom: 1rem;
          backdrop-filter: blur(10px);
        }

        .welcome-title {
          font-size: 2.2rem;
          font-weight: 700;
          margin-bottom: 0.5rem;
          background: linear-gradient(45deg, #ffffff, #f8f9ff);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .welcome-subtitle {
          font-size: 1.1rem;
          opacity: 0.9;
          margin-bottom: 0;
        }

        .service-icon-display {
          width: 100px;
          height: 100px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.2);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 3rem;
          backdrop-filter: blur(10px);
          border: 2px solid rgba(255, 255, 255, 0.3);
        }

        .service-card {
          background: white;
          border-radius: 16px;
          padding: 0;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
          border: none;
          transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
          position: relative;
          overflow: hidden;
          height: 100%;
        }

        .service-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: var(--gradient);
          opacity: 0.1;
          transition: all 0.3s ease;
        }

        .service-card:hover {
          transform: translateY(-8px) scale(1.02);
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
        }

        .card-content {
          padding: 1.5rem;
          position: relative;
          z-index: 2;
          height: 100%;
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .card-icon {
          text-align: center;
        }

        .icon-emoji {
          font-size: 2.5rem;
          display: block;
        }

        .card-info {
          flex-grow: 1;
        }

        .card-title {
          font-size: 1.2rem;
          font-weight: 600;
          color: #1f2937;
          margin-bottom: 1rem;
          text-align: center;
        }

        .card-description {
          color: #6b7280;
          font-size: 0.9rem;
          margin: 0;
          padding-left: 1rem;
        }

        .card-description li {
          margin-bottom: 0.5rem;
          line-height: 1.5;
        }

        .user-table-card {
          background: white;
          border-radius: 20px;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
          border: none;
          overflow: hidden;
        }

        .card-header-custom {
          padding: 1.5rem 1.5rem 0;
          margin-bottom: 1.5rem;
        }

        .header-title {
          font-size: 1.5rem;
          font-weight: 600;
          color: #1f2937;
          margin: 0;
        }

        .header-subtitle {
          color: #6b7280;
          font-size: 1rem;
          margin: 0.5rem 0 0;
        }

        .alert-custom {
          border-radius: 12px;
          border: none;
          padding: 1rem 1.5rem;
          margin-bottom: 1.5rem;
        }

        .alert-success {
          background: linear-gradient(135deg, #d1fae5, #a7f3d0);
          color: #065f46;
        }

        .alert-danger {
          background: linear-gradient(135deg, #fee2e2, #fecaca);
          color: #991b1b;
        }

        .section-title-with-icon {
          font-size: 1.2rem;
          font-weight: 600;
          color: #374151;
          display: flex;
          align-items: center;
        }

        .section-divider {
          border-color: #e5e7eb;
          opacity: 0.7;
        }

        .form-label-custom {
          font-weight: 600;
          color: #374151;
          margin-bottom: 0.5rem;
          display: block;
        }

        .form-control-custom {
          border-radius: 10px;
          padding: 0.75rem 1rem;
          border: 1px solid #d1d5db;
          transition: all 0.3s ease;
          width: 100%;
          font-size: 1rem;
        }

        .form-control-custom:focus {
          border-color: #3b82f6;
          box-shadow: 0 0 0 0.2rem rgba(59, 130, 246, 0.25);
          outline: none;
        }

        .form-control-custom[readonly] {
          background-color: #f9fafb;
          color: #6b7280;
        }

        textarea.form-control-custom {
          resize: vertical;
          min-height: 100px;
        }

        .file-input-container {
          position: relative;
        }

        .file-input-custom {
          opacity: 0;
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          cursor: pointer;
        }

        .file-upload-placeholder {
          background: #f9fafb;
          border: 1px dashed #d1d5db;
          border-radius: 10px;
          padding: 0.75rem 1rem;
          color: #6b7280;
          text-align: center;
          transition: all 0.3s ease;
        }

        .file-input-container:hover .file-upload-placeholder {
          border-color: #3b82f6;
          background: #f0f9ff;
        }

        .btn-primary-custom {
          background: linear-gradient(135deg, #3b82f6, #1d4ed8);
          border: none;
          border-radius: 50px;
          font-weight: 600;
          padding: 0.75rem 2rem;
          transition: all 0.3s ease;
          box-shadow: 0 4px 15px rgba(59, 130, 246, 0.4);
          color: white;
          font-size: 1.1rem;
        }

        .btn-primary-custom:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 8px 25px rgba(59, 130, 246, 0.5);
          background: linear-gradient(135deg, #2563eb, #1e40af);
        }

        .btn-primary-custom:disabled {
          opacity: 0.7;
          cursor: not-allowed;
        }

        .spinner-border-sm {
          width: 1rem;
          height: 1rem;
        }

        @media (max-width: 768px) {
          .welcome-title {
            font-size: 1.8rem;
          }
          
          .welcome-overlay {
            padding: 1.5rem;
          }
          
          .service-card {
            margin-bottom: 1rem;
          }
        }
      `}</style>
    </div>
  );
}