const express = require('express');
const router = express.Router();
const { generateQuizFromChat } = require('../controllers/quizController');
const auth = require('../middleware/auth');

router.get('/generate-quiz', auth, generateQuizFromChat);

module.exports = router;
