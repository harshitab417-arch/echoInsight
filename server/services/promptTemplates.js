// server/services/promptTemplate.js

export const generatePodcastPrompt = ({
 text,
 tone = "academic",
 complexity = "low",
 duration = "5",
}) => {

 return `
Convert this research paper into a ${duration}-minute podcast conversation.

Tone: ${tone}
Complexity: ${complexity}

Format strictly as:

Speaker A: ...
Speaker B: ...

Paper:
${text.substring(0, 8000)}
`;
};