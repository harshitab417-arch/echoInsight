import OpenAI from "openai";
import fs from "fs";
import path from "path";
import { v4 as uuidv4 } from "uuid";

export const generateAudioFromText = async (text) => {
  try {
    const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
    const speechFileName = `${uuidv4()}.mp3`;
    const speechFilePath = path.join("uploads/audio", speechFileName);

    const mp3 = await openai.audio.speech.create({
      model: "gpt-4o-mini-tts",
      voice: "alloy",
      input: text,
    });

    const buffer = Buffer.from(await mp3.arrayBuffer());
    fs.writeFileSync(speechFilePath, buffer);

    return { fileName: speechFileName, filePath: speechFilePath };
  } catch (error) {
    console.error("TTS Error:", error.message);
    throw error;
  }
};
