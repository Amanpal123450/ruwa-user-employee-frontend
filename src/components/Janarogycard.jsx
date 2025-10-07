import React, { useState, useEffect } from "react";
import { Form, Button, Col, Row, Card, Modal } from "react-bootstrap";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

export default function Janarogycard() {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [showReceipt, setShowReceipt] = useState(false);
  const [receiptData, setReceiptData] = useState(null);
  const [captchaCode, setCaptchaCode] = useState("");
  const [applicationId, setApplicationId] = useState("");
  const [submissionDate, setSubmissionDate] = useState("");
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
      applicationId:
        application.applicationId || "JAC" + Date.now().toString().slice(-8),
      submissionDate: new Date(
        application.createdAt || new Date()
      ).toLocaleDateString("en-IN", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
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
      enrollmentNo:
        application.enrollmentNo || Math.random().toString().slice(2, 12),
      registrar: application.registrar || "Govt of " + application.state,
      enrollmentAgency:
        application.enrollmentAgency || "MARS Telecom Systems Pvt Ltd",
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
          setReceiptData(data.application);
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
          DOB: user.DOB || "",
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

  const generateReceipt = (data) => {
    setReceiptData(data);
    return {
      message: "Application submitted successfully",
      applicationId: data.reciept?.applicationId || applicationId,
      submissionDate: data.reciept?.submissionDate || submissionDate,
      name: data.name,
      aadhar: data.aadhar,
      mobile: data.mobile,
      DOB: new Date(data.DOB).toLocaleDateString("en-IN"),
      email: data.email,
      gender: data.gender,
      state: data.state,
      district: data.district,
      status: data.status || "Under Review",
      registrar: "Govt of " + data.state,
      enrollmentNo: Math.random().toString().slice(2, 12),
      enrollmentAgency: "MARS Telecom Systems Pvt Ltd",
      Qr: data.Qr, // include QR from backend if exists
    };
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length === 0) {
      const ida = "JAC" + Date.now().toString().slice(-8);
      setApplicationId(ida);
      console.log(ida);
      const sd = new Date().toLocaleDateString("en-IN", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      });
      setSubmissionDate(sd);
      console.log(sd);
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
      form.append("applicationId", applicationId);
      form.append("submissionDate", submissionDate);

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

          const receipt = generateReceipt(data.app);
          // setReceiptData(receipt);
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
    if (!receiptData) return null;

    console.log(receiptData);

    return (
      <div id="aadhaar-receipt-content">
      <div className="max-w-3xl mx-auto bg-white shadow-lg p-8">
        <div className="border-2 border-black">
          {/* Header */}
          <div className="border-b-2 border-black p-4">
            <div className="flex items-start gap-4">
              <img
                src="https://res.cloudinary.com/dknrega1a/image/upload/v1759834087/WhatsApp_Image_2025-10-06_at_22.00.12_88b58360_cslogj.jpg"
                alt="UIDAI Logo"
                className="w-16 h-16"
              />
              <div className="flex-1 text-center">
                <h1 className="text-xl font-bold">
                  Unique Identification Authority of India
                </h1>
                <h2 className="text-base font-semibold">
                  भारतीय विशिष्ट पहचान प्राधिकरण
                </h2>
                <p className="text-sm">Government of India / भारत सरकार</p>
              </div>
              <div className="w-16"></div>
            </div>
            <h3 className="text-center font-bold mt-2 uppercase">
              ACKNOWLEDGEMENT / RESIDENT COPY
            </h3>
          </div>

          {/* Main Content */}
          <div className="p-4">
            {/* Enrollment Details Table */}
            <div className="mb-4">
              <table className="w-full text-sm border-collapse">
                <tbody>
                  <tr className="border-b border-gray-400">
                    <td className="py-2 font-semibold w-1/3">Enrolment No:</td>
                    <td className="py-2">{receiptData.enrollmentNo}</td>
                    <td className="py-2 text-right align-top" rowSpan="5">
                      <div className="flex flex-col items-center gap-2 ml-auto">
                        {/* User Profile Photo */}
                        <div className="border-2 border-black w-24 h-24 overflow-hidden rounded">
                          <img
                            src={
                              receiptData.profilePicUser ||
                              "https://via.placeholder.com/96"
                            }
                            alt="User Photo"
                            className="w-full h-full object-cover"
                          />
                        </div>
                      </div>
                    </td>
                  </tr>
                  <tr className="border-b border-gray-400">
                    <td className="py-2 font-semibold">NPR Rept No:</td>
                    <td className="py-2">
                      {receiptData.reciept?.applicationId || "Not Given"}
                    </td>
                  </tr>
                  <tr className="border-b border-gray-400">
                    <td className="py-2 font-semibold">S/O:</td>
                    <td className="py-2">Not Given</td>
                  </tr>
                  <tr className="border-b border-gray-400">
                    <td className="py-2 font-semibold">Address:</td>
                    <td className="py-2">{receiptData.district} , {receiptData.state}</td>
                  </tr>
                  <tr className="border-b border-gray-400">
                    <td className="py-2 font-semibold">Date of Birth:</td>
                    <td className="py-2" colSpan="2">
                     {new Date(receiptData.DOB).toISOString().split('T')[0].split('-').reverse().join('-')}

                    </td>
                  </tr>
                  <tr className="border-b border-gray-400">
                    <td className="py-2 font-semibold">Mobile:</td>
                    <td className="py-2" colSpan="2">
                      {receiptData.mobile || "Not Given"}
                    </td>
                  </tr>
                  <tr className="border-b border-gray-400">
                    <td className="py-2 font-semibold">Email:</td>
                    <td className="py-2 break-all" colSpan="2">
                      {receiptData.email}
                    </td>
                  </tr>
                  <tr className="border-b border-gray-400">
                    <td className="py-2 font-semibold">Documents:</td>
                    <td className="py-2" colSpan="2">
                      Income Certificate, Ration Card
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Biometric Information */}
            <div className="mb-4 pb-3 border-b-2 border-black">
              <h4 className="font-bold mb-2">Biometric Information</h4>
              <div className="text-sm mb-2">
                <span className="font-semibold">Fingerprint quality:</span>{" "}
                Left: ✓ Right: ✓
              </div>
              <div className="text-sm mb-2 ml-32">
                ✓ Good Quality fingerprint, recommended for authentication.
              </div>
              <div className="text-sm">
                <span className="font-semibold">Biometrics Captured:</span>{" "}
                Fingers(10), Iris(2), Face
              </div>
            </div>

            {/* Bank Details */}
            <div className="mb-4 pb-3 border-b border-gray-400">
              <table className="w-full text-sm">
                <tbody>
                  <tr>
                    <td className="py-1 font-semibold w-1/3">Bank Details:</td>
                    <td className="py-1">
                      New Aadhaar enabled bank account/STATE BANK OF INDIA
                    </td>
                  </tr>
                  <tr>
                    <td className="py-1 font-semibold">
                      Information Sharing Consent:
                    </td>
                    <td className="py-1">Yes</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Registrar Info */}
            <div className="bg-yellow-100 p-3 mb-4">
              <table className="w-full text-sm">
                <tbody>
                  <tr>
                    <td className="py-1 font-semibold w-1/3">Registrar:</td>
                    <td className="py-1">Govt of undefined</td>
                  </tr>
                  <tr>
                    <td className="py-1 font-semibold">Enrolment Agency:</td>
                    <td className="py-1">MARS Telecom Systems Pvt Ltd</td>
                  </tr>
                </tbody>
              </table>
              <p className="text-xs text-center mt-2">
                A Correction (if any) of demographic information must be made
                within 96 hours of enrolment
              </p>
            </div>

            {/* Status Message */}
            <div
              className={`p-3 mb-4 border ${
                receiptData.status === "approved"
                  ? "bg-green-50 border-green-600"
                  : "bg-blue-50 border-blue-600"
              }`}
            >
              <p className="text-sm text-center">
                {receiptData.status === "approved"
                  ? "Your Jan Arogya Card has been approved and will be delivered to your address mentioned on this receipt in around 60-90 days. You can get only one Jan Arogya Card. Please do not enrol again unless asked to."
                  : "Your Jan Arogya Card application is under review. You will receive updates on your registered mobile and email. You can get only one Jan Arogya Card. Please do not enrol again unless asked to."}
              </p>
            </div>

            {/* Footer with QR and Contact */}
            <div className="flex justify-between items-end">
              <div className="text-xs">
                <p className="font-bold mb-1">For enquiry, please contact:</p>
                <p>help-janarogya.gov.in</p>
                <p>http://www.janarogya.gov.in</p>
                <p>1800 180 1947</p>
                <p className="mt-2 text-gray-600">
                  This is a computer-generated acknowledgement and does not
                  require a physical signature.
                </p>
              </div>
              <div className="flex flex-col items-center">
                <div className="border border-gray-400 p-1 w-24 h-24 flex items-center justify-center bg-white">
                  <img
                    src={receiptData.Qr}
                    alt="QR Code"
                    className="w-full h-full object-contain"
                  />
                </div>
                <div className="text-xs text-center font-semibold">
                  <div>Veldandi Sridhar</div>
                  <div className="text-gray-600">(Authorized Signature)</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      </div>
    );
  };

  // Example usage with sample data

  // Demo with sample data
  const Demo = () => {
    const sampleData = {
      enrollmentNo: "1234/56789/01234",
      submissionDate: "04/10/2025",
      name: "RAJESH KUMAR SHARMA",
      gender: "Male",
      district: "Ghaziabad",
      state: "Uttar Pradesh",
      DOB: "15/08/1985",
      mobile: "+91 98765 43210",
      email: "rajesh.sharma@email.com",
      registrar: "Ministry of Health and Family Welfare",
      enrollmentAgency: "Jan Arogya Seva Kendra, Ghaziabad",
      status: "approved",
    };

    return (
      <div className="min-h-screen bg-gray-200 p-8">
        <AadhaarStyleReceipt receiptData={sampleData} />
      </div>
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
              <div
                className={`service-card p-4 rounded-4 h-100 d-flex flex-column gap-3 shadow-sm ${service.bgClass}`}
              >
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
                : "📋 Your application is under review."}
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
              onClick={() => handleDownloadReceipt()}
            >
              Download Receipt
            </Button>
          </div>
        )}

        {formSubmitted && !showReceipt && (
          <div
            className="alert alert-success text-center fw-semibold"
            role="alert"
          >
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
            <Button variant="secondary" onClick={() => setShowReceipt(false)}>
              Close
            </Button>
            <Button variant="primary" onClick={handleDownloadReceipt}>
              Download Receipt
            </Button>
            <Button variant="success" onClick={handlePrintReceipt}>
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
