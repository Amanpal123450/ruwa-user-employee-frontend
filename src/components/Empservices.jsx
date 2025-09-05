// // import React from "react";
// import { useNavigate } from "react-router-dom";

// export default function Empservices() {
//   const navigate = useNavigate();

//   const employeeServices = [
//     {
//       icon: "🧑‍🤝‍🧑",
//       title: "Jan Swabhiman Seva (for User)",
//       description:
//         "Assist users with welfare services, employment access, and social support under Jan Swabhiman Seva.",
//       btnText: "Apply for User",
//       gradient: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
//       route: "/employee/apply-swabhiman",
//     },
//     {
//       icon: "🪪",
//       title: "Jan Arogya Card (for User)",
//       description:
//         "Help users avail affordable health services with the Jan Arogya Card for access to top hospitals and cashless treatments.",
//       btnText: "Apply for User",
//       gradient: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
//       route: "/employee/apply-arogya",
//     },
//     {
//       icon: "🚑",
//       title: "Emergency Ambulance Service",
//       description:
//         "Book reliable ambulance services on behalf of users to ensure timely medical transport and support during emergencies.",
//       btnText: "Book for User",
//       gradient: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
//       route: "/employee/apply-ambulance",
//     },
//     {
//       icon: "🛡️",
//       title: "Health Insurance Coverage",
//       description:
//         "Help users apply for affordable and comprehensive insurance plans, ensuring cashless treatments and peace of mind.",
//       btnText: "Apply for User",
//       gradient: "linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)",
//       route: "/employee/apply-insurance",
//     },
//     {
//       icon: "🏢",
//       title: "Jan Arogya Kendra",
//       description:
//         "Assist users in applying to set up a Jan Arogya Kendra with clear, streamlined steps.",
//       btnText: "Apply for User",
//       gradient: "linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)",
//       route: "/employee/apply-kendra",
//     },
//   ];

//   return (
//     <section className="services-dashboard py-5">
//       <div className="container">
//         {/* Intro Section */}
//         <div className="text-center mb-5">
//           <span className="subtitle text-uppercase text-muted fs-6">
//             Employee Portal
//           </span>
//           <h2 className="section-title">
//             Assist Users with Healthcare & Welfare Services
//           </h2>
//           <p className="section-subtitle">
//             Select a service below and complete the process on behalf of the user.
//           </p>
//         </div>

//         {/* Service Cards */}
//         <div className="row g-4">
//           {employeeServices.map((service, index) => (
//             <div
//               key={index}
//               className="col-xxl-4 col-xl-4 col-lg-6 col-md-6 mb-4"
//             >
//               <div
//                 className="action-card"
//                 style={{ "--gradient": service.gradient }}
//               >
//                 <div className="card-background"></div>
//                 <div className="card-content">
//                   <div className="card-icon">
//                     <span className="icon-emoji">{service.icon}</span>
//                   </div>
//                   <div className="card-info">
//                     <h4 className="card-title">{service.title}</h4>
//                     <p className="card-description">{service.description}</p>
//                     <button
//                       className="btn btn-sm btn-light mt-2"
//                       onClick={() => navigate(service.route)}
//                     >
//                       {service.btnText}
//                     </button>
//                   </div>
//                   <div className="card-arrow">
//                     <i className="fas fa-arrow-right"></i>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>

//         {/* Conclusion */}
//         <div className="row mt-5">
//           <div className="col-12">
//             <div className="conclusion-card p-4 rounded-4 text-center shadow-sm">
//               <i className="bi bi-check-circle-fill fs-1 text-success mb-3"></i>
//               <h3 className="fs-5 mb-2">Conclusion</h3>
//               <p className="mb-0 fs-6">
//                 Employees are the bridge between users and our services. By
//                 assisting with applications, you ensure that users receive quick
//                 access to health benefits, insurance, and emergency support.
//               </p>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Style Matching Dashboard */}
//       <style jsx>{`
//         .services-dashboard {
//           background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
//           min-height: 100vh;
//         }
//         .section-title {
//           font-size: 2rem;
//           font-weight: 700;
//           color: #1f2937;
//           margin-bottom: 0.5rem;
//         }
//         .section-subtitle {
//           color: #6b7280;
//           font-size: 1.1rem;
//         }
//         .action-card {
//           background: white;
//           border-radius: 20px;
//           padding: 0;
//           box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
//           transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
//           position: relative;
//           overflow: hidden;
//           height: 250px;
//         }
//         .action-card::before {
//           content: "";
//           position: absolute;
//           top: 0;
//           left: 0;
//           right: 0;
//           bottom: 0;
//           background: var(--gradient);
//           opacity: 0;
//           transition: all 0.3s ease;
//         }
//         .action-card:hover::before {
//           opacity: 0.1;
//         }
//         .action-card:hover {
//           transform: translateY(-8px) scale(1.02);
//           box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
//         }
//         .card-content {
//           padding: 1.5rem;
//           position: relative;
//           z-index: 2;
//           height: 100%;
//           display: flex;
//           align-items: center;
//           gap: 1rem;
//         }
//         .card-icon {
//           flex-shrink: 0;
//         }
//         .icon-emoji {
//           font-size: 2.5rem;
//           display: block;
//         }
//         .card-info {
//           flex-grow: 1;
//         }
//         .card-title {
//           font-size: 1.2rem;
//           font-weight: 600;
//           color: #1f2937;
//           margin-bottom: 0.5rem;
//         }
//         .card-description {
//           color: #6b7280;
//           font-size: 0.9rem;
//           margin: 0;
//         }
//         .card-arrow {
//           flex-shrink: 0;
//           color: #9ca3af;
//           transition: all 0.3s ease;
//         }
//         .action-card:hover .card-arrow {
//           color: #3b82f6;
//           transform: translateX(5px);
//         }
//         .conclusion-card {
//           background: white;
//           border-radius: 20px;
//           box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
//         }
//       `}</style>
//     </section>
//   );
// }
import React from "react";
import { useNavigate } from "react-router-dom";

export default function Empservices() {
  const navigate = useNavigate();

  const employeeServices = [
    {
      icon: "🧑‍🤝‍🧑",
      title: "Jan Swabhiman Seva (for User)",
      description:
        "Assist users with welfare services, employment access, and social support under Jan Swabhiman Seva.",
      btnText: "Apply for User",
      gradient: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
      route: "/employee/apply-swabhiman",
    },
    {
      icon: "🪪",
      title: "Jan Arogya Card (for User)",
      description:
        "Help users avail affordable health services with the Jan Arogya Card for access to top hospitals and cashless treatments.",
      btnText: "Apply for User",
      gradient: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
      route: "/employee/apply-arogya",
    },
    {
      icon: "🚑",
      title: "Emergency Ambulance Service",
      description:
        "Book reliable ambulance services on behalf of users to ensure timely medical transport and support during emergencies.",
      btnText: "Book for User",
      gradient: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
      route: "/employee/apply-ambulance",
    },
    {
      icon: "🛡️",
      title: "Health Insurance Coverage",
      description:
        "Help users apply for affordable and comprehensive insurance plans, ensuring cashless treatments and peace of mind.",
      btnText: "Apply for User",
      gradient: "linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)",
      route: "/employee/apply-insurance",
    },
    {
      icon: "🏢",
      title: "Jan Arogya Kendra",
      description:
        "Assist users in applying to set up a Jan Arogya Kendra with clear, streamlined steps.",
      btnText: "Apply for User",
      gradient: "linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)",
      route: "/employee/apply-kendra",
    },
  ];

  return (
    <div className="dashboard-container">
      <div className="container-fluid py-4">
        <div className="row">
          <div className="col-12">
            {/* Header */}
            <div className="welcome-card mb-4">
              <div className="welcome-overlay">
                <div className="row align-items-center">
                  <div className="col-lg-8 col-md-7">
                    <div className="welcome-content">
                      <div className="greeting-badge">
                        Employee Portal 👋
                      </div>
                      <h1 className="welcome-title">
                        Assist Users with Healthcare & Welfare Services
                      </h1>
                      <p className="welcome-subtitle">
                        Select a service below and complete the process on behalf of the user
                      </p>
                    </div>
                  </div>
                  <div className="col-lg-4 col-md-5 text-center">
                    <div className="profile-section">
                      <div className="profile-image-container">
                        <div className="service-icon-display">
                          <span className="icon-emoji">👨‍💼</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Service Cards */}
            <div className="row mb-5">
              {employeeServices.map((service, index) => (
                <div className="col-12 col-md-6 col-lg-4 mb-4" key={index}>
                  <div className="service-card" style={{ '--gradient': service.gradient }}>
                    <div className="card-background"></div>
                    <div className="card-content">
                      <div className="card-icon">
                        <span className="icon-emoji">{service.icon}</span>
                      </div>
                      <div className="card-info">
                        <h4 className="card-title">{service.title}</h4>
                        <p className="card-description">{service.description}</p>
                        <button
                          className="btn btn-sm btn-light mt-2"
                          onClick={() => navigate(service.route)}
                        >
                          {service.btnText}
                        </button>
                      </div>
                      <div className="card-arrow">
                        <i className="fas fa-arrow-right"></i>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Conclusion */}
            <div className="row">
              <div className="col-12">
                <div className="card user-table-card">
                  <div className="card-body text-center p-4">
                    <div className="conclusion-icon mb-3">
                      <i className="fas fa-check-circle"></i>
                    </div>
                    <h3 className="header-title mb-2">Conclusion</h3>
                    <p className="header-subtitle">
                      Employees are the bridge between users and our services. By
                      assisting with applications, you ensure that users receive quick
                      access to health benefits, insurance, and emergency support.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .dashboard-container {
          background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
          min-height: 100vh;
          padding: 0;
        }

        .welcome-card {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          border-radius: 20px;
          margin-bottom: 2rem;
          overflow: hidden;
          position: relative;
          box-shadow: 0 20px 40px rgba(102, 126, 234, 0.3);
        }

        .welcome-overlay {
          padding: 2rem;
          position: relative;
          z-index: 2;
        }

        .welcome-content {
          color: white;
        }

        .greeting-badge {
          display: inline-block;
          background: rgba(255, 255, 255, 0.2);
          padding: 0.5rem 1rem;
          border-radius: 50px;
          font-size: 0.9rem;
          font-weight: 500;
          margin-bottom: 1rem;
          backdrop-filter: blur(10px);
        }

        .welcome-title {
          font-size: 2.2rem;
          font-weight: 700;
          margin-bottom: 0.5rem;
          background: linear-gradient(45deg, #ffffff, #f8f9ff);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .welcome-subtitle {
          font-size: 1.1rem;
          opacity: 0.9;
          margin-bottom: 0;
        }

        .service-icon-display {
          width: 100px;
          height: 100px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.2);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 3rem;
          backdrop-filter: blur(10px);
          border: 2px solid rgba(255, 255, 255, 0.3);
        }

        .service-card {
          background: white;
          border-radius: 16px;
          padding: 0;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
          border: none;
          transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
          position: relative;
          overflow: hidden;
          height: 100%;
        }

        .service-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: var(--gradient);
          opacity: 0.1;
          transition: all 0.3s ease;
        }

        .service-card:hover {
          transform: translateY(-8px) scale(1.02);
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
        }

        .card-content {
          padding: 1.5rem;
          position: relative;
          z-index: 2;
          height: 100%;
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .card-icon {
          text-align: center;
        }

        .icon-emoji {
          font-size: 2.5rem;
          display: block;
        }

        .card-info {
          flex-grow: 1;
        }

        .card-title {
          font-size: 1.2rem;
          font-weight: 600;
          color: #1f2937;
          margin-bottom: 1rem;
          text-align: center;
        }

        .card-description {
          color: #6b7280;
          font-size: 0.9rem;
          margin: 0;
          text-align: center;
        }

        .card-arrow {
          text-align: center;
          color: #9ca3af;
          transition: all 0.3s ease;
        }

        .service-card:hover .card-arrow {
          color: #3b82f6;
        }

        .user-table-card {
          background: white;
          border-radius: 20px;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
          border: none;
          overflow: hidden;
        }

        .header-title {
          font-size: 1.5rem;
          font-weight: 600;
          color: #1f2937;
          margin: 0;
        }

        .header-subtitle {
          color: #6b7280;
          font-size: 1rem;
          margin: 0.5rem 0 0;
          max-width: 600px;
          margin-left: auto;
          margin-right: auto;
        }

        .conclusion-icon {
          font-size: 3rem;
          color: #10b981;
        }

        @media (max-width: 768px) {
          .welcome-title {
            font-size: 1.8rem;
          }
          
          .welcome-overlay {
            padding: 1.5rem;
          }
          
          .service-card {
            margin-bottom: 1rem;
          }
        }
      `}</style>
    </div>
  );
}