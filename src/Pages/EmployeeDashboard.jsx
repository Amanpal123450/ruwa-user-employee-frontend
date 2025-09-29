// import React, { useState,useEffect } from 'react';
// import { Link } from 'react-router-dom';
// import { useAuth } from '../components/AuthContext';
// import axios from 'axios';

// export default function EmployeeDashboard() {
//   const { user } = useAuth();
//    const [stats, setStats] = useState({
//     totalApplications: 0,
//     pendingApplications: 0,
//     todayAppliedCount: 0,
//   });
//    useEffect(() => {
//     const fetchDashboard = async () => {
//       try {
//         const token = localStorage.getItem("token"); // assuming JWT is stored
//         const res = await axios.get("https://ruwa-backend.onrender.com/api/employee/dash", {
//           headers: { Authorization: `Bearer ${token}` },
//         });
//         if (res.data.success) {
//           setStats(res.data.dashboard);
//         }
//       } catch (err) {
//         console.error("Error fetching dashboard:", err);
//       } finally {
       
//       }
//     };
//     fetchDashboard();
//   }, []);
//   const dashboardCards = [
//     {
//       title: 'Manage Users',
//       description: 'View and manage registered users',
//       icon: '👥',
//       link: '/manage-users',
//       color: 'primary',
//       gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
//     },
//     {
//       title: 'Applications',
//       description: 'Review and process applications',
//       icon: '📋',
//       link: '/manage-applications',
//       color: 'success',
//       gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)'
//     },
//      {
//       title: 'Attendance',
//       description: 'Puch your daily attandance',
//       icon: '🕒',
//       link: '/employee-att',
//       color: 'secondary',
//       gradient: 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)'
//     },
//     {
//       title: 'Reports',
//       description: 'View analytics and reports',
//       icon: '📊',
//       link: '/employee-reports',
//       color: 'info',
//       gradient: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)'
//     },
//     {
//       title: 'Profile',
//       description: 'Update your profile information',
//       icon: '👤',
//       link: '/employee-profile',
//       color: 'secondary',
//       gradient: 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)'
//     },
//     {
//       title: 'All Users',
//       description: 'Check Users history',
//       icon: '👤',
//       link: '/employee-userhistory',
//       color: 'secondary',
//       gradient: 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)'
//     },
//     {
//       title: 'Settings',
//       description: 'Manage system settings',
//       icon: '⚙️',
//       link: '/employee-settings',
//       color: 'warning',
//       gradient: 'linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)'
//     },
//     {
//       title: 'Help Center',
//       description: 'Get support and documentation',
//       icon: '❓',
//       link: '/help-center',
//       color: 'dark',
//       gradient: 'linear-gradient(135deg, #c3cfe2 0%, #c3cfe2 100%)'
//     },
   
//   ];

//   const getCurrentGreeting = () => {
//     const hour = new Date().getHours();
//     if (hour < 12) return 'Good Morning';
//     if (hour < 17) return 'Good Afternoon';
//     return 'Good Evening';
//   };

//   return (
//     <>
//       <div className="dashboard-container ">
//         <div className="container-fluid py-4">
//           <div className="row">
//             <div className="col-12">
//               {/* Enhanced Welcome Header */}
//               <div className="welcome-card">
//                 <div className="welcome-overlay">
//                   <div className="row align-items-center">
//                     <div className="col-lg-8 col-md-7">
//                       <div className="welcome-content">
//                         <div className="greeting-badge">
//                           {getCurrentGreeting()} 👋
//                         </div>
//                         <h1 className="welcome-title">
//                           {user?.name || 'Employee'}
//                         </h1>
//                         <p className="welcome-subtitle">
//                           Ready to make a difference today? Here's your dashboard overview.
//                         </p>
//                         <div className="employee-meta">
//                           <span className="meta-item">
//                             <i className="fas fa-id-badge me-2"></i>
//                             ID: {user?.employeeId || 'N/A'}
//                           </span>
//                           <span className="meta-item">
//                             <i className="fas fa-user-tag me-2"></i>
//                             Role: {user?.role}
//                           </span>
//                           <span className="meta-item">
//                             <i className="fas fa-clock me-2"></i>
//                             Last login: {new Date().toLocaleDateString()}
//                           </span>
//                         </div>
//                       </div>
//                     </div>
//                     <div className="col-lg-4 col-md-5 text-center">
//                       <div className="profile-section">
//                         <div className="profile-image-container">
//                           <img
//                             src={user?.profile_pic || 'https://randomuser.me/api/portraits/men/75.jpg'}
//                             alt="Employee"
//                             className="profile-image"
//                           />
//                           <div className="online-indicator"></div>
//                         </div>
//                         <div className="profile-stats mt-3">
//                           <div className="stat-item">
//                             <span className="stat-number">98%</span>
//                             <span className="stat-label">Performance</span>
//                           </div>
//                           <div className="stat-item">
//                             <span className="stat-number">156</span>
//                             <span className="stat-label">Tasks Done</span>
//                           </div>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>

//               {/* Enhanced Stats Cards */}
//               <div className="row d-flex justify-content-evenly mb-5">

//                 <div className="col-xl-3 col-lg-6 col-md-6 mb-4">
//                   <div className="stats-card stats-primary">
//                     <div className="stats-content">
//                       <div className="stats-icon">
//                         <i className="fas fa-users"></i>
//                       </div>
//                       <div className="stats-info">
//                         <h3 className="stats-number" data-count="1234">{stats.totalApplications}</h3>
//                         <p className="stats-text">Total Users</p>
//                         <div className="stats-progress">
//                           <span className="progress-indicator">+12% from last month</span>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
                
//                 <div className="col-xl-3 col-lg-6 col-md-6 mb-4">
//                   <div className="stats-card stats-success">
//                     <div className="stats-content">
//                       <div className="stats-icon">
//                         <i className="fas fa-file-alt"></i>
//                       </div>
//                       <div className="stats-info">
//                         <h3 className="stats-number" data-count="89">{stats.pendingApplications}</h3>
//                         <p className="stats-text">Pending Applications</p>
//                         <div className="stats-progress">
//                           <span className="progress-indicator">-5% from yesterday</span>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
                
//                 <div className="col-xl-3 col-lg-6 col-md-6 mb-4">
//                   <div className="stats-card stats-warning">
//                     <div className="stats-content">
//                       <div className="stats-icon">
//                         <i className="fas fa-check-circle"></i>
//                       </div>
//                       <div className="stats-info">
//                         <h3 className="stats-number" data-count="156">{stats.todayAppliedCount}</h3>
//                         <p className="stats-text">Approved Today</p>
//                         <div className="stats-progress">
//                           <span className="progress-indicator">+23% from yesterday</span>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
                
//                 {/* <div className="col-xl-3 col-lg-6 col-md-6 mb-4">
//                   <div className="stats-card stats-info">
//                     <div className="stats-content">
//                       <div className="stats-icon">
//                         <i className="fas fa-user-tie"></i>
//                       </div>
//                       <div className="stats-info">
//                         <h3 className="stats-number" data-count="23">23</h3>
//                         <p className="stats-text">Active Employees</p>
//                         <div className="stats-progress">
//                           <span className="progress-indicator">All online now</span>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 </div> */}
//               </div>

//               {/* Enhanced Dashboard Cards */}
//               <div className="row">
//                 <div className="col-12 mb-4">
//                   <div className="section-header">
//                     <h2 className="section-title">Quick Actions</h2>
//                     <p className="section-subtitle">Access your most used tools and features</p>
//                   </div>
//                 </div>
                
//                 {dashboardCards.map((card, index) => (
//                   <div key={index} className="col-xxl-4 col-xl-4 col-lg-6 col-md-6 mb-4">
//                     <Link to={card.link} className="text-decoration-none">
//                       <div className="action-card" style={{ '--gradient': card.gradient }}>
//                         <div className="card-background"></div>
//                         <div className="card-content">
//                           <div className="card-icon">
//                             <span className="icon-emoji">{card.icon}</span>
//                           </div>
//                           <div className="card-info">
//                             <h4 className="card-title">{card.title}</h4>
//                             <p className="card-description">{card.description}</p>
//                           </div>
//                           <div className="card-arrow">
//                             <i className="fas fa-arrow-right"></i>
//                           </div>
//                         </div>
//                       </div>
//                     </Link>
//                   </div>
//                 ))}
//               </div>

//               {/* Enhanced Recent Activity */}
//               <div className="row mt-5">
//                 <div className="col-lg-8 mb-4">
//                   <div className="activity-card">
//                     <div className="card-header-custom">
//                       <div className="header-content">
//                         <h3 className="header-title">Recent Activity</h3>
//                         <span className="header-badge">Live</span>
//                       </div>
//                       <button className="btn btn-outline-primary btn-sm">View All</button>
//                     </div>
//                     <div className="activity-list">
//                       <div className="activity-item">
//                         <div className="activity-avatar bg-primary">
//                           <i className="fas fa-user-plus"></i>
//                         </div>
//                         <div className="activity-content">
//                           <h6 className="activity-title">New user registration</h6>
//                           <p className="activity-description">John Doe registered for Arogya Card</p>
//                           <span className="activity-time">2 minutes ago</span>
//                         </div>
//                         <div className="activity-status status-new">New</div>
//                       </div>
                      
//                       <div className="activity-item">
//                         <div className="activity-avatar bg-success">
//                           <i className="fas fa-check"></i>
//                         </div>
//                         <div className="activity-content">
//                           <h6 className="activity-title">Application approved</h6>
//                           <p className="activity-description">Ambulance service application processed</p>
//                           <span className="activity-time">15 minutes ago</span>
//                         </div>
//                         <div className="activity-status status-approved">Approved</div>
//                       </div>
                      
//                       <div className="activity-item">
//                         <div className="activity-avatar bg-info">
//                           <i className="fas fa-cog"></i>
//                         </div>
//                         <div className="activity-content">
//                           <h6 className="activity-title">System update</h6>
//                           <p className="activity-description">Database backup completed successfully</p>
//                           <span className="activity-time">1 hour ago</span>
//                         </div>
//                         <div className="activity-status status-system">System</div>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
                
//                 <div className="col-lg-4 mb-4">
//                   <div className="quick-stats-card">
//                     <div className="card-header-custom">
//                       <h3 className="header-title">Today's Summary</h3>
//                     </div>
//                     <div className="quick-stats-content">
//                       <div className="quick-stat-item">
//                         <div className="stat-icon bg-primary">
//                           <i className="fas fa-tasks"></i>
//                         </div>
//                         <div className="stat-content">
//                           <span className="stat-number">12</span>
//                           <span className="stat-label">Tasks Completed</span>
//                         </div>
//                       </div>
                      
//                       <div className="quick-stat-item">
//                         <div className="stat-icon bg-success">
//                           <i className="fas fa-clock"></i>
//                         </div>
//                         <div className="stat-content">
//                           <span className="stat-number">7h 30m</span>
//                           <span className="stat-label">Hours Worked</span>
//                         </div>
//                       </div>
                      
//                       <div className="quick-stat-item">
//                         <div className="stat-icon bg-warning">
//                           <i className="fas fa-bell"></i>
//                         </div>
//                         <div className="stat-content">
//                           <span className="stat-number">3</span>
//                           <span className="stat-label">Notifications</span>
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
//           background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
//           min-height: 100vh;
//           padding: 0;
//         }

//         .welcome-card {
//           background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
//           border-radius: 20px;
//           margin-bottom: 2rem;
//           overflow: hidden;
//           position: relative;
//           box-shadow: 0 20px 40px rgba(102, 126, 234, 0.3);
//         }

//         .welcome-overlay {
//           padding: 2.5rem;
//           position: relative;
//           z-index: 2;
//         }

//         .welcome-card::before {
//           content: '';
//           position: absolute;
//           top: 0;
//           left: 0;
//           right: 0;
//           bottom: 0;
//           background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 1000"><polygon fill="%23ffffff08" points="0,1000 1000,0 1000,1000"/></svg>');
//           z-index: 1;
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
//           font-size: 2.5rem;
//           font-weight: 700;
//           margin-bottom: 0.5rem;
//           background: linear-gradient(45deg, #ffffff, #f8f9ff);
//           -webkit-background-clip: text;
//           -webkit-text-fill-color: transparent;
//         }

//         .welcome-subtitle {
//           font-size: 1.1rem;
//           opacity: 0.9;
//           margin-bottom: 1.5rem;
//         }

//         .employee-meta {
//           display: flex;
//           flex-wrap: wrap;
//           gap: 1.5rem;
//         }

//         .meta-item {
//           display: flex;
//           align-items: center;
//           font-size: 0.9rem;
//           opacity: 0.9;
//         }

//         .profile-section {
//           position: relative;
//         }

//         .profile-image-container {
//           position: relative;
//           display: inline-block;
//         }

//         .profile-image {
//           width: 120px;
//           height: 120px;
//           border-radius: 50%;
//           object-fit: cover;
//           border: 4px solid rgba(255, 255, 255, 0.3);
//           box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
//         }

//         .online-indicator {
//           position: absolute;
//           bottom: 5px;
//           right: 5px;
//           width: 20px;
//           height: 20px;
//           background: #4ade80;
//           border: 3px solid white;
//           border-radius: 50%;
//           animation: pulse 2s infinite;
//         }

//         @keyframes pulse {
//           0% { box-shadow: 0 0 0 0 rgba(74, 222, 128, 0.4); }
//           70% { box-shadow: 0 0 0 10px rgba(74, 222, 128, 0); }
//           100% { box-shadow: 0 0 0 0 rgba(74, 222, 128, 0); }
//         }

//         .profile-stats {
//           display: flex;
//           gap: 1.5rem;
//           justify-content: center;
//         }

//         .stat-item {
//           text-align: center;
//         }

//         .stat-number {
//           display: block;
//           font-size: 1.5rem;
//           font-weight: 700;
//           color: white;
//         }

//         .stat-label {
//           font-size: 0.8rem;
//           opacity: 0.8;
//           color: white;
//         }

//         .stats-card {
//           background: white;
//           border-radius: 16px;
//           padding: 1.5rem;
//           box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
//           border: none;
//           transition: all 0.3s ease;
//           position: relative;
//           overflow: hidden;
//         }

//         .stats-card::before {
//           content: '';
//           position: absolute;
//           top: 0;
//           left: 0;
//           width: 4px;
//           height: 100%;
//           background: var(--accent-color);
//         }

//         .stats-primary { --accent-color: #3b82f6; }
//         .stats-success { --accent-color: #10b981; }
//         .stats-warning { --accent-color: #f59e0b; }
//         .stats-info { --accent-color: #06b6d4; }

//         .stats-card:hover {
//           transform: translateY(-5px);
//           box-shadow: 0 10px 40px rgba(0, 0, 0, 0.15);
//         }

//         .stats-content {
//           display: flex;
//           align-items: center;
//           gap: 1rem;
//         }

//         .stats-icon {
//           width: 60px;
//           height: 60px;
//           border-radius: 12px;
//           display: flex;
//           align-items: center;
//           justify-content: center;
//           font-size: 1.5rem;
//           color: var(--accent-color);
//           background: rgba(var(--accent-rgb), 0.1);
//         }

//         .stats-primary .stats-icon { background: rgba(59, 130, 246, 0.1); }
//         .stats-success .stats-icon { background: rgba(16, 185, 129, 0.1); }
//         .stats-warning .stats-icon { background: rgba(245, 158, 11, 0.1); }
//         .stats-info .stats-icon { background: rgba(6, 182, 212, 0.1); }

//         .stats-number {
//           font-size: 2rem;
//           font-weight: 700;
//           color: #1f2937;
//           margin-bottom: 0.25rem;
//         }

//         .stats-text {
//           font-size: 0.9rem;
//           color: #6b7280;
//           margin-bottom: 0.5rem;
//         }

//         .progress-indicator {
//           font-size: 0.8rem;
//           color: var(--accent-color);
//           font-weight: 500;
//         }

//         .section-header {
//           text-align: center;
//           margin-bottom: 2rem;
//         }

//         .section-title {
//           font-size: 2rem;
//           font-weight: 700;
//           color: #1f2937;
//           margin-bottom: 0.5rem;
//         }

//         .section-subtitle {
//           color: #6b7280;
//           font-size: 1.1rem;
//         }

//         .action-card {
//           background: white;
//           border-radius: 20px;
//           padding: 0;
//           box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
//           border: none;
//           transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
//           position: relative;
//           overflow: hidden;
//           height: 140px;
//         }

//         .action-card::before {
//           content: '';
//           position: absolute;
//           top: 0;
//           left: 0;
//           right: 0;
//           bottom: 0;
//           background: var(--gradient);
//           opacity: 0;
//           transition: all 0.3s ease;
//         }

//         .action-card:hover::before {
//           opacity: 0.1;
//         }

//         .action-card:hover {
//           transform: translateY(-8px) scale(1.02);
//           box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
//         }

//         .card-content {
//           padding: 1.5rem;
//           position: relative;
//           z-index: 2;
//           height: 100%;
//           display: flex;
//           align-items: center;
//           gap: 1rem;
//         }

//         .card-icon {
//           flex-shrink: 0;
//         }

//         .icon-emoji {
//           font-size: 2.5rem;
//           display: block;
//         }

//         .card-info {
//           flex-grow: 1;
//         }

//         .card-title {
//           font-size: 1.2rem;
//           font-weight: 600;
//           color: #1f2937;
//           margin-bottom: 0.5rem;
//         }

//         .card-description {
//           color: #6b7280;
//           font-size: 0.9rem;
//           margin: 0;
//         }

//         .card-arrow {
//           flex-shrink: 0;
//           color: #9ca3af;
//           transition: all 0.3s ease;
//         }

//         .action-card:hover .card-arrow {
//           color: #3b82f6;
//           transform: translateX(5px);
//         }

//         .activity-card, .quick-stats-card {
//           background: white;
//           border-radius: 20px;
//           box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
//           border: none;
//         }

//         .card-header-custom {
//           padding: 1.5rem 1.5rem 0;
//           display: flex;
//           align-items: center;
//           justify-content: space-between;
//           margin-bottom: 1.5rem;
//         }

//         .header-content {
//           display: flex;
//           align-items: center;
//           gap: 1rem;
//         }

//         .header-title {
//           font-size: 1.3rem;
//           font-weight: 600;
//           color: #1f2937;
//           margin: 0;
//         }

//         .header-badge {
//           background: linear-gradient(45deg, #10b981, #34d399);
//           color: white;
//           padding: 0.25rem 0.75rem;
//           border-radius: 20px;
//           font-size: 0.8rem;
//           font-weight: 500;
//           animation: pulse 2s infinite;
//         }

//         .activity-list {
//           padding: 0 1.5rem 1.5rem;
//         }

//         .activity-item {
//           display: flex;
//           align-items: center;
//           gap: 1rem;
//           padding: 1rem 0;
//           border-bottom: 1px solid #f3f4f6;
//         }

//         .activity-item:last-child {
//           border-bottom: none;
//         }

//         .activity-avatar {
//           width: 40px;
//           height: 40px;
//           border-radius: 10px;
//           display: flex;
//           align-items: center;
//           justify-content: center;
//           color: white;
//           font-size: 0.9rem;
//           flex-shrink: 0;
//         }

//         .activity-content {
//           flex-grow: 1;
//         }

//         .activity-title {
//           font-size: 0.95rem;
//           font-weight: 600;
//           color: #1f2937;
//           margin-bottom: 0.25rem;
//         }

//         .activity-description {
//           font-size: 0.85rem;
//           color: #6b7280;
//           margin-bottom: 0.25rem;
//         }

//         .activity-time {
//           font-size: 0.8rem;
//           color: #9ca3af;
//         }

//         .activity-status {
//           padding: 0.25rem 0.75rem;
//           border-radius: 20px;
//           font-size: 0.8rem;
//           font-weight: 500;
//           flex-shrink: 0;
//         }

//         .status-new { background: #dbeafe; color: #1d4ed8; }
//         .status-approved { background: #dcfce7; color: #166534; }
//         .status-system { background: #e0f2fe; color: #0369a1; }

//         .quick-stats-content {
//           padding: 0 1.5rem 1.5rem;
//         }

//         .quick-stat-item {
//           display: flex;
//           align-items: center;
//           gap: 1rem;
//           padding: 1rem 0;
//           border-bottom: 1px solid #f3f4f6;
//         }

//         .quick-stat-item:last-child {
//           border-bottom: none;
//         }

//         .stat-icon {
//           width: 40px;
//           height: 40px;
//           border-radius: 10px;
//           display: flex;
//           align-items: center;
//           justify-content: center;
//           color: white;
//           font-size: 0.9rem;
//         }

//         .stat-content {
//           display: flex;
//           flex-direction: column;
//         }

//         .stat-content .stat-number {
//           font-size: 1.1rem;
//           font-weight: 600;
//           color: #1f2937;
//         }

//         .stat-content .stat-label {
//           font-size: 0.8rem;
//           color: #6b7280;
//         }

//         @media (max-width: 768px) {
//           .welcome-title {
//             font-size: 2rem;
//           }
          
//           .employee-meta {
//             flex-direction: column;
//             gap: 0.5rem;
//           }
          
//           .profile-stats {
//             gap: 1rem;
//           }
          
//           .stats-content {
//             flex-direction: column;
//             text-align: center;
//             gap: 1rem;
//           }
          
//           .card-content {
//             flex-direction: column;
//             text-align: center;
//             height: auto;
//           }
          
//           .action-card {
//             height: auto;
//           }
//         }
//           .dashboard-container {
//   background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
//   min-height: 100vh;
//   padding: 0;
//   width: 100%;
//   overflow-x: hidden; /* 🚀 Prevents page sliding horizontally */
// }

// .stats-card .d-flex {
//   flex-wrap: wrap; /* 🚀 Allow content to wrap */
//   justify-content: space-between;
// }

// .stats-card .fw-bold {
//   max-width: 100%;
//   text-align: right;
// }

// /* Attendance Table */
// .table-responsive {
//   width: 100%;
//   overflow-x: auto; /* 🚀 Scroll only inside table, not page */
// }

// @media (max-width: 768px) {
//   .stats-card .d-flex {
//     flex-direction: column;
//     align-items: flex-start;
//   }
//   .stats-card .fw-bold {
//     margin-top: 4px;
//     font-size: 0.85rem;
//   }
//   .table {
//     font-size: 0.85rem;
//   }
// }

// @media (max-width: 576px) {
//   .current-time {
//     font-size: 1.8rem;
//   }
//   .card-body.py-5 {
//     padding: 2rem 1rem !important;
//   }
//   .badge {
//     font-size: 0.7rem;
//   }
// }
// @media (max-width: 576px) {
//   .stats-card .d-flex {
//     flex-direction: column;     /* stack vertically */
//     align-items: flex-start;
//   }
//   .stats-card .fw-bold {
//     text-align: left;
//     font-size: 0.9rem;          /* slightly smaller */
//   }
// }
//       `}</style>
//     </>
//   );
// }

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../components/AuthContext';

export default function EmployeeDashboard() {
  const {user} = useAuth();

  const [stats, setStats] = useState({
    totalApplications: 0,
    pendingApplications: 0,
    todayAppliedCount: 0,
  });

  const [workDayStatus, setWorkDayStatus] = useState({
    checkedIn: true,
    checkInTime: '09:00 AM',
    hoursWorked: '7h 30m',
    status: 'Active',
    breaksTaken: 2,
    remainingHours: '0h 30m'
  });

  const [performance, setPerformance] = useState({
    weeklyScore: 98,
    monthlyScore: 95,
    tasksCompleted: 156,
    targetTasks: 160,
    avgResponseTime: '12 mins',
    satisfactionRate: 4.8
  });

  const [dailyAnalysis, setDailyAnalysis] = useState({
    applicationsProcessed: 23,
    usersHelped: 45,
    callsAttended: 12,
    emailsResponded: 34,
    meetingsAttended: 3
  });

  const [todoList, setTodoList] = useState([
    { id: 1, task: 'Review pending applications', completed: true, priority: 'high' },
    { id: 2, task: 'Update user records', completed: true, priority: 'medium' },
    { id: 3, task: 'Attend team meeting at 2 PM', completed: false, priority: 'high' },
    { id: 4, task: 'Prepare monthly report', completed: false, priority: 'medium' },
    { id: 5, task: 'Follow up with clients', completed: false, priority: 'low' }
  ]);

  const [newTask, setNewTask] = useState('');

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get("https://ruwa-backend.onrender.com/api/employee/dash", {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (res.data.success) {
          setStats(res.data.dashboard);
        }
      } catch (err) {
        console.error("Error fetching dashboard:", err);
      }
    };
    fetchDashboard();
  }, []);

  const dashboardCards = [
    {
      title: 'Manage Users',
      description: 'View and manage registered users',
      icon: '👥',
      link: '/manage-users',
      gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
    },
    {
      title: 'Applications',
      description: 'Review and process applications',
      icon: '📋',
      link: '/manage-applications',
      gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)'
    },
    {
      title: 'Attendance',
      description: 'Punch your daily attendance',
      icon: '🕒',
      link: '/employee-att',
      gradient: 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)'
    },
    {
      title: 'Reports',
      description: 'View analytics and reports',
      icon: '📊',
      link: '/employee-reports',
      gradient: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)'
    }
  ];

  const getCurrentGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good Morning';
    if (hour < 17) return 'Good Afternoon';
    return 'Good Evening';
  };

  const toggleTodo = (id) => {
    setTodoList(todoList.map(todo => 
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  const addTodo = () => {
    if (newTask.trim()) {
      setTodoList([...todoList, {
        id: Date.now(),
        task: newTask,
        completed: false,
        priority: 'medium'
      }]);
      setNewTask('');
    }
  };

  const deleteTodo = (id) => {
    setTodoList(todoList.filter(todo => todo.id !== id));
  };

  return (
    <div style={{ backgroundColor: '#f5f7fa', minHeight: '100vh', padding: '20px' }}>
      <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
        {/* Welcome Header */}
        <div style={{
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          borderRadius: '20px',
          padding: '40px',
          marginBottom: '30px',
          color: 'white',
          boxShadow: '0 10px 40px rgba(0,0,0,0.1)'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '20px' }}>
            <div>
              <div style={{
                background: 'rgba(255,255,255,0.2)',
                display: 'inline-block',
                padding: '8px 16px',
                borderRadius: '20px',
                marginBottom: '10px',
                fontSize: '14px'
              }}>
                {getCurrentGreeting()} 👋
              </div>
              <h1 style={{ fontSize: '36px', margin: '10px 0', fontWeight: 'bold' }}>
                {user.name}
              </h1>
              <p style={{ fontSize: '16px', opacity: 0.9, marginBottom: '15px' }}>
                {user.designation} • {user.department}
              </p>
              <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap', fontSize: '14px' }}>
                <span>📧 {user.email}</span>
                <span>📞 {user.contact}</span>
                <span>🆔 {user.employeeId}</span>
              </div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ position: 'relative', display: 'inline-block' }}>
                <img
                  src={user.profile_pic}
                  alt="Employee"
                  style={{
                    width: '120px',
                    height: '120px',
                    borderRadius: '50%',
                    border: '4px solid white',
                    objectFit: 'cover'
                  }}
                />
                <div style={{
                  position: 'absolute',
                  bottom: '5px',
                  right: '5px',
                  width: '20px',
                  height: '20px',
                  background: '#10b981',
                  borderRadius: '50%',
                  border: '3px solid white'
                }}></div>
              </div>
            </div>
          </div>
        </div>

        {/* Employee Profile Card */}
        <div style={{
          background: 'white',
          borderRadius: '15px',
          padding: '30px',
          marginBottom: '30px',
          boxShadow: '0 2px 10px rgba(0,0,0,0.05)'
        }}>
          <h2 style={{ fontSize: '24px', marginBottom: '20px', color: '#1f2937' }}>
            📋 Employee Profile
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }}>
            <ProfileItem icon="📍" label="Address" value={user.address} />
            <ProfileItem icon="📱" label="Contact" value={user.contact} />
            <ProfileItem icon="🏢" label="Area of Work" value={user.areaOfWork} />
            <ProfileItem icon="👔" label="Designation" value={user.designation} />
            <ProfileItem icon="🏛️" label="Department" value={user.department} />
            <ProfileItem icon="💼" label="Work Role" value={user.workRole} />
            <ProfileItem icon="🩸" label="Blood Group" value={user.bloodGroup} />
          </div>
        </div>

        {/* Work Day Status */}
        <div style={{
          background: 'white',
          borderRadius: '15px',
          padding: '30px',
          marginBottom: '30px',
          boxShadow: '0 2px 10px rgba(0,0,0,0.05)'
        }}>
          <h2 style={{ fontSize: '24px', marginBottom: '20px', color: '#1f2937' }}>
            ⏰ Work Day Status
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px' }}>
            <StatusCard
              icon="✅"
              label="Status"
              value={workDayStatus.status}
              color="#10b981"
            />
            <StatusCard
              icon="🕐"
              label="Check-in Time"
              value={workDayStatus.checkInTime}
              color="#3b82f6"
            />
            <StatusCard
              icon="⏱️"
              label="Hours Worked"
              value={workDayStatus.hoursWorked}
              color="#8b5cf6"
            />
            <StatusCard
              icon="☕"
              label="Breaks Taken"
              value={`${workDayStatus.breaksTaken} breaks`}
              color="#f59e0b"
            />
            <StatusCard
              icon="⏳"
              label="Remaining Hours"
              value={workDayStatus.remainingHours}
              color="#ef4444"
            />
          </div>
        </div>

        {/* Performance Tracker */}
        <div style={{
          background: 'white',
          borderRadius: '15px',
          padding: '30px',
          marginBottom: '30px',
          boxShadow: '0 2px 10px rgba(0,0,0,0.05)'
        }}>
          <h2 style={{ fontSize: '24px', marginBottom: '20px', color: '#1f2937' }}>
            📈 Performance Tracker
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px' }}>
            <PerformanceCard
              label="Weekly Score"
              value={`${performance.weeklyScore}%`}
              progress={performance.weeklyScore}
              color="#10b981"
            />
            <PerformanceCard
              label="Monthly Score"
              value={`${performance.monthlyScore}%`}
              progress={performance.monthlyScore}
              color="#3b82f6"
            />
            <PerformanceCard
              label="Tasks Progress"
              value={`${performance.tasksCompleted}/${performance.targetTasks}`}
              progress={(performance.tasksCompleted / performance.targetTasks) * 100}
              color="#8b5cf6"
            />
            <PerformanceCard
              label="Satisfaction Rate"
              value={`${performance.satisfactionRate}/5.0`}
              progress={(performance.satisfactionRate / 5) * 100}
              color="#f59e0b"
            />
          </div>
        </div>

        {/* Stats Cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px', marginBottom: '30px' }}>
          <StatsCard
            icon="👥"
            title="Total Users"
            value={stats.totalApplications}
            change="+12% from last month"
            gradient="linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
          />
          <StatsCard
            icon="📋"
            title="Pending Applications"
            value={stats.pendingApplications}
            change="-5% from yesterday"
            gradient="linear-gradient(135deg, #f093fb 0%, #f5576c 100%)"
          />
          <StatsCard
            icon="✅"
            title="Approved Today"
            value={stats.todayAppliedCount}
            change="+23% from yesterday"
            gradient="linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)"
          />
        </div>

        {/* Daily Analysis & Todo List */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '20px', marginBottom: '30px' }}>
          {/* Daily Analysis Report */}
          <div style={{
            background: 'white',
            borderRadius: '15px',
            padding: '30px',
            boxShadow: '0 2px 10px rgba(0,0,0,0.05)'
          }}>
            <h2 style={{ fontSize: '20px', marginBottom: '20px', color: '#1f2937' }}>
              📊 Daily Analysis Report
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
              <AnalysisItem
                icon="📝"
                label="Applications Processed"
                value={dailyAnalysis.applicationsProcessed}
                color="#667eea"
              />
              <AnalysisItem
                icon="👤"
                label="Users Helped"
                value={dailyAnalysis.usersHelped}
                color="#f093fb"
              />
              <AnalysisItem
                icon="📞"
                label="Calls Attended"
                value={dailyAnalysis.callsAttended}
                color="#4facfe"
              />
              <AnalysisItem
                icon="✉️"
                label="Emails Responded"
                value={dailyAnalysis.emailsResponded}
                color="#10b981"
              />
              <AnalysisItem
                icon="👥"
                label="Meetings Attended"
                value={dailyAnalysis.meetingsAttended}
                color="#f59e0b"
              />
            </div>
          </div>

          {/* Todo List */}
          <div style={{
            background: 'white',
            borderRadius: '15px',
            padding: '30px',
            boxShadow: '0 2px 10px rgba(0,0,0,0.05)'
          }}>
            <h2 style={{ fontSize: '20px', marginBottom: '20px', color: '#1f2937' }}>
              ✅ To-Do List
            </h2>
            <div style={{ marginBottom: '20px', display: 'flex', gap: '10px' }}>
              <input
                type="text"
                value={newTask}
                onChange={(e) => setNewTask(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && addTodo()}
                placeholder="Add a new task..."
                style={{
                  flex: 1,
                  padding: '10px 15px',
                  border: '2px solid #e5e7eb',
                  borderRadius: '8px',
                  fontSize: '14px'
                }}
              />
              <button
                onClick={addTodo}
                style={{
                  padding: '10px 20px',
                  background: '#667eea',
                  color: 'white',
                  border: 'none',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  fontWeight: '500'
                }}
              >
                Add
              </button>
            </div>
            <div style={{ maxHeight: '400px', overflowY: 'auto' }}>
              {todoList.map(todo => (
                <TodoItem
                  key={todo.id}
                  todo={todo}
                  onToggle={() => toggleTodo(todo.id)}
                  onDelete={() => deleteTodo(todo.id)}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div style={{ marginBottom: '30px' }}>
          <h2 style={{ fontSize: '24px', marginBottom: '20px', color: '#1f2937' }}>
            🚀 Quick Actions
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
            {dashboardCards.map((card, index) => (
              <Link key={index} to={card.link} style={{ textDecoration: 'none' }}>
                <div style={{
                  background: card.gradient,
                  borderRadius: '15px',
                  padding: '30px',
                  color: 'white',
                  cursor: 'pointer',
                  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                  boxShadow: '0 4px 15px rgba(0,0,0,0.1)'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-5px)';
                  e.currentTarget.style.boxShadow = '0 8px 25px rgba(0,0,0,0.15)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 4px 15px rgba(0,0,0,0.1)';
                }}>
                  <div style={{ fontSize: '40px', marginBottom: '15px' }}>{card.icon}</div>
                  <h3 style={{ fontSize: '20px', marginBottom: '8px', fontWeight: 'bold' }}>
                    {card.title}
                  </h3>
                  <p style={{ fontSize: '14px', opacity: 0.9 }}>
                    {card.description}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function ProfileItem({ icon, label, value }) {
  return (
    <div style={{ display: 'flex', alignItems: 'start', gap: '12px' }}>
      <span style={{ fontSize: '24px' }}>{icon}</span>
      <div>
        <div style={{ fontSize: '12px', color: '#6b7280', marginBottom: '4px' }}>{label}</div>
        <div style={{ fontSize: '14px', color: '#1f2937', fontWeight: '500' }}>{value}</div>
      </div>
    </div>
  );
}

function StatusCard({ icon, label, value, color }) {
  return (
    <div style={{
      padding: '20px',
      borderRadius: '12px',
      background: `${color}10`,
      border: `2px solid ${color}30`
    }}>
      <div style={{ fontSize: '24px', marginBottom: '8px' }}>{icon}</div>
      <div style={{ fontSize: '12px', color: '#6b7280', marginBottom: '4px' }}>{label}</div>
      <div style={{ fontSize: '18px', fontWeight: 'bold', color }}>{value}</div>
    </div>
  );
}

function PerformanceCard({ label, value, progress, color }) {
  return (
    <div style={{ padding: '20px', borderRadius: '12px', background: '#f9fafb' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
        <span style={{ fontSize: '14px', color: '#6b7280' }}>{label}</span>
        <span style={{ fontSize: '16px', fontWeight: 'bold', color }}>{value}</span>
      </div>
      <div style={{
        width: '100%',
        height: '8px',
        background: '#e5e7eb',
        borderRadius: '4px',
        overflow: 'hidden'
      }}>
        <div style={{
          width: `${progress}%`,
          height: '100%',
          background: color,
          transition: 'width 0.3s ease'
        }}></div>
      </div>
    </div>
  );
}

function StatsCard({ icon, title, value, change, gradient }) {
  return (
    <div style={{
      background: gradient,
      borderRadius: '15px',
      padding: '30px',
      color: 'white',
      boxShadow: '0 4px 15px rgba(0,0,0,0.1)'
    }}>
      <div style={{ fontSize: '32px', marginBottom: '10px' }}>{icon}</div>
      <div style={{ fontSize: '32px', fontWeight: 'bold', marginBottom: '5px' }}>{value}</div>
      <div style={{ fontSize: '14px', marginBottom: '5px' }}>{title}</div>
      <div style={{ fontSize: '12px', opacity: 0.8 }}>{change}</div>
    </div>
  );
}

function AnalysisItem({ icon, label, value, color }) {
  return (
    <div style={{
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '12px',
      borderRadius: '8px',
      background: '#f9fafb'
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
        <span style={{ fontSize: '20px' }}>{icon}</span>
        <span style={{ fontSize: '14px', color: '#4b5563' }}>{label}</span>
      </div>
      <span style={{
        fontSize: '16px',
        fontWeight: 'bold',
        color,
        padding: '4px 12px',
        borderRadius: '6px',
        background: `${color}15`
      }}>
        {value}
      </span>
    </div>
  );
}

function TodoItem({ todo, onToggle, onDelete }) {
  const priorityColors = {
    high: '#ef4444',
    medium: '#f59e0b',
    low: '#10b981'
  };

  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      gap: '12px',
      padding: '12px',
      marginBottom: '10px',
      borderRadius: '8px',
      background: '#f9fafb',
      border: '1px solid #e5e7eb'
    }}>
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={onToggle}
        style={{
          width: '18px',
          height: '18px',
          cursor: 'pointer',
          accentColor: '#667eea'
        }}
      />
      <span style={{
        flex: 1,
        fontSize: '14px',
        color: todo.completed ? '#9ca3af' : '#1f2937',
        textDecoration: todo.completed ? 'line-through' : 'none'
      }}>
        {todo.task}
      </span>
      <span style={{
        padding: '2px 8px',
        borderRadius: '4px',
        fontSize: '11px',
        fontWeight: '500',
        color: 'white',
        background: priorityColors[todo.priority]
      }}>
        {todo.priority}
      </span>
      <button
        onClick={onDelete}
        style={{
          padding: '4px 8px',
          background: '#fee2e2',
          color: '#ef4444',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer',
          fontSize: '12px'
        }}
      >
        🗑️
      </button>
    </div>
  );
}