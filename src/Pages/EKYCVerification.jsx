import React, { useState } from 'react';
import { Camera, Upload, MapPin, Home, User, FileText, CheckCircle } from 'lucide-react';

export default function EKYCVerification() {
  const [currentSection, setCurrentSection] = useState(0);
  const [formData, setFormData] = useState({});

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
    // File upload handler
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = field.includes('video') ? 'video/' : 'image/';
    input.onchange = (e) => {
      const file = e.target.files[0];
      if (file) {
        handleInputChange(field, file.name);
      }
    };
    input.click();
  };

  const renderSection = () => {
    switch(currentSection) {
      case 0:
        return (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Personal Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input type="text" placeholder="Name *" className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" onChange={(e) => handleInputChange('name', e.target.value)} />
              <input type="text" placeholder="Father's Name *" className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" onChange={(e) => handleInputChange('fatherName', e.target.value)} />
              <input type="text" placeholder="Mother's Name *" className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" onChange={(e) => handleInputChange('motherName', e.target.value)} />
              <input type="text" placeholder="Spouse Name" className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" onChange={(e) => handleInputChange('spouseName', e.target.value)} />
              <select className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" onChange={(e) => handleInputChange('bloodGroup', e.target.value)}>
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
              <input type="text" placeholder="Educational Qualification *" className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" onChange={(e) => handleInputChange('education', e.target.value)} />
              <input type="text" placeholder="Professional Portfolio" className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" onChange={(e) => handleInputChange('portfolio', e.target.value)} />
            </div>
          </div>
        );
      
      case 1:
        return (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Address Details</h2>
            <div className="grid grid-cols-1 gap-4">
              <textarea placeholder="Complete Address *" rows="3" className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" onChange={(e) => handleInputChange('address', e.target.value)}></textarea>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input type="text" placeholder="State *" className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" onChange={(e) => handleInputChange('state', e.target.value)} />
              <input type="text" placeholder="District *" className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" onChange={(e) => handleInputChange('district', e.target.value)} />
              <input type="text" placeholder="Block *" className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" onChange={(e) => handleInputChange('block', e.target.value)} />
              <input type="text" placeholder="Gram Panchayat" className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" onChange={(e) => handleInputChange('gramPanchayat', e.target.value)} />
              <input type="text" placeholder="Village" className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" onChange={(e) => handleInputChange('village', e.target.value)} />
              <input type="text" placeholder="Ward Number" className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" onChange={(e) => handleInputChange('ward', e.target.value)} />
            </div>
          </div>
        );
      
      case 2:
        return (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Kendra Location Details</h2>
            <div className="grid grid-cols-1 gap-4">
              <textarea placeholder="Location of Proposed Kendra *" rows="2" className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" onChange={(e) => handleInputChange('kendraLocation', e.target.value)}></textarea>
              
              <div className="bg-blue-50 p-4 rounded-lg">
                <label className="block text-sm font-medium text-gray-700 mb-2">Upload Map of Kendra *</label>
                <button onClick={() => handleFileUpload('kendraMap')} className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                  <Upload size={20} />
                  Upload Map Image
                </button>
              </div>

              <div className="border-2 border-gray-200 rounded-lg p-4">
                <h3 className="font-semibold mb-3">Boundary Details</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <input type="text" placeholder="East Boundary *" className="px-4 py-2 border border-gray-300 rounded-lg" onChange={(e) => handleInputChange('boundaryEast', e.target.value)} />
                  <input type="text" placeholder="West Boundary *" className="px-4 py-2 border border-gray-300 rounded-lg" onChange={(e) => handleInputChange('boundaryWest', e.target.value)} />
                  <input type="text" placeholder="North Boundary *" className="px-4 py-2 border border-gray-300 rounded-lg" onChange={(e) => handleInputChange('boundaryNorth', e.target.value)} />
                  <input type="text" placeholder="South Boundary *" className="px-4 py-2 border border-gray-300 rounded-lg" onChange={(e) => handleInputChange('boundarySouth', e.target.value)} />
                </div>
              </div>

              <div className="border-2 border-gray-200 rounded-lg p-4">
                <h3 className="font-semibold mb-3">Area Measurements</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  <input type="text" placeholder="Length (in meters) *" className="px-4 py-2 border border-gray-300 rounded-lg" onChange={(e) => handleInputChange('length', e.target.value)} />
                  <input type="text" placeholder="Width (in meters) *" className="px-4 py-2 border border-gray-300 rounded-lg" onChange={(e) => handleInputChange('width', e.target.value)} />
                  <input type="text" placeholder="Height from Ground (m)" className="px-4 py-2 border border-gray-300 rounded-lg" onChange={(e) => handleInputChange('height', e.target.value)} />
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
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Radiation Effect Assessment *</label>
                <select className="w-full px-4 py-3 border border-gray-300 rounded-lg" onChange={(e) => handleInputChange('radiationEffect', e.target.value)}>
                  <option value="">Select</option>
                  <option value="none">None</option>
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Cellular Tower Nearby? *</label>
                <select className="w-full px-4 py-3 border border-gray-300 rounded-lg" onChange={(e) => handleInputChange('cellularTower', e.target.value)}>
                  <option value="">Select</option>
                  <option value="yes">Yes</option>
                  <option value="no">No</option>
                </select>
              </div>
              <input type="number" placeholder="Electricity Availability (hours/day) *" className="w-full px-4 py-3 border border-gray-300 rounded-lg" onChange={(e) => handleInputChange('electricityHours', e.target.value)} />
              <input type="text" placeholder="Power Backup Resources *" className="w-full px-4 py-3 border border-gray-300 rounded-lg" onChange={(e) => handleInputChange('powerBackup', e.target.value)} />
              <input type="number" placeholder="Nearest Metro City (km) *" className="w-full px-4 py-3 border border-gray-300 rounded-lg" onChange={(e) => handleInputChange('nearestMetro', e.target.value)} />
              <input type="number" placeholder="Nearest Railway Station (km) *" className="w-full px-4 py-3 border border-gray-300 rounded-lg" onChange={(e) => handleInputChange('nearestRailway', e.target.value)} />
              <input type="number" placeholder="Nearest Airport (km)" className="w-full px-4 py-3 border border-gray-300 rounded-lg" onChange={(e) => handleInputChange('nearestAirport', e.target.value)} />
              <input type="text" placeholder="Nearest Dump Yard *" className="w-full px-4 py-3 border border-gray-300 rounded-lg" onChange={(e) => handleInputChange('dumpYard', e.target.value)} />
              <input type="text" placeholder="Sewerage System *" className="w-full px-4 py-3 border border-gray-300 rounded-lg" onChange={(e) => handleInputChange('sewerage', e.target.value)} />
              <input type="text" placeholder="Nearest Water Resources *" className="w-full px-4 py-3 border border-gray-300 rounded-lg" onChange={(e) => handleInputChange('waterResources', e.target.value)} />
              <input type="number" placeholder="Air Quality Index (AQI)" className="w-full px-4 py-3 border border-gray-300 rounded-lg" onChange={(e) => handleInputChange('aqi', e.target.value)} />
            </div>

            <div className="border-2 border-gray-200 rounded-lg p-4">
              <h3 className="font-semibold mb-3">Transportation & Roads</h3>
              <div className="grid grid-cols-1 gap-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Primary Mode of Communication *</label>
                  <div className="flex flex-wrap gap-3">
                    {['Road', 'Railway', 'Airways', 'Waterways'].map(mode => (
                      <label key={mode} className="flex items-center gap-2">
                        <input type="checkbox" className="w-4 h-4" onChange={(e) => handleInputChange(`transport${mode}`, e.target.checked)} />
                        <span>{mode}</span>
                      </label>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Road Condition *</label>
                  <select className="w-full px-4 py-3 border border-gray-300 rounded-lg" onChange={(e) => handleInputChange('roadCondition', e.target.value)}>
                    <option value="">Select</option>
                    <option value="fair">Fair</option>
                    <option value="good">Good</option>
                    <option value="average">Average</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Type of Road *</label>
                  <select className="w-full px-4 py-3 border border-gray-300 rounded-lg" onChange={(e) => handleInputChange('roadType', e.target.value)}>
                    <option value="">Select</option>
                    <option value="kachhi">Kachhi Sadak</option>
                    <option value="tar">Black Tar Road</option>
                    <option value="concrete">Concrete Road</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="border-2 border-gray-200 rounded-lg p-4">
              <h3 className="font-semibold mb-3">Weather Conditions *</h3>
              <div className="flex flex-wrap gap-3">
                {['Hot', 'Rainy', 'Cold', 'Mild'].map(weather => (
                  <label key={weather} className="flex items-center gap-2">
                    <input type="checkbox" className="w-4 h-4" onChange={(e) => handleInputChange(`weather${weather}`, e.target.checked)} />
                    <span>{weather}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        );
      
      case 4:
        return (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Kendra Structure</h2>
            <div className="grid grid-cols-1 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Structure Type *</label>
                <select className="w-full px-4 py-3 border border-gray-300 rounded-lg" onChange={(e) => handleInputChange('structureType', e.target.value)}>
                  <option value="">Select</option>
                  <option value="pakka">Pakka Construction</option>
                  <option value="semi-pakka">Semi-Pakka</option>
                  <option value="kachha">Kachha</option>
                </select>
              </div>
              <input type="number" placeholder="Number of Floors *" className="w-full px-4 py-3 border border-gray-300 rounded-lg" onChange={(e) => handleInputChange('floors', e.target.value)} />
            </div>

            <div className="bg-blue-50 p-4 rounded-lg space-y-3">
              <h3 className="font-semibold text-gray-800">Upload Structure Photos *</h3>
              <div className="grid grid-cols-2 gap-3">
                <button onClick={() => handleFileUpload('frontProfile')} className="flex items-center justify-center gap-2 px-4 py-3 bg-white border-2 border-blue-300 rounded-lg hover:bg-blue-100">
                  <Camera size={20} />
                  Front Profile
                </button>
                <button onClick={() => handleFileUpload('rightProfile')} className="flex items-center justify-center gap-2 px-4 py-3 bg-white border-2 border-blue-300 rounded-lg hover:bg-blue-100">
                  <Camera size={20} />
                  Right Profile
                </button>
                <button onClick={() => handleFileUpload('leftProfile')} className="flex items-center justify-center gap-2 px-4 py-3 bg-white border-2 border-blue-300 rounded-lg hover:bg-blue-100">
                  <Camera size={20} />
                  Left Profile
                </button>
                <button onClick={() => handleFileUpload('topProfile')} className="flex items-center justify-center gap-2 px-4 py-3 bg-white border-2 border-blue-300 rounded-lg hover:bg-blue-100">
                  <Camera size={20} />
                  Top Profile
                </button>
                <button onClick={() => handleFileUpload('surfaceProfile')} className="flex items-center justify-center gap-2 px-4 py-3 bg-white border-2 border-blue-300 rounded-lg hover:bg-blue-100">
                  <Camera size={20} />
                  Surface Profile
                </button>
                <button onClick={() => handleFileUpload('interiors')} className="flex items-center justify-center gap-2 px-4 py-3 bg-white border-2 border-blue-300 rounded-lg hover:bg-blue-100">
                  <Camera size={20} />
                  Interiors
                </button>
              </div>
            </div>

            <div className="bg-green-50 p-4 rounded-lg space-y-3">
              <h3 className="font-semibold text-gray-800">Upload 360° Videos *</h3>
              <div className="grid grid-cols-2 gap-3">
                <button onClick={() => handleFileUpload('video360Interior')} className="flex items-center justify-center gap-2 px-4 py-3 bg-white border-2 border-green-300 rounded-lg hover:bg-green-100">
                  <Upload size={20} />
                  Interior 360° Video
                </button>
                <button onClick={() => handleFileUpload('video360Exterior')} className="flex items-center justify-center gap-2 px-4 py-3 bg-white border-2 border-green-300 rounded-lg hover:bg-green-100">
                  <Upload size={20} />
                  Exterior 360° Video
                </button>
              </div>
            </div>
          </div>
        );
      
      case 5:
        return (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Documents & Financial Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input type="text" placeholder="Annual Income *" className="w-full px-4 py-3 border border-gray-300 rounded-lg" onChange={(e) => handleInputChange('annualIncome', e.target.value)} />
              <input type="text" placeholder="Aadhaar (UID) Number *" className="w-full px-4 py-3 border border-gray-300 rounded-lg" onChange={(e) => handleInputChange('aadhaar', e.target.value)} />
              <input type="text" placeholder="PAN Number *" className="w-full px-4 py-3 border border-gray-300 rounded-lg" onChange={(e) => handleInputChange('pan', e.target.value)} />
            </div>

            <div className="bg-yellow-50 p-4 rounded-lg space-y-3">
              <h3 className="font-semibold text-gray-800">Upload Required Documents *</h3>
              <div className="grid grid-cols-1 gap-3">
                <button onClick={() => handleFileUpload('bankPassbook')} className="flex items-center gap-2 px-4 py-3 bg-white border-2 border-yellow-300 rounded-lg hover:bg-yellow-100">
                  <Upload size={20} />
                  Bank Passbook with Photo (Sealed by Bank)
                </button>
                <button onClick={() => handleFileUpload('domicile')} className="flex items-center gap-2 px-4 py-3 bg-white border-2 border-yellow-300 rounded-lg hover:bg-yellow-100">
                  <Upload size={20} />
                  Domicile Certificate
                </button>
                <button onClick={() => handleFileUpload('nocProperty')} className="flex items-center gap-2 px-4 py-3 bg-white border-2 border-yellow-300 rounded-lg hover:bg-yellow-100">
                  <Upload size={20} />
                  NOC of Property
                </button>
                <button onClick={() => handleFileUpload('propertyDeed')} className="flex items-center gap-2 px-4 py-3 bg-white border-2 border-yellow-300 rounded-lg hover:bg-yellow-100">
                  <Upload size={20} />
                  Deed/Agreement/Lagan Receipt
                </button>
              </div>
            </div>

            <div className="border-2 border-gray-200 rounded-lg p-4">
              <h3 className="font-semibold mb-3">Successor Information</h3>
              <input type="text" placeholder="Name of Successor *" className="w-full px-4 py-3 border border-gray-300 rounded-lg" onChange={(e) => handleInputChange('successorName', e.target.value)} />
            </div>
          </div>
        );
      
      case 6:
        return (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Contact & Family Details</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input type="tel" placeholder="Mobile Number 1 *" className="w-full px-4 py-3 border border-gray-300 rounded-lg" onChange={(e) => handleInputChange('mobile1', e.target.value)} />
              <input type="tel" placeholder="Mobile Number 2" className="w-full px-4 py-3 border border-gray-300 rounded-lg" onChange={(e) => handleInputChange('mobile2', e.target.value)} />
              <input type="tel" placeholder="Emergency Contact (SOS) *" className="w-full px-4 py-3 border border-gray-300 rounded-lg" onChange={(e) => handleInputChange('emergencyContact', e.target.value)} />
              <input type="email" placeholder="Email ID *" className="w-full px-4 py-3 border border-gray-300 rounded-lg" onChange={(e) => handleInputChange('email', e.target.value)} />
            </div>

            <div className="border-2 border-gray-200 rounded-lg p-4">
              <h3 className="font-semibold mb-3">Family Details</h3>
              <input type="number" placeholder="Number of Dependents *" className="w-full px-4 py-3 border border-gray-300 rounded-lg" onChange={(e) => handleInputChange('dependents', e.target.value)} />
            </div>

            <div className="bg-green-100 border-2 border-green-500 rounded-lg p-6 text-center">
              <CheckCircle size={48} className="mx-auto text-green-600 mb-3" />
              <p className="text-lg font-semibold text-gray-800">Review all information before submission</p>
              <p className="text-sm text-gray-600 mt-2">Ensure all mandatory fields are filled correctly</p>
            </div>
          </div>
        );
      
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4">
      <div className="max-w-5xl mx-auto">
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-6">
            <h1 className="text-3xl font-bold text-center">E-Verification KYC Form</h1>
            <p className="text-center text-blue-100 mt-2">Complete all sections for Kendra registration</p>
          </div>

          <div className="flex overflow-x-auto border-b bg-gray-50 px-4 py-3">
            {sections.map((section, idx) => {
              const Icon = section.icon;
              return (
                <button
                  key={idx}
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
                onClick={() => alert('Form submitted successfully! (This is a demo)')}
                className="px-8 py-3 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition-all shadow-lg"
              >
                Submit Form
              </button>
            ) : (
              <button
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