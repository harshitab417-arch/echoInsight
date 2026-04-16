import { useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import SecondaryNavbar from "../components/layout/SecondaryNavbar";

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // Clear previous errors
    
    // Local validation
    if (!form.email || !form.password) {
      setError("Please enter both email and password");
      return;
    }

    try {
      await login(form);
      navigate("/dashboard");
    } catch (err) {
      setError(err.response?.data?.message || "Login failed. Please check your connection.");
    }
  };



  return (
    <div className="auth-page-wrapper">
      <SecondaryNavbar showLogout={false} />
      <div className="center-page">
        <div className="card auth-card">
          <h2>Welcome Back</h2>
          <form onSubmit={handleSubmit}>
            <input
              type="email"
              placeholder="Email"
              onChange={(e) => setForm({ ...form, email: e.target.value })}
            />
            <input
              type="password"
              placeholder="Password"
              onChange={(e) => setForm({ ...form, password: e.target.value })}
            />
            {error && (
              <div style={{ color: "#ff4d4d", marginBottom: "15px", fontSize: "14px", textAlign: "center", background: "rgba(255, 77, 77, 0.1)", padding: "10px", borderRadius: "8px", border: "1px solid rgba(255, 77, 77, 0.2)" }}>
                {error}
              </div>
            )}
            <button className="primary-btn">Login</button>

          </form>
        </div>
      </div>
    </div>
  );
};


export default Login;