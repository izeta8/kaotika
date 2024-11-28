const express = require('express');
const router = express.Router();
const Ring = require('../../../../database/models/ringModel');
const Shield = require('../../../../database/models/shieldModel');
const Weapon = require('../../../../database/models/weaponModel');
const Armor = require('../../../../database/models/armorModel');
const Artifact = require('../../../../database/models/artifactModel');
const Boot = require('../../../../database/models/bootModel');
const Helmet = require('../../../../database/models/helmetModel');
const Ingredient = require('../../../../database/models/ingredientModel');

// Get all products from all collections
router.get('/products', async (req, res) => {
  try {
    const rings = await Ring.find();
    const shields = await Shield.find();
    const weapons = await Weapon.find();
    const armors = await Armor.find();
    const artifacts = await Artifact.find();
    const boots = await Boot.find();
    const helmets = await Helmet.find();
    const ingredients = await Ingredient.find();

    // Combine all results into a single array
    const allProducts = [
      ...rings,
      ...shields,
      ...weapons,
      ...armors,
      ...artifacts,
      ...boots,
      ...helmets,
      ...ingredients,
    ];

    res.status(200).json(allProducts);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching all products', error: err });
  }
});

module.exports = router;
