import React, { useState, useEffect } from 'react';
import { Camera, Upload, MapPin, Home, User, FileText, CheckCircle, AlertCircle, Loader } from 'lucide-react';

export default function EKYCVerification() {
  const [currentSection, setCurrentSection] = useState(0);
  const [formData, setFormData] = useState({});
  const [applicationId, setApplicationId] = useState(null);
  const [manualAppId, setManualAppId] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showManualEntry, setShowManualEntry] = useState(false);
  const [isCheckingAppId, setIsCheckingAppId] = useState(false);
  const [anum, setAnum] = useState("");
  const [name, setName] = useState("");
  
  // Helper function to check if application ID exists and fetch application data
  const checkAndFetchApplicationData = async (appId) => {
    try {
      setIsCheckingAppId(true);
      const token = localStorage.getItem("token");
      
      // Check if application exists
      const response = await fetch(
        `http://localhost:8000/api/services/apply-kendra/check-application/${appId}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Application not found');
      }

      // Check if application is approved
      if (data.application.status !== "APPROVED") {
        alert(`Application status is ${data.application.status}. Only APPROVED applications can proceed with E-KYC.`);
        return false;
      }

      // Check if E-KYC already completed
      if (data.application.EKYC === true) {
        alert('E-KYC already completed for this application.');
        return false;
      }

      // Prefill form data from application
      prefillFormFromApplication(data.application);
      return true;

    } catch (error) {
      console.error('Error checking application:', error);
      alert(error.message || 'Failed to verify Application ID. Please check and try again.');
      return false;
    } finally {
      setIsCheckingAppId(false);
    }
  };

  // Helper function to prefill form data from application
  const prefillFormFromApplication = (application) => {
    setFormData(prev => ({
      ...prev,
      name: application.name || prev.name,
      aadhaar: application.aadhaar || prev.aadhaar,
      address: application.address || '',
      email: application.email || '',
      mobile1: application.phone || '',
      state: application.proposedState || '',
      district: application.proposedCity || '',
      education: application.educationalQualifications?.[0]?.qualification || '',
      // Add more fields as available in the application schema
    }));
  };

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const appId = params.get('applicationId');
    
    if (appId) {
      setApplicationId(appId);
      // When coming from URL, still verify the application
      checkAndFetchApplicationData(appId);
    } else {
      setShowManualEntry(true);
    }
  }, []);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await fetch(
          "http://localhost:8000/api/auth/profile",
          {
            method: "GET",
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        const data = await res.json();

        if (res.ok) {
          const userAadhar = data.user.aadhar;
          const userName = data.user.name;
          
          setAnum(userAadhar);
          setName(userName);
          
          // Set name and aadhaar in formData
          setFormData(prev => ({
            ...prev,
            name: userName,
            aadhaar: userAadhar
          }));
          
          // Check for missing fields
          if (!data.profile.profile_pic || !data.profile.DOB) {
            alert("🚨 Please complete your profile by adding DOB & Profile Picture!");
          }
        } else {
          console.error("Error:", data.message);
        }
      } catch (err) {
        console.error("API error:", err);
      }
    };

    fetchProfile();
  }, []);

  const sections = [
    { title: 'Personal Information', icon: User },
    { title: 'Address Details', icon: Home },
    { title: 'Kendra Location', icon: MapPin },
    { title: 'Infrastructure Details', icon: Home },
    { title: 'Kendra Structure', icon: FileText },
    { title: 'Documents & Financial', icon: FileText },
    { title: 'Contact & Family', icon: User }
  ];

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleFileUpload = (field) => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = field.includes('video') ? 'video/*' : 'image/*';
    input.onchange = (e) => {
      const file = e.target.files[0];
      if (file) {
        handleInputChange(field, file);
      }
    };
    input.click();
  };

  const handleManualAppIdSubmit = async () => {
    if (!manualAppId.trim()) {
      alert('Please enter a valid Application ID');
      return;
    }

    const isValid = await checkAndFetchApplicationData(manualAppId.trim());
    
    if (isValid) {
      setApplicationId(manualAppId.trim());
    }
  };

  const handleSubmitForm = async () => {
    if (!applicationId) {
      alert('Error: Application ID is missing. Cannot submit form.');
      return;
    }

    // Basic validation
    const requiredFields = ['fatherName', 'motherName', 'bloodGroup', 'education', 
                           'address', 'state', 'district', 'block', 'kendraLocation', 
                           'structureType', 'floors', 'pan', 'mobile1', 'emergencyContact', 'email'];
    
    const missing = requiredFields.filter(field => !formData[field]);
    if (missing.length > 0) {
      alert(`Please fill all required fields. Missing: ${missing.join(', ')}`);
      return;
    }

    // Check if name and aadhaar are present
    if (!formData.name || !formData.aadhaar) {
      alert('Name and Aadhaar are required. Please refresh the page if they are missing.');
      return;
    }

    // PAN validation
    const panRegex = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;
    if (!panRegex.test(formData.pan)) {
      alert('Invalid PAN format. Example: ABCDE1234F');
      return;
    }

    // Floors validation
    if (parseInt(formData.floors) < 1) {
      alert('Number of floors must be at least 1');
      return;
    }

    setIsSubmitting(true);

    try {
      const formDataToSend = new FormData();
      
      // Add applicationId
      formDataToSend.append('applicationId', applicationId);

      // Add all other fields including name and aadhaar
      Object.keys(formData).forEach((key) => {
        const value = formData[key];
        if (value !== null && value !== undefined && value !== '') {
          if (value instanceof File) {
            formDataToSend.append(key, value);
          } else {
            formDataToSend.append(key, String(value));
          }
        }
      });

      const token = localStorage.getItem("token");
      const response = await fetch('http://localhost:8000/api/ekyc/user/submit', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formDataToSend,
      });

      const data = await response.json();

      if (response.ok) {
        alert('E-KYC Form submitted successfully! ✅');
        // Reset form but keep name and aadhaar
        setFormData({ name: name, aadhaar: anum });
        setCurrentSection(0);
        
        // Redirect or show success message
        setTimeout(() => {
          window.location.href = '/franchise-application';
        }, 2000);
      } else {
        console.error('Server error:', data);
        alert(data.message || 'Form submission failed. Please try again.');
      }
    } catch (error) {
      console.error('Submission error:', error);
      alert('Network error. Please check your connection and try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderSection = () => {
    switch(currentSection) {
      case 0:
        return (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Personal Information</h2>
            
            {applicationId && (
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
                <p className="text-sm text-gray-700">
                  <span className="font-semibold">Application ID:</span> 
                  <span className="ml-2 text-blue-700 font-mono">{applicationId}</span>
                </p>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <input 
                  type="text" 
                  placeholder="Name *" 
                  value={name || formData.name || ''} 
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-100 cursor-not-allowed focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
                  disabled
                  readOnly
                />
                <p className="text-xs text-gray-500 mt-1">Name is fetched from your profile</p>
              </div>
              <input 
                type="text" 
                placeholder="Father's Name *" 
                value={formData.fatherName || ''} 
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
                onChange={(e) => handleInputChange('fatherName', e.target.value)} 
              />
              <input 
                type="text" 
                placeholder="Mother's Name *" 
                value={formData.motherName || ''} 
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
                onChange={(e) => handleInputChange('motherName', e.target.value)} 
              />
              <input 
                type="text" 
                placeholder="Spouse Name" 
                value={formData.spouseName || ''} 
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
                onChange={(e) => handleInputChange('spouseName', e.target.value)} 
              />
              <select 
                value={formData.bloodGroup || ''} 
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
                onChange={(e) => handleInputChange('bloodGroup', e.target.value)}
              >
                <option value="">Select Blood Group *</option>
                <option value="A+">A+</option>
                <option value="A-">A-</option>
                <option value="B+">B+</option>
                <option value="B-">B-</option>
                <option value="O+">O+</option>
                <option value="O-">O-</option>
                <option value="AB+">AB+</option>
                <option value="AB-">AB-</option>
              </select>
              <input 
                type="text" 
                placeholder="Educational Qualification *" 
                value={formData.education || ''} 
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
                onChange={(e) => handleInputChange('education', e.target.value)} 
              />
              <input 
                type="text" 
                placeholder="Professional Portfolio" 
                value={formData.portfolio || ''} 
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
                onChange={(e) => handleInputChange('portfolio', e.target.value)} 
              />
            </div>
          </div>
        );
      
      case 1:
        return (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Address Details</h2>
            <div className="grid grid-cols-1 gap-4">
              <textarea 
                placeholder="Complete Address *" 
                rows="3" 
                value={formData.address || ''} 
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
                onChange={(e) => handleInputChange('address', e.target.value)}
              ></textarea>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input 
                type="text" 
                placeholder="State *" 
                value={formData.state || ''} 
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
                onChange={(e) => handleInputChange('state', e.target.value)} 
              />
              <input 
                type="text" 
                placeholder="District *" 
                value={formData.district || ''} 
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
                onChange={(e) => handleInputChange('district', e.target.value)} 
              />
              <input 
                type="text" 
                placeholder="Block *" 
                value={formData.block || ''} 
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
                onChange={(e) => handleInputChange('block', e.target.value)} 
              />
              <input 
                type="text" 
                placeholder="Gram Panchayat" 
                value={formData.gramPanchayat || ''} 
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
                onChange={(e) => handleInputChange('gramPanchayat', e.target.value)} 
              />
              <input 
                type="text" 
                placeholder="Village" 
                value={formData.village || ''} 
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
                onChange={(e) => handleInputChange('village', e.target.value)} 
              />
              <input 
                type="text" 
                placeholder="Ward Number" 
                value={formData.ward || ''} 
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
                onChange={(e) => handleInputChange('ward', e.target.value)} 
              />
            </div>
          </div>
        );
      
      case 2:
        return (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Kendra Location Details</h2>
            <div className="grid grid-cols-1 gap-4">
              <textarea 
                placeholder="Location of Proposed Kendra *" 
                rows="2" 
                value={formData.kendraLocation || ''} 
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
                onChange={(e) => handleInputChange('kendraLocation', e.target.value)}
              ></textarea>
              
              <div className="bg-blue-50 p-4 rounded-lg">
                <label className="block text-sm font-medium text-gray-700 mb-2">Upload Map of Kendra *</label>
                <button 
                  type="button" 
                  onClick={() => handleFileUpload('kendraMap')} 
                  className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  <Upload size={20} />
                  {formData.kendraMap ? `✓ ${formData.kendraMap.name}` : 'Upload Map Image'}
                </button>
              </div>

              <div className="border-2 border-gray-200 rounded-lg p-4">
                <h3 className="font-semibold mb-3">Boundary Details</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <input 
                    type="text" 
                    placeholder="East Boundary *" 
                    value={formData.boundaryEast || ''} 
                    className="px-4 py-2 border border-gray-300 rounded-lg" 
                    onChange={(e) => handleInputChange('boundaryEast', e.target.value)} 
                  />
                  <input 
                    type="text" 
                    placeholder="West Boundary *" 
                    value={formData.boundaryWest || ''} 
                    className="px-4 py-2 border border-gray-300 rounded-lg" 
                    onChange={(e) => handleInputChange('boundaryWest', e.target.value)} 
                  />
                  <input 
                    type="text" 
                    placeholder="North Boundary *" 
                    value={formData.boundaryNorth || ''} 
                    className="px-4 py-2 border border-gray-300 rounded-lg" 
                    onChange={(e) => handleInputChange('boundaryNorth', e.target.value)} 
                  />
                  <input 
                    type="text" 
                    placeholder="South Boundary *" 
                    value={formData.boundarySouth || ''} 
                    className="px-4 py-2 border border-gray-300 rounded-lg" 
                    onChange={(e) => handleInputChange('boundarySouth', e.target.value)} 
                  />
                </div>
              </div>

              <div className="border-2 border-gray-200 rounded-lg p-4">
                <h3 className="font-semibold mb-3">Area Measurements</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  <input 
                    type="number" 
                    placeholder="Length (meters) *" 
                    value={formData.length || ''} 
                    className="px-4 py-2 border border-gray-300 rounded-lg" 
                    onChange={(e) => handleInputChange('length', e.target.value)} 
                  />
                  <input 
                    type="number" 
                    placeholder="Width (meters) *" 
                    value={formData.width || ''} 
                    className="px-4 py-2 border border-gray-300 rounded-lg" 
                    onChange={(e) => handleInputChange('width', e.target.value)} 
                  />
                  <input 
                    type="number" 
                    placeholder="Height (meters)" 
                    value={formData.height || ''} 
                    className="px-4 py-2 border border-gray-300 rounded-lg" 
                    onChange={(e) => handleInputChange('height', e.target.value)} 
                  />
                </div>
              </div>
            </div>
          </div>
        );
      
      // Cases 3-6 remain the same as your original code...
      case 3:
      case 4:
      case 5:
      case 6:
        return <div className="text-center text-gray-500">Section {currentSection + 1} content</div>;
      
      default:
        return null;
    }
  };

  if (!applicationId) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full">
          <div className="text-center mb-6">
            <AlertCircle size={64} className="mx-auto text-blue-500 mb-4" />
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Application ID Required</h2>
            <p className="text-gray-600">
              Please enter your application ID to continue with E-KYC verification.
            </p>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Application ID
              </label>
              <input
                type="text"
                placeholder="Enter Application ID"
                value={manualAppId}
                onChange={(e) => setManualAppId(e.target.value)}
                disabled={isCheckingAppId}
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100"
              />
            </div>
            
            <button
              onClick={handleManualAppIdSubmit}
              disabled={!manualAppId.trim() || isCheckingAppId}
              className={`w-full px-6 py-3 rounded-lg font-medium transition-all flex items-center justify-center gap-2 ${
                manualAppId.trim() && !isCheckingAppId
                  ? 'bg-blue-600 text-white hover:bg-blue-700'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
            >
              {isCheckingAppId ? (
                <>
                  <Loader className="animate-spin" size={20} />
                  Verifying...
                </>
              ) : (
                'Continue to E-KYC Form'
              )}
            </button>

            <button
              onClick={() => window.history.back()}
              className="w-full px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 font-medium"
            >
              Go Back
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4">
      <div className="max-w-5xl mx-auto">
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-6">
            <h1 className="text-3xl font-bold text-center">E-KYC Verification Form</h1>
            <p className="text-center text-blue-100 mt-2">Complete all sections for Kendra registration</p>
            <p className="text-center text-blue-50 mt-2 text-sm font-mono">
              Application ID: {applicationId}
            </p>
          </div>

          <div className="flex overflow-x-auto border-b bg-gray-50 px-4 py-3">
            {sections.map((section, idx) => {
              const Icon = section.icon;
              return (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setCurrentSection(idx)}
                  className={`flex items-center gap-2 px-4 py-2 min-w-max rounded-lg mx-1 transition-all ${
                    currentSection === idx
                      ? 'bg-blue-600 text-white shadow-lg'
                      : 'bg-white text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  <Icon size={18} />
                  <span className="text-sm font-medium">{section.title}</span>
                </button>
              );
            })}
          </div>

          <div className="p-8">
            {renderSection()}
          </div>

          <div className="bg-gray-50 px-8 py-6 flex justify-between border-t">
            <button
              type="button"
              onClick={() => setCurrentSection(prev => Math.max(0, prev - 1))}
              disabled={currentSection === 0}
              className={`px-6 py-3 rounded-lg font-medium transition-all ${
                currentSection === 0
                  ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                  : 'bg-gray-300 text-gray-700 hover:bg-gray-400'
              }`}
            >
              Previous
            </button>
            
            {currentSection === sections.length - 1 ? (
              <button
                type="button"
                onClick={handleSubmitForm}
                disabled={isSubmitting}
                className={`px-8 py-3 rounded-lg font-medium transition-all shadow-lg ${
                  isSubmitting
                    ? 'bg-gray-400 text-gray-200 cursor-not-allowed'
                    : 'bg-green-600 text-white hover:bg-green-700'
                }`}
              >
                {isSubmitting ? (
                  <span className="flex items-center gap-2">
                    <Loader className="animate-spin" size={20} />
                    Submitting...
                  </span>
                ) : (
                  'Submit Form'
                )}
              </button>
            ) : (
              <button
                type="button"
                onClick={() => setCurrentSection(prev => Math.min(sections.length - 1, prev + 1))}
                className="px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-all"
              >
                Next
              </button>
            )}
          </div>
        </div>

        <p className="text-center text-gray-600 mt-6 text-sm">
          * Indicates mandatory fields
        </p>
      </div>
    </div>
  );
}