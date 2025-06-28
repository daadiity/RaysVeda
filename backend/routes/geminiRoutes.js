const express = require('express');
const router = express.Router();
const geminiController = require('../controllers/geminiController');

router.post('/gemini-interpret', geminiController.generateKundli);
module.exports = router;