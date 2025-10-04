import React, { useState, useEffect } from "react";
import { Form, Button, Col, Row, Card, Modal } from "react-bootstrap";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";


export default function Janarogycard() {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [showReceipt, setShowReceipt] = useState(false);
  const [receiptData, setReceiptData] = useState(null);
  const [captchaCode, setCaptchaCode] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    aadhar: "",
    mobile: "",
    DOB: "",
    email: "",
    gender: "",
    state: "",
    district: "",
    captcha: "",
    incomeCert: null,
    casteCert: null,
    ration_id: null,
    profilePicUser: null,
  });
  const [errors, setErrors] = useState({});
  const [exists, setExists] = useState(false);
  const [loading, setLoading] = useState(true);

  // Generate receipt from application data - moved outside useEffect
  const generateReceiptFromApplication = (application) => {
    return {
      applicationId: application.applicationId || "JAC" + Date.now().toString().slice(-8),
      submissionDate: new Date(application.createdAt || new Date()).toLocaleDateString('en-IN', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
      }),
      name: application.name,
      aadhar: application.aadhar,
      mobile: application.mobile,
      DOB: application.DOB,
      email: application.email,
      gender: application.gender,
      state: application.state,
      district: application.district,
      status: application.status || "Under Review",
      enrollmentNo: application.enrollmentNo || Math.random().toString().slice(2, 12),
      registrar: application.registrar || "Govt of " + application.state,
      enrollmentAgency: application.enrollmentAgency || "MARS Telecom Systems Pvt Ltd"
    };
  };

  // Check if user already applied
  useEffect(() => {
    async function checkExists() {
      try {
        const token = localStorage.getItem("token");
        const res = await fetch(
          "https://ruwa-backend.onrender.com/api/services/janarogya/check",
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = await res.json();
        console.log("check response:", data);

      if (data.msg === "USER ALREADY EXISTS") {
  setExists(true);
  setReceiptData(generateReceiptFromApplication(data.msg));
} else {
  setExists(false);
  setReceiptData(null); // reset receipt data if user does not exist
}

      } catch (e) {
        console.log("checkExists error:", e.message);
      } finally {
        setLoading(false);
      }
    }

    checkExists();
  }, []);

  // Generate captcha
  const generateCaptcha = () => {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let code = "";
    for (let i = 0; i < 6; i++) {
      code += chars[Math.floor(Math.random() * chars.length)];
    }
    setCaptchaCode(code);
  };

  useEffect(() => {
    generateCaptcha();
  }, []);

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
          name: user.name || "",
          mobile: user.phone || "",
          aadhar: user.aadhar || "",
          email: user.email || "",
          DOB: user.DOB || ""
        }));
      })
      .catch((err) => console.error("Profile fetch failed:", err));
  }, []);

  const cardServices = [
    {
      icon: "🪪",
      title: "Jan Arogya Card",
      description: [
        "Covers major health treatments at partnered hospitals.",
        "Easy enrollment with minimal documentation.",
        "Covers expenses up to ₹5 Lakhs per family per year.",
      ],
      bgClass: "bg-white",
    },
    {
      icon: "👨‍👩‍👧‍👦",
      title: "Jan Swabhiman Seva Card",
      description: [
        "Access to a wide range of welfare benefits.",
        "Discounts on medical services and medicines.",
        "Priority access to free ambulance services.",
      ],
      bgClass: "bg-light",
    },
    {
      icon: "📋",
      title: "Instant Registration Process",
      description: [
        "Fill in basic details and upload ID proof.",
        "Real-time verification and card issuance.",
        "Digital and physical card options available.",
      ],
      bgClass: "bg-white",
    },
    {
      icon: "🏥",
      title: "Partnered Hospitals & Clinics",
      description: [
        "More than 200 hospitals under the scheme.",
        "Cashless treatments for covered procedures.",
        "Regular health camps and wellness checkups.",
      ],
      bgClass: "bg-light",
    },
  ];

  const validate = () => {
    const errs = {};
    if (!formData.name) errs.name = "Name is required";
    if (!formData.aadhar || !/^\d{12}$/.test(formData.aadhar))
      errs.aadhar = "Aadhaar must be 12 digits";
    if (!formData.mobile || !/^\d{10}$/.test(formData.mobile))
      errs.mobile = "Valid 10-digit mobile number required";
    if (!formData.DOB) errs.DOB = "Date of Birth is required";
    if (!formData.state) errs.state = "State is required";
    if (!formData.district) errs.district = "District is required";
    if (!formData.captcha || formData.captcha !== captchaCode)
      errs.captcha = "Captcha does not match";
    if (!formData.incomeCert)
      errs.incomeCert = "Income Certificate is required";
    if (!formData.gender) errs.gender = "Gender is required";
    if (!formData.email || !/\S+@\S+\.\S+/.test(formData.email))
      errs.email = "Valid email is required";

    return errs;
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  const generateReceipt = () => {
    const applicationId = "JAC" + Date.now().toString().slice(-8);
    const submissionDate = new Date().toLocaleDateString('en-IN', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
    
    return {
      applicationId,
      submissionDate,
      name: formData.name,
      aadhar: formData.aadhar,
      mobile: formData.mobile,
      DOB: formData.DOB,
      email: formData.email,
      gender: formData.gender,
      state: formData.state,
      district: formData.district,
      status: "Under Review",
      enrollmentNo: Math.random().toString().slice(2, 12),
      registrar: "Govt of " + formData.state,
      enrollmentAgency: "MARS Telecom Systems Pvt Ltd"
    };
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length === 0) {
      const form = new FormData();
      form.append("name", formData.name);
      form.append("aadhar", formData.aadhar);
      form.append("mobile", formData.mobile);
      form.append("state", formData.state);
      form.append("district", formData.district);
      form.append("captcha", formData.captcha);
      form.append("DOB", formData.DOB);
      form.append("gender", formData.gender);
      form.append("email", formData.email);

      if (formData.incomeCert)
        form.append("income_certificate", formData.incomeCert);
      if (formData.casteCert)
        form.append("caste_certificate", formData.casteCert);
      if (formData.ration_id) form.append("ration_id", formData.ration_id);
      if (formData.profilePicUser)
        form.append("profilePicUser", formData.profilePicUser);

      try {
        const token = localStorage.getItem("token");
        const res = await fetch(
          "https://ruwa-backend.onrender.com/api/services/janarogya/user/apply",
          {
            method: "POST",
            headers: { Authorization: `Bearer ${token}` },
            body: form,
          }
        );

        const data = await res.json();
        console.log("submit response:", data);
        if (res.ok) {
          setFormSubmitted(true);
          setExists(true);
          
          const receipt = generateReceipt();
          setReceiptData(receipt);
          setShowReceipt(true);
          
          generateCaptcha();
        } else {
          alert(data.message || "Something went wrong");
        }
      } catch (err) {
        alert("Network error. Please try again.");
      }
    } else {
      setErrors(validationErrors);
    }
  };

  const handlePrintReceipt = () => {
    const receiptContent = document.getElementById('aadhaar-receipt-content');
    if (!receiptContent) return;
    
    const printWindow = window.open('', '_blank');
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
  console.log("Downloading receipt for:");
  const receiptElement = document.getElementById('aadhaar-receipt-content');
  if (!receiptElement) return;

  try {
    // Capture the receipt as a canvas
    const canvas = await html2canvas(receiptElement, { scale: 2 });
    const imgData = canvas.toDataURL('image/png');

    // Create a PDF
    const pdf = new jsPDF('p', 'mm', 'a4');
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

    pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
    pdf.save(`JanArogyaReceipt_${receiptData?.applicationId || Date.now()}.pdf`);
  } catch (err) {
    console.error("Failed to download receipt:", err);
    alert("Failed to download receipt. Please try again.");
  }
};


  const AadhaarStyleReceipt = ({ receiptData }) => {
    if (!receiptData) return null;

    return (
      <Card id="aadhaar-receipt-content" className="border-dark">
        <Card.Body className="p-4">
          <div className="receipt-header text-center mb-4 border-bottom border-dark pb-3">
            <h4 className="mb-1 fw-bold">Unique Identification Authority of India</h4>
            <h5 className="mb-0">Government of India</h5>
            <h6 className="mb-0 mt-2">Acknowledgement/Resident Copy</h6>
          </div>

          <div className="section">
            <div className="detail-row">
              <span className="detail-label">Enrolment No:</span>
              <span>{receiptData.enrollmentNo}</span>
            </div>
            <div className="detail-row">
              <span className="detail-label">Date:</span>
              <span>{receiptData.submissionDate}</span>
            </div>
            <div className="detail-row">
              <span className="detail-label">NPR Rept No:</span>
              <span>Not Given</span>
            </div>
          </div>

          <hr className="my-3" />

          <div className="section">
            <div className="detail-row">
              <span className="detail-label fw-bold">{receiptData.name} ({receiptData.gender})</span>
            </div>
            <div className="detail-row">
              <span className="detail-label">S/O:</span>
              <span>Not Given</span>
            </div>
            <div className="detail-row">
              <span className="detail-label">Address:</span>
              <span className="text-end">
                {receiptData.district}<br />
                {receiptData.state}<br />
                PIN: Not Given
              </span>
            </div>
          </div>

          <hr className="my-3" />

          <div className="section">
            <div className="detail-row">
              <span className="detail-label">Date Of Birth:</span>
              <span>{receiptData.DOB} (DECLARED)</span>
            </div>
            <div className="detail-row">
              <span className="detail-label">Mobile:</span>
              <span>{receiptData.mobile || "Not Given"}</span>
            </div>
            <div className="detail-row">
              <span className="detail-label">Email:</span>
              <span>{receiptData.email}</span>
            </div>
          </div>

          <div className="section">
            <div className="detail-row">
              <span className="detail-label">Documents:</span>
              <span>Income Certificate, Ration Card</span>
            </div>
          </div>

          <div className="section">
            <div className="detail-row">
              <span className="detail-label">Bank details:</span>
              <span>New Aadhaar enabled bank account/STATE BANK OF INDIA</span>
            </div>
          </div>

          <div className="section">
            <div className="detail-row">
              <span className="detail-label">Information Sharing Consent</span>
              <span>Yes</span>
            </div>
          </div>

          <div className="section">
            <div className="detail-row">
              <span className="detail-label">Registrar:</span>
              <span>{receiptData.registrar}</span>
            </div>
            <div className="small text-muted mt-1">
              Correction (if any) of demographic information must be made within 96 hours of enrolment
            </div>
          </div>

          <div className="section">
            <div className="detail-row">
              <span className="detail-label">Enrolment Agency:</span>
              <span>{receiptData.enrollmentAgency}</span>
            </div>
          </div>

          <div className="section text-center small">
            <p className="mb-1">
              {receiptData.status === "approved" 
                ? "Your Jan Arogya Card has been approved and will be delivered to your address mentioned on this receipt in around 60-90 days."
                : "Your Jan Arogya Card application is under review. You will receive updates on your registered mobile and email."
              }
            </p>
            <p className="mb-0">
              You can get only one Jan Arogya Card. Please do not enrol again unless asked to.
            </p>
          </div>

          <div className="section text-center small">
            <p className="mb-1">For enquiry, please contact:</p>
            <p className="mb-1">help-janarogya.gov.in</p>
            <p className="mb-1">http://www.janarogya.gov.in</p>
            <p className="mb-1">1800 180 1947</p>
            <p className="mb-0">P.O. Box #1947, New Delhi-110001</p>
          </div>

          <hr className="my-3" />
          <hr className="my-3" />

          <div className="section">
            <div className="detail-row">
              <span className="detail-label">Fingerprint quality</span>
            </div>
            <div className="detail-row">
              <span>Left Right</span>
            </div>
            <div className="detail-row small">
              <span>Good Quality fingerprint, recommended for authentication.</span>
            </div>
          </div>

          <div className="section">
            <div className="detail-row">
              <span className="detail-label">Biometrics Captured:</span>
              <span>Fingers(10), Iris(2), Face</span>
            </div>
          </div>

          <div className="signature mt-5 pt-3">
            <div className="text-center">
              <p className="mb-1 fw-bold">Veldandi Sridhar(Signature)</p>
              <p className="mb-0">Enrolment Operator</p>
            </div>
          </div>
        </Card.Body>
      </Card>
    );
  };

  if (loading) {
    return <div className="text-center py-5">Loading...</div>;
  }

  return (
    <section className="section services__v3 py-5" id="insurance">
      <div className="container">
        <div className="row g-4">
          {cardServices.map((service, index) => (
            <div className="col-12 col-md-6" key={index}>
              <div className={`service-card p-4 rounded-4 h-100 d-flex flex-column gap-3 shadow-sm ${service.bgClass}`}>
                <div className="text-center fs-2">{service.icon}</div>
                <h3 className="text-center fs-5 mb-2">{service.title}</h3>
                <ul className="ps-3 mb-0">
                  {service.description.map((point, i) => (
                    <li key={i} className="mb-2" style={{ lineHeight: "1.6" }}>
                      {point}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="container py-5">
        <h2 className="mb-4 text-center">Apply for Jan Arogya Card</h2>

        {exists && receiptData && (
          <div className="alert alert-info text-center">
            <div className="fw-semibold mb-2">
              {receiptData.status === "approved" 
                ? "✅ Your Jan Arogya Card has been approved!"
                : "📋 Your application is under review."
              }
            </div>
            <Button 
              variant="success" 
              onClick={() => setShowReceipt(true)}
              className="me-2"
            >
              View Receipt
            </Button>
            <Button 
              variant="outline-primary" 
              onClick={()=>handleDownloadReceipt()}
            >
              Download Receipt
            </Button>
          </div>
        )}

        {formSubmitted && !showReceipt && (
          <div className="alert alert-success text-center fw-semibold" role="alert">
            ✅ Jan Arogya card application submitted successfully!
          </div>
        )}

       <Modal 
  show={showReceipt} 
  onHide={() => setShowReceipt(false)} 
  size="lg" 
  centered
>
  <Modal.Header closeButton>
    <Modal.Title>Jan Arogya Card Application Receipt</Modal.Title>
  </Modal.Header>
  <Modal.Body>
    <AadhaarStyleReceipt receiptData={receiptData} />
  </Modal.Body>
  <Modal.Footer>
    <Button 
      variant="secondary" 
      onClick={() => setShowReceipt(false)}
    >
      Close
    </Button>
    <Button 
      variant="primary" 
      onClick={handleDownloadReceipt}
    >
      Download Receipt
    </Button>
    <Button 
      variant="success" 
      onClick={handlePrintReceipt}
    >
      Print Receipt
    </Button>
  </Modal.Footer>
</Modal>

        {!exists ? (
          <Form onSubmit={handleSubmit} noValidate>
            <Row className="g-3">
              <Col md={6}>
                <Form.Label>Full Name</Form.Label>
                <Form.Control
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  isInvalid={!!errors.name}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.name}
                </Form.Control.Feedback>
              </Col>
              <Col md={6}>
                <Form.Label>Aadhaar Number</Form.Label>
                <Form.Control
                  name="aadhar"
                  value={formData.aadhar}
                  onChange={handleChange}
                  isInvalid={!!errors.aadhar}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.aadhar}
                </Form.Control.Feedback>
              </Col>

              <Col md={6}>
                <Form.Label>Mobile Number</Form.Label>
                <Form.Control
                  readOnly
                  name="mobile"
                  value={formData.mobile}
                  onChange={handleChange}
                  isInvalid={!!errors.mobile}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.mobile}
                </Form.Control.Feedback>
              </Col>
              <Col md={6}>
                <Form.Label>Date of Birth</Form.Label>
                <Form.Control
                  type="date"
                  name="DOB"
                  value={formData.DOB}
                  onChange={handleChange}
                  isInvalid={!!errors.DOB}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.DOB}
                </Form.Control.Feedback>
              </Col>

              <Col md={6}>
                <Form.Label>Gender</Form.Label>
                <Form.Select
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                  isInvalid={!!errors.gender}
                >
                  <option value="">Select Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </Form.Select>
                <Form.Control.Feedback type="invalid">
                  {errors.gender}
                </Form.Control.Feedback>
              </Col>
              <Col md={6}>
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  isInvalid={!!errors.email}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.email}
                </Form.Control.Feedback>
              </Col>

              <Col md={6}>
                <Form.Label>State</Form.Label>
                <Form.Control
                  name="state"
                  value={formData.state}
                  onChange={handleChange}
                  isInvalid={!!errors.state}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.state}
                </Form.Control.Feedback>
              </Col>
              <Col md={6}>
                <Form.Label>District</Form.Label>
                <Form.Control
                  name="district"
                  value={formData.district}
                  onChange={handleChange}
                  isInvalid={!!errors.district}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.district}
                </Form.Control.Feedback>
              </Col>
              <Col md={6}>
                <Form.Label>Captcha Code</Form.Label>
                <div className="d-flex align-items-center mb-2">
                  <div
                    className="bg-light border rounded px-3 py-2 me-2 fw-bold fs-5"
                    style={{ letterSpacing: "3px" }}
                  >
                    {captchaCode}
                  </div>
                  <Button
                    variant="outline-secondary"
                    size="sm"
                    onClick={generateCaptcha}
                  >
                    ⟳
                  </Button>
                </div>
                <Form.Control
                  name="captcha"
                  value={formData.captcha}
                  onChange={handleChange}
                  isInvalid={!!errors.captcha}
                  placeholder="Enter captcha"
                  required
                />
                <Form.Control.Feedback type="invalid">
                  {errors.captcha}
                </Form.Control.Feedback>
              </Col>
            </Row>

            <Row className="mt-4">
              <Col md={4}>
                <Form.Label>Income Certificate</Form.Label>
                <Form.Control
                  type="file"
                  name="incomeCert"
                  onChange={handleChange}
                  isInvalid={!!errors.incomeCert}
                  required
                />
                <Form.Control.Feedback type="invalid">
                  {errors.incomeCert}
                </Form.Control.Feedback>
              </Col>
              <Col md={4}>
                <Form.Label>Caste Certificate (Optional)</Form.Label>
                <Form.Control
                  type="file"
                  name="casteCert"
                  onChange={handleChange}
                />
              </Col>
              <Col md={4}>
                <Form.Label>Ration Card / Family ID</Form.Label>
                <Form.Control
                  type="file"
                  name="ration_id"
                  onChange={handleChange}
                />
              </Col>
            </Row>
            <Row className="mt-4">
              <Col md={6}>
                <Form.Label>Profile Picture</Form.Label>
                <Form.Control
                  type="file"
                  accept="image/*"
                  name="profilePicUser"
                  onChange={handleChange}
                />
              </Col>
            </Row>

            <div className="text-center mt-4">
              <Button type="submit" className="btn btn-primary px-5">
                Apply Now
              </Button>
            </div>
          </Form>
        ) : null}
      </div>
    </section>
  );
}