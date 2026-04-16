import { useState } from "react";
import api from "../../services/api";

const PdfUpload = ({ onUploadSuccess }) => {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleUpload = async () => {
    if (!file) {
      alert("Please select a file first");
      return;
    }
    setLoading(true);
    const formData = new FormData();
    formData.append("pdf", file);
    try {
      const res = await api.post("/pdf/upload", formData);
      onUploadSuccess(res.data.paperId);
      alert("File uploaded successfully! Check My Files section.");
      setFile(null);
    } catch (error) {
      alert("Upload failed");
    }
    setLoading(false);
  };

  return (
    <div className="pdf-upload-container">
      <div className="file-input-wrapper">
        <input 
          type="file" 
          accept=".pdf" 
          onChange={(e) => setFile(e.target.files[0])} 
          className="file-input"
        />
        <div className="custom-file-label">
          {file ? file.name : "Drag & drop or click to select PDF"}
        </div>
      </div>
      <button 
        className="primary-btn upload-btn" 
        onClick={handleUpload} 
        disabled={loading || !file}
      >
        {loading ? (
          <span className="loading-spinner">Uploading...</span>
        ) : (
          <>📤 Upload PDF</>
        )}
      </button>

      <style>{`
        .pdf-upload-container {
          display: flex;
          flex-direction: column;
          gap: 15px;
          align-items: center;
          width: 100%;
        }

        .file-input-wrapper {
          position: relative;
          width: 100%;
          height: 80px;
          border: 2px dashed var(--glass-border);
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: 0.3s;
          cursor: pointer;
          background: rgba(255, 255, 255, 0.02);
        }

        .file-input-wrapper:hover {
          border-color: var(--accent-primary);
          background: rgba(108, 99, 255, 0.05);
        }

        .file-input {
          position: absolute;
          width: 100%;
          height: 100%;
          opacity: 0;
          cursor: pointer;
          z-index: 2;
        }

        .custom-file-label {
          color: var(--text-secondary);
          font-weight: 500;
          text-align: center;
          padding: 0 20px;
          z-index: 1;
          font-size: 14px;
        }

        .upload-btn {
          width: 180px;
          display: flex;
          padding: 12px;
          justify-content: center;
          align-items: center;
          gap: 10px;
          font-size: 14px;
        }

        .upload-btn:disabled {
          opacity: 0.5;
          cursor: not-allowed;
          transform: none;
        }
      `}</style>

    </div>
  );
};

export default PdfUpload;

