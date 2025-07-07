const express = require('express');
const router = express.Router();
// @route   POST /api/numerology
// @desc    Create a new numerology request
const { GoogleGenerativeAI } = require('@google/generative-ai');

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);


router.post('/', async (req, res) => {
  const { name, birthDate, email, serviceType, message } = req.body;

  const prompt = `
Name: ${name}
Birth Date: ${birthDate}
Service Type: ${serviceType}
Message: ${message}
You are a numerology expert. Analyze the following details and provide a concise reading:
Give a detailed numerology reading in simple language.IN less tha 50 words.also write in answer thanks for seeing Ryas veda after giving response`;

  try {
    // ❌ This was the incorrect model name.
    // const model = genAI.getGenerativeModel({ model: "models/gemini-pro" });

    // ✅ Use a supported model name, like gemini-1.5-pro-latest

    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });


    const result = await model.generateContent(prompt);
    const text = await result.response.text();
    res.json({ success: true, data: text });
  } catch (error) {
    console.error('Gemini API error:', error);
    res.status(500).json({ success: false, error: 'Gemini API failed.' });

  }
});

// @route   GET /api/numerology
// @desc    Get all numerology requests
router.get('/', async (req, res) => {
  try {
    const requests = await Numerology.find();
    res.status(200).json(requests);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch numerology requests' });

  }
});

module.exports = router;