const express = require('express');
const router = express.Router();
const Boot = require('../../../../database/models/bootModel'); // Ensure this path points to your boot model

// Get all boots
router.get('/products/boots', async (req, res) => {
  try {
    const boots = await Boot.find();
    res.status(200).json(boots);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching boots', error: err });
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
