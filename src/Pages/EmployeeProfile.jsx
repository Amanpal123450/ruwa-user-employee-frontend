import React, { useState, useEffect } from "react";
import {
  User,
  Edit3,
  Save,
  X,
  Camera,
  Lock,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Building,
  Award,
  TrendingUp,
  Users,
  FileText,
  Shield,
  CheckCircle,
  Bell,
  Settings,
  Star,
  Activity,
  Menu,
  ChevronLeft,
} from "lucide-react";

export default function EmployeeProfile() {
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    name: "John Smith",
    employeeId: "EMP001",
    email: "john.smith@company.com",
    phone: "+1 (555) 123-4567",
    department: "Engineering",
    position: "Senior Software Engineer",
    joinDate: "2023-01-15",
    address: "123 Main Street, City, State 12345",
    profilePic: "",
    DOB: "",
    totalUsers:"",
    totalServicesApplied:"",
    approvalRate:""
  });
  const [saveAnimation, setSaveAnimation] = useState(false);
  const [imageFile, setImageFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  // Mock API call simulation - using localStorage fallback for demo
  useEffect(() => {
    const fetchEmployeeData = async () => {
      try {
        // Simulate API call with fallback data for demo
        const mockData = {
          profile: profileData
        };
        
      
        const token = localStorage?.getItem("token");
        if (!token) return;
        
        const res = await fetch("https://ruwa-backend.onrender.com/api/employee/profile", {
          method: "GET",
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        if (res.ok) {
          setProfileData({
            name: data.profile.name,
            employeeId: data.profile.employeeId,
            email: data.profile.email,
            phone: data.profile.phone,
            department: data.profile.department,
            position: data.profile.position,
            joinDate: data.profile.joinDate,
            address: data.profile.address,
            DOB: data.profile.DOB,
            totalUsers:data.totalApplications,
            totalServicesApplied:data.totalServicesApplied,
            approvalRate:data.approvalRate
          });
        }
        
      } catch (err) {
        console.error("Error fetching profile:", err);
      }
    };
    fetchEmployeeData();
  }, []);
const formattedDate = (value) => {
  if (!value) return "N/A";

  // ensure it's a number
  const timestamp = typeof value === "string" ? Number(value) : value;
  const date = new Date(timestamp);

  if (isNaN(date.getTime())) return "N/A";

  return date.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Local preview
    setImageFile(file);
    const previewUrl = URL.createObjectURL(file);
    setPreview(previewUrl);
    setProfileData((prev) => ({
      ...prev,
      profilePic: previewUrl,
    }));

  
    try {
      const formData = new FormData();
      formData.append("image", file);
      const token = localStorage?.getItem("token");

      const res = await fetch("https://ruwa-backend.onrender.com/api/uu/upload-profile", {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      });

      const data = await res.json();
      if (res.ok && data.url) {
        setProfileData((prev) => ({ ...prev, profilePic: data.url }));
      }
    } catch (err) {
      console.error("Upload error:", err);
    }
    
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfileData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleUpdateDOB = async (newDOB) => {
    if (!newDOB) return;

    setProfileData((prev) => ({
      ...prev,
      DOB: newDOB,
    }));

    
    try {
      const token = localStorage?.getItem("token");
      const res = await fetch("https://ruwa-backend.onrender.com/api/uu/upload-DOB", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ DOB: newDOB }),
      });

      const data = await res.json();
      if (res.ok) {
        setProfileData((prev) => ({
          ...prev,
          DOB: data.profile?.DOB || newDOB,
        }));
      }
    } catch (err) {
      console.error("DOB update error:", err);
    }
    
  };

  const handleSave = async () => {
    setSaveAnimation(true);
    // Simulate API save
    setTimeout(() => {
      setIsEditing(false);
      setSaveAnimation(false);
    }, 2000);
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

const formatDate = (value) => {
  if (!value) return "N/A";

  // if it's a number (timestamp), convert to Number
  const date = typeof value === "number" ? new Date(value) : new Date(value);

  if (isNaN(date.getTime())) return "N/A";

  return date.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};


  return (
    <>
      <style>{`
        :root {
          --primary-gradient: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          --secondary-gradient: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
          --success-gradient: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
          --warning-gradient: linear-gradient(135deg, #43e97b 0%, #38f9d7 100%);
          --glass-bg: rgba(255, 255, 255, 0.25);
          --glass-border: rgba(255, 255, 255, 0.18);
          --shadow-soft: 0 8px 32px 0 rgba(31, 38, 135, 0.15);
          --shadow-hover: 0 15px 35px 0 rgba(31, 38, 135, 0.25);
          --transition: all 0.4s cubic-bezier(0.25, 0.8, 0.25, 1);
        }

        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        body {
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
          background: var(--primary-gradient);
          min-height: 100vh;
          overflow-x: hidden;
          color: #1a202c;
          line-height: 1.6;
        }

        .container-fluid-pro {
          max-width: 1400px;
          margin: 0 auto;
          padding: 1rem;
        }

        /* Mobile-first responsive container */
        @media (min-width: 576px) {
          .container-fluid-pro {
            padding: 1.5rem;
          }
        }

        @media (min-width: 768px) {
          .container-fluid-pro {
            padding: 2rem;
          }
        }

        @media (min-width: 1200px) {
          .container-fluid-pro {
            padding: 2.5rem;
          }
        }

        /* Glassmorphism effect */
        .glass-card {
          background: rgba(255, 255, 255, 0.95);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.3);
          box-shadow: var(--shadow-soft);
          transition: var(--transition);
          color: #1a202c;
        }

        .glass-card:hover {
          box-shadow: var(--shadow-hover);
          transform: translateY(-2px);
        }

        /* Profile Header - Mobile First */
        .profile-hero {
          background: linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%);
          backdrop-filter: blur(30px);
          border-radius: 16px;
          border: 1px solid rgba(255,255,255,0.2);
          position: relative;
          overflow: hidden;
          margin-bottom: 1.5rem;
        }

        @media (min-width: 768px) {
          .profile-hero {
            border-radius: 24px;
            margin-bottom: 2rem;
          }
        }

        @media (min-width: 992px) {
          .profile-hero {
            margin-bottom: 3rem;
          }
        }

        .profile-hero::before {
          content: '';
          position: absolute;
          top: -50%;
          left: -50%;
          width: 200%;
          height: 200%;
          background: radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 70%);
          animation: rotate 20s linear infinite;
        }

        @keyframes rotate {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        /* Responsive Profile Header Content */
        .profile-header-content {
          padding: 1.5rem;
          position: relative;
          z-index: 2;
        }

        @media (min-width: 576px) {
          .profile-header-content {
            padding: 2rem;
          }
        }

        @media (min-width: 768px) {
          .profile-header-content {
            padding: 2.5rem;
          }
        }

        @media (min-width: 992px) {
          .profile-header-content {
            padding: 3rem;
          }
        }

        /* Mobile Header Layout */
        .mobile-header {
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          gap: 1rem;
        }

        @media (min-width: 768px) {
          .mobile-header {
            flex-direction: row;
            text-align: left;
            justify-content: space-between;
          }
        }

        /* Profile Title Responsive */
        .profile-title {
          font-size: 1.75rem;
          font-weight: 700;
          color: white;
          text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
          margin-bottom: 0.5rem;
          line-height: 1.2;
        }

        @media (min-width: 576px) {
          .profile-title {
            font-size: 2rem;
          }
        }

        @media (min-width: 768px) {
          .profile-title {
            font-size: 2.5rem;
          }
        }

        @media (min-width: 992px) {
          .profile-title {
            font-size: 3rem;
          }
        }

        .profile-subtitle {
          font-size: 0.9rem;
          color: rgba(255, 255, 255, 0.8);
          margin-bottom: 1rem;
        }

        @media (min-width: 576px) {
          .profile-subtitle {
            font-size: 1rem;
          }
        }

        @media (min-width: 768px) {
          .profile-subtitle {
            font-size: 1.1rem;
          }
        }

        /* Profile Controls (Image Upload + DOB) */
        .profile-controls {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 1rem;
          width: 100%;
          max-width: 200px;
        }

        @media (min-width: 768px) {
          .profile-controls {
            width: auto;
            max-width: none;
          }
        }

        /* Camera Button Responsive */
        .camera-btn {
          width: 50px;
          height: 50px;
          border-radius: 50%;
          background: linear-gradient(135deg, #667eea, #764ba2);
          border: 2px solid white;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: var(--transition);
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        }

        @media (min-width: 576px) {
          .camera-btn {
            width: 60px;
            height: 60px;
          }
        }

        .camera-btn:hover {
          transform: scale(1.1);
          box-shadow: 0 6px 20px rgba(0, 0, 0, 0.25);
        }

        /* DOB Input Responsive */
        .dob-input {
          width: 100%;
        }

        .dob-input label {
          font-size: 0.75rem;
          font-weight: 600;
          color: rgba(255, 255, 255, 0.8);
          margin-bottom: 0.25rem;
          display: block;
        }

        .dob-input input {
          width: 100%;
          padding: 0.5rem;
          border: 1px solid rgba(255, 255, 255, 0.3);
          border-radius: 8px;
          background: rgba(255, 255, 255, 0.1);
          color: white;
          font-size: 0.875rem;
          backdrop-filter: blur(10px);
        }

        .dob-input input:focus {
          outline: none;
          border-color: rgba(255, 255, 255, 0.6);
          background: rgba(255, 255, 255, 0.15);
        }

        /* Status Badge Responsive */
        .status-badge {
          background: linear-gradient(135deg, #4ade80, #22c55e);
          color: white;
          padding: 0.5rem 1rem;
          border-radius: 50px;
          font-weight: 600;
          font-size: 0.75rem;
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          box-shadow: 0 4px 16px rgba(34, 197, 94, 0.3);
        }

        @media (min-width: 576px) {
          .status-badge {
            font-size: 0.875rem;
            padding: 0.5rem 1.25rem;
          }
        }

        /* Modern Cards Responsive */
        .modern-card {
          background: rgba(255, 255, 255, 0.98);
          border-radius: 16px;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
          border: 1px solid rgba(255, 255, 255, 0.2);
          overflow: hidden;
          transition: var(--transition);
          color: #1a202c;
          margin-bottom: 1rem;
        }

        @media (min-width: 768px) {
          .modern-card {
            border-radius: 20px;
            margin-bottom: 1.5rem;
          }
        }

        .modern-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 8px 40px rgba(0, 0, 0, 0.15);
        }

        .card-header-modern {
          background: linear-gradient(135deg, rgba(102, 126, 234, 0.05), rgba(118, 75, 162, 0.05));
          border-bottom: 1px solid rgba(102, 126, 234, 0.1);
          padding: 1rem;
          color: #1a202c;
        }

        @media (min-width: 576px) {
          .card-header-modern {
            padding: 1.25rem;
          }
        }

        @media (min-width: 768px) {
          .card-header-modern {
            padding: 1.5rem;
          }
        }

        .card-body-responsive {
          padding: 1rem;
        }

        @media (min-width: 576px) {
          .card-body-responsive {
            padding: 1.25rem;
          }
        }

        @media (min-width: 768px) {
          .card-body-responsive {
            padding: 1.5rem;
          }
        }

        /* Form Controls Responsive */
        .form-control-modern {
          border: 2px solid #e2e8f0;
          border-radius: 8px;
          padding: 0.75rem;
          font-size: 0.875rem;
          font-weight: 500;
          transition: var(--transition);
          background: rgba(255, 255, 255, 0.9);
          color: #1a202c;
          width: 100%;
        }

        @media (min-width: 576px) {
          .form-control-modern {
            border-radius: 10px;
            font-size: 0.9rem;
          }
        }

        @media (min-width: 768px) {
          .form-control-modern {
            border-radius: 12px;
            padding: 0.875rem;
            font-size: 1rem;
          }
        }

        .form-control-modern:focus {
          border-color: #667eea;
          box-shadow: 0 0 0 0.25rem rgba(102, 126, 234, 0.15);
          background: white;
          outline: none;
        }

        .form-control-modern:disabled {
          background: rgba(248, 250, 252, 0.8);
          border-color: #e2e8f0;
          color: #64748b;
          font-weight: 500;
        }

        /* Form Labels Responsive */
        .form-label {
          font-weight: 600;
          color: #374151;
          margin-bottom: 0.5rem;
          font-size: 0.75rem;
          letter-spacing: 0.025em;
          display: block;
        }

        @media (min-width: 576px) {
          .form-label {
            font-size: 0.8rem;
          }
        }

        @media (min-width: 768px) {
          .form-label {
            font-size: 0.875rem;
          }
        }

        /* Stats Cards Responsive Grid */
        .stats-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 0.75rem;
        }

        @media (min-width: 576px) {
          .stats-grid {
            gap: 1rem;
          }
        }

        @media (min-width: 768px) {
          .stats-grid {
            gap: 1rem;
          }
        }

        .stat-card {
          background: rgba(255, 255, 255, 0.9);
          border-radius: 12px;
          padding: 1rem;
          text-align: center;
          transition: var(--transition);
          position: relative;
          overflow: hidden;
          border: 1px solid rgba(102, 126, 234, 0.1);
        }

        @media (min-width: 576px) {
          .stat-card {
            border-radius: 14px;
            padding: 1.25rem;
          }
        }

        @media (min-width: 768px) {
          .stat-card {
            border-radius: 16px;
            padding: 1.5rem;
          }
        }

        .stat-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 3px;
          background: var(--primary-gradient);
        }

        @media (min-width: 768px) {
          .stat-card::before {
            height: 4px;
          }
        }

        .stat-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
          background: rgba(255, 255, 255, 0.95);
        }

        @media (min-width: 768px) {
          .stat-card:hover {
            transform: translateY(-6px);
            box-shadow: 0 12px 32px rgba(0, 0, 0, 0.15);
          }
        }

        .stat-number {
          font-size: 1.5rem;
          font-weight: 800;
          background: var(--primary-gradient);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          line-height: 1.2;
          margin-bottom: 0.25rem;
        }

        @media (min-width: 576px) {
          .stat-number {
            font-size: 1.75rem;
          }
        }

        @media (min-width: 768px) {
          .stat-number {
            font-size: 2rem;
          }
        }

        .stat-label {
          color: #4a5568;
          font-weight: 600;
          font-size: 0.7rem;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }

        @media (min-width: 576px) {
          .stat-label {
            font-size: 0.75rem;
          }
        }

        /* Responsive Buttons */
        .btn-gradient-primary {
          background: var(--primary-gradient);
          border: none;
          color: white;
          border-radius: 8px;
          padding: 0.75rem 1.5rem;
          font-weight: 600;
          transition: var(--transition);
          position: relative;
          overflow: hidden;
          font-size: 0.875rem;
          width: 100%;
        }

        @media (min-width: 576px) {
          .btn-gradient-primary {
            width: auto;
            border-radius: 10px;
            font-size: 0.9rem;
          }
        }

        @media (min-width: 768px) {
          .btn-gradient-primary {
            border-radius: 12px;
            padding: 0.875rem 1.5rem;
            font-size: 1rem;
          }
        }

        .btn-gradient-primary::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
          transition: left 0.5s;
        }

        .btn-gradient-primary:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(102, 126, 234, 0.3);
        }

        @media (min-width: 768px) {
          .btn-gradient-primary:hover {
            box-shadow: 0 8px 24px rgba(102, 126, 234, 0.4);
          }
        }

        .btn-gradient-primary:hover::before {
          left: 100%;
        }

        .btn-gradient-success {
          background: linear-gradient(135deg, #22c55e, #16a34a);
          border: none;
          color: white;
          border-radius: 8px;
          padding: 0.75rem 1.5rem;
          font-weight: 600;
          transition: var(--transition);
          font-size: 0.875rem;
          width: 100%;
        }

        @media (min-width: 576px) {
          .btn-gradient-success {
            width: auto;
            border-radius: 10px;
            font-size: 0.9rem;
          }
        }

        @media (min-width: 768px) {
          .btn-gradient-success {
            border-radius: 12px;
            padding: 0.875rem 1.5rem;
            font-size: 1rem;
          }
        }

        .btn-gradient-success:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(34, 197, 94, 0.3);
        }

        @media (min-width: 768px) {
          .btn-gradient-success:hover {
            box-shadow: 0 8px 24px rgba(34, 197, 94, 0.4);
          }
        }

        .btn-outline-secondary {
          background: transparent;
          border: 2px solid #6b7280;
          color: #6b7280;
          border-radius: 8px;
          padding: 0.75rem 1.5rem;
          font-weight: 600;
          transition: var(--transition);
          font-size: 0.875rem;
          width: 100%;
        }

        @media (min-width: 576px) {
          .btn-outline-secondary {
            width: auto;
            border-radius: 10px;
            font-size: 0.9rem;
          }
        }

        @media (min-width: 768px) {
          .btn-outline-secondary {
            border-radius: 12px;
            padding: 0.875rem 1.5rem;
            font-size: 1rem;
          }
        }

        .btn-outline-secondary:hover {
          background: #6b7280;
          color: white;
          transform: translateY(-2px);
        }

        /* Action Buttons Container */
        .action-buttons {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
          margin-bottom: 1.5rem;
        }

        @media (min-width: 576px) {
          .action-buttons {
            flex-direction: row;
            justify-content: flex-end;
            gap: 1rem;
          }
        }

        /* Security Cards Responsive */
        .security-card {
          border-radius: 12px;
          padding: 1rem;
          border: none;
          margin-bottom: 1rem;
        }

        @media (min-width: 576px) {
          .security-card {
            border-radius: 14px;
            padding: 1.25rem;
          }
        }

        @media (min-width: 768px) {
          .security-card {
            border-radius: 16px;
            padding: 1.5rem;
          }
        }

        .security-warning {
          background: rgba(251, 191, 36, 0.1);
          border: 1px solid rgba(251, 191, 36, 0.3);
          border-left: 4px solid #f59e0b;
        }

        .security-success {
          background: rgba(34, 197, 94, 0.1);
          border: 1px solid rgba(34, 197, 94, 0.3);
          border-left: 4px solid #22c55e;
        }

        /* Security Card Content */
        .security-content {
          display: flex;
          flex-direction: column;
          gap: 1rem;
          align-items: flex-start;
        }

        @media (min-width: 576px) {
          .security-content {
            flex-direction: row;
            justify-content: space-between;
            align-items: center;
          }
        }

        /* Form Grid Responsive */
        .form-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 1rem;
        }

        @media (min-width: 576px) {
          .form-grid {
            grid-template-columns: 1fr 1fr;
            gap: 1.25rem;
          }
        }

        @media (min-width: 768px) {
          .form-grid {
            gap: 1.5rem;
          }
        }

        .form-grid .col-full {
          grid-column: 1 / -1;
        }

        /* Main Layout Responsive */
        .main-layout {
          display: grid;
          grid-template-columns: 1fr;
          gap: 1.5rem;
        }

        @media (min-width: 992px) {
          .main-layout {
            grid-template-columns: 350px 1fr;
            gap: 2rem;
          }
        }

        @media (min-width: 1200px) {
          .main-layout {
            grid-template-columns: 400px 1fr;
            gap: 2.5rem;
          }
        }

        /* Profile Summary Mobile Optimization */
        .profile-summary {
          text-align: center;
        }

        .profile-summary h5 {
          font-size: 1.1rem;
          margin-bottom: 0.5rem;
        }

        @media (min-width: 576px) {
          .profile-summary h5 {
            font-size: 1.25rem;
          }
        }

        .profile-summary .position {
          font-size: 0.9rem;
          color: #667eea;
          font-weight: 600;
          margin-bottom: 0.25rem;
        }

        @media (min-width: 576px) {
          .profile-summary .position {
            font-size: 1rem;
          }
        }

        .profile-summary .department {
          font-size: 0.85rem;
          color: #6b7280;
          margin-bottom: 1rem;
        }

        @media (min-width: 576px) {
          .profile-summary .department {
            font-size: 0.9rem;
          }
        }

        /* Profile Details Grid */
        .profile-details {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1rem;
          margin-top: 1rem;
          padding-top: 1rem;
          border-top: 1px solid #e5e7eb;
        }

        .profile-detail {
          text-align: center;
        }

        .profile-detail-label {
          font-size: 0.7rem;
          color: #6b7280;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.025em;
          margin-bottom: 0.25rem;
        }

        @media (min-width: 576px) {
          .profile-detail-label {
            font-size: 0.75rem;
          }
        }

        .profile-detail-value {
          font-size: 0.8rem;
          font-weight: 600;
          color: #1f2937;
        }

        @media (min-width: 576px) {
          .profile-detail-value {
            font-size: 0.875rem;
          }
        }

        /* Animations */
        .fade-in {
          animation: fadeIn 0.6s ease-out;
        }

        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .pulse-animation {
          animation: pulse 2s infinite;
        }

        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.7; }
        }

        /* Loading animation */
        .save-loading {
          animation: saveAnimation 2s ease-in-out;
        }

        @keyframes saveAnimation {
          0% { transform: scale(1); }
          50% { transform: scale(1.05); background: #22c55e; }
          100% { transform: scale(1); }
        }

        /* Mobile Menu Overlay */
        .mobile-menu-overlay {
          display: none;
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(0, 0, 0, 0.5);
          z-index: 1000;
        }

        .mobile-menu-overlay.show {
          display: block;
        }

        /* Badge Enhancements */
        .badge {
          font-weight: 600;
          padding: 0.25rem 0.75rem;
          border-radius: 12px;
          font-size: 0.75rem;
        }

        @media (min-width: 576px) {
          .badge {
            padding: 0.375rem 1rem;
            font-size: 0.8rem;
          }
        }

        .badge.bg-white {
          background: rgba(255, 255, 255, 0.2) !important;
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.3);
        }

        /* Typography Enhancements */
        .fw-bold {
          font-weight: 700 !important;
          color: #1a202c;
        }

        .fw-semibold {
          font-weight: 600 !important;
          color: #2d3748;
        }

        .text-muted {
          color: #64748b !important;
          font-weight: 500;
        }

        .text-primary {
          color: #667eea !important;
          font-weight: 600;
        }

        .text-white-50 {
          color: rgba(255, 255, 255, 0.75) !important;
        }

        /* Button Warning */
        .btn-warning {
          background: linear-gradient(135deg, #f59e0b, #d97706);
          border: none;
          color: white;
          border-radius: 8px;
          padding: 0.5rem 1rem;
          font-weight: 600;
          font-size: 0.8rem;
          transition: var(--transition);
          width: 100%;
        }

        @media (min-width: 576px) {
          .btn-warning {
            width: auto;
            border-radius: 10px;
            font-size: 0.875rem;
            padding: 0.625rem 1.25rem;
          }
        }

        @media (min-width: 768px) {
          .btn-warning {
            border-radius: 12px;
          }
        }

        .btn-warning:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(245, 158, 11, 0.3);
        }

        /* Spinner Responsive */
        .spinner-border-sm {
          width: 1rem;
          height: 1rem;
          border-width: 0.1em;
        }

        /* Text Colors for Profile Hero */
        .profile-hero .text-white {
          color: white !important;
          font-weight: 500;
        }

        .profile-hero h1 {
          color: white !important;
          text-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
        }

        .profile-hero p {
          color: rgba(255, 255, 255, 0.9) !important;
        }

        /* Mobile-first utility classes */
        .d-flex { display: flex; }
        .flex-column { flex-direction: column; }
        .flex-row { flex-direction: row; }
        .align-items-center { align-items: center; }
        .justify-content-center { justify-content: center; }
        .justify-content-between { justify-content: space-between; }
        .justify-content-end { justify-content: flex-end; }
        .text-center { text-align: center; }
        .text-left { text-align: left; }
        .mb-0 { margin-bottom: 0; }
        .mb-1 { margin-bottom: 0.25rem; }
        .mb-2 { margin-bottom: 0.5rem; }
        .mb-3 { margin-bottom: 1rem; }
        .mb-4 { margin-bottom: 1.5rem; }
        .mb-5 { margin-bottom: 3rem; }
        .me-2 { margin-right: 0.5rem; }
        .me-3 { margin-right: 1rem; }
        .p-4 { padding: 1.5rem; }
        .gap-3 { gap: 1rem; }

        /* Responsive utilities */
        @media (min-width: 576px) {
          .flex-sm-row { flex-direction: row; }
          .text-sm-left { text-align: left; }
        }

        @media (min-width: 768px) {
          .flex-md-row { flex-direction: row; }
          .text-md-left { text-align: left; }
        }

        /* Print styles */
        @media print {
          .btn, .camera-btn { display: none; }
          .profile-hero { background: #f8f9fa; color: #000; }
          .modern-card { box-shadow: none; border: 1px solid #dee2e6; }
        }

        /* High contrast mode */
        @media (prefers-contrast: high) {
          .glass-card, .modern-card {
            background: white;
            border: 2px solid #000;
          }
          
          .profile-hero {
            background: #000;
            color: white;
          }
        }

        /* Reduced motion */
        @media (prefers-reduced-motion: reduce) {
          * {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
          }
        }
      `}</style>

      <div className="container-fluid-pro">
        {/* Profile Header */}
        <div className="profile-hero fade-in">
          <div className="profile-header-content">
            <div className="mobile-header">
              <div style={{ flex: 1 }}>
                <div className="text-white">
                  <div className="d-flex align-items-center justify-content-center justify-content-md-start mb-3 flex-wrap gap-2">
                    <div className="badge bg-white bg-opacity-20 px-3 py-2">
                      <User size={16} className="me-2 text-primary" />
                      <span>Employee Profile</span>
                    </div>
                    <Bell size={20} className="text-white-50" />
                  </div>
                  <h1 className="profile-title text-center text-md-start">
                    {profileData.name}
                  </h1>
                  <p className="profile-subtitle text-center text-md-start">
                    Manage your personal information and account settings
                  </p>
                </div>
              </div>
              
              <div className="profile-controls">
                {/* Profile Image Upload Button */}
                <div
                  className="camera-btn"
                  onClick={() => document.querySelector("input[name=image]").click()}
                >
                  <Camera size={20} className="text-white" />
                  <input
                    type="file"
                    name="image"
                    accept="image/*"
                    style={{ display: "none" }}
                    onChange={handleImageUpload}
                  />
                </div>

                {/* Date of Birth Input */}
                {profileData.DOB? <div className="dob-input">
                   <span style={{color:"white"}}> DOB : {formatDate(profileData.DOB)}</span>
                  </div>:<div className="dob-input">
                  <label htmlFor="dob">Date of Birth</label>
                  <input
                    type="date"
                    id="dob"
                    name="DOB"
                    value={profileData.DOB || ""}
                    onChange={(e) => handleUpdateDOB(e.target.value)}
                  />
                </div>}
              </div>
            </div>
          </div>
        </div>

        <div className="main-layout">
          {/* Left Sidebar */}
          <div>
            {/* Profile Summary Card */}
            <div className="modern-card fade-in">
              <div className="card-body-responsive profile-summary">
                <h5 className="fw-bold mb-2">{profileData.name}</h5>
                <p className="position mb-1">{profileData.position}</p>
                <p className="department mb-3">{profileData.department}</p>

                <div className="d-flex justify-content-center mb-4">
                  <div className="status-badge">
                    <CheckCircle size={16} />
                    Active Employee
                  </div>
                </div>

                <div className="profile-details">
                  <div className="profile-detail">
                    <div className="profile-detail-label">Employee ID</div>
                    <div className="profile-detail-value">{profileData.employeeId}</div>
                  </div>
                  <div className="profile-detail">
                    <div className="profile-detail-label">Joined</div>
                    <div className="profile-detail-value">{formattedDate(profileData.joinDate)}</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Performance Stats */}
            <div className="modern-card fade-in">
              <div className="card-header-modern">
                <h5 className="mb-0 fw-bold d-flex align-items-center">
                  <TrendingUp size={20} className="me-2 text-primary" />
                  Performance Overview
                </h5>
              </div>
              <div className="card-body-responsive">
                <div className="stats-grid">
                  <div className="stat-card">
                    <FileText size={20} className="text-primary mb-2" />
                    <div className="stat-number">{profileData.totalServicesApplied}</div>
                    <div className="stat-label">Applications</div>
                  </div>
                  <div className="stat-card">
                    <Award size={20} className="text-success mb-2" />
                    <div className="stat-number">{profileData.approvalRate}%</div>
                    <div className="stat-label">Approval Rate</div>
                  </div>
                  <div className="stat-card">
                    <Users size={20} className="text-info mb-2" />
                    <div className="stat-number">{profileData.totalUsers}</div>
                    <div className="stat-label">Users Managed</div>
                  </div>
                  <div className="stat-card">
                    <Activity size={20} className="text-warning mb-2" />
                    <div className="stat-number">5</div>
                    <div className="stat-label">Reports</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div>
            {/* Action Buttons */}
            <div className="action-buttons">
              {!isEditing ? (
                <button
                  className="btn btn-gradient-primary d-flex align-items-center justify-content-center"
                  onClick={() => setIsEditing(true)}
                >
                  <Edit3 size={18} className="me-2" />
                  Edit Profile
                </button>
              ) : (
                <>
                  <button
                    className={`btn btn-gradient-success d-flex align-items-center justify-content-center ${
                      saveAnimation ? "save-loading" : ""
                    }`}
                    onClick={handleSave}
                    disabled={saveAnimation}
                  >
                    {saveAnimation ? (
                      <>
                        <div
                          className="spinner-border spinner-border-sm me-2"
                          role="status"
                        >
                          <span className="visually-hidden">Loading...</span>
                        </div>
                        Saving...
                      </>
                    ) : (
                      <>
                        <Save size={18} className="me-2" />
                        Save Changes
                      </>
                    )}
                  </button>
                  <button
                    className="btn btn-outline-secondary d-flex align-items-center justify-content-center"
                    onClick={handleCancel}
                  >
                    <X size={18} className="me-2" />
                    Cancel
                  </button>
                </>
              )}
            </div>

            {/* Personal Information */}
            <div className="modern-card fade-in">
              <div className="card-header-modern">
                <h5 className="mb-0 fw-bold d-flex align-items-center">
                  <User size={20} className="me-2 text-primary" />
                  Personal Information
                </h5>
              </div>
              <div className="card-body-responsive">
                <div className="form-grid">
                  <div>
                    <label className="form-label fw-semibold">Full Name</label>
                    <input
                      type="text"
                      name="name"
                      className="form-control form-control-modern"
                      value={profileData.name}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                    />
                  </div>
                  <div>
                    <label className="form-label fw-semibold">Employee ID</label>
                    <input
                      type="text"
                      className="form-control form-control-modern"
                      value={profileData.employeeId}
                      disabled
                    />
                  </div>
                  <div>
                    <label className="form-label fw-semibold">
                      <Mail size={16} className="me-2" />
                      Email Address
                    </label>
                    <input
                      type="email"
                      name="email"
                      className="form-control form-control-modern"
                      value={profileData.email}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                    />
                  </div>
                  <div>
                    <label className="form-label fw-semibold">
                      <Phone size={16} className="me-2" />
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      className="form-control form-control-modern"
                      value={profileData.phone}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                    />
                  </div>
                  <div>
                    <label className="form-label fw-semibold">
                      <Building size={16} className="me-2" />
                      Department
                    </label>
                    <input
                      type="text"
                      name="department"
                      className="form-control form-control-modern"
                      value={profileData.department}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                    />
                  </div>
                  <div>
                    <label className="form-label fw-semibold">Position</label>
                    <input
                      type="text"
                      name="position"
                      className="form-control form-control-modern"
                      value={profileData.position}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                    />
                  </div>
                  <div>
                    <label className="form-label fw-semibold">
                      <Calendar size={16} className="me-2" />
                      Join Date
                    </label>
                    <input
                      type="text"
                      name="joinDate"
                      className="form-control form-control-modern"
                      value={formattedDate(profileData.joinDate)}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                    />
                  </div>
                  <div className="col-full">
                    <label className="form-label fw-semibold">
                      <MapPin size={16} className="me-2" />
                      Address
                    </label>
                    <textarea
                      name="address"
                      rows="3"
                      className="form-control form-control-modern"
                      value={profileData.address}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Security Settings */}
            <div className="modern-card fade-in">
              <div className="card-header-modern">
                <h5 className="mb-0 fw-bold d-flex align-items-center">
                  <Shield size={20} className="me-2 text-primary" />
                  Security Settings
                </h5>
              </div>
              <div className="card-body-responsive">
                <div className="security-card security-warning">
                  <div className="security-content">
                    <div>
                      <h6 className="fw-bold mb-1 d-flex align-items-center">
                        <Lock size={18} className="me-2" />
                        Password Security
                      </h6>
                      <p className="text-muted mb-0 small">
                        Last changed 30 days ago
                      </p>
                    </div>
                    <button className="btn btn-warning">
                      <Lock size={16} className="me-2" />
                      Change Password
                    </button>
                  </div>
                </div>

                <div className="security-card security-success">
                  <div className="d-flex align-items-center gap-3">
                    <CheckCircle size={20} className="text-success" />
                    <div>
                      <div className="fw-semibold text-success">
                        Two-Factor Authentication Enabled
                      </div>
                      <div className="small text-muted">
                        Your account is protected with 2FA
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}