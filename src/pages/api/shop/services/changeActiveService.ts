import mongoose from 'mongoose';
import Ring from '../../../../database/models/ringModel';
import Armor from '../../../../database/models/armorModel';
import Artifact from '../../../../database/models/artifactModel';
import Boot from '../../../../database/models/bootModel';
import Helmet from '../../../../database/models/helmetModel';
import Ingredient from '../../../../database/models/ingredientModel';
import Shield from '../../../../database/models/shieldModel';
import Weapon from '../../../../database/models/weaponModel';

interface Product {
  _id: string | mongoose.Types.ObjectId;
  type: string;
}

export const changeProductActiveStatus = async (
  connection: mongoose.Connection, 
  product: Product, 
  isActiveValue: boolean
) => {
  const modelMap: Record<string, mongoose.Model<any>> = {
    'ring': connection.model('Ring', Ring.schema),
    'armor': connection.model('Armor', Armor.schema),
    'artifact': connection.model('Artifact', Artifact.schema),
    'boot': connection.model('Boot', Boot.schema),
    'helmet': connection.model('Helmet', Helmet.schema),
    'ingredient': connection.model('Ingredient', Ingredient.schema),
    'shield': connection.model('Shield', Shield.schema),
    'weapon': connection.model('Weapon', Weapon.schema)
  };

  const productType = product.type; 
  const ProductModel = modelMap[productType];

  if (!ProductModel) {
    console.error(`No model found for product type: ${productType}`);
    return null;
  }

  console.log(ProductModel);

  const updatedDoc = await ProductModel.findByIdAndUpdate(
    product._id,
    { $set: { isActive: isActiveValue } },
    { new: true }
  );

  console.log(`Producto ${product._id} de tipo ${productType} ahora isActive = ${isActiveValue}`);
  console.log('Updated Document:', updatedDoc);

  return updatedDoc;
};

  
  
  