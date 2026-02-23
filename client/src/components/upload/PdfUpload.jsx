import { useState } from "react";
import api from "../../services/api";

const PdfUpload = ({ onUploadSuccess }) => {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleUpload = async () => {
    if (!file) return;
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
    <div className="pdf-upload">
      <input type="file" accept=".pdf" onChange={(e) => setFile(e.target.files[0])} />
      <button onClick={handleUpload} disabled={loading}>
        {loading ? "Uploading..." : "Upload PDF"}
      </button>
    </div>
  );
};

export default PdfUpload;
