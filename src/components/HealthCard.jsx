
import React, { useState, useEffect } from "react";
import Barcode from "react-barcode";

const JanArogyaCard = ({Application}) => {
  const [randomId, setRandomId] = useState("");
  const name=localStorage.getItem("name")
  useEffect(() => {
    // Generate a random 12-digit ID
    const generateRandomId = () => {
      const part1 = Math.floor(1000 + Math.random() * 9000);
      const part2 = Math.floor(1000 + Math.random() * 9000);
      const part3 = Math.floor(1000 + Math.random() * 9000);
      return `${part1}-${part2}-${part3}`;
    };
    setRandomId(generateRandomId());
  }, []);
  console.log(Application)

  return (
    <div
      className="position-relative mx-auto"
      style={{
        width: "430px",
        height: "270px",
        backgroundImage: `url(${"/assets/images/cardbg.png"})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        borderRadius: "10px",
        boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
        overflow: "hidden",
        fontFamily: "sans-serif",
        color: "#000"
      }}
    >
      {/* Photo */}
      <img
        src={Application.profilePicUser}
        alt="profile"
        style={{
          position: "absolute",
          top: "70px",
          left: "25px",
          width: "90px",
          height: "100px",
          objectFit: "cover",
          borderRadius: "4px"
        }}
      />

      {/* Logo */}
      <img
        src="/assets/images/ruwalogocolor.png"
        alt="logo"
        style={{
          position: "absolute",
          top: "35px",
          right: "10px",
          width: "65px"
        }}
      />

      {/* Title */}
      <div
        style={{
          position: "absolute",
          top: "35px",
          left: "135px",
          fontSize: "20px",
          fontWeight: "bold"
        }}
      >
        JAN AROGAY CARD
        <hr className="fw-1 fs-1 line mt-auto" />
      </div>

      {/* Details */}
      <div
        style={{
          position: "absolute",
          top: "90px",
          left: "135px",
          fontSize: "15px",
          lineHeight: "1.6"
        }}
      >
        <div>
          <strong>Name</strong> : {Application.name}
        </div>
        <div>
          <strong>Gender</strong> : Male
        </div>
        <div>
         <strong>DOB</strong> : {Application?.DOB ? new Date(Application.DOB).toISOString().split("T")[0] : "N/A"}

        </div>
      </div>

      {/* Barcode using react-barcode */}
    {/* Barcode + QR Code */}
<div
  style={{
    position: "absolute",
    bottom: "100px",
    left: "320px",
    display: "flex",
    alignItems: "center",
    gap: "10px"
  }}
>
  {/* Barcode */}
 {/* <Barcode
  value={Application?.aadhar || randomId} // aadhar मिल जाए तो वही use होगा
  format="CODE128"
  width={2}        // थोड़ा मोटा barcode
  height={50}      // height ज्यादा ताकि scan easy हो
  displayValue={false}
  lineColor="#000000"
  background="transparent"
/> */}


  {/* QR Code (from Application.Qr) */}
  {Application?.Qr && (
    <img
      src={Application.Qr}
      alt="QR Code"
      style={{
        width: "70px",
        height: "70px"
      }}
    />
  )}
</div>


      {/* ID Number Display */}
      <div
        style={{
          position: "absolute",
          bottom: "40px",
          left: "135px",
          fontSize: "22px",
          fontWeight: "bold",
          letterSpacing: "2px"
        }}
      >
          {Application.aadhar}
      </div>
    </div>
  );
};

export default JanArogyaCard;
