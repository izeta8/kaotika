const express = require('express');
const router = express.Router();
const Ingredient = require('../../../../database/models/ingredientModel'); // Ensure this path points to your ingredient model

// Get all ingredients
router.get('/products/ingredients', async (req, res) => {
  try {
    const ingredients = await Ingredient.find();
    res.status(200).json(ingredients);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching ingredients', error: err });
  }
});

module.exports = router;
