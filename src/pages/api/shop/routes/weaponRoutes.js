const express = require('express');
const router = express.Router();
const Weapon = require('../../../../database/models/weaponModel');

// Get all weapons
router.get('/products/weapons', async (req, res) => {
  try {
    const weapons = await Weapon.find();
    res.status(200).json(weapons);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching weapons', error: err });
  }
});

module.exports = router;
