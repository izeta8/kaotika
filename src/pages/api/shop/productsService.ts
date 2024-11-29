import Armor from '../../../database/models/armorModel';
import Artifact from '../../../database/models/artifactModel';
import Boot from '../../../database/models/bootModel';
import Helmet from '../../../database/models/helmetModel';
import Ingredient from '../../../database/models/ingredientModel';
import Ring from '../../../database/models/ringModel';  // Make sure you import Ring
import Shield from '../../../database/models/shieldModel';  // Make sure you import Shield
import Weapon from '../../../database/models/weaponModel';  // Make sure you import Weapon

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

    // Return an object with keys for each product type and their arrays
    return {
      rings,
      shields,
      weapons,
      armors,
      artifacts,
      boots,
      helmets,
      ingredients,
    };
  } catch (err) {
    console.error('Error fetching products:', err);
    throw new Error('Error fetching products');
  }
};


