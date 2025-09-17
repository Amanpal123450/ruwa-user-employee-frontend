import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "./AuthContext";
import { FaUser, FaIdCard, FaPhoneAlt, FaEnvelope, FaLock, FaCalendarAlt } from "react-icons/fa";

import axios from "axios";

export default function Header() {
  const { user, logout, login } = useAuth();
  const [phone, setPhone] = useState("");
  const [employeeId, setEmployeeId] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("user"); // role selector
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // Remove Bootstrap modal backdrops
  const removeModalBackdrop = () => {
    const backdrops = document.querySelectorAll(".modal-backdrop");
    backdrops.forEach((backdrop) => backdrop.remove());
    document.body.classList.remove("modal-open");
    document.body.style = "";
  };

  useEffect(() => {
    removeModalBackdrop();
  }, [location.pathname]);

  // Updated Login Handler
  const handleLogin = async (e) => {
    e.preventDefault();

    if (!password || (!phone && !employeeId)) {
      alert("Please fill in all required fields");
      return;
    }

    try {
      const identifier = role === "user" ? phone : employeeId;
      const result = await login(identifier, password, role);

      if (result.success) {
        const loginModalElement = document.getElementById("loginModal");
        const loginModal =
          window.bootstrap.Modal.getInstance(loginModalElement);
        if (loginModal) loginModal.hide();

        alert(result.message);

        // Clear form
        setPhone("");
        setEmployeeId("");
        setPassword("");
        setRole("user");
      } else {
        alert(result.error);
      }
    } catch (err) {
      alert("Login failed. Please try again.");
    }
  };

  const handleLogout = () => {
    const confirmed = window.confirm("Are you sure you want to log out?");
    if (confirmed) {
      logout();
      alert("Logged out successfully.");
    }
  };

  const closeOffcanvas = () => {
    const offcanvasElement = document.getElementById("fbs__net-navbars");
    const offcanvasInstance =
      window.bootstrap?.Offcanvas.getInstance(offcanvasElement);
    if (offcanvasInstance) offcanvasInstance.hide();
  };

  // Register
  const [registerData, setRegisterData] = useState({
    name: "",
    phone: "",
    email: "", // ✅ email add
     aadhar: "",   // ✅ add this
    password: "",
    confirmPassword: "",
    age: "",
  });

  const handleRegisterChange = (e) => {
    const { name, value } = e.target;
    setRegisterData((prev) => ({ ...prev, [name]: value }));
  };

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();

    if (registerData.password !== registerData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    try {
      const response = await axios.post(
        "https://ruwa-backend.onrender.com/api/auth/register",
        {
          name: registerData.name,
          phone: registerData.phone,
          email: registerData.email,
           aadhar: registerData.aadhar,  
          password: registerData.password,
          age: registerData.age,
          role: "user", // always user
        }
      );

      if (response.data.token) {
        alert("Registered Successfully!");
        const registerModalElement = document.getElementById("registerModal");
        const registerModal =
          window.bootstrap.Modal.getInstance(registerModalElement);
        if (registerModal) registerModal.hide();

        removeModalBackdrop();
        const loginModal = new window.bootstrap.Modal(
          document.getElementById("loginModal")
        );
        loginModal.show();
      }
    } catch (error) {
      alert(error.response?.data?.message || "Registration failed");
    }
  };

  // Get navigation items based on user role
  const getNavigationItems = () => {
    if (user?.role === "EMPLOYEE") {
      return [
        { label: "Dashboard", path: "/employee-dashboard" },
        { label: "Manage Users", path: "/manage-users" },

        { label: "Services", path: "/employee-services" },
        { label: "Applications", path: "/manage-applications" },
      ];
    } else {
      return [
        { label: "Home", path: "/" },
        { label: "About Us", path: "/about" },
        { label: "Services", path: "/services" },
        { label: "Contact", path: "/contact" },
      ];
    }
  };

  const getUserActions = () => {
    if (user?.role === "EMPLOYEE") {
      return [
        { label: "My Profile", path: "/employee-profile" },
        { label: "Empolyee ID", path: "/employee-id" },
        { label: "Settings", path: "/employee-settings" },
      ];
    } else {
      return [
        { label: "My Profile", path: "/profile" },
        { label: "Card", path: "/profilecard" },
      ];
    }
  };

  return (
    <>
      <header className="fbs__net-navbar navbar bg-light navbar-expand-lg dark">
        <div className="container d-flex align-items-center justify-content-between">
          {/* Logo */}
          <Link
            className="navbar-brand w-auto"
            to={user?.role === "EMPLOYEE" ? "/employee-dashboard" : "/"}
          >
            <img
              className="logo dark img-fluid d-lg-none"
              src="\assets\images\logowithoutbg.png"
              alt="Ruwa India Logo"
              style={{ height: "50px" }}
            />
            <img
              className="logo dark img-fluid d-none d-lg-block"
              src="\assets\images\logowithoutbg.png"
              alt="Ruwa India Logo"
              style={{ height: "70px" }}
            />
          </Link>

          {/* Offcanvas Menu */}
          <div
            className="offcanvas offcanvas-start w-75"
            id="fbs__net-navbars"
            tabIndex="-1"
          >
            <div className="offcanvas-header justify-content-between align-items-center">
              {user ? (
                <div className="d-flex align-items-center gap-2">
                  <img
                    src={
                      user.profilePic ||
                      "https://randomuser.me/api/portraits/men/75.jpg"
                    }
                    alt="User"
                    style={{ width: 40, height: 40, borderRadius: "50%" }}
                  />
                  <div>
                    <strong className="text-dark d-block">
                      {user.name
                        ? user.name.charAt(0).toUpperCase() + user.name.slice(1)
                        : "User"}
                    </strong>
                    <small className="text-muted text-id">
                      {user.role === "EMPLOYEE"
                        ? `ID: ${user.employeeId}`
                        : "User"}
                    </small>
                  </div>
                </div>
              ) : (
                <Link className="logo-link" id="fbs__net-navbarsLabel" to="/">
                  <img
                    className="logo dark img-fluid"
                    src="\assets\images\logowithoutbg.png"
                    alt="Ruwa India Logo"
                    style={{ height: "70px" }}
                  />
                </Link>
              )}
              <button
                className="btn-close btn-close-black ms-2"
                type="button"
                data-bs-dismiss="offcanvas"
                aria-label="Close"
              ></button>
            </div>

            <div className="offcanvas-body align-items-lg-center">
              <ul className="navbar-nav nav me-auto ps-lg-5 mb-2 mb-lg-0">
                {getNavigationItems().map((item, index) => (
                  <li key={index} className="nav-item fw-bold">
                    <Link
                      className="nav-link"
                      onClick={closeOffcanvas}
                      to={item.path}
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>

              <div className="d-lg-none mt-3 ">
                {!user ? (
                  <>
                    <button
                      className="btn btn-primary w-100 mb-2"
                      data-bs-toggle="modal"
                      onClick={closeOffcanvas}
                      data-bs-target="#registerModal"
                    >
                      Register
                    </button>
                    <button
                      className="btn btn-outline-dark w-100 mb-2"
                      data-bs-toggle="modal"
                      onClick={closeOffcanvas}
                      data-bs-target="#loginModal"
                    >
                      Login
                    </button>
                  </>
                ) : (
                  <>
                    {getUserActions().map((action, index) => (
                      <Link
                        key={index}
                        className="btn btn-outline-dark w-100 mb-2"
                        onClick={closeOffcanvas}
                        to={action.path}
                      >
                        {action.label}
                      </Link>
                    ))}
                    <button
                      className="btn btn-danger w-100"
                      onClick={handleLogout}
                    >
                      Logout
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>

          {/* Desktop Right Buttons */}
          <div className="ms-auto w-auto d-none d-lg-flex">
            <div className="header-social d-flex align-items-center gap-2">
              {!user ? (
                <>
                  <button
                    className="btn btn-primary py-2"
                    data-bs-toggle="modal"
                    data-bs-target="#registerModal"
                  >
                    Register
                  </button>
                  <button
                    className="btn btn-outline-light py-2"
                    data-bs-toggle="modal"
                    data-bs-target="#loginModal"
                  >
                    Login
                  </button>
                </>
              ) : (
                <div className="dropdown">
                  <button
                    className="btn btn-outline-light dropdown-toggle d-flex align-items-center"
                    id="profileDropdown"
                    data-bs-toggle="dropdown"
                  >
                    <img
                      src={
                        user.profilePic ||
                        "https://randomuser.me/api/portraits/men/75.jpg"
                      }
                      alt="avatar"
                      style={{
                        width: 30,
                        height: 30,
                        borderRadius: "50%",
                        marginRight: 8,
                      }}
                    />
                    <div className="text-start">
                      <div>
                        {user.name
                          ? user.name.charAt(0).toUpperCase() +
                            user.name.slice(1)
                          : "User"}
                      </div>
                      {user.role === "EMPLOYEE" && (
                        <small
                          className="textd-block"
                          style={{ fontSize: "0.75rem", lineHeight: 1 }}
                        >
                          {user.employeeId}
                        </small>
                      )}
                    </div>
                  </button>
                  <ul className="dropdown-menu">
                    {getUserActions().map((action, index) => (
                      <li key={index}>
                        <Link className="dropdown-item" to={action.path}>
                          {action.label}
                        </Link>
                      </li>
                    ))}
                    <li>
                      <hr className="dropdown-divider" />
                    </li>
                    <li>
                      <button className="dropdown-item" onClick={handleLogout}>
                        Logout
                      </button>
                    </li>
                  </ul>
                </div>
              )}
            </div>
          </div>

          {/* Toggle Button */}
          <button
            className="fbs__net-navbar-toggler ms-auto"
            data-bs-toggle="offcanvas"
            data-bs-target="#fbs__net-navbars"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="list-icon"
            >
              <line x1="21" x2="3" y1="6" y2="6"></line>
              <line x1="15" x2="3" y1="12" y2="12"></line>
              <line x1="17" x2="3" y1="18" y2="18"></line>
            </svg>
          </button>
        </div>
      </header>

      {/* Register Modal */}
    <div
  className="modal fade"
  id="registerModal"
  tabIndex="-1"
  aria-hidden="true"
>
  <div className="modal-dialog modal-dialog-centered">
    <div className="modal-content rounded-2xl shadow-lg">
      <div className="modal-header border-b px-4 py-2">
        <h5 className="modal-title font-semibold text-lg">Register</h5>
        <button
          type="button"
          className="btn-close"
          data-bs-dismiss="modal"
        ></button>
      </div>
      <div className="modal-body p-4">
        <form onSubmit={handleRegisterSubmit} className="space-y-4">
          {/* Full Name */}
          <div className="relative">
            <FaUser className="absolute left-3 top-3 text-gray-400" />
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={registerData.name}
              onChange={handleRegisterChange}
              required
              className="w-full pl-10 pr-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

          {/* Aadhar */}
          <div className="relative">
            <FaIdCard className="absolute left-3 top-3 text-gray-400" />
            <input
              type="text"
              name="aadhar"
              placeholder="Aadhar Number"
              value={registerData.aadhar}
              onChange={handleRegisterChange}
              required
              className="w-full pl-10 pr-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

          {/* Phone */}
          <div className="relative">
            <FaPhoneAlt className="absolute left-3 top-3 text-gray-400" />
            <input
              type="tel"
              name="phone"
              placeholder="Phone Number"
              value={registerData.phone}
              onChange={handleRegisterChange}
              required
              className="w-full pl-10 pr-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

          {/* Email */}
          <div className="relative">
            <FaEnvelope className="absolute left-3 top-3 text-gray-400" />
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={registerData.email}
              onChange={handleRegisterChange}
              required
              className="w-full pl-10 pr-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

          {/* Age */}
          <div className="relative">
            <FaCalendarAlt className="absolute left-3 top-3 text-gray-400" />
            <input
              type="number"
              name="age"
              placeholder="Age"
              value={registerData.age}
              onChange={handleRegisterChange}
              required
              className="w-full pl-10 pr-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

          {/* Password */}
          <div className="relative">
            <FaLock className="absolute left-3 top-3 text-gray-400" />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={registerData.password}
              onChange={handleRegisterChange}
              required
              className="w-full pl-10 pr-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

          {/* Confirm Password */}
          <div className="relative">
            <FaLock className="absolute left-3 top-3 text-gray-400" />
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              value={registerData.confirmPassword}
              onChange={handleRegisterChange}
              required
              className="w-full pl-10 pr-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg transition"
          >
            Register
          </button>
        </form>
      </div>
    </div>
  </div>
</div>

      {/* Login Modal */}
      <div
        className="modal fade"
        id="loginModal"
        tabIndex="-1"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Login</h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
              ></button>
            </div>
            <div className="modal-body">
              <form onSubmit={handleLogin}>
                {/* Role Selection */}
                <select
                  className="form-select mb-3"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                >
                  <option value="user">User Login</option>
                  <option value="employee">Employee Login</option>
                </select>

                {/* User Fields */}
                {role === "user" && (
                  <input
                    type="tel"
                    className="form-control mb-3"
                    placeholder="Phone Number"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                )}

                {/* Employee Fields */}
                {role === "employee" && (
                  <input
                    type="text"
                    className="form-control mb-3"
                    placeholder="Employee ID"
                    value={employeeId}
                    onChange={(e) => setEmployeeId(e.target.value)}
                  />
                )}

                {/* Password */}
                <div className="mb-3 position-relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    className="form-control"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  <i
                    className={`bi ${
                      showPassword ? "bi-eye-slash" : "bi-eye"
                    } position-absolute top-50 end-0 translate-middle-y me-3`}
                    onClick={() => setShowPassword(!showPassword)}
                    style={{ cursor: "pointer" }}
                  ></i>
                </div>

                <button type="submit" className="btn btn-primary w-100">
                  Login
                </button>
              </form>

              <div className="text-center mt-3">
                <p>
                  Don't have an account?{" "}
                  <Link
                    data-bs-dismiss="modal"
                    data-bs-toggle="modal"
                    data-bs-target="#registerModal"
                  >
                    Register
                  </Link>
                </p>
                <p>
                  <Link
                    data-bs-dismiss="modal"
                    data-bs-toggle="modal"
                    data-bs-target="#forgotModal"
                  >
                    Forgot Password?
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Forgot Password Modal */}
      <div
        className="modal fade"
        id="forgotModal"
        tabIndex="-1"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Forgot Password</h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
              ></button>
            </div>
            <div className="modal-body">
              <form>
                <input
                  type="text"
                  className="form-control mb-3"
                  placeholder="Email or phone number"
                />
                <button type="submit" className="btn btn-primary w-100">
                  Reset Password
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
