import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./routes/ProtectedRoute";
import "./App.css";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import PodcastPage from "./pages/PodcastPage";
import HighlightsPage from "./pages/HighlightsPage";
import QAPage from "./pages/QAPage";
import MyFiles from "./pages/MyFiles";
import VoiceLab from "./pages/VoiceLab";
import Settings from "./pages/Settings";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          
          <Route
            path="/podcast"
            element={
              <ProtectedRoute>
                <PodcastPage />
              </ProtectedRoute>
            }
          />
          
          <Route
            path="/highlights"
            element={
              <ProtectedRoute>
                <HighlightsPage />
              </ProtectedRoute>
            }
          />
          
          <Route
            path="/qa"
            element={
              <ProtectedRoute>
                <QAPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/myfiles"
            element={
              <ProtectedRoute>
                <MyFiles />
              </ProtectedRoute>
            }
          />
          
          <Route
            path="/voicelab"
            element={
              <ProtectedRoute>
                <VoiceLab />
              </ProtectedRoute>
            }
          />
          
          <Route
            path="/settings"
            element={
              <ProtectedRoute>
                <Settings />
              </ProtectedRoute>
            }
          />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;