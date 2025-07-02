const express = require('express');
const { chatWithGPT } = require('../controllers/chatController');
const auth = require('../middleware/auth');
const { getUserNotes,deleteNote } = require('../controllers/chatController');
const router = express.Router();

router.post('/', auth, chatWithGPT);


// New route
router.get('/notes', auth, getUserNotes);
router.delete('/:id', auth, deleteNote);



module.exports = router;
