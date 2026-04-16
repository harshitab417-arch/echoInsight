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

  const handleSubmit = async (e) => {
    e.preventDefault();
    await login(form);
    navigate("/dashboard");
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
            <button className="primary-btn">Login</button>
          </form>
        </div>
      </div>
    </div>
  );
};


export default Login;