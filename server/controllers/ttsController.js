import Podcast from "../models/Podcast.js";
import { generateAudioFromText } from "../services/ttsService.js";

export const generateTTS = async (req, res, next) => {
  try {
    const { podcastId } = req.body;
    if (!podcastId) return res.status(400).json({ message: "podcastId is required" });

    const podcast = await Podcast.findOne({ _id: podcastId, createdBy: req.user._id });
    if (!podcast) return res.status(404).json({ message: "Podcast not found" });

    if (podcast.audioFile) return res.status(200).json({ success: true, audioFile: podcast.audioFile });

    const audio = await generateAudioFromText(podcast.script);
    podcast.audioFile = audio.fileName;
    await podcast.save();

    res.status(200).json({ success: true, audioFile: audio.fileName });
  } catch (error) { next(error); }
};
