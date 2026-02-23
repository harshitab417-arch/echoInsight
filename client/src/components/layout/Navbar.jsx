import React from "react";
import "./Navbar.css";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="navbar">

      <h2 className="logo">
        EchoInsight AI
      </h2>

      <div className="nav-links">

        <Link to="/">Features</Link>
        <Link to="/">Pricing</Link>

        <Link to="/login">
          Login
        </Link>

        <Link to="/register">
          <button className="get-started">
            Get Started
          </button>
        </Link>

      </div>

    </nav>
  );
};

export default Navbar;