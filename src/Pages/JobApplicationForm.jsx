import React, { useState } from 'react';
import { FaUpload, FaPaperPlane, FaTimes, FaCheckCircle } from 'react-icons/fa';

const JobApplicationForm = ({ job, onClose }) => {
  const [formData, setFormData] = useState({
    jobId:  "",
    fullName: '',
    email: '',
    phoneNumber: '',
    dateOfBirth: '',
    gender: '',
    address: '',
    city: '',
    state: '',
    pincode: '',
    educationalQualification: '',
    institution: '',
    yearOfPassing: '',
    experienceYears: '',
    previousEmployer: '',
    currentSalary: '',
    expectedSalary: '',
    specialization: '',
    licenseNumber: '',
    registrationNumber: '',
    coverLetter: '',
    linkedinProfile: '',
    portfolio: ''
  });

  const [files, setFiles] = useState({
    resume: null,
    photo: null,
    idProof: null,
    educationalCertificate: null,
    experienceCertificate: null,
    drivingLicense: null,
    medicalRegistration: null
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  const [currentStep, setCurrentStep] = useState(1);

  const API_BASE_URL = process.env.REACT_APP_API_URL || 'https://ruwa-backend.onrender.com/api';

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const { name, files: selectedFiles } = e.target;
    if (selectedFiles && selectedFiles[0]) {
      setFiles(prev => ({ ...prev, [name]: selectedFiles[0] }));
    }
  };

  const validateStep = (step) => {
    if (step === 1) {
      if (!formData.fullName || !formData.email || !formData.phoneNumber || 
          !formData.dateOfBirth || !formData.gender) {
        setError('Please fill all required personal information fields');
        return false;
      }
    } else if (step === 2) {
      if (!formData.address || !formData.city || !formData.state || !formData.pincode) {
        setError('Please fill all required address fields');
        return false;
      }
    } else if (step === 3) {
      if (!formData.educationalQualification) {
        setError('Please fill educational qualification');
        return false;
      }
    } else if (step === 4) {
      if (!files.resume || !files.photo || !files.idProof) {
        setError('Resume, Photo, and ID Proof are required');
        return false;
      }
    }
    setError('');
    return true;
  };

  const nextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => Math.min(prev + 1, 4));
    }
  };

  const prevStep = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateStep(4)) return;

    setLoading(true);
    setError('');

    try {
      const submitData = new FormData();
      
      // Append all form fields
      Object.keys(formData).forEach(key => {
        if (formData[key]) {
          submitData.append(key, formData[key]);
        }
      });

      // Append files
      Object.keys(files).forEach(key => {
        if (files[key]) {
          submitData.append(key, files[key]);
        }
      });

      const response = await fetch(`${API_BASE_URL}/job-applications/submit`, {
        method: 'POST',
        body: submitData,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to submit application');
      }

      setSuccess(true);
      setTimeout(() => {
        onClose();
      }, 3000);

    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="text-center py-5">
        <FaCheckCircle className="text-success mb-3" size={64} />
        <h3>Application Submitted Successfully!</h3>
        <p className="text-muted">We will review your application and get back to you soon.</p>
      </div>
    );
  }

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div>
            <h5 className="mb-4">Personal Information</h5>
            <div className="row">
              <div className="col-md-6 mb-3">
                <label className="form-label">Full Name *</label>
                <input
                  type="text"
                  className="form-control"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="col-md-6 mb-3">
                <label className="form-label">Email *</label>
                <input
                  type="email"
                  className="form-control"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="col-md-6 mb-3">
                <label className="form-label">Phone Number *</label>
                <input
                  type="tel"
                  className="form-control"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="col-md-6 mb-3">
                <label className="form-label">Date of Birth *</label>
                <input
                  type="date"
                  className="form-control"
                  name="dateOfBirth"
                  value={formData.dateOfBirth}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="col-md-6 mb-3">
                <label className="form-label">Gender *</label>
                <select
                  className="form-select"
                  name="gender"
                  value={formData.gender}
                  onChange={handleInputChange}
                  required
                >
                  <option value="">Select Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div>
            <h5 className="mb-4">Address Details</h5>
            <div className="row">
              <div className="col-12 mb-3">
                <label className="form-label">Address *</label>
                <textarea
                  className="form-control"
                  name="address"
                  rows="2"
                  value={formData.address}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="col-md-6 mb-3">
                <label className="form-label">City *</label>
                <input
                  type="text"
                  className="form-control"
                  name="city"
                  value={formData.city}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="col-md-6 mb-3">
                <label className="form-label">State *</label>
                <input
                  type="text"
                  className="form-control"
                  name="state"
                  value={formData.state}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="col-md-6 mb-3">
                <label className="form-label">Pincode *</label>
                <input
                  type="text"
                  className="form-control"
                  name="pincode"
                  value={formData.pincode}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>
          </div>
        );

      case 3:
        return (
          <div>
            <h5 className="mb-4">Professional Information</h5>
            <div className="row">
              <div className="col-md-6 mb-3">
                <label className="form-label">Educational Qualification *</label>
                <input
                  type="text"
                  className="form-control"
                  name="educationalQualification"
                  value={formData.educationalQualification}
                  onChange={handleInputChange}
                  placeholder="e.g., B.Tech, MBBS, 12th Pass"
                  required
                />
              </div>
              <div className="col-md-6 mb-3">
                <label className="form-label">Institution</label>
                <input
                  type="text"
                  className="form-control"
                  name="institution"
                  value={formData.institution}
                  onChange={handleInputChange}
                />
              </div>
              <div className="col-md-6 mb-3">
                <label className="form-label">Year of Passing</label>
                <input
                  type="text"
                  className="form-control"
                  name="yearOfPassing"
                  value={formData.yearOfPassing}
                  onChange={handleInputChange}
                  placeholder="e.g., 2020"
                />
              </div>
              <div className="col-md-6 mb-3">
                <label className="form-label">Years of Experience</label>
                <input
                  type="number"
                  className="form-control"
                  name="experienceYears"
                  value={formData.experienceYears}
                  onChange={handleInputChange}
                  min="0"
                />
              </div>
              <div className="col-md-6 mb-3">
                <label className="form-label">Previous Employer</label>
                <input
                  type="text"
                  className="form-control"
                  name="previousEmployer"
                  value={formData.previousEmployer}
                  onChange={handleInputChange}
                />
              </div>
              <div className="col-md-6 mb-3">
                <label className="form-label">Expected Salary</label>
                <input
                  type="text"
                  className="form-control"
                  name="expectedSalary"
                  value={formData.expectedSalary}
                  onChange={handleInputChange}
                  placeholder="e.g., 3-5 LPA"
                />
              </div>
              {job.jobCategory === 'medical' && (
                <>
                  <div className="col-md-6 mb-3">
                    <label className="form-label">Specialization</label>
                    <input
                      type="text"
                      className="form-control"
                      name="specialization"
                      value={formData.specialization}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="col-md-6 mb-3">
                    <label className="form-label">Registration Number</label>
                    <input
                      type="text"
                      className="form-control"
                      name="registrationNumber"
                      value={formData.registrationNumber}
                      onChange={handleInputChange}
                    />
                  </div>
                </>
              )}
              {job.jobCategory === 'driver' && (
                <div className="col-md-6 mb-3">
                  <label className="form-label">License Number</label>
                  <input
                    type="text"
                    className="form-control"
                    name="licenseNumber"
                    value={formData.licenseNumber}
                    onChange={handleInputChange}
                  />
                </div>
              )}
              <div className="col-12 mb-3">
                <label className="form-label">Cover Letter</label>
                <textarea
                  className="form-control"
                  name="coverLetter"
                  rows="4"
                  value={formData.coverLetter}
                  onChange={handleInputChange}
                  placeholder="Tell us why you're a great fit for this position..."
                />
              </div>
            </div>
          </div>
        );

      case 4:
        return (
          <div>
            <h5 className="mb-4">Upload Documents</h5>
            <div className="row">
              <div className="col-md-6 mb-3">
                <label className="form-label">Resume/CV * (PDF/Image)</label>
                <input
                  type="file"
                  className="form-control"
                  name="resume"
                  onChange={handleFileChange}
                  accept=".pdf,.jpg,.jpeg,.png"
                  required
                />
                {files.resume && (
                  <small className="text-success">✓ {files.resume.name}</small>
                )}
              </div>
              <div className="col-md-6 mb-3">
                <label className="form-label">Passport Photo * (Image)</label>
                <input
                  type="file"
                  className="form-control"
                  name="photo"
                  onChange={handleFileChange}
                  accept=".jpg,.jpeg,.png"
                  required
                />
                {files.photo && (
                  <small className="text-success">✓ {files.photo.name}</small>
                )}
              </div>
              <div className="col-md-6 mb-3">
                <label className="form-label">ID Proof * (PDF/Image)</label>
                <input
                  type="file"
                  className="form-control"
                  name="idProof"
                  onChange={handleFileChange}
                  accept=".pdf,.jpg,.jpeg,.png"
                  required
                />
                {files.idProof && (
                  <small className="text-success">✓ {files.idProof.name}</small>
                )}
              </div>
              <div className="col-md-6 mb-3">
                <label className="form-label">Educational Certificate (Optional)</label>
                <input
                  type="file"
                  className="form-control"
                  name="educationalCertificate"
                  onChange={handleFileChange}
                  accept=".pdf,.jpg,.jpeg,.png"
                />
                {files.educationalCertificate && (
                  <small className="text-success">✓ {files.educationalCertificate.name}</small>
                )}
              </div>
              <div className="col-md-6 mb-3">
                <label className="form-label">Experience Certificate (Optional)</label>
                <input
                  type="file"
                  className="form-control"
                  name="experienceCertificate"
                  onChange={handleFileChange}
                  accept=".pdf,.jpg,.jpeg,.png"
                />
                {files.experienceCertificate && (
                  <small className="text-success">✓ {files.experienceCertificate.name}</small>
                )}
              </div>
              {job.jobCategory === 'driver' && (
                <div className="col-md-6 mb-3">
                  <label className="form-label">Driving License (Optional)</label>
                  <input
                    type="file"
                    className="form-control"
                    name="drivingLicense"
                    onChange={handleFileChange}
                    accept=".pdf,.jpg,.jpeg,.png"
                  />
                  {files.drivingLicense && (
                    <small className="text-success">✓ {files.drivingLicense.name}</small>
                  )}
                </div>
              )}
              {job.jobCategory === 'medical' && (
                <div className="col-md-6 mb-3">
                  <label className="form-label">Medical Registration (Optional)</label>
                  <input
                    type="file"
                    className="form-control"
                    name="medicalRegistration"
                    onChange={handleFileChange}
                    accept=".pdf,.jpg,.jpeg,.png"
                  />
                  {files.medicalRegistration && (
                    <small className="text-success">✓ {files.medicalRegistration.name}</small>
                  )}
                </div>
              )}
            </div>
            <div className="alert alert-info mt-3">
              <small>
                <strong>Note:</strong> Maximum file size: 5MB. Supported formats: PDF, JPG, PNG
              </small>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="job-application-form">
      <div className="mb-4">
        <h4>Apply for {job?.postName}</h4>
        <p className="text-muted">Ref: {job?.advertisementNumber}</p>
        
        {/* Progress Steps */}
        <div className="d-flex justify-content-between mb-4 mt-4">
          {[1, 2, 3, 4].map((step) => (
            <div key={step} className="text-center flex-fill">
              <div
                className={`rounded-circle d-inline-flex align-items-center justify-content-center mb-2 ${
                  currentStep >= step
                    ? 'bg-primary text-white'
                    : 'bg-light text-muted'
                }`}
                style={{ width: '40px', height: '40px' }}
              >
                {step}
              </div>
              <div className="small">
                {step === 1 && 'Personal'}
                {step === 2 && 'Address'}
                {step === 3 && 'Professional'}
                {step === 4 && 'Documents'}
              </div>
            </div>
          ))}
        </div>
      </div>

      {error && (
        <div className="alert alert-danger alert-dismissible fade show" role="alert">
          {error}
          <button
            type="button"
            className="btn-close"
            onClick={() => setError('')}
          ></button>
        </div>
      )}

      <form onSubmit={handleSubmit}>
        {renderStep()}

        <div className="d-flex justify-content-between mt-4">
          <button
            type="button"
            className="btn btn-secondary"
            onClick={currentStep === 1 ? onClose : prevStep}
          >
            {currentStep === 1 ? 'Cancel' : 'Previous'}
          </button>

          {currentStep < 4 ? (
            <button
              type="button"
              className="btn btn-primary"
              onClick={nextStep}
            >
              Next
            </button>
          ) : (
            <button
              type="submit"
              className="btn btn-success"
              disabled={loading}
            >
              {loading ? (
                <>
                  <span className="spinner-border spinner-border-sm me-2" />
                  Submitting...
                </>
              ) : (
                <>
                  <FaPaperPlane className="me-2" />
                  Submit Application
                </>
              )}
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default JobApplicationForm