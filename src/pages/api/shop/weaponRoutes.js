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
  } finally {
    try {
      await mongoose.disconnect();
      console.log('Database connection closed.');
    } catch (disconnectErr) {
      console.error('Error disconnecting from the database:', disconnectErr);
    }
  }
});

module.exports = router;
