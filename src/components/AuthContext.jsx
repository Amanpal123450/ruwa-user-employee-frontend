// import { createContext, useContext, useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';

// const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {
//   const [user, setUser] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const navigate = useNavigate();

//   // Function to get the user profile
//   const getProfile = async (token) => {
//     try {
//       const response = await axios.get('https://ruwa-backend.onrender.com/api/auth/profile', {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });
      
//       // Use the profile data from the API
//       const profileData = {
//         ...response.data.user,
//         role: response.data.user.role, // Ensure role is included
//         profilePic: response.data.user.profilePic || 'https://randomuser.me/api/portraits/men/75.jpg',
//       };
      
//       setUser(profileData);
//       return profileData;
//     } catch (error) {
//       console.error('Failed to fetch user profile:', error);
//       logout(); // Log out if the profile fetch fails
//       return null;
//     }
//   };

//   // Function to handle login (both user and employee)
//   const login = async (identifier, password, role = 'user') => {
//     try {
//       const payload = role === 'user' 
//         ? { phone: identifier, password }
//         : { employeeId: identifier, password };

//       const response = await axios.post('https://ruwa-backend.onrender.com/api/auth/login', payload);
//    console.log(response)
//       const { token } = response.data;
//       console.log(token)
//       localStorage.setItem('token', token);
      

//       // Fetch the user profile immediately after successful login
//       const userData = await getProfile(token);
      
//       if (userData) {
//         // Navigate based on role
//         if (userData.role === 'EMPLOYEE') {
//           navigate('/employee-dashboard');
//         } else {
//           navigate('/profile');
//         }
//       }

//       return { 
//         success: true, 
//         user: userData,
//         message: `${userData?.role === 'EMPLOYEE' ? 'Employee' : 'User'} login successful!`
//       };
//     } catch (error) {
//       console.error('Login failed:', error);
//       return {
//         success: false,
//         error: error.response?.data?.message || 'Login failed',
//       };
//     }
//   };

//   // Function to handle logout
//   const logout = () => {
//     localStorage.removeItem('token');
//     delete axios.defaults.headers.common['Authorization'];
//     setUser(null);
//     navigate('/');
//   };

//   // Check for a token on initial load
//   useEffect(() => {
//     const token = localStorage.getItem('token');
//     if (token) {
//       axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
//       getProfile(token);
//     }
//     setLoading(false);
//   }, []);

//   const value = {
//     user,
//     login,
//     logout,
//     loading,
//     getProfile // Export this in case you need to refresh user data
//   };

//   return (
//     <AuthContext.Provider value={value}>
//       {!loading && children}
//     </AuthContext.Provider>
//   );
// };

// export const useAuth = () => {
//   const context = useContext(AuthContext);
//   if (!context) {
//     throw new Error('useAuth must be used within an AuthProvider');
//   }
//   return context;
// };

import { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Function to get the user profile
  const getProfile = async (token) => {
    try {
      const response = await axios.get(
        "https://ruwa-backend.onrender.com/api/auth/profile",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const profileData = {
        ...response.data.user,
        role: response.data.user.role,
        profilePic:
          response.data.user.profilePic ||
          "https://randomuser.me/api/portraits/men/75.jpg",
      };

      setUser(profileData);
      return profileData;
    } catch (error) {
      console.error("Failed to fetch user profile:", error);
      logout(); // Log out if the profile fetch fails
      return null;
    }
  };

  // Function to handle login
  const login = async (identifier, password, role = "user") => {
    try {
      const payload =
        role === "user"
          ? { phone: identifier, password }
          : { employeeId: identifier, password };

      const response = await axios.post(
        "https://ruwa-backend.onrender.com/api/auth/login",
        payload
      );

      const { token } = response.data;
      localStorage.setItem("token", token);

      // Fetch the user profile immediately
      const userData = await getProfile(token);

      if (userData) {
        if (userData.role === "EMPLOYEE") {
          navigate("/employee-dashboard");
        } else {
          navigate("/profile");
        }
      }

      return {
        success: true,
        user: userData,
        message: `${
          userData?.role === "EMPLOYEE" ? "Employee" : "User"
        } login successful!`,
      };
    } catch (error) {
      console.error("Login failed:", error);
      return {
        success: false,
        error: error.response?.data?.message || "Login failed",
      };
    }
  };

  // Function to handle logout
  const logout = () => {
    localStorage.removeItem("token");
    delete axios.defaults.headers.common["Authorization"];
    setUser(null);
    navigate("/");
  };

  // Check for a token on initial load
  useEffect(() => {
    const token = localStorage.getItem("token");
    const fetchUser = async () => {
      if (token) {
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        await getProfile(token); // wait for profile before finishing loading
      }
      setLoading(false);
    };
    fetchUser();
  }, []);

  const value = {
    user,
    login,
    logout,
    loading,
    getProfile,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
