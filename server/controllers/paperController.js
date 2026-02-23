// server/controllers/paperController.js

import Paper from "../models/Paper.js";

export const getMyPapers = async (req, res, next) => {
  try {
    const papers = await Paper.find({
      uploadedBy: req.user._id,
    }).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: papers.length,
      papers,
    });
  } catch (error) {
    next(error);
  }
};