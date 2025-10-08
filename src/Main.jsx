
import React, { useEffect, useState } from 'react';
import "./Main.css";
import { BrowserRouter, Route, Routes, useNavigate, useLocation } from 'react-router-dom';
import Header from "./components/Header";
import Footer from './components/Footer';
import Homepage from './Pages/Homepage';
import Aboutpage from './Pages/Aboutpage';
import Workpage from './Pages/Workpage';
import Servicepage from './Pages/Servicepage';
import Contactpage from './Pages/Contactpage';
import Featuerpage from './Pages/Featuerpage';
import LearnMore from './Pages/LearnMore';
import ForgotPass from './components/Forgetpass';
import Swvimanyojna from './Pages/Swvimanyojna';
import Arogycard from './Pages/Arogycard';
import { AuthProvider, useAuth } from './components/AuthContext';
import ModalForm from './components/ModalForm';
import AmbilancePage from './Pages/AmbilancePage';
import InsurancePage from './Pages/InsurancePage';
import TermsConditionsPage from './Pages/TermsConditionsPage';
import PrivacyPolicyPage from './Pages/PrivacyPolicyPage';
import LeadershipPage from './Pages/LeadershipPage';
import CaseStudyPage from './Pages/CaseStudyPage';
import ProfilePage from './Pages/ProfilePage';
import Arogaycardpage from './Pages/Arogaycardpage';
import JanarogayKendrPage from './Pages/JanarogayKendrPage';
import KendraSopPage from './Pages/KendraSopPage';
import KendraformPage from './Pages/KendraformPage';
import MainPolicyPage from './Pages/MainPolicyPage';
import LoginPage from './Pages/LoginPage';
import RegisterPage from './Pages/RegisterPage';
import ComingSoonPage from './Pages/ComingSoonPage';
import CareerPage from './Pages/CareerPage';
import FeedbackPage from './Pages/FeedbackPage';
import EmployeeDashboard from './Pages/EmployeeDashboard';
import EmployeeProfile from './Pages/EmployeeProfile';
import ManageUsers from './Pages/ManageUsers';
import Swal from 'sweetalert2';
import Empservices from './components/Empservices';
import Empjansewa from './components/Empjansewa';
import Emparogaycard from './components/Emparogaycard';
import Empambulance from './components/Empambulance';
import Empinsurance from './components/Empinsurance';
import Empkendra from './components/Empkendra';
import Empidente from './components/Empidente';
import EmpApplication from './components/EmpApplication';
import EmployeeAttendance from './Pages/EmployeeAttendance';
import { ToastContainer } from 'react-toastify';
import Empusers from './Pages/Empusers';
import LocationTracker from './components/LocationTracker';
import WalletApp from './components/wallet';
import JobApplicationForm from './Pages/JobApplicationForm';

// Scroll to top component
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function ProtectedRoute({ children }) {
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && (!user || user.role !== "USER")) {
      Swal.fire({
        icon: "warning",
        title: "Access Denied",
        text: "Please login with a user account to continue",
        confirmButtonText: "OK",
      }).then(() => {
        navigate("/", { replace: true });
      });
    }
  }, [loading, user, navigate]);

  if (loading) return <div>Loading...</div>;
  return user?.role === "USER" ? children : null;
}

function EmployeeProtectedRoute({ children }) {
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
   
    if (!loading && (!user || user.role !== "EMPLOYEE")) {
      Swal.fire({
        icon: "warning",
        title: "Access Denied",
        text: "Employee login required to access this page",
        confirmButtonText: "OK",
      }).then(() => {
        navigate("/", { replace: true });
      });
    }
  }, [loading, user, navigate]);

  if (loading) return <div>Loading...</div>;
  return user?.role === "EMPLOYEE" ? children : null;
}

function AuthWrapper({ showModal, setShowModal }) {
  const { user, loading } = useAuth();
  const location = useLocation();

  // Hide modal for employee routes
  const hideModalForEmployeeRoutes = location.pathname.startsWith("/employee");

  useEffect(() => {
    if (!hideModalForEmployeeRoutes) {
      const hasShown = sessionStorage.getItem("modalShown");
      if (!hasShown) {
        setTimeout(() => {
          setShowModal(true);
          sessionStorage.setItem("modalShown", "true");
        }, 2000);
      }
    }
  }, [hideModalForEmployeeRoutes, setShowModal]);
  const userId = localStorage.getItem("token");

  return (
    <>
      {/* Show modal only if not employee route */}
      {!hideModalForEmployeeRoutes && (
        <ModalForm isOpen={showModal} onClose={() => setShowModal(false)} />
      )}
      <LocationTracker employeeId={userId} />

      <Header />
   
      <Routes>
        {/* Public Routes */}
        <Route path='/' element={<Homepage />} />
        <Route path='/about' element={<Aboutpage />} />
        <Route path='/Featuers' element={<Featuerpage />} />
        <Route path='/how-it-work' element={<Workpage />} />
        <Route path='/services' element={<Servicepage />} />
        <Route path='/contact' element={<Contactpage />} />
        <Route path='/learnmore' element={<LearnMore />} />
        <Route path='/terms' element={<TermsConditionsPage />} />
        <Route path='/privacy' element={<PrivacyPolicyPage />} />
        <Route path='/leader' element={<LeadershipPage />} />
        <Route path='/case' element={<CaseStudyPage />} />
        <Route path='/allpolicy' element={<MainPolicyPage />} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/register' element={<RegisterPage />} />
        <Route path='/forgot-password' element={<ForgotPass />} />
        <Route path='/comingsoon' element={<ComingSoonPage />} />
        <Route path='/feedback' element={<FeedbackPage />} />
        <Route path='/WalletApp' element={<WalletApp />} />

        {/* User Protected Routes */}
        <Route path='/profile' element={<ProtectedRoute><ProfilePage /></ProtectedRoute>} />
        <Route path='/profilecard' element={<ProtectedRoute><Arogaycardpage /></ProtectedRoute>} />
        <Route path='/apply-swabhiman' element={<ProtectedRoute><Swvimanyojna /></ProtectedRoute>} />
        <Route path='/apply-arogya' element={<ProtectedRoute><Arogycard /></ProtectedRoute>} />
        <Route path='/apply-ambulance' element={<ProtectedRoute><AmbilancePage /></ProtectedRoute>} />
        <Route path='/apply-insurance' element={<ProtectedRoute><InsurancePage /></ProtectedRoute>} />
        <Route path='/apply-kendr' element={<ProtectedRoute><JanarogayKendrPage /></ProtectedRoute>} />
        <Route path='/kendr-sop' element={<ProtectedRoute><KendraSopPage /></ProtectedRoute>} />
        <Route path='/apply-kendrform' element={<ProtectedRoute><KendraformPage /></ProtectedRoute>} />
        <Route path='/career' element={<ProtectedRoute><CareerPage /></ProtectedRoute>} />
        <Route path='/job-form' element={<ProtectedRoute><JobApplicationForm /></ProtectedRoute>} />
        <Route path='/feedback' element={<ProtectedRoute><FeedbackPage /></ProtectedRoute>} />

        {/* Employee Protected Routes */}
        <Route path='/employee-dashboard' element={<EmployeeProtectedRoute><EmployeeDashboard /></EmployeeProtectedRoute>} />
        <Route path='/employee-profile' element={<EmployeeProtectedRoute><EmployeeProfile /></EmployeeProtectedRoute>} />
        <Route path='/manage-users' element={<EmployeeProtectedRoute><ManageUsers /></EmployeeProtectedRoute>} />
        <Route path='/employee-services' element={<EmployeeProtectedRoute><Empservices /></EmployeeProtectedRoute>} />
        <Route path='/employee/apply-swabhiman' element={<EmployeeProtectedRoute><Empjansewa /></EmployeeProtectedRoute>} />
        <Route path='/employee/apply-arogya' element={<EmployeeProtectedRoute><Emparogaycard /></EmployeeProtectedRoute>} />
        <Route path='/employee/apply-ambulance' element={<EmployeeProtectedRoute><Empambulance /></EmployeeProtectedRoute>} />
        <Route path='/employee/apply-insurance' element={<EmployeeProtectedRoute><Empinsurance /></EmployeeProtectedRoute>} />
        <Route path='/employee/apply-kendra' element={<EmployeeProtectedRoute><Empkendra /></EmployeeProtectedRoute>} />
        <Route path='/employee-id' element={<EmployeeProtectedRoute><Empidente /></EmployeeProtectedRoute>} />
        <Route path='/manage-applications' element={<EmployeeProtectedRoute><EmpApplication /></EmployeeProtectedRoute>} />
        <Route path='/employee-att' element={<EmployeeProtectedRoute><EmployeeAttendance /></EmployeeProtectedRoute>} />
        <Route path='/employee-userhistory' element={<EmployeeProtectedRoute><Empusers /></EmployeeProtectedRoute>} />
      </Routes>

      <ToastContainer />

      {/* Footer logic: visible for guests & USER, hidden for EMPLOYEE */}
      {!loading && (!user || user.role === "USER") && <Footer />}
    </>
  );
}

export default function Main() {
  const [showModal, setShowModal] = useState(false);

  return (
    <BrowserRouter>
      <ScrollToTop />
      <AuthProvider>
        <AuthWrapper showModal={showModal} setShowModal={setShowModal} />
      </AuthProvider>
    </BrowserRouter>
  );
}
