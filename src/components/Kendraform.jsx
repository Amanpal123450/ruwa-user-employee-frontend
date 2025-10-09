import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Empkendra = () => {
  const navigate = useNavigate();
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
    educationalQualifications: [
      { qualification: "", year: "", institution: "" },
    ],
    currentOccupation: "",
    currentEmployer: "",
    designation: "",
    previousWorkExperience: [
      { period: "", organization: "", designation: "", responsibilities: "" },
    ],
    businessDetails: [
      {
        companyName: "",
        businessType: "",
        nature: "",
        products: "",
        years: "",
        employees: "",
        turnover: "",
      },
    ],
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
    aadhaar: "",
    category: "",
    relevantExperience: "",
    idProof: null,
    qualificationCertificate: null,
    financialStatement: null,
  });

  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [exists, setExists] = useState(false);

  const [paymentData, setPaymentData] = useState({
    paymentId: "",
    paymentScreenshot: null,
  });

  const [paymentErrors, setPaymentErrors] = useState({});
  const [showPaymentForm, setShowPaymentForm] = useState(false);
  const [applicationId, setApplicationId] = useState(null);

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
    },
  ];

  // Check if user already has an application
  useEffect(() => {
    async function checkExists() {
      try {
        const token = localStorage.getItem("token");
        const res = await fetch(
          "https://ruwa-backend.onrender.com/api/services/apply-kendra/check",
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = await res.json();

        // Handle response based on msg field
        if (data.application.status === "APPROVED" ) {
          // Redirect to E-KYC if approved
          alert("Your Franchaise Application Approved Please Fill E-KYC")
          navigate(`/E-KYC?applicationId=${data.application.applicationId}`);
        } else if (data.status === "PENDING" && data.application) {
          setExists(true);
          setReceiptData(data.application);
        } else {
          setExists(false);
          setReceiptData(null);
        }
      } catch (e) {
        console.log("checkExists error:", e.message);
      }
    }

    checkExists();
  }, [navigate]);

  // Load user profile data
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
          phone: user.phone || "",
          aadhaar: user.aadhar || "",
          email: user.email || "",
          dob: user.DOB || "",
        }));
      })
      .catch((err) => console.error("Profile fetch failed:", err));
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
    if (!formData.proposedCity) newErrors.proposedCity = "City is required";
    if (!formData.proposedState) newErrors.proposedState = "State is required";
    if (!formData.category) newErrors.category = "Category is required";
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
    const { name, value, type, checked, files } = e.target;

    if (type === "checkbox") {
      if (name === "professionalBackground") {
        setFormData((prev) => {
          const updatedBackground = checked
            ? [...prev.professionalBackground, value]
            : prev.professionalBackground.filter((item) => item !== value);
          return { ...prev, professionalBackground: updatedBackground };
        });
      }
    } else if (type === "file") {
      setFormData((prev) => ({
        ...prev,
        [name]: files[0],
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
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

        formDataToSend.append("applicationId", appId);
        formDataToSend.append("enrollmentNo", enrollmentNo);
        formDataToSend.append("submissionDate", submissionDate);

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
          "https://ruwa-backend.onrender.com/api/services/apply-kendra/apply",
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
            applicationId: appId,
            enrollmentNo: enrollmentNo,
            submissionDate: submissionDate,
            name: formData.name,
            phone: formData.phone,
            email: formData.email,
            dob: formData.dob,
            category: formData.category,
            address: formData.address,
            proposedCity: formData.proposedCity,
            proposedState: formData.proposedState,
            status: data.application?.status || "PENDING",
            ...data.application,
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
          "https://ruwa-backend.onrender.com/api/services/apply-kendra/verify-payment",
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

  const downloadReceipt = () => {
    const printContent = document.getElementById("franchise-receipt-content");
    if (!printContent) return;

    const printWindow = window.open("", "", "height=600,width=800");
    printWindow.document.write("<html><head><title>Franchise Receipt</title>");
    printWindow.document.write("<style>");
    printWindow.document.write("body { font-family: Arial, sans-serif; margin: 20px; }");
    printWindow.document.write("table { width: 100%; border-collapse: collapse; }");
    printWindow.document.write("td { padding: 8px; border-bottom: 1px solid #ccc; }");
    printWindow.document.write(".header { text-align: center; margin-bottom: 20px; }");
    printWindow.document.write("</style></head><body>");
    printWindow.document.write(printContent.innerHTML);
    printWindow.document.write("</body></html>");
    printWindow.document.close();
    printWindow.focus();
    setTimeout(() => {
      printWindow.print();
      printWindow.close();
    }, 250);
  };

  const FranchiseReceipt = ({ receiptData }) => {
    if (!receiptData) return null;

    const formatDate = (dateString) => {
      if (!dateString) return "N/A";
      try {
        const date = new Date(dateString);
        return date.toLocaleDateString("en-IN", {
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
        });
      } catch {
        return dateString;
      }
    };

    return (
      <div id="franchise-receipt-content">
        <div className="max-w-3xl mx-auto bg-white shadow-lg p-8">
          <div className="border-2 border-black">
            <div className="border-b-2 border-black p-4">
              <div className="flex items-start gap-4">
                <div className="w-16 h-16 bg-blue-100 rounded flex items-center justify-center text-2xl">🏥</div>
                <div className="flex-1 text-center">
                  <h1 className="text-xl font-bold">Jan Arogya Kendra Franchise Authority</h1>
                  <h2 className="text-base font-semibold">जन आरोग्य केंद्र फ्रेंचाइजी प्राधिकरण</h2>
                  <p className="text-sm">Government of India / भारत सरकार</p>
                </div>
              </div>
              <h3 className="text-center font-bold mt-2 uppercase">FRANCHISE APPLICATION ACKNOWLEDGEMENT</h3>
            </div>

            <div className="p-4">
              <table className="w-full text-sm border-collapse mb-4">
                <tbody>
                  <tr className="border-b border-gray-400">
                    <td className="py-2 font-semibold w-1/3">Application No:</td>
                    <td className="py-2">{receiptData.applicationId || "N/A"}</td>
                  </tr>
                  <tr className="border-b border-gray-400">
                    <td className="py-2 font-semibold">Enrollment No:</td>
                    <td className="py-2">{receiptData.enrollmentNo || "N/A"}</td>
                  </tr>
                  <tr className="border-b border-gray-400">
                    <td className="py-2 font-semibold">Submission Date:</td>
                    <td className="py-2">{receiptData.submissionDate || formatDate(receiptData.createdAt)}</td>
                  </tr>
                  <tr className="border-b border-gray-400">
                    <td className="py-2 font-semibold">Applicant Name:</td>
                    <td className="py-2">{receiptData.name || "N/A"}</td>
                  </tr>
                  <tr className="border-b border-gray-400">
                    <td className="py-2 font-semibold">Franchise Category:</td>
                    <td className="py-2">{receiptData.category || "N/A"}</td>
                  </tr>
                  <tr className="border-b border-gray-400">
                    <td className="py-2 font-semibold">Mobile:</td>
                    <td className="py-2">{receiptData.phone || receiptData.mobile || "N/A"}</td>
                  </tr>
                  <tr className="border-b border-gray-400">
                    <td className="py-2 font-semibold">Email:</td>
                    <td className="py-2 break-all">{receiptData.email || "N/A"}</td>
                  </tr>
                  <tr className="border-b border-gray-400">
                    <td className="py-2 font-semibold">Date of Birth:</td>
                    <td className="py-2">{formatDate(receiptData.dob || receiptData.DOB)}</td>
                  </tr>
                  <tr className="border-b border-gray-400">
                    <td className="py-2 font-semibold">Proposed Location:</td>
                    <td className="py-2">{receiptData.proposedCity || receiptData.district || "N/A"}, {receiptData.proposedState || receiptData.state || "N/A"}</td>
                  </tr>
                  <tr className="border-b border-gray-400">
                    <td className="py-2 font-semibold">Status:</td>
                    <td className="py-2">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        receiptData.status === "APPROVED" ? "bg-green-100 text-green-800" :
                        receiptData.status === "REJECTED" ? "bg-red-100 text-red-800" :
                        "bg-yellow-100 text-yellow-800"
                      }`}>
                        {receiptData.status || "PENDING"}
                      </span>
                    </td>
                  </tr>
                </tbody>
              </table>

              <div className={`p-3 mb-4 border ${
                receiptData.status === "APPROVED" ? "bg-green-50 border-green-600" :
                receiptData.status === "REJECTED" ? "bg-red-50 border-red-600" :
                "bg-blue-50 border-blue-600"
              }`}>
                <p className="text-sm text-center">
                  {receiptData.status === "APPROVED"
                    ? "✅ Your franchise application has been approved. Complete E-KYC to proceed."
                    : receiptData.status === "REJECTED"
                    ? "❌ Your application has been rejected. Contact support for details."
                    : "⏳ Your application is under review. Updates will be sent to your registered contact."}
                </p>
              </div>

              <div className="flex justify-between items-end text-xs">
                <div>
                  <p className="font-bold mb-1">For enquiry:</p>
                  <p>📧 help@janarogyakendra.gov.in</p>
                  <p>🌐 www.janarogyakendra.gov.in</p>
                  <p>📞 1800 180 1947</p>
                  <p className="mt-2 text-gray-600">Auto-generated receipt. No signature required.</p>
                </div>
                <div className="text-right">
                  <p className="font-semibold">Application ID</p>
                  <p className="text-lg font-bold">{receiptData.applicationId || "N/A"}</p>
                </div>
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
              <div className="w-24 h-24 bg-white/20 backdrop-blur-lg rounded-full flex items-center justify-center text-5xl">🏥</div>
            </div>
          </div>
        </div>

        {showReceipt && receiptData && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl max-w-5xl w-full max-h-[90vh] overflow-y-auto shadow-xl">
              <div className="p-6 border-b flex justify-between items-center sticky top-0 bg-white z-10">
                <h3 className="text-2xl font-bold">Application Receipt</h3>
                <button onClick={() => setShowReceipt(false)} className="text-4xl leading-none text-gray-600 hover:text-black">&times;</button>
              </div>
              <div className="p-6 bg-gray-50">
                <FranchiseReceipt receiptData={receiptData} />
              </div>
              <div className="p-6 border-t flex gap-4 justify-end sticky bottom-0 bg-white">
                <button onClick={downloadReceipt} className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">📥 Download</button>
                <button onClick={() => setShowReceipt(false)} className="px-6 py-2 bg-gray-200 rounded-lg hover:bg-gray-300">Close</button>
              </div>
            </div>
          </div>
        )}

        {exists && receiptData?.status === "PENDING" && !showReceipt && (
          <div className="bg-yellow-50 border-2 border-yellow-500 rounded-2xl p-6 mb-8 text-center">
            <h3 className="text-2xl font-bold text-yellow-800 mb-2">⏳ Application Under Review</h3>
            <p className="text-gray-700 mb-4">Your franchise application is being reviewed by our team.</p>
            <p className="text-sm text-gray-600 mb-4">
              Status: <span className="font-semibold text-yellow-600">PENDING</span>
            </p>
            <div className="flex gap-4 justify-center flex-wrap">
              <button onClick={() => setShowReceipt(true)} className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 font-semibold shadow-md transition-all">
                👁 View Receipt
              </button>
              <button onClick={downloadReceipt} className="px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 font-semibold shadow-md transition-all">
                📥 Download Receipt
              </button>
            </div>
          </div>
        )}

        {exists && receiptData?.status === "REJECTED" && !showReceipt && (
          <div className="bg-red-50 border-2 border-red-500 rounded-2xl p-6 mb-8 text-center">
            <h3 className="text-2xl font-bold text-red-800 mb-2">❌ Application Rejected</h3>
            <p className="text-gray-700 mb-4">Unfortunately, your franchise application has been rejected.</p>
            <p className="text-sm text-gray-600 mb-4">Contact: help@janarogyakendra.gov.in</p>
            <div className="flex gap-4 justify-center flex-wrap">
              <button onClick={() => setShowReceipt(true)} className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 font-semibold shadow-md transition-all">
                👁 View Receipt
              </button>
              <button onClick={downloadReceipt} className="px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 font-semibold shadow-md transition-all">
                📥 Download Receipt
              </button>
            </div>
          </div>
        )}

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

        {showPaymentForm && !exists && (
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
                <button onClick={handleBackToForm} className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300">← Back</button>
              </div>
            </div>

            <div className="p-6">
              <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 mb-6">
                <h5 className="font-bold mb-3">Payment Instructions</h5>
                <ol className="space-y-2 text-sm">
                  <li>1. Complete payment using the Razorpay link</li>
                  <li>2. Take screenshot of payment confirmation</li>
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
                    <input type="text" name="paymentId" value={paymentData.paymentId} onChange={handlePaymentChange}
                      className={`w-full px-4 py-3 border rounded-lg ${paymentErrors.paymentId ? "border-red-500" : "border-gray-300"}`}
                      placeholder="Enter payment transaction ID" />
                    {paymentErrors.paymentId && <p className="text-red-500 text-sm mt-1">{paymentErrors.paymentId}</p>}
                  </div>

                  <div>
                    <label className="block font-semibold mb-2">Payment Screenshot *</label>
                    <input type="file" name="paymentScreenshot" onChange={handlePaymentChange}
                      className={`w-full px-4 py-3 border rounded-lg ${paymentErrors.paymentScreenshot ? "border-red-500" : "border-gray-300"}`}
                      accept="image/*,.pdf" />
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
        )}

        {!showPaymentForm && !exists && (
          <div className="bg-white rounded-2xl shadow-2xl">
            <div className="p-6 border-b">
              <h3 className="text-2xl font-bold">Franchise Application Form</h3>
              <p className="text-gray-600 mt-1">Please fill in all required information</p>
            </div>

            <div className="p-6">
              <form onSubmit={handleSubmit}>
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
                      <input type="text" name="name" value={formData.name} onChange={handleChange}
                        className={`w-full px-4 py-3 border rounded-lg ${errors.name ? "border-red-500" : "border-gray-300"}`}
                        placeholder="Enter full name" />
                      {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <label className="block font-semibold mb-2">Aadhaar Number *</label>
                      <input type="text" name="aadhaar" value={formData.aadhaar} onChange={handleChange}
                        className={`w-full px-4 py-3 border rounded-lg ${errors.aadhaar ? "border-red-500" : "border-gray-300"}`}
                        placeholder="12-digit Aadhaar number" />
                      {errors.aadhaar && <p className="text-red-500 text-sm mt-1">{errors.aadhaar}</p>}
                    </div>

                    <div>
                      <label className="block font-semibold mb-2">Phone *</label>
                      <input type="text" name="phone" value={formData.phone} onChange={handleChange}
                        className={`w-full px-4 py-3 border rounded-lg ${errors.phone ? "border-red-500" : "border-gray-300"}`}
                        placeholder="10-digit mobile number" />
                      {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <label className="block font-semibold mb-2">Email</label>
                      <input type="email" name="email" value={formData.email} onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg" placeholder="Email address" />
                    </div>

                    <div>
                      <label className="block font-semibold mb-2">Date of Birth</label>
                      <input type="date" name="dob" value={formData.dob} onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg" />
                    </div>
                  </div>

                  <div className="mb-4">
                    <label className="block font-semibold mb-2">Address *</label>
                    <textarea name="address" value={formData.address} onChange={handleChange} rows={2}
                      className={`w-full px-4 py-3 border rounded-lg ${errors.address ? "border-red-500" : "border-gray-300"}`}
                      placeholder="Complete residential address" />
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

                <div className="mb-8">
                  <h5 className="text-xl font-bold mb-4 pb-2 border-b-2">Proposed Centre Details</h5>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <label className="block font-semibold mb-2">Business Structure *</label>
                      <select name="businessStructure" value={formData.businessStructure} onChange={handleChange}
                        className={`w-full px-4 py-3 border rounded-lg ${errors.businessStructure ? "border-red-500" : "border-gray-300"}`}>
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
                      <select name="category" value={formData.category} onChange={handleChange}
                        className={`w-full px-4 py-3 border rounded-lg ${errors.category ? "border-red-500" : "border-gray-300"}`}>
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
                      <label className="block font-semibold mb-2">Proposed City *</label>
                      <input type="text" name="proposedCity" value={formData.proposedCity} onChange={handleChange}
                        className={`w-full px-4 py-3 border rounded-lg ${errors.proposedCity ? "border-red-500" : "border-gray-300"}`}
                        placeholder="City/Town" />
                      {errors.proposedCity && <p className="text-red-500 text-sm mt-1">{errors.proposedCity}</p>}
                    </div>

                    <div>
                      <label className="block font-semibold mb-2">State *</label>
                      <input type="text" name="proposedState" value={formData.proposedState} onChange={handleChange}
                        className={`w-full px-4 py-3 border rounded-lg ${errors.proposedState ? "border-red-500" : "border-gray-300"}`}
                        placeholder="State" />
                      {errors.proposedState && <p className="text-red-500 text-sm mt-1">{errors.proposedState}</p>}
                    </div>
                  </div>

                  <div className="mb-4">
                    <label className="block font-semibold mb-3">Investment Range *</label>
                    <div className="flex flex-wrap gap-4">
                      <label className="flex items-center space-x-2">
                        <input type="radio" name="investmentRange" value="10-15 Lacs" checked={formData.investmentRange === "10-15 Lacs"} onChange={handleChange} className="w-5 h-5" />
                        <span>10-15 Lacs</span>
                      </label>
                      <label className="flex items-center space-x-2">
                        <input type="radio" name="investmentRange" value="15-30 Lacs" checked={formData.investmentRange === "15-30 Lacs"} onChange={handleChange} className="w-5 h-5" />
                        <span>15-30 Lacs</span>
                      </label>
                      <label className="flex items-center space-x-2">
                        <input type="radio" name="investmentRange" value="More than 30 Lacs" checked={formData.investmentRange === "More than 30 Lacs"} onChange={handleChange} className="w-5 h-5" />
                        <span>More than 30 Lacs</span>
                      </label>
                    </div>
                    {errors.investmentRange && <p className="text-red-500 text-sm mt-1">{errors.investmentRange}</p>}
                  </div>
                </div>

                <div className="mb-8">
                  <h5 className="text-xl font-bold mb-4 pb-2 border-b-2">Required Documents</h5>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <label className="block font-semibold mb-2">ID Proof *</label>
                      <input type="file" name="idProof" onChange={handleChange}
                        className={`w-full px-4 py-3 border rounded-lg ${errors.idProof ? "border-red-500" : "border-gray-300"}`}
                        accept=".pdf,.jpg,.jpeg,.png" />
                      {formData.idProof && <p className="text-sm text-green-600 mt-1">✓ {formData.idProof.name}</p>}
                      {errors.idProof && <p className="text-red-500 text-sm mt-1">{errors.idProof}</p>}
                    </div>

                    <div className="bg-gray-50 p-4 rounded-lg">
                      <label className="block font-semibold mb-2">Qualification Certificate *</label>
                      <input type="file" name="qualificationCertificate" onChange={handleChange}
                        className={`w-full px-4 py-3 border rounded-lg ${errors.qualificationCertificate ? "border-red-500" : "border-gray-300"}`}
                        accept=".pdf,.jpg,.jpeg,.png" />
                      {formData.qualificationCertificate && <p className="text-sm text-green-600 mt-1">✓ {formData.qualificationCertificate.name}</p>}
                      {errors.qualificationCertificate && <p className="text-red-500 text-sm mt-1">{errors.qualificationCertificate}</p>}
                    </div>

                    <div className="bg-gray-50 p-4 rounded-lg">
                      <label className="block font-semibold mb-2">Financial Statement *</label>
                      <input type="file" name="financialStatement" onChange={handleChange}
                        className={`w-full px-4 py-3 border rounded-lg ${errors.financialStatement ? "border-red-500" : "border-gray-300"}`}
                        accept=".pdf,.jpg,.jpeg,.png" />
                      {formData.financialStatement && <p className="text-sm text-green-600 mt-1">✓ {formData.financialStatement.name}</p>}
                      {errors.financialStatement && <p className="text-red-500 text-sm mt-1">{errors.financialStatement}</p>}
                    </div>
                  </div>
                </div>

                <div className="text-center">
                  <button type="submit" disabled={isLoading}
                    className="px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-full font-bold text-lg hover:from-indigo-700 hover:to-purple-700 shadow-lg transform hover:scale-105 transition-all disabled:opacity-50 disabled:cursor-not-allowed">
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