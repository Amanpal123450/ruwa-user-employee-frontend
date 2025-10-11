import React, { useState, useEffect } from 'react';
import { FaArrowRight, FaPaperPlane, FaMapMarkerAlt, FaRupeeSign, FaUsers, FaCalendarAlt } from 'react-icons/fa';
import Orgstructer from '../components/Orgstructer';
import { useNavigate } from 'react-router-dom';
import { Container, Row, Col, Card, Button, Badge } from "react-bootstrap";
import { Bell, Briefcase } from "lucide-react";

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
      
      // Filter only active/published jobs for public view
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

  function handleApply(e) {
    e.preventDefault();
    navigate("/job-form");
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
                      <button className="btn btn-outline-primary w-100"
                        onClick={(e) => handleApply(e)}
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
    structure: (
      <>
        <Orgstructer/>
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