import Paper from "../models/Paper.js";
import Highlight from "../models/Highlight.js";
import { generateHighlights } from "../services/aiService.js";

export const generateHighlightsController = async (req, res) => {
  try {
    const { paperId } = req.body;
    const paper = await Paper.findOne({ _id: paperId, uploadedBy: req.user._id });
    if (!paper) return res.status(404).json({ message: "Paper not found" });
    const highlights = await generateHighlights(paper.extractedText);
    const savedHighlights = await Highlight.create({ paper: paper._id, content: highlights, createdBy: req.user._id });
    res.status(201).json(savedHighlights);
  } catch (error) { res.status(500).json({ message: error.message }); }
};
