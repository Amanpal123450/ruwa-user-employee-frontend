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