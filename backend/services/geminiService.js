const axios = require('axios');
const { GEMINI_API_KEY } = require('../config/geminiConfig');

const GEMINI_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_API_KEY}`;

exports.getGeminiInterpretation = async (prompt) => {
  if (!GEMINI_API_KEY) {
    throw new Error('Gemini API key is missing');
  }

  const body = {
    contents: [
      {
        parts: [
          { text: prompt }
        ]
      }
    ]
  };

  const headers = { 'Content-Type': 'application/json' };

  try {
    const response = await axios.post(GEMINI_URL, body, { headers });
    // Defensive checks for response structure
    const text =
      response?.data?.candidates?.[0]?.content?.parts?.[0]?.text;
    if (!text) {
      throw new Error('Invalid response from Gemini API');
    }
    return text;
  } catch (error) {
    console.error('Gemini API error:', error?.response?.data || error.message);
    throw new Error('Failed to fetch interpretation from Gemini API');
  }
};