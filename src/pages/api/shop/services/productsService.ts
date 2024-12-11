import mongoose from 'mongoose';
import  Ring  from '../../../../database/models/ringModel';
import  Armor  from '../../../../database/models/armorModel';
import  Artifact  from '../../../../database/models/artifactModel';
import  Boot  from '../../../../database/models/bootModel';
import  Helmet  from '../../../../database/models/helmetModel';
import  Ingredient  from '../../../../database/models/ingredientModel';
import  Shield  from '../../../../database/models/shieldModel';
import  Weapon  from '../../../../database/models/weaponModel';

export const fetchAllProducts = async (connection: mongoose.Connection) => {
  try {
    
    // Ensure that models are registered with the passed connection
    const RingModel = connection.model('Ring', Ring.schema)
    const ArmorModel = connection.model('Armor', Armor.schema);
    const ArtifactModel = connection.model('Artifact', Artifact.schema);
    const BootModel = connection.model('Boot', Boot.schema);
    const HelmetModel = connection.model('Helmet', Helmet.schema);
    const IngredientModel = connection.model('Ingredient', Ingredient.schema);
    const ShieldModel = connection.model('Shield', Shield.schema);
    const WeaponModel = connection.model('Weapon', Weapon.schema);

    // Fetch data from the models
    const [rings, armors, artifacts, boots, helmets, ingredients, shields, weapons] = await Promise.all([
      RingModel.find().exec(),
      ArmorModel.find().exec(),
      ArtifactModel.find().exec(),
      BootModel.find().exec(),
      HelmetModel.find().exec(),
      IngredientModel.find().exec(),
      ShieldModel.find().exec(),
      WeaponModel.find().exec(),
    ]);
    

    return {
      rings,
      armors,
      artifacts,
      boots,
      helmets,
      ingredients,
      shields,
      weapons,
    };
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error('Error fetching products:', error);
      throw new Error(`Error fetching products: ${error.message}`);
    } else {
      console.error('Unexpected error type:', error);
      throw new Error('An unexpected error occurred while fetching products');
    }
  }
};



