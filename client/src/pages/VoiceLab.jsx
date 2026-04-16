import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import SecondaryNavbar from "../components/layout/SecondaryNavbar";

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
    <div className="sub-page">
      <SecondaryNavbar />

      <div className="content-container" style={{ padding: "40px 40px 40px", maxWidth: "1200px", margin: "0 auto" }}>

        {loading ? (
          <div className="card" style={{ textAlign: "center", padding: "40px" }}>
            <p>Scanning for generated podcasts...</p>
          </div>
        ) : podcasts.length === 0 ? (
          <div className="card" style={{ textAlign: "center", padding: "80px" }}>
            <div style={{ fontSize: "64px", marginBottom: "20px" }}>🎙️</div>
            <h2 style={{ marginBottom: "15px" }}>No Podcasts Yet</h2>
            <p style={{ color: "var(--text-secondary)", marginBottom: "30px" }}>Upload a paper and generate your first AI podcast to see it here.</p>
            <button
              className="primary-btn"
              onClick={() => navigate("/dashboard")}
              style={{ width: "fit-content" }}
            >
              Get Started
            </button>
          </div>
        ) : (
          <div className="card" style={{ padding: 0, overflow: "hidden" }}>
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr style={{ background: "rgba(255, 255, 255, 0.03)" }}>
                  <th style={{ padding: "20px", textAlign: "left", fontWeight: "600", color: "var(--text-secondary)", fontSize: "14px" }}>PODCAST SESSION</th>
                  <th style={{ padding: "20px", textAlign: "left", fontWeight: "600", color: "var(--text-secondary)", fontSize: "14px" }}>CONFIGURATION</th>
                  <th style={{ padding: "20px", textAlign: "right", fontWeight: "600", color: "var(--text-secondary)", fontSize: "14px" }}>GENERATED ON</th>
                </tr>
              </thead>
              <tbody>
                {podcasts.map((podcast, index) => (
                  <tr key={podcast._id} style={{ borderTop: "1px solid var(--glass-border)", transition: "0.3s" }}>
                    <td style={{ padding: "20px" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: "15px" }}>
                        <div style={{
                          width: "40px",
                          height: "40px",
                          borderRadius: "10px",
                          background: "var(--accent-primary)",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontSize: "20px"
                        }}>
                          🎤
                        </div>
                        <div>
                          <p style={{ fontWeight: "600", margin: 0 }}>Session #{podcasts.length - index}</p>
                          <p style={{ fontSize: "12px", color: "var(--text-secondary)", margin: 0 }}>AI-Generated Audio</p>
                        </div>
                      </div>
                    </td>
                    <td style={{ padding: "20px" }}>
                      <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
                        <span style={{ padding: "4px 10px", borderRadius: "6px", background: "rgba(108, 99, 255, 0.1)", color: "var(--accent-primary)", fontSize: "12px", fontWeight: "500" }}>{podcast.tone}</span>
                        <span style={{ padding: "4px 10px", borderRadius: "6px", background: "rgba(255, 255, 255, 0.05)", color: "var(--text-secondary)", fontSize: "12px" }}>{podcast.complexity}</span>
                        <span style={{ padding: "4px 10px", borderRadius: "6px", background: "rgba(255, 255, 255, 0.05)", color: "var(--text-secondary)", fontSize: "12px" }}>{podcast.duration} min</span>
                      </div>
                    </td>
                    <td style={{ padding: "20px", textAlign: "right", color: "var(--text-secondary)", fontSize: "14px" }}>
                      {new Date(podcast.createdAt).toLocaleDateString(undefined, {
                        month: 'short',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default VoiceLab;

