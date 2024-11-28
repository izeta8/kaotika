const express = require('express');
const router = express.Router();
const Artifact = require('../../../../database/models/artifactModel'); // Ensure this path points to your artifact model

// Get all artifacts
router.get('/products/artifacts', async (req, res) => {
  try {
    const artifacts = await Artifact.find();
    res.status(200).json(artifacts);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching artifacts', error: err });
  }
});

module.exports = router;
