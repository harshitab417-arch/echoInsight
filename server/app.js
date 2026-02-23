import express from "express";
import cors from "cors";
import morgan from "morgan";
import errorHandler from "./middleware/errorMiddleware.js";

console.log("Starting imports...");

try {
  var pdfRoutes = await import("./routes/pdfRoutes.js").then(m => m.default);
  console.log("pdfRoutes imported");
} catch (e) {
  console.error("Error importing pdfRoutes:", e);
}

try {
  var podcastRoutes = await import("./routes/podcastRoutes.js").then(m => m.default);
  console.log("podcastRoutes imported");
} catch (e) {
  console.error("Error importing podcastRoutes:", e);
}

import ttsRoutes from "./routes/ttsRoutes.js";
import highlightRoutes from "./routes/highlightRoutes.js";
import quizRoutes from "./routes/quizRoutes.js";
import qaRoutes from "./routes/qaRoutes.js";
import userRoutes from "./routes/userRoutes.js";   

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("combined"));

app.use((req, res, next) => {
  console.log(`REQUEST: ${req.method} ${req.url}`);
  next();
});

// Routes
console.log("Registering routes...");
console.log("pdfRoutes:", typeof pdfRoutes);
app.use("/api/users", userRoutes);    
app.use("/api/pdf", pdfRoutes);
app.use("/api/podcast", podcastRoutes);
app.use("/api/tts", ttsRoutes);
app.use("/api/highlights", highlightRoutes);
app.use("/api/quiz", quizRoutes);
app.use("/api/qa", qaRoutes);
console.log("Routes registered successfully");

// Serve uploaded files
app.use("/uploads", express.static("uploads"));   

// Test Route
app.get("/", (req, res) => {
  res.json({ message: "Echo-Insight API running 🚀" });
});

// Error Middleware
app.use(errorHandler);

export default app;