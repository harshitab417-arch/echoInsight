# 🎙️ EchoInsight: AI-Powered Research Dashboard

EchoInsight is a premium, AI-driven platform designed to transform the way researchers, students, and professionals interact with academic papers. By leveraging advanced AI, EchoInsight converts dense PDF documents into engaging, interactive, and audible experiences.

## ✨ Key Features

### 🎧 AI Podcast Generator
Convert your research papers into a dynamic, two-person podcast. 
- **Dual-Voice Interaction**: Realistic dialogue between two distinct AI speakers (Host & Guest).
- **Customizable Experience**: Adjust tone (Academic, Casual, Interview), complexity, and duration.
- **Smart Playback**: Real-time voice switching, pause/resume, and adjustable playback speeds.

### 📝 Key Highlights
Get straight to the point with AI-generated summaries.
- **Markdown Rendering**: Beautifully formatted highlights with bold text, lists, and clear hierarchy.
- **One-Click Insights**: instantly extract the core findings of any paper.

### ❓ Interactive Q&A Mode
Chat with your documents.
- **Personalized Context**: Ask specific questions and get answers directly derived from your uploaded PDF.
- **Rich Text Support**: Answers are rendered with full markdown support for better readability.

### 📁 Document Management
- **My Files**: A centralized hub to view, download, or re-analyze your previously uploaded documents.
- **Secure Persistence**: Session-based document selection clears on logout for data privacy.

### 🛡️ Premium Security & UX
- **JWT Authentication**: Secure login and registration with descriptive error handling.
- **Persistence**: Authentication state and personalized greetings ("Welcome Back, <user>") persist across reloads.

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v16+)
- MongoDB (Local or Atlas)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/harshitab417-arch/Echo_Insight.git
   cd Echo_Insight
   ```

2. **Setup Server**
   ```bash
   cd server
   npm install
   ```
   *Create a `.env` file in the server directory:*
   ```env
   PORT=5000
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   API_KEY=your_api_key
   ```

3. **Setup Client**
   ```bash
   cd ../client
   npm install
   ```

### Running Locally

1. **Start the Backend**
   ```bash
   cd server
   node server.js
   ```

2. **Start the Frontend**
   ```bash
   cd client
   npm run dev
   ```

---

## 🛠️ Technology Stack

- **Frontend**: 
  - React.js (Vite)
  - React Router DOM
  - React Markdown
  - Web Speech API (for Text-to-Speech)
  - Vanilla CSS (Glassmorphism & Custom Design System)
- **Backend**: 
  - Node.js & Express
  - MongoDB & Mongoose
  - JSON Web Tokens (JWT)
  - Multer (File Handling)
- **AI Integration**: 
  - Google Gemini AI (Content Generation & Analysis)

---