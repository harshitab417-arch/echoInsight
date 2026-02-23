import { useAuth } from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const Sidebar = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("dashboard");

  const handleNavigation = (tab) => {
    setActiveTab(tab);
    if (tab === "myfiles") navigate("/myfiles");
    if (tab === "voicelab") navigate("/voicelab");
    if (tab === "settings") navigate("/settings");
  };

  return (
    <div className="sidebar">
      <h2>EchoInsight</h2>

      <ul>
        <li onClick={() => handleNavigation("myfiles")} style={{ cursor: "pointer", background: activeTab === "myfiles" ? "rgba(255,255,255,0.1)" : "transparent", padding: "10px", borderRadius: "5px" }}>📁 My Files</li>
        <li onClick={() => handleNavigation("voicelab")} style={{ cursor: "pointer", background: activeTab === "voicelab" ? "rgba(255,255,255,0.1)" : "transparent", padding: "10px", borderRadius: "5px" }}>🎤 Voice Lab</li>
        <li onClick={() => handleNavigation("settings")} style={{ cursor: "pointer", background: activeTab === "settings" ? "rgba(255,255,255,0.1)" : "transparent", padding: "10px", borderRadius: "5px" }}>⚙️ Settings</li>
      </ul>

      <button onClick={logout} style={{ marginTop: "auto", padding: "10px 20px", borderRadius: "8px", background: "#f5576c", border: "none", color: "white", cursor: "pointer", fontWeight: "bold" }}>🚪 Logout</button>
    </div>
  );
};

export default Sidebar;