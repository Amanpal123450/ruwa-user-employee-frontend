// import React from 'react';

// export default function Ambulance() {
// //   const services = [
// //   {
// //     icon: '<i class="bi bi-truck-front fs-1 text-info"></i>',
// //     title: '24x7 Ambulance Service',
// //     description: [
// //       'Emergency response: Quick and reliable ambulance dispatch anytime.',
// //       'GPS tracking: Real-time ambulance location updates.',
// //       'Certified staff: Trained paramedics for on-the-spot care.',
// //       'Coverage areas: Available across urban and rural zones.',
// //     ]
// //   },
// //   {
// //     icon: '<i class="bi bi-truck-front fs-1 text-info"></i>',
// //     title: 'Advanced Life Support Ambulance',
// //     description: [
// //       'Equipped with ICU-grade facilities.',
// //       'Oxygen support, defibrillator, and critical care monitoring.',
// //       'Ideal for critical or long-distance transfers.',
// //     ]
// //   },
// //   {
// //     icon: '<i class="bi bi-truck-front fs-1 text-info"></i>',
// //     title: 'Free Ambulance for Card Members',
// //     description: [
// //       'Zero cost for Lifeline Health Card holders.',
// //       'Covers up to 10km per ride within city limits.',
// //       'Priority dispatch in emergencies.',
// //     ]
// //   },
// //   {
// //     icon: '<i class="bi bi-truck-front fs-1 text-info"></i>',
// //     title: 'Intercity and Long-Distance Transfers',
// //     description: [
// //       'Ambulance services between cities at subsidized rates.',
// //       'Comfortable and safe patient transport over long distances.',
// //       'Assisted by trained support staff throughout the journey.',
// //     ]
// //   }
// // ];
// const services = [
//   {
//     icon: '🚑',
//     title: '24x7 Ambulance Service',
//     description: [
//       'Emergency response: Quick and reliable ambulance dispatch anytime.',
//       'GPS tracking: Real-time ambulance location updates.',
//       'Certified staff: Trained paramedics for on-the-spot care.',
//       'Coverage areas: Available across urban and rural zones.'
//     ],
//     bgClass: 'bg-white'
//   },
//   {
//     icon: '🧑‍⚕️',
//     title: 'Advanced Life Support Ambulance',
//     description: [
//       'Equipped with ICU-grade facilities.',
//       'Oxygen support, defibrillator, and critical care monitoring.',
//       'Ideal for critical or long-distance transfers.'
//     ],
//     bgClass: 'bg-light'
//   },
//   {
//     icon: '🪪',
//     title: 'Free Ambulance for Card Members',
//     description: [
//       'Zero cost for Lifeline Health Card holders.',
//       'Covers up to 10km per ride within city limits.',
//       'Priority dispatch in emergencies.'
//     ],
//     bgClass: 'bg-white'
//   },
//   {
//     icon: '🛣️',
//     title: 'Intercity & Long-Distance Transfers',
//     description: [
//       'Ambulance services between cities at subsidized rates.',
//       'Comfortable and safe patient transport over long distances.',
//       'Assisted by trained support staff throughout the journey.'
//     ],
//     bgClass: 'bg-light'
//   }
// ];

//   return (
//     <section className="section services__v3 py-5" id="services">
//       <div className="container">
//         <div className="row g-4">
//           {/* Intro Card */}
//           <div className="col-12" data-aos="fade-up">
//             <div className="service-card p-4 rounded-4 h-100 d-flex flex-column text-center gap-3 shadow-sm">
//               <span className="subtitle text-uppercase mb-2 text-muted fs-6">Apply for Jan Arogya Cards</span>

//             </div>
//           </div>
//  {services.map((service, index) => (
//             <div className="col-12" data-aos="fade-up" data-aos-delay={index * 200} key={index}>
//               <div className="service-card p-4 rounded-4 h-100 d-flex flex-column gap-3 shadow-sm">
//                 <div className="text-center  fs-2" dangerouslySetInnerHTML={{ __html: service.icon }} />
//                 <h3 className="text-center fs-5 mb-2">{service.title}</h3>
//                 <ul className="ps-3 mb-0">
//                   {service.description.map((point, i) => (
//                     <li key={i} className="mb-2" style={{ lineHeight: '1.6' }}>{point}</li>
//                   ))}
//                 </ul>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//       {/* <div className="container py-5" >

//         <form>
//           <div className="mb-3">
//             <label className="form-label">Full Name</label>
//             <input type="text" className="form-control" required />
//           </div>
//           <div className="mb-3">
//             <label className="form-label">Phone Number</label>
//             <input type="tel" className="form-control" required />
//           </div>
//           <div className="mb-3">
//             <label className="form-label">Hospital Preference</label>
//             <input type="text" className="form-control" />
//           </div>
//           <button type="submit" className="btn btn-success">Submit</button>
//         </form>
//       </div> */}
//       <div className="container py-5">
//   <h2 className="mb-4 text-center">Book an Appointment</h2>
//   <form>
//     <div className="row g-3">
//       <div className="col-md-6">
//         <label className="form-label">Full Name</label>
//         <input type="text" className="form-control" placeholder="Enter your full name" required />
//       </div>
//       <div className="col-md-6">
//         <label className="form-label">Phone Number</label>
//         <input type="tel" className="form-control" placeholder="e.g. 9876543210" required />
//       </div>
//       <div className="col-md-6">
//         <label className="form-label">Email</label>
//         <input type="email" className="form-control" placeholder="your@email.com" required />
//       </div>
//       <div className="col-md-6">
//         <label className="form-label">Hospital Preference</label>
//         <input type="text" className="form-control" placeholder="Preferred hospital" />
//       </div>
//       <div className="col-md-6">
//         <label className="form-label">Appointment Date</label>
//         <input type="date" className="form-control" required />
//       </div>
//       <div className="col-md-6">
//         <label className="form-label">Preferred Time</label>
//         <input type="time" className="form-control" required />
//       </div>
//       <div className="col-12">
//         <label className="form-label">Message / Health Concern</label>
//         <textarea className="form-control" rows="4" placeholder="Describe your issue..." />
//       </div>
//     </div>
//     <div className="text-center mt-4">
//       <button type="submit" className="btn btn-success px-5">Submit</button>
//     </div>
//   </form>
// </div>

//     </section>

//   );
// }
import React, { useEffect, useState } from 'react';

// import { useState } from "react";
import axios from "axios";

export default function Ambulance() {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [locationLoading, setLocationLoading] = useState(false);
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
      // Using Nominatim (OpenStreetMap) - free reverse geocoding service
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
        // Try alternative free service - BigDataCloud
        const fallbackResponse = await fetch(
          `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`
        );
        
        if (fallbackResponse.ok) {
          const fallbackData = await fallbackResponse.json();
          if (fallbackData && fallbackData.locality) {
            return `${fallbackData.locality}, ${fallbackData.city || fallbackData.principalSubdivision}, ${fallbackData.countryName}`;
          }
        }
        
        // Final fallback: just return a generic location description
        return `Location coordinates provided (${latitude.toFixed(4)}, ${longitude.toFixed(4)})`;
      }
    } catch (error) {
      console.error('Reverse geocoding failed:', error);
      // Fallback: create a generic location description
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
      maximumAge: 60000 // Cache location for 1 minute
    };

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        
        try {
          // Get human-readable address
          const address = await getReverseGeocode(latitude, longitude);
          
          setFormData({
            ...formData,
            location: address,
            latitude: "", // Don't store coordinates in form
            longitude: "" // Don't store coordinates in form
          });
        } catch (error) {
          console.error('Error getting address:', error);
          // Still provide a location description without exact coordinates
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token"); // JWT token
      await axios.post(
        "https://ruwa-backend.onrender.com/api/services/ambulance-booking/user/book",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setFormSubmitted(true);
      setFormData({
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

      setTimeout(() => {
        setFormSubmitted(false);
      }, 4000);
    } catch (error) {
      console.error("Booking failed:", error.response?.data || error.message);
      alert(error.response?.data?.message || "Failed to book ambulance");
    }
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
            phone: user.phone || "",
            email: user.email || "",
           
            
          }));
        })
        .catch((err) => console.error("Profile fetch failed:", err));
    }, []);
  return (
    <section className="section services__v3 py-5" id="services">
      <div className="container">
        <div className="row g-4">
          <div className="col-12 " data-aos="fade-up">
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
        <h2 className="mb-4 text-center">Book an Appointment</h2>

        {formSubmitted && (
          <div className="alert alert-success text-center fw-semibold" role="alert">
            ✅ Appointment booked successfully!
          </div>
        )}

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
            
            {/* New Location Field */}
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
