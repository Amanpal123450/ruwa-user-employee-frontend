import React, { useState, useEffect } from 'react';
import { FaArrowRight, FaPaperPlane, FaMapMarkerAlt, FaRupeeSign, FaUsers, FaCalendarAlt, FaBriefcase, FaClock, FaGraduationCap } from 'react-icons/fa';
import Orgstructer from '../components/Orgstructer';
import { useNavigate, useNavigation } from 'react-router-dom';
import { Container, Row, Col, Card, Button, Badge } from "react-bootstrap";
import { Bell, Briefcase, MapPin, Calendar, Users, DollarSign, Clock, Award, FileText } from "lucide-react";

const Career = () => {
  const [selected, setSelected] = useState('jobs');
  const [expanded, setExpanded] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [activeJob, setActiveJob] = useState(null);
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // API base URL
  const API_BASE_URL = process.env.REACT_APP_API_URL || 'https://ruwa-backend.onrender.com/api';

  const notificationsData = [
  {
    id: 1,
    type: "Job Notification",
    variant: "primary",
    icon: <Briefcase size={22} className="text-primary" />,
    title:
      "MEGA RECRUITMENT FOR 3045 MEDICAL, PARAMEDICAL & SUPPORT POSTS",
    organization: "RUWA INDIA (PUBLIC HEALTH INITIATIVE, UTTAR PRADESH)",
    reference:
      "Advertisement No. RUWA/UP/REC/2025/09, Dated: 25th September 2025",
    issuedBy: "Recruitment Officer, RUWA INDIA, Uttar Pradesh",
    details: [
      { label: "Total Posts", value: "3045" },
      { label: "Location", value: "Across Uttar Pradesh" },
      {
        label: "Vacancy Details",
        value: `• Consultant: 150 Posts
• Resident Medical Officer (RMO): 250 Posts
• Nursing Superintendent: 45 Posts
• Staff Nurse: 1200 Posts
• Medical Lab Technician: 250 Posts
• Radiographer/CT-MRI Tech.: 100 Posts
• OT Technician: 100 Posts
• Pharmacist: 100 Posts
• Hospital Administrator: 20 Posts
• Receptionist/Front Desk Exec.: 80 Posts
• Ward Attendant: 300 Posts
• Housekeeping Supervisor: 50 Posts
• Housekeeping Staff: 400 Posts`,
      },
      {
        label: "Qualifications",
        value:
          "Detailed qualifications for each post are available on the official website.",
      },
      {
        label: "Application Fee",
        value: "• UR/OBC/EWS: ₹800/-\n• SC/ST/PwD: ₹400/-",
      },
      {
        label: "Selection Process",
        value: "Based on a Written Examination and/or Interview/Skill Test.",
      },
      {
        label: "Age Relaxation",
        value: "As per Uttar Pradesh Government rules.",
      },
      {
        label: "How to Apply",
        value:
          "Candidates must apply ONLINE ONLY. No other mode of application will be accepted.",
      },
      {
        label: "Official Website",
        value: "www.ruwaindia.in",
        link: "http://www.ruwaindia.in",
      },
      { label: "Application Start Date", value: "01/10/2025" },
      { label: "Application Last Date", value: "31/10/2025 (Midnight)" },
    ],
  },
  {
    id: 2,
    type: "Job Notification",
    variant: "primary",
    icon: <Briefcase size={22} className="text-primary" />,
    title: "Recruitment Notification for Ambulance Drivers (2025)",
    organization: "RUWA INDIA – JAN AROGYA KENDRA",
    reference: "Advertisement No. JAK/RUWA/DRIVER/2025/01",
    issuedBy: "Recruitment Cell, Jan Arogya Kendra - RUWA INDIA, Uttar Pradesh",
    details: [
      { label: "Location", value: "Uttar Pradesh" },
      { label: "Post Name", value: "Ambulance Driver" },
      { label: "Vacancies", value: "185" },
      { label: "Pay Scale", value: "₹28,000 – ₹39,400 /-" },
      { label: "Duty Hours", value: "12-14 hrs (Shift Basis)" },
      { label: "Qualification", value: "Minimum 10th Pass / High School" },
      {
        label: "License Required",
        value: "Valid LMV/Commercial Driving License",
      },
      {
        label: "Experience",
        value:
          "Minimum 2 years of driving (ambulance/heavy/light vehicle preferred).",
      },
      {
        label: "Additional Skills",
        value:
          "Basic knowledge of road safety, vehicle maintenance; preference to candidates with First Aid Training.",
      },
      {
        label: "Responsibilities",
        value:
          "Safe patient transport, ambulance maintenance, supporting medical staff, and maintaining logbooks.",
      },
      { label: "Age Limit", value: "21 – 40 Years (Relaxation as per rules)." },
      {
        label: "Selection Process",
        value:
          "Driving Skill Test, Document Verification, and Medical Fitness Test.",
      },
      {
        label: "Documents Required",
        value: `1. Biodata/Resume with contact details
2. Copy of Driving License
3. Educational Qualification Certificates
4. Experience Certificate (if available)`,
      },
      {
        label: "Apply via Email",
        value: "hrd@ruwaindia.com",
        link: "mailto:hrd@ruwaindia.com",
      },
      {
        label: "Contact",
        value:
          "Aradhya Enterprises Manpower Services, Lucknow, Uttar Pradesh.",
      },
      { label: "Application Start Date", value: "To be Announced" },
      { label: "Application Last Date", value: "To be Announced" },
    ],
  },
];
 

  const toggleExpand = (id) => {
    setExpanded((prev) => ({ ...prev, [id]: !prev[id] }));
  };

function NotificationCard({ notification, isExpanded, onToggleExpand }) {
  const detailsId = `notification-details-${notification.id}`;

  return (
    <Card className="h-100 border-0 shadow-sm rounded-4 notification-card">
      <Card.Body className="d-flex flex-column">
        <div className="d-flex align-items-center gap-2 mb-2 flex-wrap">
          {notification.icon}
          <Badge bg={notification.variant}>{notification.type}</Badge>
        </div>

        <Card.Title className="text-primary fw-semibold fs-6">
          {notification.title}
        </Card.Title>
        <Card.Subtitle className="text-muted small mb-2">
          {notification.organization}
        </Card.Subtitle>
        <Card.Text className="text-secondary small mb-3">
          {notification.reference}
        </Card.Text>

        <div
          id={detailsId}
          className={`notification-details-wrapper ${
            isExpanded ? "expanded" : ""
          }`}
        >
          <ul className="list-unstyled small text-dark mb-0">
            {notification.details.map((detail, index) => (
              <li key={index} className="mb-2">
                <strong>{detail.label}:</strong>{" "}
                {detail.link ? (
                  <a
                    href={detail.link}
                    className="text-decoration-none text-primary"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {detail.value}
                  </a>
                ) : (
                  <span style={{ whiteSpace: "pre-line" }}>{detail.value}</span>
                )}
              </li>
            ))}
          </ul>
        </div>
      </Card.Body>

      <Card.Footer className="bg-white border-0 mt-auto pt-0 d-flex justify-content-between align-items-center">
        <Button
          variant="outline-primary"
          size="sm"
          className="rounded-pill px-3"
          onClick={onToggleExpand}
          aria-controls={detailsId}
          aria-expanded={isExpanded}
        >
          {isExpanded ? "Show Less" : "Show More"}
        </Button>
        <small className="text-muted text-end">{notification.issuedBy}</small>
      </Card.Footer>
    </Card>
  );
}



  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Get auth token from localStorage (adjust based on your auth implementation)
      const token = localStorage.getItem('token');
      const headers = {
        'Content-Type': 'application/json',
      };
      
      // Add authorization header if token exists
      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
      }

      const response = await fetch(`${API_BASE_URL}/jobs`, {
        method: 'GET',
        headers: headers,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      const activeJobs = data.filter(job => 
        job.jobStatus === 'active' || job.jobStatus === 'published'
      );
      
      setJobs(activeJobs);
      
    } catch (error) {
      console.error('Error fetching jobs:', error);
      setError('Unable to load job listings. Please try again later.');
      // Optionally set empty array or keep sample data
      setJobs([]);
    } finally {
      setLoading(false);
    }
  };

  const handleCardClick = (job) => {
    setActiveJob(job);
    setShowModal(true);
  };

  function handleApply(e) {
    e.preventDefault();
    navigate("/job-form");
  }

  const getJobTypeBadge = (category) => {
    const types = {
      medical: { label: 'Medical', color: 'primary', gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' },
      driver: { label: 'Driver', color: 'success', gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)' },
      support: { label: 'Support', color: 'warning', gradient: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)' },
      administrative: { label: 'Administrative', color: 'info', gradient: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)' },
      technical: { label: 'Technical', color: 'danger', gradient: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)' }
    };
    const type = types[category?.toLowerCase()] || { label: 'Other', color: 'secondary', gradient: 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)' };
    return (
      <span 
        className="badge position-absolute top-0 end-0 m-3 px-3 py-2 shadow-sm"
        style={{ 
          background: type.gradient,
          color: 'white',
          fontWeight: '600',
          letterSpacing: '0.5px',
          border: 'none'
        }}
      >
        {type.label}
      </span>
    );
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  };

  const isApplicationOpen = (endDate) => {
    if (!endDate) return true;
    return new Date(endDate) >= new Date();
  };

  const content = {
    iconNotification: (
      <Container fluid className="py-5 bg-light min-vh-100">
        <Container>
          <div className="d-flex align-items-center gap-3 mb-4 flex-wrap">
            <Bell size={32} className="text-primary" />
            <h1 className="h2 fw-bold text-dark mb-0">
              RUWA INDIA – Official Notifications
            </h1>
          </div>

          <Row xs={1} md={2} lg={2} xl={2} className="g-4">
            {notificationsData.map((notification) => (
              <Col key={notification.id}>
                <NotificationCard
                  notification={notification}
                  isExpanded={!!expanded[notification.id]}
                  onToggleExpand={() => toggleExpand(notification.id)}
                />
              </Col>
            ))}
          </Row>
        </Container>
      </Container>
    ),
    instruction: (
    <>
     <div className="min-h-screen bg-gray-50 p-4 md:p-10 flex justify-center">
      <div className="bg-white shadow-lg rounded-2xl w-full max-w-5xl p-6 md:p-10 text-gray-800 leading-relaxed">
        <h1 className="text-center text-3xl font-bold mb-2 uppercase">General Instructions To The Candidates</h1>
        <p className="text-center text-sm text-gray-500 mb-8">(As per Notification for Direct Recruitment to the Post – 2025)</p>

        <ol className="list-decimal pl-5 space-y-4">
          <li>
            <strong>Mode of Applying:</strong> Application for Direct Recruitment to the post of Nursing Officer is through
            <strong> offline (hard copy)</strong> mode only from <strong>07.10.2025 (10:00 AM)</strong> to
            <strong> 06.11.2025 (05:00 PM)</strong>. Applicants should submit the application in physical form along with Demand Draft and
            self-attested photocopies of required certificates through Registered Post or in person.
          </li>

          <li>
            <strong>Single Application:</strong> Submit only one application. Multiple applications will be cancelled.
          </li>

          <li>
            <strong>Photograph & Signature:</strong> Paste recent passport-size photograph and sign in the space provided.
            Photo should be self-attested.
          </li>

          <li>
            <strong>No Alterations:</strong> The data furnished in the application is final and cannot be altered later.
          </li>

          <li>
            <strong>Copy of Application:</strong> Applicants are advised to keep a copy of the submitted application for reference.
          </li>

          <li>
            <strong>Certificates:</strong> Do not send original certificates. Only self-attested copies of required documents such as Birth Certificate, SSLC, HSC, Diploma/Degree Certificates, Employment Exchange Card, State Nursing Council Registration, PwBD Certificate, and COVID Duty Certificate (if applicable) must be enclosed. Originals must be produced during verification.
          </li>

          <li>
            <strong>Incomplete Applications:</strong> Applications without signature, or missing required enclosures, will be rejected. Ensure all self-attested copies are attached within the due date.
          </li>

          <li>
            <strong>Reservation Claims:</strong> Candidates claiming EWS/MBC/OBC/EBC/BCM/SC/ST/BT/PwBD must possess valid certificates in the prescribed format.
          </li>

          <li>
            <strong>Selection:</strong> Selection will be strictly on the basis of merit as per Para-VII of the notification.
          </li>

          <li>
            <strong>COVID Duty:</strong> Those who rendered COVID-19 duty must attach the certificate from the authority mentioned in the notification.
          </li>

          <li>
            <strong>Government Employees:</strong> Candidates working in Government/PSU/Autonomous Bodies must apply through proper channel before <strong>06.11.2025 (5:00 PM)</strong>.
          </li>

          <li>
            <strong>Change of Address:</strong> Any change of address or mobile number after submission must be informed by Registered Post with acknowledgment due.
          </li>

          <li>
            <strong>Original Certificates:</strong> Must be produced during verification by shortlisted candidates.
          </li>

          <li>
            <strong>Provisional Acceptance:</strong> All applications are accepted provisionally. Eligibility and other details will be verified during scrutiny. False claims will lead to cancellation.
          </li>

          <li>
            <strong>Official Communication:</strong> All recruitment updates will be available on the official website: <a href="https://igmcri.edu.in" className="text-blue-600 underline">https://igmcri.edu.in</a>
          </li>

          <li>
            <strong>Institute Rights:</strong> The Director reserves the right to enhance/reduce vacancies or cancel recruitment for administrative reasons. The decision of the Government is final.
          </li>

          <li>
            <strong>Helpline:</strong> For clarifications, contact <strong>(0413) 2277545</strong> ext. <strong>3089</strong> / <strong>3053</strong> on working days between 9:00 AM and 5:00 PM (lunch break 1:00 PM–2:00 PM).
          </li>
        </ol>

        <div className="mt-8 bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-md">
          <p className="text-sm text-gray-700">
            <strong>Note:</strong> The selection list will be displayed on the Institute Notice Board and on the official website. Only selected candidates will be called for certificate verification. No interim queries will be entertained.
          </p>
        </div>

        <div className="text-right mt-8">
          <p className="text-sm text-gray-500 font-medium">Last date for submission: 06.11.2025</p>
        </div>
      </div>
    </div>
  <div className="min-h-screen bg-gray-50 p-4 md:p-10 flex justify-center">
<table className="min-w-full border border-gray-300 text-sm">
<thead className="bg-gray-100">
<tr>
<th className="border px-4 py-2">Sl. No.</th>
<th className="border px-4 py-2">Functional Requirement</th>
</tr>
</thead>
<tbody>
{['Sitting','Standing','Walking','Bending','Reading & Writing','Seeing','Hearing','Communication','Manipulation with fingers'].map((req, index) => (
<tr key={index}>
<td className="border px-4 py-2 text-center">{index + 1}</td>
<td className="border px-4 py-2">{req}</td>
</tr>
))}
</tbody>
</table>
</div>


<p className="mt-4 text-gray-700"><strong>Note:</strong> Mobility should not be restricted.</p>


<h3 className="text-xl font-semibold mt-8 mb-4">Categories of Disability Suitable for Nursing Officer:</h3>
<ul className="list-disc pl-6 space-y-1">
<li>One Arm, One Leg, Cerebral Palsy, Leprosy Cured, Dwarfism, Acid Attack Victims, Spinal Deformity, Spinal Injury</li>
<li>Specific Learning Disability</li>
<li>Multiple Disabilities involving (1) and (2)</li>
</ul>


<p className="mt-4 text-sm text-gray-600">Guidelines as per Notification / Office Memorandum F.No. 30-12/2020-DD-III dated 29.08.2022 & 07.09.2022 issued by the Ministry of Social Justice and Empowerment will apply.</p>


{/* PART III - AGE LIMITS */}
<h2 className="text-2xl font-bold mt-12 mb-4 uppercase text-center">Part III – Age Requirements</h2>


<div className="overflow-x-auto">
<table className="min-w-full border border-gray-300 text-sm text-center">
<thead className="bg-gray-100">
<tr>
<th className="border px-4 py-2">Sl. No.</th>
<th className="border px-4 py-2">Category</th>
<th className="border px-4 py-2">Born Not Earlier Than</th>
<th className="border px-4 py-2">Born Not Later Than</th>
</tr>
</thead>
<tbody>
<tr><td className="border px-4 py-2">1</td><td className="border px-4 py-2">General / Unreserved</td><td className="border px-4 py-2">06.11.1990</td><td className="border px-4 py-2">05.11.2007</td></tr>
<tr><td className="border px-4 py-2">2</td><td className="border px-4 py-2">MBC / OBC / EBC / BCM / BT</td><td className="border px-4 py-2">06.11.1987</td><td className="border px-4 py-2">05.11.2007</td></tr>
<tr><td className="border px-4 py-2">3</td><td className="border px-4 py-2">SC / ST</td><td className="border px-4 py-2">06.11.1985</td><td className="border px-4 py-2">05.11.2007</td></tr>
<tr><td className="border px-4 py-2">4</td><td className="border px-4 py-2">PwBD (General / Unreserved)</td><td className="border px-4 py-2">06.11.1980</td><td className="border px-4 py-2">05.11.2007</td></tr>
<tr><td className="border px-4 py-2">5</td><td className="border px-4 py-2">PwBD & MBC / OBC / EBC / BCM / BT</td><td className="border px-4 py-2">06.11.1977</td><td className="border px-4 py-2">05.11.2007</td></tr>
<tr><td className="border px-4 py-2">6</td><td className="border px-4 py-2">PwBD & SC / ST</td><td className="border px-4 py-2">06.11.1975</td><td className="border px-4 py-2">05.11.2007</td></tr>
</tbody>
</table>
</div>


<p className="text-right mt-8 font-medium">(Dr. C. Udayashankar)<br />Director</p>
    </>
  ),

    jobs: (
      <div className="animate__animated animate__fadeIn">
        <div className="mb-5">
          <div className="d-flex align-items-center gap-3 mb-3">
            <div className="p-3 bg-primary bg-opacity-10 rounded-circle">
              <Briefcase size={28} className="text-primary" />
            </div>
            <div>
              <h2 className="mb-1 fw-bold">Current Openings</h2>
              <p className="text-muted mb-0">
                {jobs.filter(job => isApplicationOpen(job.applicationEndDate)).length} active position{jobs.filter(job => isApplicationOpen(job.applicationEndDate)).length !== 1 ? 's' : ''} available
              </p>
            </div>
          </div>
        </div>
        
        {loading ? (
          <div className="text-center py-5">
            <div className="spinner-border text-primary" role="status" style={{ width: '3rem', height: '3rem' }}>
              <span className="visually-hidden">Loading...</span>
            </div>
            <p className="mt-4 text-muted fw-medium">Loading opportunities...</p>
          </div>
        ) : error ? (
          <div className="alert alert-danger border-0 shadow-sm" role="alert">
            <div className="d-flex align-items-center gap-3">
              <div className="p-3 bg-danger bg-opacity-10 rounded-circle">
                <Bell size={24} className="text-danger" />
              </div>
              <div className="flex-grow-1">
                <h5 className="alert-heading mb-1">Unable to Load Jobs</h5>
                <p className="mb-0">{error}</p>
              </div>
            </div>
            <button className="btn btn-outline-danger mt-3" onClick={fetchJobs}>
              <Calendar className="me-2" size={18} />
              Try Again
            </button>
          </div>
        ) : jobs.filter(job => isApplicationOpen(job.applicationEndDate)).length === 0 ? (
          <div className="text-center py-5">
            <div className="p-4 bg-light rounded-circle d-inline-flex mb-4">
              <Users size={64} className="text-muted" />
            </div>
            <h4 className="mb-2">No Active Positions</h4>
            <p className="text-muted">Check back soon for new opportunities</p>
          </div>
        ) : (
          <div className="row g-4">
            {jobs
              .filter(job => isApplicationOpen(job.applicationEndDate))
              .map((job) => (
              <div className="col-lg-6" key={job._id}>
                <div
                  className="card border-0 shadow-sm h-100 position-relative overflow-hidden"
                  style={{ 
                    cursor: 'pointer', 
                    transition: 'all 0.3s ease',
                    borderRadius: '16px'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-8px)';
                    e.currentTarget.style.boxShadow = '0 12px 24px rgba(0,0,0,0.15)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.1)';
                  }}
                  onClick={() => handleCardClick(job)}
                >
                  {getJobTypeBadge(job.jobCategory)}
                  
                  <div className="card-body p-4">
                    <div className="mb-4">
                      <h5 className="card-title mb-3 fw-bold" style={{ fontSize: '1.25rem', color: '#2c3e50' }}>
                        {job.postName}
                      </h5>
                      
                      <div className="d-flex flex-wrap gap-3 mb-3">
                        <span className="d-flex align-items-center gap-2 text-muted">
                          <MapPin size={16} className="text-primary" />
                          <small className="fw-medium">{job.jobLocation || 'Location TBD'}</small>
                        </span>
                        <span className="d-flex align-items-center gap-2 text-muted">
                          <Users size={16} className="text-success" />
                          <small className="fw-medium">{job.numberOfPosts} {job.numberOfPosts === 1 ? 'Post' : 'Posts'}</small>
                        </span>
                      </div>
                      
                      <div className="mb-3">
                        <span className="d-inline-flex align-items-center gap-2 px-3 py-2 bg-success bg-opacity-10 rounded-pill">
                          <DollarSign size={16} className="text-success" />
                          <span className="fw-semibold text-success">{job.payScale}</span>
                        </span>
                      </div>
                      
                      <p className="card-text text-muted mb-0" style={{ fontSize: '0.9rem', lineHeight: '1.6' }}>
                        {job.jobResponsibilities && job.jobResponsibilities.length > 120 
                          ? job.jobResponsibilities.substring(0, 120) + '...'
                          : job.jobResponsibilities || 'Details available on application'
                        }
                      </p>
                    </div>
                    
                    <div className="border-top pt-3 mt-auto">
                      <div className="d-flex justify-content-between align-items-center mb-3">
                        <span className="d-flex align-items-center gap-2 text-muted">
                          <Calendar size={16} className="text-danger" />
                          <small className="fw-medium">Apply by: {formatDate(job.applicationEndDate)}</small>
                        </span>
                      </div>
                      <button className="btn btn-outline-primary w-100"
                        onClick={(e) => handleApply(e)}
                      >
                        View Details & Apply 
                        <FaArrowRight size={14} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    ),
    life: (
      <div className="animate__animated animate__fadeIn">
        <div className="p-5 bg-gradient rounded-4" style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}>
          <h3 className="mb-3 text-white fw-bold">💼 Life at RUWA</h3>
          <p className="text-white lead mb-0">
            At RUWA, we blend professionalism with creativity. Flexible timings, open communication, and a fun work environment make every day exciting.
          </p>
        </div>
      </div>
    ),
    culture: (
      <div className="animate__animated animate__fadeIn">
        <div className="p-5 bg-gradient rounded-4" style={{ background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)' }}>
          <h3 className="mb-3 text-white fw-bold">🎯 Our Culture</h3>
          <p className="text-white lead mb-0">
            We believe in innovation, inclusion, and integrity. We encourage ownership and reward initiative. Your voice matters here.
          </p>
        </div>
      </div>
    ),
    locations: (
      <div className="animate__animated animate__fadeIn">
        <div className="p-5 bg-gradient rounded-4" style={{ background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)' }}>
          <h3 className="mb-4 text-white fw-bold">📍 Office Locations</h3>
          <ul className="list-unstyled text-white lead mb-0">
            <li className="mb-2">✓ Head Office – Lucknow, Uttar Pradesh</li>
            <li className="mb-2">✓ Medical Facilities – Across Uttar Pradesh</li>
            <li className="mb-0">✓ Diagnostic Centers – Multiple Locations</li>
          </ul>
        </div>
      </div>
    ),
    structure: (
      <>
        <Orgstructer/>
      </div>
    ),
    apply: (
      <div className="animate__animated animate__fadeIn">
        <div className="p-5 bg-gradient rounded-4 text-center" style={{ background: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)' }}>
          <h3 className="mb-3 text-white fw-bold">🧾 How to Apply</h3>
          <p className="text-white lead mb-4">
            Send your updated resume to <strong>hrd@ruwaindia.com</strong> with your portfolio or LinkedIn link.
          </p>
          <a className="btn btn-light btn-lg shadow" href="mailto:hrd@ruwaindia.com">
            <FaPaperPlane className="me-2" /> Apply Now
          </a>
        </div>
      </div>
    ),
  };

  return (
    <div className="container-fluid py-5">
      <div className="row">
        {/* Sidebar */}
        <div className="col-md-3 mb-4 mb-md-0">
          <div className="list-group shadow-sm">
            <button 
              className={`list-group-item list-group-item-action ${selected === 'jobs' ? 'active' : ''}`} 
              onClick={() => setSelected('jobs')}
            >
              Job Openings
            </button>
            <button 
              className={`list-group-item list-group-item-action ${selected === 'life' ? 'active' : ''}`} 
              onClick={() => setSelected('life')}
            >
              Life at RUWA
            </button>
            <button 
              className={`list-group-item list-group-item-action ${selected === 'culture' ? 'active' : ''}`} 
              onClick={() => setSelected('culture')}
            >
              Company Culture
            </button>
            <button 
              className={`list-group-item list-group-item-action ${selected === 'locations' ? 'active' : ''}`} 
              onClick={() => setSelected('locations')}
            >
              Office Locations
            </button>
            <button 
              className={`list-group-item list-group-item-action ${selected === 'structure' ? 'active' : ''}`} 
              onClick={() => setSelected('structure')}
            >
              Our Structure
            </button>
            <button 
              className={`list-group-item list-group-item-action ${selected === 'apply' ? 'active' : ''}`} 
              onClick={() => setSelected('apply')}
            >
              How to Apply
            </button>
          </div>
        </div>

          {/* Content */}
          <Col md={9}>
            <div className="card border-0 shadow-sm p-4" style={{ borderRadius: '16px' }}>
              {content[selected]}
            </div>
          </Col>
        </Row>
      </Container>

      {/* Enhanced Job Details Modal */}
      {activeJob && (
        <div
          className={`modal fade ${showModal ? 'show d-block' : ''}`}
          tabIndex="-1"
          style={{ backgroundColor: 'rgba(0,0,0,0.6)' }}
          onClick={() => setShowModal(false)}
        >
          <div className="modal-dialog modal-dialog-centered modal-xl modal-dialog-scrollable" onClick={(e) => e.stopPropagation()}>
            <div className="modal-content border-0 shadow-lg" style={{ borderRadius: '20px' }}>
              <div className="modal-header border-0 pb-0" style={{ padding: '2rem 2rem 1rem' }}>
                <div className="w-100">
                  <div className="d-flex justify-content-between align-items-start">
                    <div>
                      <h4 className="modal-title fw-bold mb-2">{activeJob.postName}</h4>
                      <p className="text-muted mb-0">
                        <small>Ref: {activeJob.advertisementNumber}</small>
                      </p>
                    </div>
                    <button 
                      type="button" 
                      className="btn-close" 
                      onClick={() => setShowModal(false)}
                      style={{ fontSize: '0.875rem' }}
                    ></button>
                  </div>
                  {getJobTypeBadge(activeJob.jobCategory)}
                </div>
              </div>
              
              <div className="modal-body" style={{ padding: '2rem' }}>
                {/* Quick Info Cards */}
                <Row className="g-3 mb-4">
                  <Col md={3}>
                    <div className="p-3 bg-light rounded-3 text-center">
                      <MapPin size={24} className="text-primary mb-2" />
                      <small className="d-block text-muted mb-1">Location</small>
                      <strong className="d-block">{activeJob.jobLocation || 'N/A'}</strong>
                    </div>
                  </Col>
                  <Col md={3}>
                    <div className="p-3 bg-light rounded-3 text-center">
                      <DollarSign size={24} className="text-success mb-2" />
                      <small className="d-block text-muted mb-1">Pay Scale</small>
                      <strong className="d-block">{activeJob.payScale}</strong>
                    </div>
                  </Col>
                  <Col md={3}>
                    <div className="p-3 bg-light rounded-3 text-center">
                      <Users size={24} className="text-info mb-2" />
                      <small className="d-block text-muted mb-1">Vacancies</small>
                      <strong className="d-block">{activeJob.numberOfPosts}</strong>
                    </div>
                  </Col>
                  <Col md={3}>
                    <div className="p-3 bg-light rounded-3 text-center">
                      <Calendar size={24} className="text-danger mb-2" />
                      <small className="d-block text-muted mb-1">Last Date</small>
                      <strong className="d-block">{formatDate(activeJob.applicationEndDate)}</strong>
                    </div>
                  </Col>
                </Row>

                {/* Detailed Information */}
                <div className="details-section">
                  {activeJob.educationalQualifications && (
                    <div className="mb-4 p-3 bg-light rounded-3">
                      <h6 className="d-flex align-items-center gap-2 mb-3">
                        <Award size={20} className="text-primary" />
                        <strong>Educational Qualifications</strong>
                      </h6>
                      <p className="text-muted mb-0">{activeJob.educationalQualifications}</p>
                    </div>
                  )}

                  {activeJob.experienceRequired && (
                    <div className="mb-4 p-3 bg-light rounded-3">
                      <h6 className="d-flex align-items-center gap-2 mb-3">
                        <Clock size={20} className="text-success" />
                        <strong>Experience Required</strong>
                      </h6>
                      <p className="text-muted mb-0">{activeJob.experienceRequired}</p>
                    </div>
                  )}

                  {(activeJob.minAge || activeJob.maxAge) && (
                    <div className="mb-4 p-3 bg-light rounded-3">
                      <h6 className="d-flex align-items-center gap-2 mb-3">
                        <Users size={20} className="text-info" />
                        <strong>Age Criteria</strong>
                      </h6>
                      <p className="text-muted mb-0">
                        {activeJob.minAge && `Minimum: ${activeJob.minAge} years`}
                        {activeJob.minAge && activeJob.maxAge && ' • '}
                        {activeJob.maxAge && `Maximum: ${activeJob.maxAge} years`}
                      </p>
                      {activeJob.ageRelaxation && (
                        <small className="text-info d-block mt-2">{activeJob.ageRelaxation}</small>
                      )}
                    </div>
                  )}

                  {activeJob.licenseType && (
                    <div className="mb-4 p-3 bg-light rounded-3">
                      <h6 className="d-flex align-items-center gap-2 mb-3">
                        <FileText size={20} className="text-warning" />
                        <strong>License Requirements</strong>
                      </h6>
                      <p className="text-muted mb-0">{activeJob.licenseType}</p>
                    </div>
                  )}

                  {activeJob.jobResponsibilities && (
                    <div className="mb-4 p-3 bg-light rounded-3">
                      <h6 className="d-flex align-items-center gap-2 mb-3">
                        <Briefcase size={20} className="text-primary" />
                        <strong>Job Responsibilities</strong>
                      </h6>
                      <p className="text-muted mb-0">{activeJob.jobResponsibilities}</p>
                    </div>
                  )}

                  {activeJob.additionalSkills && (
                    <div className="mb-4 p-3 bg-light rounded-3">
                      <h6 className="d-flex align-items-center gap-2 mb-3">
                        <Award size={20} className="text-success" />
                        <strong>Additional Skills</strong>
                      </h6>
                      <p className="text-muted mb-0">{activeJob.additionalSkills}</p>
                    </div>
                  )}

                  {activeJob.applicationFee && (
                    <div className="mb-4 p-3 bg-light rounded-3">
                      <h6 className="d-flex align-items-center gap-2 mb-3">
                        <DollarSign size={20} className="text-danger" />
                        <strong>Application Fee</strong>
                      </h6>
                      <p className="text-muted mb-0">{activeJob.applicationFee}</p>
                    </div>
                  )}

                  {activeJob.importantNotes && (
                    <div className="alert alert-info border-0 shadow-sm">
                      <h6 className="d-flex align-items-center gap-2 mb-3">
                        <Bell size={20} />
                        <strong>Important Notes</strong>
                      </h6>
                      <p className="mb-0">{activeJob.importantNotes}</p>
                    </div>
                  )}
                </div>
              </div>
              
              <div className="modal-footer border-0 pt-0" style={{ padding: '1rem 2rem 2rem' }}>
                {activeJob.applicationMode === 'online' && activeJob.applicationLink ? (
                  <a
                    href={activeJob.applicationLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-primary btn-lg d-flex align-items-center gap-2"
                    style={{ borderRadius: '10px' }}
                  >
                    <FaPaperPlane size={18} />
                    Apply Online
                  </a>
                ) : (
                  <a
                    href={`mailto:${activeJob.applicationEmail || activeJob.contactEmail || 'hrd@ruwaindia.com'}?subject=Application for ${activeJob.postName}&body=Dear Hiring Team,%0D%0A%0D%0AI am interested in applying for the position of ${activeJob.postName} (Ref: ${activeJob.advertisementNumber}).%0D%0A%0D%0APlease find my details attached.%0D%0A%0D%0ARegards,%0D%0A[Your Name]`}
                    className="btn btn-primary btn-lg d-flex align-items-center gap-2"
                    style={{ borderRadius: '10px' }}
                  >
                    <FaPaperPlane size={18} />
                    Apply via Email
                  </a>
                )}
                <button 
                  className="btn btn-outline-secondary btn-lg" 
                  onClick={() => setShowModal(false)}
                  style={{ borderRadius: '10px' }}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Career;