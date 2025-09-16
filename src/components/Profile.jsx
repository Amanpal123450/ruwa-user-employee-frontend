// import React from "react";
// // import "./Profile.css";
// // import profilePic from "./assets/patient.png"; // use your uploaded image here

// export default function Profile() {
//   return (
//     <div className="profile-container p-4">
//       <div className="breadcrumb">
//         <span>Patients List</span> / <strong>Patient Details</strong>
//       </div>

//       <div className="card patient-card p-4 shadow-sm">
//         <div className="d-flex justify-content-between align-items-center mb-4">
//           <div className="d-flex align-items-center gap-3">
//             <img src="/assets/images/doctor.jpg" alt="Patient" className="profile-image" />
//             <div>
//               <h5 className="mb-0">Henry D. Wilson <span className="badge bg-success ms-2">Active</span></h5>
//               <div>ID: #5233 • 📞 +123 456 7890</div>
//             </div>
//           </div>
//           <div className="tabs">
//             <button className="tab active">Details</button>
//             <button className="tab">Appointments</button>
//             <button className="tab">Insurance</button>
//             <button className="tab">Chat</button>
//             <button className="tab">Notes</button>
//             <button className="tab">Attachments</button>
//           </div>
//         </div>

//         <div className="row profile-details">
//           <div className="col-md-6">
//             <h6>Personal Information</h6>
//             <ul>
//               <li><strong>First Name:</strong> Henry</li>
//               <li><strong>Last Name:</strong> Wilson</li>
//               <li><strong>Father Name:</strong> Denlin Wilson</li>
//               <li><strong>Gender:</strong> Male</li>
//               <li><strong>Phone Number:</strong> +123 456 7890</li>
//               <li><strong>Email ID:</strong> henry@gmail.com</li>
//               <li><strong>Date of Birth:</strong> 30/06/1996</li>
//               <li><strong>Blood Group:</strong> O+</li>
//               <li><strong>Marital Status:</strong> Married</li>
//               <li><strong>Address:</strong> 123 Main Street</li>
//             </ul>
//           </div>
//           <div className="col-md-6">
//             <h6>Medical Information</h6>
//             <ul>
//               <li><strong>Primary Physician:</strong> Dr. Emily Davies</li>
//               <li><strong>Known Allergies:</strong> Penicillin</li>
//               <li><strong>Previous Surgeries:</strong> Appendectomy (2020)</li>
//               <li><strong>Chronic Conditions:</strong> Hypertension (Diagnosed: 01/10/2022)</li>
//               <li><strong>Current Medication:</strong> Atenolol 50mg</li>
//             </ul>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// // }

// import "./Profile.css";
// import profilePic from "./assets/patient.png"; // your image path

// import { useEffect, useState } from "react";

// export default function Profile() {
//   const [editable, setEditable] = useState(false);
//   const [formData, setFormData] = useState({
//     name: "",
    
    
    
//     phone: "",
//     email: "",
    
//   });

//   useEffect(() => {
//     const fetchProfile = async () => {
//       try {
//         const res = await fetch("https://ruwa-backend.onrender.com/api/auth/profile", {
//           headers: {
//             Authorization: `Bearer ${localStorage.getItem("token")}`,
//           },
//         });

//         if (!res.ok) {
//           throw new Error("Failed to fetch profile");
//         }

//         const data = await res.json();

//         // merge API response with defaults
//         setFormData(data.user);
//       } catch (err) {
//         console.error("Error fetching profile:", err);
//       }
//     };

//     fetchProfile();
//   }, []);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleToggleEdit = async () => {
//     if (editable) {
//       try {
//         const res = await fetch("https://ruwa-backend.onrender.com/api/user/put", {
//           method: "PUT",
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${localStorage.getItem("token")}`,
//           },
//           body: JSON.stringify(formData),
//         });

//         if (!res.ok) {
//           throw new Error("Failed to update profile");
//         }
//       } catch (err) {
//         console.error("Error updating profile:", err);
//       }
//     }
//     setEditable((prev) => !prev);
//   };

//   return (
//     <div className="profile-container p-4">
//       <div className="breadcrumb d-flex justify-content-between">
//         <span>
//           Patients List / <strong>Patient Details</strong>
//         </span>
//         <button className="btn btn-primary btn-sm" onClick={handleToggleEdit}>
//           {editable ? "Save" : "Edit"}
//         </button>
//       </div>

//       <div className="card patient-card p-4 shadow-sm mt-3">
//         <div className="d-flex justify-content-between align-items-center mb-4">
//           <div className="d-flex align-items-center gap-3">
//             <img
//               src="/assets/images/astronaut.svg"
//               alt="Patient"
//               className="profile-image"
//             />
//             <div>
//               <h5 className="mb-0">
//                 {formData.name} {formData.lastName}
//                 <span className="badge bg-success ms-2">Active</span>
//               </h5>
//               <div>ID: {formData.userId} • 📞 {formData.phone}</div>
//             </div>
//           </div>
//           {/* <div className="tabs d-none d-md-flex">
//             <button className="tab active">Details</button>
//             <button className="tab">Arogay Card</button>
//             <button className="tab">Insurance</button>
//             <button className="tab">Chat</button>
//             <button className="tab">Notes</button>
//             <button className="tab">Attachments</button>
//           </div> */}
//         </div>

//         <div className="row profile-details">
//           <div className="col-md-6">
//             <h6>Personal Information</h6>
//             <ul>
//               <li><strong>First Name:</strong> { <span >{formData.name}</span> }</li>
//               <li><strong>Phone:</strong> { <span >{formData.phone}</span>}</li>
//               <li><strong>Email:</strong> { <span >{formData.email}</span> }</li>
//               </ul>
//           </div>

//           {/* <div className="col-md-6">
//             <h6>Medical Information</h6>
//             <ul>
//               <li><strong>Primary Physician:</strong> {editable ? <input name="physician" value={formData.physician} onChange={handleChange} /> : formData.physician}</li>
//               <li><strong>Known Allergies:</strong> {editable ? <input name="allergies" value={formData.allergies} onChange={handleChange} /> : formData.allergies}</li>
//               <li><strong>Previous Surgeries:</strong> {editable ? <input name="surgeries" value={formData.surgeries} onChange={handleChange} /> : formData.surgeries}</li>
//               <li><strong>Chronic Conditions:</strong> {editable ? <input name="conditions" value={formData.conditions} onChange={handleChange} /> : formData.conditions}</li>
//               <li><strong>Current Medication:</strong> {editable ? <input name="medication" value={formData.medication} onChange={handleChange} /> : formData.medication}</li>
//             </ul>
//           </div> */}
//         </div>
//       </div>
//     </div>
//   );
// }


// import React, { useState } from "react";
// import HealthCard from "./HealthCard"; // ✅ Make sure this path is correct

// export default function Profile() {
//   const [formData, setFormData] = useState({
//     physician: "Dr. A. Kumar",
//     allergies: "None",
//     surgeries: "Appendectomy (2015)",
//     conditions: "Hypertension",
//     medication: "Amlodipine"
//   });

//   const [editable, setEditable] = useState(false);
//   const [activeTab, setActiveTab] = useState("details"); // 🟡 Controls current view

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   return (
//     <div className="container my-5">
//       <div className="row g-4">
//         <div className="col-md-6">
//           <h6>Personal Information</h6>
//           <ul>
//             <li><strong>Name:</strong> Ramesh Kumar</li>
//             <li><strong>Date of Birth:</strong> 01/01/1980</li>
//             <li><strong>Father's Name:</strong> Mahesh Kumar</li>
//             <li><strong>City:</strong> Lucknow</li>
//           </ul>
//         </div>

//         <div className="col-md-6">
//           {/* Conditional content: medical info or arogya card */}
//           {activeTab === "details" && (
//             <>
//               <h6>Medical Information</h6>
//               <ul>
//                 <li><strong>Primary Physician:</strong> {editable ? <input name="physician" value={formData.physician} onChange={handleChange} /> : formData.physician}</li>
//                 <li><strong>Known Allergies:</strong> {editable ? <input name="allergies" value={formData.allergies} onChange={handleChange} /> : formData.allergies}</li>
//                 <li><strong>Previous Surgeries:</strong> {editable ? <input name="surgeries" value={formData.surgeries} onChange={handleChange} /> : formData.surgeries}</li>
//                 <li><strong>Chronic Conditions:</strong> {editable ? <input name="conditions" value={formData.conditions} onChange={handleChange} /> : formData.conditions}</li>
//                 <li><strong>Current Medication:</strong> {editable ? <input name="medication" value={formData.medication} onChange={handleChange} /> : formData.medication}</li>
//               </ul>
//             </>
//           )}

//           {activeTab === "arogya" && (
//             <HealthCard />
//           )}
//         </div>
//       </div>

//       {/* Tabs to switch views */}
//       <div className="tabs d-none d-md-flex mt-4">
//         <button className={`tab ${activeTab === "details" ? "active" : ""}`} onClick={() => setActiveTab("details")}>Details</button>
//         <button className={`tab ${activeTab === "arogya" ? "active" : ""}`} onClick={() => setActiveTab("arogya")}>Arogya Card</button>
//         <button className="tab">Insurance</button>
//         <button className="tab">Chat</button>
//         <button className="tab">Notes</button>
//         <button className="tab">Attachments</button>
//       </div>
//     </div>
//   );
// }
import { useEffect, useState, useRef } from "react";

export default function Profile() {
  const [editable, setEditable] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    DOB: "",
    profile_pic: "",
    userId: ""
  });
  const [previewImage, setPreviewImage] = useState(null);
  const fileInputRef = useRef(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await fetch("https://ruwa-backend.onrender.com/api/auth/profile", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        if (!res.ok) {
          throw new Error("Failed to fetch profile");
        }

        const data = await res.json();
        
        // Set form data with API response
        setFormData(data.profile || data.user);
        
        // Set preview image if profile pic exists
        if (data.profile?.profile_pic || data.user?.profile_pic) {
          setPreviewImage(data.profile?.profile_pic || data.user?.profile_pic);
        }
      } catch (err) {
        console.error("Error fetching profile:", err);
        alert("Error fetching profile data");
      }
    };

    fetchProfile();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validate file type
      const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif'];
      if (!validTypes.includes(file.type)) {
        alert('Please select a valid image file (JPEG, PNG, GIF)');
        return;
      }

      // Validate file size (5MB max)
      if (file.size > 5 * 1024 * 1024) {
        alert('File size should be less than 5MB');
        return;
      }

      // Create preview
      const reader = new FileReader();
      reader.onload = (e) => {
        setPreviewImage(e.target.result);
      };
      reader.readAsDataURL(file);

      // Upload image
      handleImageUpload(file);
    }
  };

  const handleImageUpload = async (file) => {
    try {
      setUploading(true);
      
      const formDataToSend = new FormData();
      formDataToSend.append('image', file);

      const res = await fetch("https://ruwa-backend.onrender.com/api/uu/upload-profile", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: formDataToSend,
      });

      if (!res.ok) {
        throw new Error("Failed to upload image");
      }

      const data = await res.json();
      
      // Update form data with new profile pic URL
      setFormData((prev) => ({ ...prev, profile_pic: data.url }));
      setPreviewImage(data.url);
      
      alert("Profile image uploaded successfully!");
    } catch (err) {
      console.error("Error uploading image:", err);
      alert("Error uploading image. Please try again.");
      setPreviewImage(formData.profile_pic); // Reset preview to original
    } finally {
      setUploading(false);
    }
  };

  const handleDOBUpdate = async () => {
    if (!formData.DOB) {
      alert("Please select a date of birth");
      return;
    }

    try {
      const res = await fetch("https://ruwa-backend.onrender.com/api/uu/upload-DOB", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ DOB: formData.DOB }),
      });

      if (!res.ok) {
        throw new Error("Failed to update DOB");
      }

      const data = await res.json();
      setFormData(data.profile);
      alert("Date of birth updated successfully!");
    } catch (err) {
      console.error("Error updating DOB:", err);
      alert("Error updating date of birth. Please try again.");
    }
  };

  const handleToggleEdit = async () => {
    if (editable) {
      try {
        const res = await fetch("https://ruwa-backend.onrender.com/api/uu/profile", {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify({
            name: formData.name,
            phone: formData.phone,
            email: formData.email,
          }),
        });

        if (!res.ok) {
          throw new Error("Failed to update profile");
        }

        const data = await res.json();
        setFormData(data.profile);
        alert("Profile updated successfully!");
      } catch (err) {
        console.error("Error updating profile:", err);
        alert("Error updating profile. Please try again.");
      }
    }
    setEditable((prev) => !prev);
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };

  return (
    <div className="profile-container p-4">
      <div className="breadcrumb d-flex justify-content-between">
        <span>
          Patients List / <strong>Patient Details</strong>
        </span>
        <button className="btn btn-primary btn-sm" onClick={handleToggleEdit}>
          {editable ? "Save" : "Edit"}
        </button>
      </div>

      <div className="card patient-card p-4 shadow-sm mt-3">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <div className="d-flex align-items-center gap-3">
            <div className="position-relative">
              <img
                src={previewImage || "/assets/images/astronaut.svg"}
                alt="Patient"
                className="profile-image rounded-circle"
                style={{
                  width: "80px",
                  height: "80px",
                  objectFit: "cover",
                  cursor: editable ? "pointer" : "default"
                }}
                onClick={editable ? triggerFileInput : undefined}
              />
              {editable && (
                <div 
                  className="position-absolute bottom-0 end-0 bg-primary rounded-circle d-flex align-items-center justify-content-center"
                  style={{ width: "24px", height: "24px", cursor: "pointer" }}
                  onClick={triggerFileInput}
                >
                  <i className="fas fa-camera text-white" style={{ fontSize: "12px" }}></i>
                </div>
              )}
              {uploading && (
                <div 
                  className="position-absolute top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center bg-dark bg-opacity-50 rounded-circle"
                >
                  <div className="spinner-border spinner-border-sm text-white" role="status"></div>
                </div>
              )}
            </div>
            
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleImageSelect}
              accept="image/*"
              className="d-none"
            />
            
            <div>
              <h5 className="mb-0">
                {formData.name} {formData.lastName}
                <span className="badge bg-success ms-2">Active</span>
              </h5>
              <div>ID: {formData.userId} • 📞 {formData.phone}</div>
            </div>
          </div>
        </div>

        <div className="row profile-details">
          <div className="col-md-6">
            <h6>Personal Information</h6>
            <ul className="list-unstyled">
              <li className="mb-2">
                <strong>First Name:</strong> 
                {editable ? (
                  <input 
                    type="text"
                    name="name"
                    value={formData.name || ""}
                    onChange={handleChange}
                    className="form-control form-control-sm d-inline-block ms-2"
                    style={{ width: "200px" }}
                  />
                ) : (
                  <span className="ms-2">{formData.name}</span>
                )}
              </li>
              
              <li className="mb-2">
                <strong>Phone:</strong> 
                {editable ? (
                  <input 
                    type="tel"
                    name="phone"
                    value={formData.phone || ""}
                    onChange={handleChange}
                    className="form-control form-control-sm d-inline-block ms-2"
                    style={{ width: "200px" }}
                  />
                ) : (
                  <span className="ms-2">{formData.phone}</span>
                )}
              </li>
              
              <li className="mb-2">
                <strong>Email:</strong> 
                {editable ? (
                  <input 
                    type="email"
                    name="email"
                    value={formData.email || ""}
                    onChange={handleChange}
                    className="form-control form-control-sm d-inline-block ms-2"
                    style={{ width: "250px" }}
                  />
                ) : (
                  <span className="ms-2">{formData.email}</span>
                )}
              </li>
              
              <li className="mb-2">
                <strong>Date of Birth:</strong> 
                {editable ? (
                  <div className="d-inline-block ms-2">
                    <input 
                      type="date"
                      name="DOB"
                      value={formData.DOB ? formData.DOB.split('T')[0] : ""}
                      onChange={handleChange}
                      className="form-control form-control-sm d-inline-block"
                      style={{ width: "200px" }}
                    />
                    <button 
                      className="btn btn-sm btn-outline-primary ms-2"
                      onClick={handleDOBUpdate}
                      type="button"
                    >
                      Update DOB
                    </button>
                  </div>
                ) : (
                  <span className="ms-2">{formatDate(formData.DOB) || "Not set"}</span>
                )}
              </li>
            </ul>
          </div>
        </div>

        {editable && (
          <div className="mt-3 alert alert-info">
            <small>
              <i className="fas fa-info-circle me-2"></i>
              Click on the profile image to upload a new photo. DOB updates require clicking "Update DOB" button.
            </small>
          </div>
        )}
      </div>
    </div>
  );
}