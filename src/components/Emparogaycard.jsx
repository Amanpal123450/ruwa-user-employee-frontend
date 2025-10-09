import React, { useState } from "react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

export default function Empjansewa() {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [receiptData, setReceiptData] = useState(null);
  const [previews, setPreviews] = useState({});
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    mobile: "",
    aadhar: "",
    state: "",
    district: "",
    DOB: "",
    gender: "",
    email: "",
    income_certificate: null,
    caste_certificate: null,
    ration_id: null,
    profilePicUser: null,
    remarks: "",
  });

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
      [name]: files ? files[0] : value,
    }));
  };

  const handleImageUpload = (e) => {
    const { name, files } = e.target;
    if (!files || !files.length) return;

    const file = files[0];
    setFormData((prev) => ({
      ...prev,
      [name]: file,
    }));

    setPreviews((prev) => ({
      ...prev,
      [name]: URL.createObjectURL(file),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("You must be logged in to submit an application.");
        setLoading(false);
        return;
      }

      // Validate required fields
      if (
        !formData.name ||
        !formData.mobile ||
        !formData.aadhar ||
        !formData.state ||
        !formData.district
      ) {
        alert("Please fill all required fields.");
        setLoading(false);
        return;
      }

      const fd = new FormData();
      const applicationId = "JAC" + Date.now().toString().slice(-8);
      const submissionDate = new Date().toLocaleDateString("en-IN", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      });

      fd.append("name", formData.name);
      fd.append("mobile", formData.mobile);
      fd.append("aadhar", formData.aadhar);
      fd.append("district", formData.district);
      fd.append("state", formData.state);
      fd.append("DOB", formData.DOB);
      fd.append("gender", formData.gender);
      fd.append("email", formData.email);
      fd.append("applicationId", applicationId);
      fd.append("submissionDate", submissionDate);
      fd.append("remarks", formData.remarks || "");

      // Append files only if they exist
      if (formData.income_certificate instanceof File)
        fd.append("income_certificate", formData.income_certificate);
      if (formData.ration_id instanceof File)
        fd.append("ration_id", formData.ration_id);
      if (formData.caste_certificate instanceof File)
        fd.append("caste_certificate", formData.caste_certificate);
      if (formData.profilePicUser instanceof File)
        fd.append("profilePicUser", formData.profilePicUser);

      // Send request to backend
      const res = await fetch(
        "https://ruwa-backend.onrender.com/api/services/janarogya/employee/apply",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: fd,
        }
      );

      const data = await res.json();
      console.log("Submission response:", data);

      if (!res.ok) {
        throw new Error(data.message || "Failed to submit application");
      }

      // Success
      setFormSubmitted(true);
      setReceiptData(data.app);
      
      // Scroll to receipt
      setTimeout(() => {
        document.getElementById("aadhaar-receipt-content")?.scrollIntoView({ 
          behavior: "smooth" 
        });
      }, 100);

      // Reset form
      setFormData({
        name: "",
        mobile: "",
        aadhar: "",
        state: "",
        district: "",
        DOB: "",
        gender: "",
        email: "",
        income_certificate: null,
        caste_certificate: null,
        ration_id: null,
        profilePicUser: null,
        remarks: "",
      });
      setPreviews({});

      setTimeout(() => setFormSubmitted(false), 4000);

    } catch (err) {
      console.error("Submission error:", err);
      alert(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

 const handlePrintReceipt = () => {
    const receiptContent = document.getElementById("aadhaar-receipt-content");
    if (!receiptContent) return;

    const printWindow = window.open("", "_blank");
    printWindow.document.write(`
      <html>
        <head>
          <title>Jan Arogya Card Application Receipt</title>
          <style>
            body { 
              font-family: Arial, sans-serif; 
              padding: 20px; 
              max-width: 600px;
              margin: 0 auto;
              border: 1px solid #000;
            }
            .receipt-header { 
              text-align: center; 
              margin-bottom: 20px; 
              border-bottom: 2px solid #000;
              padding-bottom: 10px;
            }
            .section { 
              margin: 15px 0; 
              padding: 10px 0;
              border-bottom: 1px solid #ddd;
            }
            .detail-row { 
              margin: 8px 0; 
              display: flex;
              justify-content: space-between;
            }
            .detail-label { 
              font-weight: bold; 
              min-width: 200px;
            }
            .signature {
              margin-top: 50px;
              border-top: 1px solid #000;
              padding-top: 10px;
            }
            @media print {
              body { border: none; }
            }
          </style>
        </head>
        <body>
          ${receiptContent.innerHTML}
        </body>
      </html>
    `);
    printWindow.document.close();
    printWindow.print();
  };

   const handleDownloadReceipt = async () => {
  const receiptElement = document.getElementById("aadhaar-receipt-content");
  if (!receiptElement) {
    alert("Receipt not found!");
    return;
  }

  try {
    await new Promise(resolve => setTimeout(resolve, 1000)); // wait for image load

    const canvas = await html2canvas(receiptElement, {
      scale: 2,
      useCORS: true,
      logging: false,
    });

    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF("p", "mm", "a4");
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = pdf.internal.pageSize.getHeight();
    const imgWidth = pdfWidth;
    const imgHeight = (canvas.height * pdfWidth) / canvas.width;

    let heightLeft = imgHeight;
    let position = 0;

    pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
    heightLeft -= pdfHeight;

    while (heightLeft > 0) {
      position = heightLeft - imgHeight;
      pdf.addPage();
      pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
      heightLeft -= pdfHeight;
    }

    pdf.save(
      `JanArogyaReceipt_${receiptData?.reciept?.applicationId || Date.now()}.pdf`
    );
  } catch (err) {
    console.error("Failed to download receipt:", err);
    alert("Failed to download receipt. Please try again.");
  }
};

  const AadhaarStyleReceipt = ({ receiptData }) => {
    if (!receiptData) {
      return null;
    }

    const formatDate = (dateString) => {
      if (!dateString) return 'Not Given';
      try {
        return new Date(dateString)
          .toISOString()
          .split('T')[0]
          .split('-')
          .reverse()
          .join('-');
      } catch {
        return 'Invalid Date';
      }
    };

    return (
      <div className="receipt-container">
        <div id="aadhaar-receipt-content" className="receipt-wrapper">
          <div className="receipt-card">
            <div className="receipt-border">
              {/* Header */}
              <div className="receipt-header">
                <div className="header-content">
                  <img
                    src="https://res.cloudinary.com/dknrega1a/image/upload/v1759834087/WhatsApp_Image_2025-10-06_at_22.00.12_88b58360_cslogj.jpg"
                    alt="UIDAI Logo"
                    className="header-logo"
                  />
                  <div className="header-text">
                    <h1 className="header-title">
                      Unique Identification Authority of India
                    </h1>
                    <h2 className="header-subtitle">
                      भारतीय विशिष्ट पहचान प्राधिकरण
                    </h2>
                    <p className="header-govt">Government of India / भारत सरकार</p>
                  </div>
                  <div className="header-spacer"></div>
                </div>
                <h3 className="acknowledgement-title">
                  ACKNOWLEDGEMENT / RESIDENT COPY
                </h3>
              </div>

              {/* Main Content */}
              <div className="receipt-body">
                {/* Enrollment Details Table */}
                <div className="details-section">
                  <table className="details-table">
                    <tbody>
                      <tr>
                        <td className="label-cell">Enrolment No:</td>
                        <td className="value-cell">{receiptData.enrollmentNo || 'Not Given'}</td>
                        <td className="photo-cell" rowSpan="5">
                          <div className="photo-container">
                            <img
                              src={receiptData.profilePicUser || "https://via.placeholder.com/96"}
                              alt="User Photo"
                              className="user-photo"
                            />
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <td className="label-cell">Application ID:</td>
                        <td className="value-cell">
                          {receiptData.reciept?.applicationId || receiptData.applicationId || "Not Given"}
                        </td>
                      </tr>
                      <tr>
                        <td className="label-cell">Name:</td>
                        <td className="value-cell">{receiptData.name || "Not Given"}</td>
                      </tr>
                      <tr>
                        <td className="label-cell">Address:</td>
                        <td className="value-cell">
                          {receiptData.district && receiptData.state 
                            ? `${receiptData.district}, ${receiptData.state}`
                            : 'Not Given'}
                        </td>
                      </tr>
                      <tr>
                        <td className="label-cell">Date of Birth:</td>
                        <td className="value-cell">
                          {formatDate(receiptData.DOB)}
                        </td>
                      </tr>
                      <tr>
                        <td className="label-cell">Mobile:</td>
                        <td className="value-cell" colSpan="2">
                          {receiptData.mobile || "Not Given"}
                        </td>
                      </tr>
                      <tr>
                        <td className="label-cell">Email:</td>
                        <td className="value-cell" colSpan="2">
                          {receiptData.email || "Not Given"}
                        </td>
                      </tr>
                      <tr>
                        <td className="label-cell">Gender:</td>
                        <td className="value-cell" colSpan="2">
                          {receiptData.gender || "Not Given"}
                        </td>
                      </tr>
                      <tr>
                        <td className="label-cell">Documents:</td>
                        <td className="value-cell" colSpan="2">
                          {receiptData.documents || "Income Certificate, Ration Card, Caste Certificate"}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                {/* Biometric Information */}
                <div className="biometric-section">
                  <h4 className="section-heading">Biometric Information</h4>
                  <div className="biometric-text">
                    <span className="bold-text">Fingerprint quality:</span> Left: ✓ Right: ✓
                  </div>
                  <div className="biometric-text indent">
                    ✓ Good Quality fingerprint, recommended for authentication.
                  </div>
                  <div className="biometric-text">
                    <span className="bold-text">Biometrics Captured:</span> Fingers(10), Iris(2), Face
                  </div>
                </div>

                {/* Bank Details */}
                <div className="bank-section">
                  <table className="bank-table">
                    <tbody>
                      <tr>
                        <td className="label-cell">Bank Details:</td>
                        <td className="value-cell">
                          {receiptData.bankDetails || "New Aadhaar enabled bank account/STATE BANK OF INDIA"}
                        </td>
                      </tr>
                      <tr>
                        <td className="label-cell">Information Sharing Consent:</td>
                        <td className="value-cell">{receiptData.consent || "Yes"}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                {/* Registrar Info */}
                <div className="registrar-section">
                  <table className="registrar-table">
                    <tbody>
                      <tr>
                        <td className="label-cell">Registrar:</td>
                        <td className="value-cell">
                          {receiptData.registrar || `Govt of ${receiptData.state || 'India'}`}
                        </td>
                      </tr>
                      <tr>
                        <td className="label-cell">Enrolment Agency:</td>
                        <td className="value-cell">
                          {receiptData.agency || "MARS Telecom Systems Pvt Ltd"}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                  <p className="correction-note">
                    A Correction (if any) of demographic information must be made
                    within 96 hours of enrolment
                  </p>
                </div>

                {/* Status Message */}
                <div className={`status-section ${receiptData.status === "approved" ? "approved" : "pending"}`}>
                  <p className="status-text">
                    {receiptData.status === "approved"
                      ? "Your Jan Arogya Card has been approved and will be delivered to your address mentioned on this receipt in around 60-90 days. You can get only one Jan Arogya Card. Please do not enrol again unless asked to."
                      : "Your Jan Arogya Card application is under review. You will receive updates on your registered mobile and email. You can get only one Jan Arogya Card. Please do not enrol again unless asked to."}
                  </p>
                </div>

                {/* Footer with QR and Contact */}
                <div className="footer-section">
                  <div className="contact-info">
                    <p className="contact-title">For enquiry, please contact:</p>
                    <p>help-janarogya.gov.in</p>
                    <p>http://www.janarogya.gov.in</p>
                    <p>1800 180 1947</p>
                    <p className="disclaimer">
                      This is a computer-generated acknowledgement and does not
                      require a physical signature.
                    </p>
                  </div>
                  <div className="qr-section">
                    <div className="qr-container">
                      {receiptData.Qr ? (
                        <img
                          src={receiptData.Qr}
                          alt="QR Code"
                          className="qr-image"
                        />
                      ) : (
                        <div className="qr-placeholder">QR Code</div>
                      )}
                    </div>
                    <div className="signature-info">
                      <div>{receiptData.authorizedPerson || "Veldandi Sridhar"}</div>
                      <div className="signature-label">(Authorized Signature)</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="action-buttons no-print">
          <button onClick={handlePrintReceipt} className="btn-print">
            🖨️ Print Receipt
          </button>
          <button onClick={handleDownloadReceipt} className="btn-download">
            📥 Download PDF
          </button>
        </div>
      </div>
    );
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
                      <div className="greeting-badge">Employee Portal 👋</div>
                      <h1 className="welcome-title">
                        Jan Swabhiman Seva Applications
                      </h1>
                      <p className="welcome-subtitle">
                        Submit welfare applications on behalf of users with your
                        employee reference
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
                  <div
                    className="service-card"
                    style={{ "--gradient": service.gradient }}
                  >
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

            {/* Receipt Section */}
            {receiptData && <AadhaarStyleReceipt receiptData={receiptData} />}

            {/* Application Form */}
            <div className="card user-table-card">
              <div className="card-header-custom">
                <h3 className="header-title">Employee Application Form</h3>
                <p className="header-subtitle">
                  Submit Jan Swabhiman Seva applications on behalf of users
                </p>
              </div>

              <div className="card-body">
                {formSubmitted && (
                  <div
                    className="alert alert-success alert-custom"
                    role="alert"
                  >
                    <i className="fas fa-check-circle me-2"></i>
                    Application submitted successfully with Employee Reference!
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
                      <label className="form-label-custom">Full Name *</label>
                      <input
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        type="text"
                        className="form-control-custom"
                        placeholder="Enter user's full name"
                        required
                      />
                    </div>
                    <div className="col-md-6 mb-3">
                      <label className="form-label-custom">Mobile Number *</label>
                      <input
                        name="mobile"
                        value={formData.mobile}
                        onChange={handleChange}
                        type="tel"
                        className="form-control-custom"
                        placeholder="e.g. 9876543210"
                        pattern="[0-9]{10}"
                        required
                      />
                    </div>
                    <div className="col-md-6 mb-3">
                      <label className="form-label-custom">
                        Aadhaar Number *
                      </label>
                      <input
                        name="aadhar"
                        value={formData.aadhar}
                        onChange={handleChange}
                        type="text"
                        className="form-control-custom"
                        placeholder="XXXX-XXXX-XXXX"
                        pattern="[0-9]{12}"
                        maxLength="12"
                        required
                      />
                    </div>
                    <div className="col-md-6 mb-3">
                      <label className="form-label-custom">Date of Birth *</label>
                      <input
                        name="DOB"
                        value={formData.DOB}
                        onChange={handleChange}
                        type="date"
                        className="form-control-custom"
                        required
                      />
                    </div>
                    <div className="col-md-6 mb-3">
                      <label className="form-label-custom">Gender *</label>
                      <select
                        name="gender"
                        value={formData.gender}
                        onChange={handleChange}
                        className="form-control-custom"
                        required
                      >
                        <option value="">Select Gender</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>
                    <div className="col-md-6 mb-3">
                      <label className="form-label-custom">Email *</label>
                      <input
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        type="email"
                        className="form-control-custom"
                        placeholder="example@email.com"
                        required
                      />
                    </div>
                    <div className="col-md-6 mb-3">
                      <label className="form-label-custom">District *</label>
                      <input
                        name="district"
                        value={formData.district}
                        onChange={handleChange}
                        type="text"
                        className="form-control-custom"
                        placeholder="Enter district"
                        required
                      />
                    </div>
                    <div className="col-md-6 mb-3">
                      <label className="form-label-custom">State *</label>
                      <input
                        name="state"
                        value={formData.state}
                        onChange={handleChange}
                        type="text"
                        className="form-control-custom"
                        placeholder="Enter state"
                        required
                      />
                    </div>
                    
                    {/* File Uploads */}
                    <div className="col-12 mt-3 mb-2">
                      <h6 className="section-subtitle">Document Uploads *</h6>
                    </div>
                    <div className="col-md-6 mb-3">
                      <label className="form-label-custom">
                        Income Certificate *
                      </label>
                      <div className="file-input-container">
                        <input
                          name="income_certificate"
                          onChange={handleImageUpload}
                          type="file"
                          className="file-input-custom"
                          accept="image/*,application/pdf"
                          required
                        />
                        <div className="file-upload-placeholder">
                          <i className="fas fa-upload me-2"></i>
                          {formData.income_certificate ? formData.income_certificate.name : "Choose file"}
                        </div>
                      </div>
                    </div>
                    <div className="col-md-6 mb-3">
                      <label className="form-label-custom">
                        Caste Certificate *
                      </label>
                      <div className="file-input-container">
                        <input
                          name="caste_certificate"
                          onChange={handleImageUpload}
                          type="file"
                          className="file-input-custom"
                          accept="image/*,application/pdf"
                          required
                        />
                        <div className="file-upload-placeholder">
                          <i className="fas fa-upload me-2"></i>
                          {formData.caste_certificate ? formData.caste_certificate.name : "Choose file"}
                        </div>
                      </div>
                    </div>
                    <div className="col-md-6 mb-3">
                      <label className="form-label-custom">Ration Card *</label>
                      <div className="file-input-container">
                        <input
                          name="ration_id"
                          onChange={handleImageUpload}
                          type="file"
                          className="file-input-custom"
                          accept="image/*,application/pdf"
                          required
                        />
                        <div className="file-upload-placeholder">
                          <i className="fas fa-upload me-2"></i>
                          {formData.ration_id ? formData.ration_id.name : "Choose file"}
                        </div>
                      </div>
                    </div>
                    <div className="col-md-6 mb-3">
                      <label className="form-label-custom">
                        Profile Picture
                      </label>
                      <div className="file-input-container">
                        <input
                          name="profilePicUser"
                          onChange={handleImageUpload}
                          type="file"
                          className="file-input-custom"
                          accept="image/*"
                        />
                        <div className="file-upload-placeholder">
                          <i className="fas fa-upload me-2"></i>
                          {formData.profilePicUser ? formData.profilePicUser.name : "Upload Profile Picture (Optional)"}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Remarks Section */}
                  <div className="row mb-4">
                    <div className="col-12">
                      <h5 className="section-title-with-icon">
                        <i className="fas fa-comment me-2"></i>
                        Additional Information
                      </h5>
                      <hr className="section-divider" />
                    </div>
                    <div className="col-12 mb-3">
                      <label className="form-label-custom">
                        Remarks for Admin
                      </label>
                      <textarea
                        name="remarks"
                        value={formData.remarks}
                        onChange={handleChange}
                        className="form-control-custom"
                        rows="3"
                        placeholder="Any remarks for admin (optional)..."
                      />
                    </div>
                  </div>

                  <div className="text-center mt-4">
                    <button
                      type="submit"
                      className="btn-primary-custom px-5 py-2"
                      disabled={loading}
                    >
                      {loading ? (
                        <>
                          <i className="fas fa-spinner fa-spin me-2"></i>
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

        .section-title-with-icon {
          font-size: 1.2rem;
          font-weight: 600;
          color: #374151;
          display: flex;
          align-items: center;
        }

        .section-subtitle {
          font-size: 1rem;
          font-weight: 600;
          color: #4b5563;
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
          z-index: 10;
        }

        .file-upload-placeholder {
          background: #f9fafb;
          border: 1px dashed #d1d5db;
          border-radius: 10px;
          padding: 0.75rem 1rem;
          color: #6b7280;
          text-align: center;
          transition: all 0.3s ease;
          pointer-events: none;
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
          cursor: pointer;
        }

        .btn-primary-custom:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 8px 25px rgba(59, 130, 246, 0.5);
          background: linear-gradient(135deg, #2563eb, #1e40af);
        }

        .btn-primary-custom:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }

        /* Receipt Styles */
        .receipt-container {
          background: #f3f4f6;
          padding: 2rem 1rem;
          margin-bottom: 2rem;
        }

        .receipt-wrapper {
          max-width: 900px;
          margin: 0 auto;
        }

        .receipt-card {
          background: white;
          box-shadow: 0 10px 30px rgba(0,0,0,0.1);
          padding: 1rem;
        }

        .receipt-border {
          border: 2px solid #000;
        }

        .receipt-header {
          border-bottom: 2px solid #000;
          padding: 1rem;
        }

        .header-content {
          display: flex;
          align-items: flex-start;
          gap: 1rem;
          margin-bottom: 0.5rem;
        }

        .header-logo {
          width: 60px;
          height: 60px;
          flex-shrink: 0;
        }

        .header-text {
          flex: 1;
          text-align: center;
        }

        .header-title {
          font-size: 1.25rem;
          font-weight: bold;
          margin: 0;
          line-height: 1.3;
        }

        .header-subtitle {
          font-size: 1rem;
          font-weight: 600;
          margin: 0.25rem 0;
        }

        .header-govt {
          font-size: 0.9rem;
          margin: 0;
        }

        .header-spacer {
          width: 60px;
          flex-shrink: 0;
        }

        .acknowledgement-title {
          text-align: center;
          font-weight: bold;
          margin: 0.5rem 0 0;
          font-size: 1rem;
          text-transform: uppercase;
        }

        .receipt-body {
          padding: 1rem;
        }

        .details-section {
          margin-bottom: 1rem;
        }

        .details-table {
          width: 100%;
          font-size: 0.9rem;
          border-collapse: collapse;
        }

        .details-table tr {
          border-bottom: 1px solid #9ca3af;
        }

        .label-cell {
          padding: 0.5rem 0.5rem 0.5rem 0;
          font-weight: 600;
          width: 35%;
          vertical-align: top;
        }

        .value-cell {
          padding: 0.5rem 0;
          word-break: break-word;
          vertical-align: top;
        }

        .photo-cell {
          text-align: right;
          padding-left: 1rem;
          vertical-align: top;
        }

        .photo-container {
          border: 2px solid #000;
          width: 96px;
          height: 96px;
          overflow: hidden;
          display: inline-block;
        }

        .user-photo {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .biometric-section {
          padding: 1rem 0;
          border-bottom: 2px solid #000;
          margin-bottom: 1rem;
        }

        .section-heading {
          font-weight: bold;
          margin-bottom: 0.5rem;
          font-size: 0.95rem;
        }

        .biometric-text {
          font-size: 0.9rem;
          margin-bottom: 0.5rem;
        }

        .bold-text {
          font-weight: 600;
        }

        .indent {
          margin-left: 2rem;
        }

        .bank-section {
          padding-bottom: 1rem;
          border-bottom: 1px solid #9ca3af;
          margin-bottom: 1rem;
        }

        .bank-table {
          width: 100%;
          font-size: 0.9rem;
        }

        .bank-table td {
          padding: 0.25rem 0;
        }

        .registrar-section {
          background: #fef3c7;
          padding: 1rem;
          border-radius: 0.5rem;
          margin-bottom: 1rem;
        }

        .registrar-table {
          width: 100%;
          font-size: 0.9rem;
          margin-bottom: 0.5rem;
        }

        .registrar-table td {
          padding: 0.25rem 0;
        }

        .correction-note {
          font-size: 0.85rem;
          text-align: center;
          margin: 0.5rem 0 0;
          font-weight: 500;
        }

        .status-section {
          padding: 1rem;
          margin-bottom: 1rem;
          border-radius: 0.5rem;
          border: 2px solid;
        }

        .status-section.approved {
          background: #d1fae5;
          border-color: #10b981;
        }

        .status-section.pending {
          background: #dbeafe;
          border-color: #3b82f6;
        }

        .status-text {
          font-size: 0.9rem;
          text-align: center;
          margin: 0;
          font-weight: 500;
        }

        .footer-section {
          display: flex;
          justify-content: space-between;
          align-items: flex-end;
          gap: 2rem;
          flex-wrap: wrap;
        }

        .contact-info {
          font-size: 0.85rem;
          flex: 1;
          min-width: 200px;
        }

        .contact-title {
          font-weight: bold;
          margin-bottom: 0.5rem;
        }

        .contact-info p {
          margin: 0.25rem 0;
        }

        .disclaimer {
          margin-top: 1rem;
          color: #6b7280;
          font-size: 0.8rem;
        }

        .qr-section {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.5rem;
        }

        .qr-container {
          border: 1px solid #9ca3af;
          padding: 0.5rem;
          width: 96px;
          height: 96px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: white;
        }

        .qr-image {
          width: 100%;
          height: 100%;
          object-fit: contain;
        }

        .qr-placeholder {
          font-size: 0.75rem;
          color: #9ca3af;
          text-align: center;
        }

        .signature-info {
          text-align: center;
          font-size: 0.85rem;
          font-weight: 600;
        }

        .signature-label {
          color: #6b7280;
          font-weight: normal;
        }

        .action-buttons {
          display: flex;
          justify-content: center;
          gap: 1rem;
          margin-top: 1.5rem;
          flex-wrap: wrap;
        }

        .btn-print,
        .btn-download {
          padding: 0.75rem 2rem;
          border: none;
          border-radius: 50px;
          font-weight: 600;
          font-size: 1rem;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .btn-print {
          background: linear-gradient(135deg, #10b981, #059669);
          color: white;
          box-shadow: 0 4px 15px rgba(16, 185, 129, 0.4);
        }

        .btn-print:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 25px rgba(16, 185, 129, 0.5);
        }

        .btn-download {
          background: linear-gradient(135deg, #f59e0b, #d97706);
          color: white;
          box-shadow: 0 4px 15px rgba(245, 158, 11, 0.4);
        }

        .btn-download:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 25px rgba(245, 158, 11, 0.5);
        }

        @media print {
          .no-print {
            display: none !important;
          }
          
          .receipt-container {
            padding: 0;
            background: white;
          }
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

          .header-logo {
            width: 40px;
            height: 40px;
          }

          .header-title {
            font-size: 0.9rem;
          }

          .header-subtitle {
            font-size: 0.8rem;
          }

          .header-govt {
            font-size: 0.75rem;
          }

          .details-table {
            font-size: 0.8rem;
          }

          .photo-container {
            width: 70px;
            height: 70px;
          }

          .indent {
            margin-left: 1rem;
          }

          .footer-section {
            flex-direction: column;
            align-items: center;
            text-align: center;
          }

          .action-buttons {
            flex-direction: column;
            width: 100%;
          }

          .btn-print,
          .btn-download {
            width: 100%;
          }
        }
  `}</style>
    </div>
  );
}