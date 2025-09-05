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

import React, { useState,useEffect } from 'react';

const HospitalEmployeeDashboard = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [language, setLanguage] = useState('english');

  // Mock data - in a real app this would come from API calls
  const patientData = [
    { id: 1, name: 'Rajesh Kumar', age: 42, condition: 'Hypertension', bed: 'A-12', status: 'Stable' },
    { id: 2, name: 'Sunita Devi', age: 28, condition: 'Pregnancy Care', bed: 'B-05', status: 'Monitoring' },
    { id: 3, name: 'Vikram Singh', age: 65, condition: 'Diabetes', bed: 'C-08', status: 'Recovering' },
  ];

  const resourceData = {
    beds: { total: 50, occupied: 42, available: 8 },
    ambulances: { total: 3, available: 1 },
    medicines: { stock: 'Adequate', critical: ['Insulin', 'Paracetamol'] }
  };

  const emergencyContacts = [
    { name: 'Hospital Admin', number: '+91-9876543210' },
    { name: 'Ambulance Dispatch', number: '108' },
    { name: 'Emergency Ward', number: '+91-9876500000' },
  ];

  const getCurrentGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return language === 'hindi' ? 'शुभ प्रभात' : 'Good Morning';
    if (hour < 17) return language === 'hindi' ? 'शुभ दोपहर' : 'Good Afternoon';
    return language === 'hindi' ? 'शुभ संध्या' : 'Good Evening';
  };

  const toggleLanguage = () => {
    setLanguage(language === 'english' ? 'hindi' : 'english');
  };

  // Render the appropriate content based on activeTab
  const renderTabContent = () => {
    switch(activeTab) {
      case 'dashboard':
        return <DashboardContent language={language} getCurrentGreeting={getCurrentGreeting} resourceData={resourceData} emergencyContacts={emergencyContacts} />;
      case 'profile':
        return <ProfileContent language={language} />;
      case 'work':
        return <WorkManagementContent language={language} />;
      case 'patients':
        return <PatientCareContent language={language} patientData={patientData} />;
      case 'resources':
        return <ResourceTrackingContent language={language} resourceData={resourceData} />;
      case 'community':
        return <CommunityContent language={language} />;
      case 'telemedicine':
        return <TelemedicineContent language={language} />;
      case 'emergency':
        return <EmergencyContent language={language} />;
      case 'training':
        return <TrainingContent language={language} />;
      case 'reports':
        return <ReportsContent language={language} />;
      default:
        return <DashboardContent language={language} getCurrentGreeting={getCurrentGreeting} resourceData={resourceData} emergencyContacts={emergencyContacts} />;
    }
  };

  return (
    <div className="hospital-dashboard">
      {/* Header */}
      <header className="dashboard-header">
        <div className="container-fluid">
          <div className="row align-items-center">
            <div className="col-md-6">
              <h1>
                <i className="fas fa-hospital"></i>
                RUWA Hospital Dashboard
              </h1>
              <p className="tagline">
                {language === 'hindi' ? 'ग्रामीण स्वास्थ्य सेवा प्रबंधन' : 'Rural Healthcare Management'}
              </p>
            </div>
            <div className="col-md-6 text-end">
              <button className="btn btn-language" onClick={toggleLanguage}>
                {language === 'english' ? 'हिंदी' : 'English'}
              </button>
              <button className="btn btn-emergency">
                <i className="fas fa-bell"></i>
                {language === 'hindi' ? 'आपातकाल' : 'Emergency'}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation Tabs */}
      <nav className="dashboard-tabs">
        <div className="container-fluid">
          <ul className="nav nav-tabs">
            {[
              { id: 'dashboard', label: language === 'hindi' ? 'डैशबोर्ड' : 'Dashboard', icon: 'tachometer-alt' },
              { id: 'profile', label: language === 'hindi' ? 'प्रोफाइल' : 'Profile', icon: 'user' },
              { id: 'work', label: language === 'hindi' ? 'कार्य प्रबंधन' : 'Work Management', icon: 'tasks' },
              { id: 'patients', label: language === 'hindi' ? 'मरीज़ देखभाल' : 'Patient Care', icon: 'user-injured' },
              { id: 'resources', label: language === 'hindi' ? 'संसाधन' : 'Resources', icon: 'procedures' },
              { id: 'community', label: language === 'hindi' ? 'समुदाय' : 'Community', icon: 'users' },
              { id: 'telemedicine', label: language === 'hindi' ? 'टेलीमेडिसिन' : 'Telemedicine', icon: 'video' },
              { id: 'emergency', label: language === 'hindi' ? 'आपातकाल' : 'Emergency', icon: 'exclamation-triangle' },
              { id: 'training', label: language === 'hindi' ? 'प्रशिक्षण' : 'Training', icon: 'graduation-cap' },
              { id: 'reports', label: language === 'hindi' ? 'रिपोर्ट' : 'Reports', icon: 'chart-bar' },
            ].map(tab => (
              <li className="nav-item" key={tab.id}>
                <button
                  className={`nav-link ${activeTab === tab.id ? 'active' : ''}`}
                  onClick={() => setActiveTab(tab.id)}
                >
                  <i className={`fas fa-${tab.icon}`}></i>
                  {tab.label}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </nav>

      {/* Main Content */}
      <main className="dashboard-content">
        <div className="container-fluid">
          {renderTabContent()}
        </div>
      </main>

      <style jsx>{`
        .hospital-dashboard {
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          background: #f8f9fa;
          min-height: 100vh;
        }
        
        .dashboard-header {
          background: linear-gradient(135deg, #2c6bac 0%, #34a0a4 100%);
          color: white;
          padding: 1rem 0;
          box-shadow: 0 2px 10px rgba(0,0,0,0.1);
        }
        
        .dashboard-header h1 {
          margin: 0;
          font-size: 1.8rem;
          font-weight: 700;
        }
        
        .dashboard-header h1 i {
          margin-right: 10px;
        }
        
        .tagline {
          margin: 0;
          opacity: 0.9;
          font-size: 0.9rem;
        }
        
        .btn-language {
          background: rgba(255,255,255,0.2);
          color: white;
          border: 1px solid rgba(255,255,255,0.3);
          margin-right: 10px;
        }
        
        .btn-emergency {
          background: #e63946;
          color: white;
          border: none;
        }
        
        .dashboard-tabs {
          background: white;
          box-shadow: 0 2px 4px rgba(0,0,0,0.05);
        }
        
        .nav-tabs {
          border-bottom: none;
          overflow-x: auto;
          white-space: nowrap;
          flex-wrap: nowrap;
        }
        
        .nav-tabs .nav-item {
          margin-bottom: 0;
        }
        
        .nav-tabs .nav-link {
          border: none;
          border-bottom: 3px solid transparent;
          color: #6c757d;
          font-weight: 500;
          padding: 1rem 1.2rem;
          display: flex;
          align-items: center;
          gap: 8px;
        }
        
        .nav-tabs .nav-link.active {
          color: #2c6bac;
          border-bottom-color: #2c6bac;
          background: transparent;
        }
        
        .nav-tabs .nav-link:hover {
          border-bottom-color: #dee2e6;
        }
        
        .dashboard-content {
          padding: 2rem 0;
        }
        
        .card {
          border: none;
          border-radius: 10px;
          box-shadow: 0 2px 10px rgba(0,0,0,0.05);
          margin-bottom: 1.5rem;
        }
        
        .card-header {
          background: white;
          border-bottom: 1px solid #eee;
          font-weight: 600;
          padding: 1rem 1.5rem;
        }
        
        .card-body {
          padding: 1.5rem;
        }
        
        .stats-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
          gap: 1.5rem;
          margin-bottom: 2rem;
        }
        
        .stat-card {
          background: white;
          border-radius: 10px;
          padding: 1.5rem;
          box-shadow: 0 2px 10px rgba(0,0,0,0.05);
          display: flex;
          align-items: center;
        }
        
        .stat-icon {
          width: 60px;
          height: 60px;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.5rem;
          margin-right: 1rem;
          flex-shrink: 0;
        }
        
        .stat-content h3 {
          margin: 0;
          font-weight: 700;
        }
        
        .stat-content p {
          margin: 0;
          color: #6c757d;
        }
        
        .bg-primary-light { background: rgba(44, 107, 172, 0.1); color: #2c6bac; }
        .bg-success-light { background: rgba(82, 183, 136, 0.1); color: #52b788; }
        .bg-warning-light { background: rgba(249, 220, 92, 0.1); color: #d4ac0d; }
        .bg-danger-light { background: rgba(230, 57, 70, 0.1); color: #e63946; }
        
        .table th {
          border-top: none;
          font-weight: 600;
          color: #6c757d;
        }
        
        .badge-stable { background: #52b788; }
        .badge-monitoring { background: #f9dc5c; color: #000; }
        .badge-recovering { background: #4cc9f0; }
        
        @media (max-width: 768px) {
          .nav-tabs .nav-link {
            padding: 0.8rem 0.6rem;
            font-size: 0.85rem;
          }
          
          .stats-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
};

// Content components for each tab
const DashboardContent = ({ language, getCurrentGreeting, resourceData, emergencyContacts }) => (
  <div>
    <div className="welcome-card card mb-4">
      <div className="card-body">
        <div className="row">
          <div className="col-md-8">
            <h3>{getCurrentGreeting()}, Dr. Sharma!</h3>
            <p className="text-muted">
              {language === 'hindi' 
                ? 'आज आपकी ड्यूटी शेड्यूल और असाइनमेंट' 
                : 'Your duty schedule and assignments for today'}
            </p>
            <div className="d-flex flex-wrap gap-3">
              <span className="badge bg-primary">
                <i className="fas fa-id-badge me-1"></i>
                ID: HS-7890
              </span>
              <span className="badge bg-secondary">
                <i className="fas fa-user-tag me-1"></i>
                {language === 'hindi' ? 'वरिष्ठ चिकित्सक' : 'Senior Doctor'}
              </span>
              <span className="badge bg-info">
                <i className="fas fa-map-marker-alt me-1"></i>
                {language === 'hindi' ? 'ग्रामीण स्वास्थ्य केंद्र' : 'Rural Health Center'}
              </span>
            </div>
          </div>
          <div className="col-md-4 text-end">
            <div className="d-flex justify-content-end gap-3">
              <div className="text-center">
                <div className="fs-2 fw-bold">8</div>
                <small>{language === 'hindi' ? 'मरीज़' : 'Patients'}</small>
              </div>
              <div className="text-center">
                <div className="fs-2 fw-bold">12</div>
                <small>{language === 'hindi' ? 'काम' : 'Tasks'}</small>
              </div>
              <div className="text-center">
                <div className="fs-2 fw-bold">3</div>
                <small>{language === 'hindi' ? 'अलर्ट' : 'Alerts'}</small>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div className="stats-grid">
      <div className="stat-card">
        <div className="stat-icon bg-primary-light">
          <i className="fas fa-bed"></i>
        </div>
        <div className="stat-content">
          <h4>{resourceData.beds.available}/{resourceData.beds.total}</h4>
          <p>{language === 'hindi' ? 'बेड उपलब्ध' : 'Beds Available'}</p>
        </div>
      </div>
      
      <div className="stat-card">
        <div className="stat-icon bg-success-light">
          <i className="fas fa-ambulance"></i>
        </div>
        <div className="stat-content">
          <h4>{resourceData.ambulances.available}/{resourceData.ambulances.total}</h4>
          <p>{language === 'hindi' ? 'एम्बुलेंस उपलब्ध' : 'Ambulances Available'}</p>
        </div>
      </div>
      
      <div className="stat-card">
        <div className="stat-icon bg-warning-light">
          <i className="fas fa-pills"></i>
        </div>
        <div className="stat-content">
          <h4>{resourceData.medicines.stock}</h4>
          <p>{language === 'hindi' ? 'दवा स्टॉक' : 'Medicine Stock'}</p>
        </div>
      </div>
      
      <div className="stat-card">
        <div className="stat-icon bg-danger-light">
          <i className="fas fa-users"></i>
        </div>
        <div className="stat-content">
          <h4>5/7</h4>
          <p>{language === 'hindi' ? 'कर्मचारी उपस्थित' : 'Staff Present'}</p>
        </div>
      </div>
    </div>

    <div className="row">
      <div className="col-md-6">
        <div className="card">
          <div className="card-header">
            <i className="fas fa-tasks me-2"></i>
            {language === 'hindi' ? 'आज के कार्य' : 'Today\'s Tasks'}
          </div>
          <div className="card-body">
            <ul className="list-group list-group-flush">
              <li className="list-group-item d-flex justify-content-between align-items-center">
                <div>
                  <i className="fas fa-user-injured text-primary me-2"></i>
                  {language === 'hindi' ? 'रजेश कुमार का इलाज' : 'Treat Rajesh Kumar'}
                </div>
                <span className="badge bg-warning text-dark">
                  {language === 'hindi' ? 'लंबित' : 'Pending'}
                </span>
              </li>
              <li className="list-group-item d-flex justify-content-between align-items-center">
                <div>
                  <i className="fas fa-file-medical text-success me-2"></i>
                  {language === 'hindi' ? 'मरीज रिपोर्ट अपडेट करें' : 'Update Patient Reports'}
                </div>
                <span className="badge bg-warning text-dark">
                  {language === 'hindi' ? 'लंबित' : 'Pending'}
                </span>
              </li>
              <li className="list-group-item d-flex justify-content-between align-items-center">
                <div>
                  <i className="fas fa-syringe text-info me-2"></i>
                  {language === 'hindi' ? 'टीकाकरण कैंप' : 'Vaccination Camp'}
                </div>
                <span className="badge bg-success">
                  {language === 'hindi' ? 'पूर्ण' : 'Completed'}
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>
      
      <div className="col-md-6">
        <div className="card">
          <div className="card-header">
            <i className="fas fa-phone-alt me-2"></i>
            {language === 'hindi' ? 'आपातकालीन संपर्क' : 'Emergency Contacts'}
          </div>
          <div className="card-body">
            {emergencyContacts.map((contact, index) => (
              <div className="d-flex align-items-center mb-3" key={index}>
                <div className="bg-light rounded-circle p-3 me-3">
                  <i className="fas fa-phone text-danger"></i>
                </div>
                <div>
                  <h6 className="mb-0">{contact.name}</h6>
                  <small className="text-muted">{contact.number}</small>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  </div>
);



const ProfileContent = ({ language }) => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await fetch("https://ruwa-backend.onrender.com/api/employee/profile", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        if (res.ok) {
          setProfile(data.profile);
        } else {
          console.error(data.message);
        }
      } catch (error) {
        console.error("Error fetching profile:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  if (loading) {
    return <p>{language === "hindi" ? "लोड हो रहा है..." : "Loading..."}</p>;
  }

  if (!profile) {
    return <p>{language === "hindi" ? "प्रोफ़ाइल उपलब्ध नहीं है" : "Profile not available"}</p>;
  }

  return (
    <div className="card">
      <div className="card-header">
        <i className="fas fa-user me-2"></i>
        {language === "hindi" ? "कर्मचारी प्रोफाइल" : "Employee Profile"}
      </div>
      <div className="card-body">
        <div className="row">
          <div className="col-md-4 text-center">
            <img
              src={profile.profilePic || "https://via.placeholder.com/120"}
              alt="Profile"
              className="rounded-circle mb-3"
              width="120"
              height="120"
            />
            <h4>{profile.name}</h4>
            <p className="text-muted">
              {profile.position || (language === "hindi" ? "पद" : "Position")}
            </p>
          </div>
          <div className="col-md-8">
            <div className="row mb-3">
              <div className="col-md-6">
                <p>
                  <strong>{language === "hindi" ? "कर्मचारी आईडी:" : "Employee ID:"}</strong>{" "}
                  {profile.employeeId}
                </p>
              </div>
              <div className="col-md-6">
                <p>
                  <strong>{language === "hindi" ? "संपर्क नंबर:" : "Contact Number:"}</strong>{" "}
                  {profile.phone}
                </p>
              </div>
            </div>
            <div className="row mb-3">
              <div className="col-md-6">
                <p>
                  <strong>{language === "hindi" ? "ईमेल:" : "Email:"}</strong>{" "}
                  {profile.email}
                </p>
              </div>
              <div className="col-md-6">
                <p>
                  <strong>{language === "hindi" ? "कार्य स्थान:" : "Work Location:"}</strong>{" "}
                  {profile.department}
                </p>
              </div>
            </div>
            <div className="row mb-3">
              <div className="col-md-6">
                <p>
                  <strong>{language === "hindi" ? "शिफ्ट:" : "Shift:"}</strong>{" "}
                  {profile.shift || (language === "hindi" ? "उपलब्ध नहीं" : "Not Available")}
                </p>
              </div>
              <div className="col-md-6">
                <p>
                  <strong>{language === "hindi" ? "अनुभव:" : "Experience:"}</strong>{" "}
                  {profile.experience
                    ? `${profile.experience} ${language === "hindi" ? "वर्ष" : "Years"}`
                    : "-"}
                </p>
              </div>
            </div>
            <div className="row">
              <div className="col-12">
                <p>
                  <strong>{language === "hindi" ? "आपातकालीन संपर्क:" : "Emergency Contact:"}</strong>{" "}
                  {profile.emergencyContact || "-"}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};




const WorkManagementContent = ({ language }) => (
  <div>
    <div className="row">
      <div className="col-md-6">
        <div className="card mb-4">
          <div className="card-header">
            <i className="fas fa-calendar-alt me-2"></i>
            {language === 'hindi' ? 'शिफ्ट रोस्टर' : 'Shift Roster'}
          </div>
          <div className="card-body">
            <div className="mb-3">
              <h6>{language === 'hindi' ? 'आज की शिफ्ट' : "Today's Shift"}</h6>
              <p>9:00 AM - 5:00 PM ({language === 'hindi' ? 'नियमित' : 'Regular'})</p>
            </div>
            <div className="mb-3">
              <h6>{language === 'hindi' ? 'कल की शिफ्ट' : "Tomorrow's Shift"}</h6>
              <p>12:00 PM - 8:00 PM ({language === 'hindi' ? 'ऑन-कॉल' : 'On-Call'})</p>
            </div>
            <button className="btn btn-primary btn-sm">
              <i className="fas fa-download me-1"></i>
              {language === 'hindi' ? 'रोस्टर डाउनलोड करें' : 'Download Roster'}
            </button>
          </div>
        </div>
        
        <div className="card">
          <div className="card-header">
            <i className="fas fa-calendar-check me-2"></i>
            {language === 'hindi' ? 'उपस्थिति ट्रैकिंग' : 'Attendance Tracking'}
          </div>
          <div className="card-body">
            <div className="alert alert-success">
              <i className="fas fa-check-circle me-2"></i>
              {language === 'hindi' ? 'आज आपने उपस्थिति दर्ज की है' : 'You have marked attendance for today'}
            </div>
            <div className="mt-3">
              <h6>{language === 'hindi' ? 'इस माह की उपस्थिति' : 'This Month Attendance'}</h6>
              <div className="progress mb-2">
                <div className="progress-bar bg-success" style={{width: '90%'}}>18/20</div>
              </div>
              <small className="text-muted">
                {language === 'hindi' ? '90% उपस्थिति दर' : '90% attendance rate'}
              </small>
            </div>
          </div>
        </div>
      </div>
      
      <div className="col-md-6">
        <div className="card mb-4">
          <div className="card-header">
            <i className="fas fa-tasks me-2"></i>
            {language === 'hindi' ? 'कार्य असाइनमेंट' : 'Task Assignments'}
          </div>
          <div className="card-body">
            <div className="mb-3 p-3 bg-light rounded">
              <h6>{language === 'hindi' ? 'मरीज दौरा' : 'Patient Rounds'}</h6>
              <p className="mb-1">{language === 'hindi' ? 'वार्ड: ए' : 'Ward: A'}</p>
              <small className="text-muted">9:30 AM - 11:00 AM</small>
            </div>
            <div className="mb-3 p-3 bg-light rounded">
              <h6>{language === 'hindi' ? 'ओपीडी सेवाएं' : 'OPD Services'}</h6>
              <p className="mb-1">{language === 'hindi' ? 'कक्ष नंबर: 5' : 'Room No: 5'}</p>
              <small className="text-muted">11:30 AM - 2:00 PM</small>
            </div>
            <div className="p-3 bg-light rounded">
              <h6>{language === 'hindi' ? 'गाँव स्वास्थ्य शिविर' : 'Village Health Camp'}</h6>
              <p className="mb-1">{language === 'hindi' ? 'स्थान: रामनगर गाँव' : 'Location: Ramnagar Village'}</p>
              <small className="text-muted">3:00 PM - 5:00 PM</small>
            </div>
          </div>
        </div>
        
        <div className="card">
          <div className="card-header">
            <i className="fas fa-umbrella-beach me-2"></i>
            {language === 'hindi' ? 'अवकाश प्रबंधन' : 'Leave Management'}
          </div>
          <div className="card-body">
            <div className="mb-3">
              <h6>{language === 'hindi' ? 'शेष अवकाश' : 'Leave Balance'}</h6>
              <div className="d-flex justify-content-between">
                <span>{language === 'hindi' ? 'बीमारी के दिन' : 'Sick Days'}: 5</span>
                <span>{language === 'hindi' ? 'वार्षिक अवकाश' : 'Annual Leave'}: 12</span>
                <span>{language === 'hindi' ? 'आपातकालीन' : 'Emergency'}: 3</span>
              </div>
            </div>
            <button className="btn btn-primary btn-sm">
              <i className="fas fa-plus me-1"></i>
              {language === 'hindi' ? 'अवकाश के लिए आवेदन करें' : 'Apply for Leave'}
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
);

const PatientCareContent = ({ language, patientData }) => (
  <div>
    <div className="card mb-4">
      <div className="card-header d-flex justify-content-between align-items-center">
        <span>
          <i className="fas fa-user-injured me-2"></i>
          {language === 'hindi' ? 'मरीजों की सूची' : 'Patient List'}
        </span>
        <button className="btn btn-primary btn-sm">
          <i className="fas fa-plus me-1"></i>
          {language === 'hindi' ? 'नया मरीज' : 'New Patient'}
        </button>
      </div>
      <div className="card-body">
        <div className="table-responsive">
          <table className="table table-hover">
            <thead>
              <tr>
                <th>{language === 'hindi' ? 'आईडी' : 'ID'}</th>
                <th>{language === 'hindi' ? 'नाम' : 'Name'}</th>
                <th>{language === 'hindi' ? 'उम्र' : 'Age'}</th>
                <th>{language === 'hindi' ? 'स्थिति' : 'Condition'}</th>
                <th>{language === 'hindi' ? 'बेड' : 'Bed'}</th>
                <th>{language === 'hindi' ? 'स्थिति' : 'Status'}</th>
                <th>{language === 'hindi' ? 'कार्य' : 'Actions'}</th>
              </tr>
            </thead>
            <tbody>
              {patientData.map(patient => (
                <tr key={patient.id}>
                  <td>{patient.id}</td>
                  <td>{patient.name}</td>
                  <td>{patient.age}</td>
                  <td>{patient.condition}</td>
                  <td>{patient.bed}</td>
                  <td>
                    <span className={`badge ${
                      patient.status === 'Stable' ? 'badge-stable' : 
                      patient.status === 'Monitoring' ? 'badge-monitoring' : 'badge-recovering'
                    }`}>
                      {patient.status}
                    </span>
                  </td>
                  <td>
                    <button className="btn btn-sm btn-outline-primary me-1">
                      <i className="fas fa-eye"></i>
                    </button>
                    <button className="btn btn-sm btn-outline-success">
                      <i className="fas fa-edit"></i>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <div className="row">
      <div className="col-md-6">
        <div className="card">
          <div className="card-header">
            <i className="fas fa-prescription me-2"></i>
            {language === 'hindi' ? 'दवा प्रिस्क्रिप्शन' : 'Medicine Prescription'}
          </div>
          <div className="card-body">
            <form>
              <div className="mb-3">
                <label className="form-label">
                  {language === 'hindi' ? 'मरीज का नाम' : 'Patient Name'}
                </label>
                <select className="form-select">
                  <option>{language === 'hindi' ? 'चुनें' : 'Select'}</option>
                  {patientData.map(patient => (
                    <option key={patient.id}>{patient.name}</option>
                  ))}
                </select>
              </div>
              <div className="mb-3">
                <label className="form-label">
                  {language === 'hindi' ? 'दवाएं' : 'Medicines'}
                </label>
                <textarea className="form-control" rows="3"></textarea>
              </div>
              <button type="submit" className="btn btn-primary">
                {language === 'hindi' ? 'प्रिस्क्रिप्शन जमा करें' : 'Submit Prescription'}
              </button>
            </form>
          </div>
        </div>
      </div>
      
      <div className="col-md-6">
        <div className="card">
          <div className="card-header">
            <i className="fas fa-notes-medical me-2"></i>
            {language === 'hindi' ? 'मेडिकल रिकॉर्ड' : 'Medical Records'}
          </div>
          <div className="card-body">
            <div className="d-grid gap-2">
              <button className="btn btn-outline-primary text-start">
                <i className="fas fa-file-medical me-2"></i>
                {language === 'hindi' ? 'रजेश कुमार - मेडिकल हिस्ट्री' : 'Rajesh Kumar - Medical History'}
              </button>
              <button className="btn btn-outline-primary text-start">
                <i className="fas fa-file-medical me-2"></i>
                {language === 'hindi' ? 'सुनीता देवी - प्रसव पूर्व देखभाल' : 'Sunita Devi - Prenatal Care'}
              </button>
              <button className="btn btn-outline-primary text-start">
                <i className="fas fa-file-medical me-2"></i>
                {language === 'hindi' ? 'विक्रम सिंह - मधुमेह प्रबंधन' : 'Vikram Singh - Diabetes Management'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

const ResourceTrackingContent = ({ language, resourceData }) => (
  <div>
    <div className="row">
      <div className="col-md-6 mb-4">
        <div className="card h-100">
          <div className="card-header">
            <i className="fas fa-bed me-2"></i>
            {language === 'hindi' ? 'बेड उपलब्धता' : 'Bed Availability'}
          </div>
          <div className="card-body">
            <div className="progress mb-3" style={{height: '30px'}}>
              <div 
                className="progress-bar" 
                role="progressbar" 
                style={{width: `${(resourceData.beds.occupied/resourceData.beds.total)*100}%`}}
              >
                {resourceData.beds.occupied} {language === 'hindi' ? 'कब्जे वाले' : 'Occupied'}
              </div>
              <div 
                className="progress-bar bg-success" 
                role="progressbar" 
                style={{width: `${(resourceData.beds.available/resourceData.beds.total)*100}%`}}
              >
                {resourceData.beds.available} {language === 'hindi' ? 'उपलब्ध' : 'Available'}
              </div>
            </div>
            <div className="text-center">
              <h4>{resourceData.beds.available} / {resourceData.beds.total}</h4>
              <p className="text-muted">{language === 'hindi' ? 'बेड उपलब्ध' : 'Beds Available'}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="col-md-6 mb-4">
        <div className="card h-100">
          <div className="card-header">
            <i className="fas fa-ambulance me-2"></i>
            {language === 'hindi' ? 'एम्बुलेंस Status' : 'Ambulance Status'}
          </div>
          <div className="card-body">
            <div className="d-flex justify-content-around text-center">
              <div>
                <div className="fs-1 text-success">{resourceData.ambulances.available}</div>
                <div>{language === 'hindi' ? 'उपलब्ध' : 'Available'}</div>
              </div>
              <div>
                <div className="fs-1 text-warning">{resourceData.ambulances.total - resourceData.ambulances.available}</div>
                <div>{language === 'hindi' ? 'उपयोग में' : 'In Use'}</div>
              </div>
            </div>
            <div className="mt-4">
              <button className="btn btn-primary w-100">
                <i className="fas fa-plus me-1"></i>
                {language === 'hindi' ? 'एम्बुलेंस अनुरोध' : 'Request Ambulance'}
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="col-md-6 mb-4">
        <div className="card h-100">
          <div className="card-header">
            <i className="fas fa-pills me-2"></i>
            {language === 'hindi' ? 'दवा स्टॉक' : 'Medicine Stock'}
          </div>
          <div className="card-body">
            <h5 className="card-title">
              {resourceData.medicines.stock === 'Adequate' 
                ? (language === 'hindi' ? 'पर्याप्त स्टॉक' : 'Adequate Stock')
                : (language === 'hindi' ? 'कम स्टॉक' : 'Low Stock')}
            </h5>
            {resourceData.medicines.critical.length > 0 && (
              <>
                <p className="text-danger">
                  <i className="fas fa-exclamation-triangle me-1"></i>
                  {language === 'hindi' ? 'निम्नलिखित दवाओं का स्टॉक कम है:' : 'Low stock of critical medicines:'}
                </p>
                <ul>
                  {resourceData.medicines.critical.map((medicine, index) => (
                    <li key={index}>{medicine}</li>
                  ))}
                </ul>
              </>
            )}
            <button className="btn btn-outline-primary mt-3">
              <i className="fas fa-clipboard-list me-1"></i>
              {language === 'hindi' ? 'पूर्ण स्टॉक देखें' : 'View Full Stock'}
            </button>
          </div>
        </div>
      </div>

      <div className="col-md-6 mb-4">
        <div className="card h-100">
          <div className="card-header">
            <i className="fas fa-tools me-2"></i>
            {language === 'hindi' ? 'उपकरण अनुरोध' : 'Equipment Request'}
          </div>
          <div className="card-body">
            <form>
              <div className="mb-3">
                <label className="form-label">
                  {language === 'hindi' ? 'उपकरण प्रकार' : 'Equipment Type'}
                </label>
                <select className="form-select">
                  <option>{language === 'hindi' ? 'चुनें' : 'Select'}</option>
                  <option>{language === 'hindi' ? 'ऑक्सीजन सिलिंडर' : 'Oxygen Cylinder'}</option>
                  <option>{language === 'hindi' ? 'दवा की मेज' : 'Medicine Trolley'}</option>
                  <option>{language === 'hindi' ? 'इंजेक्शन' : 'Injections'}</option>
                  <option>{language === 'hindi' ? 'सर्जिकल उपकरण' : 'Surgical Equipment'}</option>
                </select>
              </div>
              <div className="mb-3">
                <label className="form-label">
                  {language === 'hindi' ? 'मात्रा' : 'Quantity'}
                </label>
                <input type="number" className="form-control" />
              </div>
              <div className="mb-3">
                <label className="form-label">
                  {language === 'hindi' ? 'तात्कालिकता' : 'Urgency'}
                </label>
                <select className="form-select">
                  <option>{language === 'hindi' ? 'सामान्य' : 'Normal'}</option>
                  <option>{language === 'hindi' ? 'जरूरी' : 'Urgent'}</option>
                  <option>{language === 'hindi' ? 'अत्यावश्यक' : 'Critical'}</option>
                </select>
              </div>
              <button type="submit" className="btn btn-primary">
                {language === 'hindi' ? 'अनुरोध जमा करें' : 'Submit Request'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
);

// Additional content components (simplified for brevity)
const CommunityContent = ({ language }) => (
  <div className="card">
    <div className="card-header">
      <i className="fas fa-users me-2"></i>
      {language === 'hindi' ? 'समुदाय और आउटरीच' : 'Community & Outreach'}
    </div>
    <div className="card-body">
      <h5>{language === 'hindi' ? 'आगामी स्वास्थ्य शिविर' : 'Upcoming Health Camps'}</h5>
      <ul className="list-group mb-4">
        <li className="list-group-item">
          <i className="fas fa-clinic-medical me-2 text-primary"></i>
          {language === 'hindi' ? 'रामनगर गाँव - टीकाकरण शिविर (25 अगस्त)' : 'Ramnagar Village - Vaccination Camp (25th August)'}
        </li>
        <li className="list-group-item">
          <i className="fas fa-clinic-medical me-2 text-primary"></i>
          {language === 'hindi' ? 'सुंदरपुर गाँव - प्रसव पूर्व जांच (28 अगस्त)' : 'Sunderpur Village - Prenatal Checkup (28th August)'}
        </li>
      </ul>
      
      <h5>{language === 'hindi' ? 'मोबाइल क्लिनिक ट्रैकिंग' : 'Mobile Clinic Tracking'}</h5>
      <div className="alert alert-info">
        <i className="fas fa-info-circle me-2"></i>
        {language === 'hindi' 
          ? 'मोबाइल क्लिनिक आज सुंदरपुर गाँव में है' 
          : 'Mobile clinic is at Sunderpur village today'}
      </div>
    </div>
  </div>
);

const TelemedicineContent = ({ language }) => (
  <div className="card">
    <div className="card-header">
      <i className="fas fa-video me-2"></i>
      {language === 'hindi' ? 'टेलीमेडिसिन एकीकरण' : 'Telemedicine Integration'}
    </div>
    <div className="card-body">
      <div className="row mb-4">
        <div className="col-md-6">
          <div className="card bg-light">
            <div className="card-body text-center">
              <i className="fas fa-video fs-1 text-primary mb-3"></i>
              <h5>{language === 'hindi' ? 'वीडियो परामर्श' : 'Video Consultation'}</h5>
              <button className="btn btn-primary mt-2">
                {language === 'hindi' ? 'अब शुरू करें' : 'Start Now'}
              </button>
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <div className="card bg-light">
            <div className="card-body text-center">
              <i className="fas fa-upload fs-1 text-success mb-3"></i>
              <h5>{language === 'hindi' ? 'रिपोर्ट अपलोड' : 'Upload Reports'}</h5>
              <button className="btn btn-success mt-2">
                {language === 'hindi' ? 'अपलोड करें' : 'Upload'}
              </button>
            </div>
          </div>
        </div>
      </div>
      
      <h5>{language === 'hindi' ? 'रेफरल सिस्टम' : 'Referral System'}</h5>
      <form>
        <div className="mb-3">
          <label className="form-label">
            {language === 'hindi' ? 'मरीज का नाम' : 'Patient Name'}
          </label>
          <select className="form-select">
            <option>{language === 'hindi' ? 'चुनें' : 'Select'}</option>
            <option>Rajesh Kumar</option>
            <option>Sunita Devi</option>
            <option>Vikram Singh</option>
          </select>
        </div>
        <div className="mb-3">
          <label className="form-label">
            {language === 'hindi' ? 'विशेषज्ञता आवश्यक' : 'Specialty Required'}
          </label>
          <select className="form-select">
            <option>{language === 'hindi' ? 'चुनें' : 'Select'}</option>
            <option>{language === 'hindi' ? 'कार्डियोलॉजी' : 'Cardiology'}</option>
            <option>{language === 'hindi' ? 'न्यूरोलॉजी' : 'Neurology'}</option>
            <option>{language === 'hindi' ? 'ऑर्थोपेडिक्स' : 'Orthopedics'}</option>
          </select>
        </div>
        <button type="submit" className="btn btn-primary">
          {language === 'hindi' ? 'रेफरल भेजें' : 'Send Referral'}
        </button>
      </form>
    </div>
  </div>
);

const EmergencyContent = ({ language }) => (
  <div>
    <div className="alert alert-danger mb-4">
      <i className="fas fa-exclamation-triangle me-2"></i>
      {language === 'hindi' 
        ? 'केवल वास्तविक आपात स्थितियों के लिए उपयोग करें' 
        : 'Use only for real emergencies'}
    </div>
    
    <div className="row mb-4">
      <div className="col-md-6">
        <div className="card">
          <div className="card-header bg-danger text-white">
            <i className="fas fa-bell me-2"></i>
            {language === 'hindi' ? 'आपातकालीन अलर्ट' : 'Emergency Alert'}
          </div>
          <div className="card-body text-center">
            <i className="fas fa-exclamation-circle fs-1 text-danger mb-3"></i>
            <h4>{language === 'hindi' ? 'आपातकालीन सहायता' : 'Emergency Assistance'}</h4>
            <p>
              {language === 'hindi' 
                ? 'यह बटन दबाने पर प्रशासन और आपातकालीन टीम को सचेत किया जाएगा' 
                : 'Pressing this button will alert administration and emergency team'}
            </p>
            <button className="btn btn-danger btn-lg">
              <i className="fas fa-bell me-2"></i>
              {language === 'hindi' ? 'आपातकालीन अलर्ट' : 'Emergency Alert'}
            </button>
          </div>
        </div>
      </div>
      
      <div className="col-md-6">
        <div className="card">
          <div className="card-header">
            <i className="fas fa-phone-alt me-2"></i>
            {language === 'hindi' ? 'त्वरित संपर्क' : 'Quick Contacts'}
          </div>
          <div className="card-body">
            <div className="d-grid gap-2">
              <button className="btn btn-outline-danger text-start">
                <i className="fas fa-ambulance me-2"></i>
                {language === 'hindi' ? 'एम्बुलेंस - 108' : 'Ambulance - 108'}
              </button>
              <button className="btn btn-outline-danger text-start">
                <i className="fas fa-first-aid me-2"></i>
                {language === 'hindi' ? 'आपातकालीन वार्ड - 101' : 'Emergency Ward - 101'}
              </button>
              <button className="btn btn-outline-danger text-start">
                <i className="fas fa-user-md me-2"></i>
                {language === 'hindi' ? 'वरिष्ठ चिकित्सक - 102' : 'Senior Doctor - 102'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <div className="card">
      <div className="card-header">
        <i className="fas fa-clipboard-list me-2"></i>
        {language === 'hindi' ? 'घटना रिपोर्टिंग' : 'Incident Reporting'}
      </div>
      <div className="card-body">
        <form>
          <div className="mb-3">
            <label className="form-label">
              {language === 'hindi' ? 'घटना प्रकार' : 'Incident Type'}
            </label>
            <select className="form-select">
              <option>{language === 'hindi' ? 'चुनें' : 'Select'}</option>
              <option>{language === 'hindi' ? 'सांप काटना' : 'Snake Bite'}</option>
              <option>{language === 'hindi' ? 'दुर्घटना' : 'Accident'}</option>
              <option>{language === 'hindi' ? 'संक्रामक रोग' : 'Infectious Disease'}</option>
              <option>{language === 'hindi' ? 'प्राकृतिक आपदा' : 'Natural Disaster'}</option>
            </select>
          </div>
          <div className="mb-3">
            <label className="form-label">
              {language === 'hindi' ? 'विवरण' : 'Description'}
            </label>
            <textarea className="form-control" rows="3"></textarea>
          </div>
          <div className="mb-3">
            <label className="form-label">
              {language === 'hindi' ? 'स्थान' : 'Location'}
            </label>
            <input type="text" className="form-control" />
          </div>
          <button type="submit" className="btn btn-primary">
            {language === 'hindi' ? 'रिपोर्ट जमा करें' : 'Submit Report'}
          </button>
        </form>
      </div>
    </div>
  </div>
);

const TrainingContent = ({ language }) => (
  <div className="card">
    <div className="card-header">
      <i className="fas fa-graduation-cap me-2"></i>
      {language === 'hindi' ? 'प्रशिक्षण और सहायता' : 'Training & Support'}
    </div>
    <div className="card-body">
      <h5>{language === 'hindi' ? 'ई-लर्निंग मॉड्यूल' : 'E-Learning Modules'}</h5>
      <div className="row mb-4">
        <div className="col-md-4 mb-3">
          <div className="card h-100">
            <div className="card-body">
              <i className="fas fa-baby text-primary fs-1 mb-3"></i>
              <h6>{language === 'hindi' ? 'मातृ स्वास्थ्य देखभाल' : 'Maternal Healthcare'}</h6>
              <button className="btn btn-outline-primary btn-sm mt-2">
                {language === 'hindi' ? 'शुरू करें' : 'Start'}
              </button>
            </div>
          </div>
        </div>
        <div className="col-md-4 mb-3">
          <div className="card h-100">
            <div className="card-body">
              <i className="fas fa-syringe text-success fs-1 mb-3"></i>
              <h6>{language === 'hindi' ? 'बाल टीकाकरण' : 'Child Vaccination'}</h6>
              <button className="btn btn-outline-success btn-sm mt-2">
                {language === 'hindi' ? 'शुरू करें' : 'Start'}
              </button>
            </div>
          </div>
        </div>
        <div className="col-md-4 mb-3">
          <div className="card h-100">
            <div className="card-body">
              <i className="fas fa-bacteria text-warning fs-1 mb-3"></i>
              <h6>{language === 'hindi' ? 'संक्रामक रोग' : 'Infectious Diseases'}</h6>
              <button className="btn btn-outline-warning btn-sm mt-2">
                {language === 'hindi' ? 'शुरू करें' : 'Start'}
              </button>
            </div>
          </div>
        </div>
      </div>
      
      <h5>{language === 'hindi' ? 'सरकारी दिशानिर्देश' : 'Government Guidelines'}</h5>
      <div className="list-group mb-4">
        <a href="#" className="list-group-item list-group-item-action">
          <i className="fas fa-file-pdf text-danger me-2"></i>
          {language === 'hindi' ? 'मातृ देखभाल प्रोटोकॉल' : 'Maternal Care Protocols'}
        </a>
        <a href="#" className="list-group-item list-group-item-action">
          <i className="fas fa-file-pdf text-danger me-2"></i>
          {language === 'hindi' ? 'बाल टीकाकरण अनुसूची' : 'Child Vaccination Schedule'}
        </a>
        <a href="#" className="list-group-item list-group-item-action">
          <i className="fas fa-file-pdf text-danger me-2"></i>
          {language === 'hindi' ? 'आयुष्मान भारत योजना' : 'Ayushman Bharat Scheme'}
        </a>
      </div>
    </div>
  </div>
);

const ReportsContent = ({ language }) => (
  <div>
    <div className="row mb-4">
      <div className="col-md-6">
        <div className="card">
          <div className="card-header">
            <i className="fas fa-chart-line me-2"></i>
            {language === 'hindi' ? 'मासिक स्वास्थ्य आंकड़े' : 'Monthly Health Statistics'}
          </div>
          <div className="card-body">
            <div className="mb-3">
              <h6>{language === 'hindi' ? 'मलेरिया के मामले' : 'Malaria Cases'}</h6>
              <div className="progress mb-2">
                <div className="progress-bar" style={{width: '65%'}}>65%</div>
              </div>
              <small className="text-muted">
                {language === 'hindi' ? 'पिछले महीने से 12% कम' : 'Down 12% from last month'}
              </small>
            </div>
            <div className="mb-3">
              <h6>{language === 'hindi' ? 'बाल प्रसव' : 'Child Deliveries'}</h6>
              <div className="progress mb-2">
                <div className="progress-bar bg-success" style={{width: '78%'}}>78%</div>
              </div>
              <small className="text-muted">
                {language === 'hindi' ? 'पिछले महीने से 5% अधिक' : 'Up 5% from last month'}
              </small>
            </div>
            <div className="mb-3">
              <h6>{language === 'hindi' ? 'टीकाकरण दर' : 'Vaccination Rate'}</h6>
              <div className="progress mb-2">
                <div className="progress-bar bg-info" style={{width: '92%'}}>92%</div>
              </div>
              <small className="text-muted">
                {language === 'hindi' ? 'लक्ष्य से 7% अधिक' : '7% above target'}
              </small>
            </div>
          </div>
        </div>
      </div>
      
      <div className="col-md-6">
        <div className="card">
          <div className="card-header">
            <i className="fas fa-user-check me-2"></i>
            {language === 'hindi' ? 'कार्य सारांश' : 'Work Summary'}
          </div>
          <div className="card-body">
            <div className="text-center mb-4">
              <div className="display-4 fw-bold text-primary">156</div>
              <p className="text-muted">{language === 'hindi' ? 'इलाज किए गए मरीज' : 'Patients Treated'}</p>
            </div>
            <div className="d-flex justify-content-around text-center">
              <div>
                <div className="fs-3 fw-bold">42</div>
                <small>{language === 'hindi' ? 'ओपीडी विजिट' : 'OPD Visits'}</small>
              </div>
              <div>
                <div className="fs-3 fw-bold">18</div>
                <small>{language === 'hindi' ? 'आपातकालीन केस' : 'Emergency Cases'}</small>
              </div>
              <div>
                <div className="fs-3 fw-bold">96</div>
                <small>{language === 'hindi' ? 'गाँव विजिट' : 'Village Visits'}</small>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <div className="card">
      <div className="card-header">
        <i className="fas fa-comment-dots me-2"></i>
        {language === 'hindi' ? 'प्रतिक्रिया और शिकायतें' : 'Feedback & Complaints'}
      </div>
      <div className="card-body">
        <form>
          <div className="mb-3">
            <label className="form-label">
              {language === 'hindi' ? 'विषय' : 'Subject'}
            </label>
            <select className="form-select">
              <option>{language === 'hindi' ? 'चुनें' : 'Select'}</option>
              <option>{language === 'hindi' ? 'प्रशंसा' : 'Appreciation'}</option>
              <option>{language === 'hindi' ? 'सुझाव' : 'Suggestion'}</option>
              <option>{language === 'hindi' ? 'शिकायत' : 'Complaint'}</option>
            </select>
          </div>
          <div className="mb-3">
            <label className="form-label">
              {language === 'hindi' ? 'विवरण' : 'Description'}
            </label>
            <textarea className="form-control" rows="4"></textarea>
          </div>
          <div className="mb-3">
            <div className="form-check">
              <input className="form-check-input" type="checkbox" id="anonymous" />
              <label className="form-check-label" htmlFor="anonymous">
                {language === 'hindi' ? 'गुमनाम रूप से जमा करें' : 'Submit anonymously'}
              </label>
            </div>
          </div>
          <button type="submit" className="btn btn-primary">
            {language === 'hindi' ? 'जमा करें' : 'Submit'}
          </button>
        </form>
      </div>
    </div>
  </div>
);

export default HospitalEmployeeDashboard;