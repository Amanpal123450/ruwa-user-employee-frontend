// // import React, { useState } from "react";

// // export default function Empjansewa() {
// //   const [formSubmitted, setFormSubmitted] = useState(false);

// //   const services = [
// //     {
// //       icon: "🆔",
// //       title: "Welfare Eligibility Check",
// //       description: [
// //         "Available to low-income families and senior citizens.",
// //         "Priority for rural and semi-urban areas.",
// //         "Minimal documentation required.",
// //       ],
// //       bgClass: "bg-white",
// //     },
// //     {
// //       icon: "🛡️",
// //       title: "Social Security Coverage",
// //       description: [
// //         "Access to welfare pensions and medical aid.",
// //         "Education benefits for children.",
// //         "Subsidized services for women and elderly.",
// //       ],
// //       bgClass: "bg-light",
// //     },
// //     {
// //       icon: "🧾",
// //       title: "Easy Documentation",
// //       description: [
// //         "Aadhaar card, income certificate accepted.",
// //         "Simple one-page application process.",
// //         "Assistance centers for document upload.",
// //       ],
// //       bgClass: "bg-white",
// //     },
// //     {
// //       icon: "🚑",
// //       title: "Free Ambulance & Emergency Services",
// //       description: [
// //         "24/7 ambulance access in rural areas.",
// //         "Priority support during medical emergencies.",
// //         "Includes transport to partnered hospitals.",
// //       ],
// //       bgClass: "bg-light",
// //     },
// //   ];

// //   const handleSubmit = (e) => {
// //     e.preventDefault();
// //     // Here you would usually send data to backend with fetch/axios
// //     // Example: axios.post("/api/employee/apply-swabhiman", formData)

// //     setFormSubmitted(true);
// //     setTimeout(() => setFormSubmitted(false), 4000);
// //   };

// //   return (
// //     <section className="section services__v3 py-5" id="employee-swabhiman">
// //       <div className="container">
// //         <div className="row g-4">
// //           <div className="col-12" data-aos="fade-up">
// //             <div className="service-card p-4 rounded-4 h-100 d-flex flex-column text-center gap-3 shadow-sm">
// //               <span className="subtitle text-uppercase mb-2 text-muted fs-6">
// //                 Employee Portal – Apply for User
// //               </span>
// //               <h2 className="fs-5 lh-base">
// //                 Employees can submit Jan Swabhiman Seva applications on behalf
// //                 of users. Your reference ID will also be sent to admin for
// //                 verification.
// //               </h2>
// //             </div>
// //           </div>

// //           {services.map((service, index) => (
// //             <div
// //               className="col-12 col-md-6"
// //               data-aos="fade-up"
// //               data-aos-delay={index * 200}
// //               key={index}
// //             >
// //               <div
// //                 className={`service-card p-4 rounded-4 h-100 d-flex flex-column gap-3 shadow-sm ${service.bgClass}`}
// //               >
// //                 <div className="text-center fs-2">{service.icon}</div>
// //                 <h3 className="text-center fs-5 mb-2">{service.title}</h3>
// //                 <ul className="ps-3 mb-0">
// //                   {service.description.map((point, i) => (
// //                     <li key={i} className="mb-2" style={{ lineHeight: "1.6" }}>
// //                       {point}
// //                     </li>
// //                   ))}
// //                 </ul>
// //               </div>
// //             </div>
// //           ))}
// //         </div>
// //       </div>

// //       <div className="container py-5">
// //         <h2 className="mb-4 text-center">Employee Application Form</h2>

// //         {formSubmitted && (
// //           <div
// //             className="alert alert-success text-center fw-semibold"
// //             role="alert"
// //           >
// //             ✅ Application submitted successfully with Employee Reference!
// //           </div>
// //         )}

// //         <form onSubmit={handleSubmit}>
// //           <div className="row g-3">
// //             {/* User Info */}
// //             <div className="col-12">
// //               <h5 className="text-primary">User Details</h5>
// //               <hr />
// //             </div>
// //             <div className="col-md-6">
// //               <label className="form-label">Full Name</label>
// //               <input
// //                 type="text"
// //                 className="form-control"
// //                 placeholder="Enter user's full name"
// //                 required
// //               />
// //             </div>
// //             <div className="col-md-6">
// //               <label className="form-label">Phone Number</label>
// //               <input
// //                 type="tel"
// //                 className="form-control"
// //                 placeholder="e.g. 9876543210"
// //                 required
// //               />
// //             </div>
// //             <div className="col-md-6">
// //               <label className="form-label">Aadhaar Number</label>
// //               <input
// //                 type="text"
// //                 className="form-control"
// //                 placeholder="XXXX-XXXX-XXXX"
// //                 required
// //               />
// //             </div>
// //             <div className="col-md-6">
// //               <label className="form-label">Annual Family Income</label>
// //               <input
// //                 type="number"
// //                 className="form-control"
// //                 placeholder="In INR"
// //                 required
// //               />
// //             </div>
// //             <div className="col-md-6">
// //               <label className="form-label">Residential Area</label>
// //               <select className="form-select" required>
// //                 <option value="">-- Select Area --</option>
// //                 <option value="Urban">Urban</option>
// //                 <option value="Rural">Rural</option>
// //                 <option value="Semi-Urban">Semi-Urban</option>
// //               </select>
// //             </div>
// //             <div className="col-md-6">
// //               <label className="form-label">Upload User ID Proof</label>
// //               <input
// //                 type="file"
// //                 className="form-control"
// //                 accept="image/*,application/pdf"
// //                 required
// //               />
// //             </div>
// //             <div className="col-12">
// //               <label className="form-label">Additional Notes</label>
// //               <textarea
// //                 className="form-control"
// //                 rows="4"
// //                 placeholder="Any specific request or condition..."
// //               />
// //             </div>

// //             {/* Employee Info */}
// //             <div className="col-12 mt-4">
// //               <h5 className="text-success">Employee Reference</h5>
// //               <hr />
// //             </div>
// //             <div className="col-md-6">
// //               <label className="form-label">Employee ID</label>
// //               <input
// //                 type="text"
// //                 className="form-control"
// //                 placeholder="Enter your Employee ID"
// //                 required
// //               />
// //             </div>
// //             <div className="col-md-6">
// //               <label className="form-label">Employee Name</label>
// //               <input
// //                 type="text"
// //                 className="form-control"
// //                 placeholder="Enter your name"
// //                 required
// //               />
// //             </div>
// //             <div className="col-12">
// //               <label className="form-label">Remarks for Admin</label>
// //               <textarea
// //                 className="form-control"
// //                 rows="3"
// //                 placeholder="Any remarks for admin (optional)..."
// //               />
// //             </div>
// //           </div>

// //           <div className="text-center mt-4">
// //             <button
// //               type="submit"
// //               className="btn btn-info px-5 text-white fw-semibold"
// //             >
// //               Submit Application for User
// //             </button>
// //           </div>
// //         </form>
// //       </div>
// //     </section>
// //   );
// // }



// import React, { useState } from "react";

// export default function Empjansewa() {
//   const [formSubmitted, setFormSubmitted] = useState(false);

//   const services = [
//     {
//       icon: "🆔",
//       title: "Welfare Eligibility Check",
//       description: [
//         "Available to low-income families and senior citizens.",
//         "Priority for rural and semi-urban areas.",
//         "Minimal documentation required.",
//       ],
//       gradient: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
//     },
//     {
//       icon: "🛡️",
//       title: "Social Security Coverage",
//       description: [
//         "Access to welfare pensions and medical aid.",
//         "Education benefits for children.",
//         "Subsidized services for women and elderly.",
//       ],
//       gradient: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
//     },
//     {
//       icon: "🧾",
//       title: "Easy Documentation",
//       description: [
//         "Aadhaar card, income certificate accepted.",
//         "Simple one-page application process.",
//         "Assistance centers for document upload.",
//       ],
//       gradient: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
//     },
//     {
//       icon: "🚑",
//       title: "Free Ambulance & Emergency Services",
//       description: [
//         "24/7 ambulance access in rural areas.",
//         "Priority support during medical emergencies.",
//         "Includes transport to partnered hospitals.",
//       ],
//       gradient: "linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)",
//     },
//   ];

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     setFormSubmitted(true);
//     setTimeout(() => setFormSubmitted(false), 4000);
//   };

//   return (
//     <section className="swabhiman-dashboard ">
//       <div className="container">
//         {/* Intro */}
//         <div className="text-center mb-5">
//           <span className="subtitle text-uppercase text-muted fs-6">
//             Jan Swabhiman Seva
//           </span>
//           <h2 className="section-title">Join & Apply for Welfare Support</h2>
//           <p className="section-subtitle">
//             Explore key benefits of Jan Swabhiman Seva and complete the
//             application form below.
//           </p>
//         </div>

//         {/* Services Grid */}
//         <div className="row g-4">
//           {services.map((service, index) => (
//             <div key={index} className="col-xl-3 col-lg-4 col-md-6 col-sm-12">
//               <div
//                 className="service-card"
//                 style={{ "--gradient": service.gradient }}
//               >
//                 <div className="card-background"></div>
//                 <div className="card-content text-center">
//                   <div className="fs-1">{service.icon}</div>
//                   <h4 className="mt-3 card-title">{service.title}</h4>
//                   <ul className="list-unstyled mt-3 small text-muted">
//                     {service.description.map((point, i) => (
//                       <li key={i} className="mb-1">
//                         • {point}
//                       </li>
//                     ))}
//                   </ul>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>

//         {/* Form Section */}
//         <div className="mt-5">
//           <div className="application-card p-4 rounded-4 shadow-sm">
//             <h3 className="fs-4 mb-3 text-center">Apply for Swabhiman Seva</h3>

//             {formSubmitted && (
//               <div
//                 className="alert alert-success text-center fw-semibold"
//                 role="alert"
//               >
//                 ✅ Jan Swabhiman Card application submitted successfully!
//               </div>
//             )}

//             <form onSubmit={handleSubmit}>
//               <div className="row g-3">
//                 <div className="col-md-6">
//                   <label className="form-label">Full Name</label>
//                   <input
//                     type="text"
//                     className="form-control"
//                     placeholder="Enter your full name"
//                     required
//                   />
//                 </div>
//                 <div className="col-md-6">
//                   <label className="form-label">Phone Number</label>
//                   <input
//                     type="tel"
//                     className="form-control"
//                     placeholder="e.g. 9876543210"
//                     required
//                   />
//                 </div>
//                 <div className="col-md-6">
//                   <label className="form-label">Aadhaar Number</label>
//                   <input
//                     type="text"
//                     className="form-control"
//                     placeholder="XXXX-XXXX-XXXX"
//                     required
//                   />
//                 </div>
//                 <div className="col-md-6">
//                   <label className="form-label">Annual Family Income</label>
//                   <input
//                     type="number"
//                     className="form-control"
//                     placeholder="In INR"
//                     required
//                   />
//                 </div>
//                 <div className="col-md-6">
//                   <label className="form-label">Residential Area</label>
//                   <select className="form-select" required>
//                     <option value="">-- Select Area --</option>
//                     <option value="Urban">Urban</option>
//                     <option value="Rural">Rural</option>
//                     <option value="Semi-Urban">Semi-Urban</option>
//                   </select>
//                 </div>
//                 <div className="col-md-6">
//                   <label className="form-label">Upload ID Proof</label>
//                   <input
//                     type="file"
//                     className="form-control"
//                     accept="image/*,application/pdf"
//                     required
//                   />
//                 </div>
//                 <div className="col-12">
//                   <label className="form-label">Additional Notes</label>
//                   <textarea
//                     className="form-control"
//                     rows="4"
//                     placeholder="Any specific request or condition..."
//                   />
//                 </div>
//               </div>
//               <div className="text-center mt-4">
//                 <button type="submit" className="btn btn-info px-5 text-white">
//                   Apply for Seva
//                 </button>
//               </div>
//             </form>
//           </div>
//         </div>
//       </div>

//       {/* Styling */}
//       <style jsx>{`
//         .swabhiman-dashboard {
//           background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
//           min-height: 100vh;
//         }
//         .section-title {
//           font-size: 2rem;
//           font-weight: 700;
//           color: #1f2937;
//         }
//         .section-subtitle {
//           color: #6b7280;
//           font-size: 1.1rem;
//         }
//         .service-card {
//           background: white;
//           border-radius: 20px;
//           padding: 1.5rem;
//           box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
//           transition: all 0.3s ease;
//           position: relative;
//           overflow: hidden;
//           height: 100%;
//         }
//         .service-card::before {
//           content: "";
//           position: absolute;
//           inset: 0;
//           background: var(--gradient);
//           opacity: 0;
//           transition: opacity 0.3s ease;
//         }
//         .service-card:hover::before {
//           opacity: 0.08;
//         }
//         .service-card:hover {
//           transform: translateY(-6px) scale(1.02);
//           box-shadow: 0 15px 35px rgba(0, 0, 0, 0.12);
//         }
//         .card-content {
//           position: relative;
//           z-index: 2;
//         }
//         .card-title {
//           font-size: 1.1rem;
//           font-weight: 600;
//           color: #1f2937;
//         }
//         .application-card {
//           background: white;
//           border-radius: 20px;
//           box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
//         }
//       `}</style>
//     </section>
//   );
// }
import React, { useState, useEffect } from "react";

export default function Empjansewa() {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    aadhar: "",
    income: "",
    area: "",
    idProof: null,
    notes: "",
    employeeId: "",
    employeeName: "",
    remarks: ""
  });

  // Fetch employee data on component mount
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
          employeeName: user.name || "",
          employeeId: user.employeeId || "",
        }));
      })
      .catch((err) => console.error("Profile fetch failed:", err));
  }, []);

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
      [name]: files ? files[0] : value 
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("You must be logged in to submit an application.");
        return;
      }

      const fd = new FormData();
      fd.append("fullName", formData.fullName);
      fd.append("phone", formData.phone);
      fd.append("aadhar", formData.aadhar);
      fd.append("income", formData.income);
      fd.append("area", formData.area);
      fd.append("notes", formData.notes);
      fd.append("employeeId", formData.employeeId);
      fd.append("employeeName", formData.employeeName);
      fd.append("remarks", formData.remarks);
      
      if (formData.idProof) fd.append("id_proof", formData.idProof);

      const res = await fetch("https://ruwa-backend.onrender.com/api/services/swabhiman/employee/apply", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`
        },
        body: fd
      });

      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.message || "Failed to submit application");
      }

      setFormSubmitted(true);
      setTimeout(() => setFormSubmitted(false), 4000);
      
      // Reset form but keep employee info
      setFormData({
        ...formData,
        fullName: "",
        phone: "",
        aadhar: "",
        income: "",
        area: "",
        idProof: null,
        notes: "",
        remarks: ""
      });
    } catch (err) {
      console.error(err);
      alert(err.message || "Something went wrong");
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
                        Employee Portal 👋
                      </div>
                      <h1 className="welcome-title">
                        Jan Swabhiman Seva Applications
                      </h1>
                      <p className="welcome-subtitle">
                        Submit welfare applications on behalf of users with your employee reference
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
                <h3 className="header-title">Employee Application Form</h3>
                <p className="header-subtitle">Submit Jan Swabhiman Seva applications on behalf of users</p>
              </div>
              
              <div className="card-body">
                {formSubmitted && (
                  <div className="alert alert-success alert-custom" role="alert">
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
                      <label className="form-label-custom">Full Name</label>
                      <input
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleChange}
                        type="text"
                        className="form-control-custom"
                        placeholder="Enter user's full name"
                        required
                      />
                    </div>
                    <div className="col-md-6 mb-3">
                      <label className="form-label-custom">Phone Number</label>
                      <input
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        type="tel"
                        className="form-control-custom"
                        placeholder="e.g. 9876543210"
                        required
                      />
                    </div>
                    <div className="col-md-6 mb-3">
                      <label className="form-label-custom">Aadhaar Number</label>
                      <input
                        name="aadhar"
                        value={formData.aadhar}
                        onChange={handleChange}
                        type="text"
                        className="form-control-custom"
                        placeholder="XXXX-XXXX-XXXX"
                        required
                      />
                    </div>
                    <div className="col-md-6 mb-3">
                      <label className="form-label-custom">Annual Family Income</label>
                      <input
                        name="income"
                        value={formData.income}
                        onChange={handleChange}
                        type="number"
                        className="form-control-custom"
                        placeholder="In INR"
                        required
                      />
                    </div>
                    <div className="col-md-6 mb-3">
                      <label className="form-label-custom">Residential Area</label>
                      <select
                        name="area"
                        value={formData.area}
                        onChange={handleChange}
                        className="form-control-custom"
                        required
                      >
                        <option value="">-- Select Area --</option>
                        <option value="Urban">Urban</option>
                        <option value="Rural">Rural</option>
                        <option value="Semi-Urban">Semi-Urban</option>
                      </select>
                    </div>
                    <div className="col-md-6 mb-3">
                      <label className="form-label-custom">Upload User ID Proof</label>
                      <div className="file-input-container">
                        <input
                          name="idProof"
                          onChange={handleChange}
                          type="file"
                          className="file-input-custom"
                          accept="image/*,application/pdf"
                          required
                        />
                        <div className="file-upload-placeholder">
                          <i className="fas fa-upload me-2"></i>
                          Choose file
                        </div>
                      </div>
                    </div>
                    <div className="col-12 mb-3">
                      <label className="form-label-custom">Additional Notes</label>
                      <textarea
                        name="notes"
                        value={formData.notes}
                        onChange={handleChange}
                        className="form-control-custom"
                        rows="3"
                        placeholder="Any specific request or condition..."
                      />
                    </div>
                  </div>

                  {/* Employee Reference Section */}
                  <div className="row mb-4">
                    <div className="col-12">
                      <h5 className="section-title-with-icon">
                        <i className="fas fa-id-card me-2"></i>
                        Employee Reference
                      </h5>
                      <hr className="section-divider" />
                    </div>
                    
                    <div className="col-md-6 mb-3">
                      <label className="form-label-custom">Employee ID</label>
                      <input
                        name="employeeId"
                        value={formData.employeeId}
                        onChange={handleChange}
                        type="text"
                        className="form-control-custom"
                        placeholder="Enter your Employee ID"
                        required
                        readOnly
                      />
                    </div>
                    <div className="col-md-6 mb-3">
                      <label className="form-label-custom">Employee Name</label>
                      <input
                        name="employeeName"
                        value={formData.employeeName}
                        onChange={handleChange}
                        type="text"
                        className="form-control-custom"
                        placeholder="Enter your name"
                        required
                        readOnly
                      />
                    </div>
                    <div className="col-12 mb-3">
                      <label className="form-label-custom">Remarks for Admin</label>
                      <textarea
                        name="remarks"
                        value={formData.remarks}
                        onChange={handleChange}
                        className="form-control-custom"
                        rows="2"
                        placeholder="Any remarks for admin (optional)..."
                      />
                    </div>
                  </div>

                  <div className="text-center mt-4">
                    <button type="submit" className="btn-primary-custom px-5 py-2">
                      <i className="fas fa-paper-plane me-2"></i>
                      Submit Application for User
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

        .section-title-with-icon {
          font-size: 1.2rem;
          font-weight: 600;
          color: #374151;
          display: flex;
          align-items: center;
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

        .form-control-custom[readonly] {
          background-color: #f9fafb;
          color: #6b7280;
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
        }

        .file-upload-placeholder {
          background: #f9fafb;
          border: 1px dashed #d1d5db;
          border-radius: 10px;
          padding: 0.75rem 1rem;
          color: #6b7280;
          text-align: center;
          transition: all 0.3s ease;
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