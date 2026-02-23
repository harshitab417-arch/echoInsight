import { useState } from "react";
import { useAuth } from "../hooks/useAuth";

const Settings = () => {
  const { user } = useAuth();
  const [name, setName] = useState(user?.name || "");
  const [email, setEmail] = useState(user?.email || "");

  const handleSave = () => {
    alert("Settings saved!");
  };

  return (
    <div style={{ padding: "40px", maxWidth: "800px", margin: "0 auto" }}>
      <h1 style={{ marginBottom: "30px" }}>⚙️ Settings</h1>
      
      <div style={{ background: "rgba(255,255,255,0.05)", padding: "30px", borderRadius: "15px" }}>
        <h3 style={{ marginBottom: "20px" }}>Account Information</h3>
        
        <div style={{ marginBottom: "20px" }}>
          <label style={{ display: "block", marginBottom: "8px", fontWeight: "bold" }}>Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            style={{
              width: "100%",
              padding: "12px",
              borderRadius: "8px",
              background: "rgba(255,255,255,0.1)",
              color: "white",
              border: "1px solid rgba(255,255,255,0.2)",
              fontSize: "16px"
            }}
          />
        </div>
        
        <div style={{ marginBottom: "20px" }}>
          <label style={{ display: "block", marginBottom: "8px", fontWeight: "bold" }}>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{
              width: "100%",
              padding: "12px",
              borderRadius: "8px",
              background: "rgba(255,255,255,0.1)",
              color: "white",
              border: "1px solid rgba(255,255,255,0.2)",
              fontSize: "16px"
            }}
          />
        </div>
        
        <button
          onClick={handleSave}
          style={{
            padding: "12px 30px",
            borderRadius: "8px",
            background: "#667eea",
            border: "none",
            color: "white",
            cursor: "pointer",
            fontWeight: "bold",
            fontSize: "16px"
          }}
        >
          Save Changes
        </button>
      </div>
      
      <div style={{ background: "rgba(255,255,255,0.05)", padding: "30px", borderRadius: "15px", marginTop: "20px" }}>
        <h3 style={{ marginBottom: "15px", color: "#f5576c" }}>Danger Zone</h3>
        <p style={{ fontSize: "14px", opacity: 0.7, marginBottom: "15px" }}>
          Once you delete your account, there is no going back.
        </p>
        <button
          style={{
            padding: "10px 20px",
            borderRadius: "8px",
            background: "#f5576c",
            border: "none",
            color: "white",
            cursor: "pointer",
            fontWeight: "bold"
          }}
        >
          Delete Account
        </button>
      </div>
    </div>
  );
};

export default Settings;
