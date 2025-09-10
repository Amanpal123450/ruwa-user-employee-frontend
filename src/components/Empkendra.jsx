
import React, { useState, useEffect } from "react";
import { data, Link } from "react-router-dom";

const Empkendra = () => {
  const [formData, setFormData] = useState({
    name: "",
    aadhaar: "",
    phone: "",
    address: "",
    businessType: "",
    investmentCapacity: "",
    proposedLocation: "",
    franchiseCategory: "",
    category: "",
    relevantExperience: "",
    // forUserId: "", // Added for employee application
    idProof: null,
    qualificationCertificate: null,
    financialStatement: null,
  });

  const [errors, setErrors] = useState({});
  const [formSubmitted, setFormSubmitted] = useState(false);

  const [isLoading, setIsLoading] = useState(false);

  // Fetch users for employee to select from

  const franchiseInfo = [
    {
      icon: "🏥",
      title: "S1 Category Franchise",
      description: [
        "200 sq. ft facility space",
        "Basic healthcare services",
        "Ideal for rural areas",
        "Lower investment requirement",
      ],
      gradient: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    },
    {
      icon: "🏢",
      title: "S2 Category Franchise",
      description: [
        "400 sq. ft facility space",
        "Comprehensive healthcare services",
        "Semi-urban locations",
        "Moderate investment",
      ],
      gradient: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
    },
    {
      icon: "🏬",
      title: "S3 Category Franchise",
      description: [
        "600 sq. ft facility space",
        "Advanced healthcare services",
        "Urban locations",
        "Higher investment capacity",
      ],
      gradient: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
    },
    {
      icon: "💰",
      title: "Investment Benefits",
      description: [
        "Government subsidies available",
        "Training and support provided",
        "Brand recognition",
        "Proven business model",
      ],
      gradient: "linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)",
    },
  ];

  const validate = () => {
    const newErrors = {};
    if (!formData.name) newErrors.name = "Full Name is required";
    if (!formData.aadhaar) newErrors.aadhaar = "Enter Aadhaar Number";
    if (!formData.phone || !/^\d{10}$/.test(formData.phone))
      newErrors.phone = "10-digit phone number required";
    if (!formData.address) newErrors.address = "Address is required";
    if (!formData.businessType)
      newErrors.businessType = "Business type is required";
    if (!formData.investmentCapacity)
      newErrors.investmentCapacity = "Investment capacity is required";
    if (!formData.proposedLocation)
      newErrors.proposedLocation = "Location is required";
    if (!formData.category) newErrors.category = "Category is required";
    if (!formData.relevantExperience)
      newErrors.relevantExperience = "Relevant Experience is required";
    // if (!formData.forUserId)
    //   newErrors.forUserId = "Please select a user to apply for";
    if (!formData.idProof) newErrors.idProof = "ID Proof is required";
    if (!formData.qualificationCertificate)
      newErrors.qualificationCertificate =
        "Qualification Certificate is required";
    if (!formData.financialStatement)
      newErrors.financialStatement = "Financial Statement is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));

    // Auto-fill user details when user is selected
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validate()) {
      setIsLoading(true);
      try {
        const token = localStorage.getItem("token");

        const formDataToSend = new FormData();
        formDataToSend.append("name", formData.name);
        formDataToSend.append("aadhaar", formData.aadhaar);
        formDataToSend.append("phone", formData.phone);
        formDataToSend.append("address", formData.address);
        formDataToSend.append("businessType", formData.businessType);
        formDataToSend.append(
          "investmentCapacity",
          formData.investmentCapacity
        );
        formDataToSend.append("proposedLocation", formData.proposedLocation);
        formDataToSend.append("category", formData.category);
        formDataToSend.append("franchiseCategory", formData.category); // Using category for franchiseCategory as per backend
        formDataToSend.append(
          "relevantExperience",
          formData.relevantExperience
        );
        // formDataToSend.append("forUserId", formData.forUserId); // Required for employee application

        // Append files
        if (formData.idProof)
          formDataToSend.append("idProof", formData.idProof);
        if (formData.qualificationCertificate)
          formDataToSend.append(
            "qualificationCertificate",
            formData.qualificationCertificate
          );
        if (formData.financialStatement)
          formDataToSend.append(
            "financialStatement",
            formData.financialStatement
          );

        const res = await fetch(
          "https://ruwa-backend.onrender.com/api/services/apply-kendra/employee/apply",
          {
            method: "POST",
            headers: {
              Authorization: `Bearer ${token}`,
            },
            body: formDataToSend,
          }
        );

        const data = await res.json();
        
        if (res.ok) {
  setFormSubmitted(true);
  console.alert( "Application submitted successfully!");
  setTimeout(() => setFormSubmitted(false), 4000);

  // Reset form
  setFormData({
    name: "",
    aadhaar: "",
    phone: "",
    address: "",
    businessType: "",
    investmentCapacity: "",
    proposedLocation: "",
    category: "",
    franchiseCategory: "",
    relevantExperience: "",
    // forUserId: "",
    idProof: null,
    qualificationCertificate: null,
    financialStatement: null,
  });
  setErrors({});

  // 👇 Redirect to external URL
  // window.location.href = "https://razorpay.me/@nhsindia?amount=gtjkDOGv69g55ggcfywxBg%3D%3D";
}
 else {
          alert(data.message || "Something went wrong");
        }
      } catch (error) {
        console.error("Network error:", error);
        alert("Network error. Please try again.");
      } finally {
        setIsLoading(false);
        
      }
    }
  };

  return (
    <>
      
      
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
                          Employee Portal - Franchise Application 👋
                        </div>
                        <h1 className="welcome-title">
                          Jan Arogya Kendra Franchise
                        </h1>
                        <p className="welcome-subtitle">
                          Apply for Jan Arogya Kendra franchise on behalf of
                          users
                        </p>
                      </div>
                    </div>
                    <div className="col-lg-4 col-md-5 text-center">
                      <div className="profile-section">
                        <div className="profile-image-container">
                          <div className="service-icon-display">
                            <span className="icon-emoji">🏥</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Franchise Info Cards */}
              <div className="row mb-5">
                {franchiseInfo.map((info, index) => (
                  <div className="col-12 col-md-6 col-lg-3 mb-4" key={index}>
                    <div
                      className="service-card"
                      style={{ "--gradient": info.gradient }}
                    >
                      <div className="card-background"></div>
                      <div className="card-content">
                        <div className="card-icon">
                          <span className="icon-emoji">{info.icon}</span>
                        </div>
                        <div className="card-info">
                          <h4 className="card-title">{info.title}</h4>
                          <ul className="card-description">
                            {info.description.map((point, i) => (
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
                  <h3 className="header-title">Franchise Application Form</h3>
                  <p className="header-subtitle">
                    Apply on behalf of users for Jan Arogya Kendra franchise
                  </p>
                </div>

                <div className="card-body">
                  {formSubmitted && (
                    <div
                      className="alert alert-success alert-custom"
                      role="alert"
                    >
                      <i className="fas fa-check-circle me-2"></i>
                      Application submitted successfully!
                    </div>
                  )}

                  <form onSubmit={handleSubmit} noValidate>
                    {/* User Selection */}
                    {/* <div className="row g-3 mb-4">
                      <div className="col-md-12">
                        <label className="form-label form-label-custom">
                          Enter User ID *
                        </label>
                        <input
                          name="forUserId"
                          value={formData.forUserId}
                          onChange={handleChange}
                          type="text"
                          className={`form-control form-control-custom ${
                            errors.forUserId ? "is-invalid" : ""
                          }`}
                        ></input>
                        {errors.forUserId && (
                          <div className="invalid-feedback">
                            {errors.forUserId}
                          </div>
                        )}
                      </div>
                    </div> */}

                    <div className="row g-3 mb-4">
                      <div className="col-md-6">
                        <label className="form-label form-label-custom">
                          Full Name
                        </label>
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          className={`form-control form-control-custom ${
                            errors.name ? "is-invalid" : ""
                          }`}
                          placeholder="Enter full name"
                        />
                        {errors.name && (
                          <div className="invalid-feedback">{errors.name}</div>
                        )}
                      </div>

                      <div className="col-md-6">
                        <label className="form-label form-label-custom">
                          aadhaar
                        </label>
                        <input
                          type="text"
                          name="aadhaar"
                          value={formData.aadhaar}
                          onChange={handleChange}
                          className={`form-control form-control-custom ${
                            errors.aadhaar ? "is-invalid" : ""
                          }`}
                          placeholder="Enter aadhaar address"
                        />
                        {errors.aadhaar && (
                          <div className="invalid-feedback">
                            {errors.aadhaar}
                          </div>
                        )}
                      </div>

                      <div className="col-md-6">
                        <label className="form-label form-label-custom">
                          Phone
                        </label>
                        <input
                          type="text"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          className={`form-control form-control-custom ${
                            errors.phone ? "is-invalid" : ""
                          }`}
                          placeholder="Enter 10-digit phone number"
                        />
                        {errors.phone && (
                          <div className="invalid-feedback">{errors.phone}</div>
                        )}
                      </div>

                      <div className="col-md-6">
                        <label className="form-label form-label-custom">
                          Address
                        </label>
                        <input
                          type="text"
                          name="address"
                          value={formData.address}
                          onChange={handleChange}
                          className={`form-control form-control-custom ${
                            errors.address ? "is-invalid" : ""
                          }`}
                          placeholder="Enter complete address"
                        />
                        {errors.address && (
                          <div className="invalid-feedback">
                            {errors.address}
                          </div>
                        )}
                      </div>

                      <div className="col-md-6">
                        <label className="form-label form-label-custom">
                          Business Type
                        </label>
                        <input
                          type="text"
                          name="businessType"
                          value={formData.businessType}
                          onChange={handleChange}
                          className={`form-control form-control-custom ${
                            errors.businessType ? "is-invalid" : ""
                          }`}
                          placeholder="e.g., Individual, Partnership, Company"
                        />
                        {errors.businessType && (
                          <div className="invalid-feedback">
                            {errors.businessType}
                          </div>
                        )}
                      </div>

                      <div className="col-md-6">
                        <label className="form-label form-label-custom">
                          Investment Capacity (₹)
                        </label>
                        <input
                          type="text"
                          name="investmentCapacity"
                          value={formData.investmentCapacity}
                          onChange={handleChange}
                          className={`form-control form-control-custom ${
                            errors.investmentCapacity ? "is-invalid" : ""
                          }`}
                          placeholder="e.g., 5,00,000 - 10,00,000"
                        />
                        {errors.investmentCapacity && (
                          <div className="invalid-feedback">
                            {errors.investmentCapacity}
                          </div>
                        )}
                      </div>

                      <div className="col-md-6">
                        <label className="form-label form-label-custom">
                          Proposed Location
                        </label>
                        <input
                          type="text"
                          name="proposedLocation"
                          value={formData.proposedLocation}
                          onChange={handleChange}
                          className={`form-control form-control-custom ${
                            errors.proposedLocation ? "is-invalid" : ""
                          }`}
                          placeholder="City, State, Area"
                        />
                        {errors.proposedLocation && (
                          <div className="invalid-feedback">
                            {errors.proposedLocation}
                          </div>
                        )}
                      </div>

                      <div className="col-md-6">
                        <label className="form-label form-label-custom">
                          Franchise Category
                        </label>
                        <select
                          name="category"
                          value={formData.category}
                          onChange={handleChange}
                          className={`form-control form-control-custom ${
                            errors.category ? "is-invalid" : ""
                          }`}
                        >
                          <option value="">Select Category</option>
                          <option value="S1">S1 (200 sq. ft)</option>
                          <option value="S2">S2 (400 sq. ft)</option>
                          <option value="S3">S3 (600 sq. ft)</option>
                        </select>
                        {errors.category && (
                          <div className="invalid-feedback">
                            {errors.category}
                          </div>
                        )}
                      </div>

                      <div className="col-md-12">
                        <label className="form-label form-label-custom">
                          Relevant Experience
                        </label>
                        <textarea
                          rows={3}
                          name="relevantExperience"
                          value={formData.relevantExperience}
                          onChange={handleChange}
                          className={`form-control form-control-custom ${
                            errors.relevantExperience ? "is-invalid" : ""
                          }`}
                          placeholder="Describe relevant experience in healthcare or business"
                        />
                        {errors.relevantExperience && (
                          <div className="invalid-feedback">
                            {errors.relevantExperience}
                          </div>
                        )}
                      </div>
                    </div>

                    <h5 className="section-subtitle mb-3">
                      Required Documents
                    </h5>

                    <div className="row g-3 mb-4">
                      <div className="col-md-4">
                        <div className="file-upload-card">
                          <label className="form-label form-label-custom">
                            ID Proof *
                          </label>
                          <div className="file-input-container">
                            <input
                              type="file"
                              name="idProof"
                              onChange={handleChange}
                              className={`file-input-custom ${
                                errors.idProof ? "is-invalid" : ""
                              }`}
                              accept=".pdf,.jpg,.jpeg,.png"
                              required
                            />
                            <div className="file-upload-placeholder">
                              <i className="fas fa-id-card me-2"></i>
                              {formData.idProof
                                ? formData.idProof.name
                                : "Upload ID Proof"}
                            </div>
                          </div>
                          {errors.idProof && (
                            <div className="invalid-feedback d-block">
                              {errors.idProof}
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="col-md-4">
                        <div className="file-upload-card">
                          <label className="form-label form-label-custom">
                            Qualification Certificate *
                          </label>
                          <div className="file-input-container">
                            <input
                              type="file"
                              name="qualificationCertificate"
                              onChange={handleChange}
                              className={`file-input-custom ${
                                errors.qualificationCertificate
                                  ? "is-invalid"
                                  : ""
                              }`}
                              accept=".pdf,.jpg,.jpeg,.png"
                              required
                            />
                            <div className="file-upload-placeholder">
                              <i className="fas fa-graduation-cap me-2"></i>
                              {formData.qualificationCertificate
                                ? formData.qualificationCertificate.name
                                : "Upload Certificate"}
                            </div>
                          </div>
                          {errors.qualificationCertificate && (
                            <div className="invalid-feedback d-block">
                              {errors.qualificationCertificate}
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="col-md-4">
                        <div className="file-upload-card">
                          <label className="form-label form-label-custom">
                            Financial Statement *
                          </label>
                          <div className="file-input-container">
                            <input
                              type="file"
                              name="financialStatement"
                              onChange={handleChange}
                              className={`file-input-custom ${
                                errors.financialStatement ? "is-invalid" : ""
                              }`}
                              accept=".pdf,.jpg,.jpeg,.png"
                              required
                            />
                            <div className="file-upload-placeholder">
                              <i className="fas fa-file-invoice-dollar me-2"></i>
                              {formData.financialStatement
                                ? formData.financialStatement.name
                                : "Upload Statement"}
                            </div>
                          </div>
                          {errors.financialStatement && (
                            <div className="invalid-feedback d-block">
                              {errors.financialStatement}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
  
                      <div className="text-center mt-4">
                        <button
                          type="submit"
                          className="btn btn-primary-custom px-5 py-2"
                          disabled={isLoading}
                        >
                          <i
                            className={`fas ${
                              isLoading
                                ? "fa-spinner fa-spin"
                                : "fa-paper-plane"
                            } me-2`}
                          ></i>
      
                          {isLoading
                            ? "Submitting..."
                            : "Pay To Submit Application"}
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
            content: "";
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
            background: linear-gradient(135deg, #d1fae5, #a7f3d0);
            color: #065f46;
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

          .section-subtitle {
            font-size: 1.1rem;
            font-weight: 600;
            color: #374151;
            margin-bottom: 1rem;
            padding-bottom: 0.5rem;
            border-bottom: 2px solid #e5e7eb;
          }

          .file-upload-card {
            background: #f9fafb;
            border-radius: 12px;
            padding: 1rem;
            border: 1px dashed #d1d5db;
            transition: all 0.3s ease;
            height: 100%;
          }

          .file-upload-card:hover {
            border-color: #3b82f6;
            background: #f0f9ff;
          }

          .file-input-container {
            position: relative;
            height: 100%;
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
            background: white;
            border: 1px solid #d1d5db;
            border-radius: 8px;
            padding: 0.75rem;
            color: #6b7280;
            text-align: center;
            display: block;
            transition: all 0.3s ease;
            word-break: break-word;
          }

          .file-input-container:hover .file-upload-placeholder {
            border-color: #3b82f6;
            color: #3b82f6;
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
            transform: none;
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
    </>
  );
};

export default Empkendra;
