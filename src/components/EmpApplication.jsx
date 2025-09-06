// import React, { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';
// import { useAuth } from '../components/AuthContext';

// export default function EmpApplication() {
//   const { user } = useAuth();
//   const [activeTab, setActiveTab] = useState('dashboard');
//   const [isOnline, setIsOnline] = useState(navigator.onLine);
//   const [language, setLanguage] = useState('english');

//   // Listen for online/offline status
//   useEffect(() => {
//     const handleOnline = () => setIsOnline(true);
//     const handleOffline = () => setIsOnline(false);

//     window.addEventListener('online', handleOnline);
//     window.addEventListener('offline', handleOffline);

//     return () => {
//       window.removeEventListener('online', handleOnline);
//       window.removeEventListener('offline', handleOffline);
//     };
//   }, []);

//   // Mock data - in a real app this would come from API calls
//   const patientData = [
//     { id: 1, name: 'Rajesh Kumar', age: 42, condition: 'Hypertension', bed: 'A-12', status: 'Stable' },
//     { id: 2, name: 'Sunita Devi', age: 28, condition: 'Pregnancy Care', bed: 'B-05', status: 'Monitoring' },
//     { id: 3, name: 'Vikram Singh', age: 65, condition: 'Diabetes', bed: 'C-08', status: 'Recovering' },
//   ];

//   const resourceData = {
//     beds: { total: 50, occupied: 42, available: 8 },
//     ambulances: { total: 3, available: 1 },
//     medicines: { stock: 'Adequate', critical: ['Insulin', 'Paracetamol'] }
//   };

//   const emergencyContacts = [
//     { name: 'Hospital Admin', number: '+91-9876543210' },
//     { name: 'Ambulance Dispatch', number: '108' },
//     { name: 'Emergency Ward', number: '+91-9876500000' },
//   ];

//   const getCurrentGreeting = () => {
//     const hour = new Date().getHours();
//     if (hour < 12) return language === 'hindi' ? 'शुभ प्रभात' : 'Good Morning';
//     if (hour < 17) return language === 'hindi' ? 'शुभ दोपहर' : 'Good Afternoon';
//     return language === 'hindi' ? 'शुभ संध्या' : 'Good Evening';
//   };

//   const toggleLanguage = () => {
//     setLanguage(language === 'english' ? 'hindi' : 'english');
//   };

//   return (
//     <>
//       <div className="hospital-dashboard">
//         {/* Offline Indicator */}
//         {!isOnline && (
//           <div className="offline-indicator">
//             <i className="fas fa-wifi-slash me-2"></i>
//             {language === 'hindi' ? 'ऑफलाइन मोड - सीमित कार्यक्षमता' : 'Offline Mode - Limited functionality'}
//           </div>
//         )}

//         <div className="container-fluid py-3">
//           <div className="row">
//             <div className="col-12">
//               {/* Header with Emergency Button */}
//               <div className="d-flex justify-content-between align-items-center mb-4">
//                 <div>
//                   <h2 className="mb-0">
//                     <i className="fas fa-hospital me-2 text-primary"></i>
//                     RUWA Hospital Dashboard
//                   </h2>
//                   <small className="text-muted">
//                     {language === 'hindi' ? 'ग्रामीण स्वास्थ्य सेवा प्रबंधन' : 'Rural Healthcare Management'}
//                   </small>
//                 </div>
//                 <div className="d-flex gap-2">
//                   <button className="btn btn-outline-secondary btn-sm" onClick={toggleLanguage}>
//                     {language === 'english' ? 'हिंदी' : 'English'}
//                   </button>
//                   <button className="btn btn-danger">
//                     <i className="fas fa-bell me-1"></i>
//                     {language === 'hindi' ? 'आपातकाल' : 'Emergency'}
//                   </button>
//                 </div>
//               </div>

//               {/* Navigation Tabs */}
//               <ul className="nav nav-tabs mb-4">
//                 {[
//                   { id: 'dashboard', label: language === 'hindi' ? 'डैशबोर्ड' : 'Dashboard', icon: 'tachometer-alt' },
//                   { id: 'patients', label: language === 'hindi' ? 'मरीज़' : 'Patients', icon: 'user-injured' },
//                   { id: 'resources', label: language === 'hindi' ? 'संसाधन' : 'Resources', icon: 'procedures' },
//                   { id: 'community', label: language === 'hindi' ? 'समुदाय' : 'Community', icon: 'users' },
//                   { id: 'telemedicine', label: language === 'hindi' ? 'टेलीमेडिसिन' : 'Telemedicine', icon: 'video' },
//                   { id: 'training', label: language === 'hindi' ? 'प्रशिक्षण' : 'Training', icon: 'graduation-cap' },
//                 ].map(tab => (
//                   <li className="nav-item" key={tab.id}>
//                     <button
//                       className={`nav-link ${activeTab === tab.id ? 'active' : ''}`}
//                       onClick={() => setActiveTab(tab.id)}
//                     >
//                       <i className={`fas fa-${tab.icon} me-1`}></i>
//                       {tab.label}
//                     </button>
//                   </li>
//                 ))}
//               </ul>

//               {/* Dashboard Content */}
//               {activeTab === 'dashboard' && (
//                 <div className="dashboard-content">
//                   {/* Welcome Card */}
//                   <div className="welcome-card mb-4">
//                     <div className="row">
//                       <div className="col-md-8">
//                         <h3>{getCurrentGreeting()}, {user?.name || 'Employee'}!</h3>
//                         <p className="text-muted">
//                           {language === 'hindi' 
//                             ? 'आज आपकी ड्यूटी शेड्यूल और असाइनमेंट' 
//                             : 'Your duty schedule and assignments for today'}
//                         </p>
//                         <div className="d-flex flex-wrap gap-3">
//                           <div className="badge bg-primary">
//                             <i className="fas fa-id-badge me-1"></i>
//                             ID: {user?.employeeId || 'N/A'}
//                           </div>
//                           <div className="badge bg-secondary">
//                             <i className="fas fa-user-tag me-1"></i>
//                             {user?.role || 'Employee'}
//                           </div>
//                           <div className="badge bg-info">
//                             <i className="fas fa-map-marker-alt me-1"></i>
//                             {language === 'hindi' ? 'ग्रामीण स्वास्थ्य केंद्र' : 'Rural Health Center'}
//                           </div>
//                         </div>
//                       </div>
//                       <div className="col-md-4 text-end">
//                         <div className="d-flex justify-content-end gap-3">
//                           <div className="text-center">
//                             <div className="fs-2 fw-bold">8</div>
//                             <small>{language === 'hindi' ? 'मरीज़' : 'Patients'}</small>
//                           </div>
//                           <div className="text-center">
//                             <div className="fs-2 fw-bold">12</div>
//                             <small>{language === 'hindi' ? 'काम' : 'Tasks'}</small>
//                           </div>
//                           <div className="text-center">
//                             <div className="fs-2 fw-bold">3</div>
//                             <small>{language === 'hindi' ? 'अलर्ट' : 'Alerts'}</small>
//                           </div>
//                         </div>
//                       </div>
//                     </div>
//                   </div>

//                   {/* Quick Stats */}
//                   <div className="row mb-4">
//                     <div className="col-md-3 mb-3">
//                       <div className="stats-card bg-primary text-white">
//                         <div className="stats-icon">
//                           <i className="fas fa-bed"></i>
//                         </div>
//                         <div className="stats-content">
//                           <h4>{resourceData.beds.available}/{resourceData.beds.total}</h4>
//                           <p>{language === 'hindi' ? 'बेड उपलब्ध' : 'Beds Available'}</p>
//                         </div>
//                       </div>
//                     </div>
//                     <div className="col-md-3 mb-3">
//                       <div className="stats-card bg-success text-white">
//                         <div className="stats-icon">
//                           <i className="fas fa-ambulance"></i>
//                         </div>
//                         <div className="stats-content">
//                           <h4>{resourceData.ambulances.available}/{resourceData.ambulances.total}</h4>
//                           <p>{language === 'hindi' ? 'एम्बुलेंस उपलब्ध' : 'Ambulances Available'}</p>
//                         </div>
//                       </div>
//                     </div>
//                     <div className="col-md-3 mb-3">
//                       <div className="stats-card bg-warning text-dark">
//                         <div className="stats-icon">
//                           <i className="fas fa-pills"></i>
//                         </div>
//                         <div className="stats-content">
//                           <h4>{resourceData.medicines.stock}</h4>
//                           <p>{language === 'hindi' ? 'दवा स्टॉक' : 'Medicine Stock'}</p>
//                         </div>
//                       </div>
//                     </div>
//                     <div className="col-md-3 mb-3">
//                       <div className="stats-card bg-info text-white">
//                         <div className="stats-icon">
//                           <i className="fas fa-users"></i>
//                         </div>
//                         <div className="stats-content">
//                           <h4>5/7</h4>
//                           <p>{language === 'hindi' ? 'कर्मचारी उपस्थित' : 'Staff Present'}</p>
//                         </div>
//                       </div>
//                     </div>
//                   </div>

//                   {/* Emergency Contacts */}
//                   <div className="card mb-4">
//                     <div className="card-header bg-danger text-white">
//                       <i className="fas fa-phone-alt me-2"></i>
//                       {language === 'hindi' ? 'आपातकालीन संपर्क' : 'Emergency Contacts'}
//                     </div>
//                     <div className="card-body">
//                       <div className="row">
//                         {emergencyContacts.map((contact, index) => (
//                           <div className="col-md-4 mb-2" key={index}>
//                             <div className="d-flex align-items-center">
//                               <div className="bg-light rounded-circle p-3 me-3">
//                                 <i className="fas fa-phone text-danger"></i>
//                               </div>
//                               <div>
//                                 <h6 className="mb-0">{contact.name}</h6>
//                                 <small className="text-muted">{contact.number}</small>
//                               </div>
//                             </div>
//                           </div>
//                         ))}
//                       </div>
//                     </div>
//                   </div>

//                   {/* Recent Activities */}
//                   <div className="row">
//                     <div className="col-md-6 mb-4">
//                       <div className="card h-100">
//                         <div className="card-header">
//                           <i className="fas fa-tasks me-2"></i>
//                           {language === 'hindi' ? 'आज के कार्य' : 'Today\'s Tasks'}
//                         </div>
//                         <div className="card-body">
//                           <ul className="list-group list-group-flush">
//                             <li className="list-group-item d-flex justify-content-between align-items-center">
//                               <div>
//                                 <i className="fas fa-user-injured text-primary me-2"></i>
//                                 {language === 'hindi' ? 'रजेश कुमार का इलाज' : 'Treat Rajesh Kumar'}
//                               </div>
//                               <span className="badge bg-warning text-dark">
//                                 {language === 'hindi' ? 'लंबित' : 'Pending'}
//                               </span>
//                             </li>
//                             <li className="list-group-item d-flex justify-content-between align-items-center">
//                               <div>
//                                 <i className="fas fa-file-medical text-success me-2"></i>
//                                 {language === 'hindi' ? 'मरीज रिपोर्ट अपडेट करें' : 'Update Patient Reports'}
//                               </div>
//                               <span className="badge bg-warning text-dark">
//                                 {language === 'hindi' ? 'लंबित' : 'Pending'}
//                               </span>
//                             </li>
//                             <li className="list-group-item d-flex justify-content-between align-items-center">
//                               <div>
//                                 <i className="fas fa-syringe text-info me-2"></i>
//                                 {language === 'hindi' ? 'टीकाकरण कैंप' : 'Vaccination Camp'}
//                               </div>
//                               <span className="badge bg-success">
//                                 {language === 'hindi' ? 'पूर्ण' : 'Completed'}
//                               </span>
//                             </li>
//                           </ul>
//                         </div>
//                       </div>
//                     </div>

//                     <div className="col-md-6 mb-4">
//                       <div className="card h-100">
//                         <div className="card-header">
//                           <i className="fas fa-bell me-2"></i>
//                           {language === 'hindi' ? 'सूचनाएं' : 'Notifications'}
//                         </div>
//                         <div className="card-body">
//                           <div className="alert alert-warning">
//                             <i className="fas fa-exclamation-triangle me-2"></i>
//                             {language === 'hindi' 
//                               ? 'इंसुलिन का स्टॉक कम है' 
//                               : 'Low stock of Insulin'}
//                           </div>
//                           <div className="alert alert-info">
//                             <i className="fas fa-info-circle me-2"></i>
//                             {language === 'hindi' 
//                               ? 'कल गाँव में स्वास्थ्य शिविर' 
//                               : 'Health camp in village tomorrow'}
//                           </div>
//                           <div className="alert alert-success">
//                             <i className="fas fa-check-circle me-2"></i>
//                             {language === 'hindi' 
//                               ? 'नई एम्बुलेंस सेवा उपलब्ध' 
//                               : 'New ambulance service available'}
//                           </div>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               )}

//               {/* Patients Tab */}
//               {activeTab === 'patients' && (
//                 <div className="patients-content">
//                   <div className="card mb-4">
//                     <div className="card-header d-flex justify-content-between align-items-center">
//                       <span>
//                         <i className="fas fa-user-injured me-2"></i>
//                         {language === 'hindi' ? 'मरीजों की सूची' : 'Patient List'}
//                       </span>
//                       <button className="btn btn-primary btn-sm">
//                         <i className="fas fa-plus me-1"></i>
//                         {language === 'hindi' ? 'नया मरीज' : 'New Patient'}
//                       </button>
//                     </div>
//                     <div className="card-body">
//                       <div className="table-responsive">
//                         <table className="table table-hover">
//                           <thead>
//                             <tr>
//                               <th>{language === 'hindi' ? 'आईडी' : 'ID'}</th>
//                               <th>{language === 'hindi' ? 'नाम' : 'Name'}</th>
//                               <th>{language === 'hindi' ? 'उम्र' : 'Age'}</th>
//                               <th>{language === 'hindi' ? 'स्थिति' : 'Condition'}</th>
//                               <th>{language === 'hindi' ? 'बेड' : 'Bed'}</th>
//                               <th>{language === 'hindi' ? 'स्थिति' : 'Status'}</th>
//                               <th>{language === 'hindi' ? 'कार्य' : 'Actions'}</th>
//                             </tr>
//                           </thead>
//                           <tbody>
//                             {patientData.map(patient => (
//                               <tr key={patient.id}>
//                                 <td>{patient.id}</td>
//                                 <td>{patient.name}</td>
//                                 <td>{patient.age}</td>
//                                 <td>{patient.condition}</td>
//                                 <td>{patient.bed}</td>
//                                 <td>
//                                   <span className={`badge ${
//                                     patient.status === 'Stable' ? 'bg-success' : 
//                                     patient.status === 'Monitoring' ? 'bg-warning' : 'bg-info'
//                                   }`}>
//                                     {patient.status}
//                                   </span>
//                                 </td>
//                                 <td>
//                                   <button className="btn btn-sm btn-outline-primary me-1">
//                                     <i className="fas fa-eye"></i>
//                                   </button>
//                                   <button className="btn btn-sm btn-outline-success">
//                                     <i className="fas fa-edit"></i>
//                                   </button>
//                                 </td>
//                               </tr>
//                             ))}
//                           </tbody>
//                         </table>
//                       </div>
//                     </div>
//                   </div>

//                   <div className="row">
//                     <div className="col-md-6 mb-4">
//                       <div className="card">
//                         <div className="card-header">
//                           <i className="fas fa-prescription me-2"></i>
//                           {language === 'hindi' ? 'दवा प्रिस्क्रिप्शन' : 'Medicine Prescription'}
//                         </div>
//                         <div className="card-body">
//                           <form>
//                             <div className="mb-3">
//                               <label className="form-label">
//                                 {language === 'hindi' ? 'मरीज का नाम' : 'Patient Name'}
//                               </label>
//                               <select className="form-select">
//                                 <option>{language === 'hindi' ? 'चुनें' : 'Select'}</option>
//                                 {patientData.map(patient => (
//                                   <option key={patient.id}>{patient.name}</option>
//                                 ))}
//                               </select>
//                             </div>
//                             <div className="mb-3">
//                               <label className="form-label">
//                                 {language === 'hindi' ? 'दवाएं' : 'Medicines'}
//                               </label>
//                               <textarea className="form-control" rows="3"></textarea>
//                             </div>
//                             <button type="submit" className="btn btn-primary">
//                               {language === 'hindi' ? 'प्रिस्क्रिप्शन जमा करें' : 'Submit Prescription'}
//                             </button>
//                           </form>
//                         </div>
//                       </div>
//                     </div>

//                     <div className="col-md-6 mb-4">
//                       <div className="card">
//                         <div className="card-header">
//                           <i className="fas fa-notes-medical me-2"></i>
//                           {language === 'hindi' ? 'मेडिकल रिकॉर्ड' : 'Medical Records'}
//                         </div>
//                         <div className="card-body">
//                           <div className="d-grid gap-2">
//                             <button className="btn btn-outline-primary text-start">
//                               <i className="fas fa-file-medical me-2"></i>
//                               {language === 'hindi' ? 'रजेश कुमार - मेडिकल हिस्ट्री' : 'Rajesh Kumar - Medical History'}
//                             </button>
//                             <button className="btn btn-outline-primary text-start">
//                               <i className="fas fa-file-medical me-2"></i>
//                               {language === 'hindi' ? 'सुनीता देवी - प्रसव पूर्व देखभाल' : 'Sunita Devi - Prenatal Care'}
//                             </button>
//                             <button className="btn btn-outline-primary text-start">
//                               <i className="fas fa-file-medical me-2"></i>
//                               {language === 'hindi' ? 'विक्रम सिंह - मधुमेह प्रबंधन' : 'Vikram Singh - Diabetes Management'}
//                             </button>
//                           </div>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               )}

//               {/* Resources Tab */}
//               {activeTab === 'resources' && (
//                 <div className="resources-content">
//                   <div className="row">
//                     <div className="col-md-6 mb-4">
//                       <div className="card h-100">
//                         <div className="card-header">
//                           <i className="fas fa-bed me-2"></i>
//                           {language === 'hindi' ? 'बेड उपलब्धता' : 'Bed Availability'}
//                         </div>
//                         <div className="card-body">
//                           <div className="progress mb-3" style={{height: '30px'}}>
//                             <div 
//                               className="progress-bar" 
//                               role="progressbar" 
//                               style={{width: `${(resourceData.beds.occupied/resourceData.beds.total)*100}%`}}
//                             >
//                               {resourceData.beds.occupied} {language === 'hindi' ? 'कब्जे वाले' : 'Occupied'}
//                             </div>
//                             <div 
//                               className="progress-bar bg-success" 
//                               role="progressbar" 
//                               style={{width: `${(resourceData.beds.available/resourceData.beds.total)*100}%`}}
//                             >
//                               {resourceData.beds.available} {language === 'hindi' ? 'उपलब्ध' : 'Available'}
//                             </div>
//                           </div>
//                           <div className="text-center">
//                             <h4>{resourceData.beds.available} / {resourceData.beds.total}</h4>
//                             <p className="text-muted">{language === 'hindi' ? 'बेड उपलब्ध' : 'Beds Available'}</p>
//                           </div>
//                         </div>
//                       </div>
//                     </div>

//                     <div className="col-md-6 mb-4">
//                       <div className="card h-100">
//                         <div className="card-header">
//                           <i className="fas fa-ambulance me-2"></i>
//                           {language === 'hindi' ? 'एम्बुलेंस Status' : 'Ambulance Status'}
//                         </div>
//                         <div className="card-body">
//                           <div className="d-flex justify-content-around text-center">
//                             <div>
//                               <div className="fs-1 text-success">{resourceData.ambulances.available}</div>
//                               <div>{language === 'hindi' ? 'उपलब्ध' : 'Available'}</div>
//                             </div>
//                             <div>
//                               <div className="fs-1 text-warning">{resourceData.ambulances.total - resourceData.ambulances.available}</div>
//                               <div>{language === 'hindi' ? 'उपयोग में' : 'In Use'}</div>
//                             </div>
//                           </div>
//                           <div className="mt-4">
//                             <button className="btn btn-primary w-100">
//                               <i className="fas fa-plus me-1"></i>
//                               {language === 'hindi' ? 'एम्बुलेंस अनुरोध' : 'Request Ambulance'}
//                             </button>
//                           </div>
//                         </div>
//                       </div>
//                     </div>

//                     <div className="col-md-6 mb-4">
//                       <div className="card h-100">
//                         <div className="card-header">
//                           <i className="fas fa-pills me-2"></i>
//                           {language === 'hindi' ? 'दवा स्टॉक' : 'Medicine Stock'}
//                         </div>
//                         <div className="card-body">
//                           <h5 className="card-title">
//                             {resourceData.medicines.stock === 'Adequate' 
//                               ? (language === 'hindi' ? 'पर्याप्त स्टॉक' : 'Adequate Stock')
//                               : (language === 'hindi' ? 'कम स्टॉक' : 'Low Stock')}
//                           </h5>
//                           {resourceData.medicines.critical.length > 0 && (
//                             <>
//                               <p className="text-danger">
//                                 <i className="fas fa-exclamation-triangle me-1"></i>
//                                 {language === 'hindi' ? 'निम्नलिखित दवाओं का स्टॉक कम है:' : 'Low stock of critical medicines:'}
//                               </p>
//                               <ul>
//                                 {resourceData.medicines.critical.map((medicine, index) => (
//                                   <li key={index}>{medicine}</li>
//                                 ))}
//                               </ul>
//                             </>
//                           )}
//                           <button className="btn btn-outline-primary mt-3">
//                             <i className="fas fa-clipboard-list me-1"></i>
//                             {language === 'hindi' ? 'पूर्ण स्टॉक देखें' : 'View Full Stock'}
//                           </button>
//                         </div>
//                       </div>
//                     </div>

//                     <div className="col-md-6 mb-4">
//                       <div className="card h-100">
//                         <div className="card-header">
//                           <i className="fas fa-tools me-2"></i>
//                           {language === 'hindi' ? 'उपकरण अनुरोध' : 'Equipment Request'}
//                         </div>
//                         <div className="card-body">
//                           <form>
//                             <div className="mb-3">
//                               <label className="form-label">
//                                 {language === 'hindi' ? 'उपकरण प्रकार' : 'Equipment Type'}
//                               </label>
//                               <select className="form-select">
//                                 <option>{language === 'hindi' ? 'चुनें' : 'Select'}</option>
//                                 <option>{language === 'hindi' ? 'ऑक्सीजन सिलिंडर' : 'Oxygen Cylinder'}</option>
//                                 <option>{language === 'hindi' ? 'दवा की मेज' : 'Medicine Trolley'}</option>
//                                 <option>{language === 'hindi' ? 'इंजेक्शन' : 'Injections'}</option>
//                                 <option>{language === 'hindi' ? 'सर्जिकल उपकरण' : 'Surgical Equipment'}</option>
//                               </select>
//                             </div>
//                             <div className="mb-3">
//                               <label className="form-label">
//                                 {language === 'hindi' ? 'मात्रा' : 'Quantity'}
//                               </label>
//                               <input type="number" className="form-control" />
//                             </div>
//                             <div className="mb-3">
//                               <label className="form-label">
//                                 {language === 'hindi' ? 'तात्कालिकता' : 'Urgency'}
//                               </label>
//                               <select className="form-select">
//                                 <option>{language === 'hindi' ? 'सामान्य' : 'Normal'}</option>
//                                 <option>{language === 'hindi' ? 'जरूरी' : 'Urgent'}</option>
//                                 <option>{language === 'hindi' ? 'अत्यावश्यक' : 'Critical'}</option>
//                               </select>
//                             </div>
//                             <button type="submit" className="btn btn-primary">
//                               {language === 'hindi' ? 'अनुरोध जमा करें' : 'Submit Request'}
//                             </button>
//                           </form>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               )}

//               {/* Other tabs would be implemented similarly */}
//               {activeTab === 'community' && (
//                 <div className="community-content">
//                   <div className="alert alert-info">
//                     <i className="fas fa-info-circle me-2"></i>
//                     {language === 'hindi' 
//                       ? 'समुदाय टैब सामग्री विकास के अधीन है' 
//                       : 'Community tab content under development'}
//                   </div>
//                 </div>
//               )}

//               {activeTab === 'telemedicine' && (
//                 <div className="telemedicine-content">
//                   <div className="alert alert-info">
//                     <i className="fas fa-info-circle me-2"></i>
//                     {language === 'hindi' 
//                       ? 'टेलीमेडिसिन टैब सामग्री विकास के अधीन है' 
//                       : 'Telemedicine tab content under development'}
//                   </div>
//                 </div>
//               )}

//               {activeTab === 'training' && (
//                 <div className="training-content">
//                   <div className="alert alert-info">
//                     <i className="fas fa-info-circle me-2"></i>
//                     {language === 'hindi' 
//                       ? 'प्रशिक्षण टैब सामग्री विकास के अधीन है' 
//                       : 'Training tab content under development'}
//                   </div>
//                 </div>
//               )}
//             </div>
//           </div>
//         </div>
//       </div>

//       <style jsx>{`
//         .hospital-dashboard {
//           background: #f8f9fa;
//           min-height: 100vh;
//         }
        
//         .offline-indicator {
//           background: #ffc107;
//           color: #000;
//           text-align: center;
//           padding: 8px;
//           font-weight: 500;
//         }
        
//         .welcome-card {
//           background: white;
//           border-radius: 10px;
//           padding: 20px;
//           box-shadow: 0 2px 10px rgba(0,0,0,0.05);
//         }
        
//         .stats-card {
//           border-radius: 10px;
//           padding: 20px;
//           display: flex;
//           align-items: center;
//           height: 100%;
//           box-shadow: 0 2px 10px rgba(0,0,0,0.05);
//         }
        
//         .stats-icon {
//           font-size: 2rem;
//           margin-right: 15px;
//         }
        
//         .stats-content h4 {
//           margin: 0;
//           font-weight: 700;
//         }
        
//         .stats-content p {
//           margin: 0;
//           opacity: 0.9;
//         }
        
//         .nav-tabs .nav-link {
//           border: none;
//           border-bottom: 3px solid transparent;
//           color: #6c757d;
//           font-weight: 500;
//           padding: 10px 15px;
//         }
        
//         .nav-tabs .nav-link.active {
//           color: #2c6bac;
//           border-bottom-color: #2c6bac;
//           background: transparent;
//         }
        
//         .nav-tabs .nav-link:hover {
//           border-bottom-color: #dee2e6;
//         }
        
//         .card {
//           border: none;
//           border-radius: 10px;
//           box-shadow: 0 2px 10px rgba(0,0,0,0.05);
//         }
        
//         .card-header {
//           background: white;
//           border-bottom: 1px solid #eee;
//           font-weight: 600;
//         }
        
//         .table th {
//           border-top: none;
//           font-weight: 600;
//           color: #6c757d;
//         }
        
//         .progress {
//           border-radius: 5px;
//         }
        
//         @media (max-width: 768px) {
//           .nav-tabs .nav-link {
//             font-size: 0.8rem;
//             padding: 8px 10px;
//           }
          
//           .stats-card {
//             flex-direction: column;
//             text-align: center;
//           }
          
//           .stats-icon {
//             margin-right: 0;
//             margin-bottom: 10px;
//           }
//         }
//       `}</style>
//     </>
//   );
// }

import React, { useState, useEffect } from 'react';
import { useAuth } from '../components/AuthContext';

export default function ApplicationPortal() {
  const { user } = useAuth();
 const [activeTab, setActiveTab] = useState("allUsers");

  const [selectedService, setSelectedService] = useState(null);
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(false);
  const [services, setServices] = useState([]);
  const [filteredApplications, setFilteredApplications] = useState([]);

  // Services data
  useEffect(() => {
    // Mock services data
    const mockServices = [
      {
        id: 1,
        title: "Jan Swabhiman Seva",
        description: "Apply for various government welfare schemes and services",
        icon: "👨‍💼",
        gradient: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
      },
      {
        id: 2,
        title: "Jan Arogya Card",
        description: "Apply for health insurance card providing cashless treatment",
        icon: "🏥",
        gradient: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)"
      },
      {
        id: 3,
        title: "Health Insurance",
        description: "Enroll in comprehensive health insurance plans",
        icon: "🩺",
        gradient: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)"
      },
      {
        id: 4,
        title: "Emergency Ambulance",
        description: "Request emergency ambulance services",
        icon: "🚑",
        gradient: "linear-gradient(135deg, #fa709a 0%, #fee140 100%)"
      },
      {
        id: 5,
        title: "Jan Arogya Kendra",
        description: "Find and connect with health and wellness centers",
        icon: "🏥",
        gradient: "linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)"
      }
    ];
    setServices(mockServices);
  }, []);

  // Fetch application history from API when tab changes
 useEffect(() => {
  if (activeTab === "allUsers") {
    fetchAllUsers();
  } else if (activeTab !== "allUsers") {
    fetchApplicationHistory();
  }
}, [activeTab]);

const fetchAllUsers = async () => {
  setLoading(true);
  setApplications([]); // 👈 reset to avoid stale data
  try {
    const response = await fetch("https://ruwa-backend.onrender.com/api/employee/get/patient", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });

    const data = await response.json();

    if (data.success) {
      setApplications(
        data.users.map((user, index) => ({
          id: index + 1,
          serviceType: "Check Up", // or Patient
          name: user.name,
          email: user.email,
          phone: user.phone,
          status: user.status || "N/A",
          dateApplied: user.createdAt
            ? new Date(user.createdAt).toLocaleDateString()
            : "N/A",
        }))
      );
    }
  } catch (err) {
    console.error("Error fetching all users:", err);
  }
  setLoading(false);
};


  // Filter applications based on active tab
 useEffect(() => {
  if (applications.length > 0) {
    if (activeTab === 'history') {
      setFilteredApplications(applications);
    } else {
      const serviceName = getServiceNameFromTab(activeTab);
      setFilteredApplications(
        applications.filter(app => app.serviceType === serviceName)
      );
    }
  }
}, [applications, activeTab]);


  const getServiceNameFromTab = (tab) => {
    switch(tab) {
      case 'swabhiman': return 'Jan Swabhiman Seva';
      case 'arogyaCard': return 'Jan Arogya Card';
      case 'insurance': return 'Health Insurance';
      case 'ambulance': return 'Emergency Ambulance';
      case 'kendra': return 'Jan Arogya Kendra';
      default: return '';
    }
  };
const handleUpdate = (id) => {
  console.log("Update user with id:", id);
  // navigate to update form or open modal
};

const handleDelete = (id) => {
  console.log("Delete user with id:", id);
  // call API to delete
};

  const fetchApplicationHistory = async () => {
  setLoading(true);
  setApplications([]); // 👈 reset to avoid showing stale data
  try {
    let serviceParam = "";

    switch (activeTab) {
      case "ambulance":
        serviceParam = "ambulance";
        break;
      case "insurance":
        serviceParam = "insurance";
        break;
      case "arogyaCard":
        serviceParam = "janArogyaApplication";
        break;
      case "kendra":
        serviceParam = "janArogyaApply";
        break;
      case "swabhiman":
        serviceParam = "swabhiman";
        break;
      default:
        serviceParam = "";
    }

    const url = serviceParam
      ? `https://ruwa-backend.onrender.com/api/employee/service-users?service=${serviceParam}`
      : `https://ruwa-backend.onrender.com/api/employee/service-users`;

    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });

    const data = await response.json();

    if (data.success) {
      setApplications(
        data.appliedUsers.map((app, index) => ({
          id: index + 1,
          serviceType: data.service || app.serviceType,
          name: app.name || "No name",
          email: app.email || "No email",
          phone: app.phone || "No phone",
          dateApplied: app.createdAt
            ? new Date(app.createdAt).toLocaleDateString()
            : "N/A",
          status: app.status || "PENDING",
        }))
      );
    }
  } catch (error) {
    console.error("Error fetching application history:", error);
  }
  setLoading(false);
};



  const handleServiceSelect = (service) => {
    setSelectedService(service);
  };
 console.log(applications)
  const handleBackToServices = () => {
    setSelectedService(null);
  };
 
  const renderServiceForm = () => {
    if (!selectedService) return null;
    
    return (
      <div className="service-detail-page">
        <div className="page-header">
          <button className="back-button" onClick={handleBackToServices}>
            <i className="fas fa-arrow-left"></i> Back to Services
          </button>
          <h2>{selectedService.title} Application</h2>
        </div>
        
        <div className="service-content">
          <div className="service-icon-large">
            <span className="icon-emoji">{selectedService.icon}</span>
          </div>
          
          <div className="service-form">
            <h3>User Information</h3>
            
            <div className="row">
              <div className="col-md-6">
                <div className="form-group">
                  <label htmlFor="fullName">Full Name</label>
                  <input 
                    type="text" 
                    id="fullName" 
                    placeholder="Enter user's full name"
                  />
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group">
                  <label htmlFor="aadhaar">Aadhaar Number</label>
                  <input 
                    type="text" 
                    id="aadhaar" 
                    placeholder="Enter 12-digit Aadhaar number"
                  />
                </div>
              </div>
            </div>
            
            <div className="row">
              <div className="col-md-6">
                <div className="form-group">
                  <label htmlFor="phone">Phone Number</label>
                  <input 
                    type="tel" 
                    id="phone" 
                    placeholder="Enter phone number"
                  />
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group">
                  <label htmlFor="email">Email Address</label>
                  <input 
                    type="email" 
                    id="email" 
                    placeholder="Enter email address"
                  />
                </div>
              </div>
            </div>
            
            <h3>Application Details</h3>
            
            <div className="form-group">
              <label htmlFor="details">Additional Information</label>
              <textarea 
                id="details" 
                placeholder="Provide any additional information required for this service"
              ></textarea>
            </div>
            
            <div className="form-actions">
              <button className="btn-secondary" onClick={handleBackToServices}>
                Cancel
              </button>
              <button className="btn-primary">
                Submit Application
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };
 console.log(filteredApplications)
  const renderStatusBadge = (status) => {
    const statusClass = `status-${status.toLowerCase()}`;
    return (
      <span className={`status-badge ${statusClass}`}>
        {status}
      </span>
    );
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
                        Application Portal 👋
                      </div>
                      <h1 className="welcome-title">
                        {selectedService ? selectedService.title : "Employee Services"}
                      </h1>
                      <p className="welcome-subtitle">
                        {selectedService 
                          ? "Complete the application form for the user" 
                          : "Select a service to assist users with healthcare & welfare services"}
                      </p>
                    </div>
                  </div>
                  <div className="col-lg-4 col-md-5 text-center">
                    <div className="profile-section">
                      <div className="profile-image-container">
                        <div className="service-icon-display">
                          <span className="icon-emoji">
                            {selectedService ? selectedService.icon : "👨‍💼"}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Tabs */}
            {!selectedService && (
              <div className="portal-tabs mb-4">
                <button 
                  className={activeTab === 'allUsers' ? 'tab-active' : ''}
                  onClick={() => setActiveTab('allUsers')}
                >
                  <i className="fas fa-concierge-bell"></i> All Users
                </button>
                <button 
                  className={activeTab === 'swabhiman' ? 'tab-active' : ''}
                  onClick={() => setActiveTab('swabhiman')}
                >
                  <i className="fas fa-history"></i> Jan Swabhiman Seva History
                </button>
                <button 
                  className={activeTab === 'arogyaCard' ? 'tab-active' : ''}
                  onClick={() => setActiveTab('arogyaCard')}
                >
                  <i className="fas fa-history"></i> Jan Arogya Card
                </button>
                <button 
                  className={activeTab === 'insurance' ? 'tab-active' : ''}
                  onClick={() => setActiveTab('insurance')}
                >
                  <i className="fas fa-history"></i> Health Insurance
                </button>
                <button 
                  className={activeTab === 'ambulance' ? 'tab-active' : ''}
                  onClick={() => setActiveTab('ambulance')}
                >
                  <i className="fas fa-history"></i> Emergency Ambulance
                </button>
                <button 
                  className={activeTab === 'kendra' ? 'tab-active' : ''}
                  onClick={() => setActiveTab('kendra')}
                >
                  <i className="fas fa-history"></i> Jan Arogya Kendra
                </button>
              </div>
            )}

            {/* Service Selection Grid */}
            {/* {!selectedService && activeTab === 'allUsers' && (
              <div className="services-grid">
                <div className="row">
                  {services.map(service => (
                    <div key={service.id} className="col-lg-4 col-md-6 mb-4">
                      <div 
                        className="service-card" 
                        onClick={() => handleServiceSelect(service)}
                        style={{'--gradient': service.gradient}}
                      >
                        <div className="card-content">
                          <div className="card-icon">
                            <span className="icon-emoji">{service.icon}</span>
                          </div>
                          <div className="card-info">
                            <h3 className="card-title">{service.title}</h3>
                            <p className="card-description">{service.description}</p>
                          </div>
                          <div className="service-action">
                            <span>Apply Now</span>
                            <i className="fas fa-arrow-right"></i>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )} */}

            {/* Service Form */}
            {selectedService && renderServiceForm()}
             
            {/* Application History for all tabs except allServices */}
            {!selectedService  && (
              <div className="applications-history">
                <div className="card user-table-card">
                  <div className="card-header-custom">
                    <h3 className="header-title">
                      {activeTab === 'history' 
                        ? 'All Application History' 
                        :`${getServiceNameFromTab(activeTab)} Applications`}
                    </h3>
                    <div className="filter-controls">
                      <select>
                        <option>All Status</option>
                        <option>Inactive</option>
                        <option>Active</option>
                        <option>Pending</option>
                        <option>Suspended</option>
                      </select>
                    </div>
                  </div>
                  <div className="card-body">
                    {loading ? (
                      <div className="text-center py-5">
                        <div className="spinner-border text-primary" role="status">
                          <span className="visually-hidden">Loading...</span>
                        </div>
                        <p className="mt-2">Loading application history...</p>
                      </div>
                    ) : (
                      <div className="table-responsive">
                        <table className="table table-hover">
                          <thead>
                            <tr>
                              <th>Service Type</th>
                              <th>User Info</th>
                              <th>Date Applied</th>
                              <th>Status</th>
                              <th>Actions</th>
                            </tr>
                          </thead>
                          <tbody>
  {applications.length > 0 ? (
    applications.map(app => (
      <tr key={app.id}>
        <td>
          <div className="d-flex align-items-center">
            <div className="app-icon-small me-2">
              <i className="fas fa-file-alt"></i>
            </div>
            {activeTab=="allUsers"?"Check Up" :app.serviceType}
          </div>
        </td>
        <td>
          <div><strong>{app.name}</strong></div>
          <div>{app.email}</div>
          <div>{app.phone}</div>
        </td>
        <td>{app.dateApplied}</td>
        <td>{renderStatusBadge(app.status)}</td>
        <td>
          {/* Inside your table row */}
<td>
  <div className="action-dropdown">
    <button className="btn btn-sm btn-outline-primary">
      <i className="fas fa-ellipsis-v"></i>
    </button>
    <div className="dropdown-content">
      <button
        className="dropdown-item"
        onClick={() => handleUpdate(app.id)}
      >
        Update
      </button>
      <button
        className="dropdown-item text-danger"
        onClick={() => handleDelete(app.id)}
      >
        Delete
      </button>
    </div>
  </div>
</td>

        </td>
      </tr>
    ))
  ) : (
    <tr>
      <td colSpan="5" className="text-center py-4">
        No applications found for this service.
      </td>
    </tr>
  )}
</tbody>

                        </table>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}
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
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          border-radius: 20px;
          margin-bottom: 2rem;
          overflow: hidden;
          position: relative;
          box-shadow: 0 20px 40px rgba(102, 126, 234, 0.3);
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

        .portal-tabs {
          display: flex;
          border-bottom: 1px solid #e5e7eb;
          margin-bottom: 2rem;
          background: white;
          border-radius: 12px;
          padding: 0.5rem;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
          overflow-x: auto;
        }

        .portal-tabs button {
          padding: 1rem 1.5rem;
          background: none;
          border: none;
          font-size: 1rem;
          font-weight: 500;
          color: #6b7280;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 0.5rem;
          transition: all 0.3s ease;
          flex: 1;
          justify-content: center;
          border-radius: 8px;
          white-space: nowrap;
          min-width: max-content;
        }

        .portal-tabs button:hover {
          color: #4f46e5;
          background: #f5f7fa;
        }

        .portal-tabs .tab-active {
          color: #4f46e5;
          background: #eef2ff;
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
          cursor: pointer;
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
          text-align: center;
        }

        .service-action {
          display: flex;
          align-items: center;
          justify-content: space-between;
          color: #4f46e5;
          font-weight: 500;
        }

        .service-detail-page {
          background: white;
          border-radius: 16px;
          padding: 2rem;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
          margin-bottom: 2rem;
        }

        .page-header {
          display: flex;
          align-items: center;
          margin-bottom: 2rem;
        }

        .back-button {
          background: none;
          border: none;
          color: #4f46e5;
          font-weight: 500;
          cursor: pointer;
          margin-right: 2rem;
        }

        .page-header h2 {
          font-size: 1.8rem;
          font-weight: 600;
          color: #1f2937;
          margin: 0;
        }

        .service-content {
          display: flex;
          gap: 2rem;
        }

        .service-icon-large {
          flex: 0 0 120px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 4rem;
        }

        .service-form {
          flex: 1;
        }

        .service-form h3 {
          font-size: 1.5rem;
          font-weight: 600;
          color: #1f2937;
          margin-bottom: 1.5rem;
        }

        .form-group {
          margin-bottom: 1.5rem;
        }

        .form-group label {
          display: block;
          font-weight: 500;
          color: #374151;
          margin-bottom: 0.5rem;
        }

        .form-group input,
        .form-group select,
        .form-group textarea {
          width: 100%;
          padding: 0.75rem 1rem;
          border: 1px solid #d1d5db;
          border-radius: 8px;
          font-size: 1rem;
          transition: all 0.3s ease;
        }

        .form-group input:focus,
        .form-group select:focus,
        .form-group textarea:focus {
          outline: none;
          border-color: #4f46e5;
          box-shadow: 0 0 0 3px rgba(79, 70, 229, 0.1);
        }

        .form-group textarea {
          min-height: 100px;
          resize: vertical;
        }

        .form-actions {
          display: flex;
          justify-content: flex-end;
          gap: 1rem;
          margin-top: 2rem;
        }

        .btn-primary {
          padding: 0.75rem 1.5rem;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          border: none;
          border-radius: 8px;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .btn-primary:hover {
          opacity: 0.9;
          transform: translateY(-2px);
        }

        .btn-secondary {
          padding: 0.75rem 1.5rem;
          background: #f3f4f6;
          color: #374151;
          border: none;
          border-radius: 8px;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .btn-secondary:hover {
          background: #e5e7eb;
        }

        .user-table-card {
          background: white;
          border-radius: 20px;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
          border: none;
          overflow: hidden;
        }

        .card-header-custom {
          padding: 1.5rem;
          display: flex;
          align-items: center;
          justify-content: space-between;
          border-bottom: 1px solid #f3f4f6;
        }

        .header-title {
          font-size: 1.3rem;
          font-weight: 600;
          color: #1f2937;
          margin: 0;
        }

        .filter-controls {
          display: flex;
          gap: 1rem;
        }

        .filter-controls select {
          padding: 0.5rem 1rem;
          border: 1px solid #e5e7eb;
          border-radius: 8px;
          background: white;
        }

        .app-icon-small {
          width: 30px;
          height: 30px;
          border-radius: 8px;
          background: rgba(79, 70, 229, 0.1);
          color: #4f46e5;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 0.9rem;
        }

        .status-badge {
          padding: 0.25rem 0.75rem;
          border-radius: 20px;
          font-size: 0.8rem;
          font-weight: 500;
        }

        .status-pending {
          background: #fef3c7;
          color: #92400e;
        }

        .status-approved {
          background: #d1fae5;
          color: #065f46;
        }

        .status-rejected {
          background: #fee2e2;
          color: #991b1b;
        }

        .status-completed {
          background: #dbeafe;
          color: #1e40af;
        }

        .status-processing {
          background: #f3e8ff;
          color: #7e22ce;
        }

        @media (max-width: 768px) {
          .welcome-title {
            font-size: 1.8rem;
          }
          
          .welcome-overlay {
            padding: 1.5rem;
          }
          
          .service-content {
            flex-direction: column;
          }
          
          .service-icon-large {
            margin-bottom: 1rem;
          }
          
          .portal-tabs {
            flex-direction: column;
          }
          
          .card-header-custom {
            flex-direction: column;
            align-items: flex-start;
            gap: 1rem;
          }
          
          .filter-controls {
            width: 100%;
            flex-direction: column;
          }
            .action-dropdown {
  position: relative;
  display: inline-block;
}

.action-dropdown .dropdown-content {
  display: none;
  position: absolute;
  top: 100%;
  right: 0;
  background-color: #fff;
  min-width: 100px;
  box-shadow: 0px 4px 6px rgba(0,0,0,0.1);
  border-radius: 4px;
  z-index: 10;
}

.action-dropdown:hover .dropdown-content {
  display: block;
}

.dropdown-item {
  padding: 8px 12px;
  width: 100%;
  text-align: left;
  border: none;
  background: none;
  cursor: pointer;
}

.dropdown-item:hover {
  background-color: #f1f1f1;
}

        }
      `}</style>
    </div>
  );
}