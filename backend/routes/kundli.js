const express = require('express');
const router = express.Router();
const { GoogleGenerativeAI } = require('@google/generative-ai');
const jwt = require('jsonwebtoken');

// Initialize Gemini AI
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// Custom auth middleware for kundli (instead of protect middleware)
const authenticateUser = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    
    if (!token) {
      return res.status(401).json({
        success: false,
        message: 'Authentication token required'
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // Create a user object with the decoded token data
    req.user = {
      _id: decoded.id || decoded._id,
      name: decoded.name,
      email: decoded.email
    };
    
    console.log('✅ User authenticated:', req.user);
    next();
  } catch (error) {
    console.error('❌ Auth error:', error.message);
    return res.status(401).json({
      success: false,
      message: 'Invalid authentication token'
    });
  }
};

// Generate Kundli using Gemini AI (NO DATABASE SAVING)
router.post('/generate', authenticateUser, async (req, res) => {
  try {
    const { name, birthLocation, dateOfBirth, timeOfBirth } = req.body;

    console.log('=== KUNDLI GENERATION REQUEST ===');
    console.log('User:', req.user);
    console.log('Birth details:', { name, birthLocation, dateOfBirth, timeOfBirth });

    // Validate required fields
    if (!name || !birthLocation || !dateOfBirth || !timeOfBirth) {
      return res.status(400).json({
        success: false,
        message: 'All birth details are required'
      });
    }

    // Create detailed prompt for Gemini AI
    const prompt = `
    You are a professional Vedic astrologer working with the RaysVeda astrology platform, which offers personalized Kundli analysis and online Vedic Pooja booking services.

Based on the following birth details:

Name: ${name}  
Date of Birth: ${dateOfBirth}  
Time of Birth: ${timeOfBirth}  
Place of Birth: ${birthLocation}  

Generate a comprehensive Kundli analysis using Vedic astrology principles. The total response should be between 1200 and 1500 words. The tone must be compassionate, practical, and spiritually empowering. Do not use markdown symbols such as *, #, or bullet points — write in clean, well-structured plain text.

The analysis must include the following sections:

1. Personal Overview – key personality traits, strengths, and self-development areas  
2. Career and Professional Life – ideal career paths, success timing, and challenges  
3. Relationships and Marriage – compatibility factors, timing, emotional needs  
4. Health and Wellness – health trends, sensitive body areas, and lifestyle guidance  
5. Wealth and Financial Prospects – income sources, savings potential, risk periods  
6. Important Life Periods – major Dashas and transits, and how to navigate them  
7. Spiritual Growth – inclinations, suggested practices, mantras, and inner evolution  
8. Lucky Elements – lucky numbers, colors, directions, days, and gemstone advice  

After completing the Kundli analysis, **you must recommend 2 or 3 specific Vedic Poojas** from the list below. This is essential to the RaysVeda platform experience. Recommendations must be clearly tied to the person’s chart, such as current or upcoming Mahadasha/Antardasha, doshas, house blockages, or life problems.

Pooja options:

Narayan Puja, Lakshmi Puja, Ganpati Puja, Shri Shiv Puja, Satyanarayan Puja, Navgrah Shanti Puja, Mangal Dosh Nivaran Puja, Rahu-Ketu Shanti Puja, Kal Sarp Dosh Puja, Health-Related Puja, Career Success Puja, Marriage Harmony Puja

For each suggested Pooja:

- State clearly **why** it is needed and what planetary energies it addresses  
- Explain how the Pooja will help (e.g., remove obstacles, improve prosperity, calm mind, protect relationships)  
- Use positive, uplifting language to encourage the user to consider this Pooja through RaysVeda  
- Mention that the Pooja can be conveniently booked online on RaysVeda and performed by qualified Vedic priests

Conclude with a warm message inviting the user to take spiritual action through RaysVeda’s online remedies to align with cosmic energies and improve their life path.

    `;

    // Generate content using Gemini AI
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    
    console.log('🤖 Sending request to Gemini AI...');
    
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const kundliReport = response.text();

    console.log('✅ Gemini AI response received');
    console.log('Report length:', kundliReport.length);

    // Return the generated Kundli directly (NO DATABASE SAVING)
    res.json({
      success: true,
      message: 'Kundli generated successfully',
      kundliReport,
      generatedFor: {
        name,
        birthLocation,
        dateOfBirth,
        timeOfBirth
      },
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('❌ Kundli generation error:', error);
    
    if (error.message.includes('API key')) {
      return res.status(500).json({
        success: false,
        message: 'AI service configuration error. Please contact support.'
      });
    }
    
    if (error.message.includes('quota') || error.message.includes('limit')) {
      return res.status(429).json({
        success: false,
        message: 'Service temporarily unavailable due to high demand. Please try again later.'
      });
    }

    res.status(500).json({
      success: false,
      message: 'Failed to generate Kundli. Please try again.',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

// Optional: Simple health check endpoint
router.get('/health', (req, res) => {
  res.json({
    success: true,
    message: 'Kundli service is running',
    timestamp: new Date().toISOString()
  });
});

module.exports = router;