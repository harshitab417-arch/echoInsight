import { useState, useRef, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import api from "../services/api";
import "./PodcastPage.css";

const PodcastPage = () => {
  const navigate = useNavigate();
  const paperId = localStorage.getItem("paperId");
  const utteranceRef = useRef(null);
  const currentIndexRef = useRef(0);
  const isSpeakingRef = useRef(false);
  
  const [tone, setTone] = useState("academic");
  const [complexity, setComplexity] = useState("low");
  const [duration, setDuration] = useState("5");
  const [podcast, setPodcast] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentLine, setCurrentLine] = useState(-1);
  const [playbackRate, setPlaybackRate] = useState(1.0);
  const [selectedVoice, setSelectedVoice] = useState(0);
  const [voices, setVoices] = useState([]);

  useEffect(() => {
    if (!paperId) {
      navigate("/dashboard");
      return;
    }
    const loadVoices = () => setVoices(window.speechSynthesis.getVoices());
    loadVoices();
    window.speechSynthesis.onvoiceschanged = loadVoices;
  }, []);

  const generatePodcast = async () => {
    setLoading(true);
    setPodcast(null);
    try {
      const res = await api.post("/podcast/generate", { paperId, tone, complexity, duration });
      if (res.data && res.data.script) {
        setPodcast(res.data);
      } else {
        alert("Script not found in response");
      }
    } catch (error) {
      alert(`Failed: ${error.response?.data?.message || error.message}`);
    }
    setLoading(false);
  };

  const parseScript = (script) => {
    if (!script) return [];
    const lines = script.split('\n').filter(line => line.trim());
    const parsed = [];
    lines.forEach(line => {
      const trimmed = line.trim();
      if (trimmed.match(/^\*\*Speaker A:\*\*/i)) {
        parsed.push({ speaker: 'A', text: trimmed.replace(/^\*\*Speaker A:\*\*/i, '').trim() });
      } else if (trimmed.match(/^\*\*Speaker B:\*\*/i)) {
        parsed.push({ speaker: 'B', text: trimmed.replace(/^\*\*Speaker B:\*\*/i, '').trim() });
      } else if (parsed.length > 0 && trimmed && !trimmed.startsWith('**Episode')) {
        parsed[parsed.length - 1].text += ' ' + trimmed;
      }
    });
    return parsed;
  };

  const playPodcast = () => {
    if (!podcast?.script) return;
    
    if (isPlaying) {
      isSpeakingRef.current = false;
      window.speechSynthesis.cancel();
      setIsPlaying(false);
      setCurrentLine(-1);
      currentIndexRef.current = 0;
      return;
    }

    const lines = parseScript(podcast.script);
    if (lines.length === 0) {
      alert("No valid script lines found");
      return;
    }

    currentIndexRef.current = 0;
    isSpeakingRef.current = true;
    setIsPlaying(true);

    const speakLine = () => {
      if (!isSpeakingRef.current || currentIndexRef.current >= lines.length) {
        setIsPlaying(false);
        setCurrentLine(-1);
        currentIndexRef.current = 0;
        isSpeakingRef.current = false;
        return;
      }

      setCurrentLine(currentIndexRef.current);
      const utterance = new SpeechSynthesisUtterance(lines[currentIndexRef.current].text);
      utterance.rate = playbackRate;
      
      const availableVoices = window.speechSynthesis.getVoices();
      if (availableVoices.length > 0 && availableVoices[selectedVoice]) {
        utterance.voice = availableVoices[selectedVoice];
      }
      
      utterance.onend = () => {
        if (isSpeakingRef.current) {
          currentIndexRef.current++;
          if (currentIndexRef.current < lines.length) {
            setTimeout(() => speakLine(), 200);
          } else {
            setIsPlaying(false);
            setCurrentLine(-1);
            currentIndexRef.current = 0;
            isSpeakingRef.current = false;
          }
        }
      };
      
      utterance.onerror = (e) => {
        console.error("Speech error:", e);
        setIsPlaying(false);
        setCurrentLine(-1);
        currentIndexRef.current = 0;
        isSpeakingRef.current = false;
      };
      
      window.speechSynthesis.speak(utterance);
    };

    speakLine();
  };

  const scriptLines = podcast ? parseScript(podcast.script) : [];

  return (
    <div style={{ padding: "40px", maxWidth: "1200px", margin: "0 auto" }}>
      <button onClick={() => navigate("/dashboard")} style={{ marginBottom: "20px", padding: "10px 20px", borderRadius: "8px", background: "rgba(255,255,255,0.1)", border: "none", color: "white", cursor: "pointer" }}>
        ← Back to Dashboard
      </button>

      <h1 style={{ textAlign: "center", marginBottom: "40px" }}>🎙️ Podcast Generator</h1>

      {!podcast ? (
        <div style={{ background: "rgba(255,255,255,0.05)", padding: "40px", borderRadius: "15px" }}>
          <h3 style={{ marginBottom: "30px" }}>Podcast Settings</h3>
          
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "20px", marginBottom: "30px" }}>
            <div>
              <label style={{ display: "block", marginBottom: "10px", fontWeight: "bold" }}>Tone</label>
              <select value={tone} onChange={(e) => setTone(e.target.value)} style={{ width: "100%", padding: "12px", borderRadius: "8px", background: "rgba(255,255,255,0.1)", color: "white", border: "1px solid rgba(255,255,255,0.2)", fontSize: "16px" }}>
                <option value="academic">Academic</option>
                <option value="casual">Casual</option>
                <option value="interview">Interview</option>
              </select>
            </div>
            
            <div>
              <label style={{ display: "block", marginBottom: "10px", fontWeight: "bold" }}>Complexity</label>
              <select value={complexity} onChange={(e) => setComplexity(e.target.value)} style={{ width: "100%", padding: "12px", borderRadius: "8px", background: "rgba(255,255,255,0.1)", color: "white", border: "1px solid rgba(255,255,255,0.2)", fontSize: "16px" }}>
                <option value="low">Low Vocabulary</option>
                <option value="high">High Vocabulary</option>
              </select>
            </div>
            
            <div>
              <label style={{ display: "block", marginBottom: "10px", fontWeight: "bold" }}>Duration</label>
              <select value={duration} onChange={(e) => setDuration(e.target.value)} style={{ width: "100%", padding: "12px", borderRadius: "8px", background: "rgba(255,255,255,0.1)", color: "white", border: "1px solid rgba(255,255,255,0.2)", fontSize: "16px" }}>
                <option value="5">5 minutes</option>
                <option value="10">10 minutes</option>
                <option value="15">15 minutes</option>
              </select>
            </div>
          </div>
          
          <button onClick={generatePodcast} disabled={loading} style={{ padding: "15px 40px", fontSize: "18px", borderRadius: "10px", background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)", border: "none", color: "white", cursor: "pointer", fontWeight: "bold" }}>
            {loading ? "Generating..." : "Generate Podcast"}
          </button>
        </div>
      ) : (
        <>
          <div style={{ marginBottom: "30px", padding: "20px", background: "rgba(255,255,255,0.05)", borderRadius: "10px", display: "flex", gap: "15px", alignItems: "center", flexWrap: "wrap" }}>
            <button onClick={playPodcast} style={{ padding: "12px 30px", fontSize: "16px", borderRadius: "8px", background: isPlaying ? "#f5576c" : "#667eea", border: "none", color: "white", cursor: "pointer", fontWeight: "bold" }}>
              {isPlaying ? "⏸ Stop" : "▶ Play"}
            </button>
            
            <select value={selectedVoice} onChange={(e) => setSelectedVoice(Number(e.target.value))} style={{ padding: "10px", borderRadius: "8px", background: "rgba(255,255,255,0.1)", color: "white", border: "1px solid rgba(255,255,255,0.2)" }}>
              {voices.length === 0 ? (
                <option>Loading voices...</option>
              ) : (
                voices.map((voice, i) => (
                  <option key={i} value={i} style={{ background: "#1a1a2e", color: "white" }}>{voice.name}</option>
                ))
              )}
            </select>
            
            <select value={playbackRate} onChange={(e) => setPlaybackRate(Number(e.target.value))} style={{ padding: "10px", borderRadius: "8px", background: "rgba(255,255,255,0.1)", color: "white", border: "1px solid rgba(255,255,255,0.2)" }}>
              <option value="0.5" style={{ background: "#1a1a2e", color: "white" }}>0.5x</option>
              <option value="0.75" style={{ background: "#1a1a2e", color: "white" }}>0.75x</option>
              <option value="1" style={{ background: "#1a1a2e", color: "white" }}>1x</option>
              <option value="1.25" style={{ background: "#1a1a2e", color: "white" }}>1.25x</option>
              <option value="1.5" style={{ background: "#1a1a2e", color: "white" }}>1.5x</option>
              <option value="2" style={{ background: "#1a1a2e", color: "white" }}>2x</option>
            </select>
            
            <select value={duration} disabled style={{ padding: "10px", borderRadius: "8px", background: "rgba(255,255,255,0.1)", color: "white", border: "1px solid rgba(255,255,255,0.2)", opacity: 0.7 }}>
              <option value="5" style={{ background: "#1a1a2e", color: "white" }}>5 min</option>
              <option value="10" style={{ background: "#1a1a2e", color: "white" }}>10 min</option>
              <option value="15" style={{ background: "#1a1a2e", color: "white" }}>15 min</option>
            </select>
          </div>

          <div style={{ maxWidth: "900px", margin: "0 auto" }}>
            {scriptLines.map((line, index) => (
              <div
                key={index}
                style={{
                  display: "flex",
                  justifyContent: line.speaker === 'A' ? 'flex-start' : 'flex-end',
                  marginBottom: "25px",
                  opacity: index === currentLine ? 1 : currentLine >= 0 && index < currentLine ? 0.5 : currentLine >= 0 ? 0.3 : 1,
                  transform: index === currentLine ? 'scale(1.02)' : 'scale(1)',
                  transition: "all 0.3s ease"
                }}
              >
                <div
                  style={{
                    maxWidth: "70%",
                    padding: "20px 25px",
                    borderRadius: "15px",
                    background: line.speaker === 'A' 
                      ? "linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
                      : "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
                    color: "white",
                    boxShadow: index === currentLine ? "0 8px 16px rgba(0,0,0,0.3)" : "0 4px 6px rgba(0,0,0,0.1)",
                    position: "relative"
                  }}
                >
                  <div style={{ fontWeight: "bold", marginBottom: "8px", fontSize: "14px", opacity: 0.9 }}>
                    Speaker {line.speaker}
                  </div>
                  <div style={{ lineHeight: "1.7", fontSize: "16px" }}>{line.text}</div>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default PodcastPage;
