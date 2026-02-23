import Paper from "../models/Paper.js";
import Podcast from "../models/Podcast.js";
import { generatePodcastScript } from "../services/aiService.js";

export const generatePodcast = async (req, res) => {
  console.log("=== PODCAST GENERATION STARTED ===");
  console.log("Request body:", req.body);
  try {
    const { paperId, tone, complexity, duration } = req.body;
    console.log("Looking for paper:", paperId);
    const paper = await Paper.findOne({ _id: paperId, uploadedBy: req.user._id });
    if (!paper) {
      console.log("Paper not found");
      return res.status(404).json({ message: "Paper not found" });
    }
    console.log("Paper found, generating script...");
    const script = await generatePodcastScript(paper.extractedText, tone, complexity, duration);
    console.log("Script generated, saving to DB...");
    const podcast = await Podcast.create({ 
      paper: paper._id, 
      script, 
      tone: tone || "academic",
      complexity: complexity || "low",
      duration: duration || "5",
      createdBy: req.user._id 
    });
    console.log("Podcast saved successfully");
    res.status(201).json(podcast);
  } catch (error) { 
    console.error("❌ Podcast Generation Error:", error.message);
    console.error("❌ Full Error:", error);
    res.status(500).json({ message: error.message }); 
  }
};
