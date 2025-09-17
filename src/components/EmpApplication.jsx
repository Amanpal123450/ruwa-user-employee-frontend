import React, { useState, useEffect, act } from 'react';
import { useAuth } from '../components/AuthContext';
import { FaEdit, FaTrash, FaEllipsisV } from "react-icons/fa";
import axios from 'axios';
import { 
  FileText, 
  MoreVertical, 
  Edit, 
  Trash2, 
  Eye,
  Calendar,
  User,
  Mail,
  Phone
} from 'lucide-react';
// import JanArogyaCard from './HealthCard';
// // import Healthcardback from "../components/Healthcardback";
// import Healthcardback from "./Healthcardback";
// import html2pdf from "html2pdf.js"; // 👈 install karo: npm install html2pdf.js
import ApplicationPopup from './ApplicationPopupCard';

export default function ApplicationPortal() {
  const { user } = useAuth();
 const [activeTab, setActiveTab] = useState("allUsers");

  const [selectedService, setSelectedService] = useState(null);
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(false);
  const [services, setServices] = useState([]);
  const [filteredApplications, setFilteredApplications] = useState([]);
  const [openDropdown, setOpenDropdown] = useState(null);
  const [Application, setApplication] = useState(null);
  const [showPopup, setShowPopup] = useState(false);


  // Services data
  useEffect(() => {
    // Mock services data
    const mockServices = [
      {
        id: 1,
        title: "Jan Swabhiman Seva",
        description: "Apply for various government welfare schemes and services",
        icon: "👨‍💼",
        gradient: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
      },
      {
        id: 2,
        title: "Jan Arogya Card",
        description: "Apply for health insurance card providing cashless treatment",
        icon: "🏥",
        gradient: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)"
      },
      {
        id: 3,
        title: "Health Insurance",
        description: "Enroll in comprehensive health insurance plans",
        icon: "🩺",
        gradient: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)"
      },
      {
        id: 4,
        title: "Emergency Ambulance",
        description: "Request emergency ambulance services",
        icon: "🚑",
        gradient: "linear-gradient(135deg, #fa709a 0%, #fee140 100%)"
      },
      {
        id: 5,
        title: "Jan Arogya Kendra",
        description: "Find and connect with health and wellness centers",
        icon: "🏥",
        gradient: "linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)"
      }
    ];
    setServices(mockServices);
  }, []);

async function handleView(app) {
  try {
    const res = await axios.get(
      "https://ruwa-backend.onrender.com/api/services/janarogya/check",
      {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      }
    );

    if (res.data.msg === "APPROVED") {
      setApplication(res.data.application);
      setShowPopup(true); // 👈 modal open
    }
  } catch (err) {
    console.log(err);
  }
}


  // Fetch application history from API when tab changes
 useEffect(() => {
  if (activeTab === "allUsers") {
    fetchAllUsers();
  } else if (activeTab !== "allUsers") {
    fetchApplicationHistory();
  }
}, [activeTab]);

const fetchAllUsers = async () => {
  setLoading(true);
  setApplications([]); // 👈 reset to avoid stale data
  try {
    const response = await fetch("https://ruwa-backend.onrender.com/api/employee/get/patient", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });

    const data = await response.json();

    if (data.success) {
      setApplications(
        data.users.map((user, index) => ({
          id: user._id,
          serviceType: "Check Up", // or Patient
          name: user.name,
          email: user.email,
          phone: user.phone,
          status: user.status || "N/A",
          dateApplied: user.createdAt
            ? new Date(user.createdAt).toLocaleDateString()
            : "N/A",
        }))
      );
    }
  } catch (err) {
    console.error("Error fetching all users:", err);
  }
  setLoading(false);
};


  // Filter applications based on active tab
 useEffect(() => {
  if (applications.length > 0) {
    if (activeTab === 'history') {
      setFilteredApplications(applications);
    } else {
      const serviceName = getServiceNameFromTab(activeTab);
      setFilteredApplications(
        applications.filter(app => app.serviceType === serviceName)
      );
    }
  }
}, [applications, activeTab]);


  const getServiceNameFromTab = (tab) => {
    switch(tab) {
      case 'swabhiman': return 'Jan Swabhiman Seva';
      case 'arogyaCard': return 'Jan Arogya Card';
      case 'insurance': return 'Health Insurance';
      case 'ambulance': return 'Emergency Ambulance';
      case 'kendra': return 'Jan Arogya Kendra';
      default: return '';
    }
  };
const handleUpdate = (id) => {
  console.log("Update user with id:", id);
  // navigate to update form or open modal
};

const handleDelete = async (id) => {
  try {
    console.log("Delete user with id:", id);

    const token = localStorage.getItem("token"); // auth token (agar required ho)
    
    await axios.delete(`https://ruwa-backend.onrender.com/api/employee/delete/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`, // agar tumhare auth middleware me chahiye
      },
    });

    alert("User deleted successfully!");
    // Yaha pe state update karo taki UI se bhi remove ho jaye
    // setUsers(users.filter((u) => u.id !== id));
    fetchAllUsers();

  } catch (error) {
    console.error("Error deleting user:", error);
    alert("Failed to delete user!");
  }
};

const handleWithdrawl = async (phone,service) => {

  try {
    console.log("Delete user with id:", phone);

    const token = localStorage.getItem("token"); // auth token (agar required ho)
    let query=""
    if(service==="janArogyaApplication") query="janarogya";
    if(service==="insurance") query="apply-insurance";
    if(service==="janArogyaApply") query="apply-kendra";
    if(service==="ambulance") query="ambulance-booking";
    if(service==="janswabhiman") query="janswabhiman";
    await axios.put(`https://ruwa-backend.onrender.com/api/services/${query}/withdrawn`, { phone }, {
      headers: {
        Authorization: `Bearer ${token}`, // agar tumhare auth middleware me chahiye
      },
      
    });

    alert("User deleted successfully!");
    fetchApplicationHistory();
    // Yaha pe state update karo taki UI se bhi remove ho jaye
    // setUsers(users.filter((u) => u.id !== id));

  } catch (error) {
    console.error("Error deleting user:", error);
    alert("Failed to delete user!");
  }
};

  const fetchApplicationHistory = async () => {
  setLoading(true);
  setApplications([]); // 👈 reset to avoid showing stale data
  try {
    let serviceParam = "";

    switch (activeTab) {
      case "ambulance":
        serviceParam = "ambulance";
        break;
      case "insurance":
        serviceParam = "insurance";
        break;
      case "arogyaCard":
        serviceParam = "janArogyaApplication";
        break;
      case "kendra":
        serviceParam = "janArogyaApply";
        break;
      case "swabhiman":
        serviceParam = "swabhiman";
        break;
      default:
        serviceParam = "";
    }

    const url = serviceParam
      ? `https://ruwa-backend.onrender.com/api/employee/service-users?service=${serviceParam}`
      : `https://ruwa-backend.onrender.com/api/employee/service-users`;

    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });

    const data = await response.json();

    if (data.success) {
      setApplications(
        data.appliedUsers.map((app, index) => ({
          id: app._id || app.id,
          serviceType: data.service || app.serviceType,
          name: app.name || "No name",
          email: app.email || "No email",
          phone: app.phone || "No phone",
          dateApplied: app.createdAt
            ? new Date(app.createdAt).toLocaleDateString()
            : "N/A",
          status: app.status || "PENDING",
        }))
      );
    }
  } catch (error) {
    console.error("Error fetching application history:", error);
  }
  setLoading(false);
};



  const handleServiceSelect = (service) => {
    setSelectedService(service);
  };
 console.log(applications)
  const handleBackToServices = () => {
    setSelectedService(null);
  };
 
  const renderServiceForm = () => {
    if (!selectedService) return null;
    
    return (
      <div className="service-detail-page">
        <div className="page-header">
          <button className="back-button" onClick={handleBackToServices}>
            <i className="fas fa-arrow-left"></i> Back to Services
          </button>
          <h2>{selectedService.title} Application</h2>
        </div>
        
        <div className="service-content">
          <div className="service-icon-large">
            <span className="icon-emoji">{selectedService.icon}</span>
          </div>
          
          <div className="service-form">
            <h3>User Information</h3>
            
            <div className="row">
              <div className="col-md-6">
                <div className="form-group">
                  <label htmlFor="fullName">Full Name</label>
                  <input 
                    type="text" 
                    id="fullName" 
                    placeholder="Enter user's full name"
                  />
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group">
                  <label htmlFor="aadhaar">Aadhaar Number</label>
                  <input 
                    type="text" 
                    id="aadhaar" 
                    placeholder="Enter 12-digit Aadhaar number"
                  />
                </div>
              </div>
            </div>
            
            <div className="row">
              <div className="col-md-6">
                <div className="form-group">
                  <label htmlFor="phone">Phone Number</label>
                  <input 
                    type="tel" 
                    id="phone" 
                    placeholder="Enter phone number"
                  />
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group">
                  <label htmlFor="email">Email Address</label>
                  <input 
                    type="email" 
                    id="email" 
                    placeholder="Enter email address"
                  />
                </div>
              </div>
            </div>
            
            <h3>Application Details</h3>
            
            <div className="form-group">
              <label htmlFor="details">Additional Information</label>
              <textarea 
                id="details" 
                placeholder="Provide any additional information required for this service"
              ></textarea>
            </div>
            
            <div className="form-actions">
              <button className="btn-secondary" onClick={handleBackToServices}>
                Cancel
              </button>
              <button className="btn-primary">
                Submit Application
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };
 console.log(filteredApplications)
  const renderStatusBadge = (status) => {
    const statusClass = `status-${status.toLowerCase()}`;
    return (
      <span className={`status-badge ${statusClass}`}>
        {status}
      </span>
    );
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
                        Application Portal 👋
                      </div>
                      <h1 className="welcome-title">
                        {selectedService ? selectedService.title : "Employee Services"}
                      </h1>
                      <p className="welcome-subtitle">
                        {selectedService 
                          ? "Complete the application form for the user" 
                          : "Select a service to assist users with healthcare & welfare services"}
                      </p>
                    </div>
                  </div>
                  <div className="col-lg-4 col-md-5 text-center">
                    <div className="profile-section">
                      <div className="profile-image-container">
                        <div className="service-icon-display">
                          <span className="icon-emoji">
                            {selectedService ? selectedService.icon : "👨‍💼"}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Tabs */}
            {!selectedService && (
              <div className="portal-tabs mb-4">
                <button 
                  className={activeTab === 'allUsers' ? 'tab-active' : ''}
                  onClick={() => setActiveTab('allUsers')}
                >
                  <i className="fas fa-concierge-bell"></i> All Users
                </button>
                <button 
                  className={activeTab === 'swabhiman' ? 'tab-active' : ''}
                  onClick={() => setActiveTab('swabhiman')}
                >
                  <i className="fas fa-history"></i> Jan Swabhiman Seva History
                </button>
                <button 
                  className={activeTab === 'arogyaCard' ? 'tab-active' : ''}
                  onClick={() => setActiveTab('arogyaCard')}
                >
                  <i className="fas fa-history"></i> Jan Arogya Card
                </button>
                <button 
                  className={activeTab === 'insurance' ? 'tab-active' : ''}
                  onClick={() => setActiveTab('insurance')}
                >
                  <i className="fas fa-history"></i> Health Insurance
                </button>
                <button 
                  className={activeTab === 'ambulance' ? 'tab-active' : ''}
                  onClick={() => setActiveTab('ambulance')}
                >
                  <i className="fas fa-history"></i> Emergency Ambulance
                </button>
                <button 
                  className={activeTab === 'kendra' ? 'tab-active' : ''}
                  onClick={() => setActiveTab('kendra')}
                >
                  <i className="fas fa-history"></i> Jan Arogya Kendra
                </button>
              </div>
            )}

           

            {/* Service Form */}
            {selectedService && renderServiceForm()}
             
            {/* Application History for all tabs except allServices */}
            {!selectedService  && (
              <div className="applications-history">
                <div className="card user-table-card">
                  <div className="card-header-custom">
                    <h3 className="header-title">
                      {activeTab === 'history' 
                        ? 'All Application History' 
                        :`${getServiceNameFromTab(activeTab)} Applications`}
                    </h3>
                    <div className="filter-controls">
                      <select>
                        <option>All Status</option>
                        <option>Inactive</option>
                        <option>Active</option>
                        <option>Pending</option>
                        <option>Suspended</option>
                      </select>
                    </div>
                  </div>
                  <div className="card-body">
                    {loading ? (
                      <div className="text-center py-5">
                        <div className="spinner-border text-primary" role="status">
                          <span className="visually-hidden">Loading...</span>
                        </div>
                        <p className="mt-2">Loading application history...</p>
                      </div>
                    ) : (
                      <div className="table-responsive">
                        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Service Type
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                User Info
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Date Applied
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {applications.length > 0 ? (
              applications.map((app) => (
                <tr key={app.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center mr-3">
                        <FileText className="w-4 h-4 text-blue-600" />
                      </div>
                      <div className="text-sm font-medium text-gray-900">
                        {activeTab === "allUsers" ? "Check Up" : app.serviceType}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="space-y-1">
                      <div className="flex items-center text-sm font-medium text-gray-900">
                        <User className="w-4 h-4 mr-2 text-gray-400" />
                        {app.name}
                      </div>
                      <div className="flex items-center text-sm text-gray-500">
                        <Mail className="w-4 h-4 mr-2 text-gray-400" />
                        {app.email}
                      </div>
                      <div className="flex items-center text-sm text-gray-500">
                        <Phone className="w-4 h-4 mr-2 text-gray-400" />
                        {app.phone}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center text-sm text-gray-900">
                      <Calendar className="w-4 h-4 mr-2 text-gray-400" />
                      {app.dateApplied}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {renderStatusBadge(app.status)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {app.status !== "WITHDRAWN" && (
                      <div className="relative">
                        <button
                          className="inline-flex items-center justify-center w-8 h-8 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors"
                          onClick={() => setOpenDropdown(openDropdown === app.id ? null : app.id)}
                        >
                          <MoreVertical className="w-4 h-4" />
                        </button>

                        {openDropdown === app.id && (
                          <>
                            {/* Overlay to close dropdown */}
                            <div 
                              className="fixed inset-0 z-10" 
                              onClick={() => setOpenDropdown(null)}
                            />
                            
                            {/* Dropdown Menu */}
                            <div className="absolute right-0 mt-1 w-48 bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 z-20">
                              <div className="py-1">
                                {activeTab === "allUsers" ? (
                                  <>
                                    <button
                                      className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                                      onClick={() => handleUpdate(app.id)}
                                    >
                                      <Edit className="w-4 h-4 mr-3" />
                                      Update
                                    </button>
                                    <button
                                      className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
                                      onClick={() => handleDelete(app.id)}
                                    >
                                      <Trash2 className="w-4 h-4 mr-3" />
                                      Delete
                                    </button>
                                  </>
                                ) : (
                                  <>
                                    <button
                                      className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
                                      onClick={() => handleWithdrawl(app.phone, app.serviceType)}
                                    >
                                      <Trash2 className="w-4 h-4 mr-3" />
                                      Withdraw
                                    </button>
                                    {app.status === "APPROVED" && (
                                      <button
                                        className="flex items-center w-full px-4 py-2 text-sm text-blue-600 hover:bg-blue-50 transition-colors"
                                        onClick={() => handleView(app)}
                                      >
                                        <Eye className="w-4 h-4 mr-3" />
                                        View
                                      </button>
                                    )}
                                  </>
                                )}
                              </div>
                            </div>
                          </>
                        )}
                      </div>
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="px-6 py-12 text-center">
                  <div className="flex flex-col items-center justify-center text-gray-500">
                    <FileText className="w-12 h-12 mb-4 text-gray-300" />
                    <p className="text-sm">No applications found for this service.</p>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
                      </div>
                    )}
                   {showPopup && Application && (
  <ApplicationPopup
    Application={Application}
    onClose={() => setShowPopup(false)}
  />
)}

                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <style jsx>{`
        .dashboard-container {
          background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
          min-height: 100vh;
          padding: 0;
        }

        .action-dropdown {
  position: relative;
  display: inline-block;
}

.dropdown-content {
  position: absolute;
  top: 100%;
  right: 0;
  background-color: #fff;
  min-width: 120px;
  box-shadow: 0px 4px 6px rgba(0,0,0,0.1);
  border-radius: 6px;
  z-index: 100;
  padding: 5px 0;
}

.dropdown-item {
  padding: 8px 12px;
  width: 100%;
  text-align: left;
  border: none;
  background: none;
  cursor: pointer;
  font-size: 14px;
}

.dropdown-item:hover {
  background-color: #f1f1f1;
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

        .portal-tabs {
          display: flex;
          border-bottom: 1px solid #e5e7eb;
          margin-bottom: 2rem;
          background: white;
          border-radius: 12px;
          padding: 0.5rem;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
          overflow-x: auto;
        }

        .portal-tabs button {
          padding: 1rem 1.5rem;
          background: none;
          border: none;
          font-size: 1rem;
          font-weight: 500;
          color: #6b7280;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 0.5rem;
          transition: all 0.3s ease;
          flex: 1;
          justify-content: center;
          border-radius: 8px;
          white-space: nowrap;
          min-width: max-content;
        }

        .portal-tabs button:hover {
          color: #4f46e5;
          background: #f5f7fa;
        }

        .portal-tabs .tab-active {
          color: #4f46e5;
          background: #eef2ff;
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
          cursor: pointer;
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
          text-align: center;
        }

        .service-action {
          display: flex;
          align-items: center;
          justify-content: space-between;
          color: #4f46e5;
          font-weight: 500;
        }

        .service-detail-page {
          background: white;
          border-radius: 16px;
          padding: 2rem;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
          margin-bottom: 2rem;
        }

        .page-header {
          display: flex;
          align-items: center;
          margin-bottom: 2rem;
        }

        .back-button {
          background: none;
          border: none;
          color: #4f46e5;
          font-weight: 500;
          cursor: pointer;
          margin-right: 2rem;
        }

        .page-header h2 {
          font-size: 1.8rem;
          font-weight: 600;
          color: #1f2937;
          margin: 0;
        }

        .service-content {
          display: flex;
          gap: 2rem;
        }

        .service-icon-large {
          flex: 0 0 120px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 4rem;
        }

        .service-form {
          flex: 1;
        }

        .service-form h3 {
          font-size: 1.5rem;
          font-weight: 600;
          color: #1f2937;
          margin-bottom: 1.5rem;
        }

        .form-group {
          margin-bottom: 1.5rem;
        }

        .form-group label {
          display: block;
          font-weight: 500;
          color: #374151;
          margin-bottom: 0.5rem;
        }

        .form-group input,
        .form-group select,
        .form-group textarea {
          width: 100%;
          padding: 0.75rem 1rem;
          border: 1px solid #d1d5db;
          border-radius: 8px;
          font-size: 1rem;
          transition: all 0.3s ease;
        }

        .form-group input:focus,
        .form-group select:focus,
        .form-group textarea:focus {
          outline: none;
          border-color: #4f46e5;
          box-shadow: 0 0 0 3px rgba(79, 70, 229, 0.1);
        }

        .form-group textarea {
          min-height: 100px;
          resize: vertical;
        }

        .form-actions {
          display: flex;
          justify-content: flex-end;
          gap: 1rem;
          margin-top: 2rem;
        }

        .btn-primary {
          padding: 0.75rem 1.5rem;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          border: none;
          border-radius: 8px;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .btn-primary:hover {
          opacity: 0.9;
          transform: translateY(-2px);
        }

        .btn-secondary {
          padding: 0.75rem 1.5rem;
          background: #f3f4f6;
          color: #374151;
          border: none;
          border-radius: 8px;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .btn-secondary:hover {
          background: #e5e7eb;
        }

        .user-table-card {
          background: white;
          border-radius: 20px;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
          border: none;
          overflow: hidden;
        }

        .card-header-custom {
          padding: 1.5rem;
          display: flex;
          align-items: center;
          justify-content: space-between;
          border-bottom: 1px solid #f3f4f6;
        }

        .header-title {
          font-size: 1.3rem;
          font-weight: 600;
          color: #1f2937;
          margin: 0;
        }

        .filter-controls {
          display: flex;
          gap: 1rem;
        }

        .filter-controls select {
          padding: 0.5rem 1rem;
          border: 1px solid #e5e7eb;
          border-radius: 8px;
          background: white;
        }

        .app-icon-small {
          width: 30px;
          height: 30px;
          border-radius: 8px;
          background: rgba(79, 70, 229, 0.1);
          color: #4f46e5;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 0.9rem;
        }

        .status-badge {
          padding: 0.25rem 0.75rem;
          border-radius: 20px;
          font-size: 0.8rem;
          font-weight: 500;
        }

        .status-pending {
          background: #fef3c7;
          color: #92400e;
        }

        .status-approved {
          background: #d1fae5;
          color: #065f46;
        }

        .status-rejected {
          background: #fee2e2;
          color: #991b1b;
        }

        .status-completed {
          background: #dbeafe;
          color: #1e40af;
        }

        .status-processing {
          background: #f3e8ff;
          color: #7e22ce;
        }

        @media (max-width: 768px) {
          .welcome-title {
            font-size: 1.8rem;
          }
          
          .welcome-overlay {
            padding: 1.5rem;
          }
          
          .service-content {
            flex-direction: column;
          }
          
          .service-icon-large {
            margin-bottom: 1rem;
          }
          
          .portal-tabs {
            flex-direction: column;
          }
          
          .card-header-custom {
            flex-direction: column;
            align-items: flex-start;
            gap: 1rem;
          }
          
          .filter-controls {
            width: 100%;
            flex-direction: column;
          }
            .action-dropdown {
  position: relative;
  display: inline-block;
}

.action-dropdown .dropdown-content {
  display: none;
  position: absolute;
  top: 100%;
  right: 0;
  background-color: #fff;
  min-width: 100px;
  box-shadow: 0px 4px 6px rgba(0,0,0,0.1);
  border-radius: 4px;
  z-index: 10;
}

.action-dropdown:hover .dropdown-content {
  display: block;
}

.dropdown-item {
  padding: 8px 12px;
  width: 100%;
  text-align: left;
  border: none;
  background: none;
  cursor: pointer;
}

.dropdown-item:hover {
  background-color: #f1f1f1;
}
  .modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0,0,0,0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
}
.modal-content {
  background: #fff;
  padding: 20px;
  border-radius: 12px;
  max-width: 600px;
  width: 90%;
  max-height: 90vh;
  overflow-y: auto;
  position: relative;
}
.btn-close {
  position: absolute;
  top: 10px;
  right: 10px;
  background: none;
  border: none;
  font-size: 20px;
  cursor: pointer;
}


        }
      `}</style>
    </div>
  );
}