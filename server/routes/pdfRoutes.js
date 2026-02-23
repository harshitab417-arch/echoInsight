import express from "express";
import multer from "multer";
import { uploadPDF, getPapers } from "../controllers/pdfController.js";
import path from "path";
import { fileURLToPath } from "url";
import protect from "../middleware/authMiddleware.js";

const router = express.Router();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/pdfs"),
  filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname),
});

const upload = multer({ 
  storage, 
  fileFilter: (req, file, cb) => {
    if (file.mimetype !== "application/pdf") {
      return cb(new Error("Only PDF files allowed"), false);
    }
    cb(null, true);
  }
});

router.post("/upload", protect, upload.single("pdf"), uploadPDF);
router.get("/papers", protect, getPapers);

export default router;
