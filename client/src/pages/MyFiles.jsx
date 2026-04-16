import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import SecondaryNavbar from "../components/layout/SecondaryNavbar";

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
      const res = await api.get("/pdf/papers");
      setPapers(res.data);
    } catch (error) {
      console.error("Failed to fetch papers:", error);
    }
    setLoading(false);
  };

  const handleFileClick = (paperId) => {
    localStorage.setItem("paperId", paperId);
    navigate("/dashboard");
  };

  const getFileUrl = (path) => {
    if (!path) return "";
    return `http://localhost:5000/${path.replace(/\\/g, "/")}`;
  };

  const handleView = (path) => {
    const url = getFileUrl(path);
    window.open(url, "_blank");
  };

  const handleDownload = async (path, filename) => {
    const url = getFileUrl(path);
    try {
      const response = await fetch(url);
      const blob = await response.blob();
      const blobUrl = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = blobUrl;
      link.download = filename || "document.pdf";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(blobUrl);
    } catch (error) {
      console.error("Download failed:", error);
      alert("Failed to download file.");
    }
  };

  return (
    <div className="sub-page">
      <SecondaryNavbar />

      <div className="content-container" style={{ padding: "40px 40px 40px", maxWidth: "1200px", margin: "0 auto" }}>

        {loading ? (
          <div className="card" style={{ textAlign: "center", padding: "40px" }}>
            <p>Loading your research files...</p>
          </div>
        ) : papers.length === 0 ? (
          <div className="card" style={{ textAlign: "center", padding: "80px" }}>
            <div style={{ fontSize: "64px", marginBottom: "20px" }}>📄</div>
            <h2 style={{ marginBottom: "15px" }}>No Files Found</h2>
            <p style={{ color: "var(--text-secondary)", marginBottom: "30px" }}>You haven't uploaded any research papers yet.</p>
            <button
              className="primary-btn"
              onClick={() => navigate("/dashboard")}
              style={{ width: "fit-content" }}
            >
              Upload First File
            </button>
          </div>
        ) : (
          <div className="card" style={{ padding: 0, overflow: "hidden" }}>
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr style={{ background: "rgba(255, 255, 255, 0.03)" }}>
                  <th style={{ padding: "20px", textAlign: "left", fontWeight: "600", color: "var(--text-secondary)", fontSize: "14px" }}>FILE NAME</th>
                  <th style={{ padding: "20px", textAlign: "left", fontWeight: "600", color: "var(--text-secondary)", fontSize: "14px" }}>UPLOAD DATE</th>
                  <th style={{ padding: "20px", textAlign: "right", fontWeight: "600", color: "var(--text-secondary)", fontSize: "14px" }}>ACTIONS</th>
                </tr>
              </thead>
              <tbody>
                {papers.map((paper, index) => (
                  <tr key={paper._id} style={{ borderTop: "1px solid var(--glass-border)", transition: "0.3s" }}>
                    <td style={{ padding: "20px" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: "15px" }}>
                        <span style={{ fontSize: "24px" }}>📄</span>
                        <div style={{ display: "flex", flexDirection: "column" }}>
                          <span style={{ fontWeight: "500" }}>{paper.originalFileName || paper.title || "Untitled Paper"}</span>
                        </div>
                      </div>
                    </td>
                    <td style={{ padding: "20px", color: "var(--text-secondary)" }}>
                      {new Date(paper.createdAt || paper.uploadedAt).toLocaleDateString(undefined, {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric'
                      })}
                    </td>
                    <td style={{ padding: "20px", textAlign: "right" }}>
                      <div style={{ display: "flex", gap: "10px", justifyContent: "flex-end" }}>
                        <button
                          className="file-action-btn"
                          onClick={() => handleView(paper.filePath)}
                        >
                          View
                        </button>
                        <button
                          className="file-action-btn"
                          onClick={() => handleDownload(paper.filePath, paper.originalFileName)}
                        >
                          Download
                        </button>
                      </div>
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


export default MyFiles;

