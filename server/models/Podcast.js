import mongoose from "mongoose";

const podcastSchema = new mongoose.Schema(
  {
    paper: { type: mongoose.Schema.Types.ObjectId, ref: "Paper", required: true },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    audioFile: { type: String },
    tone: { type: String, enum: ["academic", "casual", "interview"], default: "academic" },
    complexity: { type: String, enum: ["low", "high"], default: "low" },
    duration: { type: String, enum: ["5", "10", "15"], default: "5" },
    script: { type: String },
  },
  { timestamps: true }
);

const Podcast = mongoose.model("Podcast", podcastSchema);
export default Podcast;
