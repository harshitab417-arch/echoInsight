import Paper from "../models/Paper.js";

export const uploadPDF = async (req, res, next) => {
  try {
    if (!req.file) return res.status(400).json({ message: "No file uploaded" });
    const filePath = req.file.path;
    const originalFileName = req.file.originalname;
    console.log("Uploading file:", originalFileName);
    const extractTextFromPDF = (await import("../services/pdfService.js")).default;
    const extractedText = await extractTextFromPDF(filePath);
    const paper = await Paper.create({ 
      title: originalFileName, 
      originalFileName: originalFileName, 
      filePath, 
      extractedText, 
      uploadedBy: req.user._id 
    });
    console.log("Paper saved:", paper);
    res.status(201).json({ success: true, paperId: paper._id, preview: extractedText.substring(0, 500) });
  } catch (error) { 
    console.error("Upload error:", error);
    next(error); 
  }
};

export const getPapers = async (req, res) => {
  try {
    const papers = await Paper.find({ uploadedBy: req.user._id }).sort({ createdAt: -1 });
    console.log("Fetching papers for user:", req.user._id);
    console.log("Found papers:", papers.length);
    res.json(papers);
  } catch (error) {
    console.error("Error fetching papers:", error);
    res.status(500).json({ message: error.message });
  }
};
