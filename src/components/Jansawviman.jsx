import React, { useEffect, useState } from 'react';

export default function Jansawviman() {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  // Form state
  const [formData, setFormData] = useState({
    fullName: '',
    phoneNumber: '',
    aadhaarNumber: '',
    annualFamilyIncome: '',
    residentialArea: '',
    additionalNotes: '',
    idProof: null
  });

  const services = [
    {
      icon: '🆔',
      title: 'Welfare Eligibility Check',
      description: [
        'Available to low-income families and senior citizens.',
        'Priority for rural and semi-urban areas.',
        'Minimal documentation required.'
      ],
      bgClass: 'bg-white'
    },
    {
      icon: '🛡️',
      title: 'Social Security Coverage',
      description: [
        'Access to welfare pensions and medical aid.',
        'Education benefits for children.',
        'Subsidized services for women and elderly.'
      ],
      bgClass: 'bg-light'
    },
    {
      icon: '🧾',
      title: 'Easy Documentation',
      description: [
        'Aadhaar card, income certificate accepted.',
        'Simple one-page application process.',
        'Assistance centers for document upload.'
      ],
      bgClass: 'bg-white'
    },
    {
      icon: '🚑',
      title: 'Free Ambulance & Emergency Services',
      description: [
        '24/7 ambulance access in rural areas.',
        'Priority support during medical emergencies.',
        'Includes transport to partnered hospitals.'
      ],
      bgClass: 'bg-light'
    }
  ];

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle file change
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData(prev => ({
      ...prev,
      idProof: file
    }));
  };
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
            fullName: user.name || "",
            phoneNumber: user.phone || "",
            aadhaarNumber: user.aadhar || "",
            
            
          }));
        })
        .catch((err) => console.error("Profile fetch failed:", err));
    }, []);

  // Submit form
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // Create FormData for file upload
      const submitData = new FormData();
      
      // Append all form fields
      Object.keys(formData).forEach(key => {
        if (key === 'idProof' && formData[key]) {
          submitData.append('idProof', formData[key]);
        } else if (key !== 'idProof') {
          submitData.append(key, formData[key]);
        }
      });

      // Get token from localStorage or wherever you store it
      const token = localStorage.getItem('token');
      
      const response = await fetch('https://ruwa-backend.onrender.com/api/services/sevaApplication/apply', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          // Don't set Content-Type for FormData, browser will set it automatically
        },
        body: submitData
      });

      const result = await response.json();

      if (response.ok) {
        setFormSubmitted(true);
        // Reset form
        setFormData({
          fullName: '',
          phoneNumber: '',
          aadhaarNumber: '',
          annualFamilyIncome: '',
          residentialArea: '',
          additionalNotes: '',
          idProof: null
        });
        // Clear file input
        document.querySelector('input[type="file"]').value = '';
        
        setTimeout(() => setFormSubmitted(false), 4000);
      } else {
        setError(result.message || 'Failed to submit application');
      }
    } catch (err) {
      console.error('Submission error:', err);
      setError('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="section services__v3 py-5" id="swabhiman">
      <div className="container">
        <div className="row g-4">
          <div className="col-12" data-aos="fade-up">
            <div className="service-card p-4 rounded-4 h-100 d-flex flex-column text-center gap-3 shadow-sm">
              <span className="subtitle text-uppercase mb-2 text-muted fs-6">
                Join Jan Swabhiman Seva
              </span>
            </div>
          </div>

          {services.map((service, index) => (
            <div className="col-12 col-md-6" data-aos="fade-up" data-aos-delay={index * 200} key={index}>
              <div className={`service-card p-4 rounded-4 h-100 d-flex flex-column gap-3 shadow-sm ${service.bgClass}`}>
                <div className="text-center fs-2">{service.icon}</div>
                <h3 className="text-center fs-5 mb-2">{service.title}</h3>
                <ul className="ps-3 mb-0">
                  {service.description.map((point, i) => (
                    <li key={i} className="mb-2" style={{ lineHeight: '1.6' }}>{point}</li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="container py-5">
        <h2 className="mb-4 text-center">Apply for Swabhiman Seva</h2>

        {formSubmitted && (
          <div className="alert alert-success text-center fw-semibold" role="alert">
            ✅ Jan Swabhiman Card application submitted successfully!
          </div>
        )}

        {error && (
          <div className="alert alert-danger text-center" role="alert">
            ❌ {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="row g-3">
            <div className="col-md-6">
              <label className="form-label">Full Name</label>
              <input 
              readOnly
                type="text" 
                className="form-control" 
                name="fullName"
                value={formData.fullName}
                onChange={handleInputChange}
                placeholder="Enter your full name" 
                required 
              />
            </div>
            <div className="col-md-6">
              <label className="form-label">Phone Number</label>
              <input 
               readOnly
                type="tel" 
                className="form-control" 
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleInputChange}
                placeholder="e.g. 9876543210" 
                required 
              />
            </div>
            <div className="col-md-6">
              <label className="form-label">Aadhaar Number</label>
              <input 
                type="text" 
                //  readOnly
                className="form-control" 
                name="aadhaarNumber"
                value={formData.aadhaarNumber}
                onChange={handleInputChange}
                placeholder="XXXX-XXXX-XXXX" 
                required 
              />
            </div>
            <div className="col-md-6">
              <label className="form-label">Annual Family Income</label>
              <input 
                type="number" 
                 
                className="form-control" 
                name="annualFamilyIncome"
                value={formData.annualFamilyIncome}
                onChange={handleInputChange}
                placeholder="In INR" 
                required 
              />
            </div>
            <div className="col-md-6">
              <label className="form-label">Residential Area</label>
              <select 
                className="form-select" 
                name="residentialArea"
                value={formData.residentialArea}
                onChange={handleInputChange}
                required
              >
                <option value="">-- Select Area --</option>
                <option value="Urban">Urban</option>
                <option value="Rural">Rural</option>
                <option value="Semi-Urban">Semi-Urban</option>
              </select>
            </div>
            <div className="col-md-6">
              <label className="form-label">Upload ID Proof</label>
              <input 
                type="file" 
                className="form-control" 
                name="idProof"
                onChange={handleFileChange}
                accept="image/*,application/pdf" 
                required 
              />
            </div>
            <div className="col-12">
              <label className="form-label">Additional Notes</label>
              <textarea 
                className="form-control" 
                rows="4" 
                name="additionalNotes"
                value={formData.additionalNotes}
                onChange={handleInputChange}
                placeholder="Any specific request or condition..." 
              />
            </div>
          </div>
          <div className="text-center mt-4">
            <button 
              type="submit" 
              className="btn btn-info px-5 text-white"
              disabled={loading}
            >
              {loading ? (
                <>
                  <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                  Submitting...
                </>
              ) : (
                'Apply for Seva'
              )}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}



// import React, { useEffect, useState } from 'react';

// export default function Jansawviman() {
//   const [formSubmitted, setFormSubmitted] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState('');
//   const [exists, setExists] = useState(false);
//   const [receiptData, setReceiptData] = useState(null);
//   const [showReceipt, setShowReceipt] = useState(false);
  
//   // Form state
//   const [formData, setFormData] = useState({
//     fullName: '',
//     phoneNumber: '',
//     aadhaarNumber: '',
//     annualFamilyIncome: '',
//     residentialArea: '',
//     additionalNotes: '',
//     idProof: null
//   });

//   const services = [
//     {
//       icon: '🆔',
//       title: 'Welfare Eligibility Check',
//       description: [
//         'Available to low-income families and senior citizens.',
//         'Priority for rural and semi-urban areas.',
//         'Minimal documentation required.'
//       ],
//       bgClass: 'bg-white'
//     },
//     {
//       icon: '🛡️',
//       title: 'Social Security Coverage',
//       description: [
//         'Access to welfare pensions and medical aid.',
//         'Education benefits for children.',
//         'Subsidized services for women and elderly.'
//       ],
//       bgClass: 'bg-light'
//     },
//     {
//       icon: '🧾',
//       title: 'Easy Documentation',
//       description: [
//         'Aadhaar card, income certificate accepted.',
//         'Simple one-page application process.',
//         'Assistance centers for document upload.'
//       ],
//       bgClass: 'bg-white'
//     },
//     {
//       icon: '🚑',
//       title: 'Free Ambulance & Emergency Services',
//       description: [
//         '24/7 ambulance access in rural areas.',
//         'Priority support during medical emergencies.',
//         'Includes transport to partnered hospitals.'
//       ],
//       bgClass: 'bg-light'
//     }
//   ];

//   // Handle input changes
//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({
//       ...prev,
//       [name]: value
//     }));
//   };

//   // Handle file change
//   const handleFileChange = (e) => {
//     const file = e.target.files[0];
//     setFormData(prev => ({
//       ...prev,
//       idProof: file
//     }));
//   };

//   useEffect(() => {
//     // Note: Using in-memory token storage instead of localStorage
//      checkJanArogyaStatus();
//     const token = sessionStorage.getItem("token") || "";
//     if (!token) return;

//     fetch("https://ruwa-backend.onrender.com/api/auth/profile", {
//       headers: { Authorization: `Bearer ${token}` },
//     })
//       .then((res) => res.json())
//       .then((data) => {
//         const user = data?.user || {};
//         setFormData((prev) => ({
//           ...prev,
//           fullName: user.name || "",
//           phoneNumber: user.phone || "",
//           aadhaarNumber: user.aadhar || "",
//         }));

//         // if (user.aadhar) checkJanArogyaStatus(user.aadhar);
//       })
//       .catch((err) => console.error("Profile fetch failed:", err));

     
//   }, []);

//   const checkJanArogyaStatus = async (aadhar) => {
//     const token = localStorage.getItem("token") || "";
//     try {
//       const response = await fetch(
//         "https://ruwa-backend.onrender.com/api/services/sevaApplication/check",
//         {
//           method: "POST",
//           headers: {
//             Authorization: `Bearer ${token}`,
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify({ aadhar }),
//         }
//       );

//       const data = await response.json();

//       if (data.msg === "USER ALREADY EXISTS" || data.msg === "APPROVED") {
//         setExists(true);
//         setReceiptData(data.application);
//       } else {
//         setExists(false);
//         setReceiptData(null);
//       }
//     } catch (error) {
//       console.error("Error checking Jan Arogya status:", error);
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setError('');

//     try {
//       const submitData = new FormData();
      
//       Object.keys(formData).forEach(key => {
//         if (key === 'idProof' && formData[key]) {
//           submitData.append('idProof', formData[key]);
//         } else if (key !== 'idProof') {
//           submitData.append(key, formData[key]);
//         }
//       });

//       const token = localStorage.getItem('token') || "";
      
//       const response = await fetch('https://ruwa-backend.onrender.com/api/services/sevaApplication/apply', {
//         method: 'POST',
//         headers: {
//           'Authorization': `Bearer ${token}`,
//         },
//         body: submitData
//       });

//       const result = await response.json();

//       if (response.ok) {
//         setFormSubmitted(true);
//         setFormData({
//           fullName: '',
//           phoneNumber: '',
//           aadhaarNumber: '',
//           annualFamilyIncome: '',
//           residentialArea: '',
//           additionalNotes: '',
//           idProof: null
//         });
        
//         setTimeout(() => setFormSubmitted(false), 4000);
//       } else {
//         setError(result.message || 'Failed to submit application');
//       }
//     } catch (err) {
//       console.error('Submission error:', err);
//       setError('Network error. Please try again.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const AadhaarStyleReceipt = ({ receiptData }) => {
//     if (!receiptData) {
//       return (
//         <div className="d-flex align-items-center justify-content-center" style={{ minHeight: '200px' }}>
//           <p className="text-muted">No receipt data available</p>
//         </div>
//       );
//     }

//     const formatDate = (dateString) => {
//       if (!dateString) return 'Not Given';
//       try {
//         return new Date(dateString)
//           .toISOString()
//           .split('T')[0]
//           .split('-')
//           .reverse()
//           .join('-');
//       } catch {
//         return 'Invalid Date';
//       }
//     };

//     return (
//       <div className="bg-light py-3 px-2">
//         <div className="bg-white shadow p-3 mx-auto" style={{ maxWidth: '800px' }}>
//           <div className="border border-dark border-2">
//             <div className="border-bottom border-dark border-2 p-3">
//               <div className="d-flex align-items-start gap-3">
//                 <img
//                   src="https://res.cloudinary.com/dknrega1a/image/upload/v1759834087/WhatsApp_Image_2025-10-06_at_22.00.12_88b58360_cslogj.jpg"
//                   alt="Logo"
//                   className="img-fluid"
//                   style={{ width: '60px', height: '60px' }}
//                 />
//                 <div className="flex-grow-1 text-center">
//                   <h5 className="fw-bold mb-1">Unique Identification Authority of India</h5>
//                   <h6 className="mb-1">भारतीय विशिष्ट पहचान प्राधिकरण</h6>
//                   <p className="small mb-0">Government of India / भारत सरकार</p>
//                 </div>
//                 <div style={{ width: '60px' }}></div>
//               </div>
//               <h6 className="text-center fw-bold mt-2 text-uppercase">
//                 ACKNOWLEDGEMENT / RESIDENT COPY
//               </h6>
//             </div>

//             <div className="p-3">
//               <table className="table table-sm table-borderless mb-3">
//                 <tbody>
//                   <tr className="border-bottom">
//                     <td className="fw-semibold" style={{ width: '40%' }}>Enrolment No:</td>
//                     <td>{receiptData.enrollmentNo || 'Not Given'}</td>
//                     <td rowSpan="5" className="text-end align-top">
//                       <div className="border border-dark border-2 d-inline-block" style={{ width: '100px', height: '100px' }}>
//                         <img
//                           src={receiptData.profilePicUser || "https://via.placeholder.com/100"}
//                           alt="User"
//                           className="w-100 h-100 object-fit-cover"
//                         />
//                       </div>
//                     </td>
//                   </tr>
//                   <tr className="border-bottom">
//                     <td className="fw-semibold">NPR Rept No:</td>
//                     <td className="text-break">{receiptData.reciept?.applicationId || "Not Given"}</td>
//                   </tr>
//                   <tr className="border-bottom">
//                     <td className="fw-semibold">S/O:</td>
//                     <td>{receiptData.parentName || "Not Given"}</td>
//                   </tr>
//                   <tr className="border-bottom">
//                     <td className="fw-semibold">Address:</td>
//                     <td>
//                       {receiptData.district && receiptData.state 
//                         ? `${receiptData.district}, ${receiptData.state}`
//                         : 'Not Given'}
//                     </td>
//                   </tr>
//                   <tr className="border-bottom">
//                     <td className="fw-semibold">Date of Birth:</td>
//                     <td colSpan="2">{formatDate(receiptData.DOB)}</td>
//                   </tr>
//                   <tr className="border-bottom">
//                     <td className="fw-semibold">Mobile:</td>
//                     <td colSpan="2">{receiptData.mobile || "Not Given"}</td>
//                   </tr>
//                   <tr className="border-bottom">
//                     <td className="fw-semibold">Email:</td>
//                     <td colSpan="2" className="text-break">{receiptData.email || "Not Given"}</td>
//                   </tr>
//                   <tr className="border-bottom">
//                     <td className="fw-semibold">Documents:</td>
//                     <td colSpan="2">{receiptData.documents || "Income Certificate, Ration Card"}</td>
//                   </tr>
//                 </tbody>
//               </table>

//               <div className="mb-3 pb-3 border-bottom border-dark border-2">
//                 <h6 className="fw-bold mb-2">Biometric Information</h6>
//                 <p className="small mb-1"><span className="fw-semibold">Fingerprint quality:</span> Left: ✓ Right: ✓</p>
//                 <p className="small mb-1 ms-5">✓ Good Quality fingerprint, recommended for authentication.</p>
//                 <p className="small mb-0"><span className="fw-semibold">Biometrics Captured:</span> Fingers(10), Iris(2), Face</p>
//               </div>

//               <div className="mb-3">
//                 <table className="table table-sm table-borderless">
//                   <tbody>
//                     <tr>
//                       <td className="fw-semibold" style={{ width: '40%' }}>Bank Details:</td>
//                       <td>{receiptData.bankDetails || "New Aadhaar enabled bank account/STATE BANK OF INDIA"}</td>
//                     </tr>
//                     <tr>
//                       <td className="fw-semibold">Information Sharing Consent:</td>
//                       <td>{receiptData.consent || "Yes"}</td>
//                     </tr>
//                   </tbody>
//                 </table>
//               </div>

//               <div className="bg-warning bg-opacity-25 p-3 mb-3 rounded">
//                 <table className="table table-sm table-borderless mb-2">
//                   <tbody>
//                     <tr>
//                       <td className="fw-semibold" style={{ width: '40%' }}>Registrar:</td>
//                       <td>{receiptData.registrar || `Govt of ${receiptData.state || 'India'}`}</td>
//                     </tr>
//                     <tr>
//                       <td className="fw-semibold">Enrolment Agency:</td>
//                       <td>{receiptData.agency || "MARS Telecom Systems Pvt Ltd"}</td>
//                     </tr>
//                   </tbody>
//                 </table>
//                 <p className="small text-center mb-0 fw-medium">
//                   A Correction (if any) of demographic information must be made within 96 hours of enrolment
//                 </p>
//               </div>

//               <div className={`p-3 mb-3 border rounded ${
//                 receiptData.status === "approved" ? "bg-success bg-opacity-10 border-success" : "bg-info bg-opacity-10 border-info"
//               }`}>
//                 <p className="small text-center mb-0">
//                   {receiptData.status === "approved"
//                     ? "Your Jan Arogya Card has been approved and will be delivered to your address mentioned on this receipt in around 60-90 days. You can get only one Jan Arogya Card. Please do not enrol again unless asked to."
//                     : "Your Jan Arogya Card application is under review. You will receive updates on your registered mobile and email. You can get only one Jan Arogya Card. Please do not enrol again unless asked to."}
//                 </p>
//               </div>

//               <div className="d-flex justify-content-between align-items-end">
//                 <div className="small">
//                   <p className="fw-bold mb-1">For enquiry, please contact:</p>
//                   <p className="mb-0">help-janarogya.gov.in</p>
//                   <p className="mb-0">http://www.janarogya.gov.in</p>
//                   <p className="mb-2">1800 180 1947</p>
//                   <p className="text-muted small mb-0">
//                     This is a computer-generated acknowledgement and does not require a physical signature.
//                   </p>
//                 </div>
//                 <div className="text-center">
//                   <div className="border border-secondary p-1 bg-white" style={{ width: '100px', height: '100px' }}>
//                     {receiptData.Qr ? (
//                       <img src={receiptData.Qr} alt="QR" className="w-100 h-100 object-fit-contain" />
//                     ) : (
//                       <div className="d-flex align-items-center justify-content-center h-100 small text-muted">QR Code</div>
//                     )}
//                   </div>
//                   <div className="small fw-semibold mt-2">
//                     <div>{receiptData.authorizedPerson || "Veldandi Sridhar"}</div>
//                     <div className="text-muted">(Authorized Signature)</div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     );
//   };

//   return (
//     <section className="py-5" id="swabhiman">
//       <div className="container">
//         <div className="row g-4">
//           <div className="col-12">
//             <div className="bg-white p-4 rounded shadow-sm text-center">
//               <span className="text-uppercase text-muted small">
//                 Join Jan Swabhiman Seva
//               </span>
//             </div>
//           </div>

//           {services.map((service, index) => (
//             <div className="col-12 col-md-6" key={index}>
//               <div className={`p-4 rounded shadow-sm h-100 ${service.bgClass}`}>
//                 <div className="text-center fs-2 mb-3">{service.icon}</div>
//                 <h3 className="text-center h5 mb-3">{service.title}</h3>
//                 <ul className="ps-3 mb-0">
//                   {service.description.map((point, i) => (
//                     <li key={i} className="mb-2">{point}</li>
//                   ))}
//                 </ul>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>

//       <div className="container py-5">
//         <h2 className="mb-4 text-center">Apply for Swabhiman Seva</h2>

//         {exists && receiptData && (
//           <div className="alert alert-info text-center">
//             <div className="fw-semibold mb-2">
//               {receiptData.status === "APPROVED"
//                 ? "✅ Your Jan Arogya Card has been approved!"
//                 : "📋 Your application is under review."}
//             </div>
//             <button
//               className="btn btn-success"
//               onClick={() => setShowReceipt(true)}
//             >
//               View Receipt
//             </button>
//           </div>
//         )}

//         {showReceipt && (
//           <div className="modal show d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
//             <div className="modal-dialog modal-xl modal-dialog-centered modal-dialog-scrollable">
//               <div className="modal-content">
//                 <div className="modal-header">
//                   <h5 className="modal-title">Jan Arogya Card Application Receipt</h5>
//                   <button type="button" className="btn-close" onClick={() => setShowReceipt(false)}></button>
//                 </div>
//                 <div className="modal-body p-0">
//                   <AadhaarStyleReceipt receiptData={receiptData} />
//                 </div>
//                 <div className="modal-footer">
//                   <button type="button" className="btn btn-secondary" onClick={() => setShowReceipt(false)}>
//                     Close
//                   </button>
//                 </div>
//               </div>
//             </div>
//           </div>
//         )}

//         {formSubmitted && (
//           <div className="alert alert-success text-center" role="alert">
//             ✅ Application submitted successfully!
//           </div>
//         )}

//         {error && (
//           <div className="alert alert-danger text-center" role="alert">
//             ❌ {error}
//           </div>
//         )}

//         <form onSubmit={handleSubmit}>
//           <div className="row g-3">
//             <div className="col-md-6">
//               <label className="form-label">Full Name</label>
//               <input 
//                 readOnly
//                 type="text" 
//                 className="form-control" 
//                 name="fullName"
//                 value={formData.fullName}
//                 onChange={handleInputChange}
//                 placeholder="Enter your full name" 
//                 required 
//               />
//             </div>
//             <div className="col-md-6">
//               <label className="form-label">Phone Number</label>
//               <input 
//                 readOnly
//                 type="tel" 
//                 className="form-control" 
//                 name="phoneNumber"
//                 value={formData.phoneNumber}
//                 onChange={handleInputChange}
//                 placeholder="e.g. 9876543210" 
//                 required 
//               />
//             </div>
//             <div className="col-md-6">
//               <label className="form-label">Aadhaar Number</label>
//               <input 
//                 type="text" 
//                 className="form-control" 
//                 name="aadhaarNumber"
//                 value={formData.aadhaarNumber}
//                 onChange={handleInputChange}
//                 placeholder="XXXX-XXXX-XXXX" 
//                 required 
//               />
//             </div>
//             <div className="col-md-6">
//               <label className="form-label">Annual Family Income</label>
//               <input 
//                 type="number" 
//                 className="form-control" 
//                 name="annualFamilyIncome"
//                 value={formData.annualFamilyIncome}
//                 onChange={handleInputChange}
//                 placeholder="In INR" 
//                 required 
//               />
//             </div>
//             <div className="col-md-6">
//               <label className="form-label">Residential Area</label>
//               <select 
//                 className="form-select" 
//                 name="residentialArea"
//                 value={formData.residentialArea}
//                 onChange={handleInputChange}
//                 required
//               >
//                 <option value="">-- Select Area --</option>
//                 <option value="Urban">Urban</option>
//                 <option value="Rural">Rural</option>
//                 <option value="Semi-Urban">Semi-Urban</option>
//               </select>
//             </div>
//             <div className="col-md-6">
//               <label className="form-label">Upload ID Proof</label>
//               <input 
//                 type="file" 
//                 className="form-control" 
//                 name="idProof"
//                 onChange={handleFileChange}
//                 accept="image/*,application/pdf" 
//                 required 
//               />
//             </div>
//             <div className="col-12">
//               <label className="form-label">Additional Notes</label>
//               <textarea 
//                 className="form-control" 
//                 rows="4" 
//                 name="additionalNotes"
//                 value={formData.additionalNotes}
//                 onChange={handleInputChange}
//                 placeholder="Any specific request or condition..." 
//               />
//             </div>
//           </div>
//           <div className="text-center mt-4">
//             <button 
//               type="submit" 
//               className="btn btn-info px-5 text-white"
//               disabled={loading}
//             >
//               {loading ? (
//                 <>
//                   <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
//                   Submitting...
//                 </>
//               ) : (
//                 'Apply for Seva'
//               )}
//             </button>
//           </div>
//         </form>
//       </div>
//     </section>
//   );
// }