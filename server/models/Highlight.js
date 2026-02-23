// server/models/Highlight.js

import mongoose from "mongoose";

const highlightSchema = new mongoose.Schema(
{
  paper: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Paper",
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
},
{ timestamps: true }
);

const Highlight = mongoose.model("Highlight", highlightSchema);

export default Highlight;