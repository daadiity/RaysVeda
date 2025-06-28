const axios = require('axios');

const { getGeminiInterpretation } = require('../services/geminiService');

exports.generateKundli = async (req, res) => {
  try {
    let { name, dob, tob, gender, place, latitude, longitude } = req.body;

    // Log the received body for debugging
    console.log('Received body:', req.body);

    // Trim all string fields
    name = typeof name === 'string' ? name.trim() : '';
    dob = typeof dob === 'string' ? dob.trim() : '';
    tob = typeof tob === 'string' ? tob.trim() : '';
    gender = typeof gender === 'string' ? gender.trim() : '';
    place = typeof place === 'string' ? place.trim() : '';

    // Validate all fields (allow 0 for latitude/longitude)
    if (
      !name ||
      !dob ||
      !tob ||
      !gender ||
      !place ||
      place.toLowerCase().startsWith('e.g.') ||
      latitude === undefined ||
      latitude === null ||
      latitude === '' ||
      longitude === undefined ||
      longitude === null ||
      longitude === ''
    ) {
      return res.status(400).json({ error: 'All fields are required and must be valid' });
    }

    // Validate latitude and longitude are numbers and not example text
    if (
      (typeof latitude === 'string' && latitude.toLowerCase().startsWith('e.g.')) ||
      (typeof longitude === 'string' && longitude.toLowerCase().startsWith('e.g.'))
    ) {
      return res.status(400).json({ error: 'Latitude and Longitude must be valid numbers' });
    }

    latitude = Number(latitude);
    longitude = Number(longitude);

    if (isNaN(latitude) || isNaN(longitude)) {
      return res.status(400).json({ error: 'Latitude and Longitude must be numbers' });
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

    // Debug log
    console.log('Prompt sent to Gemini:', prompt);

    const kundliResult = await getGeminiInterpretation(prompt);

    // If the result is an object with a data property, use that
    const kundli =
      typeof kundliResult === 'object' && kundliResult !== null && kundliResult.data
        ? kundliResult.data
        : kundliResult;

    if (!kundli) {
      throw new Error('No interpretation returned from Gemini service');
    }

    res.status(200).json({ interpretation: kundli });
  } catch (error) {
    console.error('Error generating kundli:', error?.response?.data || error.message);
    res.status(500).json({ error: 'Failed to generate kundli interpretation' });
  }
};