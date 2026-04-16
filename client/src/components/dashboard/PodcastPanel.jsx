import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import PdfUpload from "../upload/PdfUpload";
import "../../pages/Dashboard.css";

const PodcastPanel = () => {
  const [paperId, setPaperId] = useState(localStorage.getItem("paperId") || null);
  const [toast, setToast] = useState({ show: false, message: "" });
  const navigate = useNavigate();
  const location = useLocation();

  // Keep paperId synced and check for redirect messages
  useEffect(() => {
    // Check for messages from redirects
    if (location.state?.message) {
      showToast(location.state.message);
      // Clear location state to prevent showing toast again on refresh
      window.history.replaceState({}, document.title);
    }

    const handleStorageChange = () => {
      setPaperId(localStorage.getItem("paperId"));
    };
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, [location]);


  const handleUploadSuccess = (id) => {
    setPaperId(id);
    localStorage.setItem("paperId", id);
    showToast("PDF uploaded successfully! You can now use the analysis features.");
  };

  const showToast = (message) => {
    setToast({ show: true, message });
    setTimeout(() => setToast({ show: false, message: "" }), 3000);
  };

  const handleCardClick = (mode) => {
    if (!paperId) {
      showToast("Please upload a PDF first!");
      return;
    }
    navigate(`/${mode}`);
  };

  return (
    <div className="panel-container">
      {/* Toast Notification */}
      {toast.show && (
        <div style={{
          position: "fixed",
          top: "20px",
          right: "20px",
          padding: "15px 25px",
          background: "rgba(255, 255, 255, 0.1)",
          backdropFilter: "blur(15px)",
          border: "1px solid rgba(255, 255, 255, 0.2)",
          borderRadius: "12px",
          color: "white",
          boxShadow: "0 8px 32px rgba(0,0,0,0.3)",
          zIndex: 1000,
          animation: "slideIn 0.3s ease-out",
          display: "flex",
          alignItems: "center",
          gap: "10px"
        }}>
          <span style={{ fontSize: "20px" }}>ℹ️</span>
          <span style={{ fontWeight: "500" }}>{toast.message}</span>
        </div>
      )}

      <style>
        {`
          @keyframes slideIn {
            from { transform: translateX(100%); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
          }
        `}
      </style>

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


