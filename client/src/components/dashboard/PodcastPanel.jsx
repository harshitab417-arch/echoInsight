import { useState } from "react";
import { useNavigate } from "react-router-dom";
import PdfUpload from "../upload/PdfUpload";

const PodcastPanel = () => {
  const [paperId, setPaperId] = useState(localStorage.getItem("paperId") || null);
  const navigate = useNavigate();

  const handleUploadSuccess = (id) => {
    setPaperId(id);
    localStorage.setItem("paperId", id);
  };

  const handleCardClick = (mode) => {
    if (!paperId) {
      alert("Please upload a PDF first!");
      return;
    }
    navigate(`/${mode}`);
  };

  const cardStyle = {
    padding: "40px",
    borderRadius: "15px",
    background: "rgba(255,255,255,0.05)",
    border: "1px solid rgba(255,255,255,0.1)",
    cursor: "pointer",
    transition: "all 0.3s",
    textAlign: "center",
    minHeight: "200px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center"
  };

  return (
    <div style={{ padding: "40px", maxWidth: "1200px", margin: "0 auto" }}>
      <h1 style={{ textAlign: "center", marginBottom: "40px" }}>Paper to Podcast</h1>
      
      <div style={{ marginBottom: "60px" }}>
        <h3 style={{ marginBottom: "20px" }}>Upload PDF</h3>
        <PdfUpload onUploadSuccess={handleUploadSuccess} />
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "30px" }}>
        <div 
          style={cardStyle} 
          onClick={() => handleCardClick("podcast")}
          onMouseEnter={(e) => e.currentTarget.style.background = "linear-gradient(135deg, #667eea 0%, #764ba2 100%)"}
          onMouseLeave={(e) => e.currentTarget.style.background = "rgba(255,255,255,0.05)"}
        >
          <div style={{ fontSize: "64px", marginBottom: "15px" }}>🎙️</div>
          <h2>Play Podcast</h2>
          <p style={{ fontSize: "14px", opacity: 0.8, marginTop: "10px" }}>Generate & listen to podcast</p>
        </div>
        
        <div 
          style={cardStyle} 
          onClick={() => handleCardClick("highlights")}
          onMouseEnter={(e) => e.currentTarget.style.background = "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)"}
          onMouseLeave={(e) => e.currentTarget.style.background = "rgba(255,255,255,0.05)"}
        >
          <div style={{ fontSize: "64px", marginBottom: "15px" }}>📝</div>
          <h2>Key Highlights</h2>
          <p style={{ fontSize: "14px", opacity: 0.8, marginTop: "10px" }}>Summary & insights</p>
        </div>
        
        <div 
          style={cardStyle} 
          onClick={() => handleCardClick("qa")}
          onMouseEnter={(e) => e.currentTarget.style.background = "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)"}
          onMouseLeave={(e) => e.currentTarget.style.background = "rgba(255,255,255,0.05)"}
        >
          <div style={{ fontSize: "64px", marginBottom: "15px" }}>❓</div>
          <h2>Q&A Mode</h2>
          <p style={{ fontSize: "14px", opacity: 0.8, marginTop: "10px" }}>Ask questions</p>
        </div>
      </div>
    </div>
  );
};

export default PodcastPanel;
