import { GoogleGenAI, Type } from "@google/genai";

const API_KEY = import.meta.env.VITE_API_KEY;
if (!API_KEY) {
  console.warn("VITE_API_KEY environment variable not set. Using mock responses.");
}

const ai = new GoogleGenAI({ apiKey: API_KEY });

const MOCK_BOT_RESPONSES = [
  { author: "Alex", text: "That's an interesting point!" },
  { author: "Sam", text: "I agree completely." },
  { author: "Jamie", text: "lol, that's hilarious 😂" },
  { author: "Alex", text: "I'm not so sure about that, can you explain more?" },
  { author: "Sam", text: "brb, getting coffee." },
];

export const generateBotResponse = async (
  history,
  latestMessage,
  otherUsers,
  chatContext
) => {
  if (!API_KEY) {
    // Always return a valid response structure
    const mock = MOCK_BOT_RESPONSES[Math.floor(Math.random() * MOCK_BOT_RESPONSES.length)];
    return Promise.resolve({ author: mock.author, text: mock.text });
  }

  const otherUserNames = otherUsers.map(u => u.name);
  const conversationHistory = history.map(h => `${h.author.name}: ${h.content}`).join('\n');
  const chatTopic = chatContext?.type === 'channel' ? `The topic is #${chatContext.name}.` : 'This is a private conversation.';

  const prompt = `
    You are an AI simulating a user in a chat application.
    Your persona should be casual and conversational.
    The other users in the chat are: ${otherUserNames.join(', ')}.
    The conversation so far:
    ${conversationHistory}

    The latest message is from "You": "${latestMessage}".
    ${chatTopic}

    Your task is to generate a short, realistic, and relevant response from ONE of the other users.
    Do not respond as "You".
    Keep your response to a single sentence or two.
    Choose one of the users (${otherUserNames.join(', ')}) to be the author of the response.
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            author: {
              type: Type.STRING,
              description: `The name of the user responding. Must be one of: ${otherUserNames.join(', ')}.`,
              enum: otherUserNames,
            },
            text: {
              type: Type.STRING,
              description: 'The content of the chat message.'
            }
          },
        },
      }
    });

    let parsedResponse;
    try {
      const jsonText = response.text?.trim();
      parsedResponse = JSON.parse(jsonText);
    } catch (err) {
      // If parsing fails, fallback to mock
      const mock = MOCK_BOT_RESPONSES[Math.floor(Math.random() * MOCK_BOT_RESPONSES.length)];
      return { author: mock.author, text: mock.text };
    }

    if (parsedResponse && parsedResponse.author && parsedResponse.text) {
      return parsedResponse;
    } else {
      // Fallback to mock if structure is invalid
      const mock = MOCK_BOT_RESPONSES[Math.floor(Math.random() * MOCK_BOT_RESPONSES.length)];
      return { author: mock.author, text: mock.text };
    }

  } catch (error) {
  console.error("Error calling Gemini API:", error);
  // Always return a valid response structure
  const mock = MOCK_BOT_RESPONSES[Math.floor(Math.random() * MOCK_BOT_RESPONSES.length)];
  return { author: mock.author, text: mock.text };
  }
};