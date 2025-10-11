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
  const [applicationData, setApplicationData] = useState(null);
  const [showApplicationDetails, setShowApplicationDetails] = useState(false);
  
  const checkAndFetchApplicationData = async (appId) => {
    try {
      setIsCheckingAppId(true);
      const token = localStorage.getItem("token");
      
      const response = await fetch(
        `https://ruwa-backend.onrender.com/api/services/apply-kendra/check-application/${appId}`,
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

      if (data.application.status !== "APPROVED") {
        alert(`Application status is ${data.application.status}. Only APPROVED applications can proceed with E-KYC.`);
        return false;
      }

      if (data.application.EKYC === true) {
        alert('E-KYC already completed for this application.');
        return false;
      }

      setApplicationData(data.application);
      setShowApplicationDetails(true);
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
    }));
  };

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const appId = params.get('applicationId');

    if (appId) {
      setApplicationId(appId);
      const fetchProfile = async () => {
        try {
          const token = localStorage.getItem("token");
          const res = await fetch(
            "https://ruwa-backend.onrender.com/api/auth/profile",
            {
              method: "GET",
              headers: { Authorization: `Bearer ${token}` },
            }
          );

          const data = await res.json();

          if (res.ok) {
            const userAadhar = data.user.aadhar;
            const userName = data.user.name;
            console.log(userAadhar)
            setAnum(userAadhar);
            setName(userName);
            
            setFormData(prev => ({
              ...prev,
              name: userName,
              aadhaar: userAadhar
            }));
            
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
      checkAndFetchApplicationData(appId);
      fetchProfile();
    } else {
      setShowManualEntry(true);
    }
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

    const requiredFields = ['fatherName', 'motherName', 'bloodGroup', 'education', 
                           'address', 'state', 'district', 'block', 'kendraLocation', 
                           'structureType', 'floors', 'pan', 'mobile1', 'emergencyContact', 
                           'email', 'annualIncome', 'successorName', 'dependents'];
    
    const missing = requiredFields.filter(field => !formData[field]);
    if (missing.length > 0) {
      alert(`Please fill all required fields. Missing: ${missing.join(', ')}`);
      return;
    }

    if (!formData.name || !formData.aadhaar) {
      alert('Name and Aadhaar are required. Please refresh the page if they are missing.');
      return;
    }

    const panRegex = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;
    if (!panRegex.test(formData.pan)) {
      alert('Invalid PAN format. Example: ABCDE1234F');
      return;
    }

    if (parseInt(formData.floors) < 1) {
      alert('Number of floors must be at least 1');
      return;
    }

    setIsSubmitting(true);

    try {
      const formDataToSend = new FormData();
      
      formDataToSend.append('applicationId', applicationId);

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
      const response = await fetch('https://ruwa-backend.onrender.com/api/ekyc/user/submit', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formDataToSend,
      });

      const data = await response.json();

      if (response.ok) {
        alert('E-KYC Form submitted successfully! ✅');
        setFormData({ name: name, aadhaar: anum });
        setCurrentSection(0);
        
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
      
      case 3:
        return (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Infrastructure & Environment</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <select 
                value={formData.radiationEffect || ''} 
                className="w-full px-4 py-3 border border-gray-300 rounded-lg" 
                onChange={(e) => handleInputChange('radiationEffect', e.target.value)}
              >
                <option value="">Radiation Effect *</option>
                <option value="none">None</option>
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>

              <select 
                value={formData.cellularTower || ''} 
                className="w-full px-4 py-3 border border-gray-300 rounded-lg" 
                onChange={(e) => handleInputChange('cellularTower', e.target.value)}
              >
                <option value="">Cellular Tower Nearby *</option>
                <option value="yes">Yes</option>
                <option value="no">No</option>
              </select>

              <input 
                type="number" 
                placeholder="Electricity Hours (0-24) *" 
                value={formData.electricityHours || ''} 
                min="0" 
                max="24" 
                className="w-full px-4 py-3 border border-gray-300 rounded-lg" 
                onChange={(e) => handleInputChange('electricityHours', e.target.value)} 
              />

              <input 
                type="text" 
                placeholder="Power Backup Details *" 
                value={formData.powerBackup || ''} 
                className="w-full px-4 py-3 border border-gray-300 rounded-lg" 
                onChange={(e) => handleInputChange('powerBackup', e.target.value)} 
              />

              <input 
                type="number" 
                placeholder="Nearest Metro (km) *" 
                value={formData.nearestMetro || ''} 
                min="0" 
                className="w-full px-4 py-3 border border-gray-300 rounded-lg" 
                onChange={(e) => handleInputChange('nearestMetro', e.target.value)} 
              />

              <input 
                type="number" 
                placeholder="Nearest Railway (km) *" 
                value={formData.nearestRailway || ''} 
                min="0" 
                className="w-full px-4 py-3 border border-gray-300 rounded-lg" 
                onChange={(e) => handleInputChange('nearestRailway', e.target.value)} 
              />

              <input 
                type="number" 
                placeholder="Nearest Airport (km)" 
                value={formData.nearestAirport || ''} 
                min="0" 
                className="w-full px-4 py-3 border border-gray-300 rounded-lg" 
                onChange={(e) => handleInputChange('nearestAirport', e.target.value)} 
              />

              <input 
                type="text" 
                placeholder="Dump Yard Location *" 
                value={formData.dumpYard || ''} 
                className="w-full px-4 py-3 border border-gray-300 rounded-lg" 
                onChange={(e) => handleInputChange('dumpYard', e.target.value)} 
              />

              <input 
                type="text" 
                placeholder="Sewerage System *" 
                value={formData.sewerage || ''} 
                className="w-full px-4 py-3 border border-gray-300 rounded-lg" 
                onChange={(e) => handleInputChange('sewerage', e.target.value)} 
              />

              <input 
                type="text" 
                placeholder="Water Resources *" 
                value={formData.waterResources || ''} 
                className="w-full px-4 py-3 border border-gray-300 rounded-lg" 
                onChange={(e) => handleInputChange('waterResources', e.target.value)} 
              />

              <input 
                type="number" 
                placeholder="AQI (Air Quality Index)" 
                value={formData.aqi || ''} 
                min="0" 
                className="w-full px-4 py-3 border border-gray-300 rounded-lg" 
                onChange={(e) => handleInputChange('aqi', e.target.value)} 
              />
            </div>

            <div className="border-2 border-gray-200 rounded-lg p-4">
              <h3 className="font-semibold mb-3">Transportation Modes Available</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                <label className="flex items-center space-x-2">
                  <input 
                    type="checkbox" 
                    checked={formData.transportRoad || false} 
                    onChange={(e) => handleInputChange('transportRoad', e.target.checked)} 
                    className="w-5 h-5" 
                  />
                  <span>Road</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input 
                    type="checkbox" 
                    checked={formData.transportRailway || false} 
                    onChange={(e) => handleInputChange('transportRailway', e.target.checked)} 
                    className="w-5 h-5" 
                  />
                  <span>Railway</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input 
                    type="checkbox" 
                    checked={formData.transportAirways || false} 
                    onChange={(e) => handleInputChange('transportAirways', e.target.checked)} 
                    className="w-5 h-5" 
                  />
                  <span>Airways</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input 
                    type="checkbox" 
                    checked={formData.transportWaterways || false} 
                    onChange={(e) => handleInputChange('transportWaterways', e.target.checked)} 
                    className="w-5 h-5" 
                  />
                  <span>Waterways</span>
                </label>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <select 
                value={formData.roadCondition || ''} 
                className="w-full px-4 py-3 border border-gray-300 rounded-lg" 
                onChange={(e) => handleInputChange('roadCondition', e.target.value)}
              >
                <option value="">Road Condition *</option>
                <option value="fair">Fair</option>
                <option value="good">Good</option>
                <option value="average">Average</option>
              </select>

              <select 
                value={formData.roadType || ''} 
                className="w-full px-4 py-3 border border-gray-300 rounded-lg" 
                onChange={(e) => handleInputChange('roadType', e.target.value)}
              >
                <option value="">Road Type *</option>
                <option value="kachhi">Kachhi</option>
                <option value="tar">Tar</option>
                <option value="concrete">Concrete</option>
              </select>
            </div>

            <div className="border-2 border-gray-200 rounded-lg p-4">
              <h3 className="font-semibold mb-3">Weather Conditions</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                <label className="flex items-center space-x-2">
                  <input 
                    type="checkbox" 
                    checked={formData.weatherHot || false} 
                    onChange={(e) => handleInputChange('weatherHot', e.target.checked)} 
                    className="w-5 h-5" 
                  />
                  <span>Hot</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input 
                    type="checkbox" 
                    checked={formData.weatherRainy || false} 
                    onChange={(e) => handleInputChange('weatherRainy', e.target.checked)} 
                    className="w-5 h-5" 
                  />
                  <span>Rainy</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input 
                    type="checkbox" 
                    checked={formData.weatherCold || false} 
                    onChange={(e) => handleInputChange('weatherCold', e.target.checked)} 
                    className="w-5 h-5" 
                  />
                  <span>Cold</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input 
                    type="checkbox" 
                    checked={formData.weatherMild || false} 
                    onChange={(e) => handleInputChange('weatherMild', e.target.checked)} 
                    className="w-5 h-5" 
                  />
                  <span>Mild</span>
                </label>
              </div>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Kendra Structure</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <select 
                value={formData.structureType || ''} 
                className="w-full px-4 py-3 border border-gray-300 rounded-lg" 
                onChange={(e) => handleInputChange('structureType', e.target.value)}
              >
                <option value="">Structure Type *</option>
                <option value="pakka">Pakka</option>
                <option value="semi-pakka">Semi-Pakka</option>
                <option value="kachha">Kachha</option>
              </select>

              <input 
                type="number" 
                placeholder="Number of Floors *" 
                value={formData.floors || ''} 
                min="1" 
                className="w-full px-4 py-3 border border-gray-300 rounded-lg" 
                onChange={(e) => handleInputChange('floors', e.target.value)} 
              />
            </div>

            <div className="border-2 border-gray-200 rounded-lg p-4">
              <h3 className="font-semibold mb-4">Structure Photos (Required)</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-blue-50 p-4 rounded-lg">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Front Profile *</label>
                  <button 
                    type="button" 
                    onClick={() => handleFileUpload('frontProfile')} 
                    className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 w-full justify-center"
                  >
                    <Camera size={20} />
                    {formData.frontProfile ? `✓ ${formData.frontProfile.name}` : 'Upload Photo'}
                  </button>
                </div>

                <div className="bg-blue-50 p-4 rounded-lg">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Right Profile *</label>
                  <button 
                    type="button" 
                    onClick={() => handleFileUpload('rightProfile')} 
                    className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 w-full justify-center"
                  >
                    <Camera size={20} />
                    {formData.rightProfile ? `✓ ${formData.rightProfile.name}` : 'Upload Photo'}
                  </button>
                </div>

                <div className="bg-blue-50 p-4 rounded-lg">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Left Profile *</label>
                  <button 
                    type="button" 
                    onClick={() => handleFileUpload('leftProfile')} 
                    className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 w-full justify-center"
                  >
                    <Camera size={20} />
                    {formData.leftProfile ? `✓ ${formData.leftProfile.name}` : 'Upload Photo'}
                  </button>
                </div>

                <div className="bg-blue-50 p-4 rounded-lg">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Top Profile *</label>
                  <button 
                    type="button" 
                    onClick={() => handleFileUpload('topProfile')} 
                    className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 w-full justify-center"
                  >
                    <Camera size={20} />
                    {formData.topProfile ? `✓ ${formData.topProfile.name}` : 'Upload Photo'}
                  </button>
                </div>

                <div className="bg-blue-50 p-4 rounded-lg">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Surface Profile *</label>
                  <button 
                    type="button" 
                    onClick={() => handleFileUpload('surfaceProfile')} 
                    className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 w-full justify-center"
                  >
                    <Camera size={20} />
                    {formData.surfaceProfile ? `✓ ${formData.surfaceProfile.name}` : 'Upload Photo'}
                  </button>
                </div>

                <div className="bg-blue-50 p-4 rounded-lg">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Interiors *</label>
                  <button 
                    type="button" 
                    onClick={() => handleFileUpload('interiors')} 
                    className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 w-full justify-center"
                  >
                    <Camera size={20} />
                    {formData.interiors ? `✓ ${formData.interiors.name}` : 'Upload Photo'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        );

      case 5:
        return (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Documents & Financial Details</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input 
                type="text" 
                placeholder="Annual Income *" 
                value={formData.annualIncome || ''} 
                className="w-full px-4 py-3 border border-gray-300 rounded-lg" 
                onChange={(e) => handleInputChange('annualIncome', e.target.value)} 
              />

              <div>
                <input 
                  type="text" 
                  placeholder="Aadhaar Number *" 
                  value={anum || formData.aadhaar || ''} 
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-100 cursor-not-allowed" 
                  disabled
                  readOnly
                  maxLength="12"
                />
                <p className="text-xs text-gray-500 mt-1">Aadhaar is fetched from your profile</p>
              </div>

              <input 
                type="text" 
                placeholder="PAN Number *" 
                value={formData.pan || ''} 
                className="w-full px-4 py-3 border border-gray-300 rounded-lg uppercase" 
                onChange={(e) => handleInputChange('pan', e.target.value.toUpperCase())} 
                maxLength="10"
              />

              <input 
                type="text" 
                placeholder="Successor Name *" 
                value={formData.successorName || ''} 
                className="w-full px-4 py-3 border border-gray-300 rounded-lg" 
                onChange={(e) => handleInputChange('successorName', e.target.value)} 
              />
            </div>

            <div className="border-2 border-gray-200 rounded-lg p-4">
              <h3 className="font-semibold mb-4">Required Documents</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-blue-50 p-4 rounded-lg">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Bank Passbook *</label>
                  <button 
                    type="button" 
                    onClick={() => handleFileUpload('bankPassbook')} 
                    className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 w-full justify-center"
                  >
                    <Upload size={20} />
                    {formData.bankPassbook ? `✓ ${formData.bankPassbook.name}` : 'Upload Document'}
                  </button>
                </div>

                <div className="bg-blue-50 p-4 rounded-lg">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Domicile Certificate *</label>
                  <button 
                    type="button" 
                    onClick={() => handleFileUpload('domicile')} 
                    className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 w-full justify-center"
                  >
                    <Upload size={20} />
                    {formData.domicile ? `✓ ${formData.domicile.name}` : 'Upload Document'}
                  </button>
                </div>

                <div className="bg-blue-50 p-4 rounded-lg">
                  <label className="block text-sm font-medium text-gray-700 mb-2">NOC for Property *</label>
                  <button 
                    type="button" 
                    onClick={() => handleFileUpload('nocProperty')} 
                    className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 w-full justify-center"
                  >
                    <Upload size={20} />
                    {formData.nocProperty ? `✓ ${formData.nocProperty.name}` : 'Upload Document'}
                  </button>
                </div>

                <div className="bg-blue-50 p-4 rounded-lg">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Property Deed *</label>
                  <button 
                    type="button" 
                    onClick={() => handleFileUpload('propertyDeed')} 
                    className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 w-full justify-center"
                  >
                    <Upload size={20} />
                    {formData.propertyDeed ? `✓ ${formData.propertyDeed.name}` : 'Upload Document'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        );

      case 6:
        return (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Contact & Family Details</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input 
                type="tel" 
                placeholder="Mobile Number 1 *" 
                value={formData.mobile1 || ''} 
                className="w-full px-4 py-3 border border-gray-300 rounded-lg" 
                onChange={(e) => handleInputChange('mobile1', e.target.value)} 
                maxLength="10"
              />

              <input 
                type="tel" 
                placeholder="Mobile Number 2" 
                value={formData.mobile2 || ''} 
                className="w-full px-4 py-3 border border-gray-300 rounded-lg" 
                onChange={(e) => handleInputChange('mobile2', e.target.value)} 
                maxLength="10"
              />

              <input 
                type="tel" 
                placeholder="Emergency Contact *" 
                value={formData.emergencyContact || ''} 
                className="w-full px-4 py-3 border border-gray-300 rounded-lg" 
                onChange={(e) => handleInputChange('emergencyContact', e.target.value)} 
                maxLength="10"
              />

              <input 
                type="email" 
                placeholder="Email Address *" 
                value={formData.email || ''} 
                className="w-full px-4 py-3 border border-gray-300 rounded-lg" 
                onChange={(e) => handleInputChange('email', e.target.value)} 
              />

              <input 
                type="number" 
                placeholder="Number of Dependents *" 
                value={formData.dependents || ''} 
                min="0" 
                className="w-full px-4 py-3 border border-gray-300 rounded-lg" 
                onChange={(e) => handleInputChange('dependents', e.target.value)} 
              />
            </div>

            <div className="bg-green-50 border-2 border-green-500 rounded-lg p-6 mt-6">
              <h3 className="text-lg font-bold text-green-800 mb-3 flex items-center gap-2">
                <CheckCircle size={24} />
                Declaration
              </h3>
              <div className="space-y-2 text-sm text-gray-700">
                <p>• I hereby declare that all the information provided in this E-KYC form is true and accurate to the best of my knowledge.</p>
                <p>• I understand that any false information may lead to rejection of my application or termination of the franchise agreement.</p>
                <p>• I agree to comply with all terms, conditions, and regulations of the Jan Arogya Kendra franchise program.</p>
                <p>• I confirm that I have uploaded all required documents and photos as specified in the form.</p>
                <p>• I understand that this E-KYC verification is mandatory for franchise approval.</p>
              </div>
            </div>
          </div>
        );
      
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

  if (showApplicationDetails && applicationData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-6">
              <h1 className="text-3xl font-bold text-center">Verify Application Details</h1>
              <p className="text-center text-blue-100 mt-2">Please confirm the application details before proceeding</p>
            </div>

            <div className="p-8">
              <div className="bg-blue-50 border-2 border-blue-200 rounded-xl p-6 mb-6">
                <div className="flex items-center gap-3 mb-4">
                  <CheckCircle size={32} className="text-blue-600" />
                  <div>
                    <h2 className="text-xl font-bold text-gray-800">Application Found</h2>
                    <p className="text-sm text-gray-600">Status: <span className="font-semibold text-green-600">{applicationData.status}</span></p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div>
                    <span className="text-gray-600">Application ID:</span>
                    <p className="font-mono font-semibold text-blue-700">{applicationData.applicationId}</p>
                  </div>
                  <div>
                    <span className="text-gray-600">Enrollment No:</span>
                    <p className="font-mono font-semibold text-blue-700">{applicationData.enrollmentNo}</p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="bg-gray-50 rounded-lg p-5 border border-gray-200">
                  <h3 className="font-bold text-gray-800 mb-3 flex items-center gap-2">
                    <User size={20} className="text-blue-600" />
                    Personal Information
                  </h3>
                  <div className="space-y-2 text-sm">
                    <div>
                      <span className="text-gray-600">Name:</span>
                      <p className="font-semibold text-gray-800">{applicationData.title} {applicationData.name}</p>
                    </div>
                    <div>
                      <span className="text-gray-600">Aadhaar:</span>
                      <p className="font-semibold text-gray-800">{applicationData.aadhaar}</p>
                    </div>
                    <div>
                      <span className="text-gray-600">Date of Birth:</span>
                      <p className="font-semibold text-gray-800">{new Date(applicationData.dob).toLocaleDateString('en-IN')}</p>
                    </div>
                    <div>
                      <span className="text-gray-600">Gender:</span>
                      <p className="font-semibold text-gray-800">{applicationData.gender === 'M' ? 'Male' : applicationData.gender === 'F' ? 'Female' : 'Other'}</p>
                    </div>
                    <div>
                      <span className="text-gray-600">Marital Status:</span>
                      <p className="font-semibold text-gray-800">{applicationData.married === 'Y' ? 'Married' : 'Unmarried'}</p>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 rounded-lg p-5 border border-gray-200">
                  <h3 className="font-bold text-gray-800 mb-3 flex items-center gap-2">
                    <Home size={20} className="text-blue-600" />
                    Contact Information
                  </h3>
                  <div className="space-y-2 text-sm">
                    <div>
                      <span className="text-gray-600">Phone:</span>
                      <p className="font-semibold text-gray-800">{applicationData.phone}</p>
                    </div>
                    <div>
                      <span className="text-gray-600">Email:</span>
                      <p className="font-semibold text-gray-800 break-all">{applicationData.email}</p>
                    </div>
                    <div>
                      <span className="text-gray-600">Address:</span>
                      <p className="font-semibold text-gray-800">{applicationData.address}</p>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 rounded-lg p-5 border border-gray-200">
                  <h3 className="font-bold text-gray-800 mb-3 flex items-center gap-2">
                    <FileText size={20} className="text-blue-600" />
                    Professional Details
                  </h3>
                  <div className="space-y-2 text-sm">
                    <div>
                      <span className="text-gray-600">Current Occupation:</span>
                      <p className="font-semibold text-gray-800">{applicationData.currentOccupation}</p>
                    </div>
                    {applicationData.currentEmployer && (
                      <div>
                        <span className="text-gray-600">Current Employer:</span>
                        <p className="font-semibold text-gray-800">{applicationData.currentEmployer}</p>
                      </div>
                    )}
                    {applicationData.designation && (
                      <div>
                        <span className="text-gray-600">Designation:</span>
                        <p className="font-semibold text-gray-800">{applicationData.designation}</p>
                      </div>
                    )}
                    {applicationData.educationalQualifications?.[0]?.qualification && (
                      <div>
                        <span className="text-gray-600">Education:</span>
                        <p className="font-semibold text-gray-800">{applicationData.educationalQualifications[0].qualification}</p>
                      </div>
                    )}
                  </div>
                </div>

                <div className="bg-gray-50 rounded-lg p-5 border border-gray-200">
                  <h3 className="font-bold text-gray-800 mb-3 flex items-center gap-2">
                    <MapPin size={20} className="text-blue-600" />
                    Proposed Kendra Location
                  </h3>
                  <div className="space-y-2 text-sm">
                    <div>
                      <span className="text-gray-600">City:</span>
                      <p className="font-semibold text-gray-800">{applicationData.proposedCity}</p>
                    </div>
                    <div>
                      <span className="text-gray-600">State:</span>
                      <p className="font-semibold text-gray-800">{applicationData.proposedState}</p>
                    </div>
                    <div>
                      <span className="text-gray-600">Business Structure:</span>
                      <p className="font-semibold text-gray-800">{applicationData.businessStructure}</p>
                    </div>
                    <div>
                      <span className="text-gray-600">Investment Range:</span>
                      <p className="font-semibold text-gray-800">{applicationData.investmentRange}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-yellow-50 border-2 border-yellow-300 rounded-lg p-4 mb-6">
                <div className="flex items-start gap-3">
                  <AlertCircle size={24} className="text-yellow-600 flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="font-bold text-yellow-800 mb-1">Important Notice</h4>
                    <p className="text-sm text-yellow-700">
                      Please verify that all the above details are correct. You will be completing the E-KYC verification for this application. 
                      The information shown above will be pre-filled in the E-KYC form where applicable.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 rounded-lg p-4 mb-6">
                <h4 className="font-semibold text-gray-800 mb-2">Application Timeline</h4>
                <div className="flex items-center gap-4 text-sm text-gray-600">
                  <div>
                    <span className="text-gray-500">Submitted:</span>
                    <span className="ml-2 font-medium">{applicationData.submissionDate}</span>
                  </div>
                  <div className="h-4 w-px bg-gray-300"></div>
                  <div>
                    <span className="text-gray-500">E-KYC Status:</span>
                    <span className="ml-2 font-medium text-orange-600">{applicationData.ekycStatus}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 px-8 py-6 flex justify-between border-t">
              <button
                type="button"
                onClick={() => {
                  setApplicationId(null);
                  setApplicationData(null);
                  setShowApplicationDetails(false);
                  setManualAppId('');
                }}
                className="px-6 py-3 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 font-medium transition-all"
              >
                Cancel
              </button>
              
              <button
                type="button"
                onClick={() => setShowApplicationDetails(false)}
                className="px-8 py-3 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition-all shadow-lg flex items-center gap-2"
              >
                Proceed to E-KYC Form
                <CheckCircle size={20} />
              </button>
            </div>
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
                  'Submit E-KYC Form'
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
          * Indicates mandatory fields | All information will be verified
        </p>
      </div>
    </div>
  );
}