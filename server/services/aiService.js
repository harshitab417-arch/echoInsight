import Groq from "groq-sdk";

const safeSlice = (text, limit = 8000) => {
  if (!text) return "";
  return text.length > limit ? text.substring(0, limit) : text;
};

const getGroq = () => {
  const apiKey = process.env.GROQ_API_KEY;
  if (!apiKey) throw new Error("GROQ_API_KEY not found");
  return new Groq({ apiKey });
};

const isUsingMock = () => {
  return process.env.USE_MOCK_AI?.trim() === "true";
};

export const generatePodcastScript = async (text, tone = "academic", complexity = "low", duration = "5") => {
  if (isUsingMock()) {
    return `Speaker A: Welcome to today's podcast!

Speaker B: Today we're discussing an exciting research paper.

Speaker A: Can you summarize the main idea?

Speaker B: Sure! Here's a quick overview based on the paper: ${safeSlice(text, 200)}...

Speaker A: Fascinating! What are the implications?

Speaker B: The research suggests meaningful impact in the field.

Speaker A: Thanks for breaking it down!`;
  }

  const toneInstructions = {
    academic: "Use formal academic language with technical terms.",
    casual: "Use conversational, friendly language that's easy to understand.",
    interview: "Format as an interview with probing questions and detailed answers."
  };

  const complexityInstructions = {
    low: "Explain concepts in simple terms suitable for general audience.",
    high: "Use advanced vocabulary and technical terminology."
  };

  try {
    const groq = getGroq();
    const completion = await groq.chat.completions.create({
      messages: [
        {
          role: "user",
          content: `Convert the following research paper into a podcast script with Speaker A and Speaker B alternating.

Tone: ${tone} - ${toneInstructions[tone]}
Complexity: ${complexity} - ${complexityInstructions[complexity]}
Duration: Approximately ${duration} minutes

Format each speaker line as:
**Speaker A:** [text]
**Speaker B:** [text]

Paper:
${safeSlice(text)}`
        }
      ],
      model: "llama-3.1-8b-instant",
      temperature: 0.7,
      max_tokens: 2000
    });
    return completion.choices[0]?.message?.content || "Failed to generate script";
  } catch (error) {
    console.error("Groq Podcast Error:", error);
    throw new Error("Failed to generate podcast script");
  }
};

export const generateHighlights = async (text) => {
  if (isUsingMock()) {
    return `• Key Finding 1: Major contribution of the study
• Key Finding 2: Important methodology insight
• Key Finding 3: Experimental results overview
• Key Finding 4: Implications of findings
• Key Finding 5: Future research direction`;
  }

  try {
    const groq = getGroq();
    const completion = await groq.chat.completions.create({
      messages: [
        {
          role: "user",
          content: `Summarize this research paper into concise bullet highlights:\n\n${safeSlice(text)}`
        }
      ],
      model: "llama-3.1-8b-instant",
      temperature: 0.4,
      max_tokens: 1000
    });
    return completion.choices[0]?.message?.content || "Failed to generate highlights";
  } catch (error) {
    console.error("Groq Highlights Error:", error);
    throw new Error("Failed to generate highlights");
  }
};

export const askQuestion = async (text, question) => {
  if (isUsingMock()) {
    return `Mock answer to: "${question}". This is a simulated response.`;
  }

  try {
    const groq = getGroq();
    const completion = await groq.chat.completions.create({
      messages: [
        {
          role: "user",
          content: `Answer this question based on the paper:\nQuestion: ${question}\n\nPaper:\n${safeSlice(text)}`
        }
      ],
      model: "llama-3.1-8b-instant",
      temperature: 0.4,
      max_tokens: 1000
    });
    return completion.choices[0]?.message?.content || "Failed to generate answer";
  } catch (error) {
    console.error("Groq QA Error:", error);
    throw new Error("Failed to generate answer");
  }
};
