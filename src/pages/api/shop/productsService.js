import Ring from '../../../database/models/ringModel.js';
import Shield from '../../../database/models/shieldModel.js';
import Weapon from '../../../database/models/weaponModel.js';
import Armor from '../../../database/models/armorModel.js';
import Artifact from '../../../database/models/artifactModel.js';
import Boot from '../../../database/models/bootModel.js';
import Helmet from '../../../database/models/helmetModel.js';
import Ingredient from '../../../database/models/ingredientModel.js';

export const fetchAllProducts = async () => {
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
    return [
      ...rings,
      ...shields,
      ...weapons,
      ...armors,
      ...artifacts,
      ...boots,
      ...helmets,
      ...ingredients,
    ];
  } catch (err) {
    console.error('Error fetching products:', err);
    throw new Error('Error fetching products');
  }
};

