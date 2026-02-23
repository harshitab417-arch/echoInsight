import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import api from "../services/api";

const HighlightsPage = () => {
  const navigate = useNavigate();
  const paperId = localStorage.getItem("paperId");
  
  const [highlights, setHighlights] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!paperId) {
      navigate("/dashboard");
      return;
    }
    generateHighlights();
  }, []);

  const generateHighlights = async () => {
    setLoading(true);
    try {
      const res = await api.post("/highlights/generate", { paperId });
      setHighlights(res.data.content);
    } catch (error) {
      alert("Failed to generate highlights");
    }
    setLoading(false);
  };

  return (
    <div style={{ padding: "40px", maxWidth: "1000px", margin: "0 auto" }}>
      <button onClick={() => navigate("/dashboard")} style={{ marginBottom: "20px", padding: "10px 20px", borderRadius: "8px", background: "rgba(255,255,255,0.1)", border: "none", color: "white", cursor: "pointer" }}>
        ← Back to Dashboard
      </button>

      <h1 style={{ textAlign: "center", marginBottom: "40px" }}>📝 Key Highlights</h1>

      <div style={{ background: "rgba(255,255,255,0.05)", padding: "40px", borderRadius: "15px" }}>
        {loading ? (
          <div style={{ textAlign: "center", fontSize: "18px" }}>
            <div style={{ fontSize: "48px", marginBottom: "20px" }}>⏳</div>
            <p>Generating highlights...</p>
          </div>
        ) : highlights ? (
          <div style={{ lineHeight: "2.2", fontSize: "17px" }}>
            <pre style={{ whiteSpace: "pre-wrap", fontFamily: "inherit", margin: 0 }}>{highlights}</pre>
          </div>
        ) : (
          <p style={{ textAlign: "center" }}>No highlights available</p>
        )}
      </div>
    </div>
  );
};

export default HighlightsPage;
