import React, { useEffect, useState } from 'react';
import axios from "axios";

export default function Ambulance() {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [locationLoading, setLocationLoading] = useState(false);
  const [showReceipt, setShowReceipt] = useState(false);
  const [receiptData, setReceiptData] = useState(null);
  const [bookings, setBookings] = useState([]);
  const [showTracker, setShowTracker] = useState(false);
  
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    email: "",
    location: "",
    latitude: "",
    longitude: "",
    hospitalPreference: "",
    appointmentDate: "",
    preferredTime: "",
    message: ""
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
      bgClass: 'bg-white'
    },
    {
      icon: '🧑‍⚕️',
      title: 'Advanced Life Support Ambulance',
      description: [
        'Equipped with ICU-grade facilities.',
        'Oxygen support, defibrillator, and critical care monitoring.',
        'Ideal for critical or long-distance transfers.'
      ],
      bgClass: 'bg-light'
    },
    {
      icon: '🪪',
      title: 'Free Ambulance for Card Members',
      description: [
        'Zero cost for Lifeline Health Card holders.',
        'Covers up to 10km per ride within city limits.',
        'Priority dispatch in emergencies.'
      ],
      bgClass: 'bg-white'
    },
    {
      icon: '🛣️',
      title: 'Intercity & Long-Distance Transfers',
      description: [
        'Ambulance services between cities at subsidized rates.',
        'Comfortable and safe patient transport over long distances.',
        'Assisted by trained support staff throughout the journey.'
      ],
      bgClass: 'bg-light'
    }
  ];

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // Function to get reverse geocoded address from coordinates using free API
  const getReverseGeocode = async (latitude, longitude) => {
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&zoom=18&addressdetails=1`,
        {
          headers: {
            'User-Agent': 'AmbulanceBookingApp/1.0'
          }
        }
      );
      
      if (!response.ok) {
        throw new Error('Geocoding service unavailable');
      }
      
      const data = await response.json();
      
      if (data && data.display_name) {
        return data.display_name;
      } else {
        const fallbackResponse = await fetch(
          `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`
        );
        
        if (fallbackResponse.ok) {
          const fallbackData = await fallbackResponse.json();
          if (fallbackData && fallbackData.locality) {
            return `${fallbackData.locality}, ${fallbackData.city || fallbackData.principalSubdivision}, ${fallbackData.countryName}`;
          }
        }
        
        return `Location coordinates provided (${latitude.toFixed(4)}, ${longitude.toFixed(4)})`;
      }
    } catch (error) {
      console.error('Reverse geocoding failed:', error);
      return `Current location (${latitude.toFixed(4)}, ${longitude.toFixed(4)})`;
    }
  };

  // Function to get current location
  const getCurrentLocation = () => {
    setLocationLoading(true);

    if (!navigator.geolocation) {
      alert("Geolocation is not supported by this browser.");
      setLocationLoading(false);
      return;
    }

    const options = {
      enableHighAccuracy: true,
      timeout: 10000,
      maximumAge: 60000
    };

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        
        try {
          const address = await getReverseGeocode(latitude, longitude);
          
          setFormData({
            ...formData,
            location: address,
            latitude: "",
            longitude: ""
          });
        } catch (error) {
          console.error('Error getting address:', error);
          setFormData({
            ...formData,
            location: `Current location detected (${new Date().toLocaleTimeString()})`,
            latitude: "",
            longitude: ""
          });
        }
        
        setLocationLoading(false);
      },
      (error) => {
        setLocationLoading(false);
        let errorMessage = "Unable to get location. ";
        
        switch (error.code) {
          case error.PERMISSION_DENIED:
            errorMessage += "Location access denied by user.";
            break;
          case error.POSITION_UNAVAILABLE:
            errorMessage += "Location information unavailable.";
            break;
          case error.TIMEOUT:
            errorMessage += "Location request timed out.";
            break;
          default:
            errorMessage += "An unknown error occurred.";
            break;
        }
        
        alert(errorMessage);
      },
      options
    );
  };

  // Generate receipt data
  const generateReceipt = (bookingResponse, currentFormData = null) => {
    const formDataToUse = currentFormData || bookingResponse;
    const bookingId = bookingResponse?.bookingId || bookingResponse?._id || "AMB" + Date.now().toString().slice(-8);
    const bookingDate = new Date().toLocaleDateString('en-IN', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
    const bookingTime = new Date().toLocaleTimeString('en-IN', {
      hour: '2-digit',
      minute: '2-digit'
    });

    return {
      bookingId,
      bookingDate,
      bookingTime,
      fullName: formDataToUse.fullName || bookingResponse?.fullName || "N/A",
      phone: formDataToUse.phone || bookingResponse?.phone || "N/A",
      email: formDataToUse.email || bookingResponse?.email || "N/A",
      location: formDataToUse.location || bookingResponse?.location || "N/A",
      hospitalPreference: formDataToUse.hospitalPreference || bookingResponse?.hospitalPreference || "Nearest Hospital",
      appointmentDate: formDataToUse.appointmentDate || bookingResponse?.appointmentDate || "N/A",
      preferredTime: formDataToUse.preferredTime || bookingResponse?.preferredTime || "N/A",
      message: formDataToUse.message || bookingResponse?.message || "Emergency medical assistance",
      status: bookingResponse?.status || "Confirmed",
      estimatedArrival: "15-20 minutes",
      ambulanceType: "Advanced Life Support",
      driverName: "Will be assigned shortly",
      vehicleNumber: "Assigning...",
      helplineNumber: "1800-180-1947"
    };
  };

  // Fetch user bookings
  const fetchBookings = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        "https://ruwa-backend.onrender.com/api/services/ambulance-booking/user/bookings",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      
      if (response.data && response.data.bookings) {
        setBookings(response.data.bookings);
      }
    } catch (error) {
      console.error("Failed to fetch bookings:", error);
    }
  };

  const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const token = localStorage.getItem("token");

    const response = await fetch(
      "https://ruwa-backend.onrender.com/api/services/ambulance-booking/user/book",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to book ambulance");
    }

    const data = await response.json();
    console.log("Booking response:", data);

    setFormSubmitted(true);

    // Generate and show receipt
    const receipt = generateReceipt(data);
    setReceiptData(receipt);
    setShowReceipt(true);

    // Refresh bookings list
    fetchBookings();

    // Reset form AFTER generating receipt
    setFormData({
      fullName: formData.fullName,
      phone: formData.phone,
      email: formData.email,
      location: "",
      latitude: "",
      longitude: "",
      hospitalPreference: "",
      appointmentDate: "",
      preferredTime: "",
      message: ""
    });

    setTimeout(() => {
      setFormSubmitted(false);
    }, 4000);

  } catch (error) {
    console.error("Booking failed:", error.message);
    alert(error.message);
  }
};


  // Print receipt
  const handlePrintReceipt = () => {
    const receiptContent = document.getElementById('ambulance-receipt-content');
    const printWindow = window.open('', '_blank');
    printWindow.document.write(`
      <html>
        <head>
          <title>Ambulance Booking Receipt</title>
          <style>
            body { 
              font-family: Arial, sans-serif; 
              padding: 20px; 
              max-width: 600px;
              margin: 0 auto;
            }
            .receipt-header { 
              text-align: center; 
              margin-bottom: 20px; 
              border-bottom: 2px solid #dc3545;
              padding-bottom: 15px;
            }
            .receipt-header h2 {
              color: #dc3545;
              margin: 0;
            }
            .section { 
              margin: 20px 0; 
              padding: 15px;
              background: #f8f9fa;
              border-radius: 5px;
            }
            .detail-row { 
              margin: 10px 0; 
              display: flex;
              justify-content: space-between;
              padding: 5px 0;
            }
            .detail-label { 
              font-weight: bold; 
              color: #495057;
            }
            .detail-value {
              text-align: right;
            }
            .status-badge {
              display: inline-block;
              padding: 5px 15px;
              background: #28a745;
              color: white;
              border-radius: 20px;
              font-weight: bold;
            }
            .emergency-note {
              background: #fff3cd;
              padding: 15px;
              border-left: 4px solid #ffc107;
              margin: 20px 0;
            }
            .footer {
              text-align: center;
              margin-top: 30px;
              padding-top: 20px;
              border-top: 2px solid #dee2e6;
              color: #6c757d;
              font-size: 14px;
            }
          </style>
        </head>
        <body>
          ${receiptContent.innerHTML}
        </body>
      </html>
    `);
    printWindow.document.close();
    printWindow.print();
  };

  // Receipt Component
  const AmbulanceReceipt = ({ receiptData }) => {
    if (!receiptData) return null;

    return (
      <div id="ambulance-receipt-content">
        <div className="receipt-header text-center mb-4">
          <h2 className="text-danger mb-2">🚑 Emergency Ambulance Service</h2>
          <h5 className="text-muted mb-0">Booking Confirmation Receipt</h5>
        </div>

        <div className="section mb-3">
          <div className="detail-row">
            <span className="detail-label">Booking ID:</span>
            <span className="detail-value fw-bold text-primary">{receiptData.bookingId}</span>
          </div>
          <div className="detail-row">
            <span className="detail-label">Booking Date & Time:</span>
            <span className="detail-value">{receiptData.bookingDate} at {receiptData.bookingTime}</span>
          </div>
          <div className="detail-row">
            <span className="detail-label">Status:</span>
            <span className="status-badge bg-success">{receiptData.status}</span>
          </div>
        </div>

        <div className="section mb-3">
          <h6 className="mb-3 text-primary">Patient Information</h6>
          <div className="detail-row">
            <span className="detail-label">Name:</span>
            <span className="detail-value">{receiptData.fullName}</span>
          </div>
          <div className="detail-row">
            <span className="detail-label">Phone:</span>
            <span className="detail-value">{receiptData.phone}</span>
          </div>
          <div className="detail-row">
            <span className="detail-label">Email:</span>
            <span className="detail-value">{receiptData.email}</span>
          </div>
        </div>

        <div className="section mb-3">
          <h6 className="mb-3 text-primary">Pickup & Destination</h6>
          <div className="detail-row">
            <span className="detail-label">Pickup Location:</span>
            <span className="detail-value">{receiptData.location}</span>
          </div>
          <div className="detail-row">
            <span className="detail-label">Hospital Preference:</span>
            <span className="detail-value">{receiptData.hospitalPreference}</span>
          </div>
          <div className="detail-row">
            <span className="detail-label">Scheduled Date:</span>
            <span className="detail-value">{receiptData.appointmentDate}</span>
          </div>
          <div className="detail-row">
            <span className="detail-label">Preferred Time:</span>
            <span className="detail-value">{receiptData.preferredTime}</span>
          </div>
        </div>

        <div className="section mb-3">
          <h6 className="mb-3 text-primary">Ambulance Details</h6>
          <div className="detail-row">
            <span className="detail-label">Ambulance Type:</span>
            <span className="detail-value">{receiptData.ambulanceType}</span>
          </div>
          <div className="detail-row">
            <span className="detail-label">Estimated Arrival:</span>
            <span className="detail-value text-success fw-bold">{receiptData.estimatedArrival}</span>
          </div>
          <div className="detail-row">
            <span className="detail-label">Driver Name:</span>
            <span className="detail-value">{receiptData.driverName}</span>
          </div>
          <div className="detail-row">
            <span className="detail-label">Vehicle Number:</span>
            <span className="detail-value">{receiptData.vehicleNumber}</span>
          </div>
        </div>

        {receiptData.message && (
          <div className="section mb-3">
            <h6 className="mb-2 text-primary">Medical Concern:</h6>
            <p className="mb-0 text-muted">{receiptData.message}</p>
          </div>
        )}

        <div className="alert alert-warning mb-3">
          <strong>⚠️ Important:</strong> Keep your phone accessible. Our team will contact you shortly with ambulance details.
        </div>

        <div className="section mb-3 text-center">
          <h6 className="mb-2 text-danger">24/7 Emergency Helpline</h6>
          <h4 className="mb-0 text-danger fw-bold">{receiptData.helplineNumber}</h4>
        </div>

        <div className="footer">
          <p className="mb-1">Thank you for choosing our emergency services.</p>
          <p className="mb-0">Stay calm, help is on the way!</p>
        </div>
      </div>
    );
  };

  // Booking Tracker Component
  const BookingTracker = ({ bookings }) => {
    const getStatusColor = (status) => {
      switch(status?.toLowerCase()) {
        case 'confirmed': return 'success';
        case 'pending': return 'warning';
        case 'completed': return 'info';
        case 'cancelled': return 'danger';
        default: return 'secondary';
      }
    };

    const handleViewReceipt = (booking) => {
      const receipt = {
        bookingId: booking.bookingId || booking._id || "AMB" + Date.now().toString().slice(-8),
        bookingDate: new Date(booking.createdAt || new Date()).toLocaleDateString('en-IN', {
          day: '2-digit',
          month: '2-digit',
          year: 'numeric'
        }),
        bookingTime: new Date(booking.createdAt || new Date()).toLocaleTimeString('en-IN', {
          hour: '2-digit',
          minute: '2-digit'
        }),
        fullName: booking.fullName || "N/A",
        phone: booking.phone || "N/A",
        email: booking.email || "N/A",
        location: booking.location || "N/A",
        hospitalPreference: booking.hospitalPreference || "Nearest Hospital",
        appointmentDate: booking.appointmentDate || "N/A",
        preferredTime: booking.preferredTime || "N/A",
        message: booking.message || "Emergency medical assistance",
        status: booking.status || "Confirmed",
        estimatedArrival: "15-20 minutes",
        ambulanceType: "Advanced Life Support",
        driverName: booking.driverName || "Will be assigned shortly",
        vehicleNumber: booking.vehicleNumber || "Assigning...",
        helplineNumber: "1800-180-1947"
      };
      
      setReceiptData(receipt);
      setShowReceipt(true);
    };

    return (
      <div className="mt-4">
        <h4 className="mb-3">Your Bookings</h4>
        {bookings.length === 0 ? (
          <div className="alert alert-info">No bookings found.</div>
        ) : (
          <div className="table-responsive">
            <table className="table table-hover">
              <thead className="table-light">
                <tr>
                  <th>Booking ID</th>
                  <th>Date</th>
                  <th>Location</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {bookings.map((booking, index) => (
                  <tr key={index}>
                    <td className="fw-bold">{booking.bookingId || booking._id?.slice(-8)}</td>
                    <td>{new Date(booking.appointmentDate || booking.createdAt).toLocaleDateString('en-IN')}</td>
                    <td>{booking.location?.slice(0, 30)}...</td>
                    <td>
                      <span className={`badge bg-${getStatusColor(booking.status)}`}>
                        {booking.status || 'Pending'}
                      </span>
                    </td>
                    <td>
                      <button 
                        className="btn btn-sm btn-outline-primary"
                        onClick={() => handleViewReceipt(booking)}
                      >
                        View Receipt
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    );
  };

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
          fullName: user.name || "",
          phone: user.phone || "",
          email: user.email || "",
        }));
      })
      .catch((err) => console.error("Profile fetch failed:", err));
    
    // Fetch existing bookings
    fetchBookings();
  }, []);

  return (
    <section className="section services__v3 py-5" id="services">
      <div className="container">
        <div className="row g-4">
          <div className="col-12" data-aos="fade-up">
            <div className="service-card p-4 rounded-4 h-100 d-flex flex-column text-center gap-3 shadow-sm">
              <span className="subtitle text-uppercase mb-2 text-muted fs-6">
                Book your Ambulance 
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
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2 className="mb-0">Book an Appointment</h2>
          <button 
            className="btn btn-outline-primary"
            onClick={() => setShowTracker(!showTracker)}
          >
            {showTracker ? 'Hide' : 'Track'} Bookings
          </button>
        </div>

        {formSubmitted && (
          <div className="alert alert-success text-center fw-semibold" role="alert">
            ✅ Appointment booked successfully!
          </div>
        )}

        {/* Receipt Modal */}
        {showReceipt && (
          <div className="modal show d-block" style={{ background: 'rgba(0,0,0,0.5)' }}>
            <div className="modal-dialog modal-lg modal-dialog-centered">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Ambulance Booking Receipt</h5>
                  <button 
                    type="button" 
                    className="btn-close" 
                    onClick={() => setShowReceipt(false)}
                  ></button>
                </div>
                <div className="modal-body">
                  <AmbulanceReceipt receiptData={receiptData} />
                </div>
                <div className="modal-footer">
                  <button 
                    className="btn btn-secondary" 
                    onClick={() => setShowReceipt(false)}
                  >
                    Close
                  </button>
                  <button 
                    className="btn btn-primary" 
                    onClick={handlePrintReceipt}
                  >
                    Print Receipt
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Booking Tracker */}
        {showTracker && <BookingTracker bookings={bookings} />}

        <form onSubmit={handleSubmit}>
          <div className="row g-3">
            <div className="col-md-6">
              <label className="form-label">Full Name</label>
              <input name="fullName" value={formData.fullName} readOnly onChange={handleChange} type="text" className="form-control" placeholder="Enter your full name" required />
            </div>
            <div className="col-md-6">
              <label className="form-label">Phone Number</label>
              <input name="phone" value={formData.phone} readOnly onChange={handleChange} type="tel" className="form-control" placeholder="e.g. 9876543210" required />
            </div>
            <div className="col-md-6">
              <label className="form-label">Email</label>
              <input name="email" value={formData.email} readOnly onChange={handleChange} type="email" className="form-control" placeholder="your@email.com" required />
            </div>
            
            <div className="col-md-6">
              <label className="form-label">Location</label>
              <div className="input-group">
                <input 
                  name="location" 
                  value={formData.location} 
                  onChange={handleChange} 
                  type="text" 
                  className="form-control" 
                  placeholder="Enter your location or use GPS" 
                  required 
                />
                <button 
                  type="button" 
                  className="btn btn-outline-primary" 
                  onClick={getCurrentLocation}
                  disabled={locationLoading}
                  title="Get current location"
                >
                  {locationLoading ? (
                    <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                  ) : (
                    "📍"
                  )}
                </button>
              </div>
              <small className="form-text text-muted">
                Click the location icon to automatically detect your current location
              </small>
            </div>
            
            <div className="col-md-6">
              <label className="form-label">Hospital Preference</label>
              <input name="hospitalPreference" value={formData.hospitalPreference} onChange={handleChange} type="text" className="form-control" placeholder="Preferred hospital" />
            </div>
            <div className="col-md-6">
              <label className="form-label">Appointment Date</label>
              <input name="appointmentDate" value={formData.appointmentDate} onChange={handleChange} type="date" className="form-control" required />
            </div>
            <div className="col-md-6">
              <label className="form-label">Preferred Time</label>
              <input name="preferredTime" value={formData.preferredTime} onChange={handleChange} type="time" className="form-control" required />
            </div>
            <div className="col-12">
              <label className="form-label">Message / Health Concern</label>
              <textarea name="message" value={formData.message} onChange={handleChange} className="form-control" rows="4" placeholder="Describe your issue..." />
            </div>
          </div>
          <div className="text-center mt-4">
            <button type="submit" className="btn btn-success px-5">Submit</button>
          </div>
        </form>
      </div>
    </section>
  );
}