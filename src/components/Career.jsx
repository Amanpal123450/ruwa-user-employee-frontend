import React, { useState, useEffect } from 'react';
import { FaArrowRight, FaPaperPlane, FaMapMarkerAlt, FaRupeeSign, FaUsers, FaCalendarAlt, FaBriefcase, FaClock, FaGraduationCap } from 'react-icons/fa';
import Orgstructer from '../components/Orgstructer';
import { useNavigate } from 'react-router-dom';
import { Container, Row, Col, Card, Button, Badge } from "react-bootstrap";
import { Bell, Briefcase, MapPin, Calendar, Users, DollarSign, Clock, Award, FileText } from "lucide-react";

const Career = () => {
  const [selected, setSelected] = useState('jobs');
  const [showModal, setShowModal] = useState(false);
  const [activeJob, setActiveJob] = useState(null);
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [id,addId]=useState("")
  const navigate = useNavigate();

  const API_BASE_URL = process.env.REACT_APP_API_URL || 'https://ruwa-backend.onrender.com/api';

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const token = localStorage.getItem('token');
      const headers = {
        'Content-Type': 'application/json',
      };
      
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
      setJobs([]);
    } finally {
      setLoading(false);
    }
  };

  const handleCardClick = (job) => {
    setActiveJob(job);
    setShowModal(true);
  };

  function handleApply(e,id) {
    e.preventDefault();
    navigate(`/job-form/?jobId=${id}`);

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
                      <button 
                        className="btn btn-primary w-100 d-flex align-items-center justify-content-center gap-2 py-2"
                        style={{ borderRadius: '10px', fontWeight: '600' }}
                        onClick={(e) => handleApply(e,job._id)}
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
      <div className="animate__animated animate__fadeIn">
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
    <div className="min-vh-100" style={{ backgroundColor: '#f8f9fa' }}>
      <Container fluid className="py-5">
        <Row>
          {/* Sidebar */}
          <Col md={3} className="mb-4 mb-md-0">
            <div className="sticky-top" style={{ top: '100px' }}>
              <div className="card border-0 shadow-sm" style={{ borderRadius: '16px', overflow: 'hidden' }}>
                <div className="list-group list-group-flush">
                  {[
                    { key: 'jobs', icon: <Briefcase size={18} />, label: 'Job Openings' },
                    { key: 'life', icon: <Users size={18} />, label: 'Life at RUWA' },
                    { key: 'culture', icon: <Award size={18} />, label: 'Company Culture' },
                    { key: 'locations', icon: <MapPin size={18} />, label: 'Office Locations' },
                    { key: 'structure', icon: <FileText size={18} />, label: 'Our Structure' },
                    { key: 'apply', icon: <FaPaperPlane size={18} />, label: 'How to Apply' }
                  ].map((item) => (
                    <button
                      key={item.key}
                      className={`list-group-item list-group-item-action border-0 d-flex align-items-center gap-3 py-3 ${selected === item.key ? 'active' : ''}`}
                      onClick={() => setSelected(item.key)}
                      style={{
                        transition: 'all 0.3s ease',
                        fontWeight: selected === item.key ? '600' : '500',
                        backgroundColor: selected === item.key ? '#667eea' : 'transparent',
                        color: selected === item.key ? 'white' : '#6c757d'
                      }}
                    >
                      {item.icon}
                      {item.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </Col>

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