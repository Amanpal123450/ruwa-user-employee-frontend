// import React, { useState, useEffect } from "react";

// const Empusers = () => {
//   const [applications, setApplications] = useState([]);
//   const [filteredApplications, setFilteredApplications] = useState([]);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [statusFilter, setStatusFilter] = useState("all");
//   const [isLoading, setIsLoading] = useState(true);
//   const [selectedApplication, setSelectedApplication] = useState(null);
//   const [showModal, setShowModal] = useState(false);

//   // Sample data - in a real app, this would come from an API
//   useEffect(() => {
//     const fetchApplications = async () => {
//       setIsLoading(true);
//       try {
//         // Simulate API call
//         setTimeout(() => {
//           const sampleData = [
//             {
//               id: 1,
//               name: "Rahul Sharma",
//               aadhaar: "1234-5678-9012",
//               phone: "9876543210",
//               address: "Mumbai, Maharashtra",
//               businessType: "Individual",
//               investmentCapacity: "5,00,000 - 10,00,000",
//               proposedLocation: "Mumbai Suburbs",
//               category: "S2",
//               relevantExperience: "5 years in pharmaceutical sales",
//               status: "pending",
//               appliedDate: "2023-10-15",
//               documents: {
//                 idProof: "aadhaar_front.jpg",
//                 qualificationCertificate: "bachelor_degree.pdf",
//                 financialStatement: "bank_statement.pdf"
//               }
//             },
//             {
//               id: 2,
//               name: "Priya Patel",
//               aadhaar: "9876-5432-1098",
//               phone: "8765432109",
//               address: "Ahmedabad, Gujarat",
//               businessType: "Partnership",
//               investmentCapacity: "10,00,000 - 15,00,000",
//               proposedLocation: "City Center",
//               category: "S3",
//               relevantExperience: "Managed a clinic for 3 years",
//               status: "approved",
//               appliedDate: "2023-10-10",
//               documents: {
//                 idProof: "aadhaar_priya.jpg",
//                 qualificationCertificate: "mbbs_certificate.pdf",
//                 financialStatement: "financials.pdf"
//               }
//             },
//             {
//               id: 3,
//               name: "Vikram Singh",
//               aadhaar: "4567-8901-2345",
//               phone: "7654321098",
//               address: "Lucknow, Uttar Pradesh",
//               businessType: "Company",
//               investmentCapacity: "15,00,000+",
//               proposedLocation: "Commercial Area",
//               category: "S1",
//               relevantExperience: "Business background with healthcare interest",
//               status: "rejected",
//               appliedDate: "2023-10-05",
//               documents: {
//                 idProof: "vikram_id.pdf",
//                 qualificationCertificate: "business_degree.pdf",
//                 financialStatement: "company_financials.pdf"
//               }
//             },
//             {
//               id: 4,
//               name: "Anjali Mehta",
//               aadhaar: "3456-7890-1234",
//               phone: "6543210987",
//               address: "Bangalore, Karnataka",
//               businessType: "Individual",
//               investmentCapacity: "8,00,000 - 12,00,000",
//               proposedLocation: "Residential Area",
//               category: "S2",
//               relevantExperience: "2 years as hospital administrator",
//               status: "pending",
//               appliedDate: "2023-10-18",
//               documents: {
//                 idProof: "anjali_aadhaar.jpg",
//                 qualificationCertificate: "admin_certificate.pdf",
//                 financialStatement: "bank_statement_anjali.pdf"
//               }
//             }
//           ];
//           setApplications(sampleData);
//           setFilteredApplications(sampleData);
//           setIsLoading(false);
//         }, 1000);
//       } catch (error) {
//         console.error("Error fetching applications:", error);
//         setIsLoading(false);
//       }
//     };

//     fetchApplications();
//   }, []);

//   // Filter applications based on search term and status
//   useEffect(() => {
//     let results = applications;
    
//     // Apply search filter
//     if (searchTerm) {
//       results = results.filter(app => 
//         app.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
//         app.aadhaar.includes(searchTerm) ||
//         app.phone.includes(searchTerm) ||
//         app.proposedLocation.toLowerCase().includes(searchTerm.toLowerCase())
//       );
//     }
    
//     // Apply status filter
//     if (statusFilter !== "all") {
//       results = results.filter(app => app.status === statusFilter);
//     }
    
//     setFilteredApplications(results);
//   }, [searchTerm, statusFilter, applications]);

//   const handleSearch = (e) => {
//     setSearchTerm(e.target.value);
//   };

//   const handleStatusFilter = (e) => {
//     setStatusFilter(e.target.value);
//   };

//   const viewApplicationDetails = (app) => {
//     setSelectedApplication(app);
//     setShowModal(true);
//   };

//   const getStatusBadge = (status) => {
//     switch (status) {
//       case "approved":
//         return <span className="badge bg-success">Approved</span>;
//       case "rejected":
//         return <span className="badge bg-danger">Rejected</span>;
//       default:
//         return <span className="badge bg-warning">Pending</span>;
//     }
//   };

//   const getCategoryDisplay = (category) => {
//     switch (category) {
//       case "S1":
//         return "S1 (200 sq. ft)";
//       case "S2":
//         return "S2 (400 sq. ft)";
//       case "S3":
//         return "S3 (600 sq. ft)";
//       default:
//         return category;
//     }
//   };

//   return (
//     <div className="dashboard-container">
//       <div className="container-fluid py-4">
//         <div className="row">
//           <div className="col-12">
//             {/* Header */}
//             <div className="welcome-card mb-4">
//               <div className="welcome-overlay">
//                 <div className="row align-items-center">
//                   <div className="col-lg-8 col-md-7">
//                     <div className="welcome-content">
//                       <div className="greeting-badge">
//                         Employee Portal - Applications Management 👋
//                       </div>
//                       <h1 className="welcome-title">
//                         Franchise Applications
//                       </h1>
//                       <p className="welcome-subtitle">
//                         View and manage all Jan Arogya Kendra franchise applications
//                       </p>
//                     </div>
//                   </div>
//                   <div className="col-lg-4 col-md-5 text-center">
//                     <div className="profile-section">
//                       <div className="profile-image-container">
//                         <div className="service-icon-display">
//                           <span className="icon-emoji">📋</span>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>

//             {/* Filters and Search */}
//             <div className="card user-table-card mb-4">
//               <div className="card-body">
//                 <div className="row g-3">
//                   <div className="col-md-8">
//                     <div className="search-box">
//                       <i className="fas fa-search search-icon"></i>
//                       <input
//                         type="text"
//                         className="form-control form-control-custom search-input"
//                         placeholder="Search by name, aadhaar, phone or location..."
//                         value={searchTerm}
//                         onChange={handleSearch}
//                       />
//                     </div>
//                   </div>
//                   <div className="col-md-4">
//                     <select
//                       className="form-control form-control-custom"
//                       value={statusFilter}
//                       onChange={handleStatusFilter}
//                     >
//                       <option value="all">All Statuses</option>
//                       <option value="pending">Pending</option>
//                       <option value="approved">Approved</option>
//                       <option value="rejected">Rejected</option>
//                     </select>
//                   </div>
//                 </div>
//               </div>
//             </div>

//             {/* Applications List */}
//             <div className="card user-table-card">
//               <div className="card-header-custom">
//                 <h3 className="header-title">Applications List</h3>
//                 <p className="header-subtitle">
//                   {filteredApplications.length} application(s) found
//                 </p>
//               </div>

//               <div className="card-body">
//                 {isLoading ? (
//                   <div className="text-center py-5">
//                     <div className="spinner-border text-primary" role="status">
//                       <span className="visually-hidden">Loading...</span>
//                     </div>
//                     <p className="mt-3">Loading applications...</p>
//                   </div>
//                 ) : filteredApplications.length === 0 ? (
//                   <div className="text-center py-5">
//                     <i className="fas fa-inbox fa-3x text-muted mb-3"></i>
//                     <h5>No applications found</h5>
//                     <p className="text-muted">
//                       {searchTerm || statusFilter !== "all" 
//                         ? "Try adjusting your search or filter criteria" 
//                         : "No franchise applications have been submitted yet"}
//                     </p>
//                   </div>
//                 ) : (
//                   <div className="table-responsive">
//                     <table className="table table-hover">
//                       <thead>
//                         <tr>
//                           <th>ID</th>
//                           <th>Applicant</th>
//                           <th>Contact</th>
//                           <th>Category</th>
//                           <th>Investment Capacity</th>
//                           <th>Location</th>
//                           <th>Status</th>
//                           <th>Applied On</th>
//                           <th>Actions</th>
//                         </tr>
//                       </thead>
//                       <tbody>
//                         {filteredApplications.map((app) => (
//                           <tr key={app.id}>
//                             <td>#{app.id}</td>
//                             <td>
//                               <div className="d-flex align-items-center">
//                                 <div className="avatar-circle me-3">
//                                   {app.name.charAt(0)}
//                                 </div>
//                                 <div>
//                                   <div className="fw-bold">{app.name}</div>
//                                   <div className="small text-muted">
//                                     {app.aadhaar}
//                                   </div>
//                                 </div>
//                               </div>
//                             </td>
//                             <td>{app.phone}</td>
//                             <td>{getCategoryDisplay(app.category)}</td>
//                             <td>₹{app.investmentCapacity}</td>
//                             <td>{app.proposedLocation}</td>
//                             <td>{getStatusBadge(app.status)}</td>
//                             <td>{app.appliedDate}</td>
//                             <td>
//                               <button
//                                 className="btn btn-sm btn-outline-primary"
//                                 onClick={() => viewApplicationDetails(app)}
//                               >
//                                 <i className="fas fa-eye me-1"></i> View
//                               </button>
//                             </td>
//                           </tr>
//                         ))}
//                       </tbody>
//                     </table>
//                   </div>
//                 )}
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Application Detail Modal */}
//       {showModal && selectedApplication && (
//         <div className="modal fade show d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
//           <div className="modal-dialog modal-lg modal-dialog-centered">
//             <div className="modal-content">
//               <div className="modal-header">
//                 <h5 className="modal-title">
//                   Application Details #{selectedApplication.id}
//                 </h5>
//                 <button
//                   type="button"
//                   className="btn-close"
//                   onClick={() => setShowModal(false)}
//                 ></button>
//               </div>
//               <div className="modal-body">
//                 <div className="row mb-4">
//                   <div className="col-md-6">
//                     <h6 className="section-subtitle">Personal Information</h6>
//                     <div className="detail-item">
//                       <label>Full Name:</label>
//                       <span>{selectedApplication.name}</span>
//                     </div>
//                     <div className="detail-item">
//                       <label>Aadhaar Number:</label>
//                       <span>{selectedApplication.aadhaar}</span>
//                     </div>
//                     <div className="detail-item">
//                       <label>Phone:</label>
//                       <span>{selectedApplication.phone}</span>
//                     </div>
//                     <div className="detail-item">
//                       <label>Address:</label>
//                       <span>{selectedApplication.address}</span>
//                     </div>
//                   </div>
//                   <div className="col-md-6">
//                     <h6 className="section-subtitle">Business Information</h6>
//                     <div className="detail-item">
//                       <label>Business Type:</label>
//                       <span>{selectedApplication.businessType}</span>
//                     </div>
//                     <div className="detail-item">
//                       <label>Investment Capacity:</label>
//                       <span>₹{selectedApplication.investmentCapacity}</span>
//                     </div>
//                     <div className="detail-item">
//                       <label>Proposed Location:</label>
//                       <span>{selectedApplication.proposedLocation}</span>
//                     </div>
//                     <div className="detail-item">
//                       <label>Franchise Category:</label>
//                       <span>{getCategoryDisplay(selectedApplication.category)}</span>
//                     </div>
//                   </div>
//                 </div>

//                 <div className="row mb-4">
//                   <div className="col-12">
//                     <h6 className="section-subtitle">Relevant Experience</h6>
//                     <p>{selectedApplication.relevantExperience}</p>
//                   </div>
//                 </div>

//                 <div className="row">
//                   <div className="col-12">
//                     <h6 className="section-subtitle">Documents</h6>
//                     <div className="d-flex gap-3">
//                       <div className="document-pill">
//                         <i className="fas fa-id-card me-2"></i>
//                         ID Proof
//                       </div>
//                       <div className="document-pill">
//                         <i className="fas fa-graduation-cap me-2"></i>
//                         Qualification Certificate
//                       </div>
//                       <div className="document-pill">
//                         <i className="fas fa-file-invoice-dollar me-2"></i>
//                         Financial Statement
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//               <div className="modal-footer">
//                 <button
//                   type="button"
//                   className="btn btn-secondary"
//                   onClick={() => setShowModal(false)}
//                 >
//                   Close
//                 </button>
//                 {selectedApplication.status === "pending" && (
//                   <>
//                     <button type="button" className="btn btn-success">
//                       Approve
//                     </button>
//                     <button type="button" className="btn btn-danger">
//                       Reject
//                     </button>
//                   </>
//                 )}
//               </div>
//             </div>
//           </div>
//         </div>
//       )}

//       <style jsx>{`
//         .dashboard-container {
//           background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
//           min-height: 100vh;
//           padding: 0;
//         }

//         .welcome-card {
//           background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
//           border-radius: 20px;
//           margin-bottom: 2rem;
//           overflow: hidden;
//           position: relative;
//           box-shadow: 0 20px 40px rgba(102, 126, 234, 0.3);
//         }

//         .welcome-overlay {
//           padding: 2rem;
//           position: relative;
//           z-index: 2;
//         }

//         .welcome-content {
//           color: white;
//         }

//         .greeting-badge {
//           display: inline-block;
//           background: rgba(255, 255, 255, 0.2);
//           padding: 0.5rem 1rem;
//           border-radius: 50px;
//           font-size: 0.9rem;
//           font-weight: 500;
//           margin-bottom: 1rem;
//           backdrop-filter: blur(10px);
//         }

//         .welcome-title {
//           font-size: 2.2rem;
//           font-weight: 700;
//           margin-bottom: 0.5rem;
//           background: linear-gradient(45deg, #ffffff, #f8f9ff);
//           -webkit-background-clip: text;
//           -webkit-text-fill-color: transparent;
//         }

//         .welcome-subtitle {
//           font-size: 1.1rem;
//           opacity: 0.9;
//           margin-bottom: 0;
//         }

//         .service-icon-display {
//           width: 100px;
//           height: 100px;
//           border-radius: 50%;
//           background: rgba(255, 255, 255, 0.2);
//           display: flex;
//           align-items: center;
//           justify-content: center;
//           font-size: 3rem;
//           backdrop-filter: blur(10px);
//           border: 2px solid rgba(255, 255, 255, 0.3);
//         }

//         .user-table-card {
//           background: white;
//           border-radius: 20px;
//           box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
//           border: none;
//           overflow: hidden;
//         }

//         .card-header-custom {
//           padding: 1.5rem 1.5rem 0;
//           margin-bottom: 1.5rem;
//         }

//         .header-title {
//           font-size: 1.5rem;
//           font-weight: 600;
//           color: #1f2937;
//           margin: 0;
//         }

//         .header-subtitle {
//           color: #6b7280;
//           font-size: 1rem;
//           margin: 0.5rem 0 0;
//         }

//         .search-box {
//           position: relative;
//         }

//         .search-icon {
//           position: absolute;
//           left: 15px;
//           top: 50%;
//           transform: translateY(-50%);
//           color: #6b7280;
//           z-index: 10;
//         }

//         .search-input {
//           padding-left: 40px;
//         }

//         .form-control-custom {
//           border-radius: 10px;
//           padding: 0.75rem 1rem;
//           border: 1px solid #d1d5db;
//           transition: all 0.3s ease;
//           width: 100%;
//           font-size: 1rem;
//         }

//         .form-control-custom:focus {
//           border-color: #3b82f6;
//           box-shadow: 0 0 0 0.2rem rgba(59, 130, 246, 0.25);
//           outline: none;
//         }

//         .avatar-circle {
//           width: 40px;
//           height: 40px;
//           border-radius: 50%;
//           background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
//           color: white;
//           display: flex;
//           align-items: center;
//           justify-content: center;
//           font-weight: bold;
//         }

//         .badge {
//           padding: 0.5rem 0.75rem;
//           border-radius: 50px;
//           font-size: 0.8rem;
//         }

//         .section-subtitle {
//           font-size: 1.1rem;
//           font-weight: 600;
//           color: #374151;
//           margin-bottom: 1rem;
//           padding-bottom: 0.5rem;
//           border-bottom: 2px solid #e5e7eb;
//         }

//         .detail-item {
//           display: flex;
//           justify-content: space-between;
//           padding: 0.5rem 0;
//           border-bottom: 1px solid #f3f4f6;
//         }

//         .detail-item label {
//           font-weight: 600;
//           color: #374151;
//           margin: 0;
//         }

//         .document-pill {
//           padding: 0.5rem 1rem;
//           background: #f3f4f6;
//           border-radius: 50px;
//           font-size: 0.9rem;
//           display: inline-flex;
//           align-items: center;
//         }

//         @media (max-width: 768px) {
//           .welcome-title {
//             font-size: 1.8rem;
//           }

//           .welcome-overlay {
//             padding: 1.5rem;
//           }
//         }
//       `}</style>
//     </div>
//   );
// };

// export default Empusers;


import { useState, useEffect } from 'react';

const Empusers = () => {
  const [applications, setApplications] = useState([]);
  const [filteredApplications, setFilteredApplications] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [serviceFilter, setServiceFilter] = useState("all");
  const [isLoading, setIsLoading] = useState(true);
  const [selectedApplication, setSelectedApplication] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [error, setError] = useState(null);

  // Fetch applications from API
  useEffect(() => {
    const fetchApplications = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await fetch('https://ruwa-backend.onrender.com/api/employee/applied-by-me', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}` // Adjust based on your auth method
          }
        });

        if (!response.ok) {
          throw new Error('Failed to fetch applications');
        }

        const data = await response.json();
        
        if (data.success) {
          // Add unique IDs and format data
          const formattedData = data.appliedUsers.map((app, index) => ({
            id: index + 1,
            ...app,
            appliedDate: new Date(app.submittedAt || Date.now()).toLocaleDateString('en-IN')
          }));
          
          setApplications(formattedData);
          setFilteredApplications(formattedData);
        } else {
          throw new Error(data.message || 'Failed to fetch applications');
        }
      } catch (error) {
        console.error("Error fetching applications:", error);
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchApplications();
  }, []);

  // Filter applications based on search term, status, and service
  useEffect(() => {
    let results = applications;
    
    // Apply search filter
    if (searchTerm) {
      results = results.filter(app => 
        app.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (app.aadhaarNumber && app.aadhaarNumber.includes(searchTerm)) ||
        app.phone.includes(searchTerm) ||
        (app.email && app.email.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (app.proposedLocation && app.proposedLocation.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }
    
    // Apply status filter
    if (statusFilter !== "all") {
      results = results.filter(app => app.status === statusFilter);
    }

    // Apply service filter
    if (serviceFilter !== "all") {
      results = results.filter(app => app.service === serviceFilter);
    }
    
    setFilteredApplications(results);
  }, [searchTerm, statusFilter, serviceFilter, applications]);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleStatusFilter = (e) => {
    setStatusFilter(e.target.value);
  };

  const handleServiceFilter = (e) => {
    setServiceFilter(e.target.value);
  };

  const viewApplicationDetails = (app) => {
    setSelectedApplication(app);
    setShowModal(true);
  };

  const getStatusBadge = (status) => {
    switch (status?.toLowerCase()) {
      case "approved":
        return <span className="badge bg-success">Approved</span>;
      case "rejected":
        return <span className="badge bg-danger">Rejected</span>;
      case "pending":
        return <span className="badge bg-warning">Pending</span>;
      default:
        return <span className="badge bg-secondary">{status || 'Unknown'}</span>;
    }
  };

  const getServiceDisplay = (service) => {
    switch (service) {
      case "AmbulanceBooking":
        return "Ambulance Booking";
      case "ApplyInsurance":
        return "Insurance Application";
      case "JanArogyaApplication":
        return "Jan Arogya Application";
      case "JanArogyaApply":
        return "Jan Arogya Franchise";
      default:
        return service;
    }
  };

  const getServiceIcon = (service) => {
    switch (service) {
      case "AmbulanceBooking":
        return "🚑";
      case "ApplyInsurance":
        return "🛡️";
      case "JanArogyaApplication":
        return "🏥";
      case "JanArogyaApply":
        return "🏪";
      default:
        return "📋";
    }
  };

  const renderApplicationDetails = (app) => {
    const commonDetails = (
      <>
        <div className="detail-item">
          <label>Full Name:</label>
          <span>{app.name}</span>
        </div>
        <div className="detail-item">
          <label>Email:</label>
          <span>{app.email || 'N/A'}</span>
        </div>
        <div className="detail-item">
          <label>Phone:</label>
          <span>{app.phone || "N/A"}</span>
        </div>
        <div className="detail-item">
          <label>Service:</label>
          <span>{getServiceDisplay(app.service)}</span>
        </div>
        <div className="detail-item">
          <label>Status:</label>
          <span>{getStatusBadge(app.status)}</span>
        </div>
      </>
    );

    switch (app.service) {
      case "AmbulanceBooking":
        return (
          <>
            {commonDetails}
            <div className="detail-item">
              <label>Hospital Preference:</label>
              <span>{app.hospitalPreference || 'N/A'}</span>
            </div>
            <div className="detail-item">
              <label>Appointment Date:</label>
              <span>{app.appointmentDate ? new Date(app.appointmentDate).toLocaleDateString('en-IN') : 'N/A'}</span>
            </div>
            <div className="detail-item">
              <label>Preferred Time:</label>
              <span>{app.preferredTime || 'N/A'}</span>
            </div>
          </>
        );
      
      case "ApplyInsurance":
        return (
          <>
            {commonDetails}
            <div className="detail-item">
              <label>Aadhaar Number:</label>
              <span>{app.aadhaarNumber || 'N/A'}</span>
            </div>
            <div className="detail-item">
              <label>District:</label>
              <span>{app.district || 'N/A'}</span>
            </div>
            <div className="detail-item">
              <label>Date of Birth:</label>
              <span>{app.dob ? new Date(app.dob).toLocaleDateString('en-IN') : 'N/A'}</span>
            </div>
            <div className="detail-item">
              <label>Insurance Type:</label>
              <span>{app.insuranceType || 'N/A'}</span>
            </div>
          </>
        );
      
      case "JanArogyaApplication":
        return (
          <>
            {commonDetails}
            <div className="detail-item">
              <label>State:</label>
              <span>{app.state || 'N/A'}</span>
            </div>
            <div className="detail-item">
              <label>District:</label>
              <span>{app.district || 'N/A'}</span>
            </div>
          </>
        );
      
      case "JanArogyaApply":
        return (
          <>
            {commonDetails}
            <div className="detail-item">
              <label>Business Type:</label>
              <span>{app.businessType || 'N/A'}</span>
            </div>
            <div className="detail-item">
              <label>Investment Capacity:</label>
              <span>{app.investmentCapacity || 'N/A'}</span>
            </div>
            <div className="detail-item">
              <label>Proposed Location:</label>
              <span>{app.proposedLocation || 'N/A'}</span>
            </div>
            <div className="detail-item">
              <label>Franchise Category:</label>
              <span>{app.franchiseCategory || app.category || 'N/A'}</span>
            </div>
          </>
        );
      
      default:
        return commonDetails;
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
                        Employee Portal - Applications Management 👋
                      </div>
                      <h1 className="welcome-title">
                        User Applications
                      </h1>
                      <p className="welcome-subtitle">
                        View and manage all applications submitted through your referrals
                      </p>
                    </div>
                  </div>
                  <div className="col-lg-4 col-md-5 text-center">
                    <div className="profile-section">
                      <div className="profile-image-container">
                        <div className="service-icon-display">
                          <span className="icon-emoji">📋</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Filters and Search */}
            <div className="card user-table-card mb-4">
              <div className="card-body">
                <div className="row g-3">
                  <div className="col-md-6">
                    <div className="search-box">
                      <i className="fas fa-search search-icon"></i>
                      <input
                        type="text"
                        className="form-control form-control-custom search-input"
                        placeholder="Search by name, phone, email..."
                        value={searchTerm}
                        onChange={handleSearch}
                      />
                    </div>
                  </div>
                  <div className="col-md-3">
                    <select
                      className="form-control form-control-custom"
                      value={statusFilter}
                      onChange={handleStatusFilter}
                    >
                      <option value="all">All Statuses</option>
                      <option value="pending">Pending</option>
                      <option value="approved">Approved</option>
                      <option value="rejected">Rejected</option>
                    </select>
                  </div>
                  <div className="col-md-3">
                    <select
                      className="form-control form-control-custom"
                      value={serviceFilter}
                      onChange={handleServiceFilter}
                    >
                      <option value="all">All Services</option>
                      <option value="AmbulanceBooking">Ambulance Booking</option>
                      <option value="ApplyInsurance">Insurance Application</option>
                      <option value="JanArogyaApplication">Jan Arogya Application</option>
                      <option value="JanArogyaApply">Jan Arogya Franchise</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>

            {/* Applications List */}
            <div className="card user-table-card">
              <div className="card-header-custom">
                <h3 className="header-title">Applications List</h3>
                <p className="header-subtitle">
                  {filteredApplications.length} application(s) found
                </p>
              </div>

              <div className="card-body">
                {isLoading ? (
                  <div className="text-center py-5">
                    <div className="spinner-border text-primary" role="status">
                      <span className="visually-hidden">Loading...</span>
                    </div>
                    <p className="mt-3">Loading applications...</p>
                  </div>
                ) : error ? (
                  <div className="text-center py-5">
                    <i className="fas fa-exclamation-triangle fa-3x text-danger mb-3"></i>
                    <h5>Error loading applications</h5>
                    <p className="text-muted">{error}</p>
                    <button 
                      className="btn btn-primary"
                      onClick={() => window.location.reload()}
                    >
                      Retry
                    </button>
                  </div>
                ) : filteredApplications.length === 0 ? (
                  <div className="text-center py-5">
                    <i className="fas fa-inbox fa-3x text-muted mb-3"></i>
                    <h5>No applications found</h5>
                    <p className="text-muted">
                      {searchTerm || statusFilter !== "all" || serviceFilter !== "all"
                        ? "Try adjusting your search or filter criteria" 
                        : "No applications have been submitted through your referrals yet"}
                    </p>
                  </div>
                ) : (
                  <div className="table-responsive">
                    <table className="table table-hover">
                      <thead>
                        <tr>
                          <th>ID</th>
                          <th>Applicant</th>
                          <th>Contact</th>
                          <th>Service</th>
                          <th>Status</th>
                          <th>Applied On</th>
                          <th>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredApplications.map((app) => (
                          <tr key={app.id}>
                            <td>#{app.id}</td>
                            <td>
                              <div className="d-flex align-items-center">
                                <div className="avatar-circle me-3">
                                  {app.name.charAt(0).toUpperCase()}
                                </div>
                                <div>
                                  <div className="fw-bold">{app.name}</div>
                                  <div className="small text-muted">
                                    {app.email || 'No email'}
                                  </div>
                                </div>
                              </div>
                            </td>
                            <td>{app.phone}</td>
                            <td>
                              <span className="service-badge">
                                {getServiceIcon(app.service)} {getServiceDisplay(app.service)}
                              </span>
                            </td>
                            <td>{getStatusBadge(app.status)}</td>
                            <td>{app.appliedDate}</td>
                            <td>
                              <button
                                className="btn btn-sm btn-outline-primary"
                                onClick={() => viewApplicationDetails(app)}
                              >
                                <i className="fas fa-eye me-1"></i> View
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Application Detail Modal */}
      {showModal && selectedApplication && (
        <div className="modal fade show d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog modal-lg modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">
                  Application Details #{selectedApplication.id}
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setShowModal(false)}
                ></button>
              </div>
              <div className="modal-body">
                <div className="row">
                  <div className="col-12">
                    <h6 className="section-subtitle">
                      {getServiceIcon(selectedApplication.service)} {getServiceDisplay(selectedApplication.service)} Details
                    </h6>
                    {renderApplicationDetails(selectedApplication)}
                  </div>
                </div>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => setShowModal(false)}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

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

        .search-box {
          position: relative;
        }

        .search-icon {
          position: absolute;
          left: 15px;
          top: 50%;
          transform: translateY(-50%);
          color: #6b7280;
          z-index: 10;
        }

        .search-input {
          padding-left: 40px;
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

        .avatar-circle {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: bold;
        }

        .service-badge {
          display: inline-block;
          padding: 0.4rem 0.8rem;
          background: #f3f4f6;
          border-radius: 20px;
          font-size: 0.85rem;
          color: #374151;
          font-weight: 500;
        }

        .badge {
          padding: 0.5rem 0.75rem;
          border-radius: 50px;
          font-size: 0.8rem;
        }

        .section-subtitle {
          font-size: 1.1rem;
          font-weight: 600;
          color: #374151;
          margin-bottom: 1rem;
          padding-bottom: 0.5rem;
          border-bottom: 2px solid #e5e7eb;
        }

        .detail-item {
          display: flex;
          justify-content: space-between;
          padding: 0.75rem 0;
          border-bottom: 1px solid #f3f4f6;
        }

        .detail-item label {
          font-weight: 600;
          color: #374151;
          margin: 0;
          min-width: 140px;
        }

        .detail-item span {
          text-align: right;
        }

        @media (max-width: 768px) {
          .welcome-title {
            font-size: 1.8rem;
          }

          .welcome-overlay {
            padding: 1.5rem;
          }

          .detail-item {
            flex-direction: column;
            align-items: flex-start;
          }

          .detail-item span {
            text-align: left;
            margin-top: 0.25rem;
          }
        }
      `}</style>
    </div>
  );
};

export default Empusers;