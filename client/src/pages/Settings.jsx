import { useState } from "react";
import { useAuth } from "../hooks/useAuth";
import SecondaryNavbar from "../components/layout/SecondaryNavbar";

const Settings = () => {
  const { user } = useAuth();
  const [name, setName] = useState(user?.name || "");
  const [email, setEmail] = useState(user?.email || "");

  const handleSave = () => {
    alert("Settings saved!");
  };

  return (
    <div className="sub-page">
      <SecondaryNavbar />

      <div className="content-container" style={{ padding: "0 40px 40px", maxWidth: "800px", margin: "0 auto" }}>

        <div className="card" style={{ marginTop: "20px" }}>
          <h3 style={{ marginBottom: "25px", fontSize: "20px" }}>Account Information</h3>

          <div className="input-group" style={{ marginBottom: "25px" }}>
            <label style={{ display: "block", marginBottom: "10px", fontWeight: "600", color: "var(--text-secondary)", fontSize: "14px" }}>NAME</label>
            <div style={{ position: "relative" }}>
              <span style={{ position: "absolute", left: "15px", top: "50%", transform: "translateY(-50%)", fontSize: "18px", opacity: 0.6 }}>👤</span>
              <input
                type="text"
                className="auth-card input"
                value={name}
                onChange={(e) => setName(e.target.value)}
                style={{
                  width: "100%",
                  padding: "10px 40px",
                  background: "rgba(255, 255, 255, 0.02)",
                  border: "1px solid rgba(255, 255, 255, 0.08)",
                  borderRadius: "12px",
                  color: "white"
                }}
                placeholder="Enter your name"
              />
            </div>
          </div>

          <div className="input-group" style={{ marginBottom: "30px" }}>
            <label style={{ display: "block", marginBottom: "10px", fontWeight: "600", color: "var(--text-secondary)", fontSize: "14px" }}>EMAIL ADDRESS</label>
            <div style={{ position: "relative" }}>
              <span style={{ position: "absolute", left: "15px", top: "50%", transform: "translateY(-50%)", fontSize: "18px", opacity: 0.6 }}>✉️</span>
              <input
                type="email"
                className="auth-card input"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={{
                  width: "100%",
                  padding: "10px 40px",
                  background: "rgba(255, 255, 255, 0.02)",
                  border: "1px solid rgba(255, 255, 255, 0.08)",
                  borderRadius: "12px",
                  color: "white"
                }}
                placeholder="Enter your email"
              />
            </div>
          </div>

          <button
            className="primary-btn"
            onClick={handleSave}
            style={{
              width: "100%",
              padding: "16px",
              fontSize: "16px",
              boxShadow: "0 10px 20px rgba(108, 99, 255, 0.2)",
              borderRadius: "12px"
            }}
          >
            Update Profile
          </button>
        </div>


        <div className="card" style={{ marginTop: "30px", borderColor: "rgba(245, 87, 108, 0.2)", borderRadius: "20px" }}>
          <h3 style={{ marginBottom: "15px", color: "#f5576c", fontSize: "18px" }}>Danger Zone</h3>
          <p style={{ fontSize: "14px", color: "var(--text-secondary)", marginBottom: "20px", lineHeight: "1.6" }}>
            Once you delete your account, all your processed papers, podcasts, and personal data will be permanently removed. This action cannot be undone.
          </p>
          <button
            className="logout-btn"
            style={{ width: "fit-content", padding: "12px 24px", borderRadius: "12px" }}
          >
            Delete Account Permanently
          </button>
        </div>

      </div>
    </div>
  );
};

export default Settings;

