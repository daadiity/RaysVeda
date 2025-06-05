const axios = require('axios');
const { GEMINI_API_KEY } = require('../config/geminiConfig');

const GEMINI_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_API_KEY}`;

exports.getGeminiInterpretation = async (prompt) => {
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

  const response = await axios.post(GEMINI_URL, body, { headers });
  return response.data.candidates[0].content.parts[0].text;
};
