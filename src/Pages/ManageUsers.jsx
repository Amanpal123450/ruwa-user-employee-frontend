

// import React, { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';

// export default function ManageUsers() {
//   const [users, setUsers] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [filterStatus, setFilterStatus] = useState('all');
//   const [currentPage, setCurrentPage] = useState(1);
//   const usersPerPage = 10;

//   // Mock data - replace with actual API call
//   useEffect(() => {
//     // Simulate API call
//     setTimeout(() => {
//       const mockUsers = [
//         {
//           id: 1,
//           name: 'Rajesh Kumar',
//           phone: '+91 9876543210',
//           email: 'rajesh@example.com',
//           age: 32,
//           status: 'active',
//           joinDate: '2024-01-15',
//           applications: 3,
//           profilePic: 'https://randomuser.me/api/portraits/men/1.jpg'
//         },
//         {
//           id: 2,
//           name: 'Priya Sharma',
//           phone: '+91 8765432109',
//           email: 'priya@example.com',
//           age: 28,
//           status: 'active',
//           joinDate: '2024-02-20',
//           applications: 2,
//           profilePic: 'https://randomuser.me/api/portraits/women/2.jpg'
//         },
//         {
//           id: 3,
//           name: 'Amit Patel',
//           phone: '+91 7654321098',
//           email: 'amit@example.com',
//           age: 35,
//           status: 'inactive',
//           joinDate: '2024-01-10',
//           applications: 1,
//           profilePic: 'https://randomuser.me/api/portraits/men/3.jpg'
//         },
//         {
//           id: 4,
//           name: 'Sunita Verma',
//           phone: '+91 6543210987',
//           email: 'sunita@example.com',
//           age: 29,
//           status: 'pending',
//           joinDate: '2024-03-05',
//           applications: 0,
//           profilePic: 'https://randomuser.me/api/portraits/women/4.jpg'
//         },
//         {
//           id: 5,
//           name: 'Ravi Singh',
//           phone: '+91 5432109876',
//           email: 'ravi@example.com',
//           age: 41,
//           status: 'active',
//           joinDate: '2023-12-20',
//           applications: 5,
//           profilePic: 'https://randomuser.me/api/portraits/men/5.jpg'
//         }
//       ];
//       setUsers(mockUsers);
//       setLoading(false);
//     }, 1000);
//   }, []);

//   // Filter and search logic
//   const filteredUsers = users.filter(user => {
//     const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
//                          user.phone.includes(searchTerm) ||
//                          user.email.toLowerCase().includes(searchTerm.toLowerCase());
//     const matchesFilter = filterStatus === 'all' || user.status === filterStatus;
//     return matchesSearch && matchesFilter;
//   });

//   // Pagination logic
//   const indexOfLastUser = currentPage * usersPerPage;
//   const indexOfFirstUser = indexOfLastUser - usersPerPage;
//   const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);
//   const totalPages = Math.ceil(filteredUsers.length / usersPerPage);

//   const handleStatusChange = (userId, newStatus) => {
//     setUsers(users.map(user => 
//       user.id === userId ? { ...user, status: newStatus } : user
//     ));
//     alert(`User status updated to ${newStatus}`);
//   };

//   const handleDeleteUser = (userId) => {
//     if (window.confirm('Are you sure you want to delete this user?')) {
//       setUsers(users.filter(user => user.id !== userId));
//       alert('User deleted successfully');
//     }
//   };

//   const getStatusBadge = (status) => {
//     const badges = {
//       active: 'status-active',
//       inactive: 'status-inactive',
//       pending: 'status-pending',
//       suspended: 'status-suspended'
//     };
//     return badges[status] || 'status-inactive';
//   };

//   if (loading) {
//     return (
//       <div className="container py-5">
//         <div className="text-center">
//           <div className="spinner-border" role="status">
//             <span className="visually-hidden">Loading...</span>
//           </div>
//           <p className="mt-2">Loading users...</p>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="dashboard-container">
//       <div className="container-fluid py-4">
//         <div className="row">
//           <div className="col-12">
//             {/* Header */}
//             <div className="d-flex justify-content-between align-items-center mb-4">
//               <div>
//                 <h2 className="section-title">Manage Users</h2>
//                 <p className="section-subtitle">Total users: {users.length}</p>
//               </div>
//               <div className="btn-group">
//                 <button className="btn btn-primary">
//                   <i className="fas fa-plus me-2"></i>
//                   Add User
//                 </button>
//                 <button className="btn btn-outline-secondary">
//                   <i className="fas fa-download me-2"></i>
//                   Export
//                 </button>
//               </div>
//             </div>

//             {/* Summary Cards */}
//             <div className="row mb-4">
//               <div className="col-xl-3 col-lg-6 col-md-6 mb-4">
//                 <div className="stats-card stats-primary">
//                   <div className="stats-content">
//                     <div className="stats-icon">
//                       <i className="fas fa-user-check"></i>
//                     </div>
//                     <div className="stats-info">
//                       <h3 className="stats-number">{users.filter(u => u.status === 'active').length}</h3>
//                       <p className="stats-text">Active Users</p>
//                       <div className="stats-progress">
//                         <span className="progress-indicator">+12% from last month</span>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>
              
//               <div className="col-xl-3 col-lg-6 col-md-6 mb-4">
//                 <div className="stats-card stats-warning">
//                   <div className="stats-content">
//                     <div className="stats-icon">
//                       <i className="fas fa-user-clock"></i>
//                     </div>
//                     <div className="stats-info">
//                       <h3 className="stats-number">{users.filter(u => u.status === 'pending').length}</h3>
//                       <p className="stats-text">Pending Users</p>
//                       <div className="stats-progress">
//                         <span className="progress-indicator">+5% from yesterday</span>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>
              
//               <div className="col-xl-3 col-lg-6 col-md-6 mb-4">
//                 <div className="stats-card stats-secondary">
//                   <div className="stats-content">
//                     <div className="stats-icon">
//                       <i className="fas fa-user-minus"></i>
//                     </div>
//                     <div className="stats-info">
//                       <h3 className="stats-number">{users.filter(u => u.status === 'inactive').length}</h3>
//                       <p className="stats-text">Inactive Users</p>
//                       <div className="stats-progress">
//                         <span className="progress-indicator">-3% from last week</span>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>
              
//               <div className="col-xl-3 col-lg-6 col-md-6 mb-4">
//                 <div className="stats-card stats-danger">
//                   <div className="stats-content">
//                     <div className="stats-icon">
//                       <i className="fas fa-user-slash"></i>
//                     </div>
//                     <div className="stats-info">
//                       <h3 className="stats-number">{users.filter(u => u.status === 'suspended').length}</h3>
//                       <p className="stats-text">Suspended Users</p>
//                       <div className="stats-progress">
//                         <span className="progress-indicator">+1% from yesterday</span>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>

//             {/* Filters and Search */}
//             <div className="card mb-4 user-filters-card">
//               <div className="card-body">
//                 <div className="row g-3">
//                   <div className="col-md-6">
//                     <div className="input-group search-input-group">
//                       <span className="input-group-text">
//                         <i className="fas fa-search"></i>
//                       </span>
//                       <input
//                         type="text"
//                         className="form-control"
//                         placeholder="Search by name, phone, or email..."
//                         value={searchTerm}
//                         onChange={(e) => setSearchTerm(e.target.value)}
//                       />
//                     </div>
//                   </div>
//                   <div className="col-md-3">
//                     <select
//                       className="form-select"
//                       value={filterStatus}
//                       onChange={(e) => setFilterStatus(e.target.value)}
//                     >
//                       <option value="all">All Status</option>
//                       <option value="active">Active</option>
//                       <option value="inactive">Inactive</option>
//                       <option value="pending">Pending</option>
//                       <option value="suspended">Suspended</option>
//                     </select>
//                   </div>
//                   <div className="col-md-3">
//                     <button 
//                       className="btn btn-outline-secondary w-100"
//                       onClick={() => {
//                         setSearchTerm('');
//                         setFilterStatus('all');
//                       }}
//                     >
//                       <i className="fas fa-undo me-2"></i>
//                       Clear Filters
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             </div>

//             {/* Users Table */}
//             <div className="card user-table-card">
//               <div className="card-body">
//                 <div className="table-responsive">
//                   <table className="table table-hover">
//                     <thead>
//                       <tr>
//                         <th>User</th>
//                         <th>Contact</th>
//                         <th>Status</th>
//                         <th>Join Date</th>
//                         <th>Applications</th>
//                         <th>Actions</th>
//                       </tr>
//                     </thead>
//                     <tbody>
//                       {currentUsers.length > 0 ? (
//                         currentUsers.map((user) => (
//                           <tr key={user.id} className="user-table-row">
//                             <td>
//                               <div className="d-flex align-items-center">
//                                 <div className="user-avatar-container me-3">
//                                   <img
//                                     src={user.profilePic}
//                                     alt={user.name}
//                                     className="user-avatar"
//                                   />
//                                 </div>
//                                 <div>
//                                   <div className="fw-bold">{user.name}</div>
//                                   <small className="text-muted">Age: {user.age}</small>
//                                 </div>
//                               </div>
//                             </td>
//                             <td>
//                               <div>
//                                 <div>{user.phone}</div>
//                                 <small className="text-muted">{user.email}</small>
//                               </div>
//                             </td>
//                             <td>
//                               <span className={`status-badge ${getStatusBadge(user.status)}`}>
//                                 {user.status.charAt(0).toUpperCase() + user.status.slice(1)}
//                               </span>
//                             </td>
//                             <td>{new Date(user.joinDate).toLocaleDateString()}</td>
//                             <td>
//                               <span className="applications-badge">
//                                 {user.applications}
//                               </span>
//                             </td>
//                             <td>
//                               <div className="btn-group btn-group-sm">
//                                 <button
//                                   className="btn btn-outline-primary"
//                                   title="View Details"
//                                 >
//                                   <i className="fas fa-eye"></i>
//                                 </button>
//                                 <div className="dropdown">
//                                   <button
//                                     className="btn btn-outline-secondary dropdown-toggle"
//                                     data-bs-toggle="dropdown"
//                                     title="Change Status"
//                                   >
//                                     <i className="fas fa-edit"></i>
//                                   </button>
//                                   <ul className="dropdown-menu">
//                                     <li>
//                                       <button
//                                         className="dropdown-item"
//                                         onClick={() => handleStatusChange(user.id, 'active')}
//                                       >
//                                         <i className="fas fa-check text-success me-2"></i>
//                                         Set Active
//                                       </button>
//                                     </li>
//                                     <li>
//                                       <button
//                                         className="dropdown-item"
//                                         onClick={() => handleStatusChange(user.id, 'inactive')}
//                                       >
//                                         <i className="fas fa-pause text-secondary me-2"></i>
//                                         Set Inactive
//                                       </button>
//                                     </li>
//                                     <li>
//                                       <button
//                                         className="dropdown-item"
//                                         onClick={() => handleStatusChange(user.id, 'suspended')}
//                                       >
//                                         <i className="fas fa-ban text-danger me-2"></i>
//                                         Suspend
//                                       </button>
//                                     </li>
//                                   </ul>
//                                 </div>
//                                 <button
//                                   className="btn btn-outline-danger"
//                                   onClick={() => handleDeleteUser(user.id)}
//                                   title="Delete User"
//                                 >
//                                   <i className="fas fa-trash"></i>
//                                 </button>
//                               </div>
//                             </td>
//                           </tr>
//                         ))
//                       ) : (
//                         <tr>
//                           <td colSpan="6" className="text-center py-4">
//                             <div className="text-muted">
//                               <i className="fas fa-users fa-3x mb-3 d-block"></i>
//                               No users found matching your criteria
//                             </div>
//                           </td>
//                         </tr>
//                       )}
//                     </tbody>
//                   </table>
//                 </div>

//                 {/* Pagination */}
//                 {totalPages > 1 && (
//                   <nav aria-label="Users pagination">
//                     <ul className="pagination justify-content-center mt-4">
//                       <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
//                         <button
//                           className="page-link"
//                           onClick={() => setCurrentPage(currentPage - 1)}
//                           disabled={currentPage === 1}
//                         >
//                           <i className="fas fa-chevron-left"></i>
//                         </button>
//                       </li>
                      
//                       {Array.from({ length: totalPages }, (_, index) => (
//                         <li
//                           key={index + 1}
//                           className={`page-item ${currentPage === index + 1 ? 'active' : ''}`}
//                         >
//                           <button
//                             className="page-link"
//                             onClick={() => setCurrentPage(index + 1)}
//                           >
//                             {index + 1}
//                           </button>
//                         </li>
//                       ))}
                      
//                       <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
//                         <button
//                           className="page-link"
//                           onClick={() => setCurrentPage(currentPage + 1)}
//                           disabled={currentPage === totalPages}
//                         >
//                           <i className="fas fa-chevron-right"></i>
//                         </button>
//                       </li>
//                     </ul>
//                   </nav>
//                 )}
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
//         .stats-secondary { --accent-color: #6b7280; }
//         .stats-danger { --accent-color: #ef4444; }
        
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
//         .stats-warning .stats-icon { background: rgba(245, 158, 11, 0.1); }
//         .stats-secondary .stats-icon { background: rgba(107, 114, 128, 0.1); }
//         .stats-danger .stats-icon { background: rgba(239, 68, 68, 0.1); }
        
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
        
//         .user-filters-card {
//           border-radius: 16px;
//           box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
//           border: none;
//         }
        
//         .search-input-group .input-group-text {
//           background: white;
//           border-right: none;
//         }
        
//         .search-input-group .form-control {
//           border-left: none;
//         }
        
//         .user-table-card {
//           border-radius: 16px;
//           box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
//           border: none;
//         }
        
//         .user-table-row:hover {
//           background-color: #f8f9fa;
//         }
        
//         .user-avatar-container {
//           position: relative;
//         }
        
//         .user-avatar {
//           width: 40px;
//           height: 40px;
//           border-radius: 50%;
//           object-fit: cover;
//           border: 2px solid #fff;
//           box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
//         }
        
//         .status-badge {
//           padding: 0.35rem 0.75rem;
//           border-radius: 50px;
//           font-size: 0.75rem;
//           font-weight: 600;
//           text-transform: capitalize;
//         }
        
//         .status-active {
//           background: rgba(16, 185, 129, 0.15);
//           color: #065f46;
//         }
        
//         .status-inactive {
//           background: rgba(107, 114, 128, 0.15);
//           color: #374151;
//         }
        
//         .status-pending {
//           background: rgba(245, 158, 11, 0.15);
//           color: #92400e;
//         }
        
//         .status-suspended {
//           background: rgba(239, 68, 68, 0.15);
//           color: #991b1b;
//         }
        
//         .applications-badge {
//           padding: 0.35rem 0.65rem;
//           border-radius: 50px;
//           font-size: 0.75rem;
//           font-weight: 600;
//           background: rgba(59, 130, 246, 0.15);
//           color: #1e40af;
//         }
        
//         .table th {
//           border-top: none;
//           font-weight: 600;
//           color: #495057;
//           background: #f8f9fa;
//           padding: 1rem 0.75rem;
//         }
        
//         .table td {
//           padding: 1rem 0.75rem;
//           vertical-align: middle;
//         }
        
//         .btn-group-sm .btn {
//           padding: 0.25rem 0.5rem;
//           border-radius: 8px;
//         }
        
//         .page-link {
//           border-color: #dee2e6;
//           border-radius: 8px;
//           margin: 0 3px;
//         }
        
//         .page-item.active .page-link {
//           background-color: #3b82f6;
//           border-color: #3b82f6;
//         }
        
//         @media (max-width: 768px) {
//           .stats-content {
//             flex-direction: column;
//             text-align: center;
//             gap: 1rem;
//           }
//         }
//       `}</style>
//     </div>
//   );
// }


// import React, { useState, useEffect } from 'react';

// export default function ManageUsers() {
//   const [users, setUsers] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [filterStatus, setFilterStatus] = useState('all');
//   const [currentPage, setCurrentPage] = useState(1);
//   const [selectedUser, setSelectedUser] = useState(null);
//   const [showUserModal, setShowUserModal] = useState(false);
//   const [actionLoading, setActionLoading] = useState(false);
//   const [notification, setNotification] = useState(null);
//   const usersPerPage = 10;

//   // API Base URL - adjust according to your backend
  

//   // Fetch users from API
//   const fetchUsers = async () => {
//     try {
//       setLoading(true);
//       const token = localStorage.getItem('token'); // Adjust based on your token storage
//       const response = await fetch(`https://ruwa-backend.onrender.com/api/employee/applied-by-me`, {
//         method: 'GET',
//         headers: {
//           'Authorization': `Bearer ${token}`,
//           'Content-Type': 'application/json'
//         }
//       });
      
//       const data = await response.json();
      
//       if (response.ok && data.success) {
//         setUsers(data.appliedUsers ||  []);
//       } else {
//         console.error('Error fetching users:', data.message);
//         showNotification('Error fetching users', 'error');
       
//       }
//     } catch (error) {
//       console.error('Error fetching users:', error);
//       showNotification('Network error. Loading demo data.', 'warning');
//       // Fallback to mock data
      
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Mock data fallback
 

//   useEffect(() => {
//     fetchUsers();
//   }, []);

//   // Update user status API
//   // const updateUserStatus = async (userId, newStatus) => {
//   //   try {
//   //     setActionLoading(true);
//   //     const token = localStorage.getItem('authToken');
//   //     const response = await fetch(`${API_BASE_URL}/users/${userId}/status`, {
//   //       method: 'PATCH',
//   //       headers: {
//   //         'Authorization': `Bearer ${token}`,
//   //         'Content-Type': 'application/json'
//   //       },
//   //       body: JSON.stringify({ status: newStatus })
//   //     });

//   //     const data = await response.json();

//   //     if (response.ok && data.success) {
//   //       setUsers(users.map(user => 
//   //         user._id === userId || user.id === userId ? { ...user, status: newStatus } : user
//   //       ));
//   //       showNotification(`User status updated to ${newStatus}`, 'success');
//   //     } else {
//   //       // Fallback for demo - update locally
//   //       setUsers(users.map(user => 
//   //         user._id === userId || user.id === userId ? { ...user, status: newStatus } : user
//   //       ));
//   //       showNotification(`User status updated to ${newStatus}`, 'success');
//   //     }
//   //   } catch (error) {
//   //     console.error('Error updating user status:', error);
//   //     // Fallback for demo
//   //     setUsers(users.map(user => 
//   //       user._id === userId || user.id === userId ? { ...user, status: newStatus } : user
//   //     ));
//   //     showNotification(`User status updated to ${newStatus}`, 'success');
//   //   } finally {
//   //     setActionLoading(false);
//   //   }
//   // };
// function updateUserStatus(){}
//   // Delete user API
//   // const deleteUser = async (userId) => {
//   //   if (!window.confirm('Are you sure you want to delete this user? This action cannot be undone.')) {
//   //     return;
//   //   }

//   //   try {
//   //     setActionLoading(true);
//   //     const token = localStorage.getItem('token');
//   //     const response = await fetch(`${API_BASE_URL}/users/${userId}`, {
//   //       method: 'DELETE',
//   //       headers: {
//   //         'Authorization': `Bearer ${token}`,
//   //         'Content-Type': 'application/json'
//   //       }
//   //     });

//   //     if (response.ok) {
//   //       setUsers(users.filter(user => user._id !== userId && user.id !== userId));
//   //       showNotification('User deleted successfully', 'success');
//   //     } else {
//   //       // Fallback for demo
//   //       setUsers(users.filter(user => user._id !== userId && user.id !== userId));
//   //       showNotification('User deleted successfully', 'success');
//   //     }
//   //   } catch (error) {
//   //     console.error('Error deleting user:', error);
//   //     // Fallback for demo
//   //     setUsers(users.filter(user => user._id !== userId && user.id !== userId));
//   //     showNotification('User deleted successfully', 'success');
//   //   } finally {
//   //     setActionLoading(false);
//   //   }
//   // };
// const deleteUser=()=>{}
//   // Show notification
//   const showNotification = (message, type = 'info') => {
//     setNotification({ message, type });
//     setTimeout(() => setNotification(null), 4000);
//   };

//   // Filter and search logic
//   const filteredUsers = users
//   .filter(user => user) // remove null/undefined users
//   .filter(user => {
//     const userName = user.name || `${user.firstName || ''} ${user.lastName || ''}`.trim();
//     const matchesSearch = userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
//                          (user.phone && user.phone.includes(searchTerm)) ||
//                          (user.email && user.email.toLowerCase().includes(searchTerm.toLowerCase()));
//     const matchesFilter = filterStatus === 'all';
//     return matchesSearch && matchesFilter;
//   });


//   // Pagination logic
//   const indexOfLastUser = currentPage * usersPerPage;
//   const indexOfFirstUser = indexOfLastUser - usersPerPage;
//   const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);
//   const totalPages = Math.ceil(filteredUsers.length / usersPerPage);

//   const handleViewDetails = (user) => {
//     setSelectedUser(user);
//     setShowUserModal(true);
//   };

//   const getStatusBadge = (status) => {
//     const badges = {
//       active: 'success',
//       inactive: 'secondary',
//       pending: 'warning',
//       suspended: 'danger'
//     };
//     return badges[status] || 'secondary';
//   };

//   const getStatusIcon = (status) => {
//     const icons = {
//       active: 'fa-check-circle',
//       inactive: 'fa-pause-circle',
//       pending: 'fa-clock',
//       suspended: 'fa-ban'
//     };
//     return icons[status] || 'fa-question-circle';
//   };

//   // const exportToCSV = () => {
//   //   const headers = ['Name', 'Email', 'Phone', 'Status', 'Join Date', 'Applications'];
//   //   const csvContent = [
//   //     headers.join(','),
//   //     ...filteredUsers.map(user => {
//   //       const userName = user.name || `${user.firstName || ''} ${user.lastName || ''}`.trim();
//   //       return [
//   //         userName,
//   //         user.email,
//   //         user.phone,
//   //         user?.status,
//   //         user.createdAt || user.joinDate,
//   //         user.applications || 0
//   //       ].join(',');
//   //     })
//   //   ].join('\n');
    
//   //   const blob = new Blob([csvContent], { type: 'text/csv' });
//   //   const url = window.URL.createObjectURL(blob);
//   //   const a = document.createElement('a');
//   //   a.setAttribute('hidden', '');
//   //   a.setAttribute('href', url);
//   //   a.setAttribute('download', `users_export_${new Date().toISOString().split('T')[0]}.csv`);
//   //   document.body.appendChild(a);
//   //   a.click();
//   //   document.body.removeChild(a);
//   //   showNotification('Users exported successfully', 'success');
//   // };
// const exportToCSV=()=>{}
//   if (loading) {
//     return (
//       <>
//         <link 
//           href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" 
//           rel="stylesheet" 
//         />
//         <link 
//           href="https://cdnjs.cloudflare.com/ajax/libs/bootstrap/5.3.0/css/bootstrap.min.css" 
//           rel="stylesheet" 
//         />
        
//         <div className="min-vh-100 d-flex align-items-center justify-content-center" 
//              style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}>
//           <div className="text-center text-white">
//             <div className="spinner-border mb-4" role="status" style={{ width: '3rem', height: '3rem' }}>
//               <span className="visually-hidden">Loading...</span>
//             </div>
//             <h4>Loading users...</h4>
//             <p className="mb-0 opacity-75">Please wait while we fetch the user data</p>
//           </div>
//         </div>
//       </>
//     );
//   }

//   return (
//     <>
//       <link 
//         href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" 
//         rel="stylesheet" 
//       />
//       <link 
//         href="https://cdnjs.cloudflare.com/ajax/libs/bootstrap/5.3.0/css/bootstrap.min.css" 
//         rel="stylesheet" 
//       />
      
//       <div className="min-vh-100" style={{ background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)' }}>
//         {/* Notification Toast */}
//         {notification && (
//           <div 
//             className={`position-fixed top-0 end-0 p-4 z-3`} 
//             style={{ zIndex: 1060 }}
//           >
//             <div className={`alert alert-${notification.type === 'error' ? 'danger' : notification.type} alert-dismissible fade show shadow-lg`} 
//                  style={{ minWidth: '300px', borderRadius: '12px' }}>
//               <i className={`fas fa-${notification.type === 'success' ? 'check-circle' : notification.type === 'error' ? 'exclamation-circle' : 'info-circle'} me-2`}></i>
//               {notification.message}
//               <button type="button" className="btn-close" onClick={() => setNotification(null)}></button>
//             </div>
//           </div>
//         )}

//         <div className="container-fluid py-4">
//           {/* Header Section */}
//           <div className="row mb-4">
//             <div className="col-12">
//               <div className="card border-0 shadow-sm" style={{ 
//                 borderRadius: '20px',
//                 background: 'linear-gradient(135deg, rgba(255,255,255,0.95) 0%, rgba(255,255,255,0.85) 100%)'
//               }}>
//                 <div className="card-body p-4 p-md-5">
//                   <div className="row align-items-center">
//                     <div className="col-lg-8 col-md-7 mb-3 mb-md-0">
//                       <div className="d-flex align-items-center mb-3">
//                         <span className="badge bg-primary bg-opacity-10 text-primary px-3 py-2 rounded-pill me-3">
//                           <i className="fas fa-users-cog me-2"></i>User Management
//                         </span>
//                       </div>
//                       <h1 className="display-5 fw-bold text-dark mb-2">Manage Users</h1>
//                       <p className="lead text-muted mb-3">
//                         Total users: <strong>{users.length}</strong> • 
//                         Filtered: <strong>{filteredUsers.length}</strong>
//                       </p>
//                       <div className="d-flex flex-wrap gap-2">
//                         <button className="btn btn-primary rounded-pill px-4">
//                           <i className="fas fa-plus me-2"></i>Add User
//                         </button>
//                         <button className="btn btn-outline-success rounded-pill px-4" onClick={exportToCSV}>
//                           <i className="fas fa-download me-2"></i>Export CSV
//                         </button>
//                         <button className="btn btn-outline-secondary rounded-pill px-4" onClick={fetchUsers}>
//                           <i className="fas fa-sync-alt me-2"></i>Refresh
//                         </button>
//                       </div>
//                     </div>
//                     <div className="col-lg-4 col-md-5 text-center">
//                       <div className="bg-primary bg-opacity-10 rounded-circle d-inline-flex align-items-center justify-content-center" 
//                            style={{ width: '120px', height: '120px' }}>
//                         <i className="fas fa-users text-primary" style={{ fontSize: '3rem' }}></i>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Stats Cards */}
//           <div className="row g-4 mb-4">
//             <div className="col-6 col-lg-3">
//               <div className="card border-0 shadow-sm h-100" style={{ 
//                 background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
//                 borderRadius: '16px'
//               }}>
//                 <div className="card-body p-4 text-white">
//                   <div className="d-flex align-items-center">
//                     <div className="bg-white bg-opacity-20 rounded-circle p-3 me-3">
//                       <i className="fas fa-user-check fs-4"></i>
//                     </div>
//                     <div>
//                       {/* <h3 className="mb-1 fw-bold">{users.filter(u => u?.status === 'active').length}</h3> */}
//                       <p className="mb-0 small opacity-75">Active Users</p>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
            
//             <div className="col-6 col-lg-3">
//               <div className="card border-0 shadow-sm h-100" style={{ 
//                 background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
//                 borderRadius: '16px'
//               }}>
//                 <div className="card-body p-4 text-white">
//                   <div className="d-flex align-items-center">
//                     <div className="bg-white bg-opacity-20 rounded-circle p-3 me-3">
//                       <i className="fas fa-user-clock fs-4"></i>
//                     </div>
//                     <div>
//                       {/* <h3 className="mb-1 fw-bold">{users.filter(u => u?.status === 'pending').length}</h3> */}
//                       <p className="mb-0 small opacity-75">Pending Users</p>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
            
//             <div className="col-6 col-lg-3">
//               <div className="card border-0 shadow-sm h-100" style={{ 
//                 background: 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)',
//                 borderRadius: '16px'
//               }}>
//                 <div className="card-body p-4 text-white">
//                   <div className="d-flex align-items-center">
//                     <div className="bg-white bg-opacity-20 rounded-circle p-3 me-3">
//                       <i className="fas fa-user-minus fs-4"></i>
//                     </div>
//                     <div>
//                       {/* <h3 className="mb-1 fw-bold">{users.filter(u => u?.status === 'inactive').length}</h3> */}
//                       <p className="mb-0 small opacity-75">Inactive Users</p>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
            
//             <div className="col-6 col-lg-3">
//               <div className="card border-0 shadow-sm h-100" style={{ 
//                 background: 'linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)',
//                 borderRadius: '16px'
//               }}>
//                 <div className="card-body p-4 text-white">
//                   <div className="d-flex align-items-center">
//                     <div className="bg-white bg-opacity-20 rounded-circle p-3 me-3">
//                       <i className="fas fa-user-slash fs-4"></i>
//                     </div>
//                     <div>
//                       {/* <h3 className="mb-1 fw-bold">{users.filter(u => u.status === 'suspended').length}</h3> */}
//                       <p className="mb-0 small opacity-75">Suspended</p>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Filters and Search */}
//           <div className="row mb-4">
//             <div className="col-12">
//               <div className="card border-0 shadow-sm" style={{ borderRadius: '16px' }}>
//                 <div className="card-body p-4">
//                   <div className="row g-3 align-items-end">
//                     <div className="col-md-6">
//                       <label className="form-label fw-semibold text-dark">Search Users</label>
//                       <div className="input-group">
//                         <span className="input-group-text bg-light border-end-0">
//                           <i className="fas fa-search text-muted"></i>
//                         </span>
//                         <input
//                           type="text"
//                           className="form-control border-start-0 bg-light"
//                           placeholder="Search by name, phone, or email..."
//                           value={searchTerm}
//                           onChange={(e) => setSearchTerm(e.target.value)}
//                           style={{ borderRadius: '0 8px 8px 0' }}
//                         />
//                       </div>
//                     </div>
//                     {/* <div className="col-md-3">
//                       <label className="form-label fw-semibold text-dark">Filter by Status</label>
//                       <select
//                         className="form-select bg-light"
//                         value={filterStatus}
//                         onChange={(e) => setFilterStatus(e.target.value)}
//                         style={{ borderRadius: '8px' }}
//                       >
//                         <option value="all">All Status</option>
//                         <option value="active">Active</option>
//                         <option value="inactive">Inactive</option>
//                         <option value="pending">Pending</option>
//                         <option value="suspended">Suspended</option>
//                       </select>
//                     </div> */}
//                     <div className="col-md-3">
//                       <button 
//                         className="btn btn-outline-secondary w-100 rounded-pill"
//                         onClick={() => {
//                           setSearchTerm('');
//                           setFilterStatus('all');
//                           setCurrentPage(1);
//                         }}
//                       >
//                         <i className="fas fa-times me-2"></i>Clear Filters
//                       </button>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Users Table */}
//           <div className="row">
//             <div className="col-12">
//               <div className="card border-0 shadow-sm" style={{ borderRadius: '16px' }}>
//                 <div className="card-body p-0">
//                   <div className="table-responsive">
//                     <table className="table table-hover mb-0">
//                       <thead className="table-light">
//                         <tr>
//                           <th className="border-0 ps-4 py-3 fw-semibold text-dark">
//                             <i className="fas fa-user me-2 text-primary"></i>User
//                           </th>
//                           <th className="border-0 py-3 fw-semibold text-dark">
//                             <i className="fas fa-envelope me-2 text-primary"></i>Contact
//                           </th>
//                           <th className="border-0 py-3 fw-semibold text-dark">
//                             <i className="fas fa-info-circle me-2 text-primary"></i>Status
//                           </th>
//                           <th className="border-0 py-3 fw-semibold text-dark">
//                             <i className="fas fa-calendar me-2 text-primary"></i>Join Date
//                           </th>
//                           <th className="border-0 py-3 fw-semibold text-dark">
//                             <i className="fas fa-chart-line me-2 text-primary"></i>Activity
//                           </th>
//                           <th className="border-0 py-3 fw-semibold text-dark text-center">Actions</th>
//                         </tr>
//                       </thead>
//                       <tbody>
//                         {currentUsers.length > 0 ? (
//                           currentUsers.map((user) => {
//                             const userName = user.name || `${user.firstName || ''} ${user.lastName || ''}`.trim();
//                             return (
//                               <tr key={user._id || user.id} className="user-table-row">
//                                 <td className="ps-4 py-3">
//                                   <div className="d-flex align-items-center">
//                                     <div className="position-relative me-3">
//                                       <img
//                                         src={user.profilePic || `https://ui-avatars.com/api/?name=${encodeURIComponent(userName)}&background=667eea&color=fff`}
//                                         alt={userName}
//                                         className="rounded-circle border border-2 border-light shadow-sm"
//                                         style={{ width: '50px', height: '50px', objectFit: 'cover' }}
//                                       />
//                                        <span 
//                                         className={`position-absolute bottom-0 end-0 rounded-circle border border-2 border-white`}
//                                         style={{ 
//                                           width: '14px', 
//                                           height: '14px',
//                                           backgroundColor:  '#10b981' 
                                                          
//                                         }}
//                                       ></span> 
//                                     </div>
//                                     <div>
//                                       <h6 className="mb-0 fw-semibold text-dark">{userName}</h6>
//                                       <small className="text-muted">
//                                         {user.age ? `Age: ${user.age}` : 'No age specified'}
//                                       </small>
//                                     </div>
//                                   </div>
//                                 </td>
//                                 <td className="py-3">
//                                   <div>
//                                     <div className="d-flex align-items-center mb-1">
//                                       <i className="fas fa-phone me-2 text-muted small"></i>
//                                       <span className="fw-medium">{user.phone || 'N/A'}</span>
//                                     </div>
//                                     <div className="d-flex align-items-center">
//                                       <i className="fas fa-envelope me-2 text-muted small"></i>
//                                       <small className="text-muted">{user.email}</small>
//                                     </div>
//                                     <div className="d-flex align-items-center">
                                      
//                                       <small className="text-muted">{user.appliedService}</small>
//                                     </div>
//                                   </div>
//                                 </td>
//                                 <td className="py-3">
//                                   {/* <span className={`badge bg-${getStatusBadge(user.status)} bg-opacity-10 text-${getStatusBadge(user.status)} px-3 py-2 rounded-pill`}>
//                                     <i className={`fas ${getStatusIcon(user.status)} me-1`}></i>
//                                     {user.status ? user.status.charAt(0).toUpperCase() + user.status.slice(1) : 'Unknown'}
//                                   </span> */}
//                                 </td>
//                                 <td className="py-3">
                                  
//                                 </td>
//                                 <td className="py-3">
//                                   <span className="badge bg-primary bg-opacity-10 text-primary px-3 py-2 rounded-pill">
//                                     {user.applications || 0} apps
//                                   </span>
//                                 </td>
//                                 <td className="py-3 text-center">
//                                   <div className="btn-group btn-group-sm">
//                                     <button
//                                       className="btn btn-outline-primary rounded-pill me-1"
//                                       onClick={() => handleViewDetails(user)}
//                                       title="View Details"
//                                     >
//                                       <i className="fas fa-eye"></i>
//                                     </button>
//                                     <div className="dropdown">
//                                       <button
//                                         className="btn btn-outline-secondary dropdown-toggle rounded-pill me-1"
//                                         type="button"
//                                         data-bs-toggle="dropdown"
//                                         title="Change Status"
//                                         disabled={actionLoading}
//                                       >
//                                         <i className="fas fa-cog"></i>
//                                       </button>
//                                       <ul className="dropdown-menu shadow-lg border-0" style={{ borderRadius: '12px' }}>
//                                         <li>
//                                           <button
//                                             className="dropdown-item py-2"
//                                             onClick={() => updateUserStatus(user._id || user.id, 'active')}
//                                           >
//                                             <i className="fas fa-check text-success me-2"></i>Set Active
//                                           </button>
//                                         </li>
//                                         <li>
//                                           <button
//                                             className="dropdown-item py-2"
//                                             onClick={() => updateUserStatus(user._id || user.id, 'inactive')}
//                                           >
//                                             <i className="fas fa-pause text-secondary me-2"></i>Set Inactive
//                                           </button>
//                                         </li>
//                                         <li>
//                                           <button
//                                             className="dropdown-item py-2"
//                                             onClick={() => updateUserStatus(user._id || user.id, 'suspended')}
//                                           >
//                                             <i className="fas fa-ban text-danger me-2"></i>Suspend
//                                           </button>
//                                         </li>
//                                       </ul>
//                                     </div>
//                                     <button
//                                       className="btn btn-outline-danger rounded-pill"
//                                       onClick={() => deleteUser(user._id || user.id)}
//                                       title="Delete User"
//                                       disabled={actionLoading}
//                                     >
//                                       <i className="fas fa-trash"></i>
//                                     </button>
//                                   </div>
//                                 </td>
//                               </tr>
//                             );
//                           })
//                         ) : (
//                           <tr>
//                             <td colSpan="6" className="text-center py-5">
//                               <div className="text-muted">
//                                 <i className="fas fa-users fa-3x mb-3 d-block opacity-50"></i>
//                                 <h5>No users found</h5>
//                                 <p className="mb-0">
//                                   {searchTerm || filterStatus !== 'all' 
//                                     ? 'Try adjusting your search or filters' 
//                                     : 'No users available at the moment'}
//                                 </p>
//                               </div>
//                             </td>
//                           </tr>
//                         )}
//                       </tbody>
//                     </table>
//                   </div>

//                   {/* Pagination */}
//                   {totalPages > 1 && (
//                     <div className="p-4 border-top">
//                       <nav aria-label="Users pagination">
//                         <ul className="pagination justify-content-center mb-0">
//                           <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
//                             <button
//                               className="page-link rounded-pill me-1"
//                               onClick={() => setCurrentPage(1)}
//                               disabled={currentPage === 1}
//                             >
//                               <i className="fas fa-angle-double-left"></i>
//                             </button>
//                           </li>
//                           <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
//                             <button
//                               className="page-link rounded-pill me-1"
//                               onClick={() => setCurrentPage(currentPage - 1)}
//                               disabled={currentPage === 1}
//                             >
//                               <i className="fas fa-chevron-left"></i>
//                             </button>
//                           </li>
                          
//                           {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
//                             let pageNum;
//                             if (totalPages <= 5) {
//                               pageNum = i + 1;
//                             } else if (currentPage <= 3) {
//                               pageNum = i + 1;
//                             } else if (currentPage >= totalPages - 2) {
//                               pageNum = totalPages - 4 + i;
//                             } else {
//                               pageNum = currentPage - 2 + i;
//                             }
                            
//                             return (
//                               <li
//                                 key={pageNum}
//                                 className={`page-item ${currentPage === pageNum ? 'active' : ''}`}
//                               >
//                                 <button
//                                   className="page-link rounded-pill mx-1"
//                                   onClick={() => setCurrentPage(pageNum)}
//                                   style={{
//                                     backgroundColor: currentPage === pageNum ? '#667eea' : 'transparent',
//                                     borderColor: currentPage === pageNum ? '#667eea' : '#dee2e6',
//                                     color: currentPage === pageNum ? 'white' : '#6c757d'
//                                   }}
//                                 >
//                                   {pageNum}
//                                 </button>
//                               </li>
//                             );
//                           })}
                          
//                           <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
//                             <button
//                               className="page-link rounded-pill ms-1"
//                               onClick={() => setCurrentPage(currentPage + 1)}
//                               disabled={currentPage === totalPages}
//                             >
//                               <i className="fas fa-chevron-right"></i>
//                             </button>
//                           </li>
//                           <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
//                             <button
//                               className="page-link rounded-pill ms-1"
//                               onClick={() => setCurrentPage(totalPages)}
//                               disabled={currentPage === totalPages}
//                             >
//                               <i className="fas fa-angle-double-right"></i>
//                             </button>
//                           </li>
//                         </ul>
//                         <div className="text-center text-muted small mt-3">
//                           Showing {indexOfFirstUser + 1} to {Math.min(indexOfLastUser, filteredUsers.length)} of {filteredUsers.length} users
//                         </div>
//                       </nav>
//                     </div>
//                   )}
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* User Detail Modal */}
//         {showUserModal && selectedUser && (
//           <div 
//             className="modal fade show d-block" 
//             tabIndex="-1" 
//             style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}
//             onClick={(e) => e.target === e.currentTarget && setShowUserModal(false)}
//           >
//             <div className="modal-dialog modal-lg modal-dialog-centered">
//               <div className="modal-content border-0 shadow-lg" style={{ borderRadius: '20px' }}>
//                 <div className="modal-header border-0 p-4">
//                   <h5 className="modal-title fw-bold">
//                     <i className="fas fa-user-circle me-2 text-primary"></i>
//                     User Details
//                   </h5>
//                   <button
//                     type="button"
//                     className="btn-close"
//                     onClick={() => setShowUserModal(false)}
//                   ></button>
//                 </div>
//                 <div className="modal-body p-4">
//                   <div className="row">
//                     <div className="col-md-4 text-center mb-4 mb-md-0">
//                       <img
//                         src={selectedUser.profilePic || `https://ui-avatars.com/api/?name=${encodeURIComponent(selectedUser.name || selectedUser.firstName + ' ' + selectedUser.lastName)}&background=667eea&color=fff`}
//                         alt={selectedUser.name || `${selectedUser.firstName} ${selectedUser.lastName}`}
//                         className="rounded-circle border border-3 border-light shadow mb-3"
//                         style={{ width: '150px', height: '150px', objectFit: 'cover' }}
//                       />
//                       <h4 className="fw-bold text-dark">
//                         {selectedUser.name || `${selectedUser.firstName || ''} ${selectedUser.lastName || ''}`.trim()}
//                       </h4>
//                       <span className={`badge bg-${getStatusBadge(selectedUser.status)} bg-opacity-10 text-${getStatusBadge(selectedUser.status)} px-3 py-2 rounded-pill`}>
//                         <i className={`fas ${getStatusIcon(selectedUser.status)} me-1`}></i>
//                         {selectedUser.status ? selectedUser.status.charAt(0).toUpperCase() + selectedUser.status.slice(1) : 'Unknown'}
//                       </span>
//                     </div>
//                     <div className="col-md-8">
//                       <div className="row g-3">
//                         <div className="col-sm-6">
//                           <div className="bg-light rounded-3 p-3">
//                             <label className="text-muted small fw-semibold">Email Address</label>
//                             <p className="mb-0 fw-medium text-dark">
//                               <i className="fas fa-envelope me-2 text-primary"></i>
//                               {selectedUser.email}
//                             </p>
//                           </div>
//                         </div>
//                         <div className="col-sm-6">
//                           <div className="bg-light rounded-3 p-3">
//                             <label className="text-muted small fw-semibold">Phone Number</label>
//                             <p className="mb-0 fw-medium text-dark">
//                               <i className="fas fa-phone me-2 text-primary"></i>
//                               {selectedUser.phone || 'Not provided'}
//                             </p>
//                           </div>
//                         </div>
//                         <div className="col-sm-6">
//                           <div className="bg-light rounded-3 p-3">
//                             <label className="text-muted small fw-semibold">Age</label>
//                             <p className="mb-0 fw-medium text-dark">
//                               <i className="fas fa-birthday-cake me-2 text-primary"></i>
//                               {selectedUser.age ? `${selectedUser.age} years` : 'Not specified'}
//                             </p>
//                           </div>
//                         </div>
//                         <div className="col-sm-6">
//                           <div className="bg-light rounded-3 p-3">
//                             <label className="text-muted small fw-semibold">Join Date</label>
//                             <p className="mb-0 fw-medium text-dark">
//                               <i className="fas fa-calendar me-2 text-primary"></i>
//                               {selectedUser.createdAt || selectedUser.joinDate ? 
//                                 new Date(selectedUser.createdAt || selectedUser.joinDate).toLocaleDateString() : 'Unknown'}
//                             </p>
//                           </div>
//                         </div>
//                         <div className="col-12">
//                           <div className="bg-light rounded-3 p-3">
//                             <label className="text-muted small fw-semibold">Address</label>
//                             <p className="mb-0 fw-medium text-dark">
//                               <i className="fas fa-map-marker-alt me-2 text-primary"></i>
//                               {selectedUser.address || 'Not provided'}
//                             </p>
//                           </div>
//                         </div>
//                         <div className="col-sm-6">
//                           <div className="bg-light rounded-3 p-3">
//                             <label className="text-muted small fw-semibold">Applications</label>
//                             <p className="mb-0 fw-medium text-dark">
//                               <i className="fas fa-file-alt me-2 text-primary"></i>
//                               {selectedUser.applications || 0} submitted
//                             </p>
//                           </div>
//                         </div>
//                         <div className="col-sm-6">
//                           <div className="bg-light rounded-3 p-3">
//                             <label className="text-muted small fw-semibold">Last Login</label>
//                             <p className="mb-0 fw-medium text-dark">
//                               <i className="fas fa-clock me-2 text-primary"></i>
//                               {selectedUser.lastLogin ? 
//                                 new Date(selectedUser.lastLogin).toLocaleDateString() : 'Never'}
//                             </p>
//                           </div>
//                         </div>
//                         {selectedUser.services && selectedUser.services.length > 0 && (
//                           <div className="col-12">
//                             <div className="bg-light rounded-3 p-3">
//                               <label className="text-muted small fw-semibold">Services Used</label>
//                               <div className="mt-2">
//                                 {selectedUser.services.map((service, index) => (
//                                   <span key={index} className="badge bg-primary bg-opacity-10 text-primary me-2 mb-2 px-3 py-2">
//                                     {service}
//                                   </span>
//                                 ))}
//                               </div>
//                             </div>
//                           </div>
//                         )}
//                         {selectedUser.documents && selectedUser.documents.length > 0 && (
//                           <div className="col-12">
//                             <div className="bg-light rounded-3 p-3">
//                               <label className="text-muted small fw-semibold">Documents</label>
//                               <div className="mt-2">
//                                 {selectedUser.documents.map((doc, index) => (
//                                   <span key={index} className="badge bg-success bg-opacity-10 text-success me-2 mb-2 px-3 py-2">
//                                     <i className="fas fa-file-check me-1"></i>
//                                     {doc}
//                                   </span>
//                                 ))}
//                               </div>
//                             </div>
//                           </div>
//                         )}
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//                 <div className="modal-footer border-0 p-4">
//                   <button
//                     type="button"
//                     className="btn btn-secondary rounded-pill px-4"
//                     onClick={() => setShowUserModal(false)}
//                   >
//                     <i className="fas fa-times me-2"></i>Close
//                   </button>
//                   <button type="button" className="btn btn-primary rounded-pill px-4">
//                     <i className="fas fa-edit me-2"></i>Edit User
//                   </button>
//                   <button type="button" className="btn btn-info rounded-pill px-4">
//                     <i className="fas fa-envelope me-2"></i>Send Message
//                   </button>
//                 </div>
//               </div>
//             </div>
//           </div>
//         )}

//         <style jsx>{`
//           .user-table-row:hover {
//             background-color: rgba(102, 126, 234, 0.05) !important;
//             transform: translateY(-1px);
//             transition: all 0.2s ease;
//           }
          
//           .page-link {
//             border: none;
//             color: #6c757d;
//             font-weight: 500;
//             min-width: 40px;
//             height: 40px;
//             display: flex;
//             align-items: center;
//             justify-content: center;
//           }
          
//           .page-item.active .page-link {
//             box-shadow: 0 2px 8px rgba(102, 126, 234, 0.3);
//           }
          
//           .btn-group-sm .btn {
//             padding: 0.4rem 0.8rem;
//             font-size: 0.875rem;
//             border-radius: 50px;
//             border: 1.5px solid;
//             font-weight: 500;
//             transition: all 0.2s ease;
//           }
          
//           .btn-group-sm .btn:hover {
//             transform: translateY(-1px);
//             box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
//           }
          
//           .dropdown-menu {
//             border: none;
//             box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
//             border-radius: 12px !important;
//           }
          
//           .dropdown-item:hover {
//             background-color: rgba(102, 126, 234, 0.1);
//             color: #667eea;
//           }
          
//           .badge {
//             font-weight: 500;
//             letter-spacing: 0.3px;
//           }
          
//           .alert {
//             border: none;
//             font-weight: 500;
//           }
          
//           .form-control:focus, .form-select:focus {
//             border-color: #667eea;
//             box-shadow: 0 0 0 0.2rem rgba(102, 126, 234, 0.25);
//           }
          
//           .table th {
//             background-color: #f8f9fa !important;
//             color: #495057;
//             font-weight: 600;
//             font-size: 0.9rem;
//             letter-spacing: 0.5px;
//             border: none;
//           }
          
//           .table td {
//             border-color: #f1f3f4;
//             vertical-align: middle;
//           }
          
//           @media (max-width: 768px) {
//             .display-5 {
//               font-size: 2rem !important;
//             }
            
//             .btn-group-sm {
//               display: flex;
//               flex-direction: column;
//               gap: 0.25rem;
//             }
            
//             .btn-group-sm .btn {
//               width: 100%;
//               margin: 0;
//             }
            
//             .table-responsive {
//               border-radius: 12px;
//             }
            
//             .modal-dialog {
//               margin: 1rem;
//             }
//           }
          
//           @media (max-width: 576px) {
//             .card-body.p-4.p-md-5 {
//               padding: 1.5rem !important;
//             }
            
//             .btn-group {
//               flex-direction: column;
//               gap: 0.5rem;
//             }
            
//             .pagination {
//               flex-wrap: wrap;
//               justify-content: center !important;
//             }
//           }
//         `}</style>
//       </div>
//     </>
//   );
// }
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
            <div className="row mb-4">
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
                <div className="stats-card stats-info">
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
                                <button
                                  className="btn btn-outline-primary"
                                  title="View Details"
                                >
                                  <i className="fas fa-eye"></i>
                                </button>
                                <div className="dropdown">
                                  <button
                                    className="btn btn-outline-secondary dropdown-toggle"
                                    data-bs-toggle="dropdown"
                                    title="Change Status"
                                  >
                                    <i className="fas fa-edit"></i>
                                  </button>
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
        .stats-info { background: linear-gradient(135deg, #43e97b 0%, #38f9d7 100%); color: white; }
        
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