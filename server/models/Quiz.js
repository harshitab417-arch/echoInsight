import mongoose from "mongoose";

const quizSchema = new mongoose.Schema(
  {
    paper: { type: mongoose.Schema.Types.ObjectId, ref: "Paper", required: true },
    audioFile: { type: String },
    questions: [
      {
        question: String,
        options: [String],
        answer: String,
      },
    ],
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
);

const Quiz = mongoose.model("Quiz", quizSchema);
export default Quiz;
