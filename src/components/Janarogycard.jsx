import React, { useState, useEffect } from "react";
import { Form, Button, Col, Row, Card, Modal } from "react-bootstrap";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";


export default function Janarogycard() {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [showReceipt, setShowReceipt] = useState(false);
  const [receiptData, setReceiptData] = useState(null);
  const [captchaCode, setCaptchaCode] = useState("");
  const[applicationId,setApplicationId]=useState("");
  const [submissionDate,setSubmissionDate]=useState("")
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

  const generateReceipt = (data) => {
       setReceiptData(data);
  return {
    message: "Application submitted successfully",
    applicationId: data.reciept?.applicationId || applicationId,
    submissionDate: data.reciept?.submissionDate || submissionDate,
    name: data.name,
    aadhar: data.aadhar,
    mobile: data.mobile,
    DOB: new Date(data.DOB).toLocaleDateString('en-IN'),
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
        setApplicationId(ida)
        console.log(ida)
    const sd = new Date().toLocaleDateString('en-IN', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
    setSubmissionDate(sd)
    console.log(sd)
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
  console.log("Downloading full receipt...");

  const receiptElement = document.getElementById("aadhaar-receipt-content");
  if (!receiptElement) {
    alert("Receipt not found!");
    return;
  }

  try {
    // Capture receipt as high-quality canvas
    const canvas = await html2canvas(receiptElement, {
      scale: 2,
      useCORS: true,
      scrollY: 0,
      windowWidth: document.documentElement.offsetWidth,
    });

    const imgData = canvas.toDataURL("image/png");

    const pdf = new jsPDF("p", "mm", "a4");
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = pdf.internal.pageSize.getHeight();

    const imgWidth = pdfWidth;
    const imgHeight = (canvas.height * pdfWidth) / canvas.width;

    let heightLeft = imgHeight;
    let position = 0;

    // ✅ First page
    pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
    heightLeft -= pdfHeight;

    // ✅ Add new pages properly
    while (heightLeft > 0) {
      position = position - pdfHeight;
      pdf.addPage();
      pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
      heightLeft -= pdfHeight;
    }

    // ✅ Save clean file
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

  console.log(receiptData)

  return (
    <div
      id="aadhaar-receipt-content"
      className="max-w-4xl mx-auto bg-white shadow-lg"
    >
      <div className="border-4 border-gray-800 p-8">
        {/* Header */}
        <div className="text-center border-b-2 border-gray-800 pb-4 mb-6">
          <div className="flex items-center justify-center gap-3 mb-2">
            <div className="w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-xl">आ</span>
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-800">
                Unique Identification Authority of India
              </h1>
              <h2 className="text-lg font-semibold text-gray-700">
                भारतीय विशिष्ट पहचान प्राधिकरण
              </h2>
            </div>
          </div>
          <p className="text-sm text-gray-600 mt-2">
            Government of India / भारत सरकार
          </p>
          <h3 className="text-lg font-bold text-gray-800 mt-3 uppercase tracking-wide">
            Acknowledgement / Resident Copy
          </h3>
        </div>

        {/* Enrollment Details */}
        <div className="grid grid-cols-2 gap-4 mb-6 bg-gray-50 p-4 border border-gray-300">
          <div className="flex justify-between">
            <span className="font-semibold text-gray-700">Enrolment No:</span>
            <span className="font-mono text-gray-900">
              {receiptData.enrollmentNo}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="font-semibold text-gray-700">Date:</span>
            <span className="text-gray-900">{receiptData.reciept.submissionDate}</span>
          </div>
          <div className="flex justify-between col-span-2">
            <span className="font-semibold text-gray-700">NPR Rept No:</span>
            <span className="text-gray-600 italic">
              {receiptData.reciept.applicationId}
            </span>
          </div>
        </div>

        {/* Personal Info */}
        <div className="mb-6 p-4 border-2 border-gray-800 bg-blue-50">
          <div className="mb-3">
            <span className="text-xl font-bold text-gray-900 uppercase">
              {receiptData.name}
            </span>
            <span className="ml-3 text-lg text-gray-700">
              ({receiptData.gender})
            </span>
          </div>
          <div className="grid grid-cols-1 gap-2">
            <div className="flex">
              <span className="font-semibold text-gray-700 w-32">Address:</span>
              <div className="text-gray-900">
                <div>{receiptData.district}</div>
                <div>{receiptData.state}</div>
                {/* <div className="text-gray-600 italic">PIN: Not Given</div> */}
              </div>
            </div>
          </div>
        </div>

        {/* DOB + Contact */}
        <div className="grid grid-cols-1 gap-3 mb-6 p-4 bg-gray-50 border border-gray-300">
          <div className="flex justify-between">
            <span className="font-semibold text-gray-700">Date Of Birth:</span>
            <span className="text-gray-900">
              {receiptData.DOB}{" "}
              <span className="text-sm text-blue-600">(DECLARED)</span>
            </span>
          </div>
          <div className="flex justify-between">
            <span className="font-semibold text-gray-700">Mobile:</span>
            <span className="font-mono text-gray-900">
              {receiptData.mobile || "Not Given"}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="font-semibold text-gray-700">Email:</span>
            <span className="text-gray-900 break-all">{receiptData.email}</span>
          </div>
        </div>

        {/* Status Section */}
        <div
          className={`p-4 mb-6 border-2 ${
            receiptData.status === "approved"
              ? "bg-green-50 border-green-500"
              : "bg-blue-50 border-blue-500"
          }`}
        >
          <p className="text-sm text-gray-800 text-center mb-2">
            {receiptData.status === "approved"
              ? "✓ Your Jan Arogya Card has been approved and will be delivered to your address mentioned on this receipt in around 60-90 days."
              : "⏳ Your Jan Arogya Card application is under review. You will receive updates on your registered mobile and email."}
          </p>
          <p className="text-xs text-gray-700 text-center font-semibold">
            You can get only one Jan Arogya Card. Please do not enrol again
            unless asked to.
          </p>
        </div>

        {/* Footer */}
        <div className="mt-6 pt-4 border-t border-gray-300 text-center">
          <p className="text-xs text-gray-500">
            This is a computer-generated acknowledgement and does not require a
            physical signature
          </p>
        </div>
      </div>
    </div>
  );
};

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
    status: "approved"
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