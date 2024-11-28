const express = require('express');
const router = express.Router();
const Helmet = require('../../../../database/models/helmetModel'); // Ensure this path points to your helmet model

// Get all helmets
router.get('/products/helmets', async (req, res) => {
  try {
    const helmets = await Helmet.find();
    res.status(200).json(helmets);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching helmets', error: err });
  }
});

module.exports = router;
