import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import "./SecondaryNavbar.css";

const SecondaryNavbar = ({ title, showLogout = true }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const auth = useAuth();
  const logout = auth?.logout;

  const isSubPage = location.pathname !== "/dashboard";

  return (
    <nav className="secondary-navbar">
      <div className="nav-left" onClick={() => navigate("/dashboard")}>
        <span className="nav-logo">EchoInsight</span>
      </div>
      
      {title && <div className="nav-center">{title}</div>}

      <div className="nav-right">
        {isSubPage && (
          <button className="back-btn" onClick={() => navigate(-1)}>
            <span className="btn-icon">⬅️</span>
            <span>Back</span>
          </button>
        )}
        
        {showLogout && logout && (
          <button className="navbar-logout-btn" onClick={() => { logout(); navigate("/"); }}>
            <span className="btn-icon">🚪</span>
            <span>Logout</span>
          </button>
        )}

      </div>
    </nav>
  );
};


export default SecondaryNavbar;

