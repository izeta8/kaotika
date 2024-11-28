const express = require('express');
const router = express.Router();
const Shield = require('../../../../database/models/shieldModel');

// Get all shields
router.get('/products/shields', async (req, res) => {
  try {
    const shields = await Shield.find();
    res.status(200).json(shields);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching shields', error: err });
  }
});

module.exports = router;