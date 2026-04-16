import { useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import SecondaryNavbar from "../components/layout/SecondaryNavbar";

const Register = () => {
  const { register } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    // Local validation
    if (!form.name || !form.email || !form.password) {
      setError("Please fill in all fields");
      return;
    }

    if (form.password.length < 6) {
      setError("Password must be at least 6 characters long");
      return;
    }

    try {
      await register(form);
      navigate("/dashboard");
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed. Please check your connection.");
    }
  };



  return (
    <div className="auth-page-wrapper">
      <SecondaryNavbar showLogout={false} />
      <div className="center-page">
        <div className="card auth-card">
          <h2>Create Account</h2>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Name"
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />
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
            <button className="primary-btn">Register</button>

          </form>
        </div>
      </div>
    </div>
  );
};


export default Register;