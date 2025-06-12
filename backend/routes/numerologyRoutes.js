const express = require('express');
const router = express.Router();
const Numerology = require('../models/Numerology');

// @route   POST /api/numerology
// @desc    Create a new numerology request
router.post('/', async (req, res) => {
  try {
    const { name, birthDate, email, serviceType, message } = req.body;

    const newRequest = new Numerology({
      name,
      birthDate,
      email,
      serviceType,
      message,
    });

    const savedRequest = await newRequest.save();
    res.status(201).json(savedRequest);
  } catch (err) {
    res.status(500).json({ error: 'Failed to create numerology request' });
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