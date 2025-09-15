import React, { useState, useEffect } from 'react';
import { Form, Button, Col, Row } from 'react-bootstrap';

export default function Empinsurance() {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [captchaCode, setCaptchaCode] = useState('');
  const [formData, setFormData] = useState({
    fullName: '',
    dob: '',
    gender: '',
    email: '',
    phone: '',
    aadhaarNumber: '',
    address: '',
    state: '',
    district: '',
    pincode: '',
    insuranceType: '',
    captcha: '',
    id_proof: null,
    passport_photo: null,
    medical_documents: null,
    income_certificate: null,
    // forUserId:""
  });
  const [errors, setErrors] = useState({});

  // Fetch user data on component mount
 

  const services = [
    {
      icon: '📄',
      title: 'Comprehensive Insurance Plans',
      description: [
        'Covers hospitalization, surgeries, and critical illness.',
        'Includes outpatient consultations and diagnostics.',
        'Customizable premium and sum insured options.',
      ],
      gradient: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
    },
    {
      icon: '👨‍👩‍👧‍👦',
      title: 'Family Floater Plans',
      description: [
        'One policy for entire family.',
        'Affordable premium with wider coverage.',
        'Covers parents, spouse, and children.',
      ],
      gradient: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)"
    },
    {
      icon: '💸',
      title: 'Cashless Claims',
      description: [
        'Cashless treatment at partner hospitals.',
        'No upfront payments required.',
        'Transparent and quick claim process.',
      ],
      gradient: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)"
    },
    {
      icon: '📞',
      title: '24x7 Claim Support',
      description: [
        'Dedicated helpline for queries.',
        'Assistance during emergencies and hospital admissions.',
        'Multilingual support for wider reach.',
      ],
      gradient: "linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)"
    }
  ];

  const generateCaptcha = () => {
    const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
    let code = '';
    for (let i = 0; i < 6; i++) {
      code += chars[Math.floor(Math.random() * chars.length)];
    }
    setCaptchaCode(code);
  };

  useEffect(() => {
    generateCaptcha();
  }, []);

  const validate = () => {
    const errs = {};
    if (!formData.fullName) errs.fullName = 'Full name is required';
    if (!formData.dob) errs.dob = 'Date of birth is required';
    if (!formData.gender) errs.gender = 'Gender is required';
    if (!formData.email || !/^\S+@\S+\.\S+$/.test(formData.email)) errs.email = 'Valid email required';
    if (!formData.phone || !/^\d{10}$/.test(formData.phone)) errs.phone = 'Valid 10-digit mobile number required';
    if (!formData.aadhaarNumber || !/^\d{12}$/.test(formData.aadhaarNumber)) errs.aadhaarNumber = 'Aadhaar must be 12 digits';
    if (!formData.address) errs.address = 'Address is required';
    if (!formData.state) errs.state = 'State is required';
    if (!formData.district) errs.district = 'District is required';
    // if (!formData.forUserId) errs.forUserId = 'User Id is required';
    if (!formData.pincode || !/^\d{6}$/.test(formData.pincode)) errs.pincode = '6-digit PIN required';
    if (!formData.insuranceType) errs.insuranceType = 'Select insurance type';
    if (!formData.captcha || formData.captcha !== captchaCode) errs.captcha = 'Captcha does not match';
    if (!formData.id_proof) errs.id_proof = 'Upload ID proof';
    if (!formData.passport_photo) errs.passport_photo = 'Upload passport-size photo';
    if (!formData.medical_documents) errs.medical_documents = 'Upload medical documents';
    if (!formData.income_certificate) errs.income_certificate = 'Upload income certificate';
    return errs;
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prev) => ({ ...prev, [name]: files ? files[0] : value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length === 0) {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          alert("You must be logged in to apply for insurance.");
          return;
        }

        const fd = new FormData();
        fd.append("fullName", formData.fullName);
        fd.append("dob", formData.dob);
        fd.append("gender", formData.gender);
        fd.append("email", formData.email);
        fd.append("phone", formData.phone);
        fd.append("aadhaarNumber", formData.aadhaarNumber);
        fd.append("address", formData.address);
        fd.append("state", formData.state);
        fd.append("district", formData.district);
        fd.append("pincode", formData.pincode);
        // fd.append("forUserId", formData.forUserId);
        fd.append("insuranceType", formData.insuranceType);
        fd.append("id_proof", formData.id_proof);
        fd.append("passport_photo", formData.passport_photo);
        fd.append("medical_documents", formData.medical_documents);
        fd.append("income_certificate", formData.income_certificate);

        const res = await fetch("https://ruwa-backend.onrender.com/api/services/apply-insurance/employee/apply", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`
          },
          body: fd});

        if (!res.ok) {
          const errData = await res.json();
          throw new Error(errData.message || "Failed to submit insurance applications");
        }
         if (res.ok) {
          alert("Insurance application submitted successfully!");
        }

        setFormSubmitted(true);
        setTimeout(() => setFormSubmitted(false), 4000);
        generateCaptcha();
        setFormData({
          fullName: "", // Keep name
          phone: "", // Keep phone
          email: "", // Keep email
          aadhaarNumber: "", // Keep aadhaarNumber
          dob: '',
          gender: '',
          address: '',
          state: '',
          district: '',
          pincode: '',
          insuranceType: '',
          captcha: '',
          id_proof: null,
          passport_photo: null,
          medical_documents: null,
          income_certificate: null
        });
        setErrors({});
      } catch (err) {
        console.error(err);
        alert(err.message || "Something went wrong");
      }
    } else {
      setErrors(validationErrors);
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
                        Insurance Services 👋
                      </div>
                      <h1 className="welcome-title">
                        Health & Life Insurance Plans
                      </h1>
                      <p className="welcome-subtitle">
                        Secure your future with comprehensive insurance coverage for you and your family
                      </p>
                    </div>
                  </div>
                  <div className="col-lg-4 col-md-5 text-center">
                    <div className="profile-section">
                      <div className="profile-image-container">
                        <div className="service-icon-display">
                          <span className="icon-emoji">📄</span>
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
                <h3 className="header-title">Apply for Insurance</h3>
                <p className="header-subtitle">Fill in your details to get comprehensive insurance coverage</p>
              </div>
              
              <div className="card-body">
                {formSubmitted && (
                  <div className="alert alert-success alert-custom" role="alert">
                    <i className="fas fa-check-circle me-2"></i>
                    Insurance application submitted successfully!
                  </div>
                )}

                <Form onSubmit={handleSubmit} noValidate>
                  <Row className="g-3 mb-4">
                    <Col md={6}>
                      <Form.Label className="form-label-custom">Full Name</Form.Label>
                      <Form.Control 
                        name="fullName" 
                        value={formData.fullName} 
                        onChange={handleChange} 
                        isInvalid={!!errors.fullName} 
                        placeholder="Enter your full name" 
                        required 
                        className="form-control-custom"
                        
                      />
                      <Form.Control.Feedback type="invalid">{errors.fullName}</Form.Control.Feedback>
                    </Col>
                    <Col md={6}>
                      <Form.Label className="form-label-custom">Date of Birth</Form.Label>
                      <Form.Control 
                        type="date" 
                        name="dob" 
                        value={formData.dob} 
                        onChange={handleChange} 
                        isInvalid={!!errors.dob} 
                        required 
                        className="form-control-custom"
                      />
                      <Form.Control.Feedback type="invalid">{errors.dob}</Form.Control.Feedback>
                    </Col>
                    <Col md={6}>
                      <Form.Label className="form-label-custom">Gender</Form.Label>
                      <Form.Select 
                        name="gender" 
                        value={formData.gender} 
                        onChange={handleChange} 
                        isInvalid={!!errors.gender} 
                        required 
                        className="form-control-custom"
                      >
                        <option value="">-- Select Gender --</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Other">Other</option>
                      </Form.Select>
                      <Form.Control.Feedback type="invalid">{errors.gender}</Form.Control.Feedback>
                    </Col>
                    <Col md={6}>
                      <Form.Label className="form-label-custom">Email</Form.Label>
                      <Form.Control 
                        type="email" 
                        name="email" 
                        value={formData.email} 
                        onChange={handleChange} 
                        isInvalid={!!errors.email} 
                        placeholder="you@example.com" 
                        required 
                        className="form-control-custom"
                        
                      />
                      <Form.Control.Feedback type="invalid">{errors.email}</Form.Control.Feedback>
                    </Col>
                    <Col md={6}>
                      <Form.Label className="form-label-custom">Phone Number</Form.Label>
                      <Form.Control 
                        name="phone" 
                        value={formData.phone} 
                        onChange={handleChange} 
                        isInvalid={!!errors.phone} 
                        placeholder="10-digit number" 
                        required 
                        className="form-control-custom"
                        
                      />
                      <Form.Control.Feedback type="invalid">{errors.phone}</Form.Control.Feedback>
                    </Col>
                    <Col md={6}>
                      <Form.Label className="form-label-custom">Aadhaar Number</Form.Label>
                      <Form.Control 
                        name="aadhaarNumber" 
                        value={formData.aadhaarNumber} 
                        onChange={handleChange} 
                        isInvalid={!!errors.aadhaarNumber} 
                        placeholder="12-digit Aadhaar" 
                        required 
                        className="form-control-custom"
                        
                      />
                      <Form.Control.Feedback type="invalid">{errors.aadhaarNumber}</Form.Control.Feedback>
                    </Col>
                    <Col md={12}>
                      <Form.Label className="form-label-custom">Full Address</Form.Label>
                      <Form.Control 
                        name="address" 
                        value={formData.address} 
                        onChange={handleChange} 
                        isInvalid={!!errors.address} 
                        placeholder="Street, Area, Landmark" 
                        required 
                        className="form-control-custom"
                      />
                      <Form.Control.Feedback type="invalid">{errors.address}</Form.Control.Feedback>
                    </Col>
                    <Col md={4}>
                      <Form.Label className="form-label-custom">State</Form.Label>
                      <Form.Control 
                        name="state" 
                        value={formData.state} 
                        onChange={handleChange} 
                        isInvalid={!!errors.state} 
                        required 
                        className="form-control-custom"
                      />
                      <Form.Control.Feedback type="invalid">{errors.state}</Form.Control.Feedback>
                    </Col>
                    <Col md={4}>
                      <Form.Label className="form-label-custom">District</Form.Label>
                      <Form.Control 
                        name="district" 
                        value={formData.district} 
                        onChange={handleChange} 
                        isInvalid={!!errors.district} 
                        required 
                        className="form-control-custom"
                      />
                      <Form.Control.Feedback type="invalid">{errors.district}</Form.Control.Feedback>
                    </Col>
                    <Col md={4}>
                      <Form.Label className="form-label-custom">Pincode</Form.Label>
                      <Form.Control 
                        name="pincode" 
                        value={formData.pincode} 
                        onChange={handleChange} 
                        isInvalid={!!errors.pincode} 
                        required 
                        className="form-control-custom"
                      />
                      <Form.Control.Feedback type="invalid">{errors.pincode}</Form.Control.Feedback>
                    </Col>
                    {/* <Col md={4}>
                      <Form.Label className="form-label-custom">Enter User Id </Form.Label>
                      <Form.Control 
                        name="forUserId" 
                        value={formData.forUserId} 
                        onChange={handleChange} 
                        isInvalid={!!errors.forUserId} 
                        required 
                        className="form-control-custom"
                      />
                      <Form.Control.Feedback type="invalid">{errors.forUserId}</Form.Control.Feedback>
                    </Col> */}
                    <Col md={6}>
                      <Form.Label className="form-label-custom">Insurance Type</Form.Label>
                      <Form.Select 
                        name="insuranceType" 
                        value={formData.insuranceType} 
                        onChange={handleChange} 
                        isInvalid={!!errors.insuranceType} 
                        required 
                        className="form-control-custom"
                      >
                        <option value="">-- Select --</option>
                        <option value="Health">Health</option>
                        <option value="Accident">Accident</option>
                        <option value="Life">Life</option>
                      </Form.Select>
                      <Form.Control.Feedback type="invalid">{errors.insuranceType}</Form.Control.Feedback>
                    </Col>
                    <Col md={6}>
                      <Form.Label className="form-label-custom">Captcha</Form.Label>
                      <div className="d-flex align-items-center mb-2">
                        <div className="captcha-display">{captchaCode}</div>
                        <Button 
                          variant="outline-secondary" 
                          size="sm" 
                          onClick={generateCaptcha}
                          className="captcha-refresh"
                        >
                          <i className="fas fa-sync-alt"></i>
                        </Button>
                      </div>
                      <Form.Control 
                        name="captcha" 
                        value={formData.captcha} 
                        onChange={handleChange} 
                        isInvalid={!!errors.captcha} 
                        placeholder="Enter captcha" 
                        required 
                        className="form-control-custom"
                      />
                      <Form.Control.Feedback type="invalid">{errors.captcha}</Form.Control.Feedback>
                    </Col>
                  </Row>

                  <h5 className="section-subtitle mb-3">Upload Required Documents</h5>
                  
                  <Row className="g-3 mb-4">
                    <Col md={3}>
                      <div className="file-upload-card">
                        <Form.Label className="form-label-custom">ID Proof *</Form.Label>
                        <div className="file-input-container">
                          <Form.Control 
                            type="file" 
                            name="id_proof" 
                            onChange={handleChange} 
                            isInvalid={!!errors.id_proof} 
                            required 
                            className="file-input-custom"
                          />
                          <i className="fas fa-upload file-upload-icon"></i>
                        </div>
                        <Form.Control.Feedback type="invalid">{errors.id_proof}</Form.Control.Feedback>
                      </div>
                    </Col>
                    <Col md={3}>
                      <div className="file-upload-card">
                        <Form.Label className="form-label-custom">Passport Photo *</Form.Label>
                        <div className="file-input-container">
                          <Form.Control 
                            type="file" 
                            name="passport_photo" 
                            onChange={handleChange} 
                            isInvalid={!!errors.passport_photo} 
                            required 
                            className="file-input-custom"
                          />
                          <i className="fas fa-upload file-upload-icon"></i>
                        </div>
                        <Form.Control.Feedback type="invalid">{errors.passport_photo}</Form.Control.Feedback>
                      </div>
                    </Col>
                    <Col md={3}>
                      <div className="file-upload-card">
                        <Form.Label className="form-label-custom">Medical Documents *</Form.Label>
                        <div className="file-input-container">
                          <Form.Control 
                            type="file" 
                            name="medical_documents" 
                            onChange={handleChange} 
                            isInvalid={!!errors.medical_documents} 
                            required 
                            className="file-input-custom"
                          />
                          <i className="fas fa-upload file-upload-icon"></i>
                        </div>
                        <Form.Control.Feedback type="invalid">{errors.medical_documents}</Form.Control.Feedback>
                      </div>
                    </Col>
                    <Col md={3}>
                      <div className="file-upload-card">
                        <Form.Label className="form-label-custom">Income Certificate *</Form.Label>
                        <div className="file-input-container">
                          <Form.Control 
                            type="file" 
                            name="income_certificate" 
                            onChange={handleChange} 
                            isInvalid={!!errors.income_certificate} 
                            required 
                            className="file-input-custom"
                          />
                          <i className="fas fa-upload file-upload-icon"></i>
                        </div>
                        <Form.Control.Feedback type="invalid">{errors.income_certificate}</Form.Control.Feedback>
                      </div>
                    </Col>
                  </Row>

                  <div className="text-center mt-4">
                    <Button type="submit" className="btn-primary-custom px-5 py-2">
                      <i className="fas fa-file-contract me-2"></i>
                      Pay to Submit Application
                    </Button>
                  </div>
                </Form>
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

        .form-control-custom[readonly] {
          background-color: #f9fafb;
          color: #6b7280;
        }

        .section-subtitle {
          font-size: 1.1rem;
          font-weight: 600;
          color: #374151;
          margin-bottom: 1rem;
          padding-bottom: 0.5rem;
          border-bottom: 2px solid #e5e7eb;
        }

        .captcha-display {
          background: linear-gradient(135deg, #f3f4f6, #e5e7eb);
          border-radius: 8px;
          padding: 0.5rem 1rem;
          font-weight: 700;
          font-size: 1.2rem;
          letter-spacing: 3px;
          margin-right: 0.5rem;
          min-width: 120px;
          text-align: center;
        }

        .captcha-refresh {
          border-radius: 8px;
          padding: 0.5rem;
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

        .file-upload-icon {
          background: white;
          border: 1px solid #d1d5db;
          border-radius: 8px;
          padding: 0.5rem;
          color: #6b7280;
          width: 100%;
          text-align: center;
          display: block;
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

        .btn-primary-custom:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 25px rgba(59, 130, 246, 0.5);
          background: linear-gradient(135deg, #2563eb, #1e40af);
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