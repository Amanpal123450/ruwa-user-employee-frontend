import React, { useEffect, useState } from "react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

const Empkendra = () => {
  const [verifyAadhar, setverifyAadhar] = useState("");
  const [showReceipt, setShowReceipt] = useState(false);
  const [receiptData, setReceiptData] = useState(null);
  const [formData, setFormData] = useState({
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
    businessDetails: [{ 
      companyName: "", 
      businessType: "", 
      nature: "", 
      products: "", 
      years: "", 
      employees: "", 
      turnover: "" 
    }],
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
      address: ""
    },
    siteInMind: "",
    planToRent: "",
    withinMonths: "",
    investmentRange: "",
    effortsInitiatives: "",
    reasonsForPartnership: "",
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
  const [exists, setExists] = useState(false);

  const [paymentData, setPaymentData] = useState({
    paymentId: "",
    paymentScreenshot: null,
  });

  const [paymentErrors, setPaymentErrors] = useState({});
  const [showPaymentForm, setShowPaymentForm] = useState(false);
  const [applicationId, setApplicationId] = useState(null);
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
useEffect(() => {
    async function checkExists() {
      try {
        const token = localStorage.getItem("token");
        const res = await fetch(
          "http://localhost:8000/api/services/apply-kendra/check",
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
        
      }
    }

    checkExists();
  }, []);
  const validate = () => {
    const newErrors = {};
    if (!formData.name) newErrors.name = "Full Name is required";
    if (!formData.aadhaar) newErrors.aadhaar = "Aadhaar Number is required";
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
    if (!formData.idProof) newErrors.idProof = "ID Proof is required";
    if (!formData.qualificationCertificate)
      newErrors.qualificationCertificate = "Qualification Certificate is required";
    if (!formData.financialStatement)
      newErrors.financialStatement = "Financial Statement is required";
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;

    fetch("http://localhost:8000/api/auth/profile", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => {
        const user = data?.user || {};
        setFormData((prev) => ({
          ...prev,
          name: user.name || "",
          phone: user.phone || "",
          aadhaar: user.aadhar || "",
          email: user.email || "",
          DOB: user.DOB || "",
        }));
      })
      .catch((err) => console.error("Profile fetch failed:", err));
  }, []);
  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    
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

  const appId = "FRN" + Date.now().toString().slice(-8);
  const enrollmentNo = Math.random().toString().slice(2, 12);
  const submissionDate = new Date().toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });

  setApplicationId(appId);

  if (validate()) {
    setIsLoading(true);
    try {
      const token = localStorage.getItem("token");
      const formDataToSend = new FormData();

      // add application identifiers
      formDataToSend.append("applicationId", appId);
      formDataToSend.append("enrollmentNo", enrollmentNo);
      formDataToSend.append("submissionDate", submissionDate);

      // loop through form fields
      Object.keys(formData).forEach((key) => {
        if (
          key === "educationalQualifications" ||
          key === "previousWorkExperience" ||
          key === "businessDetails" ||
          key === "professionalBackground" ||
          key === "siteDetails"
        ) {
          formDataToSend.append(key, JSON.stringify(formData[key]));
        } else if (formData[key] !== null) {
          formDataToSend.append(key, formData[key]);
        }
      });

      const res = await fetch(
        "http://localhost:8000/api/services/apply-kendra/apply",
        {
          method: "POST",
          headers: { Authorization: `Bearer ${token}` },
          body: formDataToSend,
        }
      );

      const data = await res.json();

      if (res.ok) {
        alert("Application submitted successfully! Proceed to payment.");
        setReceiptData({
  ...data.application, // take all backend values
  applicationId: appId,
  enrollmentNo,
  submissionDate,
});
        setShowPaymentForm(true);
      } else {
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


  const handlePaymentSubmit = async (e) => {
  e.preventDefault();
  if (validatePayment()) {
    try {
      const token = localStorage.getItem("token");
      const formDataToSend = new FormData();
      formDataToSend.append("paymentId", paymentData.paymentId);
      formDataToSend.append("aadhaar", formData.aadhaar);
      if (paymentData.paymentScreenshot) {
        formDataToSend.append("file", paymentData.paymentScreenshot);
      }

      const res = await fetch(
        "http://localhost:8000/api/services/apply-kendra/verify-payment",
        {
          method: "POST",
          headers: { Authorization: `Bearer ${token}` },
          body: formDataToSend,
        }
      );

      const data = await res.json();
      if (res.ok) {
        alert("Payment verified successfully!");
        setExists(true);
        setShowPaymentForm(false);
        setShowReceipt(true);
      } else {
        alert(data.message || "Payment verification failed.");
      }
    } catch (error) {
      console.error("Payment error:", error);
      alert("Network error. Please try again.");
    }
  }
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

  const handleBackToForm = () => {
    setShowPaymentForm(false);
    setPaymentData({
      paymentId: "",
      paymentScreenshot: null,
    });
    setPaymentErrors({});
  };

  const FranchiseReceipt = ({ receiptData }) => {
    if (!receiptData) return null;

    return (
      <div id="franchise-receipt-content">
        <div className="max-w-3xl mx-auto bg-white shadow-lg p-8">
          <div className="border-2 border-black">
            <div className="border-b-2 border-black p-4">
              <div className="flex items-start gap-4">
                <div className="w-16 h-16 bg-blue-100 rounded flex items-center justify-center text-2xl">
                  🏥
                </div>
                <div className="flex-1 text-center">
                  <h1 className="text-xl font-bold">Jan Arogya Kendra Franchise Authority</h1>
                  <h2 className="text-base font-semibold">जन आरोग्य केंद्र फ्रेंचाइजी प्राधिकरण</h2>
                  <p className="text-sm">Government of India / भारत सरकार</p>
                </div>
              </div>
              <h3 className="text-center font-bold mt-2 uppercase">
                FRANCHISE APPLICATION ACKNOWLEDGEMENT
              </h3>
            </div>

            <div className="p-4">
              <div className="mb-4">
                <table className="w-full text-sm border-collapse">
                  <tbody>
                    <tr className="border-b border-gray-400">
                      <td className="py-2 font-semibold w-1/3">Application No:</td>
                      <td className="py-2">{receiptData.applicationId}</td>
                    </tr>
                    <tr className="border-b border-gray-400">
                      <td className="py-2 font-semibold">Enrollment No:</td>
                      <td className="py-2">{receiptData.enrollmentNo}</td>
                    </tr>
                    <tr className="border-b border-gray-400">
                      <td className="py-2 font-semibold">Applicant Name:</td>
                      <td className="py-2">{receiptData.name}</td>
                    </tr>
                    <tr className="border-b border-gray-400">
                      <td className="py-2 font-semibold">Franchise Category:</td>
                      <td className="py-2">{receiptData.category}</td>
                    </tr>
                    <tr className="border-b border-gray-400">
                      <td className="py-2 font-semibold">Mobile:</td>
                      <td className="py-2">{receiptData.mobile}</td>
                    </tr>
                    <tr className="border-b border-gray-400">
                      <td className="py-2 font-semibold">Email:</td>
                      <td className="py-2">{receiptData.email}</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="bg-blue-50 p-3 mb-4 border border-blue-600">
                <p className="text-sm text-center">
                  Your franchise application is under review. You will receive updates on your registered mobile and email.
                </p>
              </div>

              <div className="text-xs">
                <p className="font-bold mb-1">For enquiry, please contact:</p>
                <p>help@janarogyakendra.gov.in</p>
                <p>http://www.janarogyakendra.gov.in</p>
                <p>1800 180 1947</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-3xl p-8 mb-8 text-white shadow-2xl">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div>
              <div className="inline-block bg-white/20 backdrop-blur-lg px-4 py-2 rounded-full mb-4">
                <span className="text-sm font-medium">Franchise Application 🏥</span>
              </div>
              <h1 className="text-4xl font-bold mb-2">Jan Arogya Kendra</h1>
              <p className="text-lg opacity-90">Healthcare Franchise Opportunity</p>
            </div>
            <div className="mt-4 md:mt-0">
              <div className="w-24 h-24 bg-white/20 backdrop-blur-lg rounded-full flex items-center justify-center text-5xl">
                🏥
              </div>
            </div>
          </div>
        </div>

        {/* Receipt View */}
       {showReceipt && (
  <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
    <div className="bg-white rounded-2xl max-w-5xl w-full max-h-[90vh] overflow-y-auto shadow-xl">
      {/* Header */}
      <div className="p-6 border-b flex justify-between items-center sticky top-0 bg-white z-10">
        <h3 className="text-2xl font-bold">Application Receipt</h3>
        <button
          onClick={() => setShowReceipt(false)}
          className="text-4xl leading-none text-gray-600 hover:text-black"
        >
          &times;
        </button>
      </div>

      {/* Receipt Content */}
      <div className="p-6 bg-gray-50">
        <div id="aadhaar-receipt-content">
          <div className="max-w-3xl mx-auto bg-white shadow-lg p-8 border border-gray-300">
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
                {/* Enrollment Details */}
                <div className="mb-4">
                  <table className="w-full text-sm border-collapse">
                    <tbody>
                      <tr className="border-b border-gray-400">
                        <td className="py-2 font-semibold w-1/3">Enrolment No:</td>
                        <td className="py-2">{receiptData.enrollmentNo}</td>
                        <td className="py-2 text-right align-top" rowSpan="5">
                          <div className="flex flex-col items-center gap-2 ml-auto">
                            <div className="border-2 border-black w-24 h-24 overflow-hidden rounded">
                              <img
                                src={
                                  receiptData.profilePicUser ||
                                  "https://via.placeholder.com/96"
                                }
                                alt="User"
                                className="w-full h-full object-cover"
                              />
                            </div>
                          </div>
                        </td>
                      </tr>
                      <tr className="border-b border-gray-400">
                        <td className="py-2 font-semibold">Application ID:</td>
                        <td className="py-2">{receiptData.applicationId}</td>
                      </tr>
                      <tr className="border-b border-gray-400">
                        <td className="py-2 font-semibold">Address:</td>
                        <td className="py-2">
                          {receiptData.district}, {receiptData.state}
                        </td>
                      </tr>
                      <tr className="border-b border-gray-400">
                        <td className="py-2 font-semibold">Date of Birth:</td>
                        <td className="py-2">
                          {new Date(receiptData.dob || receiptData.DOB)
                            .toISOString()
                            .split("T")[0]
                            .split("-")
                            .reverse()
                            .join("-")}
                        </td>
                      </tr>
                      <tr className="border-b border-gray-400">
                        <td className="py-2 font-semibold">Mobile:</td>
                        <td className="py-2">{receiptData.phone}</td>
                      </tr>
                      <tr className="border-b border-gray-400">
                        <td className="py-2 font-semibold">Email:</td>
                        <td className="py-2 break-all">{receiptData.email}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                {/* Status */}
                <div
                  className={`p-3 mb-4 border ${
                    receiptData.status === "APPROVED"
                      ? "bg-green-50 border-green-600"
                      : "bg-blue-50 border-blue-600"
                  }`}
                >
                  <p className="text-sm text-center">
                    {receiptData.status === "APPROVED"
                      ? "Your franchise application has been approved. Please wait for confirmation from our support team."
                      : "Your application is under review. You will receive updates on your registered email and mobile."}
                  </p>
                </div>

                {/* Footer */}
                <div className="flex justify-between items-end">
                  <div className="text-xs">
                    <p className="font-bold mb-1">For Enquiry:</p>
                    <p>help@ruwaindia.in</p>
                    <p>www.ruwaindia.in</p>
                    <p>+91 1800-XXX-XXXX</p>
                    <p className="mt-2 text-gray-600">
                      This is an auto-generated receipt — no signature required.
                    </p>
                  </div>
                  <div className="flex flex-col items-center">
                    <div className="border border-gray-400 p-1 w-24 h-24 bg-white flex items-center justify-center">
                      <img
                        src={receiptData.Qr || "https://via.placeholder.com/96"}
                        alt="QR Code"
                        className="w-full h-full object-contain"
                      />
                    </div>
                    <div className="text-xs text-center font-semibold">
                      <div>Ruwa Team</div>
                      <div className="text-gray-600">(Authorized Signature)</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Buttons */}
      <div className="p-6 border-t flex gap-4 justify-end sticky bottom-0 bg-white">
        <button
          onClick={() => setShowReceipt(false)}
          className="px-6 py-2 bg-gray-200 rounded-lg hover:bg-gray-300"
        >
          Close
        </button>
      </div>
    </div>
  </div>
)}


        {/* Franchise Info Cards */}
        {!showPaymentForm && !exists && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {franchiseInfo.map((info, index) => (
              <div key={index} className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all hover:-translate-y-2">
                <div className="text-5xl mb-4 text-center">{info.icon}</div>
                <h4 className="text-lg font-bold mb-3 text-center">{info.title}</h4>
                <ul className="space-y-2 text-sm text-gray-600">
                  {info.description.map((point, i) => (
                    <li key={i}>• {point}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        )}

        {/* Payment Form */}
        {showPaymentForm ? (
          <div className="bg-white rounded-2xl shadow-2xl">
            <div className="p-6 border-b">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-2xl font-bold">Payment Verification</h3>
                  <p className="text-gray-600 mt-1">Complete payment to finalize application</p>
                  <div className="mt-3 inline-block bg-blue-100 px-4 py-2 rounded-full">
                    <span className="font-semibold">Application ID: {applicationId}</span>
                  </div>
                </div>
                <button onClick={handleBackToForm} className="px-4 py-2 bg-gray-200 rounded-lg">← Back</button>
              </div>
            </div>

            <div className="p-6">
              <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 mb-6">
                <h5 className="font-bold mb-3">Payment Instructions</h5>
                <ol className="space-y-2 text-sm">
                  <li>1. Complete payment using the Razorpay link</li>
                  <li>2. Take a screenshot of payment confirmation</li>
                  <li>3. Enter Payment ID and upload screenshot</li>
                </ol>
                <div className="mt-4 text-center">
                  <a href="https://razorpay.me/@nhsindia" target="_blank" rel="noopener noreferrer" className="inline-block px-6 py-3 bg-green-500 text-white rounded-lg font-semibold hover:bg-green-600">
                    Open Payment Page
                  </a>
                </div>
              </div>

              <form onSubmit={handlePaymentSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label className="block font-semibold mb-2">Payment ID *</label>
                    <input
                      type="text"
                      name="paymentId"
                      value={paymentData.paymentId}
                      onChange={handlePaymentChange}
                      className={`w-full px-4 py-3 border rounded-lg ${paymentErrors.paymentId ? 'border-red-500' : 'border-gray-300'}`}
                      placeholder="Enter payment transaction ID"
                    />
                    {paymentErrors.paymentId && <p className="text-red-500 text-sm mt-1">{paymentErrors.paymentId}</p>}
                  </div>

                  <div>
                    <label className="block font-semibold mb-2">Payment Screenshot *</label>
                    <input
                      type="file"
                      name="paymentScreenshot"
                      onChange={handlePaymentChange}
                      className={`w-full px-4 py-3 border rounded-lg ${paymentErrors.paymentScreenshot ? 'border-red-500' : 'border-gray-300'}`}
                      accept=".pdf,.jpg,.jpeg,.png"
                    />
                    {paymentErrors.paymentScreenshot && <p className="text-red-500 text-sm mt-1">{paymentErrors.paymentScreenshot}</p>}
                  </div>
                </div>

                <div className="text-center">
                  <button type="submit" className="px-8 py-3 bg-green-500 text-white rounded-full font-semibold hover:bg-green-600 shadow-lg">
                    Verify Payment & Complete Application
                  </button>
                </div>
              </form>
            </div>
          </div>
        ) : !exists && (
          /* Application Form */
          <div className="bg-white rounded-2xl shadow-2xl">
            <div className="p-6 border-b">
              <h3 className="text-2xl font-bold">Franchise Application Form</h3>
              <p className="text-gray-600 mt-1">Please fill in all required information</p>
            </div>

            <div className="p-6">
              {formSubmitted && (
                <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6 text-green-800">
                  ✅ Application submitted successfully!
                </div>
              )}

              <form onSubmit={handleSubmit}>
                {/* Personal Details */}
                <div className="mb-8">
                  <h5 className="text-xl font-bold mb-4 pb-2 border-b-2">Personal Details</h5>
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                    <div>
                      <label className="block font-semibold mb-2">Title *</label>
                      <select name="title" value={formData.title} onChange={handleChange} className="w-full px-4 py-3 border border-gray-300 rounded-lg">
                        <option value="">Select</option>
                        <option value="Dr">Dr</option>
                        <option value="Mr">Mr</option>
                        <option value="Miss">Miss</option>
                        <option value="Ms">Ms</option>
                      </select>
                    </div>

                    <div className="md:col-span-3">
                      <label className="block font-semibold mb-2">Full Name *</label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className={`w-full px-4 py-3 border rounded-lg ${errors.name ? 'border-red-500' : 'border-gray-300'}`}
                        placeholder="Enter full name"
                      />
                      {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <label className="block font-semibold mb-2">Aadhaar Number *</label>
                      <input
                        type="text"
                        name="aadhaar"
                        value={formData.aadhaar}
                        onChange={handleChange}
                        className={`w-full px-4 py-3 border rounded-lg ${errors.aadhaar ? 'border-red-500' : 'border-gray-300'}`}
                        placeholder="12-digit Aadhaar number"
                      />
                      {errors.aadhaar && <p className="text-red-500 text-sm mt-1">{errors.aadhaar}</p>}
                    </div>

                    <div>
                      <label className="block font-semibold mb-2">Phone *</label>
                      <input
                        type="text"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className={`w-full px-4 py-3 border rounded-lg ${errors.phone ? 'border-red-500' : 'border-gray-300'}`}
                        placeholder="10-digit mobile number"
                      />
                      {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <label className="block font-semibold mb-2">Email</label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg"
                        placeholder="Email address"
                      />
                    </div>

                    <div>
                      <label className="block font-semibold mb-2">Date of Birth</label>
                      <input
                        type="date"
                        name="dob"
                        value={formData.dob}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg"
                      />
                    </div>
                  </div>

                  <div className="mb-4">
                    <label className="block font-semibold mb-2">Address *</label>
                    <textarea
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      rows={2}
                      className={`w-full px-4 py-3 border rounded-lg ${errors.address ? 'border-red-500' : 'border-gray-300'}`}
                      placeholder="Complete residential address"
                    />
                    {errors.address && <p className="text-red-500 text-sm mt-1">{errors.address}</p>}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block font-semibold mb-2">Gender</label>
                      <select name="gender" value={formData.gender} onChange={handleChange} className="w-full px-4 py-3 border border-gray-300 rounded-lg">
                        <option value="">Select Gender</option>
                        <option value="M">Male</option>
                        <option value="F">Female</option>
                        <option value="O">Other</option>
                      </select>
                    </div>

                    <div>
                      <label className="block font-semibold mb-2">Marital Status</label>
                      <select name="married" value={formData.married} onChange={handleChange} className="w-full px-4 py-3 border border-gray-300 rounded-lg">
                        <option value="">Select Status</option>
                        <option value="Y">Married</option>
                        <option value="N">Unmarried</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* Educational Qualifications */}
                <div className="mb-8">
                  <h5 className="text-xl font-bold mb-4 pb-2 border-b-2">Educational Qualifications</h5>
                  {formData.educationalQualifications.map((edu, index) => (
                    <div key={index} className="bg-gray-50 p-4 rounded-lg mb-4">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                          <label className="block font-semibold mb-2">Qualification</label>
                          <input
                            type="text"
                            value={edu.qualification}
                            onChange={(e) => handleTableChange(index, 'qualification', e.target.value, 'educationalQualifications')}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg"
                            placeholder="e.g., MBBS, B.Sc"
                          />
                        </div>
                        <div>
                          <label className="block font-semibold mb-2">Year</label>
                          <input
                            type="text"
                            value={edu.year}
                            onChange={(e) => handleTableChange(index, 'year', e.target.value, 'educationalQualifications')}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg"
                            placeholder="Year of completion"
                          />
                        </div>
                        <div>
                          <label className="block font-semibold mb-2">Institution</label>
                          <input
                            type="text"
                            value={edu.institution}
                            onChange={(e) => handleTableChange(index, 'institution', e.target.value, 'educationalQualifications')}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg"
                            placeholder="University/College name"
                          />
                        </div>
                      </div>
                      {formData.educationalQualifications.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeTableRow(index, 'educationalQualifications')}
                          className="mt-2 text-red-500 hover:text-red-700"
                        >
                          Remove
                        </button>
                      )}
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={() => addTableRow('educationalQualifications', { qualification: "", year: "", institution: "" })}
                    className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                  >
                    + Add Qualification
                  </button>
                </div>

                {/* Current Occupation */}
                <div className="mb-8">
                  <h5 className="text-xl font-bold mb-4 pb-2 border-b-2">Current Occupation</h5>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block font-semibold mb-2">Current Occupation</label>
                      <input
                        type="text"
                        name="currentOccupation"
                        value={formData.currentOccupation}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg"
                        placeholder="Your current occupation"
                      />
                    </div>
                    <div>
                      <label className="block font-semibold mb-2">Current Employer</label>
                      <input
                        type="text"
                        name="currentEmployer"
                        value={formData.currentEmployer}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg"
                        placeholder="Employer name"
                      />
                    </div>
                    <div>
                      <label className="block font-semibold mb-2">Designation</label>
                      <input
                        type="text"
                        name="designation"
                        value={formData.designation}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg"
                        placeholder="Your designation"
                      />
                    </div>
                  </div>
                </div>

                {/* Previous Work Experience */}
                <div className="mb-8">
                  <h5 className="text-xl font-bold mb-4 pb-2 border-b-2">Previous Work Experience</h5>
                  {formData.previousWorkExperience.map((exp, index) => (
                    <div key={index} className="bg-gray-50 p-4 rounded-lg mb-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <div>
                          <label className="block font-semibold mb-2">Period</label>
                          <input
                            type="text"
                            value={exp.period}
                            onChange={(e) => handleTableChange(index, 'period', e.target.value, 'previousWorkExperience')}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg"
                            placeholder="e.g., 2018-2020"
                          />
                        </div>
                        <div>
                          <label className="block font-semibold mb-2">Organization</label>
                          <input
                            type="text"
                            value={exp.organization}
                            onChange={(e) => handleTableChange(index, 'organization', e.target.value, 'previousWorkExperience')}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg"
                            placeholder="Organization name"
                          />
                        </div>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block font-semibold mb-2">Designation</label>
                          <input
                            type="text"
                            value={exp.designation}
                            onChange={(e) => handleTableChange(index, 'designation', e.target.value, 'previousWorkExperience')}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg"
                            placeholder="Your role"
                          />
                        </div>
                        <div>
                          <label className="block font-semibold mb-2">Responsibilities</label>
                          <input
                            type="text"
                            value={exp.responsibilities}
                            onChange={(e) => handleTableChange(index, 'responsibilities', e.target.value, 'previousWorkExperience')}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg"
                            placeholder="Key responsibilities"
                          />
                        </div>
                      </div>
                      {formData.previousWorkExperience.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeTableRow(index, 'previousWorkExperience')}
                          className="mt-2 text-red-500 hover:text-red-700"
                        >
                          Remove
                        </button>
                      )}
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={() => addTableRow('previousWorkExperience', { period: "", organization: "", designation: "", responsibilities: "" })}
                    className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                  >
                    + Add Experience
                  </button>
                </div>

                {/* Business Details */}
                <div className="mb-8">
                  <h5 className="text-xl font-bold mb-4 pb-2 border-b-2">Business Details (if applicable)</h5>
                  {formData.businessDetails.map((business, index) => (
                    <div key={index} className="bg-gray-50 p-4 rounded-lg mb-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <div>
                          <label className="block font-semibold mb-2">Company Name</label>
                          <input
                            type="text"
                            value={business.companyName}
                            onChange={(e) => handleTableChange(index, 'companyName', e.target.value, 'businessDetails')}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg"
                            placeholder="Business/Company name"
                          />
                        </div>
                        <div>
                          <label className="block font-semibold mb-2">Business Type</label>
                          <input
                            type="text"
                            value={business.businessType}
                            onChange={(e) => handleTableChange(index, 'businessType', e.target.value, 'businessDetails')}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg"
                            placeholder="Type of business"
                          />
                        </div>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <div>
                          <label className="block font-semibold mb-2">Nature</label>
                          <input
                            type="text"
                            value={business.nature}
                            onChange={(e) => handleTableChange(index, 'nature', e.target.value, 'businessDetails')}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg"
                            placeholder="Nature of business"
                          />
                        </div>
                        <div>
                          <label className="block font-semibold mb-2">Products/Services</label>
                          <input
                            type="text"
                            value={business.products}
                            onChange={(e) => handleTableChange(index, 'products', e.target.value, 'businessDetails')}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg"
                            placeholder="Products or services"
                          />
                        </div>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                          <label className="block font-semibold mb-2">Years in Operation</label>
                          <input
                            type="text"
                            value={business.years}
                            onChange={(e) => handleTableChange(index, 'years', e.target.value, 'businessDetails')}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg"
                            placeholder="Years"
                          />
                        </div>
                        <div>
                          <label className="block font-semibold mb-2">Number of Employees</label>
                          <input
                            type="text"
                            value={business.employees}
                            onChange={(e) => handleTableChange(index, 'employees', e.target.value, 'businessDetails')}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg"
                            placeholder="Employee count"
                          />
                        </div>
                        <div>
                          <label className="block font-semibold mb-2">Annual Turnover</label>
                          <input
                            type="text"
                            value={business.turnover}
                            onChange={(e) => handleTableChange(index, 'turnover', e.target.value, 'businessDetails')}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg"
                            placeholder="Turnover amount"
                          />
                        </div>
                      </div>
                      {formData.businessDetails.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeTableRow(index, 'businessDetails')}
                          className="mt-2 text-red-500 hover:text-red-700"
                        >
                          Remove
                        </button>
                      )}
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={() => addTableRow('businessDetails', { companyName: "", businessType: "", nature: "", products: "", years: "", employees: "", turnover: "" })}
                    className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                  >
                    + Add Business
                  </button>
                </div>

                {/* Professional Background */}
                <div className="mb-8">
                  <h5 className="text-xl font-bold mb-4 pb-2 border-b-2">Professional Background</h5>
                  <div className="bg-gray-50 p-4 rounded-lg mb-4">
                    <label className="block font-semibold mb-3">Select all that apply:</label>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {professionalBackgroundOptions.map((option, index) => (
                        <label key={index} className="flex items-center space-x-2">
                          <input
                            type="checkbox"
                            name="professionalBackground"
                            value={option}
                            checked={formData.professionalBackground.includes(option)}
                            onChange={handleChange}
                            className="w-5 h-5 text-blue-600"
                          />
                          <span>{option}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                  <div>
                    <label className="block font-semibold mb-2">Professional Associations</label>
                    <textarea
                      name="professionalAssociations"
                      value={formData.professionalAssociations}
                      onChange={handleChange}
                      rows={2}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg"
                      placeholder="List any professional associations or memberships"
                    />
                  </div>
                </div>

                {/* Proposed Centre Details */}
                <div className="mb-8">
                  <h5 className="text-xl font-bold mb-4 pb-2 border-b-2">Proposed Centre Details</h5>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <label className="block font-semibold mb-2">Business Structure *</label>
                      <select
                        name="businessStructure"
                        value={formData.businessStructure}
                        onChange={handleChange}
                        className={`w-full px-4 py-3 border rounded-lg ${errors.businessStructure ? 'border-red-500' : 'border-gray-300'}`}
                      >
                        <option value="">Select Structure</option>
                        <option value="Proprietorship">Proprietorship</option>
                        <option value="Partnership">Partnership</option>
                        <option value="Private Ltd.">Private Ltd.</option>
                        <option value="Public Ltd.">Public Ltd.</option>
                      </select>
                      {errors.businessStructure && <p className="text-red-500 text-sm mt-1">{errors.businessStructure}</p>}
                    </div>

                    <div>
                      <label className="block font-semibold mb-2">Franchise Category *</label>
                      <select
                        name="category"
                        value={formData.category}
                        onChange={handleChange}
                        className={`w-full px-4 py-3 border rounded-lg ${errors.category ? 'border-red-500' : 'border-gray-300'}`}
                      >
                        <option value="">Select Category</option>
                        <option value="S1">S1 (200 sq. ft)</option>
                        <option value="S2">S2 (400 sq. ft)</option>
                        <option value="S3">S3 (600 sq. ft)</option>
                      </select>
                      {errors.category && <p className="text-red-500 text-sm mt-1">{errors.category}</p>}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <label className="block font-semibold mb-2">Existing Legal Entity</label>
                      <select
                        name="existingEntity"
                        value={formData.existingEntity}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg"
                      >
                        <option value="">Select</option>
                        <option value="Yes">Yes</option>
                        <option value="No">No</option>
                      </select>
                    </div>

                    <div>
                      <label className="block font-semibold mb-2">Entity Name (if yes)</label>
                      <input
                        type="text"
                        name="existingEntityName"
                        value={formData.existingEntityName}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg"
                        placeholder="Legal entity name"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <label className="block font-semibold mb-2">Proposed City *</label>
                      <input
                        type="text"
                        name="proposedCity"
                        value={formData.proposedCity}
                        onChange={handleChange}
                        className={`w-full px-4 py-3 border rounded-lg ${errors.proposedCity ? 'border-red-500' : 'border-gray-300'}`}
                        placeholder="City/Town"
                      />
                      {errors.proposedCity && <p className="text-red-500 text-sm mt-1">{errors.proposedCity}</p>}
                    </div>

                    <div>
                      <label className="block font-semibold mb-2">State *</label>
                      <input
                        type="text"
                        name="proposedState"
                        value={formData.proposedState}
                        onChange={handleChange}
                        className={`w-full px-4 py-3 border rounded-lg ${errors.proposedState ? 'border-red-500' : 'border-gray-300'}`}
                        placeholder="State"
                      />
                      {errors.proposedState && <p className="text-red-500 text-sm mt-1">{errors.proposedState}</p>}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <label className="block font-semibold mb-2">Setup Timeline</label>
                      <input
                        type="text"
                        name="setupTimeline"
                        value={formData.setupTimeline}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg"
                        placeholder="Expected timeline for setup"
                      />
                    </div>

                    <div>
                      <label className="block font-semibold mb-2">Do you have site possession?</label>
                      <select
                        name="sitePossession"
                        value={formData.sitePossession}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg"
                      >
                        <option value="">Select</option>
                        <option value="Yes">Yes</option>
                        <option value="No">No</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* Site Details */}
                <div className="mb-8">
                  <h5 className="text-xl font-bold mb-4 pb-2 border-b-2">Site Details</h5>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <label className="block font-semibold mb-2">Agreement Type</label>
                      <select
                        value={formData.siteDetails.agreementType}
                        onChange={(e) => handleNestedChange('siteDetails', 'agreementType', e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg"
                      >
                        <option value="">Select</option>
                        <option value="Owned">Owned</option>
                        <option value="Leased">Leased</option>
                        <option value="Rented">Rented</option>
                      </select>
                    </div>

                    <div>
                      <label className="block font-semibold mb-2">Location Type</label>
                      <select
                        value={formData.siteDetails.locationType}
                        onChange={(e) => handleNestedChange('siteDetails', 'locationType', e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg"
                      >
                        <option value="">Select</option>
                        <option value="Urban">Urban</option>
                        <option value="Semi-Urban">Semi-Urban</option>
                        <option value="Rural">Rural</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                    <div>
                      <label className="block font-semibold mb-2">Lease From</label>
                      <input
                        type="date"
                        value={formData.siteDetails.leaseFrom}
                        onChange={(e) => handleNestedChange('siteDetails', 'leaseFrom', e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg"
                      />
                    </div>

                    <div>
                      <label className="block font-semibold mb-2">Lease To</label>
                      <input
                        type="date"
                        value={formData.siteDetails.leaseTo}
                        onChange={(e) => handleNestedChange('siteDetails', 'leaseTo', e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg"
                      />
                    </div>

                    <div>
                      <label className="block font-semibold mb-2">Area (sq. ft)</label>
                      <input
                        type="text"
                        value={formData.siteDetails.area}
                        onChange={(e) => handleNestedChange('siteDetails', 'area', e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg"
                        placeholder="Area in sq. ft"
                      />
                    </div>
                  </div>

                  <div className="mb-4">
                    <label className="block font-semibold mb-2">Site Address</label>
                    <textarea
                      value={formData.siteDetails.address}
                      onChange={(e) => handleNestedChange('siteDetails', 'address', e.target.value)}
                      rows={2}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg"
                      placeholder="Complete site address"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block font-semibold mb-2">Site in Mind?</label>
                      <select
                        name="siteInMind"
                        value={formData.siteInMind}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg"
                      >
                        <option value="">Select</option>
                        <option value="Yes">Yes</option>
                        <option value="No">No</option>
                      </select>
                    </div>

                    <div>
                      <label className="block font-semibold mb-2">Plan to Rent?</label>
                      <select
                        name="planToRent"
                        value={formData.planToRent}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg"
                      >
                        <option value="">Select</option>
                        <option value="Yes">Yes</option>
                        <option value="No">No</option>
                      </select>
                    </div>

                    <div>
                      <label className="block font-semibold mb-2">Within Months</label>
                      <input
                        type="text"
                        name="withinMonths"
                        value={formData.withinMonths}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg"
                        placeholder="Timeline in months"
                      />
                    </div>
                  </div>
                </div>

                {/* Investment & Partnership */}
                <div className="mb-8">
                  <h5 className="text-xl font-bold mb-4 pb-2 border-b-2">Investment & Partnership</h5>
                  <div className="mb-4">
                    <label className="block font-semibold mb-3">Investment Range *</label>
                    <div className="flex flex-wrap gap-4">
                      <label className="flex items-center space-x-2">
                        <input
                          type="radio"
                          name="investmentRange"
                          value="10-15 Lacs"
                          checked={formData.investmentRange === "10-15 Lacs"}
                          onChange={handleChange}
                          className="w-5 h-5"
                        />
                        <span>10-15 Lacs</span>
                      </label>
                      <label className="flex items-center space-x-2">
                        <input
                          type="radio"
                          name="investmentRange"
                          value="15-30 Lacs"
                          checked={formData.investmentRange === "15-30 Lacs"}
                          onChange={handleChange}
                          className="w-5 h-5"
                        />
                        <span>15-30 Lacs</span>
                      </label>
                      <label className="flex items-center space-x-2">
                        <input
                          type="radio"
                          name="investmentRange"
                          value="More than 30 Lacs"
                          checked={formData.investmentRange === "More than 30 Lacs"}
                          onChange={handleChange}
                          className="w-5 h-5"
                        />
                        <span>More than 30 Lacs</span>
                      </label>
                    </div>
                    {errors.investmentRange && <p className="text-red-500 text-sm mt-1">{errors.investmentRange}</p>}
                  </div>

                  <div className="mb-4">
                    <label className="block font-semibold mb-2">Efforts & Initiatives</label>
                    <textarea
                      name="effortsInitiatives"
                      value={formData.effortsInitiatives}
                      onChange={handleChange}
                      rows={3}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg"
                      placeholder="Describe your efforts and initiatives for healthcare"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold mb-2">Reasons for Partnership</label>
                    <textarea
                      name="reasonsForPartnership"
                      value={formData.reasonsForPartnership}
                      onChange={handleChange}
                      rows={3}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg"
                      placeholder="Why do you want to partner with Jan Arogya Kendra?"
                    />
                  </div>
                </div>

                {/* Required Documents */}
                <div className="mb-8">
                  <h5 className="text-xl font-bold mb-4 pb-2 border-b-2">Required Documents</h5>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <label className="block font-semibold mb-2">ID Proof *</label>
                      <input
                        type="file"
                        name="idProof"
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg"
                        accept=".pdf,.jpg,.jpeg,.png"
                      />
                      {formData.idProof && <p className="text-sm text-green-600 mt-1">✓ {formData.idProof.name}</p>}
                      {errors.idProof && <p className="text-red-500 text-sm mt-1">{errors.idProof}</p>}
                    </div>

                    <div className="bg-gray-50 p-4 rounded-lg">
                      <label className="block font-semibold mb-2">Qualification Certificate *</label>
                      <input
                        type="file"
                        name="qualificationCertificate"
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg"
                        accept=".pdf,.jpg,.jpeg,.png"
                      />
                      {formData.qualificationCertificate && <p className="text-sm text-green-600 mt-1">✓ {formData.qualificationCertificate.name}</p>}
                      {errors.qualificationCertificate && <p className="text-red-500 text-sm mt-1">{errors.qualificationCertificate}</p>}
                    </div>

                    <div className="bg-gray-50 p-4 rounded-lg">
                      <label className="block font-semibold mb-2">Financial Statement *</label>
                      <input
                        type="file"
                        name="financialStatement"
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg"
                        accept=".pdf,.jpg,.jpeg,.png"
                      />
                      {formData.financialStatement && <p className="text-sm text-green-600 mt-1">✓ {formData.financialStatement.name}</p>}
                      {errors.financialStatement && <p className="text-red-500 text-sm mt-1">{errors.financialStatement}</p>}
                    </div>
                  </div>
                </div>

                {/* Submit Button */}
                <div className="text-center">
                  <button
                    type="submit"
                    className="px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-full font-bold text-lg hover:from-indigo-700 hover:to-purple-700 shadow-lg transform hover:scale-105 transition-all"
                    disabled={isLoading}
                  >
                    {isLoading ? "⏳ Submitting..." : "📝 Submit Application"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Empkendra;