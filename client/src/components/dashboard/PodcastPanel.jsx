import { useState } from "react";
import { useNavigate } from "react-router-dom";
import PdfUpload from "../upload/PdfUpload";
import "../../pages/Dashboard.css";

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

  return (
    <div className="panel-container">
      <div className="upload-section">
        <h3>Upload Your Paper</h3>
        <PdfUpload onUploadSuccess={handleUploadSuccess} />
      </div>

      <div className="grid-container">
        <div
          className="action-card podcast"
          onClick={() => handleCardClick("podcast")}
        >
          <div className="card-icon">🎙️</div>
          <h2>Play Podcast</h2>
          <p>Generate and listen to your AI-powered research podcast with multiple voices.</p>
        </div>

        <div
          className="action-card highlights"
          onClick={() => handleCardClick("highlights")}
        >
          <div className="card-icon">📝</div>
          <h2>Key Highlights</h2>
          <p>Get a concise summary and the most important insights from your paper.</p>
        </div>

        <div
          className="action-card qa"
          onClick={() => handleCardClick("qa")}
        >
          <div className="card-icon">❓</div>
          <h2>Q&A Mode</h2>
          <p>Interact with your paper. Ask specific questions and get AI-powered answers.</p>
        </div>
      </div>
    </div>
  );
};

export default PodcastPanel;

