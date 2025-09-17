import React from "react";
import html2pdf from "html2pdf.js";
import JanArogyaCard from "./HealthCard";
import Healthcardback from "./Healthcardback";
import "./ApplicationPopupCard.css";


export default function ApplicationPopup({ Application, onClose }) {
  const handleDownload = () => {
    const element = document.getElementById("application-card");
    const opt = {
      margin: 0.5,
      filename: "application-card.pdf",
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: "in", format: "letter", orientation: "portrait" },
    };
    html2pdf().set(opt).from(element).save();
  };

  return (
  <div className="modal-overlay" onClick={onClose}>
  <div className="modal-content" onClick={(e) => e.stopPropagation()}>
    <button className="btn-close" onClick={onClose}>
      ✖
    </button>

    <div id="application-card">
      <JanArogyaCard Application={Application} />
      <Healthcardback />
    </div>

    <button className="btn btn-primary mt-3" onClick={handleDownload}>
      Download PDF
    </button>
  </div>
  
</div>

  );
}
