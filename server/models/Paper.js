import mongoose from "mongoose";

const paperSchema = new mongoose.Schema(
  {
    title: { type: String },
    originalFileName: { type: String },
    filePath: { type: String },
    extractedText: { type: String },
    uploadedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
);

const Paper = mongoose.model("Paper", paperSchema);
export default Paper;
