import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

const MyFiles = () => {
  const [papers, setPapers] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchPapers();
    const interval = setInterval(fetchPapers, 3000);
    return () => clearInterval(interval);
  }, []);

  const fetchPapers = async () => {
    try {
      console.log("Calling API: /pdf/papers");
      const res = await api.get("/pdf/papers");
      console.log("Response:", res.data);
      setPapers(res.data);
    } catch (error) {
      console.error("Failed to fetch papers:", error);
      console.error("Error details:", error.response?.status, error.response?.data);
    }
    setLoading(false);
  };

  const handleFileClick = (paperId) => {
    localStorage.setItem("paperId", paperId);
    navigate("/dashboard");
  };

  return (
    <div style={{ padding: "40px", maxWidth: "1200px", margin: "0 auto" }}>
      <h1 style={{ marginBottom: "30px" }}>📁 My Files</h1>
      
      {loading ? (
        <p>Loading files...</p>
      ) : papers.length === 0 ? (
        <div style={{ textAlign: "center", padding: "60px", background: "rgba(255,255,255,0.05)", borderRadius: "15px" }}>
          <div style={{ fontSize: "64px", marginBottom: "20px" }}>📄</div>
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
                <th style={{ padding: "15px", textAlign: "left", fontWeight: "bold" }}>File Name</th>
                <th style={{ padding: "15px", textAlign: "left", fontWeight: "bold" }}>Upload Date</th>
                <th style={{ padding: "15px", textAlign: "center", fontWeight: "bold" }}>Action</th>
              </tr>
            </thead>
            <tbody>
              {papers.map((paper, index) => (
                <tr key={paper._id} style={{ borderTop: index > 0 ? "1px solid rgba(255,255,255,0.1)" : "none" }}>
                  <td style={{ padding: "15px" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                      <span style={{ fontSize: "24px" }}>📄</span>
                      <span>{paper.originalFileName || paper.title || "Untitled"}</span>
                    </div>
                  </td>
                  <td style={{ padding: "15px", opacity: 0.7 }}>
                    {new Date(paper.createdAt || paper.uploadedAt).toLocaleDateString()}
                  </td>
                  <td style={{ padding: "15px", textAlign: "center" }}>
                    <button
                      onClick={() => handleFileClick(paper._id)}
                      style={{
                        padding: "8px 16px",
                        borderRadius: "6px",
                        background: "#667eea",
                        border: "none",
                        color: "white",
                        cursor: "pointer",
                        fontWeight: "bold",
                        fontSize: "14px"
                      }}
                    >
                      Use File
                    </button>
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

export default MyFiles;
