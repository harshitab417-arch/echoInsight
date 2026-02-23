import Groq from "groq-sdk";

const isUsingMock = () => {
  return process.env.USE_MOCK_AI?.trim() === "true";
};

export const generateQuizFromText = async (text) => {
  if (isUsingMock()) {
    return [
      {
        question: "What is the main topic of this research?",
        options: ["Option A", "Option B", "Option C", "Option D"],
        answer: "Option A"
      },
      {
        question: "What methodology was used?",
        options: ["Qualitative", "Quantitative", "Mixed", "Experimental"],
        answer: "Quantitative"
      },
      {
        question: "What were the key findings?",
        options: ["Finding 1", "Finding 2", "Finding 3", "Finding 4"],
        answer: "Finding 1"
      }
    ];
  }

  const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });
  
  const completion = await groq.chat.completions.create({
    messages: [
      {
        role: "user",
        content: `Generate 5 MCQ quiz questions in JSON format from this text:\n${text.substring(0, 8000)}`
      }
    ],
    model: "llama-3.1-8b-instant",
    temperature: 0.5,
    max_tokens: 1500
  });

  const content = completion.choices[0]?.message?.content;

  try {
    return JSON.parse(content);
  } catch (err) {
    throw new Error("AI returned invalid JSON format");
  }
};
