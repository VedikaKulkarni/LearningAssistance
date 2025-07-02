const { GoogleGenerativeAI } = require('@google/generative-ai');
const Chat = require('../models/Chat');
require('dotenv').config();

// Initialize Gemini client
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// Controller function using Gemini API
exports.chatWithGPT = async (req, res) => {
  const { prompt } = req.body;
  const userId = req.userId;

  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

    const result = await model.generateContent(prompt);
    const reply = result.response.text();


    // Save to MongoDB
    const summaryPrompt = `Summarize the following answer in 3 to 5 bullet points for academic notes:\n\n"${reply}"`;

    const summaryResult = await model.generateContent(summaryPrompt);
    const summary = summaryResult.response.text();

    // Step 3: Save everything to MongoDB
    const chat = new Chat({
      userId,
      prompt,
      response: reply,
      summary
    });
    await chat.save();

    res.status(200).json({ reply });
  } catch (err) {
    console.error('Error in chatWithGPT (Gemini):', err.message);
    res.status(500).json({ error: err.message });
  }
};
exports.getUserNotes = async (req, res) => {
  try {
    const notes = await Chat.find({ userId: req.userId }).sort({ createdAt: -1 });
    res.status(200).json(notes);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
exports.deleteNote = async (req, res) => {
  try {
    const note = await Chat.findOneAndDelete({ _id: req.params.id, userId: req.userId });
    if (!note) return res.status(404).json({ message: "Note not found" });
    res.json({ message: "Note deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


