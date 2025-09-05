
// // import React, { useState, useRef } from "react";
// // import { QRCodeCanvas } from "qrcode.react";
// // import html2canvas from "html2canvas";
// // import jsPDF from "jspdf";

// // export default function Empidente() {
// //   // Sample employee data
// //   const employeeData = {
// //     name: "Rajesh Kumar",
// //     employeeId: "EMP-001",
// //     department: "Healthcare Services",
// //     position: "Senior Coordinator",
// //     joinDate: "2022-05-15",
// //     dob: "1990-08-22",
// //     profilePic: "https://randomuser.me/api/portraits/men/1.jpg",
// //     email: "rajesh@janarogya.com",
// //     phone: "+91 9876543210",
// //     center: {
// //       name: "Jan Arogya Central Hospital",
// //       address: "123 Health Street, Medical District",
// //       city: "Mumbai",
// //       code: "JACH-MUM-001"
// //     },
// //     bloodGroup: "B+",
// //     emergencyContact: "+91 9123456789",
// //     validUntil: "2025-12-31"
// //   };

// //   const [showPrintView, setShowPrintView] = useState(false);
// //   const cardRef = useRef(null);
// //   const qrCodeRef = useRef(null);

// //   // ✅ Print ID Card
// //   const handlePrint = () => {
// //     setShowPrintView(true);
// //     setTimeout(() => {
// //       window.print();
// //       setShowPrintView(false);
// //     }, 500);
// //   };

// //   // ✅ Download ID Card as PDF
// //   const handleDownload = async () => {
// //     if (!cardRef.current) return;

// //     const canvas = await html2canvas(cardRef.current, { scale: 2 });
// //     const imgData = canvas.toDataURL("image/png");

// //     const pdf = new jsPDF("landscape", "pt", "a4");
// //     const width = pdf.internal.pageSize.getWidth();
// //     const height = pdf.internal.pageSize.getHeight();

// //     pdf.addImage(imgData, "PNG", 20, 20, width - 40, height - 40);
// //     pdf.save(`${employeeData.name}_ID_Card.pdf`);
// //   };

// //   // ✅ Generate QR code data string with all details
// //   const generateQRData = () => {
// //     return `EMPLOYEE ID: ${employeeData.employeeId}
// // NAME: ${employeeData.name}
// // DEPARTMENT: ${employeeData.department}
// // POSITION: ${employeeData.position}
// // CENTER: ${employeeData.center.name}
// // CENTER CODE: ${employeeData.center.code}
// // EMAIL: ${employeeData.email}
// // PHONE: ${employeeData.phone}
// // JOIN DATE: ${employeeData.joinDate}
// // VALID UNTIL: ${employeeData.validUntil}
// // BLOOD GROUP: ${employeeData.bloodGroup}
// // EMERGENCY CONTACT: ${employeeData.emergencyContact}`;
// //   };

// //   return (
// //     <div className={`dashboard-container ${showPrintView ? "print-view" : ""}`}>
// //       <div className="container-fluid py-4">
// //         <div className="row">
// //           <div className="col-12">
// //             {/* Header */}
// //             <div className="welcome-card mb-4">
// //               <div className="welcome-overlay">
// //                 <div className="row align-items-center">
// //                   <div className="col-lg-8 col-md-7">
// //                     <div className="welcome-content">
// //                       <div className="greeting-badge">Employee Identity Card 👤</div>
// //                       <h1 className="welcome-title">
// //                         Official Healthcare Organization ID
// //                       </h1>
// //                       <p className="welcome-subtitle">
// //                         Aadhaar-style identification card for Jan Arogya Healthcare Services
// //                       </p>
// //                     </div>
// //                   </div>
// //                   <div className="col-lg-4 col-md-5 text-center">
// //                     <div className="profile-section">
// //                       <div className="profile-image-container">
// //                         <div className="service-icon-display">
// //                           <span className="icon-emoji">🪪</span>
// //                         </div>
// //                       </div>
// //                     </div>
// //                   </div>
// //                 </div>
// //               </div>
// //             </div>

// //             {/* ID Card Section */}
// //             <div className="row">
// //               <div className="col-12 col-lg-8 mb-4 mx-auto">
// //                 <div className="card user-table-card h-100">
// //                   <div className="card-header d-flex justify-content-between align-items-center">
// //                     <h3 className="header-title mb-0">Employee ID Card</h3>
// //                     <div className="action-buttons">
// //                       {/* <button className="btn btn-primary me-2" onClick={handlePrint}>
// //                         <i className="fas fa-print me-2"></i>Print ID Card
// //                       </button> */}
// //                       <button className="btn btn-outline-secondary" onClick={handleDownload}>
// //                         <i className="fas fa-download me-2"></i>Download
// //                       </button>
// //                     </div>
// //                   </div>
// //                   <div className="card-body">
// //                     <div className="id-card-container" ref={cardRef}>
// //                       <div className="id-card-wrapper">
// //                         {/* Front side of ID card */}
// //                         <div className="id-card aadhaar-front">
// //                           <div className="aadhaar-header">
// //                             <div className="aadhaar-logo">
// //                               <span className="icon-emoji">🏥</span>
// //                               <div>
// //                                 <h3>जन आरोग्य</h3>
// //                                 <h4>Jan Arogya</h4>
// //                               </div>
// //                             </div>
// //                             <div className="aadhaar-title">
// //                               Healthcare Employee ID Card
// //                             </div>
// //                           </div>

// //                           <div className="aadhaar-content">
// //                             <div className="aadhaar-photo-section">
// //                               <div className="aadhaar-photo">
// //                                 <img
// //                                   src={employeeData.profilePic}
// //                                   alt={employeeData.name}
// //                                 />
// //                                 <div className="employee-status"></div>
// //                               </div>
// //                               {/* ✅ Real QR Code */}
// //                               <div className="aadhaar-qr-code" ref={qrCodeRef}>
// //                                 <QRCodeCanvas
// //                                   value={generateQRData()}
// //                                   size={100}
// //                                   bgColor="#ffffff"
// //                                   fgColor="#0d47a1"
// //                                   level="H"
// //                                   includeMargin={true}
// //                                 />
// //                                 <div className="qr-text">Scan Me</div>
// //                               </div>
// //                             </div>

// //                             <div className="aadhaar-details">
// //                               <div className="aadhaar-field">
// //                                 <div className="aadhaar-label">Name/नाम</div>
// //                                 <div className="aadhaar-value">
// //                                   {employeeData.name}
// //                                 </div>
// //                               </div>

// //                               <div className="aadhaar-field">
// //                                 <div className="aadhaar-label">
// //                                   Date of Birth/जन्म तिथि
// //                                 </div>
// //                                 <div className="aadhaar-value">
// //                                   {new Date(employeeData.dob).toLocaleDateString(
// //                                     "en-IN"
// //                                   )}
// //                                 </div>
// //                               </div>

// //                               <div className="aadhaar-id-section">
// //                                 <div className="aadhaar-field">
// //                                   <div className="aadhaar-label">
// //                                     Employee ID/कर्मचारी आईडी
// //                                   </div>
// //                                   <div className="aadhaar-value id-number">
// //                                     {employeeData.employeeId}
// //                                   </div>
// //                                 </div>
// //                               </div>

// //                               <div className="aadhaar-gender-section">
// //                                 <div className="aadhaar-field">
// //                                   <div className="aadhaar-label">Gender/लिंग</div>
// //                                   <div className="aadhaar-value">Male/पुरुष</div>
// //                                 </div>
// //                               </div>
// //                             </div>
// //                           </div>

// //                           <div className="aadhaar-footer">
// //                             <div className="aadhaar-validity">
// //                               <span>
// //                                 Issued On:{" "}
// //                                 {new Date(
// //                                   employeeData.joinDate
// //                                 ).toLocaleDateString("en-IN")}
// //                               </span>
// //                               <span>
// //                                 Valid Until:{" "}
// //                                 {new Date(
// //                                   employeeData.validUntil
// //                                 ).toLocaleDateString("en-IN")}
// //                               </span>
// //                             </div>
// //                           </div>
// //                         </div>

// //                         {/* Back side of ID card */}
// //                         <div className="id-card aadhaar-back">
// //                           <div className="aadhaar-back-header">
// //                             <h3>Additional Details/अतिरिक्त विवरण</h3>
// //                           </div>

// //                           <div className="aadhaar-back-content">
// //                             <div className="aadhaar-back-details">
// //                               <div className="detail-row">
// //                                 <div className="detail-label">
// //                                   Department/विभाग:
// //                                 </div>
// //                                 <div className="detail-value">
// //                                   {employeeData.department}
// //                                 </div>
// //                               </div>

// //                               <div className="detail-row">
// //                                 <div className="detail-label">Position/पद:</div>
// //                                 <div className="detail-value">
// //                                   {employeeData.position}
// //                                 </div>
// //                               </div>

// //                               <div className="detail-row">
// //                                 <div className="detail-label">Center/केंद्र:</div>
// //                                 <div className="detail-value">
// //                                   {employeeData.center.name}
// //                                 </div>
// //                               </div>

// //                               <div className="detail-row">
// //                                 <div className="detail-label">
// //                                   Center Code/केंद्र कोड:
// //                                 </div>
// //                                 <div className="detail-value">
// //                                   {employeeData.center.code}
// //                                 </div>
// //                               </div>

// //                               <div className="detail-row">
// //                                 <div className="detail-label">Address/पता:</div>
// //                                 <div className="detail-value small">
// //                                   {employeeData.center.address},{" "}
// //                                   {employeeData.center.city}
// //                                 </div>
// //                               </div>

// //                               <div className="detail-row">
// //                                 <div className="detail-label">
// //                                   Blood Group/रक्त समूह:
// //                                 </div>
// //                                 <div className="detail-value blood-group">
// //                                   {employeeData.bloodGroup}
// //                                 </div>
// //                               </div>

// //                               <div className="detail-row">
// //                                 <div className="detail-label">
// //                                   Emergency Contact/आपातकालीन संपर्क:
// //                                 </div>
// //                                 <div className="detail-value">
// //                                   {employeeData.emergencyContact}
// //                                 </div>
// //                               </div>
// //                             </div>

// //                             <div className="aadhaar-back-footer">
// //                               <div className="official-notes">
// //                                 <p>
// //                                   This card is the property of Jan Arogya
// //                                   Healthcare Services. If found, please return to
// //                                   the nearest center.
// //                                 </p>
// //                                 <p>
// //                                   यह कार्ड जन आरोग्य हेल्थकेयर सर्विसेज की
// //                                   संपत्ति है। यदि मिले, तो कृपया नजदीकी केंद्र
// //                                   पर वापस लौटाएं।
// //                                 </p>
// //                               </div>
// //                               <div className="signature-section">
// //                                 <div className="signature-area">
// //                                   <div className="signature-line"></div>
// //                                   <small>
// //                                     Authorized Signature/अधिकृत हस्ताक्षर
// //                                   </small>
// //                                 </div>
// //                               </div>
// //                             </div>
// //                           </div>
// //                         </div>
// //                       </div>
// //                     </div>
                   
// //                   </div>
// //                 </div>
// //               </div>
// //             </div>
// //           </div>
// //         </div>
// //       </div>
// //       {/* Keep your styles here as they already exist */}
// //       <style jsx>{`
// //         .dashboard-container {
// //           background: linear-gradient(135deg, #f0f8ff 0%, #e6f2ff 100%);
// //           min-height: 100vh;
// //           padding: 0;
// //         }

// //         .welcome-card {
// //           background: linear-gradient(135deg, #1e88e5 0%, #0d47a1 100%);
// //           border-radius: 16px;
// //           margin-bottom: 2rem;
// //           overflow: hidden;
// //           position: relative;
// //           box-shadow: 0 10px 30px rgba(30, 136, 229, 0.3);
// //         }

// //         .welcome-overlay {
// //           padding: 2rem;
// //           position: relative;
// //           z-index: 2;
// //         }

// //         .welcome-content {
// //           color: white;
// //         }

// //         .greeting-badge {
// //           display: inline-block;
// //           background: rgba(255, 255, 255, 0.2);
// //           padding: 0.5rem 1rem;
// //           border-radius: 50px;
// //           font-size: 0.9rem;
// //           font-weight: 500;
// //           margin-bottom: 1rem;
// //           backdrop-filter: blur(10px);
// //         }

// //         .welcome-title {
// //           font-size: 2.2rem;
// //           font-weight: 700;
// //           margin-bottom: 0.5rem;
// //           color: white;
// //         }

// //         .welcome-subtitle {
// //           font-size: 1.1rem;
// //           opacity: 0.9;
// //           margin-bottom: 0;
// //           color: rgba(255, 255, 255, 0.9);
// //         }

// //         .service-icon-display {
// //           width: 100px;
// //           height: 100px;
// //           border-radius: 50%;
// //           background: rgba(255, 255, 255, 0.2);
// //           display: flex;
// //           align-items: center;
// //           justify-content: center;
// //           font-size: 3rem;
// //           backdrop-filter: blur(10px);
// //           border: 2px solid rgba(255, 255, 255, 0.3);
// //         }

// //         .user-table-card {
// //           background: white;
// //           border-radius: 16px;
// //           box-shadow: 0 4px 20px rgba(13, 71, 161, 0.1);
// //           border: none;
// //           overflow: hidden;
// //         }

// //         .card-header {
// //           background: linear-gradient(135deg, #bbdefb 0%, #90caf9 100%);
// //           border-bottom: 1px solid #bbdefb;
// //           padding: 1.5rem;
// //         }

// //         .header-title {
// //           font-size: 1.5rem;
// //           font-weight: 600;
// //           color: #0d47a1;
// //           margin: 0;
// //         }

// //         /* Aadhaar Card Styles */
// //         .id-card-container {
// //           display: flex;
// //           justify-content: center;
// //           padding: 1rem;
// //         }

// //         .id-card-wrapper {
// //           display: flex;
// //           flex-wrap: wrap;
// //           gap: 2rem;
// //           justify-content: center;
// //         }

// //         .id-card {
// //           width: 100%;
// //           max-width: 400px;
// //           border-radius: 12px;
// //           overflow: hidden;
// //         }

// //         .aadhaar-front {
// //           background: linear-gradient(135deg, #bbdefb 0%, #90caf9 100%);
// //           box-shadow: 0 8px 25px rgba(30, 136, 229, 0.2);
// //           border: 1px solid #90caf9;
// //         }

// //         .aadhaar-back {
// //           background: linear-gradient(135deg, #e3f2fd 0%, #bbdefb 100%);
// //           box-shadow: 0 8px 25px rgba(30, 136, 229, 0.2);
// //           border: 1px solid #bbdefb;
// //         }

// //         .aadhaar-header {
// //           background: linear-gradient(135deg, #1565c0 0%, #0d47a1 100%);
// //           color: white;
// //           padding: 0.8rem;
// //           text-align: center;
// //         }

// //         .aadhaar-logo {
// //           display: flex;
// //           align-items: center;
// //           justify-content: center;
// //           gap: 0.5rem;
// //           margin-bottom: 0.5rem;
// //         }

// //         .aadhaar-logo h3 {
// //           margin: 0;
// //           font-weight: 700;
// //           font-size: 1.5rem;
// //         }

// //         .aadhaar-logo h4 {
// //           margin: 0;
// //           font-weight: 600;
// //           font-size: 1rem;
// //           opacity: 0.9;
// //         }

// //         .aadhaar-title {
// //           font-size: 0.9rem;
// //           font-weight: 500;
// //           letter-spacing: 0.5px;
// //         }

// //         .aadhaar-content {
// //           padding: 1.2rem;
// //         }

// //         .aadhaar-photo-section {
// //           display: flex;
// //           gap: 1rem;
// //           margin-bottom: 1.2rem;
// //         }

// //         .aadhaar-photo {
// //           flex: 1;
// //           position: relative;
// //         }

// //         .aadhaar-photo img {
// //           width: 100%;
// //           height: 120px;
// //           object-fit: cover;
// //           border-radius: 6px;
// //           border: 2px solid #e3f2fd;
// //         }

// //         .employee-status {
// //           position: absolute;
// //           bottom: 5px;
// //           right: 5px;
// //           width: 16px;
// //           height: 16px;
// //           background-color: #4caf50;
// //           border: 2px solid white;
// //           border-radius: 50%;
// //         }

// //         .aadhaar-qr-code {
// //           flex: 1;
// //           display: flex;
// //           flex-direction: column;
// //           align-items: center;
// //           justify-content: center;
// //         }

// //         .simple-qr-code {
// //           display: flex;
// //           flex-direction: column;
// //           align-items: center;
// //         }

// //         .qr-container {
// //           border: 1px solid #bbdefb;
// //           padding: 5px;
// //           background: white;
// //         }

// //         .qr-pattern {
// //           display: flex;
// //           flex-direction: column;
// //         }

// //         .qr-row {
// //           display: flex;
// //         }

// //         .qr-cell {
// //           width: 12px;
// //           height: 12px;
// //           margin: 1px;
// //         }

// //         .qr-cell.black {
// //           background-color: #0d47a1;
// //         }

// //         .qr-cell.white {
// //           background-color: #fff;
// //         }

// //         .qr-text {
// //           font-size: 0.7rem;
// //           margin-top: 5px;
// //           color: #0d47a1;
// //           font-weight: 500;
// //         }

// //         .aadhaar-details {
// //           display: flex;
// //           flex-direction: column;
// //           gap: 0.6rem;
// //         }

// //         .aadhaar-field {
// //           display: flex;
// //           flex-direction: column;
// //           border-bottom: 1px dashed #90caf9;
// //           padding: 0.2rem 0;
// //         }

// //         .aadhaar-label {
// //           font-weight: 600;
// //           color: #1565c0;
// //           font-size: 0.7rem;
// //           margin-bottom: 0.1rem;
// //         }

// //         .aadhaar-value {
// //           font-weight: 500;
// //           color: #0d47a1;
// //           font-size: 0.9rem;
// //         }

// //         .id-number {
// //           font-weight: 700;
// //           font-size: 1.1rem;
// //           letter-spacing: 1px;
// //           color: #0d47a1;
// //         }

// //         .aadhaar-footer {
// //           background: linear-gradient(135deg, #1565c0 0%, #0d47a1 100%);
// //           padding: 0.8rem;
// //           text-align: center;
// //         }

// //         .aadhaar-validity {
// //           font-size: 0.7rem;
// //           color: white;
// //           display: flex;
// //           justify-content: space-between;
// //         }

// //         /* Back side styles */
// //         .aadhaar-back-header {
// //           background: linear-gradient(135deg, #1565c0 0%, #0d47a1 100%);
// //           color: white;
// //           padding: 0.8rem;
// //           text-align: center;
// //         }

// //         .aadhaar-back-header h3 {
// //           margin: 0;
// //           font-size: 1.1rem;
// //           font-weight: 600;
// //         }

// //         .aadhaar-back-content {
// //           padding: 1.2rem;
// //         }

// //         .aadhaar-back-details {
// //           display: flex;
// //           flex-direction: column;
// //           gap: 0.6rem;
// //           margin-bottom: 1.2rem;
// //         }

// //         .detail-row {
// //           display: flex;
// //           border-bottom: 1px dashed #90caf9;
// //           padding-bottom: 0.5rem;
// //         }

// //         .detail-label {
// //           flex: 1;
// //           font-weight: 600;
// //           color: #1565c0;
// //           font-size: 0.75rem;
// //         }

// //         .detail-value {
// //           flex: 2;
// //           color: #0d47a1;
// //           font-size: 0.8rem;
// //         }

// //         .detail-value.small {
// //           font-size: 0.75rem;
// //         }

// //         .blood-group {
// //           background: #ffebee;
// //           color: #c62828;
// //           padding: 0.1rem 0.5rem;
// //           border-radius: 4px;
// //           font-weight: 700;
// //         }

// //         .aadhaar-back-footer {
// //           border-top: 1px dashed #90caf9;
// //           padding-top: 1rem;
// //         }

// //         .official-notes {
// //           margin-bottom: 1rem;
// //         }

// //         .official-notes p {
// //           font-size: 0.7rem;
// //           color: #546e7a;
// //           text-align: center;
// //           margin-bottom: 0.5rem;
// //           line-height: 1.3;
// //         }

// //         .signature-section {
// //           text-align: center;
// //         }

// //         .signature-area {
// //           display: inline-block;
// //           text-align: center;
// //         }

// //         .signature-line {
// //           width: 120px;
// //           height: 1px;
// //           background: #0d47a1;
// //           margin: 0 auto 0.25rem;
// //         }

// //         .signature-section small {
// //           font-size: 0.6rem;
// //           color: #0d47a1;
// //           font-weight: 500;
// //         }

// //         .action-buttons {
// //           display: flex;
// //           gap: 0.5rem;
// //         }

// //         .id-note {
// //           background: #e3f2fd;
// //           padding: 1rem;
// //           border-radius: 8px;
// //           border-left: 4px solid #0d47a1;
// //         }

// //         /* Print styles */
// //         @media print {
// //           .dashboard-container:not(.print-view) {
// //             display: none;
// //           }
          
// //           .dashboard-container.print-view {
// //             background: white;
// //             padding: 0;
// //           }
          
// //           .dashboard-container.print-view .welcome-card,
// //           .dashboard-container.print-view .card-header,
// //           .dashboard-container.print-view .action-buttons,
// //           .dashboard-container.print-view .id-note {
// //             display: none;
// //           }
          
// //           .id-card-wrapper {
// //             display: flex;
// //             gap: 1cm;
// //             justify-content: center;
// //           }
          
// //           .id-card {
// //             box-shadow: none;
// //             border: 1px solid #000;
// //             page-break-inside: avoid;
// //           }
// //         }

// //         @media (max-width: 768px) {
// //           .welcome-title {
// //             font-size: 1.8rem;
// //           }
          
// //           .welcome-overlay {
// //             padding: 1.5rem;
// //           }
          
// //           .id-card-wrapper {
// //             flex-direction: column;
// //             align-items: center;
// //           }
          
// //           .aadhaar-photo-section {
// //             flex-direction: column;
// //           }
          
// //           .action-buttons {
// //             flex-direction: column;
// //             margin-top: 1rem;
// //           }
          
// //           .aadhaar-validity {
// //             flex-direction: column;
// //             gap: 0.2rem;
// //           }
// //         }
// //       `}</style>
// //     </div>
// //   );
// // }

// import React, { useState, useRef } from "react";
// import { QRCodeCanvas } from "qrcode.react";
// import html2canvas from "html2canvas";
// import jsPDF from "jspdf";

// export default function Empidente() {
//   // Sample employee data
//   const employeeData = {
//     name: "Rajesh Kumar",
//     employeeId: "EMP-001",
//     department: "Healthcare Services",
//     position: "Senior Coordinator",
//     joinDate: "2022-05-15",
//     dob: "1990-08-22",
//     profilePic: "https://randomuser.me/api/portraits/men/1.jpg",
//     email: "rajesh@janarogya.com",
//     phone: "+91 9876543210",
//     center: {
//       name: "Jan Arogya Central Hospital",
//       address: "123 Health Street, Medical District",
//       city: "Mumbai",
//       code: "JACH-MUM-001"
//     },
//     bloodGroup: "B+",
//     emergencyContact: "+91 9123456789",
//     validUntil: "2025-12-31"
//   };

//   const [showPrintView, setShowPrintView] = useState(false);
//   const cardRef = useRef(null);

//   // ✅ Download ID Card as PDF with proper text
//   const handleDownload = async () => {
//     if (!cardRef.current) return;

//     try {
//       // Create canvas from the card
//       const canvas = await html2canvas(cardRef.current, { 
//         scale: 3, // Higher resolution
//         useCORS: true, // Allow cross-origin images
//         logging: false // Disable logging
//       });
      
//       const imgData = canvas.toDataURL("image/png", 1.0);
      
//       // Create PDF
//       const pdf = new jsPDF({
//         orientation: "landscape",
//         unit: "pt",
//         format: [595, 842] // A4 size
//       });
      
//       const width = pdf.internal.pageSize.getWidth();
//       const height = pdf.internal.pageSize.getHeight();
      
//       // Add the image
//       pdf.addImage(imgData, "PNG", 0, 0, width, height);
      
//       // Add text layers for searchable text (optional)
//       // This creates invisible text over the image for better OCR
//       pdf.setFontSize(10);
//       pdf.setTextColor(0, 0, 0, 0); // Transparent text (for OCR)
      
//       // Add employee name
//       pdf.text(employeeData.name, 200, 250);
      
//       // Add employee ID
//       pdf.text(employeeData.employeeId, 200, 280);
      
//       // Add other details as needed...
      
//       // Save the PDF
//       pdf.save(`${employeeData.name.replace(/\s+/g, '_')}_ID_Card.pdf`);
      
//     } catch (error) {
//       console.error("Error generating PDF:", error);
//       alert("Error generating PDF. Please try again.");
//     }
//   };

//   // ✅ Generate QR code data string with all details
//   const generateQRData = () => {
//     return `EMPLOYEE ID: ${employeeData.employeeId}
// NAME: ${employeeData.name}
// DEPARTMENT: ${employeeData.department}
// POSITION: ${employeeData.position}
// CENTER: ${employeeData.center.name}
// CENTER CODE: ${employeeData.center.code}
// EMAIL: ${employeeData.email}
// PHONE: ${employeeData.phone}
// JOIN DATE: ${employeeData.joinDate}
// VALID UNTIL: ${employeeData.validUntil}
// BLOOD GROUP: ${employeeData.bloodGroup}
// EMERGENCY CONTACT: ${employeeData.emergencyContact}`;
//   };

//   return (
//     <div className={`dashboard-container ${showPrintView ? "print-view" : ""}`}>
//       <div className="container-fluid py-4">
//         <div className="row">
//           <div className="col-12">
//             {/* Header */}
//             <div className="welcome-card mb-4">
//               <div className="welcome-overlay">
//                 <div className="row align-items-center">
//                   <div className="col-lg-8 col-md-7">
//                     <div className="welcome-content">
//                       <div className="greeting-badge">Employee Identity Card 👤</div>
//                       <h1 className="welcome-title">
//                         Official Healthcare Organization ID
//                       </h1>
//                       <p className="welcome-subtitle">
//                         Aadhaar-style identification card for Jan Arogya Healthcare Services
//                       </p>
//                     </div>
//                   </div>
//                   <div className="col-lg-4 col-md-5 text-center">
//                     <div className="profile-section">
//                       <div className="profile-image-container">
//                         <div className="service-icon-display">
//                           <span className="icon-emoji">🪪</span>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>

//             {/* ID Card Section */}
//             <div className="row">
//               <div className="col-12 col-lg-8 mb-4 mx-auto">
//                 <div className="card user-table-card h-100">
//                   <div className="card-header d-flex justify-content-between align-items-center">
//                     <h3 className="header-title mb-0">Employee ID Card</h3>
//                     <div className="action-buttons">
//                       <button className="btn btn-outline-secondary" onClick={handleDownload}>
//                         <i className="fas fa-download me-2"></i>Download PDF
//                       </button>
//                     </div>
//                   </div>
//                   <div className="card-body">
//                     <div className="id-card-container" ref={cardRef}>
//                       <div className="id-card-wrapper">
//                         {/* Front side of ID card */}
//                         <div className="id-card aadhaar-front">
//                           <div className="aadhaar-header">
//                             <div className="aadhaar-logo">
//                               <span className="icon-emoji">🏥</span>
//                               <div>
//                                 <h3>जन आरोग्य</h3>
//                                 <h4>Jan Arogya</h4>
//                               </div>
//                             </div>
//                             <div className="aadhaar-title">
//                               Healthcare Employee ID Card
//                             </div>
//                           </div>

//                           <div className="aadhaar-content">
//                             <div className="aadhaar-photo-section">
//                               <div className="aadhaar-photo">
//                                 <img
//                                   src={employeeData.profilePic}
//                                   alt={employeeData.name}
//                                   crossOrigin="anonymous" // Important for CORS
//                                 />
//                                 <div className="employee-status"></div>
//                               </div>
//                               {/* ✅ Real QR Code */}
//                               <div className="aadhaar-qr-code">
//                                 <QRCodeCanvas
//                                   value={generateQRData()}
//                                   size={100}
//                                   bgColor="#ffffff"
//                                   fgColor="#0d47a1"
//                                   level="H"
//                                   includeMargin={true}
//                                 />
//                                 <div className="qr-text">Scan Me</div>
//                                 <div className="employee-id-overlay">
//                                   {employeeData.employeeId}
//                                 </div>
//                               </div>
//                             </div>

//                             <div className="aadhaar-details">
//                               <div className="aadhaar-field">
//                                 <div className="aadhaar-label">Name/नाम</div>
//                                 <div className="aadhaar-value" data-pdf-text={employeeData.name}>
//                                   {employeeData.name}
//                                 </div>
//                               </div>

//                               <div className="aadhaar-field">
//                                 <div className="aadhaar-label">
//                                   Date of Birth/जन्म तिथि
//                                 </div>
//                                 <div className="aadhaar-value" data-pdf-text={new Date(employeeData.dob).toLocaleDateString("en-IN")}>
//                                   {new Date(employeeData.dob).toLocaleDateString("en-IN")}
//                                 </div>
//                               </div>

//                               <div className="aadhaar-field">
//                                 <div className="aadhaar-label">
//                                   Employee ID/कर्मचारी आईडी
//                                 </div>
//                                 <div className="aadhaar-value id-number" data-pdf-text={employeeData.employeeId}>
//                                   {employeeData.employeeId}
//                                 </div>
//                               </div>

//                               <div className="aadhaar-field">
//                                 <div className="aadhaar-label">Gender/लिंग</div>
//                                 <div className="aadhaar-value" data-pdf-text="Male/पुरुष">
//                                   Male/पुरुष
//                                 </div>
//                               </div>
//                             </div>
//                           </div>

//                           <div className="aadhaar-footer">
//                             <div className="aadhaar-validity">
//                               <span>
//                                 Issued On:{" "}
//                                 {new Date(employeeData.joinDate).toLocaleDateString("en-IN")}
//                               </span>
//                               <span>
//                                 Valid Until:{" "}
//                                 {new Date(employeeData.validUntil).toLocaleDateString("en-IN")}
//                               </span>
//                             </div>
//                           </div>
//                         </div>

//                         {/* Back side of ID card */}
//                         <div className="id-card aadhaar-back">
//                           <div className="aadhaar-back-header">
//                             <h3>Additional Details/अतिरिक्त विवरण</h3>
//                           </div>

//                           <div className="aadhaar-back-content">
//                             <div className="aadhaar-back-details">
//                               <div className="detail-row">
//                                 <div className="detail-label">
//                                   Department/विभाग:
//                                 </div>
//                                 <div className="detail-value" data-pdf-text={employeeData.department}>
//                                   {employeeData.department}
//                                 </div>
//                               </div>

//                               <div className="detail-row">
//                                 <div className="detail-label">Position/पद:</div>
//                                 <div className="detail-value" data-pdf-text={employeeData.position}>
//                                   {employeeData.position}
//                                 </div>
//                               </div>

//                               <div className="detail-row">
//                                 <div className="detail-label">Center/केंद्र:</div>
//                                 <div className="detail-value" data-pdf-text={employeeData.center.name}>
//                                   {employeeData.center.name}
//                                 </div>
//                               </div>

//                               <div className="detail-row">
//                                 <div className="detail-label">
//                                   Center Code/केंद्र कोड:
//                                 </div>
//                                 <div className="detail-value" data-pdf-text={employeeData.center.code}>
//                                   {employeeData.center.code}
//                                 </div>
//                               </div>

//                               <div className="detail-row">
//                                 <div className="detail-label">Address/पता:</div>
//                                 <div className="detail-value small" data-pdf-text={`${employeeData.center.address}, ${employeeData.center.city}`}>
//                                   {employeeData.center.address}, {employeeData.center.city}
//                                 </div>
//                               </div>

//                               <div className="detail-row">
//                                 <div className="detail-label">
//                                   Blood Group/रक्त समूह:
//                                 </div>
//                                 <div className="detail-value blood-group" data-pdf-text={employeeData.bloodGroup}>
//                                   {employeeData.bloodGroup}
//                                 </div>
//                               </div>

//                               <div className="detail-row">
//                                 <div className="detail-label">
//                                   Emergency Contact/आपातकालीन संपर्क:
//                                 </div>
//                                 <div className="detail-value" data-pdf-text={employeeData.emergencyContact}>
//                                   {employeeData.emergencyContact}
//                                 </div>
//                               </div>
//                             </div>

//                             <div className="aadhaar-back-footer">
//                               <div className="official-notes">
//                                 <p>
//                                   This card is the property of Jan Arogya
//                                   Healthcare Services. If found, please return to
//                                   the nearest center.
//                                 </p>
//                                 <p>
//                                   यह कार्ड जन आरोग्य हेल्थकेयर सर्विसेज की
//                                   संपत्ति है। यदि मिले, तो कृपया नजदीकी केंद्र
//                                   पर वापस लौटाएं।
//                                 </p>
//                               </div>
//                               <div className="signature-section">
//                                 <div className="signature-area">
//                                   <div className="signature-line"></div>
//                                   <small>
//                                     Authorized Signature/अधिकृत हस्ताक्षर
//                                   </small>
//                                 </div>
//                               </div>
//                             </div>
//                           </div>
//                         </div>
//                       </div>
//                     </div>
                   
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       <style jsx>{`
//         .dashboard-container {
//           background: linear-gradient(135deg, #f0f8ff 0%, #e6f2ff 100%);
//           min-height: 100vh;
//           padding: 0;
//         }

//         .welcome-card {
//           background: linear-gradient(135deg, #1e88e5 0%, #0d47a1 100%);
//           border-radius: 16px;
//           margin-bottom: 2rem;
//           overflow: hidden;
//           position: relative;
//           box-shadow: 0 10px 30px rgba(30, 136, 229, 0.3);
//         }

//         .welcome-overlay {
//           padding: 2rem;
//           position: relative;
//           z-index: 2;
//         }

//         .welcome-content {
//           color: white;
//         }

//         .greeting-badge {
//           display: inline-block;
//           background: rgba(255, 255, 255, 0.2);
//           padding: 0.5rem 1rem;
//           border-radius: 50px;
//           font-size: 0.9rem;
//           font-weight: 500;
//           margin-bottom: 1rem;
//           backdrop-filter: blur(10px);
//         }

//         .welcome-title {
//           font-size: 2.2rem;
//           font-weight: 700;
//           margin-bottom: 0.5rem;
//           color: white;
//         }

//         .welcome-subtitle {
//           font-size: 1.1rem;
//           opacity: 0.9;
//           margin-bottom: 0;
//           color: rgba(255, 255, 255, 0.9);
//         }

//         .service-icon-display {
//           width: 100px;
//           height: 100px;
//           border-radius: 50%;
//           background: rgba(255, 255, 255, 0.2);
//           display: flex;
//           align-items: center;
//           justify-content: center;
//           font-size: 3rem;
//           backdrop-filter: blur(10px);
//           border: 2px solid rgba(255, 255, 255, 0.3);
//         }

//         .user-table-card {
//           background: white;
//           border-radius: 16px;
//           box-shadow: 0 4px 20px rgba(13, 71, 161, 0.1);
//           border: none;
//           overflow: hidden;
//         }

//         .card-header {
//           background: linear-gradient(135deg, #bbdefb 0%, #90caf9 100%);
//           border-bottom: 1px solid #bbdefb;
//           padding: 1.5rem;
//         }

//         .header-title {
//           font-size: 1.5rem;
//           font-weight: 600;
//           color: #0d47a1;
//           margin: 0;
//         }

//         /* Aadhaar Card Styles */
//         .id-card-container {
//           display: flex;
//           justify-content: center;
//           padding: 1rem;
//         }

//         .id-card-wrapper {   
//           display: flex;
//           flex-wrap: wrap;
//           gap: 2rem;
//           justify-content: center;
//         }

//         .id-card {
//           width: 100%;
//           max-width: 400px;
//           border-radius: 12px;
//           overflow: hidden;
//         }

//         .aadhaar-front {
//           background: linear-gradient(135deg, #bbdefb 0%, #90caf9 100%);
//           box-shadow: 0 8px 25px rgba(30, 136, 229, 0.2);
//           border: 1px solid #90caf9;
//         }

//         .aadhaar-back {
//           background: linear-gradient(135deg, #e3f2fd 0%, #bbdefb 100%);
//           box-shadow: 0 8px 25px rgba(30, 136, 229, 0.2);
//           border: 1px solid #bbdefb;
//         }

//         .aadhaar-header {
//           background: linear-gradient(135deg, #1565c0 0%, #0d47a1 100%);
//           color: white;
//           padding: 0.8rem;
//           text-align: center;
//         }

//         .aadhaar-logo {
//           display: flex;
//           align-items: center;
//           justify-content: center;
//           gap: 0.5rem;
//           margin-bottom: 0.5rem;
//         }

//         .aadhaar-logo h3 {
//           margin: 0;
//           font-weight: 700;
//           font-size: 1.5rem;
//         }

//         .aadhaar-logo h4 {
//           margin: 0;
//           font-weight: 600;
//           font-size: 1rem;
//           opacity: 0.9;
//         }

//         .aadhaar-title {
//           font-size: 0.9rem;
//           font-weight: 500;
//           letter-spacing: 0.5px;
//         }

//         .aadhaar-content {
//           padding: 1.2rem;
//         }

//         .aadhaar-photo-section {
//           display: flex;
//           gap: 1rem;
//           margin-bottom: 1.2rem;
//         }

//         .aadhaar-photo {
//           flex: 1;
//           position: relative;
//         }

//         .aadhaar-photo img {
//           width: 100%;
//           height: 120px;
//           object-fit: cover;
//           border-radius: 6px;
//           border: 2px solid #e3f2fd;
//         }

//         .employee-status {
//           position: absolute;
//           bottom: 5px;
//           right: 5px;
//           width: 16px;
//           height: 16px;
//           background-color: #4caf50;
//           border: 2px solid white;
//           border-radius: 50%;
//         }

//         .aadhaar-qr-code {
//           flex: 1;
//           display: flex;
//           flex-direction: column;
//           align-items: center;
//           justify-content: center;
//           position: relative;
//         }

//         .qr-text {
//           font-size: 0.7rem;
//           margin-top: 5px;
//           color: #0d47a1;
//           font-weight: 500;
//         }

//         .employee-id-overlay {
//           position: absolute;
//           bottom: -10px;
//           background: rgba(13, 71, 161, 0.9);
//           color: white;
//           width: 100%;
//           text-align: center;
//           padding: 2px 0;
//           font-size: 0.7rem;
//           font-weight: bold;
//           border-radius: 4px;
//         }

//         .aadhaar-details {
//           display: flex;
//           flex-direction: column;
//           gap: 0.6rem;
//         }

//         .aadhaar-field {
//           display: flex;
//           flex-direction: column;
//           border-bottom: 1px dashed #90caf9;
//           padding: 0.2rem 0;
//         }

//         .aadhaar-label {
//           font-weight: 600;
//           color: #1565c0;
//           font-size: 0.7rem;
//           margin-bottom: 0.1rem;
//         }

//         .aadhaar-value {
//           font-weight: 500;
//           color: #0d47a1;
//           font-size: 0.9rem;
//         }

//         .id-number {
//           font-weight: 700;
//           font-size: 1.1rem;
//           letter-spacing: 1px;
//           color: #0d47a1;
//         }

//         .aadhaar-footer {
//           background: linear-gradient(135deg, #1565c0 0%, #0d47a1 100%);
//           padding: 0.8rem;
//           text-align: center;
//         }

//         .aadhaar-validity {
//           font-size: 0.7rem;
//           color: white;
//           display: flex;
//           justify-content: space-between;
//         }

//         /* Back side styles */
//         .aadhaar-back-header {
//           background: linear-gradient(135deg, #1565c0 0%, #0d47a1 100%);
//           color: white;
//           padding: 0.8rem;
//           text-align: center;
//         }

//         .aadhaar-back-header h3 {
//           margin: 0;
//           font-size: 1.1rem;
//           font-weight: 600;
//         }

//         .aadhaar-back-content {
//           padding: 1.2rem;
//         }

//         .aadhaar-back-details {
//           display: flex;
//           flex-direction: column;
//           gap: 0.6rem;
//           margin-bottom: 1.2rem;
//         }

//         .detail-row {
//           display: flex;
//           border-bottom: 1px dashed #90caf9;
//           padding-bottom: 0.5rem;
//         }

//         .detail-label {
//           flex: 1;
//           font-weight: 600;
//           color: #1565c0;
//           font-size: 0.75rem;
//         }

//         .detail-value {
//           flex: 2;
//           color: #0d47a1;
//           font-size: 0.8rem;
//         }

//         .detail-value.small {
//           font-size: 0.75rem;
//         }

//         .blood-group {
//           background: #ffebee;
//           color: #c62828;
//           padding: 0.1rem 0.5rem;
//           border-radius: 4px;
//           font-weight: 700;
//         }

//         .aadhaar-back-footer {
//           border-top: 1px dashed #90caf9;
//           padding-top: 1rem;
//         }

//         .official-notes {
//           margin-bottom: 1rem;
//         }

//         .official-notes p {
//           font-size: 0.7rem;
//           color: #546e7a;
//           text-align: center;
//           margin-bottom: 0.5rem;
//           line-height: 1.3;
//         }

//         .signature-section {
//           text-align: center;
//         }

//         .signature-area {
//           display: inline-block;
//           text-align: center;
//         }

//         .signature-line {
//           width: 120px;
//           height: 1px;
//           background: #0d47a1;
//           margin: 0 auto 0.25rem;
//         }

//         .signature-section small {
//           font-size: 0.6rem;
//           color: #0d47a1;
//           font-weight: 500;
//         }

//         .action-buttons {
//           display: flex;
//           gap: 0.5rem;
//         }

//         .id-note {
//           background: #e3f2fd;
//           padding: 1rem;
//           border-radius: 8px;
//           border-left: 4px solid #0d47a1;
//         }

//         /* Print styles */
//         @media print {
//           .dashboard-container:not(.print-view) {
//             display: none;
//           }
          
//           .dashboard-container.print-view {
//             background: white;
//             padding: 0;
//           }
          
//           .dashboard-container.print-view .welcome-card,
//           .dashboard-container.print-view .card-header,
//           .dashboard-container.print-view .action-buttons,
//           .dashboard-container.print-view .id-note {
//             display: none;
//           }
          
//           .id-card-wrapper {
//             display: flex;
//             gap: 1cm;
//             justify-content: center;
//           }
          
//           .id-card {
//             box-shadow: none;
//             border: 1px solid #000;
//             page-break-inside: avoid;
//           }
//         }

//         @media (max-width: 768px) {
//           .welcome-title {
//             font-size: 1.8rem;
//           }
          
//           .welcome-overlay {
//             padding: 1.5rem;
//           }
          
//           .id-card-wrapper {
//             flex-direction: column;
//             align-items: center;
//           }
          
//           .aadhaar-photo-section {
//             flex-direction: column;
//           }
          
//           .action-buttons {
//             flex-direction: column;
//             margin-top: 1rem;
//           }
          
//           .aadhaar-validity {
//             flex-direction: column;
//             gap: 0.2rem;
//           }
//         }
//       `}</style>
//     </div>
//   );
// }



import React, { useState, useRef, useEffect } from "react";
import { QRCodeCanvas } from "qrcode.react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
export default function Empidente() {
  const [employeeData, setEmployeeData] = useState(null);
  const [loading, setLoading] = useState(true);
  const cardRef = useRef(null);
  const navigate=useNavigate()
  // ✅ Fetch employee profile from backend API
const formatDate = (value) => {
  if (!value) return "N/A";

  // ensure it's a number
  const timestamp = typeof value === "string" ? Number(value) : value;
  const date = new Date(timestamp);

  if (isNaN(date.getTime())) return "N/A";

  return date.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};


 const getExpiryDate = (joinDate) => {
  if (!joinDate) return "N/A";

  // handle both string & number
  const timestamp = typeof joinDate === "string" ? Number(joinDate) : joinDate;
  const date = new Date(timestamp);

  if (isNaN(date.getTime())) return "N/A";

  // add 2 years
  date.setFullYear(date.getFullYear() + 2);

  // format nicely
  return date.toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
};
useEffect(() => {
  const fetchProfile = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(
        "https://ruwa-backend.onrender.com/api/employee/profile",
        {
          method: "GET",
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      const data = await res.json();

      if (res.ok) {
        setEmployeeData(data.profile);

        // ✅ check for missing fields
       if (!data.profile.profile_pic || !data.profile.DOB) {
  toast.error("🚨 Please complete your profile by adding DOB & Profile Picture!", {
    position: "top-center",
    autoClose: 2000,
    style: {
      background: "#f4ee36ff",
      color: "#fff",
      fontWeight: "bold",
      borderRadius: "15px",
      fontSize: "16px",
    },
  });

  // ⏳ wait a bit before redirecting
  setTimeout(() => {
    navigate("/employee-profile", { replace: true });
  }, 1500);
}
      } else {
        console.error("Error:", data.message);
      }
    } catch (err) {
      console.error("API error:", err);
    } finally {
      setLoading(false);
    }
  };

  fetchProfile();
}, [navigate]);



  // ✅ Download ID Card as PDF
  const handleDownload = async () => {
    if (!cardRef.current || !employeeData) return;
    try {
      const canvas = await html2canvas(cardRef.current, {
        scale: 3,
        useCORS: true,
        logging: false,
      });
      const imgData = canvas.toDataURL("image/png", 1.0);

      const pdf = new jsPDF({
        orientation: "landscape",
        unit: "pt",
        format: [595, 842], // A4
      });

      const width = pdf.internal.pageSize.getWidth();
      const height = pdf.internal.pageSize.getHeight();
      pdf.addImage(imgData, "PNG", 0, 0, width, height);

      // Hidden searchable text
      pdf.setFontSize(10);
      pdf.setTextColor(0, 0, 0, 0);
      pdf.text(employeeData.name || "", 200, 250);
      pdf.text(employeeData.employeeId || "", 200, 280);

      pdf.save(`${employeeData.name?.replace(/\s+/g, "_")}_ID_Card.pdf`);
    } catch (error) {
      console.error("Error generating PDF:", error);
      alert("Error generating PDF. Please try again.");
    }
  };

  // ✅ Generate QR Code Data
  const generateQRData = () => {
    if (!employeeData) return "";
    return `EMPLOYEE ID: ${employeeData.employeeId}
NAME: ${employeeData.name}
DEPARTMENT: ${employeeData.department}
POSITION: ${employeeData.position}
EMAIL: ${employeeData.email}
PHONE: ${employeeData.phone}
JOIN DATE: ${employeeData.joinDate}
VALID UNTIL: ${employeeData.validUntil || "N/A"}
BLOOD GROUP: ${employeeData.bloodGroup || "N/A"}
EMERGENCY CONTACT: ${employeeData.emergencyContact || "N/A"}
ADDRESS: ${employeeData.address || "N/A"}`;
  };

  if (loading) return <p>Loading Employee ID...</p>;
  if (!employeeData) return <p>Error loading employee data.</p>;

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
                        Employee Identity Card 👤
                      </div>
                      <h1 className="welcome-title">
                        Official Healthcare Organization ID
                      </h1>
                      <p className="welcome-subtitle">
                        Aadhaar-style identification card for Jan Arogya
                        Healthcare Services
                      </p>
                    </div>
                  </div>
                  <div className="col-lg-4 col-md-5 text-center">
                    <div className="profile-section">
                      <div className="profile-image-container">
                        <div className="service-icon-display">
                          <span className="icon-emoji">🪪</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* ID Card Section */}
            <div className="row">
              <div className="col-12 col-lg-8 mb-4 mx-auto">
                <div className="card user-table-card h-100">
                  <div className="card-header d-flex justify-content-between align-items-center">
                    <h3 className="header-title mb-0">Employee ID Card</h3>
                    <div className="action-buttons">
                      <button
                        className="btn btn-outline-secondary"
                        onClick={handleDownload}
                      >
                        <i className="fas fa-download me-2"></i>Download PDF
                      </button>
                    </div>
                  </div>
                  <div className="card-body">
                    <div className="id-card-container" ref={cardRef}>
                      <div className="id-card-wrapper">
                        {/* FRONT of ID */}
                        <div className="id-card aadhaar-front">
                          <div className="aadhaar-header">
                            <div className="aadhaar-logo">
                              <span className="icon-emoji">🏥</span>
                              <div>
                                <h3>जन आरोग्य</h3>
                                <h4>Jan Arogya</h4>
                              </div>
                            </div>
                            <div className="aadhaar-title">
                              Healthcare Employee ID Card
                            </div>
                          </div>

                          <div className="aadhaar-content">
                            <div className="aadhaar-photo-section">
                              <div className="aadhaar-photo">
                                <img
                                  src={employeeData.profile_pic}
                                  alt={employeeData.name}
                                  crossOrigin="anonymous"
                                />
                                <div className="employee-status"></div>
                              </div>
                              <div className="aadhaar-qr-code">
                                <QRCodeCanvas
                                  value={generateQRData()}
                                  size={100}
                                  bgColor="#ffffff"
                                  fgColor="#0d47a1"
                                  level="H"
                                  includeMargin={true}
                                />
                                <div className="qr-text">Scan Me</div>
                                <div className="employee-id-overlay">
                                  {employeeData.employeeId}
                                </div>
                              </div>
                            </div>

                            <div className="aadhaar-details">
                              <div className="aadhaar-field">
                                <div className="aadhaar-label">
                                  Name/नाम
                                </div>
                                <div className="aadhaar-value">
                                  {employeeData.name}
                                </div>
                              </div>

                              <div className="aadhaar-field">
                                <div className="aadhaar-label">
                                  Join Date/नियुक्ति
                                </div>
                                <div className="aadhaar-value">
                                  {formatDate(employeeData.joinDate)}
                                </div>
                              </div>

                              <div className="aadhaar-field">
                                <div className="aadhaar-label">
                                  Employee ID/कर्मचारी आईडी
                                </div>
                                <div className="aadhaar-value id-number">
                                  {employeeData.employeeId}
                                </div>
                              </div>

                              <div className="aadhaar-field">
                                <div className="aadhaar-label">
                                  Department/विभाग
                                </div>
                                <div className="aadhaar-value">
                                  {employeeData.department}
                                </div>
                              </div>
                            </div>
                          </div>

                          <div className="aadhaar-footer">
                            <div className="aadhaar-validity">
                              <span>
                                Issued On:{" "}
                              {formatDate(employeeData.joinDate)}
                              </span>
                              <span>
                                Valid Until:{" "}
                               {getExpiryDate(employeeData.joinDate)}
                              </span>
                            </div>
                          </div>
                        </div>

                        {/* BACK of ID */}
                        <div className="id-card aadhaar-back">
                          <div className="aadhaar-back-header">
                            <h3>Additional Details/अतिरिक्त विवरण</h3>
                          </div>

                          <div className="aadhaar-back-content">
                            <div className="aadhaar-back-details">
                              <div className="detail-row">
                                <div className="detail-label">
                                  Position/पद:
                                </div>
                                <div className="detail-value">
                                  {employeeData.position}
                                </div>
                              </div>

                              <div className="detail-row">
                                <div className="detail-label">Email:</div>
                                <div className="detail-value">
                                  {employeeData.email}
                                </div>
                              </div>

                              <div className="detail-row">
                                <div className="detail-label">Phone:</div>
                                <div className="detail-value">
                                  {employeeData.phone}
                                </div>
                              </div>

                              

                            

                              <div className="detail-row">
                                <div className="detail-label">Address:</div>
                                <div className="detail-value small">
                                  {employeeData.address || "N/A"}
                                </div>
                              </div>
                            </div>

                            <div className="aadhaar-back-footer">
                              <div className="official-notes">
                                <p>
                                  This card is the property of Jan Arogya
                                  Healthcare Services. If found, please return to
                                  the nearest center.
                                </p>
                                <p>
                                  यह कार्ड जन आरोग्य हेल्थकेयर सर्विसेज की
                                  संपत्ति है। यदि मिले, तो कृपया नजदीकी केंद्र
                                  पर वापस लौटाएं।
                                </p>
                              </div>
                              <div className="signature-section">
                                <div className="signature-area">
                                  <div className="signature-line"></div>
                                  <small>
                                    Authorized Signature/अधिकृत हस्ताक्षर
                                  </small>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        {/* END BACK */}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
<style jsx>{`
        .dashboard-container {
          background: linear-gradient(135deg, #f0f8ff 0%, #e6f2ff 100%);
          min-height: 100vh;
          padding: 0;
        }

        .welcome-card {
          background: linear-gradient(135deg, #1e88e5 0%, #0d47a1 100%);
          border-radius: 16px;
          margin-bottom: 2rem;
          overflow: hidden;
          position: relative;
          box-shadow: 0 10px 30px rgba(30, 136, 229, 0.3);
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
          color: white;
        }

        .welcome-subtitle {
          font-size: 1.1rem;
          opacity: 0.9;
          margin-bottom: 0;
          color: rgba(255, 255, 255, 0.9);
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

        .user-table-card {
          background: white;
          border-radius: 16px;
          box-shadow: 0 4px 20px rgba(13, 71, 161, 0.1);
          border: none;
          overflow: hidden;
        }

        .card-header {
          background: linear-gradient(135deg, #bbdefb 0%, #90caf9 100%);
          border-bottom: 1px solid #bbdefb;
          padding: 1.5rem;
        }

        .header-title {
          font-size: 1.5rem;
          font-weight: 600;
          color: #0d47a1;
          margin: 0;
        }

        /* Aadhaar Card Styles */
        .id-card-container {
          display: flex;
          justify-content: center;
          padding: 1rem;
        }

        .id-card-wrapper {   
          display: flex;
          flex-wrap: wrap;
          gap: 2rem;
          justify-content: center;
        }

        .id-card {
          width: 100%;
          max-width: 400px;
          border-radius: 12px;
          overflow: hidden;
        }

        .aadhaar-front {
          background: linear-gradient(135deg, #bbdefb 0%, #90caf9 100%);
          box-shadow: 0 8px 25px rgba(30, 136, 229, 0.2);
          border: 1px solid #90caf9;
        }

        .aadhaar-back {
          background: linear-gradient(135deg, #e3f2fd 0%, #bbdefb 100%);
          box-shadow: 0 8px 25px rgba(30, 136, 229, 0.2);
          border: 1px solid #bbdefb;
        }

        .aadhaar-header {
          background: linear-gradient(135deg, #1565c0 0%, #0d47a1 100%);
          color: white;
          padding: 0.8rem;
          text-align: center;
        }

        .aadhaar-logo {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          margin-bottom: 0.5rem;
        }

        .aadhaar-logo h3 {
          margin: 0;
          font-weight: 700;
          font-size: 1.5rem;
        }

        .aadhaar-logo h4 {
          margin: 0;
          font-weight: 600;
          font-size: 1rem;
          opacity: 0.9;
        }

        .aadhaar-title {
          font-size: 0.9rem;
          font-weight: 500;
          letter-spacing: 0.5px;
        }

        .aadhaar-content {
          padding: 1.2rem;
        }

        .aadhaar-photo-section {
          display: flex;
          gap: 1rem;
          margin-bottom: 1.2rem;
        }

        .aadhaar-photo {
          flex: 1;
          position: relative;
        }

        .aadhaar-photo img {
          width: 100%;
          height: 120px;
          object-fit: cover;
          border-radius: 6px;
          border: 2px solid #e3f2fd;
        }

        .employee-status {
          position: absolute;
          bottom: 5px;
          right: 5px;
          width: 16px;
          height: 16px;
          background-color: #4caf50;
          border: 2px solid white;
          border-radius: 50%;
        }

        .aadhaar-qr-code {
          flex: 1;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          position: relative;
        }

        .qr-text {
          font-size: 0.7rem;
          margin-top: 5px;
          color: #0d47a1;
          font-weight: 500;
        }

        .employee-id-overlay {
          position: absolute;
          bottom: -10px;
          background: rgba(13, 71, 161, 0.9);
          color: white;
          width: 100%;
          text-align: center;
          padding: 2px 0;
          font-size: 0.7rem;
          font-weight: bold;
          border-radius: 4px;
        }

        .aadhaar-details {
          display: flex;
          flex-direction: column;
          gap: 0.6rem;
        }

        .aadhaar-field {
          display: flex;
          flex-direction: column;
          border-bottom: 1px dashed #90caf9;
          padding: 0.2rem 0;
        }

        .aadhaar-label {
          font-weight: 600;
          color: #1565c0;
          font-size: 0.7rem;
          margin-bottom: 0.1rem;
        }

        .aadhaar-value {
          font-weight: 500;
          color: #0d47a1;
          font-size: 0.9rem;
        }

        .id-number {
          font-weight: 700;
          font-size: 1.1rem;
          letter-spacing: 1px;
          color: #0d47a1;
        }

        .aadhaar-footer {
          background: linear-gradient(135deg, #1565c0 0%, #0d47a1 100%);
          padding: 0.8rem;
          text-align: center;
        }

        .aadhaar-validity {
          font-size: 0.7rem;
          color: white;
          display: flex;
          justify-content: space-between;
        }

        /* Back side styles */
        .aadhaar-back-header {
          background: linear-gradient(135deg, #1565c0 0%, #0d47a1 100%);
          color: white;
          padding: 0.8rem;
          text-align: center;
        }

        .aadhaar-back-header h3 {
          margin: 0;
          font-size: 1.1rem;
          font-weight: 600;
        }

        .aadhaar-back-content {
          padding: 1.2rem;
        }

        .aadhaar-back-details {
          display: flex;
          flex-direction: column;
          gap: 0.6rem;
          margin-bottom: 1.2rem;
        }

        .detail-row {
          display: flex;
          border-bottom: 1px dashed #90caf9;
          padding-bottom: 0.5rem;
        }

        .detail-label {
          flex: 1;
          font-weight: 600;
          color: #1565c0;
          font-size: 0.75rem;
        }

        .detail-value {
          flex: 2;
          color: #0d47a1;
          font-size: 0.8rem;
        }

        .detail-value.small {
          font-size: 0.75rem;
        }

        .blood-group {
          background: #ffebee;
          color: #c62828;
          padding: 0.1rem 0.5rem;
          border-radius: 4px;
          font-weight: 700;
        }

        .aadhaar-back-footer {
          border-top: 1px dashed #90caf9;
          padding-top: 1rem;
        }

        .official-notes {
          margin-bottom: 1rem;
        }

        .official-notes p {
          font-size: 0.7rem;
          color: #546e7a;
          text-align: center;
          margin-bottom: 0.5rem;
          line-height: 1.3;
        }

        .signature-section {
          text-align: center;
        }

        .signature-area {
          display: inline-block;
          text-align: center;
        }

        .signature-line {
          width: 120px;
          height: 1px;
          background: #0d47a1;
          margin: 0 auto 0.25rem;
        }

        .signature-section small {
          font-size: 0.6rem;
          color: #0d47a1;
          font-weight: 500;
        }

        .action-buttons {
          display: flex;
          gap: 0.5rem;
        }

        .id-note {
          background: #e3f2fd;
          padding: 1rem;
          border-radius: 8px;
          border-left: 4px solid #0d47a1;
        }

        /* Print styles */
        @media print {
          .dashboard-container:not(.print-view) {
            display: none;
          }
          
          .dashboard-container.print-view {
            background: white;
            padding: 0;
          }
          
          .dashboard-container.print-view .welcome-card,
          .dashboard-container.print-view .card-header,
          .dashboard-container.print-view .action-buttons,
          .dashboard-container.print-view .id-note {
            display: none;
          }
          
          .id-card-wrapper {
            display: flex;
            gap: 1cm;
            justify-content: center;
          }
          
          .id-card {
            box-shadow: none;
            border: 1px solid #000;
            page-break-inside: avoid;
          }
        }

        @media (max-width: 768px) {
          .welcome-title {
            font-size: 1.8rem;
          }
          
          .welcome-overlay {
            padding: 1.5rem;
          }
          
          .id-card-wrapper {
            flex-direction: column;
            align-items: center;
          }
          
          .aadhaar-photo-section {
            flex-direction: column;
          }
          
          .action-buttons {
            flex-direction: column;
            margin-top: 1rem;
          }
          
          .aadhaar-validity {
            flex-direction: column;
            gap: 0.2rem;
          }
        }
      `}</style>
      {/* 🔽 keep your styles here (unchanged) */}
    </div>
  );
}
