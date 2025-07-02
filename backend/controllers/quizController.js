const { GoogleGenerativeAI } = require('@google/generative-ai');
const Chat = require('../models/Chat');
require('dotenv').config();

// Initialize Gemini client
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// Controller: Generate quiz from user chat history
exports.generateQuizFromChat = async (req, res) => {
  try {
    const userId = req.userId;

    // Step 1: Fetch user's chat history
   const chats = await Chat.find({ userId })
  .sort({ createdAt: -1 }) // Newest first
  .limit(5)                // Last 5 chats only
  .sort({ createdAt: 1 }); // Restore order (oldest to newest)


    if (chats.length === 0) {
      return res.status(404).json({ message: "No chat history found to generate quiz." });
    }

    // Step 2: Combine prompt + response for context
    const chatText = chats
      .map((chat, i) => `Q${i + 1}: ${chat.prompt}\nA${i + 1}: ${chat.response}`)
      .join('\n\n');

    // Step 3: Craft quiz prompt
    const prompt = `
Based on the following conversation, generate as many multiple-choice quiz questions as possible.

Rules:
- Each question must have 4 options.
- Mark the correct answer clearly.
- Format the entire response as a JSON array like:
[
  {
    "question": "What is...",
    "options": ["Option A", "Option B", "Option C", "Option D"],
    "answer": "Option B"
  },
  ...
]

Chat History:
${chatText}
`;

    // Step 4: Ask Gemini to generate quiz
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
    const result = await model.generateContent(prompt);
    const output = result.response.text();

    // Step 5: Extract clean JSON
    const start = output.indexOf('[');
    const end = output.lastIndexOf(']') + 1;
    const quizJSON = output.slice(start, end);

    const quiz = JSON.parse(quizJSON);
    res.status(200).json(quiz);
  } catch (err) {
    console.error('Quiz generation error:', err.message);
    res.status(500).json({ error: "Quiz generation failed. Please try again." });
  }
};
