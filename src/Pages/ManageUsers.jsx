
import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function ManageUsers() {
  const [users, setUsers] = useState([]);
  const [todayUsers, setTodayUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [showAddUserModal, setShowAddUserModal] = useState(false);
  const [newUser, setNewUser] = useState({
    name: '',
    phone: '',
    email: '',
    age: '',
    aadhar: '',
    purpose: '',
    status: 'active'
  });
  const usersPerPage = 10;

  // API Base URL - adjust according to your backend
  const API_BASE_URL = 'https://ruwa-backend.onrender.com/api/employee';

  // Fetch users from backend API
  const fetchUsers = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token'); // Adjust based on your token storage
      
      const response = await axios.get(`${API_BASE_URL}/get/patient`, {
        headers: {
          'Authorization': `Bearer ${token}`,
         
        }
      });
      
      if (response.data.success) {
        const allUsers = response.data.users || [];
        setUsers(allUsers);
        
        // Filter today's users
        const today = new Date().toISOString().split('T')[0];
        const todayUsersList = allUsers.filter(user => 
          user.joinDate && user.joinDate.split('T')[0] === today
        );
        setTodayUsers(todayUsersList);
      }
    } catch (error) {
      console.error('Error fetching users:', error);
      // Fallback to mock data if API fails
      
      
     
    } finally {
      setLoading(false);
    }
  };

  // Mock data fallback
  

  useEffect(() => {
    fetchUsers();
  }, []);

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewUser(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Add user to backend API
  const handleAddUser = async (e) => {
    e.preventDefault();
    
    try {
      const token = localStorage.getItem('token');
      const userToAdd = {
        ...newUser,
        age: parseInt(newUser.age),
        joinDate: new Date().toISOString(),
        applications: 0,
        profilePic: `https://randomuser.me/api/portraits/${Math.random() > 0.5 ? 'men' : 'women'}/${Math.floor(Math.random() * 50) + 1}.jpg`
      };

      const response = await axios.post(`${API_BASE_URL}/create/patient`, userToAdd, {
        headers: {
          'Authorization': `Bearer ${token}`,
        }
      });

      if (response.data.success) {
        const addedUser = response.data.user;
        
       
        
        // Check if user was added today
        const today = new Date().toISOString().split('T')[0];
        if (addedUser.joinDate && addedUser.joinDate.split('T')[0] === today) {
          setTodayUsers([...todayUsers, addedUser]);
        }

        setShowAddUserModal(false);
        setNewUser({
          name: '',
          phone: '',
          email: '',
          age: '',
          aadhar: '',
          purpose: '',
          status: 'active'
        });

        alert(`User ${addedUser.name} added successfully and notified admin!`);
        
        // Notify admin (simulated API call)
        // await notifyAdmin(addedUser);
      }
    } catch (error) {
      console.error('Error adding user:', error);
      alert('Failed to add user. Please try again.');
    }
  };

  // Notify admin about new user
  const notifyAdmin = async (user) => {
    try {
      const token = localStorage.getItem('authToken');
      await axios.post(`${API_BASE_URL}/notify/admin`, {
        message: `New user registered: ${user.name}`,
        user: user,
        timestamp: new Date().toISOString()
      }, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
    } catch (error) {
      console.error('Error notifying admin:', error);
    }
  };

  // Update user status in backend
  const handleStatusChange = async (userId, newStatus) => {
    try {
      const token = localStorage.getItem('authToken');
      
      const response = await axios.patch(`${API_BASE_URL}/users/${userId}/status`, {
        status: newStatus
      }, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (response.data.success) {
        setUsers(users.map(user => 
          user.id === userId ? { ...user, status: newStatus } : user
        ));
        
        setTodayUsers(todayUsers.map(user => 
          user.id === userId ? { ...user, status: newStatus } : user
        ));
        
        alert(`User status updated to ${newStatus}`);
      }
    } catch (error) {
      console.error('Error updating user status:', error);
      alert('Failed to update user status.');
    }
  };

  // Delete user from backend
  const handleDeleteUser = async (userId) => {
    if (!window.confirm('Are you sure you want to delete this user?')) {
      return;
    }

    try {
      const token = localStorage.getItem('authToken');
      
      const response = await axios.delete(`${API_BASE_URL}/users/${userId}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (response.data.success) {
        setUsers(users.filter(user => user.id !== userId));
        setTodayUsers(todayUsers.filter(user => user.id !== userId));
        alert('User deleted successfully');
      }
    } catch (error) {
      console.error('Error deleting user:', error);
      alert('Failed to delete user.');
    }
  };

  // Filter and search logic for today's users
  const filteredTodayUsers = todayUsers.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.phone.includes(searchTerm) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'all' || user.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  // Pagination logic for today's users
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = filteredTodayUsers.slice(indexOfFirstUser, indexOfLastUser);
  const totalPages = Math.ceil(filteredTodayUsers.length / usersPerPage);

  const getStatusBadge = (status) => {
    const badges = {
      active: 'status-active',
      inactive: 'status-inactive',
      pending: 'status-pending',
      suspended: 'status-suspended'
    };
    return badges[status] || 'status-inactive';
  };

  if (loading) {
    return (
      <div className="container py-5">
        <div className="text-center">
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <p className="mt-2">Loading users...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="dashboard-container">
      <div className="container-fluid py-4">
        <div className="row">
          <div className="col-12">
            {/* Header */}
            <div className="d-flex justify-content-between align-items-center mb-4">
              <div>
                <h2 className="section-title">Today's Users</h2>
                <p className="section-subtitle">
                  Total today's users: {todayUsers.length} | 
                  All users: {users.length}
                </p>
              </div>
              <div className="btn-group">
                <button 
                  className="btn btn-primary"
                  onClick={() => setShowAddUserModal(true)}
                >
                  <i className="fas fa-plus me-2"></i>
                  Add User
                </button>
                <button className="btn btn-outline-secondary" onClick={fetchUsers}>
                  <i className="fas fa-sync-alt me-2"></i>
                  Refresh
                </button>
              </div>
            </div>

            {/* Today's Stats Cards */}
            {/* <div className="row mb-4">
              <div className="col-xl-3 col-lg-6 col-md-6 mb-4">
                <div className="stats-card stats-primary">
                  <div className="stats-content">
                    <div className="stats-icon">
                      <i className="fas fa-user-check"></i>
                    </div>
                    <div className="stats-info">
                      <h3 className="stats-number">{todayUsers.filter(u => u.status === 'active').length}</h3>
                      <p className="stats-text">Active Today</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="col-xl-3 col-lg-6 col-md-6 mb-4">
                <div className="stats-card stats-warning">
                  <div className="stats-content">
                    <div className="stats-icon">
                      <i className="fas fa-user-clock"></i>
                    </div>
                    <div className="stats-info">
                      <h3 className="stats-number">{todayUsers.filter(u => u.status === 'pending').length}</h3>
                      <p className="stats-text">Pending Today</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="col-xl-3 col-lg-6 col-md-6 mb-4">
                <div className="stats-card stats-success">
                  <div className="stats-content">
                    <div className="stats-icon">
                      <i className="fas fa-users"></i>
                    </div>
                    <div className="stats-info">
                      <h3 className="stats-number">{todayUsers.length}</h3>
                      <p className="stats-text">Total Today</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="col-xl-3 col-lg-6 col-md-6 mb-4">
                <div className="stats-card stats-info  stats-primary">
                  <div className="stats-content">
                    <div className="stats-icon">
                      <i className="fas fa-calendar-day"></i>
                    </div>
                    <div className="stats-info">
                      <h3 className="stats-number">{new Date().toLocaleDateString()}</h3>
                      <p className="stats-text">Today's Date</p>
                    </div>
                  </div>
                </div>
              </div>
            </div> */}
            <div className="row mb-4">
  {/* Active Today */}
  <div className="col-xl-3 col-lg-6 col-md-6 mb-4">
    <div className="stats-card stats-primary">
      <div className="stats-content">
        <div className="stats-icon">
          <i className="fas fa-user-check"></i> {/* Active user */}
        </div>
        <div className="stats-info">
          <h3 className="stats-number">{todayUsers.filter(u => u.status === 'active').length}</h3>
          <p className="stats-text">Active Today</p>
        </div>
      </div>
    </div>
  </div>

  {/* Pending Today */}
  <div className="col-xl-3 col-lg-6 col-md-6 mb-4">
    <div className="stats-card stats-warning">
      <div className="stats-content">
        <div className="stats-icon">
          <i className="fas fa-hourglass-half"></i> {/* Pending / waiting */}
        </div>
        <div className="stats-info">
          <h3 className="stats-number">{todayUsers.filter(u => u.status === 'pending').length}</h3>
          <p className="stats-text">Pending Today</p>
        </div>
      </div>
    </div>
  </div>

  {/* Total Today */}
  <div className="col-xl-3 col-lg-6 col-md-6 mb-4">
    <div className="stats-card stats-success">
      <div className="stats-content">
        <div className="stats-icon">
          <i className="fas fa-users"></i> {/* Total users */}
        </div>
        <div className="stats-info">
          <h3 className="stats-number">{todayUsers.length}</h3>
          <p className="stats-text">Total Today</p>
        </div>
      </div>
    </div>
  </div>

  {/* Today's Date */}
  <div className="col-xl-3 col-lg-6 col-md-6 mb-4">
    <div className="stats-card stats-info stats-primary">
      <div className="stats-content">
        <div className="stats-icon">
          <i className="fas fa-calendar-alt"></i> {/* Date */}
        </div>
        <div className="stats-info">
          <h3 className="stats-number">{new Date().toLocaleDateString()}</h3>
          <p className="stats-text">Today's Date</p>
        </div>
      </div>
    </div>
  </div>
</div>  

            {/* Filters and Search */}
            <div className="card mb-4 user-filters-card">
              <div className="card-body">
                <div className="row g-3 align-items-center">
                  <div className="col-md-6">
                    <label className="form-label">Search Today's Users</label>
                    <div className="input-group search-input-group">
                      <span className="input-group-text">
                        <i className="fas fa-search"></i>
                      </span>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Search by name, phone, or email..."
                        value={searchTerm}
                        onChange={(e) => {
                          setSearchTerm(e.target.value);
                          setCurrentPage(1);
                        }}
                      />
                    </div>
                  </div>
                  <div className="col-md-3">
                    <label className="form-label">Filter by Status</label>
                    <select
                      className="form-select"
                      value={filterStatus}
                      onChange={(e) => {
                        setFilterStatus(e.target.value);
                        setCurrentPage(1);
                      }}
                    >
                      <option value="all">All Status</option>
                      <option value="active">Active</option>
                      <option value="inactive">Inactive</option>
                      <option value="pending">Pending</option>
                      <option value="suspended">Suspended</option>
                    </select>
                  </div>
                  <div className="col-md-3">
                    <label className="form-label">&nbsp;</label>
                    <button 
                      className="btn btn-outline-secondary w-100"
                      onClick={() => {
                        setSearchTerm('');
                        setFilterStatus('all');
                        setCurrentPage(1);
                      }}
                    >
                      <i className="fas fa-undo me-2"></i>
                      Clear Filters
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Users Table - Showing only today's users */}
           <div className="card user-table-card">
              <div className="card-body">
                <div className="table-responsive">
                  <table className="table table-hover">
                    <thead>
                      <tr>
                        <th>ID</th>
                        <th>User</th>
                        <th>Contact</th>
                        <th>Aadhar</th>
                        <th>Purpose</th>
                        <th>Status</th>
                        <th>Join Time</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {currentUsers.length > 0 ? (
                        currentUsers.map((user) => (
                          <tr key={user.id} className="user-table-row">
                            <td>#{user.id}</td>
                            <td>
                              <div className="d-flex align-items-center">
                                <div className="user-avatar-container me-3">
                                  <img
                                    src={user.profilePic}
                                    alt={user.name}
                                    className="user-avatar"
                                  />
                                </div>
                                <div>
                                  <div className="fw-bold">{user.name}</div>
                                  <small className="text-muted">Age: {user.age}</small>
                                </div>
                              </div>
                            </td>
                            <td>
                              <div>
                                <div>{user.phone}</div>
                                <small className="text-muted">{user.email}</small>
                              </div>
                            </td>
                            <td>{user.aadhar}</td>
                            <td>{user.purpose}</td>
                            <td>
                              <span className={`status-badge ${getStatusBadge(user.status)}`}>
                                {user.status.charAt(0).toUpperCase() + user.status.slice(1)}
                              </span>
                            </td>
                            <td>
                              {user.joinDate ? new Date(user.joinDate).toLocaleTimeString() : 'N/A'}
                            </td>
                            <td>
                              <div className="btn-group btn-group-sm">
                                {/* <button
                                  className="btn btn-outline-primary"
                                  title="View Details"
                                >
                                  <i className="fas fa-eye"></i>
                                </button> */}
                                <div className="dropdown">
                                  {/* <button
                                    className="btn btn-outline-secondary dropdown-toggle"
                                    data-bs-toggle="dropdown"
                                    title="Change Status"
                                  >
                                    <i className="fas fa-edit"></i>
                                  </button> */}
                                  <ul className="dropdown-menu">
                                    <li>
                                      <button
                                        className="dropdown-item"
                                        onClick={() => handleStatusChange(user.id, 'active')}
                                      >
                                        <i className="fas fa-check text-success me-2"></i>
                                        Set Active
                                      </button>
                                    </li>
                                    <li>
                                      <button
                                        className="dropdown-item"
                                        onClick={() => handleStatusChange(user.id, 'inactive')}
                                      >
                                        <i className="fas fa-pause text-secondary me-2"></i>
                                        Set Inactive
                                      </button>
                                    </li>
                                    <li>
                                      <button
                                        className="dropdown-item"
                                        onClick={() => handleStatusChange(user.id, 'pending')}
                                      >
                                        <i className="fas fa-clock text-warning me-2"></i>
                                        Set Pending
                                      </button>
                                    </li>
                                    <li>
                                      <button
                                        className="dropdown-item"
                                        onClick={() => handleStatusChange(user.id, 'suspended')}
                                      >
                                        <i className="fas fa-ban text-danger me-2"></i>
                                        Suspend
                                      </button>
                                    </li>
                                  </ul>
                                </div>
                                <button
                                  className="btn btn-outline-danger"
                                  onClick={() => handleDeleteUser(user.id)}
                                  title="Delete User"
                                >
                                  <i className="fas fa-trash"></i>
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan="8" className="text-center py-4">
                            <div className="text-muted">
                              <i className="fas fa-users fa-3x mb-3 d-block"></i>
                              {todayUsers.length === 0 ? 
                                "No users registered today" : 
                                "No users found matching your criteria"
                              }
                            </div>
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                  <nav aria-label="Users pagination">
                    <ul className="pagination justify-content-center mt-4">
                      <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                        <button
                          className="page-link"
                          onClick={() => setCurrentPage(currentPage - 1)}
                          disabled={currentPage === 1}
                        >
                          <i className="fas fa-chevron-left"></i>
                        </button>
                      </li>
                      
                      {Array.from({ length: totalPages }, (_, index) => (
                        <li
                          key={index + 1}
                          className={`page-item ${currentPage === index + 1 ? 'active' : ''}`}
                        >
                          <button
                            className="page-link"
                            onClick={() => setCurrentPage(index + 1)}
                          >
                            {index + 1}
                          </button>
                        </li>
                      ))}
                      
                      <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                        <button
                          className="page-link"
                          onClick={() => setCurrentPage(currentPage + 1)}
                          disabled={currentPage === totalPages}
                        >
                          <i className="fas fa-chevron-right"></i>
                        </button>
                      </li>
                    </ul>
                  </nav>
                )}
              </div>
            </div> 
          </div>
        </div>
      </div>

      {/* Add User Modal */}
      {showAddUserModal && (
        <div className="modal show d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog modal-lg modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header bg-primary text-white">
                <h5 className="modal-title">
                  <i className="fas fa-user-plus me-2"></i>
                  Add New User
                </h5>
                <button
                  type="button"
                  className="btn-close btn-close-white"
                  onClick={() => setShowAddUserModal(false)}
                ></button>
              </div>
              <div className="modal-body">
                <form onSubmit={handleAddUser}>
                  <div className="row">
                    <div className="col-md-6 mb-3">
                      <label className="form-label">Full Name *</label>
                      <input
                        type="text"
                        className="form-control"
                        name="name"
                        value={newUser.name}
                        onChange={handleInputChange}
                        required
                        placeholder="Enter full name"
                      />
                    </div>
                    <div className="col-md-6 mb-3">
                      <label className="form-label">Phone Number *</label>
                      <input
                        type="tel"
                        className="form-control"
                        name="phone"
                        value={newUser.phone}
                        onChange={handleInputChange}
                        required
                        placeholder="+91 1234567890"
                      />
                    </div>
                    <div className="col-md-6 mb-3">
                      <label className="form-label">Email Address *</label>
                      <input
                        type="email"
                        className="form-control"
                        name="email"
                        value={newUser.email}
                        onChange={handleInputChange}
                        required
                        placeholder="user@example.com"
                      />
                    </div>
                    <div className="col-md-6 mb-3">
                      <label className="form-label">Age *</label>
                      <input
                        type="number"
                        className="form-control"
                        name="age"
                        value={newUser.age}
                        onChange={handleInputChange}
                        required
                        min="18"
                        max="100"
                        placeholder="Enter age"
                      />
                    </div>
                    <div className="col-md-6 mb-3">
                      <label className="form-label">Aadhar Number *</label>
                      <input
                        type="text"
                        className="form-control"
                        name="aadhar"
                        value={newUser.aadhar}
                        onChange={handleInputChange}
                        required
                        placeholder="1234-5678-9012"
                        pattern="[0-9]{4}-[0-9]{4}-[0-9]{4}"
                      />
                    </div>
                    <div className="col-md-6 mb-3">
                      <label className="form-label">Purpose of Visit *</label>
                      <select
                        className="form-select"
                        name="purpose"
                        value={newUser.purpose}
                        onChange={handleInputChange}
                        required
                      >
                        <option value="">Select Purpose</option>
                        <option value="Job Application">Job Application</option>
                        <option value="Service Inquiry">Service Inquiry</option>
                        <option value="Complaint">Complaint</option>
                        <option value="Meeting">Meeting</option>
                        <option value="Delivery">Delivery</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>
                    <div className="col-md-6 mb-3">
                      <label className="form-label">Status *</label>
                      <select
                        className="form-select"
                        name="status"
                        value={newUser.status}
                        onChange={handleInputChange}
                        required
                      >
                        <option value="active">Active</option>
                        <option value="inactive">Inactive</option>
                        <option value="pending">Pending</option>
                        <option value="suspended">Suspended</option>
                      </select>
                    </div>
                    <div className="col-12 mb-3">
                      <div className="form-text">
                        * User will be automatically registered for today and admin will be notified
                      </div>
                    </div>
                  </div>
                  <div className="modal-footer">
                    <button
                      type="button"
                      className="btn btn-secondary"
                      onClick={() => setShowAddUserModal(false)}
                    >
                      Cancel
                    </button>
                    <button type="submit" className="btn btn-primary">
                      <i className="fas fa-user-plus me-2"></i>
                      Add User & Notify Admin
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        .dashboard-container {
          background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
          min-height: 100vh;
          padding: 0;
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
        
        .stats-card {
          background: white;
          border-radius: 16px;
          padding: 1.5rem;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
          border: none;
          transition: all 0.3s ease;
        }
        
        .stats-primary { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; }
        .stats-warning { background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%); color: white; }
        .stats-success { background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%); color: white; }
        // .stats-info { background: linear-gradient(135deg, #43e97b 0%, #38f9d7 100%); color: white; }






        
        
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
          background: rgba(255, 255, 255, 0.2);
        }
        
        .stats-number {
          font-size: 2rem;
          font-weight: 700;
          margin-bottom: 0.25rem;
        }
        
        .stats-text {
          font-size: 0.9rem;
          opacity: 0.9;
          margin-bottom: 0;
        }
        
        .user-filters-card {
          border-radius: 16px;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
          border: none;
        }
        
        .search-input-group .input-group-text {
          background: white;
          border-right: none;
        }
        
        .search-input-group .form-control {
          border-left: none;
        }
        
        .user-table-card {
          border-radius: 16px;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
          border: none;
        }
        
        .user-table-row:hover {
          background-color: #f8f9fa;
        }
        
        .user-avatar {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          object-fit: cover;
          border: 2px solid #fff;
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
        }
        
        .status-badge {
          padding: 0.35rem 0.75rem;
          border-radius: 50px;
          font-size: 0.75rem;
          font-weight: 600;
          text-transform: capitalize;
        }
        
        .status-active {
          background: rgba(16, 185, 129, 0.15);
          color: #065f46;
        }
        
        .status-inactive {
          background: rgba(107, 114, 128, 0.15);
          color: #374151;
        }
        
        .status-pending {
          background: rgba(245, 158, 11, 0.15);
          color: #92400e;
        }
        
        .status-suspended {
          background: rgba(239, 68, 68, 0.15);
          color: #991b1b;
        }
        
        .table th {
          border-top: none;
          font-weight: 600;
          color: #495057;
          background: #f8f9fa;
          padding: 1rem 0.75rem;
        }
        
        .table td {
          padding: 1rem 0.75rem;
          vertical-align: middle;
        }
        
        .btn-group-sm .btn {
          padding: 0.25rem 0.5rem;
          border-radius: 8px;
        }
        
        .page-link {
          border-color: #dee2e6;
          border-radius: 8px;
          margin: 0 3px;
        }
        
        .page-item.active .page-link {
          background-color: #3b82f6;
          border-color: #3b82f6;
        }
        
        .modal-content {
          border-radius: 16px;
          border: none;
          box-shadow: 0 10px 40px rgba(0, 0, 0, 0.3);
        }
        
        .modal-header {
          border-top-left-radius: 16px;
          border-top-right-radius: 16px;
          border-bottom: 1px solid #dee2e6;
        }
        
        .form-label {
          font-weight: 600;
          color: #374151;
          margin-bottom: 0.5rem;
        }
        
        .form-control:focus,
        .form-select:focus {
          border-color: #3b82f6;
          box-shadow: 0 0 0 0.2rem rgba(59, 130, 246, 0.25);
        }
        
        .form-text {
          font-size: 0.875rem;
          color: #6b7280;
        }
        
        @media (max-width: 768px) {
          .modal-dialog {
            margin: 1rem;
          }
          
          .stats-content {
            flex-direction: column;
            text-align: center;
            gap: 1rem;
          }
        }
      `}</style>
    </div>
  );
}