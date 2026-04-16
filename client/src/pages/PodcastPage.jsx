import { useState, useRef, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import api from "../services/api";
import "./PodcastPage.css";
import ReactMarkdown from "react-markdown";

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
  const [isPaused, setIsPaused] = useState(false);
  const [currentLine, setCurrentLine] = useState(-1);
  const [playbackRate, setPlaybackRate] = useState(1.0);
  const [voiceA, setVoiceA] = useState(0);
  const [voiceB, setVoiceB] = useState(1);
  const [voices, setVoices] = useState([]);

  useEffect(() => {
    if (!paperId) {
      navigate("/dashboard", { state: { message: "Please upload a PDF first!" } });
      return;
    }
    const loadVoices = () => {

      const availableVoices = window.speechSynthesis.getVoices();
      setVoices(availableVoices);
      // Set different defaults if available
      if (availableVoices.length > 1) {
        setVoiceA(0);
        setVoiceB(1);
      } else if (availableVoices.length === 1) {
        setVoiceA(0);
        setVoiceB(0);
      }
    };
    loadVoices();
    window.speechSynthesis.onvoiceschanged = loadVoices;
    
    // Cleanup on unmount
    return () => window.speechSynthesis.cancel();
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

  const speakLine = (lines) => {
    if (!isSpeakingRef.current || currentIndexRef.current >= lines.length) {
      if (currentIndexRef.current >= lines.length) {
        setIsPlaying(false);
        setIsPaused(false);
        setCurrentLine(-1);
        currentIndexRef.current = 0;
        isSpeakingRef.current = false;
      }
      return;
    }

    const currentLineData = lines[currentIndexRef.current];
    setCurrentLine(currentIndexRef.current);
    
    const utterance = new SpeechSynthesisUtterance(currentLineData.text);
    utterance.rate = playbackRate;
    
    const availableVoices = window.speechSynthesis.getVoices();
    const voiceIndex = currentLineData.speaker === 'A' ? voiceA : voiceB;
    
    if (availableVoices.length > 0 && availableVoices[voiceIndex]) {
      utterance.voice = availableVoices[voiceIndex];
    }

    
    utterance.onend = () => {
      if (isSpeakingRef.current) {
        currentIndexRef.current++;
        if (currentIndexRef.current < lines.length) {
          setTimeout(() => speakLine(lines), 200);
        } else {
          setIsPlaying(false);
          setIsPaused(false);
          setCurrentLine(-1);
          currentIndexRef.current = 0;
          isSpeakingRef.current = false;
        }
      }
    };
    
    utterance.onerror = (e) => {
      // Only handle as a terminal error if we were supposed to be speaking
      if (isSpeakingRef.current) {
        console.error("Speech error:", e);
        setIsPlaying(false);
        setIsPaused(false);
        setCurrentLine(-1);
        currentIndexRef.current = 0;
        isSpeakingRef.current = false;
      }
    };

    
    window.speechSynthesis.speak(utterance);
  };

  const handleStop = () => {
    isSpeakingRef.current = false;
    window.speechSynthesis.cancel();
    setIsPlaying(false);
    setIsPaused(false);
    setCurrentLine(-1);
    currentIndexRef.current = 0;
  };

  const handlePlayback = () => {
    if (!podcast?.script) return;
    const lines = parseScript(podcast.script);
    
    if (isPlaying) {
      // PAUSE
      isSpeakingRef.current = false;
      window.speechSynthesis.cancel();
      setIsPlaying(false);
      setIsPaused(true);
    } else {
      // PLAY OR RESUME
      if (!isPaused) {
        currentIndexRef.current = 0;
      }
      isSpeakingRef.current = true;
      setIsPlaying(true);
      setIsPaused(false);
      speakLine(lines);
    }
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
            <button 
              onClick={handlePlayback} 
              style={{ 
                padding: "12px 30px", 
                fontSize: "16px", 
                borderRadius: "8px", 
                background: isPlaying ? "#f5576c" : isPaused ? "#2ed573" : "#667eea", 
                border: "none", 
                color: "white", 
                cursor: "pointer", 
                fontWeight: "bold",
                transition: "0.3s",
                display: "flex",
                alignItems: "center",
                gap: "8px"
              }}
            >
              {isPlaying ? (
                <><span style={{ fontSize: "18px" }}>⏸</span> Pause</>
              ) : isPaused ? (
                <><span style={{ fontSize: "18px" }}>▶</span> Resume</>
              ) : (
                <><span style={{ fontSize: "18px" }}>▶</span> Play Podcast</>
              )}
            </button>

            {(isPlaying || isPaused) && (
              <button 
                onClick={handleStop}
                style={{
                  padding: "12px 20px",
                  borderRadius: "8px",
                  background: "rgba(255, 255, 255, 0.1)",
                  border: "1px solid rgba(255, 255, 255, 0.2)",
                  color: "white",
                  cursor: "pointer",
                  fontWeight: "bold"
                }}
              >
                ■ Stop
              </button>
            )}


            
            <div style={{ display: "flex", gap: "10px", alignItems: "center", background: "rgba(255,255,255,0.05)", padding: "5px 12px", borderRadius: "8px" }}>
              <div style={{ background: "rgba(102, 126, 234, 0.2)", padding: "4px 8px", borderRadius: "6px", fontSize: "11px", border: "1px solid rgba(102, 126, 234, 0.3)", color: "#a5b4fc", fontWeight: "bold" }}>👤 A</div>
              <select value={voiceA} onChange={(e) => setVoiceA(Number(e.target.value))} style={{ padding: "6px", borderRadius: "6px", background: "transparent", color: "white", border: "none", maxWidth: "150px", fontSize: "14px", cursor: "pointer" }}>
                {voices.length === 0 ? <option>Loading...</option> : voices.map((v, i) => <option key={i} value={i} style={{ background: "#1a1a2e", color: "white" }}>{v.name}</option>)}
              </select>
            </div>

            <div style={{ display: "flex", gap: "10px", alignItems: "center", background: "rgba(255,255,255,0.05)", padding: "5px 12px", borderRadius: "8px" }}>
              <div style={{ background: "rgba(240, 147, 251, 0.2)", padding: "4px 8px", borderRadius: "6px", fontSize: "11px", border: "1px solid rgba(240, 147, 251, 0.3)", color: "#fbcfe8", fontWeight: "bold" }}>👤 B</div>
              <select value={voiceB} onChange={(e) => setVoiceB(Number(e.target.value))} style={{ padding: "6px", borderRadius: "6px", background: "transparent", color: "white", border: "none", maxWidth: "150px", fontSize: "14px", cursor: "pointer" }}>
                {voices.length === 0 ? <option>Loading...</option> : voices.map((v, i) => <option key={i} value={i} style={{ background: "#1a1a2e", color: "white" }}>{v.name}</option>)}
              </select>
            </div>
            
            <div style={{ display: "flex", alignItems: "center", gap: "5px", background: "rgba(255,255,255,0.05)", padding: "8px 12px", borderRadius: "8px" }}>
              <span style={{ fontSize: "16px" }}>⚡</span>
              <select value={playbackRate} onChange={(e) => setPlaybackRate(Number(e.target.value))} style={{ padding: "4px", background: "transparent", color: "white", border: "none", cursor: "pointer", fontSize: "14px", fontWeight: "500" }}>
                <option value="0.5" style={{ background: "#1a1a2e" }}>0.5x</option>
                <option value="0.75" style={{ background: "#1a1a2e" }}>0.75x</option>
                <option value="1" style={{ background: "#1a1a2e" }}>1x</option>
                <option value="1.25" style={{ background: "#1a1a2e" }}>1.25x</option>
                <option value="1.5" style={{ background: "#1a1a2e" }}>1.5x</option>
                <option value="2" style={{ background: "#1a1a2e" }}>2x</option>
              </select>
            </div>

            
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
                  <div style={{ lineHeight: "1.7", fontSize: "16px" }}>
                    <ReactMarkdown
                      components={{
                        p: ({node, ...props}) => <p style={{ margin: 0 }} {...props} />,
                        strong: ({node, ...props}) => <strong style={{ color: "#ffffff", fontWeight: "bold" }} {...props} />,
                      }}
                    >
                      {line.text}
                    </ReactMarkdown>
                  </div>

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
