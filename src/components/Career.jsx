import React, { useState, useEffect } from 'react';
import { FaArrowRight, FaPaperPlane, FaMapMarkerAlt, FaRupeeSign, FaUsers, FaCalendarAlt } from 'react-icons/fa';
import Orgstructer from '../components/Orgstructer';
import { useNavigate } from 'react-router-dom';
import { Container, Row, Col, Card, Button, Badge } from "react-bootstrap";
import { Bell, Briefcase } from "lucide-react";

const Career = () => {
  const [selected, setSelected] = useState('iconNotification');
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
      title: "MEGA RECRUITMENT FOR 3045 MEDICAL, PARAMEDICAL & SUPPORT POSTS",
      organization: "RUWA INDIA (PUBLIC HEALTH INITIATIVE, UTTAR PRADESH)",
      reference: "Advertisement No. RUWA/UP/REC/2025/09, Dated: 25th September 2025",
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
          value: "Detailed qualifications for each post are available on the official website.",
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
          value: "Candidates must apply ONLINE ONLY. No other mode of application will be accepted.",
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
          value: "Minimum 2 years of driving (ambulance/heavy/light vehicle preferred).",
        },
        {
          label: "Additional Skills",
          value: "Basic knowledge of road safety, vehicle maintenance; preference to candidates with First Aid Training.",
        },
        {
          label: "Responsibilities",
          value: "Safe patient transport, ambulance maintenance, supporting medical staff, and maintaining logbooks.",
        },
        { label: "Age Limit", value: "21 – 40 Years (Relaxation as per rules)." },
        {
          label: "Selection Process",
          value: "Driving Skill Test, Document Verification, and Medical Fitness Test.",
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
          value: "Aradhya Enterprises Manpower Services, Lucknow, Uttar Pradesh.",
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
            className={`notification-details-wrapper ${isExpanded ? "expanded" : ""}`}
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
    console.log('Component mounted, fetching jobs...');
    console.log('API_BASE_URL:', API_BASE_URL);
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      console.log('Starting fetchJobs...');
      setLoading(true);
      setError(null);
      
      // Get auth token from localStorage
      const token = localStorage.getItem('token');
      console.log('Token exists:', !!token);
      
      const headers = {
        'Content-Type': 'application/json',
      };
      
      // Add authorization header if token exists
      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
      }

      const url = `${API_BASE_URL}/jobs`;
      console.log('Fetching from URL:', url);
      console.log('Headers:', headers);

      const response = await fetch(url, {
        method: 'GET',
        headers: headers,
      });

      console.log('Response status:', response.status);
      console.log('Response ok:', response.ok);

      if (!response.ok) {
        // If unauthorized and no token, it means endpoint requires auth
        if (response.status === 401 || response.status === 403) {
          throw new Error('Authentication required to view jobs. Please contact administrator.');
        }
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log('Jobs data received:', data);
      console.log('Number of jobs:', data.length);
      
      // Filter only active/published jobs for public view
      // const activeJobs = Array.isArray(data) ? data.filter(job => 
      //   job.jobStatus === 'active' || job.jobStatus === 'published'
      // ) : [];
      
      // console.log('Active jobs after filter:', activeJobs.length);
      setJobs(data);
    } catch (error) {
      console.error('Error fetching jobs:', error);
      console.error('Error details:', error.message);
      setError(error.message || 'Unable to load job listings. Please try again later.');
      setJobs([]);
    } finally {
      setLoading(false);
      console.log('fetchJobs completed');
    }
  };

  const handleCardClick = (job) => {
    setActiveJob(job);
    setShowModal(true);
  };

  function handleApply(e,id) {
    e.preventDefault();
    e.stopPropagation();
    navigate(`/job-form/?jobId=${id}`);
  }

  const getJobTypeBadge = (category) => {
    const types = {
      medical: { label: 'Medical', class: 'bg-primary' },
      driver: { label: 'Driver', class: 'bg-success' },
      support: { label: 'Support', class: 'bg-warning' },
      administrative: { label: 'Administrative', class: 'bg-info' },
      technical: { label: 'Technical', class: 'bg-danger' }
    };
    const type = types[category?.toLowerCase()] || { label: 'Other', class: 'bg-secondary' };
    return <span className={`badge ${type.class} position-absolute top-0 end-0 m-2`}>{type.label}</span>;
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'long',
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
      </>
    ),
    jobs: (
      <>
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h3 className="mb-0">🚀 Current Openings</h3>
          <small className="text-muted">
            Showing {jobs.filter(job => isApplicationOpen(job.applicationEndDate)).length} active positions
          </small>
        </div>
        
        {loading ? (
          <div className="text-center py-5">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
            <p className="mt-3">Loading job opportunities...</p>
          </div>
        ) : error ? (
          <div className="alert alert-warning" role="alert">
            <h5 className="alert-heading">⚠️ Unable to Load Jobs</h5>
            <p>{error}</p>
            <button className="btn btn-sm btn-outline-warning" onClick={fetchJobs}>
              Try Again
            </button>
          </div>
        ) : jobs.filter(job => isApplicationOpen(job.applicationEndDate)).length === 0 ? (
          <div className="text-center py-5">
            <div className="text-muted mb-3">
              <FaUsers size={48} />
            </div>
            <h5>No active positions at the moment</h5>
            <p>Please check back later for new opportunities.</p>
          </div>
        ) : (
          <div className="row">
            {jobs
              .filter(job => isApplicationOpen(job.applicationEndDate))
              .map((job) => (
              <div className="col-lg-6 mb-4" key={job._id}>
                <div
                  className="card shadow-sm h-100 border-0 position-relative hover-shadow"
                  style={{ cursor: 'pointer', transition: 'all 0.3s ease' }}
                  onClick={() => handleCardClick(job)}
                >
                  {getJobTypeBadge(job.jobCategory)}
                  <div className="card-body d-flex flex-column">
                    <div className="mb-3">
                      <h5 className="card-title text-primary mb-2">{job.postName}</h5>
                      <div className="d-flex flex-wrap gap-2 mb-2">
                        <small className="text-muted">
                          <FaMapMarkerAlt className="me-1" />
                          {job.jobLocation || 'Location TBD'}
                        </small>
                        <small className="text-muted">
                          <FaUsers className="me-1" />
                          {job.numberOfPosts} {job.numberOfPosts === 1 ? 'post' : 'posts'}
                        </small>
                      </div>
                      <div className="d-flex align-items-center mb-2">
                        <small className="text-success">
                          <FaRupeeSign className="me-1" />
                          {job.payScale}
                        </small>
                      </div>
                      <p className="card-text text-muted small">
                        {job.jobResponsibilities && job.jobResponsibilities.length > 120 
                          ? job.jobResponsibilities.substring(0, 120) + '...'
                          : job.jobResponsibilities || 'Details available on application'
                        }
                      </p>
                    </div>
                    
                    <div className="mt-auto">
                      <div className="d-flex justify-content-between align-items-center mb-2">
                        <small className="text-muted">
                          <FaCalendarAlt className="me-1" />
                          Apply before: {formatDate(job.applicationEndDate)}
                        </small>
                      </div>
                      <button 
                        className="btn btn-outline-primary w-100"
                        onClick={(e) => handleApply(e,job._id)}
                      >
                        View Details & Apply <FaArrowRight className="ms-2" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </>
    ),
    life: (
      <>
        <h3 className="mb-3">💼 Life at RUWA</h3>
        <p>
          At RUWA, we blend professionalism with creativity. Flexible timings, open communication, and a fun work environment make every day exciting.
        </p>
      </>
    ),
    culture: (
      <>
        <h3 className="mb-3">🎯 Our Culture</h3>
        <p>
          We believe in innovation, inclusion, and integrity. We encourage ownership and reward initiative. Your voice matters here.
        </p>
      </>
    ),
    locations: (
      <>
        <h3 className="mb-3">📍 Office Locations</h3>
        <ul>
          <li>Head Office – Lucknow, Uttar Pradesh</li>
          <li>Medical Facilities – Across Uttar Pradesh</li>
          <li>Diagnostic Centers – Multiple Locations</li>
        </ul>
      </>
    ),
    loca: (
      <>
        <Orgstructer />
      </>
    ),
    apply: (
      <>
        <h3 className="mb-3">🧾 How to Apply</h3>
        <p>
          Send your updated resume to <strong>hrd@ruwaindia.com</strong> with your portfolio or LinkedIn link.
        </p>
        <a className="btn btn-success mt-3" href="mailto:hrd@ruwaindia.com">
          <FaArrowRight className="me-2" /> Apply Now
        </a>
      </>
    ),
  };

  return (
    <div className="container-fluid py-5">
      <div className="row">
        {/* Sidebar */}
        <div className="col-md-3 mb-4 mb-md-0">
          <div className="list-group shadow-sm">
            <button className={`list-group-item list-group-item-action ${selected === 'iconNotification' ? 'active' : ''}`} onClick={() => setSelected('iconNotification')}>
              Icon Notification and Jobs Notification
            </button>
            <button className={`list-group-item list-group-item-action ${selected === 'instruction' ? 'active' : ''}`} onClick={() => setSelected('instruction')}>
              Instruction for User
            </button>
            <button className={`list-group-item list-group-item-action ${selected === 'jobs' ? 'active' : ''}`} onClick={() => setSelected('jobs')}>
              Job Openings
            </button>
            <button className={`list-group-item list-group-item-action ${selected === 'life' ? 'active' : ''}`} onClick={() => setSelected('life')}>
              Life at RUWA
            </button>
            <button className={`list-group-item list-group-item-action ${selected === 'culture' ? 'active' : ''}`} onClick={() => setSelected('culture')}>
              Company Culture
            </button>
            <button className={`list-group-item list-group-item-action ${selected === 'locations' ? 'active' : ''}`} onClick={() => setSelected('locations')}>
              Office Locations
            </button>
            <button className={`list-group-item list-group-item-action ${selected === 'loca' ? 'active' : ''}`} onClick={() => setSelected('loca')}>
              Our Structure
            </button>
            <button className={`list-group-item list-group-item-action ${selected === 'apply' ? 'active' : ''}`} onClick={() => setSelected('apply')}>
              How to Apply
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="col-md-9">
          <div className="p-4 bg-white rounded shadow-sm">{content[selected]}</div>
        </div>
      </div>

      {/* Job Details Modal */}
      {activeJob && (
        <div
          className={`modal fade ${showModal ? 'show d-block' : ''}`}
          tabIndex="-1"
          style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}
          onClick={() => setShowModal(false)}
        >
          <div className="modal-dialog modal-dialog-centered modal-lg modal-dialog-scrollable" onClick={(e) => e.stopPropagation()}>
            <div className="modal-content">
              <div className="modal-header">
                <div>
                  <h5 className="modal-title">{activeJob.postName}</h5>
                  <p className="text-muted mb-0 small">Ref: {activeJob.advertisementNumber}</p>
                </div>
                <button type="button" className="btn-close" onClick={() => setShowModal(false)}></button>
              </div>
              <div className="modal-body">
                <div className="row mb-3">
                  <div className="col-md-6">
                    <p><strong><FaMapMarkerAlt className="me-2" />Location:</strong> {activeJob.jobLocation || 'N/A'}</p>
                    <p><strong><FaRupeeSign className="me-2" />Pay Scale:</strong> {activeJob.payScale}</p>
                  </div>
                  <div className="col-md-6">
                    <p><strong><FaUsers className="me-2" />Vacancies:</strong> {activeJob.numberOfPosts}</p>
                    <p><strong><FaCalendarAlt className="me-2" />Last Date:</strong> {formatDate(activeJob.applicationEndDate)}</p>
                  </div>
                </div>

                {activeJob.educationalQualifications && (
                  <div className="mb-3">
                    <h6>Educational Qualifications</h6>
                    <p className="text-muted">{activeJob.educationalQualifications}</p>
                  </div>
                )}

                {activeJob.experienceRequired && (
                  <div className="mb-3">
                    <h6>Experience Required</h6>
                    <p className="text-muted">{activeJob.experienceRequired}</p>
                  </div>
                )}

                {(activeJob.minAge || activeJob.maxAge) && (
                  <div className="mb-3">
                    <h6>Age Criteria</h6>
                    <p className="text-muted">
                      {activeJob.minAge && `Min: ${activeJob.minAge} years`}
                      {activeJob.minAge && activeJob.maxAge && ' | '}
                      {activeJob.maxAge && `Max: ${activeJob.maxAge} years`}
                    </p>
                    {activeJob.ageRelaxation && (
                      <small className="text-info">{activeJob.ageRelaxation}</small>
                    )}
                  </div>
                )}

                {activeJob.licenseType && (
                  <div className="mb-3">
                    <h6>License Requirements</h6>
                    <p className="text-muted">{activeJob.licenseType}</p>
                  </div>
                )}

                {activeJob.jobResponsibilities && (
                  <div className="mb-3">
                    <h6>Job Responsibilities</h6>
                    <p className="text-muted">{activeJob.jobResponsibilities}</p>
                  </div>
                )}

                {activeJob.additionalSkills && (
                  <div className="mb-3">
                    <h6>Additional Skills</h6>
                    <p className="text-muted">{activeJob.additionalSkills}</p>
                  </div>
                )}

                {activeJob.applicationFee && (
                  <div className="mb-3">
                    <h6>Application Fee</h6>
                    <p className="text-muted">{activeJob.applicationFee}</p>
                  </div>
                )}

                {activeJob.importantNotes && (
                  <div className="alert alert-info">
                    <strong>Important Notes:</strong>
                    <p className="mb-0 mt-2">{activeJob.importantNotes}</p>
                  </div>
                )}
              </div>
              <div className="modal-footer">
                {activeJob.applicationMode === 'online' && activeJob.applicationLink ? (
                  <a
                    href={activeJob.applicationLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-primary"
                  >
                    <FaPaperPlane className="me-2" />
                    Apply Online
                  </a>
                ) : (
                  <a
                    href={`mailto:${activeJob.applicationEmail || activeJob.contactEmail || 'hrd@ruwaindia.com'}?subject=Application for ${activeJob.postName}&body=Dear Hiring Team,%0D%0A%0D%0AI am interested in applying for the position of ${activeJob.postName} (Ref: ${activeJob.advertisementNumber}).%0D%0A%0D%0APlease find my details attached.%0D%0A%0D%0ARegards,%0D%0A[Your Name]`}
                    className="btn btn-primary"
                  >
                    <FaPaperPlane className="me-2" />
                    Apply via Email
                  </a>
                )}
                <button className="btn btn-secondary" onClick={() => setShowModal(false)}>
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