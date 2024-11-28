const express = require('express');
const router = express.Router();
const Armor = require('../../../../database/models/armorModel'); // Ensure this path points to your armor model

// Get all armors
router.get('/products/armors', async (req, res) => {
  try {
    const armors = await Armor.find();
    res.status(200).json(armors);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching armors', error: err });
  }
});

module.exports = router;
