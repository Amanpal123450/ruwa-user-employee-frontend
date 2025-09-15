import React, { useState, useEffect } from 'react';
import axios from "axios";

export default function Empambulance() {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    email: "",
    hospitalPreference: "",
    appointmentDate: "",
    preferredTime: "",
    message: "",
    // forUserId:""
  });

  

  const services = [
    {
      icon: '🚑',
      title: '24x7 Ambulance Service',
      description: [
        'Emergency response: Quick and reliable ambulance dispatch anytime.',
        'GPS tracking: Real-time ambulance location updates.',
        'Certified staff: Trained paramedics for on-the-spot care.',
        'Coverage areas: Available across urban and rural zones.'
      ],
      gradient: "linear-gradient(135deg, #ff6b6b 0%, #ee5a24 100%)"
    },
    {
      icon: '🧑‍⚕️',
      title: 'Advanced Life Support Ambulance',
      description: [
        'Equipped with ICU-grade facilities.',
        'Oxygen support, defibrillator, and critical care monitoring.',
        'Ideal for critical or long-distance transfers.'
      ],
      gradient: "linear-gradient(135deg, #a5d8ff 0%, #339af0 100%)"
    },
    {
      icon: '🪪',
      title: 'Free Ambulance for Card Members',
      description: [
        'Zero cost for Lifeline Health Card holders.',
        'Covers up to 10km per ride within city limits.',
        'Priority dispatch in emergencies.'
      ],
      gradient: "linear-gradient(135deg, #51cf66 0%, #2f9e44 100%)"
    },
    {
      icon: '🛣️',
      title: 'Intercity & Long-Distance Transfers',
      description: [
        'Ambulance services between cities at subsidized rates.',
        'Comfortable and safe patient transport over long distances.',
        'Assisted by trained support staff throughout the journey.'
      ],
      gradient: "linear-gradient(135deg, #ffd8a8 0%, #ff922b 100%)"
    }
  ];

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");
      await axios.post(
        "https://ruwa-backend.onrender.com/api/services/ambulance-booking/employee/book",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )

      setFormSubmitted(true);
      setFormData({
        fullName: formData.fullName, // Keep name
        phone: formData.phone, // Keep phone
        email: formData.email, // Keep email
        hospitalPreference: "",
        appointmentDate: "",
        preferredTime: "",
        message: "",
      // forUserId:""
      });

      setTimeout(() => {
        setFormSubmitted(false);
      }, 4000);
    } catch (error) {
      console.error("Booking failed:", error.response?.data || error.message);
      alert(error.response?.data?.message || "Failed to book ambulance");
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
                        Emergency Medical Services 👋
                      </div>
                      <h1 className="welcome-title">
                        Ambulance Booking Service
                      </h1>
                      <p className="welcome-subtitle">
                        Get immediate medical transportation with our reliable ambulance services
                      </p>
                    </div>
                  </div>
                  <div className="col-lg-4 col-md-5 text-center">
                    <div className="profile-section">
                      <div className="profile-image-container">
                        <div className="service-icon-display">
                          <span className="icon-emoji">🚑</span>
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

            {/* Booking Form */}
            <div className="card user-table-card">
              <div className="card-header-custom">
                <h3 className="header-title">Book an Ambulance</h3>
                <p className="header-subtitle">Fill in your details to request ambulance service</p>
              </div>
              
              <div className="card-body">
                {formSubmitted && (
                  <div className="alert alert-success alert-custom" role="alert">
                    <i className="fas fa-check-circle me-2"></i>
                    Ambulance booked successfully! We'll contact you shortly.
                  </div>
                )}

                <form onSubmit={handleSubmit}>
                  <div className="row g-3 mb-4">
                    <div className="col-md-6">
                      <label className="form-label-custom">Full Name</label>
                      <input 
                        name="fullName" 
                        value={formData.fullName} 
                        onChange={handleChange} 
                        type="text" 
                        className="form-control-custom" 
                        placeholder="Enter your full name" 
                        required 
                        
                      />
                    </div>
                    <div className="col-md-6">
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
                    <div className="col-md-6">
                      <label className="form-label-custom">Email</label>
                      <input 
                        name="email" 
                        value={formData.email} 
                        onChange={handleChange} 
                        type="email" 
                        className="form-control-custom" 
                        placeholder="your@email.com" 
                        required 
                        
                      />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label-custom">Hospital Preference</label>
                      <input 
                        name="hospitalPreference" 
                        value={formData.hospitalPreference} 
                        onChange={handleChange} 
                        type="text" 
                        className="form-control-custom" 
                        placeholder="Preferred hospital" 
                      />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label-custom">Appointment Date</label>
                      <input 
                        name="appointmentDate" 
                        value={formData.appointmentDate} 
                        onChange={handleChange} 
                        type="date" 
                        className="form-control-custom" 
                        required 
                      />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label-custom">Preferred Time</label>
                      <input 
                        name="preferredTime" 
                        value={formData.preferredTime} 
                        onChange={handleChange} 
                        type="time" 
                        className="form-control-custom" 
                        required 
                      />
                    </div>
                      {/* <div className="col-md-6">
                      <label className="form-label-custom">For User</label>
                      <input 
                        name="forUserId" 
                        value={formData.forUserId} 
                        onChange={handleChange} 
                        type="text" 
                        className="form-control-custom" 
                        required 
                      />
                    </div> */}
                    <div className="col-12">
                      <label className="form-label-custom">Message / Health Concern</label>
                      <textarea 
                        name="message" 
                        value={formData.message} 
                        onChange={handleChange} 
                        className="form-control-custom" 
                        rows="4" 
                        placeholder="Describe your emergency or health concern..." 
                      />
                    </div>
                  </div>
                  <div className="text-center mt-4">
                    <button type="submit" className="btn-primary-custom px-5 py-2">
                      <i className="fas fa-ambulance me-2"></i>
                      Book Ambulance
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
          background: linear-gradient(135deg, #ff6b6b 0%, #c2255c 100%);
          border-radius: 20px;
          margin-bottom: 2rem;
          overflow: hidden;
          position: relative;
          box-shadow: 0 20px 40px rgba(255, 107, 107, 0.3);
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
          min-height: 120px;
        }

        .btn-primary-custom {
          background: linear-gradient(135deg, #ef4444, #dc2626);
          border: none;
          border-radius: 50px;
          font-weight: 600;
          padding: 0.75rem 2rem;
          transition: all 0.3s ease;
          box-shadow: 0 4px 15px rgba(239, 68, 68, 0.4);
          color: white;
          font-size: 1.1rem;
        }

        .btn-primary-custom:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 25px rgba(239, 68, 68, 0.5);
          background: linear-gradient(135deg, #dc2626, #b91c1c);
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