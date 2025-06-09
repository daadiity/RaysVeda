const axios = require('axios');

const { getGeminiInterpretation } = require('../services/geminiService');

exports.generateKundli = async (req, res) => {
  try {
    const { name, dob, tob, gender, place, latitude, longitude } = req.body;

    if (!name || !dob || !tob || !gender || !place || !latitude || !longitude) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    const prompt = `
    You are a Vedic astrologer. Based on the following birth details, give a general horoscope/Kundli interpretation in 5-7 lines:
    - Full Name: ${name}
    - Date of Birth: ${dob}
    - Time of Birth: ${tob}
    - Gender: ${gender}
    - Place of Birth: ${place}
    - Latitude: ${latitude}
    - Longitude: ${longitude}

    Explain planetary influences, character traits, and general life outlook. Use friendly tone as a real astrologer.
    `;

    const kundli = await getGeminiInterpretation(prompt);
    res.status(200).json({ interpretation: kundli });

  } catch (error) {
    console.error('Error generating kundli:', error.message);
    res.status(500).json({ error: 'Failed to generate kundli interpretation' });
  }
};
