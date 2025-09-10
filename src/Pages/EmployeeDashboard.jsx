import React, { useState,useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../components/AuthContext';
import axios from 'axios';

export default function EmployeeDashboard() {
  const { user } = useAuth();
   const [stats, setStats] = useState({
    totalApplications: 0,
    pendingApplications: 0,
    todayAppliedCount: 0,
  });
   useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const token = localStorage.getItem("token"); // assuming JWT is stored
        const res = await axios.get("https://ruwa-backend.onrender.com/api/employee/dash", {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (res.data.success) {
          setStats(res.data.dashboard);
        }
      } catch (err) {
        console.error("Error fetching dashboard:", err);
      } finally {
       
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
      color: 'primary',
      gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
    },
    {
      title: 'Applications',
      description: 'Review and process applications',
      icon: '📋',
      link: '/manage-applications',
      color: 'success',
      gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)'
    },
     {
      title: 'Attendance',
      description: 'Puch your daily attandance',
      icon: '🕒',
      link: '/employee-att',
      color: 'secondary',
      gradient: 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)'
    },
    {
      title: 'Reports',
      description: 'View analytics and reports',
      icon: '📊',
      link: '/employee-reports',
      color: 'info',
      gradient: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)'
    },
    {
      title: 'Profile',
      description: 'Update your profile information',
      icon: '👤',
      link: '/employee-profile',
      color: 'secondary',
      gradient: 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)'
    },
    {
      title: 'All Users',
      description: 'Check Users history',
      icon: '👤',
      link: '/employee-userhistory',
      color: 'secondary',
      gradient: 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)'
    },
    {
      title: 'Settings',
      description: 'Manage system settings',
      icon: '⚙️',
      link: '/employee-settings',
      color: 'warning',
      gradient: 'linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)'
    },
    {
      title: 'Help Center',
      description: 'Get support and documentation',
      icon: '❓',
      link: '/help-center',
      color: 'dark',
      gradient: 'linear-gradient(135deg, #c3cfe2 0%, #c3cfe2 100%)'
    },
   
  ];

  const getCurrentGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good Morning';
    if (hour < 17) return 'Good Afternoon';
    return 'Good Evening';
  };

  return (
    <>
      <div className="dashboard-container ">
        <div className="container-fluid py-4">
          <div className="row">
            <div className="col-12">
              {/* Enhanced Welcome Header */}
              <div className="welcome-card">
                <div className="welcome-overlay">
                  <div className="row align-items-center">
                    <div className="col-lg-8 col-md-7">
                      <div className="welcome-content">
                        <div className="greeting-badge">
                          {getCurrentGreeting()} 👋
                        </div>
                        <h1 className="welcome-title">
                          {user?.name || 'Employee'}
                        </h1>
                        <p className="welcome-subtitle">
                          Ready to make a difference today? Here's your dashboard overview.
                        </p>
                        <div className="employee-meta">
                          <span className="meta-item">
                            <i className="fas fa-id-badge me-2"></i>
                            ID: {user?.employeeId || 'N/A'}
                          </span>
                          <span className="meta-item">
                            <i className="fas fa-user-tag me-2"></i>
                            Role: {user?.role}
                          </span>
                          <span className="meta-item">
                            <i className="fas fa-clock me-2"></i>
                            Last login: {new Date().toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-4 col-md-5 text-center">
                      <div className="profile-section">
                        <div className="profile-image-container">
                          <img
                            src={user?.profile_pic || 'https://randomuser.me/api/portraits/men/75.jpg'}
                            alt="Employee"
                            className="profile-image"
                          />
                          <div className="online-indicator"></div>
                        </div>
                        <div className="profile-stats mt-3">
                          <div className="stat-item">
                            <span className="stat-number">98%</span>
                            <span className="stat-label">Performance</span>
                          </div>
                          <div className="stat-item">
                            <span className="stat-number">156</span>
                            <span className="stat-label">Tasks Done</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Enhanced Stats Cards */}
              <div className="row d-flex justify-content-evenly mb-5">

                <div className="col-xl-3 col-lg-6 col-md-6 mb-4">
                  <div className="stats-card stats-primary">
                    <div className="stats-content">
                      <div className="stats-icon">
                        <i className="fas fa-users"></i>
                      </div>
                      <div className="stats-info">
                        <h3 className="stats-number" data-count="1234">{stats.totalApplications}</h3>
                        <p className="stats-text">Total Users</p>
                        <div className="stats-progress">
                          <span className="progress-indicator">+12% from last month</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="col-xl-3 col-lg-6 col-md-6 mb-4">
                  <div className="stats-card stats-success">
                    <div className="stats-content">
                      <div className="stats-icon">
                        <i className="fas fa-file-alt"></i>
                      </div>
                      <div className="stats-info">
                        <h3 className="stats-number" data-count="89">{stats.pendingApplications}</h3>
                        <p className="stats-text">Pending Applications</p>
                        <div className="stats-progress">
                          <span className="progress-indicator">-5% from yesterday</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="col-xl-3 col-lg-6 col-md-6 mb-4">
                  <div className="stats-card stats-warning">
                    <div className="stats-content">
                      <div className="stats-icon">
                        <i className="fas fa-check-circle"></i>
                      </div>
                      <div className="stats-info">
                        <h3 className="stats-number" data-count="156">{stats.todayAppliedCount}</h3>
                        <p className="stats-text">Approved Today</p>
                        <div className="stats-progress">
                          <span className="progress-indicator">+23% from yesterday</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* <div className="col-xl-3 col-lg-6 col-md-6 mb-4">
                  <div className="stats-card stats-info">
                    <div className="stats-content">
                      <div className="stats-icon">
                        <i className="fas fa-user-tie"></i>
                      </div>
                      <div className="stats-info">
                        <h3 className="stats-number" data-count="23">23</h3>
                        <p className="stats-text">Active Employees</p>
                        <div className="stats-progress">
                          <span className="progress-indicator">All online now</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div> */}
              </div>

              {/* Enhanced Dashboard Cards */}
              <div className="row">
                <div className="col-12 mb-4">
                  <div className="section-header">
                    <h2 className="section-title">Quick Actions</h2>
                    <p className="section-subtitle">Access your most used tools and features</p>
                  </div>
                </div>
                
                {dashboardCards.map((card, index) => (
                  <div key={index} className="col-xxl-4 col-xl-4 col-lg-6 col-md-6 mb-4">
                    <Link to={card.link} className="text-decoration-none">
                      <div className="action-card" style={{ '--gradient': card.gradient }}>
                        <div className="card-background"></div>
                        <div className="card-content">
                          <div className="card-icon">
                            <span className="icon-emoji">{card.icon}</span>
                          </div>
                          <div className="card-info">
                            <h4 className="card-title">{card.title}</h4>
                            <p className="card-description">{card.description}</p>
                          </div>
                          <div className="card-arrow">
                            <i className="fas fa-arrow-right"></i>
                          </div>
                        </div>
                      </div>
                    </Link>
                  </div>
                ))}
              </div>

              {/* Enhanced Recent Activity */}
              <div className="row mt-5">
                <div className="col-lg-8 mb-4">
                  <div className="activity-card">
                    <div className="card-header-custom">
                      <div className="header-content">
                        <h3 className="header-title">Recent Activity</h3>
                        <span className="header-badge">Live</span>
                      </div>
                      <button className="btn btn-outline-primary btn-sm">View All</button>
                    </div>
                    <div className="activity-list">
                      <div className="activity-item">
                        <div className="activity-avatar bg-primary">
                          <i className="fas fa-user-plus"></i>
                        </div>
                        <div className="activity-content">
                          <h6 className="activity-title">New user registration</h6>
                          <p className="activity-description">John Doe registered for Arogya Card</p>
                          <span className="activity-time">2 minutes ago</span>
                        </div>
                        <div className="activity-status status-new">New</div>
                      </div>
                      
                      <div className="activity-item">
                        <div className="activity-avatar bg-success">
                          <i className="fas fa-check"></i>
                        </div>
                        <div className="activity-content">
                          <h6 className="activity-title">Application approved</h6>
                          <p className="activity-description">Ambulance service application processed</p>
                          <span className="activity-time">15 minutes ago</span>
                        </div>
                        <div className="activity-status status-approved">Approved</div>
                      </div>
                      
                      <div className="activity-item">
                        <div className="activity-avatar bg-info">
                          <i className="fas fa-cog"></i>
                        </div>
                        <div className="activity-content">
                          <h6 className="activity-title">System update</h6>
                          <p className="activity-description">Database backup completed successfully</p>
                          <span className="activity-time">1 hour ago</span>
                        </div>
                        <div className="activity-status status-system">System</div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="col-lg-4 mb-4">
                  <div className="quick-stats-card">
                    <div className="card-header-custom">
                      <h3 className="header-title">Today's Summary</h3>
                    </div>
                    <div className="quick-stats-content">
                      <div className="quick-stat-item">
                        <div className="stat-icon bg-primary">
                          <i className="fas fa-tasks"></i>
                        </div>
                        <div className="stat-content">
                          <span className="stat-number">12</span>
                          <span className="stat-label">Tasks Completed</span>
                        </div>
                      </div>
                      
                      <div className="quick-stat-item">
                        <div className="stat-icon bg-success">
                          <i className="fas fa-clock"></i>
                        </div>
                        <div className="stat-content">
                          <span className="stat-number">7h 30m</span>
                          <span className="stat-label">Hours Worked</span>
                        </div>
                      </div>
                      
                      <div className="quick-stat-item">
                        <div className="stat-icon bg-warning">
                          <i className="fas fa-bell"></i>
                        </div>
                        <div className="stat-content">
                          <span className="stat-number">3</span>
                          <span className="stat-label">Notifications</span>
                        </div>
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
          padding: 2.5rem;
          position: relative;
          z-index: 2;
        }

        .welcome-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 1000"><polygon fill="%23ffffff08" points="0,1000 1000,0 1000,1000"/></svg>');
          z-index: 1;
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
          font-size: 2.5rem;
          font-weight: 700;
          margin-bottom: 0.5rem;
          background: linear-gradient(45deg, #ffffff, #f8f9ff);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .welcome-subtitle {
          font-size: 1.1rem;
          opacity: 0.9;
          margin-bottom: 1.5rem;
        }

        .employee-meta {
          display: flex;
          flex-wrap: wrap;
          gap: 1.5rem;
        }

        .meta-item {
          display: flex;
          align-items: center;
          font-size: 0.9rem;
          opacity: 0.9;
        }

        .profile-section {
          position: relative;
        }

        .profile-image-container {
          position: relative;
          display: inline-block;
        }

        .profile-image {
          width: 120px;
          height: 120px;
          border-radius: 50%;
          object-fit: cover;
          border: 4px solid rgba(255, 255, 255, 0.3);
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
        }

        .online-indicator {
          position: absolute;
          bottom: 5px;
          right: 5px;
          width: 20px;
          height: 20px;
          background: #4ade80;
          border: 3px solid white;
          border-radius: 50%;
          animation: pulse 2s infinite;
        }

        @keyframes pulse {
          0% { box-shadow: 0 0 0 0 rgba(74, 222, 128, 0.4); }
          70% { box-shadow: 0 0 0 10px rgba(74, 222, 128, 0); }
          100% { box-shadow: 0 0 0 0 rgba(74, 222, 128, 0); }
        }

        .profile-stats {
          display: flex;
          gap: 1.5rem;
          justify-content: center;
        }

        .stat-item {
          text-align: center;
        }

        .stat-number {
          display: block;
          font-size: 1.5rem;
          font-weight: 700;
          color: white;
        }

        .stat-label {
          font-size: 0.8rem;
          opacity: 0.8;
          color: white;
        }

        .stats-card {
          background: white;
          border-radius: 16px;
          padding: 1.5rem;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
          border: none;
          transition: all 0.3s ease;
          position: relative;
          overflow: hidden;
        }

        .stats-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 4px;
          height: 100%;
          background: var(--accent-color);
        }

        .stats-primary { --accent-color: #3b82f6; }
        .stats-success { --accent-color: #10b981; }
        .stats-warning { --accent-color: #f59e0b; }
        .stats-info { --accent-color: #06b6d4; }

        .stats-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 10px 40px rgba(0, 0, 0, 0.15);
        }

        .stats-content {
          display: flex;
          align-items: center;
          gap: 1rem;
        }

        .stats-icon {
          width: 60px;
          height: 60px;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.5rem;
          color: var(--accent-color);
          background: rgba(var(--accent-rgb), 0.1);
        }

        .stats-primary .stats-icon { background: rgba(59, 130, 246, 0.1); }
        .stats-success .stats-icon { background: rgba(16, 185, 129, 0.1); }
        .stats-warning .stats-icon { background: rgba(245, 158, 11, 0.1); }
        .stats-info .stats-icon { background: rgba(6, 182, 212, 0.1); }

        .stats-number {
          font-size: 2rem;
          font-weight: 700;
          color: #1f2937;
          margin-bottom: 0.25rem;
        }

        .stats-text {
          font-size: 0.9rem;
          color: #6b7280;
          margin-bottom: 0.5rem;
        }

        .progress-indicator {
          font-size: 0.8rem;
          color: var(--accent-color);
          font-weight: 500;
        }

        .section-header {
          text-align: center;
          margin-bottom: 2rem;
        }

        .section-title {
          font-size: 2rem;
          font-weight: 700;
          color: #1f2937;
          margin-bottom: 0.5rem;
        }

        .section-subtitle {
          color: #6b7280;
          font-size: 1.1rem;
        }

        .action-card {
          background: white;
          border-radius: 20px;
          padding: 0;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
          border: none;
          transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
          position: relative;
          overflow: hidden;
          height: 140px;
        }

        .action-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: var(--gradient);
          opacity: 0;
          transition: all 0.3s ease;
        }

        .action-card:hover::before {
          opacity: 0.1;
        }

        .action-card:hover {
          transform: translateY(-8px) scale(1.02);
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
        }

        .card-content {
          padding: 1.5rem;
          position: relative;
          z-index: 2;
          height: 100%;
          display: flex;
          align-items: center;
          gap: 1rem;
        }

        .card-icon {
          flex-shrink: 0;
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
          margin-bottom: 0.5rem;
        }

        .card-description {
          color: #6b7280;
          font-size: 0.9rem;
          margin: 0;
        }

        .card-arrow {
          flex-shrink: 0;
          color: #9ca3af;
          transition: all 0.3s ease;
        }

        .action-card:hover .card-arrow {
          color: #3b82f6;
          transform: translateX(5px);
        }

        .activity-card, .quick-stats-card {
          background: white;
          border-radius: 20px;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
          border: none;
        }

        .card-header-custom {
          padding: 1.5rem 1.5rem 0;
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 1.5rem;
        }

        .header-content {
          display: flex;
          align-items: center;
          gap: 1rem;
        }

        .header-title {
          font-size: 1.3rem;
          font-weight: 600;
          color: #1f2937;
          margin: 0;
        }

        .header-badge {
          background: linear-gradient(45deg, #10b981, #34d399);
          color: white;
          padding: 0.25rem 0.75rem;
          border-radius: 20px;
          font-size: 0.8rem;
          font-weight: 500;
          animation: pulse 2s infinite;
        }

        .activity-list {
          padding: 0 1.5rem 1.5rem;
        }

        .activity-item {
          display: flex;
          align-items: center;
          gap: 1rem;
          padding: 1rem 0;
          border-bottom: 1px solid #f3f4f6;
        }

        .activity-item:last-child {
          border-bottom: none;
        }

        .activity-avatar {
          width: 40px;
          height: 40px;
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          font-size: 0.9rem;
          flex-shrink: 0;
        }

        .activity-content {
          flex-grow: 1;
        }

        .activity-title {
          font-size: 0.95rem;
          font-weight: 600;
          color: #1f2937;
          margin-bottom: 0.25rem;
        }

        .activity-description {
          font-size: 0.85rem;
          color: #6b7280;
          margin-bottom: 0.25rem;
        }

        .activity-time {
          font-size: 0.8rem;
          color: #9ca3af;
        }

        .activity-status {
          padding: 0.25rem 0.75rem;
          border-radius: 20px;
          font-size: 0.8rem;
          font-weight: 500;
          flex-shrink: 0;
        }

        .status-new { background: #dbeafe; color: #1d4ed8; }
        .status-approved { background: #dcfce7; color: #166534; }
        .status-system { background: #e0f2fe; color: #0369a1; }

        .quick-stats-content {
          padding: 0 1.5rem 1.5rem;
        }

        .quick-stat-item {
          display: flex;
          align-items: center;
          gap: 1rem;
          padding: 1rem 0;
          border-bottom: 1px solid #f3f4f6;
        }

        .quick-stat-item:last-child {
          border-bottom: none;
        }

        .stat-icon {
          width: 40px;
          height: 40px;
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          font-size: 0.9rem;
        }

        .stat-content {
          display: flex;
          flex-direction: column;
        }

        .stat-content .stat-number {
          font-size: 1.1rem;
          font-weight: 600;
          color: #1f2937;
        }

        .stat-content .stat-label {
          font-size: 0.8rem;
          color: #6b7280;
        }

        @media (max-width: 768px) {
          .welcome-title {
            font-size: 2rem;
          }
          
          .employee-meta {
            flex-direction: column;
            gap: 0.5rem;
          }
          
          .profile-stats {
            gap: 1rem;
          }
          
          .stats-content {
            flex-direction: column;
            text-align: center;
            gap: 1rem;
          }
          
          .card-content {
            flex-direction: column;
            text-align: center;
            height: auto;
          }
          
          .action-card {
            height: auto;
          }
        }
          .dashboard-container {
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
  min-height: 100vh;
  padding: 0;
  width: 100%;
  overflow-x: hidden; /* 🚀 Prevents page sliding horizontally */
}

.stats-card .d-flex {
  flex-wrap: wrap; /* 🚀 Allow content to wrap */
  justify-content: space-between;
}

.stats-card .fw-bold {
  max-width: 100%;
  text-align: right;
}

/* Attendance Table */
.table-responsive {
  width: 100%;
  overflow-x: auto; /* 🚀 Scroll only inside table, not page */
}

@media (max-width: 768px) {
  .stats-card .d-flex {
    flex-direction: column;
    align-items: flex-start;
  }
  .stats-card .fw-bold {
    margin-top: 4px;
    font-size: 0.85rem;
  }
  .table {
    font-size: 0.85rem;
  }
}

@media (max-width: 576px) {
  .current-time {
    font-size: 1.8rem;
  }
  .card-body.py-5 {
    padding: 2rem 1rem !important;
  }
  .badge {
    font-size: 0.7rem;
  }
}
@media (max-width: 576px) {
  .stats-card .d-flex {
    flex-direction: column;     /* stack vertically */
    align-items: flex-start;
  }
  .stats-card .fw-bold {
    text-align: left;
    font-size: 0.9rem;          /* slightly smaller */
  }
}
      `}</style>
    </>
  );
}