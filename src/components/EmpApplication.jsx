import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
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
  Phone,
  CheckCircle,
  FileCheck
} from 'lucide-react';
import ApplicationPopup from './ApplicationPopupCard';

export default function ApplicationPortal() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("allUsers");
  const [selectedService, setSelectedService] = useState(null);
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(false);
  const [services, setServices] = useState([]);
  const [filteredApplications, setFilteredApplications] = useState([]);
  const [openDropdown, setOpenDropdown] = useState(null);
  const [Application, setApplication] = useState(null);
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
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
    const token = localStorage.getItem("token");

    try {
      const res = await axios.get(
        `https://ruwa-backend.onrender.com/api/services/janarogya/check?id=${app.id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          },
        }
      );

      if (res.data.msg === "APPROVED") {
        setApplication(res.data.application);
        setShowPopup(true);
      }
    } catch (err) {
      console.log(err.response?.data || err.message);
    }
  }

  useEffect(() => {
    if (activeTab === "allUsers") {
      fetchAllUsers();
    } else if (activeTab !== "allUsers") {
      fetchApplicationHistory();
    }
  }, [activeTab]);

  const fetchAllUsers = async () => {
    setLoading(true);
    setApplications([]);
    try {
      const response = await fetch("https://ruwa-backend.onrender.com/api/employee/get/patient", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      const data = await response.json();

      if (data.success) {
        setApplications(
          data.users.map((user) => ({
            id: user._id,
            serviceType: "Check Up",
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
  };

  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem("token");
      
      await axios.delete(`https://ruwa-backend.onrender.com/api/employee/delete/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      alert("User deleted successfully!");
      fetchAllUsers();
    } catch (error) {
      console.error("Error deleting user:", error);
      alert("Failed to delete user!");
    }
  };

  const handleWithdrawl = async (phone, service) => {
    try {
      const token = localStorage.getItem("token");
      let query = "";
      
      if(service === "janArogyaApplication") query = "janarogya";
      if(service === "insurance") query = "apply-insurance";
      if(service === "janArogyaApply") query = "apply-kendra";
      if(service === "ambulance") query = "ambulance-booking";
      if(service === "janswabhiman") query = "sevaApplication";
      
      await axios.put(
        `https://ruwa-backend.onrender.com/api/services/${query}/withdrawn`, 
        { phone }, 
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Application withdrawn successfully!");
      fetchApplicationHistory();
    } catch (error) {
      console.error("Error withdrawing application:", error);
      alert("Failed to withdraw application!");
    }
  };

  const handleEKYC = (applicationId) => {
    // Navigate to E-KYC page with applicationId as query parameter
    navigate(`/E-KYC/?applicationId=${applicationId}`);
  };

  const fetchApplicationHistory = async () => {
    setLoading(true);
    setApplications([]);
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
          serviceParam = "sevaApplication";
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
          data.appliedUsers.map((app) => ({
            id: app._id || app.id,
            applicationId: app.applicationId,
            serviceType: data.service || app.serviceType,
            name: app.name || "No name",
            email: app.email || "No email",
            phone: app.phone || "No phone",
            dateApplied: app.createdAt
              ? new Date(app.createdAt).toLocaleDateString()
              : "N/A",
            status: app.status || "PENDING",
            EKYC: app.EKYC || false,
          }))
        );
        console.log(applications.applicationId)
      }
    } catch (error) {
      console.error("Error fetching application history:", error);
    }
    setLoading(false);
  };

  const handleServiceSelect = (service) => {
    setSelectedService(service);
  };

  const handleBackToServices = () => {
    setSelectedService(null);
  };

  const renderServiceForm = () => {
    if (!selectedService) return null;
    
    return (
      <div className="bg-white rounded-xl shadow-lg p-8">
        <div className="mb-6">
          <button 
            className="flex items-center gap-2 px-4 py-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors" 
            onClick={handleBackToServices}
          >
            <span>←</span> Back to Services
          </button>
          <h2 className="text-2xl font-bold mt-4">{selectedService.title} Application</h2>
        </div>
        
        <div className="space-y-6">
          <div className="flex justify-center mb-6">
            <div className="w-24 h-24 flex items-center justify-center text-5xl bg-gradient-to-br from-blue-100 to-indigo-100 rounded-2xl">
              {selectedService.icon}
            </div>
          </div>
          
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">User Information</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                <input 
                  type="text" 
                  placeholder="Enter user's full name"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Aadhaar Number</label>
                <input 
                  type="text" 
                  placeholder="Enter 12-digit Aadhaar number"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                <input 
                  type="tel" 
                  placeholder="Enter phone number"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                <input 
                  type="email" 
                  placeholder="Enter email address"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
            
            <h3 className="text-lg font-semibold mt-6">Application Details</h3>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Additional Information</label>
              <textarea 
                placeholder="Provide any additional information required for this service"
                rows="4"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              ></textarea>
            </div>
            
            <div className="flex gap-3 justify-end mt-6">
              <button 
                className="px-6 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors" 
                onClick={handleBackToServices}
              >
                Cancel
              </button>
              <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                Submit Application
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderStatusBadge = (status) => {
    const statusStyles = {
      APPROVED: 'bg-green-100 text-green-800',
      PENDING: 'bg-yellow-100 text-yellow-800',
      REJECTED: 'bg-red-100 text-red-800',
      WITHDRAWN: 'bg-gray-100 text-gray-800',
      default: 'bg-blue-100 text-blue-800'
    };

    return (
      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${statusStyles[status] || statusStyles.default}`}>
        {status}
      </span>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl shadow-xl p-8 mb-8">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="text-white mb-4 md:mb-0">
              <div className="inline-block bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full mb-3">
                <span className="text-sm font-medium">Application Portal 👋</span>
              </div>
              <h1 className="text-3xl font-bold mb-2">
                {selectedService ? selectedService.title : "Employee Services"}
              </h1>
              <p className="text-blue-100">
                {selectedService 
                  ? "Complete the application form for the user" 
                  : "Select a service to assist users with healthcare & welfare services"}
              </p>
            </div>
            <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center text-4xl">
              {selectedService ? selectedService.icon : "👨‍💼"}
            </div>
          </div>
        </div>

        {/* Tabs */}
        {!selectedService && (
          <div className="bg-white rounded-xl shadow-md p-2 mb-8 overflow-x-auto">
            <div className="flex gap-2 min-w-max">
              <button 
                className={`px-4 py-3 rounded-lg font-medium transition-all whitespace-nowrap ${
                  activeTab === 'allUsers' 
                    ? 'bg-blue-600 text-white shadow-lg' 
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
                onClick={() => setActiveTab('allUsers')}
              >
                <span className="flex items-center gap-2">
                  <User className="w-4 h-4" />
                  All Users
                </span>
              </button>
              <button 
                className={`px-4 py-3 rounded-lg font-medium transition-all whitespace-nowrap ${
                  activeTab === 'swabhiman' 
                    ? 'bg-blue-600 text-white shadow-lg' 
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
                onClick={() => setActiveTab('swabhiman')}
              >
                Jan Swabhiman Seva
              </button>
              <button 
                className={`px-4 py-3 rounded-lg font-medium transition-all whitespace-nowrap ${
                  activeTab === 'arogyaCard' 
                    ? 'bg-blue-600 text-white shadow-lg' 
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
                onClick={() => setActiveTab('arogyaCard')}
              >
                Jan Arogya Card
              </button>
              <button 
                className={`px-4 py-3 rounded-lg font-medium transition-all whitespace-nowrap ${
                  activeTab === 'insurance' 
                    ? 'bg-blue-600 text-white shadow-lg' 
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
                onClick={() => setActiveTab('insurance')}
              >
                Health Insurance
              </button>
              <button 
                className={`px-4 py-3 rounded-lg font-medium transition-all whitespace-nowrap ${
                  activeTab === 'ambulance' 
                    ? 'bg-blue-600 text-white shadow-lg' 
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
                onClick={() => setActiveTab('ambulance')}
              >
                Emergency Ambulance
              </button>
              <button 
                className={`px-4 py-3 rounded-lg font-medium transition-all whitespace-nowrap ${
                  activeTab === 'kendra' 
                    ? 'bg-blue-600 text-white shadow-lg' 
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
                onClick={() => setActiveTab('kendra')}
              >
                Jan Arogya Kendra
              </button>
            </div>
          </div>
        )}

        {/* Service Form */}
        {selectedService && renderServiceForm()}

        {/* Application History */}
        {!selectedService && (
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="bg-gradient-to-r from-gray-50 to-gray-100 px-6 py-4 border-b border-gray-200">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <h3 className="text-xl font-bold text-gray-800">
                  {activeTab === 'history' 
                    ? 'All Application History' 
                    : `${getServiceNameFromTab(activeTab) || 'All Users'} Applications`}
                </h3>
                <select className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                  <option>All Status</option>
                  <option>Active</option>
                  <option>Inactive</option>
                  <option>Pending</option>
                  <option>Suspended</option>
                </select>
              </div>
            </div>

            <div className="p-6">
              {loading ? (
                <div className="flex flex-col items-center justify-center py-12">
                  <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mb-4"></div>
                  <p className="text-gray-600">Loading application history...</p>
                </div>
              ) : (
                <div className="overflow-x-auto">
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
                              <div className="space-y-2">
                                {renderStatusBadge(app.status)}
                                {activeTab === 'kendra' && app.status === 'APPROVED' && (
                                  <div className="flex items-center gap-1 text-xs">
                                    <CheckCircle className="w-3 h-3" />
                                    <span className={app.EKYC ? 'text-green-600 font-medium' : 'text-orange-600 font-medium'}>
                                      E-KYC: {app.EKYC ? 'Completed' : 'Pending'}
                                    </span>
                                  </div>
                                )}
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              {app.status !== "WITHDRAWN" && (
                                <div className="flex items-center gap-2">
                                  {/* E-KYC Button for Kendra tab */}
                                  {activeTab === 'kendra' && 
                                   app.status === 'APPROVED' && 
                                   !app.EKYC && (
                                    <button
                                      onClick={() => handleEKYC(app.applicationId)}
                                      className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-green-500 to-emerald-600 text-white text-sm font-medium rounded-lg hover:from-green-600 hover:to-emerald-700 transition-all shadow-md hover:shadow-lg transform hover:scale-105"
                                      title="Complete E-KYC Verification"
                                    >
                                      <FileCheck className="w-4 h-4" />
                                      Complete E-KYC
                                    </button>
                                  )}

                                  {/* Dropdown Menu */}
                                  <div className="relative">
                                    <button
                                      className="inline-flex items-center justify-center w-8 h-8 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors"
                                      onClick={() => setOpenDropdown(openDropdown === app.id ? null : app.id)}
                                    >
                                      <MoreVertical className="w-4 h-4" />
                                    </button>

                                    {openDropdown === app.id && (
                                      <>
                                        <div 
                                          className="fixed inset-0 z-10" 
                                          onClick={() => setOpenDropdown(null)}
                                        />
                                        
                                        <div className="absolute right-0 mt-1 w-48 bg-white rounded-lg shadow-xl ring-1 ring-black ring-opacity-5 z-20">
                                          <div className="py-1">
                                            {activeTab === "allUsers" ? (
                                              <>
                                                <button
                                                  className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                                                  onClick={() => {
                                                    handleUpdate(app.id);
                                                    setOpenDropdown(null);
                                                  }}
                                                >
                                                  <Edit className="w-4 h-4 mr-3" />
                                                  Update
                                                </button>
                                                <button
                                                  className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
                                                  onClick={() => {
                                                    handleDelete(app.id);
                                                    setOpenDropdown(null);
                                                  }}
                                                >
                                                  <Trash2 className="w-4 h-4 mr-3" />
                                                  Delete
                                                </button>
                                              </>
                                            ) : (
                                              <>
                                                <button
                                                  className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
                                                  onClick={() => {
                                                    handleWithdrawl(app.phone, app.serviceType);
                                                    setOpenDropdown(null);
                                                  }}
                                                >
                                                  <Trash2 className="w-4 h-4 mr-3" />
                                                  Withdraw
                                                </button>
                                                {app.status === "APPROVED" && (
                                                  <button
                                                    className="flex items-center w-full px-4 py-2 text-sm text-blue-600 hover:bg-blue-50 transition-colors"
                                                    onClick={() => {
                                                      handleView(app);
                                                      setOpenDropdown(null);
                                                    }}
                                                  >
                                                    <Eye className="w-4 h-4 mr-3" />
                                                    View Details
                                                  </button>
                                                )}
                                              </>
                                            )}
                                          </div>
                                        </div>
                                      </>
                                    )}
                                  </div>
                                </div>
                              )}
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan="5" className="px-6 py-12 text-center">
                            <div className="flex flex-col items-center justify-center text-gray-500">
                              <FileText className="w-16 h-16 mb-4 text-gray-300" />
                              <p className="text-lg font-medium">No applications found</p>
                              <p className="text-sm mt-1">No applications found for this service.</p>
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
        )}
      </div>
    </div>
  );
}