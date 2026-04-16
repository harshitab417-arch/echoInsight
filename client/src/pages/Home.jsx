import { useState, useEffect } from "react";
import "./Home.css";
import { Link } from "react-router-dom";
import heroImg from "../assets/pp.png";

const Home = () => {
  const [showScroll, setShowScroll] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowScroll(true);
      } else {
        setShowScroll(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };

  return (
    <div className="home">

      {/* NAVBAR */}
      <nav className="navbar">
        <h2 className="logo">EchoInsight AI</h2>
        <ul className="nav-links">
          <li><a href="#about">About</a></li>
          <li><a href="#features">Features</a></li>
        </ul>
        <div className="nav-buttons">
          <Link to="/login"><button className="btn-secondary">Login</button></Link>
          <Link to="/register"><button className="btn-primary">Get Started</button></Link>
        </div>
      </nav>

      {/* HERO SECTION */}
      <section className="hero">
        <div className="hero-content">
          <h1>
            Turn Research Papers <br />
            Into <span className="gradient-text">Engaging Podcasts</span>
          </h1>
          <p>
            Convert dense academic PDFs into AI-powered podcasts,
            quizzes, highlights and interactive Q&A.
          </p>
          <Link to="/register">
            <button className="cta-btn">Start Converting Free</button>
          </Link>
        </div>
        <div className="hero-image">
          <img src={heroImg} alt="EchoInsight AI Hero" />
        </div>
      </section>

      {/* STATS */}
      <section className="stats">
        <div className="stat-card">500K+ Pages Converted</div>
        <div className="stat-card">50+ AI Voices</div>
        <div className="stat-card">30+ Languages</div>
        <div className="stat-card">99.9% Uptime</div>
      </section>

      {/* ABOUT SECTION */}
      <section id="about" className="about">
        <h2>About EchoInsight AI</h2>
        <p>
          EchoInsight AI transforms complex academic research into
          easy-to-understand AI-generated podcasts. Instead of spending
          hours reading dense papers, you can now listen, learn, and
          interact with content in a smarter way.
        </p>
        <div className="about-features">
          <div className="feature-card">
            <h3>📌 Paper at a Glance</h3>
            <p>Instantly capture the core concepts, key findings, and essential takeaways from any research paper.</p>
          </div>
          <div className="feature-card">
            <h3>🧠 Doubt Resolution</h3>
            <p>Stuck on a concept? EchoInsight helps you understand research papers like never before.</p>
          </div>
          <div className="feature-card">
            <h3>🎧 Your Podcast, Your Way</h3>
            <p>Select the voice tone and set the duration to create a podcast that perfectly fits your style.</p>
          </div>
        </div>
      </section>

      {/* ADVANCED FEATURES SECTION */}
      <section id="features" className="features-showcase">
        <div className="section-header">
          <h2>Powerful Tools for Modern Learning</h2>
          <p>Go beyond simple text-to-speech with our advanced AI suite.</p>
        </div>
        <div className="features-grid">
          <div className="feature-item">
            <div className="feature-icon">🔍</div>
            <h4>Smart Summaries</h4>
            <p>Our AI analyzes the methodology, results, and discussion to provide a deep dive into the paper's significance.</p>
          </div>
          <div className="feature-item">
            <div className="feature-icon">💬</div>
            <h4>Interactive Q&A</h4>
            <p>Ask your paper anything. Our context-aware AI pinpoint specific sections to answer your queries with evidence.</p>
          </div>
          <div className="feature-item">
            <div className="feature-icon">📊</div>
            <h4>Knowledge Checks</h4>
            <p>Automatically generate quizzes based on the content to test your understanding and retention.</p>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="footer">
        <p className="copyright">© 2026 EchoInsight AI. All rights reserved.</p>
      </footer>

      {/* SCROLL TO TOP */}
      <button
        className={`scroll-top ${showScroll ? "visible" : ""}`}
        onClick={scrollToTop}
        aria-label="Scroll to top"
      >
        ↑
      </button>

    </div>
  );
};

export default Home;
