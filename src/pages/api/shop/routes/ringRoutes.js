const express = require('express');
const router = express.Router();
const Ring = require('../../../../database/models/ringModel');

// Get all rings
router.get('/products/rings', async (req, res) => {
  try {
    const rings = await Ring.find();
    res.status(200).json(rings);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching rings', error: err });
  }
});

module.exports = router;