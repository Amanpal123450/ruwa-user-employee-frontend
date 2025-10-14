import React, { useState } from "react";

const Empkendra = () => {
  const [adhaar,setAadhar]=useState("")
  const [formData, setFormData] = useState({
    // Personal Details
    title: "",
    name: "",
    address: "",
    phone: "",
    email: "",
    dob: "",
    gender: "",
    married: "",
    
    // Educational Qualifications
    educationalQualifications: [{ qualification: "", year: "", institution: "" }],
    
    // Current Occupation
    currentOccupation: "",
    currentEmployer: "",
    designation: "",
    previousWorkExperience: [{ period: "", organization: "", designation: "", responsibilities: "" }],
    businessDetails: [{ 
      companyName: "", businessType: "", nature: "", products: "", 
      years: "", employees: "", turnover: "" 
    }],
    
    // Professional Background
    professionalBackground: [],
    professionalAssociations: "",
    
    // Proposed Centre
    businessStructure: "",
    existingEntity: "",
    existingEntityName: "",
    proposedCity: "",
    proposedState: "",
    setupTimeline: "",
    sitePossession: "",
    siteDetails: {
      agreementType: "",
      leaseFrom: "",
      leaseTo: "",
      area: "",
      locationType: "",
      address: ""
    },
    siteInMind: "",
    planToRent: "",
    withinMonths: "",
    investmentRange: "",
    effortsInitiatives: "",
    reasonsForPartnership: "",
    
    // Existing fields
    aadhaar: "",
    category: "",
    relevantExperience: "",
    idProof: null,
    qualificationCertificate: null,
    financialStatement: null,
  });

  const [errors, setErrors] = useState({});
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);


   const [paymentData, setPaymentData] = useState({
      paymentId: "",
      paymentScreenshot: null,
    });
  
    // const [errors, setErrors] = useState({});
    const [paymentErrors, setPaymentErrors] = useState({});
    // const [formSubmitted, setFormSubmitted] = useState(false);
    const [showPaymentForm, setShowPaymentForm] = useState(false);
    const [applicationId, setApplicationId] = useState(null);
  
    // const [isLoading, setIsLoading] = useState(false);
    const [isPaymentLoading, setIsPaymentLoading] = useState(false);

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

  const professionalBackgroundOptions = [
    "Marketing/Sales",
    "Health Care",
    "Education/Training",
    "Profit Center Management",
    "Small Business Mgmt.",
    "Other"
  ];

  const validate = () => {
    const newErrors = {};
    if (!formData.name) newErrors.name = "Full Name is required";
    if (!formData.aadhaar) newErrors.aadhaar = "Enter Aadhaar Number";
    if (!formData.phone || !/^\d{10}$/.test(formData.phone))
      newErrors.phone = "10-digit phone number required";
    if (!formData.address) newErrors.address = "Address is required";
    if (!formData.businessStructure)
      newErrors.businessStructure = "Business structure is required";
    if (!formData.investmentRange)
      newErrors.investmentRange = "Investment range is required";
    if (!formData.proposedCity)
      newErrors.proposedCity = "City is required";
    if (!formData.proposedState)
      newErrors.proposedState = "State is required";
    if (!formData.category) newErrors.category = "Category is required";
    if (!formData.relevantExperience)
      newErrors.relevantExperience = "Relevant Experience is required";
    if (!formData.idProof) newErrors.idProof = "ID Proof is required";
    if (!formData.qualificationCertificate)
      newErrors.qualificationCertificate = "Qualification Certificate is required";
    if (!formData.financialStatement)
      newErrors.financialStatement = "Financial Statement is required";
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    if(name=="aadhaar"){
      setAadhar(e.target.value)
    }
    if (type === "checkbox") {
      if (name === "professionalBackground") {
        setFormData(prev => {
          const updatedBackground = checked
            ? [...prev.professionalBackground, value]
            : prev.professionalBackground.filter(item => item !== value);
          return { ...prev, professionalBackground: updatedBackground };
        });
      }
    } else if (type === "file") {
      setFormData(prev => ({
        ...prev,
        [name]: files[0]
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleNestedChange = (section, field, value) => {
    setFormData(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value
      }
    }));
  };

  const handleTableChange = (index, field, value, tableName) => {
    setFormData(prev => {
      const updatedTable = [...prev[tableName]];
      updatedTable[index] = {
        ...updatedTable[index],
        [field]: value
      };
      return { ...prev, [tableName]: updatedTable };
    });
  };

  const addTableRow = (tableName, defaultRow) => {
    setFormData(prev => ({
      ...prev,
      [tableName]: [...prev[tableName], { ...defaultRow }]
    }));
  };

  const removeTableRow = (index, tableName) => {
    if (formData[tableName].length > 1) {
      setFormData(prev => ({
        ...prev,
        [tableName]: prev[tableName].filter((_, i) => i !== index)
      }));
    }
  };

  const handleSubmit = async (e) => {
  e.preventDefault();
  if (validate()) {
    setIsLoading(true);
    try {
      const token = localStorage.getItem("token");
      const formDataToSend = new FormData();

      // Generate required fields
      const applicationId = "FRN" + Date.now().toString().slice(-8);
      const enrollmentNo = Math.random().toString().slice(2, 12);
      const submissionDate = new Date().toLocaleDateString("en-IN", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      });

      // ✅ Append required fields
      formDataToSend.append("applicationId", applicationId);
      formDataToSend.append("enrollmentNo", enrollmentNo);
      formDataToSend.append("submissionDate", submissionDate);

      // Append all other form data
      Object.keys(formData).forEach((key) => {
        if (
          key === "educationalQualifications" ||
          key === "previousWorkExperience" ||
          key === "businessDetails" ||
          key === "professionalBackground" ||
          key === "siteDetails"
        ) {
          formDataToSend.append(key, JSON.stringify(formData[key]));
        } else if (formData[key] !== null && formData[key] !== undefined) {
          formDataToSend.append(key, formData[key]);
        }
      });

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
        setApplicationId(data.applicationId || applicationId);
        alert("Application submitted successfully! Please proceed to payment.");
        setShowPaymentForm(true);
        setTimeout(() => setFormSubmitted(false), 4000);

        // Reset form
        setFormData({
          title: "",
          name: "",
          address: "",
          phone: "",
          email: "",
          dob: "",
          gender: "",
          married: "",
          educationalQualifications: [{ qualification: "", year: "", institution: "" }],
          currentOccupation: "",
          currentEmployer: "",
          designation: "",
          previousWorkExperience: [{ period: "", organization: "", designation: "", responsibilities: "" }],
          businessDetails: [{ companyName: "", businessType: "", nature: "", products: "", years: "", employees: "", turnover: "" }],
          professionalBackground: [],
          professionalAssociations: "",
          businessStructure: "",
          existingEntity: "",
          existingEntityName: "",
          proposedCity: "",
          proposedState: "",
          setupTimeline: "",
          sitePossession: "",
          siteDetails: {
            agreementType: "",
            leaseFrom: "",
            leaseTo: "",
            area: "",
            locationType: "",
            address: "",
          },
          siteInMind: "",
          planToRent: "",
          withinMonths: "",
          investmentRange: "",
          effortsInitiatives: "",
          reasonsForPartnership: "",
          category: "",
          relevantExperience: "",
          idProof: null,
          qualificationCertificate: null,
          financialStatement: null,
        });

        setErrors({});
      } else {
        alert(data.message || "Something went wrong");
        console.error("Server Error:", data.error);
      }
    } catch (error) {
      console.error("Network error:", error);
      alert("Network error. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }
};



   const handlePaymentSubmit = async (e) => {
    e.preventDefault();
    if (validatePayment()) {
      setIsPaymentLoading(true);
      try {
        const token = localStorage.getItem("token");
        
        const paymentFormData = new FormData();
        paymentFormData.append("aadhaar", adhaar);
        paymentFormData.append("paymentId", paymentData.paymentId);
        paymentFormData.append("paymentScreenshot", paymentData.paymentScreenshot);

        // Replace with your actual payment verification endpoint
        const res = await fetch(
          "https://ruwa-backend.onrender.com/api/services/apply-kendra/verify-payment",
          {
            method: "POST",
            headers: {
              Authorization: `Bearer ${token}`,
            },
            body: paymentFormData,
          }
        );

        const data = await res.json();
        
        if (res.ok) {
          alert("Payment verified successfully! Your application is now complete.");
          
          // Reset both forms
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
            idProof: null,
            qualificationCertificate: null,
            financialStatement: null,
          });
          setPaymentData({
            paymentId: "",
            paymentScreenshot: null,
          });
          setErrors({});
          setPaymentErrors({});
          setShowPaymentForm(false);
          setApplicationId(null);
        } else {
          alert(data.message || "Payment verification failed");
        }
      } catch (error) {
        console.error("Network error:", error);
        alert("Network error. Please try again.");
      } finally {
        setIsPaymentLoading(false);
      }
    }
  };

  const handleBackToForm = () => {
    setShowPaymentForm(false);
    setPaymentData({
      paymentId: "",
      paymentScreenshot: null,
      adhaar: ""
    });
    setPaymentErrors({});
  };

   const validatePayment = () => {
    const newErrors = {};
    if (!paymentData.paymentId.trim()) 
      newErrors.paymentId = "Payment ID is required";
    if (!paymentData.paymentScreenshot) 
      newErrors.paymentScreenshot = "Payment screenshot is required";
    setPaymentErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

   const handlePaymentChange = (e) => {
    const { name, value, files } = e.target;
    setPaymentData((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
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
                {/* {franchiseInfo.map((info, index) => (
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
                ))} */}
              </div>

              {/* Application Form */}
            

               {!showPaymentForm && (
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
              )}

              {/* Payment Form */}
              {showPaymentForm ? (
                <div className="card user-table-card">
                  <div className="card-header-custom">
                    <div className="d-flex justify-content-between align-items-center">
                      <div>
                        <h3 className="header-title">Payment Verification</h3>
                        <p className="header-subtitle">
                          Please provide payment details to complete your application
                        </p>
                        <div className="application-id-badge">
                          Application ID: {applicationId}
                        </div>
                      </div>
                      <button
                        onClick={handleBackToForm}
                        className="btn btn-outline-secondary"
                      >
                        <i className="fas fa-arrow-left me-2"></i>
                        Back to Form
                      </button>
                    </div>
                  </div>

                  <div className="card-body">
                    <div className="payment-info-card mb-4">
                      <div className="row align-items-center">
                        <div className="col-md-8">
                          <h5 className="mb-2">
                            <i className="fas fa-info-circle text-primary me-2"></i>
                            Payment Instructions
                          </h5>
                          <p className="mb-2">
                            1. Complete the payment using the Razorpay link (opened in new tab)
                          </p>
                          <p className="mb-2">
                            2. Take a screenshot of the payment confirmation
                          </p>
                          <p className="mb-0">
                            3. Enter the Payment ID and upload the screenshot below
                          </p>
                        </div>
                        <div className="col-md-4 text-center">
                          <a
                            href="https://razorpay.me/@nhsindia?amount=gtjkDOGv69g55ggcfywxBg%3D%3D"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn btn-success"
                          >
                            <i className="fas fa-external-link-alt me-2"></i>
                            Open Payment Page
                          </a>
                        </div>
                      </div>
                    </div>

                    <form onSubmit={handlePaymentSubmit} noValidate>
                      <div className="row g-3 mb-4">
                        <div className="col-md-6">
                          <label className="form-label form-label-custom">
                            Payment ID *
                          </label>
                          <input
                            type="text"
                            name="paymentId"
                            value={paymentData.paymentId}
                            onChange={handlePaymentChange}
                            className={`form-control form-control-custom ${
                              paymentErrors.paymentId ? "is-invalid" : ""
                            }`}
                            placeholder="Enter payment transaction ID"
                          />
                          {paymentErrors.paymentId && (
                            <div className="invalid-feedback">
                              {paymentErrors.paymentId}
                            </div>
                          )}
                        </div>

                        <div className="col-md-6">
                          <div className="file-upload-card">
                            <label className="form-label form-label-custom">
                              Payment Screenshot *
                            </label>
                            <div className="file-input-container">
                              <input
                                type="file"
                                name="paymentScreenshot"
                                onChange={handlePaymentChange}
                                className={`file-input-custom ${
                                  paymentErrors.paymentScreenshot ? "is-invalid" : ""
                                }`}
                                accept=".pdf,.jpg,.jpeg,.png"
                                required
                              />
                              <div className="file-upload-placeholder">
                                <i className="fas fa-camera me-2"></i>
                                {paymentData.paymentScreenshot
                                  ? paymentData.paymentScreenshot.name
                                  : "Upload Payment Screenshot"}
                              </div>
                            </div>
                            {paymentErrors.paymentScreenshot && (
                              <div className="invalid-feedback d-block">
                                {paymentErrors.paymentScreenshot}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>

                      <div className="text-center mt-4">
                        <button
                          type="submit"
                          className="btn btn-success-custom px-5 py-2 me-3"
                          disabled={isPaymentLoading}
                        >
                          <i
                            className={`fas ${
                              isPaymentLoading
                                ? "fa-spinner fa-spin"
                                : "fa-check-circle"
                            } me-2`}
                          ></i>
                          {isPaymentLoading
                            ? "Verifying Payment..."
                            : "Verify Payment & Complete Application"}
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              ) : (
                /* Application Form */
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
                    <h5 className="section-subtitle mb-3">Personal Details</h5>
                    <div className="row g-3 mb-4">
                      <div className="col-md-3">
                        <label className="form-label form-label-custom">
                          Title *
                        </label>
                        <select
                          name="title"
                          value={formData.title}
                          onChange={handleChange}
                          className={`form-control form-control-custom ${errors.title ? "is-invalid" : ""}`}
                        >
                          <option value="">Select Title</option>
                          <option value="Dr">Dr</option>
                          <option value="Mr">Mr</option>
                          <option value="Miss">Miss</option>
                          <option value="Ms">Ms</option>
                        </select>
                        {errors.title && (
                          <div className="invalid-feedback">{errors.title}</div>
                        )}
                      </div>

                      <div className="col-md-9">
                        <label className="form-label form-label-custom">
                          Full Name *
                        </label>
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          className={`form-control form-control-custom ${errors.name ? "is-invalid" : ""}`}
                          placeholder="Enter full name"
                        />
                        {errors.name && (
                          <div className="invalid-feedback">{errors.name}</div>
                        )}
                      </div>

                      <div className="col-md-6">
                        <label className="form-label form-label-custom">
                          Aadhaar Number *
                        </label>
                        <input
                          type="text"
                          name="aadhaar"
                          value={formData.aadhaar}
                          onChange={handleChange}
                          className={`form-control form-control-custom ${errors.aadhaar ? "is-invalid" : ""}`}
                          placeholder="Enter Aadhaar number"
                        />
                        {errors.aadhaar && (
                          <div className="invalid-feedback">{errors.aadhaar}</div>
                        )}
                      </div>

                      <div className="col-md-6">
                        <label className="form-label form-label-custom">
                          Phone *
                        </label>
                        <input
                          type="text"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          className={`form-control form-control-custom ${errors.phone ? "is-invalid" : ""}`}
                          placeholder="Enter 10-digit phone number"
                        />
                        {errors.phone && (
                          <div className="invalid-feedback">{errors.phone}</div>
                        )}
                      </div>

                      <div className="col-md-12">
                        <label className="form-label form-label-custom">
                          Address *
                        </label>
                        <input
                          type="text"
                          name="address"
                          value={formData.address}
                          onChange={handleChange}
                          className={`form-control form-control-custom ${errors.address ? "is-invalid" : ""}`}
                          placeholder="Enter complete address"
                        />
                        {errors.address && (
                          <div className="invalid-feedback">{errors.address}</div>
                        )}
                      </div>

                      <div className="col-md-6">
                        <label className="form-label form-label-custom">
                          Email
                        </label>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          className="form-control form-control-custom"
                          placeholder="Enter email address"
                        />
                      </div>

                      <div className="col-md-6">
                        <label className="form-label form-label-custom">
                          Date of Birth
                        </label>
                        <input
                          type="date"
                          name="dob"
                          value={formData.dob}
                          onChange={handleChange}
                          className="form-control form-control-custom"
                        />
                      </div>

                      <div className="col-md-6">
                        <label className="form-label form-label-custom">
                          Gender
                        </label>
                        <div className="d-flex gap-3">
                          <div className="form-check">
                            <input
                              className="form-check-input"
                              type="radio"
                              name="gender"
                              id="genderMale"
                              value="M"
                              checked={formData.gender === "M"}
                              onChange={handleChange}
                            />
                            <label className="form-check-label" htmlFor="genderMale">
                              Male
                            </label>
                          </div>
                          <div className="form-check">
                            <input
                              className="form-check-input"
                              type="radio"
                              name="gender"
                              id="genderFemale"
                              value="F"
                              checked={formData.gender === "F"}
                              onChange={handleChange}
                            />
                            <label className="form-check-label" htmlFor="genderFemale">
                              Female
                            </label>
                          </div>
                        </div>
                      </div>

                      <div className="col-md-6">
                        <label className="form-label form-label-custom">
                          Married
                        </label>
                        <div className="d-flex gap-3">
                          <div className="form-check">
                            <input
                              className="form-check-input"
                              type="radio"
                              name="married"
                              id="marriedYes"
                              value="Y"
                              checked={formData.married === "Y"}
                              onChange={handleChange}
                            />
                            <label className="form-check-label" htmlFor="marriedYes">
                              Yes
                            </label>
                          </div>
                          <div className="form-check">
                            <input
                              className="form-check-input"
                              type="radio"
                              name="married"
                              id="marriedNo"
                              value="N"
                              checked={formData.married === "N"}
                              onChange={handleChange}
                            />
                            <label className="form-check-label" htmlFor="marriedNo">
                              No
                            </label>
                          </div>
                        </div>
                      </div>
                    </div>

                    <h5 className="section-subtitle mb-3">Educational Qualifications</h5>
                    <div className="row mb-4">
                      <div className="col-12">
                        <div className="table-responsive">
                          <table className="table table-bordered">
                            <thead>
                              <tr>
                                <th>Qualification</th>
                                <th>Year of Passing</th>
                                <th>Name of Institution</th>
                                <th width="100">Action</th>
                              </tr>
                            </thead>
                            <tbody>
                              {(formData?.educationalQualifications || []).map((qual, index) => (
                                <tr key={index}>
                                  <td>
                                    <input
                                      type="text"
                                      className="form-control"
                                      value={qual.qualification}
                                      onChange={(e) => handleTableChange(index, 'qualification', e.target.value, 'educationalQualifications')}
                                      placeholder="Degree/Diploma"
                                    />
                                  </td>
                                  <td>
                                    <input
                                      type="text"
                                      className="form-control"
                                      value={qual.year}
                                      onChange={(e) => handleTableChange(index, 'year', e.target.value, 'educationalQualifications')}
                                      placeholder="Year"
                                    />
                                  </td>
                                  <td>
                                    <input
                                      type="text"
                                      className="form-control"
                                      value={qual.institution}
                                      onChange={(e) => handleTableChange(index, 'institution', e.target.value, 'educationalQualifications')}
                                      placeholder="Institution name"
                                    />
                                  </td>
                                  <td className="text-center">
                                    <button
                                      type="button"
                                      className="btn btn-sm btn-danger"
                                      onClick={() => removeTableRow(index, 'educationalQualifications')}
                                    >
                                      <i className="fas fa-times"></i>
                                    </button>
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                        <button
                          type="button"
                          className="btn btn-secondary btn-sm"
                          onClick={() => addTableRow('educationalQualifications', { qualification: "", year: "", institution: "" })}
                        >
                          <i className="fas fa-plus me-1"></i> Add Qualification
                        </button>
                      </div>
                    </div>

                    <h5 className="section-subtitle mb-3">Current Occupation</h5>
                    <div className="row g-3 mb-4">
                      <div className="col-md-12">
                        <label className="form-label form-label-custom">
                          Current Occupation *
                        </label>
                        <div className="d-flex gap-4">
                          <div className="form-check">
                            <input
                              className="form-check-input"
                              type="radio"
                              name="currentOccupation"
                              id="occupationService"
                              value="Service"
                              checked={formData.currentOccupation === "Service"}
                              onChange={handleChange}
                            />
                            <label className="form-check-label" htmlFor="occupationService">
                              Service
                            </label>
                          </div>
                          <div className="form-check">
                            <input
                              className="form-check-input"
                              type="radio"
                              name="currentOccupation"
                              id="occupationBusiness"
                              value="Business"
                              checked={formData.currentOccupation === "Business"}
                              onChange={handleChange}
                            />
                            <label className="form-check-label" htmlFor="occupationBusiness">
                              Business
                            </label>
                          </div>
                          <div className="form-check">
                            <input
                              className="form-check-input"
                              type="radio"
                              name="currentOccupation"
                              id="occupationBoth"
                              value="Both"
                              checked={formData.currentOccupation === "Both"}
                              onChange={handleChange}
                            />
                            <label className="form-check-label" htmlFor="occupationBoth">
                              Both
                            </label>
                          </div>
                        </div>
                      </div>

                      {(formData.currentOccupation === "Service" || formData.currentOccupation === "Both") && (
                        <>
                          <div className="col-md-6">
                            <label className="form-label form-label-custom">
                              Current Employer
                            </label>
                            <input
                              type="text"
                              name="currentEmployer"
                              value={formData.currentEmployer}
                              onChange={handleChange}
                              className="form-control form-control-custom"
                              placeholder="Name of current employer"
                            />
                          </div>

                          <div className="col-md-6">
                            <label className="form-label form-label-custom">
                              Designation
                            </label>
                            <input
                              type="text"
                              name="designation"
                              value={formData.designation}
                              onChange={handleChange}
                              className="form-control form-control-custom"
                              placeholder="Current designation"
                            />
                          </div>

                          <div className="col-12">
                            <h6 className="mt-4 mb-3">Previous Work Experience</h6>
                            <div className="table-responsive">
                              <table className="table table-bordered">
                                <thead>
                                  <tr>
                                    <th>Period</th>
                                    <th>Organization Name</th>
                                    <th>Designation</th>
                                    <th>Responsibilities</th>
                                    <th width="100">Action</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {(formData?.previousWorkExperience || []).map((exp, index) => (
                                    <tr key={index}>
                                      <td>
                                        <input
                                          type="text"
                                          className="form-control"
                                          value={exp.period}
                                          onChange={(e) => handleTableChange(index, 'period', e.target.value, 'previousWorkExperience')}
                                          placeholder="Duration"
                                        />
                                      </td>
                                      <td>
                                        <input
                                          type="text"
                                          className="form-control"
                                          value={exp.organization}
                                          onChange={(e) => handleTableChange(index, 'organization', e.target.value, 'previousWorkExperience')}
                                          placeholder="Organization name"
                                        />
                                      </td>
                                      <td>
                                        <input
                                          type="text"
                                          className="form-control"
                                          value={exp.designation}
                                          onChange={(e) => handleTableChange(index, 'designation', e.target.value, 'previousWorkExperience')}
                                          placeholder="Designation"
                                        />
                                      </td>
                                      <td>
                                        <input
                                          type="text"
                                          className="form-control"
                                          value={exp.responsibilities}
                                          onChange={(e) => handleTableChange(index, 'responsibilities', e.target.value, 'previousWorkExperience')}
                                          placeholder="Responsibilities"
                                        />
                                      </td>
                                      <td className="text-center">
                                        <button
                                          type="button"
                                          className="btn btn-sm btn-danger"
                                          onClick={() => removeTableRow(index, 'previousWorkExperience')}
                                        >
                                          <i className="fas fa-times"></i>
                                        </button>
                                      </td>
                                    </tr>
                                  ))}
                                </tbody>
                              </table>
                            </div>
                            <button
                              type="button"
                              className="btn btn-secondary btn-sm"
                              onClick={() => addTableRow('previousWorkExperience', { period: "", organization: "", designation: "", responsibilities: "" })}
                            >
                              <i className="fas fa-plus me-1"></i> Add Experience
                            </button>
                          </div>
                        </>
                      )}

                      {(formData.currentOccupation === "Business" || formData.currentOccupation === "Both") && (
                        <div className="col-12">
                          <h6 className="mt-4 mb-3">Business Details</h6>
                          <div className="table-responsive">
                            <table className="table table-bordered">
                              <thead>
                                <tr>
                                  <th>Company Name</th>
                                  <th>Business Type</th>
                                  <th>Nature of Business</th>
                                  <th>Products/Services</th>
                                  <th>Years in Business</th>
                                  <th>Employees</th>
                                  <th>Turnover (Last 3 Years)</th>
                                  <th width="100">Action</th>
                                </tr>
                              </thead>
                              <tbody>
                               {(formData?.businessDetails || []).map((business, index) => (
                                  <tr key={index}>
                                    <td>
                                      <input
                                        type="text"
                                        className="form-control"
                                        value={business.companyName}
                                        onChange={(e) => handleTableChange(index, 'companyName', e.target.value, 'businessDetails')}
                                        placeholder="Company name"
                                      />
                                    </td>
                                    <td>
                                      <input
                                        type="text"
                                        className="form-control"
                                        value={business.businessType}
                                        onChange={(e) => handleTableChange(index, 'businessType', e.target.value, 'businessDetails')}
                                        placeholder="Proprietary/Partnership/etc"
                                      />
                                    </td>
                                    <td>
                                      <input
                                        type="text"
                                        className="form-control"
                                        value={business.nature}
                                        onChange={(e) => handleTableChange(index, 'nature', e.target.value, 'businessDetails')}
                                        placeholder="Nature of business"
                                      />
                                    </td>
                                    <td>
                                      <input
                                        type="text"
                                        className="form-control"
                                        value={business.products}
                                        onChange={(e) => handleTableChange(index, 'products', e.target.value, 'businessDetails')}
                                        placeholder="Products/Services"
                                      />
                                    </td>
                                    <td>
                                      <input
                                        type="text"
                                        className="form-control"
                                        value={business.years}
                                        onChange={(e) => handleTableChange(index, 'years', e.target.value, 'businessDetails')}
                                        placeholder="Years"
                                      />
                                    </td>
                                    <td>
                                      <input
                                        type="text"
                                        className="form-control"
                                        value={business.employees}
                                        onChange={(e) => handleTableChange(index, 'employees', e.target.value, 'businessDetails')}
                                        placeholder="Number of employees"
                                      />
                                    </td>
                                    <td>
                                      <input
                                        type="text"
                                        className="form-control"
                                        value={business.turnover}
                                        onChange={(e) => handleTableChange(index, 'turnover', e.target.value, 'businessDetails')}
                                        placeholder="Turnover amount"
                                      />
                                    </td>
                                    <td className="text-center">
                                      <button
                                        type="button"
                                        className="btn btn-sm btn-danger"
                                        onClick={() => removeTableRow(index, 'businessDetails')}
                                      >
                                        <i className="fas fa-times"></i>
                                      </button>
                                    </td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                          <button
                            type="button"
                            className="btn btn-secondary btn-sm"
                            onClick={() => addTableRow('businessDetails', { 
                              companyName: "", businessType: "", nature: "", products: "", 
                              years: "", employees: "", turnover: "" 
                            })}
                          >
                            <i className="fas fa-plus me-1"></i> Add Business
                          </button>
                        </div>
                      )}
                    </div>

                    <h5 className="section-subtitle mb-3">Professional Background</h5>
                    <div className="row g-3 mb-4">
                      <div className="col-md-12">
                        <label className="form-label form-label-custom">
                          Does your professional background involve any of the following?
                        </label>
                        <div className="row">
                          {professionalBackgroundOptions.map((option, index) => (
                            <div key={index} className="col-md-6 mb-2">
                              <div className="form-check">
                                <input
                                  className="form-check-input"
                                  type="checkbox"
                                  name="professionalBackground"
                                  id={`background${index}`}
                                  value={option}
                                  checked={formData.professionalBackground?.includes(option)}
                                  onChange={handleChange}
                                />
                                <label className="form-check-label" htmlFor={`background${index}`}>
                                  {option}
                                </label>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="col-md-12">
                        <label className="form-label form-label-custom">
                          Are you currently associated with any professional group/association?
                        </label>
                        <textarea
                          rows={2}
                          name="professionalAssociations"
                          value={formData.professionalAssociations}
                          onChange={handleChange}
                          className="form-control form-control-custom"
                          placeholder="If yes, provide details"
                        />
                      </div>
                    </div>

                    <h5 className="section-subtitle mb-3">Proposed Centre Details</h5>
                    <div className="row g-3 mb-4">
                      <div className="col-md-6">
                        <label className="form-label form-label-custom">
                          How do you propose to set up the center? *
                        </label>
                        <select
                          name="businessStructure"
                          value={formData.businessStructure}
                          onChange={handleChange}
                          className={`form-control form-control-custom ${errors.businessStructure ? "is-invalid" : ""}`}
                        >
                          <option value="">Select Business Structure</option>
                          <option value="Proprietorship">Proprietorship</option>
                          <option value="Partnership">Partnership</option>
                          <option value="Private Ltd.">Private Ltd.</option>
                          <option value="Public Ltd.">Public Ltd.</option>
                          <option value="Society">Society</option>
                          <option value="Trust">Trust</option>
                        </select>
                        {errors.businessStructure && (
                          <div className="invalid-feedback">{errors.businessStructure}</div>
                        )}
                      </div>

                      <div className="col-md-6">
                        <label className="form-label form-label-custom">
                          Is the business entity already in existence?
                        </label>
                        <div className="d-flex gap-3">
                          <div className="form-check">
                            <input
                              className="form-check-input"
                              type="radio"
                              name="existingEntity"
                              id="existingYes"
                              value="Yes"
                              checked={formData.existingEntity === "Yes"}
                              onChange={handleChange}
                            />
                            <label className="form-check-label" htmlFor="existingYes">
                              Yes
                            </label>
                          </div>
                          <div className="form-check">
                            <input
                              className="form-check-input"
                              type="radio"
                              name="existingEntity"
                              id="existingNo"
                              value="No"
                              checked={formData.existingEntity === "No"}
                              onChange={handleChange}
                            />
                            <label className="form-check-label" htmlFor="existingNo">
                              No
                            </label>
                          </div>
                        </div>
                      </div>

                      {formData.existingEntity === "Yes" && (
                        <div className="col-md-12">
                          <label className="form-label form-label-custom">
                            Name of Business/Firm/Company
                          </label>
                          <input
                            type="text"
                            name="existingEntityName"
                            value={formData.existingEntityName}
                            onChange={handleChange}
                            className="form-control form-control-custom"
                            placeholder="Enter business name"
                          />
                        </div>
                      )}

                      <div className="col-md-6">
                        <label className="form-label form-label-custom">
                          Proposed City/Town *
                        </label>
                        <input
                          type="text"
                          name="proposedCity"
                          value={formData.proposedCity}
                          onChange={handleChange}
                          className={`form-control form-control-custom ${errors.proposedCity ? "is-invalid" : ""}`}
                          placeholder="Enter city/town"
                        />
                        {errors.proposedCity && (
                          <div className="invalid-feedback">{errors.proposedCity}</div>
                        )}
                      </div>

                      <div className="col-md-6">
                        <label className="form-label form-label-custom">
                          State *
                        </label>
                        <input
                          type="text"
                          name="proposedState"
                          value={formData.proposedState}
                          onChange={handleChange}
                          className={`form-control form-control-custom ${errors.proposedState ? "is-invalid" : ""}`}
                          placeholder="Enter state"
                        />
                        {errors.proposedState && (
                          <div className="invalid-feedback">{errors.proposedState}</div>
                        )}
                      </div>

                      <div className="col-md-6">
                        <label className="form-label form-label-custom">
                          When do you propose to setup the new venture?
                        </label>
                        <select
                          name="setupTimeline"
                          value={formData.setupTimeline}
                          onChange={handleChange}
                          className="form-control form-control-custom"
                        >
                          <option value="">Select Timeline</option>
                          <option value="Immediately">Immediately</option>
                          <option value="Within next 3 months">Within next 3 months</option>
                          <option value="Next 3 to 6 months">Next 3 to 6 months</option>
                        </select>
                      </div>

                      <div className="col-md-6">
                        <label className="form-label form-label-custom">
                          Do you already possess a site?
                        </label>
                        <div className="d-flex gap-3">
                          <div className="form-check">
                            <input
                              className="form-check-input"
                              type="radio"
                              name="sitePossession"
                              id="siteYes"
                              value="Yes"
                              checked={formData.sitePossession === "Yes"}
                              onChange={handleChange}
                            />
                            <label className="form-check-label" htmlFor="siteYes">
                              Yes
                            </label>
                          </div>
                          <div className="form-check">
                            <input
                              className="form-check-input"
                              type="radio"
                              name="sitePossession"
                              id="siteNo"
                              value="No"
                              checked={formData.sitePossession === "No"}
                              onChange={handleChange}
                            />
                            <label className="form-check-label" htmlFor="siteNo">
                              No
                            </label>
                          </div>
                        </div>
                      </div>

                      {formData.sitePossession === "Yes" && (
                        <>
                          <div className="col-md-6">
                            <label className="form-label form-label-custom">
                              Nature of Agreement
                            </label>
                            <select
                              name="agreementType"
                              value={formData.siteDetails.agreementType}
                              onChange={(e) => handleNestedChange('siteDetails', 'agreementType', e.target.value)}
                              className="form-control form-control-custom"
                            >
                              <option value="">Select Agreement Type</option>
                              <option value="Ownership">Ownership</option>
                              <option value="Rental">Rental</option>
                              <option value="Long Term Lease">Long Term Lease</option>
                            </select>
                          </div>

                          <div className="col-md-6">
                            <label className="form-label form-label-custom">
                              Period of Lease
                            </label>
                            <div className="row g-2">
                              <div className="col-6">
                                <input
                                  type="date"
                                  className="form-control"
                                  value={formData.siteDetails.leaseFrom}
                                  onChange={(e) => handleNestedChange('siteDetails', 'leaseFrom', e.target.value)}
                                  placeholder="From"
                                />
                              </div>
                              <div className="col-6">
                                <input
                                  type="date"
                                  className="form-control"
                                  value={formData.siteDetails.leaseTo}
                                  onChange={(e) => handleNestedChange('siteDetails', 'leaseTo', e.target.value)}
                                  placeholder="To"
                                />
                              </div>
                            </div>
                          </div>

                          <div className="col-md-6">
                            <label className="form-label form-label-custom">
                              Tiled/Carpet Area
                            </label>
                            <input
                              type="text"
                              className="form-control form-control-custom"
                              value={formData.siteDetails.area}
                              onChange={(e) => handleNestedChange('siteDetails', 'area', e.target.value)}
                              placeholder="Area in sq. ft."
                            />
                          </div>

                          <div className="col-md-6">
                            <label className="form-label form-label-custom">
                              Location Type
                            </label>
                            <select
                              className="form-control form-control-custom"
                              value={formData.siteDetails.locationType}
                              onChange={(e) => handleNestedChange('siteDetails', 'locationType', e.target.value)}
                            >
                              <option value="">Select Location Type</option>
                              <option value="Commercial Area">Commercial Area</option>
                              <option value="Residential Area">Residential Area</option>
                            </select>
                          </div>

                          <div className="col-md-12">
                            <label className="form-label form-label-custom">
                              Address
                            </label>
                            <input
                              type="text"
                              className="form-control form-control-custom"
                              value={formData.siteDetails.address}
                              onChange={(e) => handleNestedChange('siteDetails', 'address', e.target.value)}
                              placeholder="Complete address"
                            />
                          </div>
                        </>
                      )}

                      {formData.sitePossession === "No" && (
                        <>
                          <div className="col-md-6">
                            <label className="form-label form-label-custom">
                              Do you have a site in mind?
                            </label>
                            <div className="d-flex gap-3">
                              <div className="form-check">
                                <input
                                  className="form-check-input"
                                  type="radio"
                                  name="siteInMind"
                                  id="siteInMindYes"
                                  value="Yes"
                                  checked={formData.siteInMind === "Yes"}
                                  onChange={handleChange}
                                />
                                <label className="form-check-label" htmlFor="siteInMindYes">
                                  Yes
                                </label>
                              </div>
                              <div className="form-check">
                                <input
                                  className="form-check-input"
                                  type="radio"
                                  name="siteInMind"
                                  id="siteInMindNo"
                                  value="No"
                                  checked={formData.siteInMind === "No"}
                                  onChange={handleChange}
                                />
                                <label className="form-check-label" htmlFor="siteInMindNo">
                                  No
                                </label>
                              </div>
                            </div>
                          </div>

                          <div className="col-md-6">
                            <label className="form-label form-label-custom">
                              Do you plan to take on rent?
                            </label>
                            <div className="d-flex gap-3">
                              <div className="form-check">
                                <input
                                  className="form-check-input"
                                  type="radio"
                                  name="planToRent"
                                  id="planToRentYes"
                                  value="Yes"
                                  checked={formData.planToRent === "Yes"}
                                  onChange={handleChange}
                                />
                                <label className="form-check-label" htmlFor="planToRentYes">
                                  Yes
                                </label>
                              </div>
                              <div className="form-check">
                                <input
                                  className="form-check-input"
                                  type="radio"
                                  name="planToRent"
                                  id="planToRentNo"
                                  value="No"
                                  checked={formData.planToRent === "No"}
                                  onChange={handleChange}
                                />
                                <label className="form-check-label" htmlFor="planToRentNo">
                                  No
                                </label>
                              </div>
                            </div>
                          </div>

                          {formData.planToRent === "Yes" && (
                            <div className="col-md-12">
                              <label className="form-label form-label-custom">
                                If yes, within how many months?
                              </label>
                              <input
                                type="text"
                                name="withinMonths"
                                value={formData.withinMonths}
                                onChange={handleChange}
                                className="form-control form-control-custom"
                                placeholder="Enter number of months"
                              />
                            </div>
                          )}
                        </>
                      )}

                      <div className="col-md-12">
                        <label className="form-label form-label-custom">
                          How much funds are you willing to invest? *
                        </label>
                        <div className="d-flex gap-4">
                          <div className="form-check">
                            <input
                              className="form-check-input"
                              type="radio"
                              name="investmentRange"
                              id="investment10-15"
                              value="10-15 Lacs"
                              checked={formData.investmentRange === "10-15 Lacs"}
                              onChange={handleChange}
                            />
                            <label className="form-check-label" htmlFor="investment10-15">
                              10-15 Lacs
                            </label>
                          </div>
                          <div className="form-check">
                            <input
                              className="form-check-input"
                              type="radio"
                              name="investmentRange"
                              id="investment15-30"
                              value="15-30 Lacs"
                              checked={formData.investmentRange === "15-30 Lacs"}
                              onChange={handleChange}
                            />
                            <label className="form-check-label" htmlFor="investment15-30">
                              15-30 Lacs
                            </label>
                          </div>
                          <div className="form-check">
                            <input
                              className="form-check-input"
                              type="radio"
                              name="investmentRange"
                              id="investment30+"
                              value="More than 30 Lacs"
                              checked={formData.investmentRange === "More than 30 Lacs"}
                              onChange={handleChange}
                            />
                            <label className="form-check-label" htmlFor="investment30+">
                              More than 30 Lacs
                            </label>
                          </div>
                        </div>
                        {errors.investmentRange && (
                          <div className="invalid-feedback d-block">{errors.investmentRange}</div>
                        )}
                      </div>

                      <div className="col-md-12">
                        <label className="form-label form-label-custom">
                          What efforts/initiatives would you put in to make this business a success?
                        </label>
                        <textarea
                          rows={3}
                          name="effortsInitiatives"
                          value={formData.effortsInitiatives}
                          onChange={handleChange}
                          className="form-control form-control-custom"
                          placeholder="Describe your plans and initiatives"
                        />
                      </div>

                      <div className="col-md-12">
                        <label className="form-label form-label-custom">
                          State reasons why Ruwaindia should consider you as a business partner
                        </label>
                        <textarea
                          rows={3}
                          name="reasonsForPartnership"
                          value={formData.reasonsForPartnership}
                          onChange={handleChange}
                          className="form-control form-control-custom"
                          placeholder="Explain why you would be a good partner"
                        />
                      </div>
                    </div>

                    <h5 className="section-subtitle mb-3">Franchise Details</h5>
                    <div className="row g-3 mb-4">
                      <div className="col-md-6">
                        <label className="form-label form-label-custom">
                          Franchise Category *
                        </label>
                        <select
                          name="category"
                          value={formData.category}
                          onChange={handleChange}
                          className={`form-control form-control-custom ${errors.category ? "is-invalid" : ""}`}
                        >
                          <option value="">Select Category</option>
                          <option value="S1">S1 (200 sq. ft)</option>
                          <option value="S2">S2 (400 sq. ft)</option>
                          <option value="S3">S3 (600 sq. ft)</option>
                        </select>
                        {errors.category && (
                          <div className="invalid-feedback">{errors.category}</div>
                        )}
                      </div>

                      <div className="col-md-12">
                        <label className="form-label form-label-custom">
                          Relevant Experience *
                        </label>
                        <textarea
                          rows={3}
                          name="relevantExperience"
                          value={formData.relevantExperience}
                          onChange={handleChange}
                          className={`form-control form-control-custom ${errors.relevantExperience ? "is-invalid" : ""}`}
                          placeholder="Describe relevant experience in healthcare or business"
                        />
                        {errors.relevantExperience && (
                          <div className="invalid-feedback">{errors.relevantExperience}</div>
                        )}
                      </div>
                    </div>

                    <h5 className="section-subtitle mb-3">Required Documents</h5>
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
                              className={`file-input-custom ${errors.idProof ? "is-invalid" : ""}`}
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
                            Profile Pictuer *
                          </label>
                          <div className="file-input-container">
                            <input
                              type="file"
                              name="idProof"
                              onChange={handleChange}
                              className={`file-input-custom ${errors.idProof ? "is-invalid" : ""}`}
                              accept=".pdf,.jpg,.jpeg,.png"
                              required
                            />
                            <div className="file-upload-placeholder">
                              <i className="fas fa-id-card me-2"></i>
                              {formData.idProof
                                ? formData.idProof.name
                                : "Upload Profile Pictuer Proof"}
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
                              className={`file-input-custom ${errors.qualificationCertificate ? "is-invalid" : ""}`}
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
                              className={`file-input-custom ${errors.financialStatement ? "is-invalid" : ""}`}
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
                          className={`fas ${isLoading ? "fa-spinner fa-spin" : "fa-paper-plane"} me-2`}
                        ></i>
                        {isLoading
                          ? "Submitting..."
                          : "Pay To Submit Application"}
                      </button>
                    </div>
                  </form>
                </div>
              </div>
              )}
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