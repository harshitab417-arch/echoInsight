import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import api from "../services/api";

const QAPage = () => {
  const navigate = useNavigate();
  const paperId = localStorage.getItem("paperId");
  
  const [question, setQuestion] = useState("");
  const [conversations, setConversations] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!paperId) navigate("/dashboard");
  }, []);

  const askQuestion = async () => {
    if (!question.trim()) return;
    
    const newQuestion = question;
    setQuestion("");
    setConversations([...conversations, { type: "question", text: newQuestion }]);
    setLoading(true);
    
    try {
      const res = await api.post("/qa/ask", { paperId, question: newQuestion });
      setConversations(prev => [...prev, { type: "answer", text: res.data.answer }]);
    } catch (error) {
      setConversations(prev => [...prev, { type: "answer", text: "Failed to get answer. Please try again." }]);
    }
    setLoading(false);
  };

  return (
    <div style={{ padding: "40px", maxWidth: "1000px", margin: "0 auto" }}>
      <button onClick={() => navigate("/dashboard")} style={{ marginBottom: "20px", padding: "10px 20px", borderRadius: "8px", background: "rgba(255,255,255,0.1)", border: "none", color: "white", cursor: "pointer" }}>
        ← Back to Dashboard
      </button>

      <h1 style={{ textAlign: "center", marginBottom: "40px" }}>❓ Q&A Mode</h1>

      <div style={{ background: "rgba(255,255,255,0.05)", padding: "30px", borderRadius: "15px", minHeight: "500px", display: "flex", flexDirection: "column" }}>
        <div style={{ flex: 1, overflowY: "auto", marginBottom: "20px" }}>
          {conversations.length === 0 ? (
            <div style={{ textAlign: "center", padding: "60px 20px", opacity: 0.6 }}>
              <div style={{ fontSize: "64px", marginBottom: "20px" }}>💬</div>
              <p style={{ fontSize: "18px" }}>Ask any question about your paper</p>
            </div>
          ) : (
            conversations.map((conv, index) => (
              <div
                key={index}
                style={{
                  marginBottom: "20px",
                  display: "flex",
                  justifyContent: conv.type === "question" ? "flex-end" : "flex-start"
                }}
              >
                <div
                  style={{
                    maxWidth: "75%",
                    padding: "15px 20px",
                    borderRadius: "12px",
                    background: conv.type === "question"
                      ? "linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
                      : "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
                    color: "white",
                    boxShadow: "0 4px 6px rgba(0,0,0,0.1)"
                  }}
                >
                  <div style={{ fontWeight: "bold", marginBottom: "5px", fontSize: "13px", opacity: 0.9 }}>
                    {conv.type === "question" ? "You" : "AI Assistant"}
                  </div>
                  <div style={{ lineHeight: "1.6" }}>{conv.text}</div>
                </div>
              </div>
            ))
          )}
          {loading && (
            <div style={{ textAlign: "center", padding: "20px" }}>
              <div style={{ fontSize: "32px" }}>💭</div>
              <p style={{ opacity: 0.7 }}>Thinking...</p>
            </div>
          )}
        </div>

        <div style={{ display: "flex", gap: "10px" }}>
          <input
            type="text"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && askQuestion()}
            placeholder="Type your question here..."
            style={{
              flex: 1,
              padding: "15px",
              borderRadius: "10px",
              background: "rgba(255,255,255,0.1)",
              color: "white",
              border: "1px solid rgba(255,255,255,0.2)",
              fontSize: "16px"
            }}
          />
          <button
            onClick={askQuestion}
            disabled={loading || !question.trim()}
            style={{
              padding: "15px 30px",
              borderRadius: "10px",
              background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
              border: "none",
              color: "white",
              cursor: "pointer",
              fontWeight: "bold",
              fontSize: "16px"
            }}
          >
            Ask
          </button>
        </div>
      </div>
    </div>
  );
};

export default QAPage;
