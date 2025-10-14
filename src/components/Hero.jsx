import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation, Autoplay } from 'swiper/modules';
import './Hero.css';

export default function Hero() {
  const navigate = useNavigate();
  
  const slides = [
    {
      src: '/assets/images/inch.jpg',
      title: 'Inclusive Healthcare',
      text: 'Bringing care to every doorstep with compassion and innovation.',
      icon: '🩺',
    },
    {
      src: '/assets/images/digo.jpg',
      title: 'Digital Healthcare',
      text: 'Leveraging technology to connect rural patients with specialists.',
      icon: '💻',
    },
    {
      src: '/assets/images/ambulance.jpg',
      title: 'Rapid Ambulance Service',
      text: 'Emergency response at lightning speed across all terrains.',
      icon: '🚑',
    },
    {
      src: '/assets/images/doctor.jpg',
      title: 'Skilled Medical Professionals',
      text: 'Our team of dedicated doctors ensures expert treatment for all.',
      icon: '👨‍⚕️',
    },
    {
      src: '/assets/images/village_sec.jpg',
      title: 'Serving Rural Communities',
      text: 'We ensure even the remotest villages receive reliable healthcare.',
      icon: '🏥',
    },
    {
      src: '/assets/images/village.jpg',
      title: 'Healthcare Awareness in Villages',
      text: 'Educating and empowering local communities with health knowledge.',
      icon: '📚',
    },
    {
      src: '/assets/images/village_third.jpg',
      title: 'Community Health Drives',
      text: 'Organizing regular camps for checkups, vaccinations, and education.',
      icon: '🧪',
    },
    {
      src: '/assets/images/medical.jpg',
      title: 'Affordable Medical Insurance',
      text: 'Secure your family s future with our easy-to-access plans.',
      icon: '💊',
    },
  ];

  const services = [
    {
      icon: '🪪',
      title: 'Jan Arogya Card',
      description: 'Avail affordable health services through the Jan Arogya Card, giving you seamless access to top hospitals and cashless treatments across our partner network.',
      buttonText: 'Apply Now',
      buttonClass: 'btn-success',
      route: '/apply-arogya'
    },
    {
      icon: '🚑',
      title: 'Emergency Ambulance Service',
      description: 'Quick and reliable ambulance support during emergencies. Our service ensures timely medical transport for patients with fully equipped vehicles and trained personnel.',
      buttonText: 'Book Ambulance',
      buttonClass: 'btn-danger',
      route: '/apply-ambulance'
    },
    {
      icon: '🛡️',
      title: 'Health Insurance Coverage',
      description: 'Protect yourself and your loved ones with our affordable and comprehensive health insurance plans. Enjoy cashless treatments, wide hospital networks, and peace of mind.',
      buttonText: 'Apply for Insurance',
      buttonClass: 'btn-primary',
      route: '/apply-insurance'
    },
    {
      icon: '🏢',
      title: 'Jan Arogya Kendra',
      description: 'We\'ve streamlined the process into four clear steps. Follow the path below to launch your Jan Arogya Kendra.',
      buttonText: 'Apply for Kendra',
      buttonClass: 'btn-danger',
      route: '/apply-kendr'
    }
  ];

  return (
    <>
      <section className="hero__v6 section" id="home">
        <div className="container">
          {/* Swiper Section */}
          <Swiper
            slidesPerView={1}
            spaceBetween={30}
            loop={true}
            autoplay={{
              delay: 5000,
              disableOnInteraction: false,
            }}
            pagination={{ clickable: true }}
            navigation={true}
            modules={[Pagination, Navigation, Autoplay]}
            className="mySwiper"
          >
            {slides.map((slide, index) => (
              <SwiperSlide key={index}>
                <div className="slide-wrapper">
                  <img
                    src={slide.src}
                    alt={`Slide ${index + 1}`}
                    className="slide-image"
                  />
                  <div className="slide-overlay">
                    <div className="icon-heading">
                      <span className="slide-icon">{slide.icon}</span>
                      <h1 className="slide-title">{slide.title}</h1>
                    </div>
                    <p className="slide-text">{slide.text}</p>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Hero Content */}
          <div className="row mt-4 align-items-center">
            <div className="col-lg-6 mb-4 mb-lg-0">
              <div className="row">
                <div className="col-lg-11">
                  <span className="hero-subtitle text-uppercase" data-aos="fade-up">
                    RUWA <sup className="super">INDIA</sup>
                  </span>
                  <h5 className="hero-title mb-3" data-aos="fade-up">
                    Welcome to {process.env.REACT_APP_SITE_NAME}
                  </h5>
                  <p>Your trusted partner in healthcare and insurance.</p>
                  <p className="hero-description mb-4 mb-lg-5" data-aos="fade-up">
                    We know that dealing with the health system can be difficult. That's why we're here — to make things simple and help you get the care you need without any stress.
                  </p>
                  <div className="cta d-flex flex-column flex-sm-row gap-2 mb-4 mb-lg-5" data-aos="fade-up">
                    <Link 
                      className="btn" 
                      data-bs-dismiss="modal"
                      data-bs-toggle="modal"
                      data-bs-target="#loginModal"
                    >
                      Get Started Now
                    </Link>
                    <Link className="btn btn-white-outline" to="/learnmore">
                      Learn More
                      <svg className="lucide lucide-arrow-up-right" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M7 7h10v10"></path>
                        <path d="M7 17 17 7"></path>
                      </svg>
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            {/* Image Section */}
            <div className="col-lg-6">
              <div className="hero-img text-center">
                <img 
                  className="img-main img-fluid rounded-4" 
                  src="/assets/images/aboutus.png" 
                  alt="Hero" 
                  data-aos="fade-in" 
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="section services__v3 py-5 bg-light" id="services">
        <div className="container">
          <div className="row g-4">
            {services.map((service, index) => (
              <div className="col-md-6" key={index} data-aos="fade-up">
                <div className="service-card p-4 rounded-4 h-100 d-flex flex-column gap-3 shadow-sm">
                  <div className="text-center fs-1">{service.icon}</div>
                  <h3 className="text-center fs-5 mb-2">{service.title}</h3>
                  <p className="text-center">{service.description}</p>
                  <div className="text-center mt-auto">
                    <button 
                      className={`btn ${service.buttonClass}`} 
                      onClick={() => navigate(service.route)}
                    >
                      {service.buttonText}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}