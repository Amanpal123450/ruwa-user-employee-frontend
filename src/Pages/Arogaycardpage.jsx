
import React, { useRef, useState, useEffect } from "react";
import ArogyaCard from "../components/HealthCard";
import Healthcardback from "../components/Healthcardback";
import html2canvas from "html2canvas";
import axios from "axios";

const Arogaycardpage = () => {
  const cardRef = useRef();
  const [msg, setMsg] = useState(null);
  const [loading, setLoading] = useState(true);
  const [Application,setApplication]=useState();

  useEffect(() => {
    const fetchStatus = async () => {
      try {
        const res = await axios.get("http://localhost:8000/api/services/janarogya/check", {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
        });
        setMsg(res.data.msg);
        console.log(res)
        if (res.data.msg === "APPROVED") {
        console.log("Application Data:", res.data.application);
        // You can set it in state if needed
        setApplication(res.data.application);
      }
      } catch (err) {
        if (err.response && err.response.status === 404) {
          setMsg("USER NOT FOUND");
        } else {
          setMsg("Error checking status");
        }
      } finally {
        setLoading(false);
      }
    };
    fetchStatus();
  }, []);

  const handleDownload = () => {
    if (cardRef.current) {
      html2canvas(cardRef.current).then((canvas) => {
        const link = document.createElement("a");
        link.download = "JanArogyaCard.png";
        link.href = canvas.toDataURL("image/png");
        link.click();
      });
    }
  };

  if (loading) return <p className="text-center mt-5">Checking application status...</p>;

  return (
    <section className="bg-white">
      <div
        className="d-flex flex-column justify-content-center align-items-center p-4"
        style={{ backgroundColor: "#f5f5f5", minHeight: "100vh" }}
      >
        {/* If application is pending */}
       {msg === "USER ALREADY EXISTS" && (
  <div className="alert alert-warning text-center shadow-sm rounded p-3 mb-4" style={{ maxWidth: "400px" }}>
    <h5 className="fw-bold mb-2">⏳ Application in Progress</h5>
    <p className="mb-0">Your Jan Arogya card request is under service. Please wait while we process your application.</p>
  </div>
)}


        {/* If no application */}
        {msg === "USER NOT FOUND" && (
          <p className="text-muted fw-bold mb-4">
            No application found. Please apply first.
          </p>
        )}

        {/* If later you add APPROVED in API, card will show here */}
        {msg === "APPROVED" && (
          <>
            <div
              ref={cardRef}
              className="d-flex justify-content-center align-items-center gap-4 p-4 border rounded shadow bg-light"
              style={{ flexWrap: "wrap" }}
            >
              <ArogyaCard Application={Application}/>
              <Healthcardback />
            </div>
            <button
              onClick={handleDownload}
              className="btn btn-primary mt-4"
              style={{ padding: "10px 20px", fontWeight: "bold" }}
            >
              Download Card
            </button>
          </>
        )}
      </div>
    </section>
  );
};

export default Arogaycardpage;




// import ArogyaCard from "../components/HealthCard";
// import Healthcardback from "../components/Healthcardback";

// import React, { useRef, useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import html2canvas from "html2canvas";

// const Arogaycardpage = () => {
//   const navigate = useNavigate();
//   const cardRef = useRef();
//   const [userCardData, setUserCardData] = useState(null);

//   // Example: Fetch card data from localStorage (replace with API call if needed)
//   useEffect(() => {
//     const savedData = localStorage.getItem("arogyaCardData");
//     if (savedData) {
//       setUserCardData(JSON.parse(savedData));
//     }
//   }, []);

//   const handleDownload = () => {
//     if (cardRef.current) {
//       html2canvas(cardRef.current).then((canvas) => {
//         const link = document.createElement("a");
//         link.download = "JanArogyaCard.png";
//         link.href = canvas.toDataURL("image/png");
//         link.click();
//       });
//     }
//   };

//   return (
//     <>
//       <br />
//       <br />
//       <section className="bg-white">
//         <div
//           className="d-flex flex-column justify-content-center align-items-center p-4"
//           style={{ backgroundColor: "#f5f5f5", minHeight: "100vh" }}
//         >
//           {userCardData ? (
//             <>
//               {/* Show the card if data exists */}
//               <div
//                 ref={cardRef}
//                 className="d-flex justify-content-center align-items-center gap-4 p-4 border rounded shadow bg-light"
//                 style={{ flexWrap: "wrap" }}
//               >
//                 <ArogyaCard data={userCardData} />
//                 <Healthcardback data={userCardData} />
//               </div>
//               <button
//                 onClick={handleDownload}
//                 className="btn btn-primary mt-4"
//                 style={{ padding: "10px 20px", fontWeight: "bold" }}
//               >
//                 Download Card
//               </button>
//             </>
//           ) : (
//             /* If no card data, show create card prompt */
//             <div className="text-center p-5 bg-light rounded shadow">
//               <h3 className="mb-3">You don’t have an Arogya Card yet</h3>
//               <p className="text-muted mb-4">
//                 Create your Jan Arogya Card now to access benefits.
//               </p>
//               <button
//                 className="btn btn-success px-4 py-2"
//                 onClick={() => navigate("/create-arogya-card")}
//               >
//                 Create Your Arogya Card
//               </button>
//             </div>
//           )}
//         </div>
//       </section>
//     </>
//   );
// };

// export default Arogaycardpage;
