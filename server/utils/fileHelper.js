import fs from "fs";

export const deleteFile = (filePath) => {
  try {
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
      console.log("File deleted:", filePath);
    }
  } catch (error) {
    console.error("File deletion error:", error.message);
  }
};
