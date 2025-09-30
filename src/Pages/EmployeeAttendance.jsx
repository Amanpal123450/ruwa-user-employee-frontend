import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../components/AuthContext";

export default function EmployeeAttendance() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [currentTime, setCurrentTime] = useState(new Date());
  const [attendanceStatus, setAttendanceStatus] = useState("not-checked-in");
  const [attendanceHistory, setAttendanceHistory] = useState([]);
  const [monthlyStats, setMonthlyStats] = useState({
    present: 0,
    late: 0,
    absent: 0,
    earlyDeparture: 0,
    paidLeave: 0,
    totalWorkingHours: 0,
    requiredWorkingHours: 0,
    hoursDifference: 0,
  });
  const [showLeaveModal, setShowLeaveModal] = useState(false);
  const [leaveDate, setLeaveDate] = useState("");
  const [leaveType, setLeaveType] = useState("paid");
  const [leaveReason, setLeaveReason] = useState("");

  // Setup axios instance
  const api = axios.create({
    baseURL: "https://ruwa-backend.onrender.com",
  });

  // Attach JWT token automatically
  api.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem("token");
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => Promise.reject(error)
  );

  // Fetch attendance data
  const fetchAttendanceData = async () => {
    try {
      const response = await api.get("/api/attendance/history");
      const history = response.data.history || [];
      setAttendanceHistory(history);

      // derive status from today's record
      const today = new Date().toDateString();
      const todayRecord = history.find(
        (rec) => new Date(rec.date).toDateString() === today
      );
      
      if (!todayRecord) {
        setAttendanceStatus("not-checked-in");
      } else if (todayRecord.checkOut) {
        setAttendanceStatus("completed");
      } else if (todayRecord.checkIn) {
        const checkInTime = new Date(todayRecord.checkIn);
        const now = new Date();
        const diffHrs = Math.floor((now - checkInTime) / (1000 * 60 * 60));
        setAttendanceStatus(diffHrs >= 8 ? "should-check-out" : "checked-in");
      } else {
        setAttendanceStatus("not-checked-in");
      }
    } catch (error) {
      console.error("Error fetching attendance data:", error);
    }
  };

  // Fetch summary stats
  const fetchSummary = async () => {
    try {
      const response = await api.get("/api/attendance/summary");
      const summary = response.data.summary;

      setMonthlyStats({
        present: parseInt(summary.present) || 0,
        late: parseInt(summary.lateArrival) || 0,
        absent: parseInt(summary.absent) || 0,
        earlyDeparture: parseInt(summary.leftEarly) || 0,
        paidLeave: parseInt(summary.paidLeave) || 0,
        totalWorkingHours: parseFloat(summary.totalWorkingHours) || 0,
        requiredWorkingHours: parseFloat(summary.requiredHours) || 0,
        hoursDifference: parseFloat(summary.balance) || 0,
      });
    } catch (error) {
      console.error("Error fetching summary stats:", error);
    }
  };

  // Handle Check-in
  const handleCheckIn = async () => {
    try {
      await api.post("/api/attendance/check-in");
      setAttendanceStatus("checked-in");
      fetchAttendanceData();
      fetchSummary();
    } catch (error) {
      console.error("Check-in failed:", error);
      alert("Failed to check in. Please try again.");
    }
  };

  // Handle Check-out
  const handleCheckOut = async () => {
    try {
      await api.post("/api/attendance/check-out");
      setAttendanceStatus("completed");
      fetchAttendanceData();
      fetchSummary();
    } catch (error) {
      console.error("Check-out failed:", error);
      alert("Failed to check out. Please try again.");
    }
  };

  // Apply Leave
  const handleApplyLeave = async () => {
    if (!leaveDate) {
      alert("Please select a date for leave");
      return;
    }
    try {
      await api.post("/api/attendance/leave", {
        date: leaveDate,
        type: leaveType,
        reason: leaveReason,
      });
      setLeaveDate("");
      setLeaveType("paid");
      setLeaveReason("");
      setShowLeaveModal(false);
      alert("Leave applied successfully!");
      fetchAttendanceData();
      fetchSummary();
    } catch (error) {
      console.error("Leave application failed:", error);
      alert("Failed to apply leave. Please try again.");
    }
  };

  // Handle logout
  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  // Format date for display
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
    });
  };

  // Format time for display
  const formatTime = (timeString) => {
    if (!timeString) return "--:--";
    const date = new Date(timeString);
    return date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  // Format working hours
  const formatWorkingHours = (hours) => {
    if (!hours || hours <= 0) return "--";
    const wholeHours = Math.floor(hours);
    const minutes = Math.round((hours % 1) * 60);
    return `${wholeHours}h ${minutes}m`;
  };

  // Check if date is today
  const isToday = (dateString) => {
    return new Date(dateString).toDateString() === new Date().toDateString();
  };

  // Check if date is Sunday
  const isSunday = (dateString) => {
    return new Date(dateString).getDay() === 0;
  };

  // Clock updater + fetch data
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    fetchAttendanceData();
    fetchSummary();

    return () => clearInterval(timer);
  }, []);

  return (
    <>

      {/* Navigation Bar */}
      {/* <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm sticky-top">
        <div className="container-fluid">
          <Link className="navbar-brand fw-bold" to="/employee-dashboard">
            <i className="fas fa-calendar-check me-2 text-primary"></i>
            Attendance System
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto align-items-center">
              <li className="nav-item">
                <Link className="nav-link" to="/employee-dashboard">
                  <i className="fas fa-home me-1"></i>Dashboard
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link active" to="/employee-att">
                  <i className="fas fa-clock me-1"></i>Attendance
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/manage-applications">
                  <i className="fas fa-file-alt me-1"></i>Applications
                </Link>
              </li>
              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle d-flex align-items-center"
                  href="#"
                  id="navbarDropdown"
                  role="button"
                  data-bs-toggle="dropdown"
                >
                  <img
                    src={user?.profile_pic || "https://via.placeholder.com/40"}
                    alt="Profile"
                    className="rounded-circle me-2"
                    style={{ width: "32px", height: "32px", objectFit: "cover" }}
                  />
                  <span className="d-none d-md-inline">{user?.name || "User"}</span>
                </a>
                <ul className="dropdown-menu dropdown-menu-end">
                  <li>
                    <span className="dropdown-item-text">
                      <small className="text-muted">{user?.email}</small>
                    </span>
                  </li>
                  <li><hr className="dropdown-divider" /></li>
                  <li>
                    <Link className="dropdown-item" to="/employee-dashboard">
                      <i className="fas fa-user me-2"></i>Profile
                    </Link>
                  </li>
                  <li>
                    <Link className="dropdown-item" to="/settings">
                      <i className="fas fa-cog me-2"></i>Settings
                    </Link>
                  </li>
                  <li><hr className="dropdown-divider" /></li>
                  <li>
                    <button className="dropdown-item text-danger" onClick={handleLogout}>
                      <i className="fas fa-sign-out-alt me-2"></i>Logout
                    </button>
                  </li>
                </ul>
              </li>
            </ul>
          </div>
        </div>
      </nav> */}

      <div className="dashboard-container">
        <div className="container-fluid py-4">
          <div className="row">
            <div className="col-12">
              {/* Header */}
              <div className="d-flex justify-content-between align-items-center mb-4 flex-column flex-md-row">
                <div className="mb-3 mb-md-0">
                  <h1 className="h3 mb-1">Attendance Management</h1>
                  <p className="text-muted mb-0">
                    Track and manage your daily attendance
                  </p>
                </div>
                <div>
                  <button
                    className="btn btn-outline-primary me-2"
                    onClick={() => setShowLeaveModal(true)}
                  >
                    <i className="fas fa-calendar-plus me-2"></i>Apply Leave
                  </button>
                  <Link
                    to="/employee-dashboard"
                    className="btn btn-outline-secondary"
                  >
                    <i className="fas fa-arrow-left me-2"></i>Back to Dashboard
                  </Link>
                </div>
              </div>

              {/* Current Time & Date Card */}
              <div className="row mb-4">
                <div className="col-lg-8 mb-4 mb-lg-0">
                  <div className="card time-card">
                    <div className="card-body text-center py-5">
                      <h3 className="current-time mb-1">
                        {currentTime.toLocaleTimeString()}
                      </h3>
                      <p className="current-date text-muted mb-4">
                        {currentTime.toLocaleDateString("en-US", {
                          weekday: "long",
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </p>

                      {attendanceStatus === "not-checked-in" && (
                        <button
                          className="btn btn-primary btn-lg px-5 py-3"
                          onClick={handleCheckIn}
                        >
                          <i className="fas fa-fingerprint me-2"></i>Check In
                        </button>
                      )}

                      {attendanceStatus === "checked-in" && (
                        <button
                          className="btn btn-success btn-lg px-5 py-3"
                          onClick={handleCheckOut}
                        >
                          <i className="fas fa-sign-out-alt me-2"></i>Check Out
                        </button>
                      )}

                      {attendanceStatus === "should-check-out" && (
                        <div>
                          <div className="alert alert-warning mb-3">
                            <i className="fas fa-exclamation-triangle me-2"></i>
                            You've exceeded 8 working hours. Please check out.
                          </div>
                          <button
                            className="btn btn-success btn-lg px-5 py-3"
                            onClick={handleCheckOut}
                          >
                            <i className="fas fa-sign-out-alt me-2"></i>Check Out Now
                          </button>
                        </div>
                      )}

                      {attendanceStatus === "completed" && (
                        <div>
                          <div className="alert alert-success mb-3">
                            <i className="fas fa-check-circle me-2"></i>
                            You've completed your attendance for today. Thank you!
                          </div>
                          <button className="btn btn-outline-secondary" disabled>
                            Attendance Completed
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                <div className="col-lg-4">
                  <div className="card stats-card h-100">
                    <div className="card-header">
                      <h5 className="card-title mb-0">This Month's Summary</h5>
                      <p className="text-muted small mb-0">As of {new Date().toLocaleDateString()}</p>
                    </div>
                    <div className="card-body">
                      <div className="d-flex flex-wrap justify-content-between align-items-center mb-3">
                        <div><span className="text-success">• Present</span></div>
                        <span className="fw-bold text-truncate">{monthlyStats.present} days</span>
                      </div>

                      <div className="d-flex flex-wrap justify-content-between align-items-center mb-3">
                        <div><span className="text-warning">• Late Arrival</span></div>
                        <span className="fw-bold text-truncate">{monthlyStats.late} days</span>
                      </div>

                      <div className="d-flex flex-wrap justify-content-between align-items-center mb-3">
                        <div><span className="text-danger">• Absent</span></div>
                        <span className="fw-bold text-truncate">{monthlyStats.absent} days</span>
                      </div>

                      <div className="d-flex flex-wrap justify-content-between align-items-center mb-3">
                        <div><span className="text-info">• Left Early</span></div>
                        <span className="fw-bold text-truncate">{monthlyStats.earlyDeparture} days</span>
                      </div>

                      <div className="d-flex flex-wrap justify-content-between align-items-center mb-3">
                        <div><span className="text-primary">• Paid Leave</span></div>
                        <span className="fw-bold text-truncate">{monthlyStats.paidLeave} days</span>
                      </div>

                      <hr />

                      <div className="d-flex flex-wrap justify-content-between align-items-center mb-3">
                        <div><span className="text-dark">• Total Working Hours</span></div>
                        <span className="fw-bold text-truncate">{monthlyStats?.totalWorkingHours}h</span>
                      </div>

                      <div className="d-flex flex-wrap justify-content-between align-items-center mb-3">
                        <div><span className="text-dark">• Required Hours</span></div>
                        <span className="fw-bold text-truncate">{monthlyStats.requiredWorkingHours}h</span>
                      </div>

                      <div className="d-flex flex-wrap justify-content-between align-items-center">
                        <div><span className="text-dark">• Balance</span></div>
                        <span className={`fw-bold text-truncate ${monthlyStats.hoursDifference >= 0 ? 'text-success' : 'text-danger'}`}>
                          {monthlyStats.hoursDifference >= 0 ? '+' : ''}{monthlyStats.hoursDifference}h
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Attendance History */}
              <div className="card">
                <div className="card-header d-flex justify-content-between align-items-center flex-column flex-md-row">
                  <h5 className="card-title mb-2 mb-md-0">
                    Attendance History
                  </h5>
                  <span className="badge bg-primary">Current Month</span>
                </div>
                <div className="card-body">
                  <div className="table-responsive">
                    <table className="table table-hover">
                      <thead>
                        <tr>
                          <th>Date</th>
                          <th>Check In</th>
                          <th>Check Out</th>
                          <th>Working Hours</th>
                          <th>Status</th>
                          <th>Remarks</th>
                        </tr>
                      </thead>
                      <tbody>
                        {attendanceHistory.length === 0 ? (
                          <tr>
                            <td colSpan="6" className="text-center text-muted">
                              No attendance records found
                            </td>
                          </tr>
                        ) : (
                          attendanceHistory.map((record, index) => (
                            <tr
                              key={record._id || index}
                              className={isToday(record.date) ? "table-active" : ""}
                            >
                              <td>
                                {formatDate(record.date)}
                                {isToday(record.date) && (
                                  <span className="badge bg-info ms-2">Today</span>
                                )}
                                {isSunday(record.date) && (
                                  <span className="badge bg-secondary ms-2">Sunday</span>
                                )}
                              </td>
                              <td>{formatTime(record.checkIn)}</td>
                              <td>{formatTime(record.checkOut)}</td>
                              <td>{formatWorkingHours(record.workingHours)}</td>
                              <td>
                                <span
                                  className={`badge bg-${
                                    {
                                      present: "success",
                                      late: "warning",
                                      absent: "danger",
                                      "early-departure": "info",
                                      "paid-leave": "primary",
                                      "unpaid-leave": "secondary",
                                    }[record.status] || "secondary"
                                  }`}
                                >
                                  {record.status
                                    ? record.status.charAt(0).toUpperCase() +
                                      record.status.slice(1).replace(/-/g, " ")
                                    : "Unknown"}
                                </span>
                              </td>
                              <td>{record.leaveReason || "--"}</td>
                            </tr>
                          ))
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Leave Application Modal */}
      {showLeaveModal && (
        <div
          className="modal fade show"
          style={{ display: "block", backgroundColor: "rgba(0,0,0,0.5)" }}
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Apply for Leave</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setShowLeaveModal(false)}
                ></button>
              </div>
              <div className="modal-body">
                <div className="mb-3">
                  <label htmlFor="leaveDate" className="form-label">
                    Leave Date
                  </label>
                  <input
                    type="date"
                    className="form-control"
                    id="leaveDate"
                    value={leaveDate}
                    onChange={(e) => setLeaveDate(e.target.value)}
                    min={new Date().toISOString().split("T")[0]}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="leaveType" className="form-label">
                    Leave Type
                  </label>
                  <select
                    className="form-select"
                    id="leaveType"
                    value={leaveType}
                    onChange={(e) => setLeaveType(e.target.value)}
                  >
                    <option value="paid">Paid Leave</option>
                    <option value="unpaid">Unpaid Leave</option>
                  </select>
                </div>
                <div className="mb-3">
                  <label htmlFor="leaveReason" className="form-label">
                    Reason
                  </label>
                  <textarea
                    className="form-control"
                    id="leaveReason"
                    rows="3"
                    value={leaveReason}
                    onChange={(e) => setLeaveReason(e.target.value)}
                  ></textarea>
                </div>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => setShowLeaveModal(false)}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={handleApplyLeave}
                >
                  Apply
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        .navbar {
          z-index: 1000;
        }

        .navbar-brand {
          font-size: 1.25rem;
        }

        .nav-link {
          font-weight: 500;
          transition: color 0.3s ease;
        }

        .nav-link:hover {
          color: #667eea !important;
        }

        .nav-link.active {
          color: #667eea !important;
        }

        .dashboard-container {
          background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
          min-height: calc(100vh - 56px);
          padding: 0;
        }

        .time-card {
          border: none;
          border-radius: 20px;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
        }

        .current-time {
          font-size: 3.5rem;
          font-weight: 700;
        }

        .stats-card {
          border: none;
          border-radius: 20px;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
        }

        .card {
          border: none;
          border-radius: 15px;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
        }

        .table th {
          border-top: none;
          font-weight: 600;
          color: #6b7280;
          font-size: 0.85rem;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .table td {
          vertical-align: middle;
        }

        @media (max-width: 992px) {
          .current-time {
            font-size: 2.8rem;
          }
        }

        @media (max-width: 768px) {
          .current-time {
            font-size: 2.2rem;
          }

          .btn-lg {
            padding: 0.75rem 1.5rem;
            font-size: 1rem;
          }
        }

        @media (max-width: 576px) {
          .current-time {
            font-size: 1.8rem;
          }

          .card-body.py-5 {
            padding: 2rem 1rem !important;
          }

          .table {
            font-size: 0.85rem;
          }

          .badge {
            font-size: 0.7rem;
          }
        }
      `}</style>
    </>
  );
}