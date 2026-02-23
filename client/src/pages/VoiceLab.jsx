import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

const VoiceLab = () => {
  const [podcasts, setPodcasts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchPodcasts();
    const interval = setInterval(fetchPodcasts, 3000);
    return () => clearInterval(interval);
  }, []);

  const fetchPodcasts = async () => {
    try {
      const res = await api.get("/podcast/list");
      setPodcasts(res.data);
    } catch (error) {
      console.error("Failed to fetch podcasts:", error);
    }
    setLoading(false);
  };

  return (
    <div style={{ padding: "40px", maxWidth: "1200px", margin: "0 auto" }}>
      <h1 style={{ marginBottom: "30px" }}>🎤 Voice Lab</h1>
      
      {loading ? (
        <p>Loading podcasts...</p>
      ) : podcasts.length === 0 ? (
        <div style={{ textAlign: "center", padding: "60px", background: "rgba(255,255,255,0.05)", borderRadius: "15px" }}>
          <div style={{ fontSize: "64px", marginBottom: "20px" }}>🎵</div>
          <p style={{ fontSize: "18px", opacity: 0.7 }}>No files found</p>
          <button onClick={() => navigate("/dashboard")} style={{ marginTop: "20px", padding: "12px 24px", borderRadius: "8px", background: "#667eea", border: "none", color: "white", cursor: "pointer", fontWeight: "bold" }}>
            Upload File
          </button>
        </div>
      ) : (
        <div style={{ background: "rgba(255,255,255,0.05)", borderRadius: "12px", overflow: "hidden" }}>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ background: "rgba(255,255,255,0.1)" }}>
                <th style={{ padding: "15px", textAlign: "left", fontWeight: "bold" }}>Podcast</th>
                <th style={{ padding: "15px", textAlign: "left", fontWeight: "bold" }}>Settings</th>
                <th style={{ padding: "15px", textAlign: "left", fontWeight: "bold" }}>Generated Date</th>
              </tr>
            </thead>
            <tbody>
              {podcasts.map((podcast, index) => (
                <tr key={podcast._id} style={{ borderTop: index > 0 ? "1px solid rgba(255,255,255,0.1)" : "none" }}>
                  <td style={{ padding: "15px" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                      <span style={{ fontSize: "24px" }}>🎵</span>
                      <span>Podcast #{index + 1}</span>
                    </div>
                  </td>
                  <td style={{ padding: "15px", opacity: 0.7 }}>
                    Tone: {podcast.tone} | Complexity: {podcast.complexity} | Duration: {podcast.duration} min
                  </td>
                  <td style={{ padding: "15px", opacity: 0.7 }}>
                    {new Date(podcast.createdAt).toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default VoiceLab;
