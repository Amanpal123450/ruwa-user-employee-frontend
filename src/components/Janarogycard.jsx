
import React, { useState, useEffect } from "react";
import { Form, Button, Col, Row } from "react-bootstrap";

export default function Janarogycard() {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [captchaCode, setCaptchaCode] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    aadhar: "",
    mobile: "",
      DOB: "", // ✅ Added DOB
       email: "",   // ✅ new field
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

      // ✅ agar application object mila to user already applied
      if (data.application) {
        setExists(true);
      } else {
        setExists(false);
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
  if (!token) return; // ✅ skip if not logged in

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
        email:user.email || "",
        DOB:user.DOB
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

  // Validation
  const validate = () => {
    const errs = {};
    if (!formData.name) errs.name = "Name is required";
    if (!formData.aadhar || !/^\d{12}$/.test(formData.aadhar))
      errs.aadhar = "Aadhaar must be 12 digits";
    if (!formData.mobile || !/^\d{10}$/.test(formData.mobile))
      errs.mobile = "Valid 10-digit mobile number required";
      if (!formData.DOB) errs.DOB = "Date of Birth is required"; // ✅ DOB validation
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

  // Handle input
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  // Submit form
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

      if (formData.incomeCert)
        form.append("income_certificate", formData.incomeCert);
      if (formData.casteCert)
        form.append("caste_certificate", formData.casteCert);
      if (formData.ration_id) form.append("ration_id", formData.ration_id);
      if (formData.profilePicUser)
  form.append("profilePicUser", formData.profilePicUser);
form.append("DOB", formData.DOB);
form.append("gender", formData.gender);
form.append("email", formData.email);



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
          setExists(true); // ✅ mark that user has applied
          setTimeout(() => setFormSubmitted(false), 4000);
          generateCaptcha();
          setFormData({
            name: "",
            aadhar: "",
            mobile: "",
            state: "",
            district: "",
            captcha: "",
            incomeCert: null,
            casteCert: null,
            ration_id: null,
          });
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

  // Conditional Rendering
 

  // Render
  return (
    <section className="section services__v3 py-5" id="insurance">
      <div className="container">
        <div className="row g-4">
          {cardServices.map((service, index) => (
            <div
              className="col-12 col-md-6"
              data-aos="fade-up"
              data-aos-delay={index * 200}
              key={index}
            >
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

        {formSubmitted && (
          <div
            className="alert alert-success text-center fw-semibold"
            role="alert"
          >
            ✅ Ayushman card application submitted successfully!
          </div>
        )}

        {/* ✅ Only this part is conditionally rendered */}
        {exists ? (
          <div className="alert alert-warning text-center fw-semibold">
            ⚠️ You have already applied for Jan Arogya Card.
          </div>
        ) : (
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
                  isInvalid={!errors.captcha}
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
                  isInvalid={!errors.incomeCert}
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
        )}
      </div>
    </section>
  );
}

