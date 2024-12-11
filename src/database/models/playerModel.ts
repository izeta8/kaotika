import mongoose from 'mongoose';
import Armor from '../models/armorModel';
import Helmet from '../models/helmetModel';
import Weapon from './weaponModel';
import Shield from './shieldModel';
import Artifact from './artifactModel';
import Boot from './bootModel';
import Ring from './ringModel';
import Ingredient from './ingredientModel';
const { Schema } = mongoose;

const playerSchema = new Schema({
  _id: { 
    type: mongoose.Schema.Types.ObjectId, 
    required: true 
},
  attributes: {
     type: Object, 
    default: {} 
},
  testRunId: {
  type: String, 
  default: null
  },
  equipment: {
    helmet: { type: Schema.Types.ObjectId, ref: Helmet, default: "66d99aac7518eb4990035363" },
    weapon: { type: Schema.Types.ObjectId, ref: Weapon },
    armor: { type: Schema.Types.ObjectId, ref: Armor },
    shield: { type: Schema.Types.ObjectId, ref: Shield, default: "66f27c81c114335cadf45d70" },
    artifact: { type: Schema.Types.ObjectId, ref: Artifact },
    boot: { type: Schema.Types.ObjectId, ref: Boot, default: "66d99a807518eb499003535f" },
    ring: { type: Schema.Types.ObjectId, ref: Ring, default: "66a6d6c8dfbffe7e6503970f" },
    // antidote_potion: { type: Schema.Types.ObjectId, ref: "PotionAntidote" },
    // healing_potion: { type: Schema.Types.ObjectId, ref: "PotionHealing" },
    // enhancer_potion: { type: Schema.Types.ObjectId, ref: "PotionEnhancer" }
  },
  inventory: {
    helmets: [{ type: Schema.Types.ObjectId, ref: Helmet }],
    weapons: [{ type: Schema.Types.ObjectId, ref: Weapon }],
    armors: [{ type: Schema.Types.ObjectId, ref: Armor }],
    shields: [{ type: Schema.Types.ObjectId, ref: Shield }],
    artifacts: [{ type: Schema.Types.ObjectId, ref: Artifact }],
    boots: [{ type: Schema.Types.ObjectId, ref: Boot }],
    rings: [{ type: Schema.Types.ObjectId, ref: Ring }],
    // antidote_potions: [{ type: Schema.Types.ObjectId, ref: "PotionAntidote" }],
    // healing_potions: [{ type: Schema.Types.ObjectId, ref: "PotionHealing" }],
    // enhancer_potions: [{ type: Schema.Types.ObjectId, ref: "PotionEnhancer" }],
    ingredients: [{ type: Schema.Types.ObjectId, ref: Ingredient }]
  },
  name: {
     type: String, 
    required: true 
  },
  nickname: {
     type: String, 
    required: true 
  },
  email: {
     type: String, 
    required: true 
  },
  avatar: {
     type: String, 
    default: '' 
  },
  classroom_Id: {
     type: String, 
    default: '' 
  },
  level: {
     type: Number, 
    required: true, default: 1 
  },
  experience: {
     type: Number, 
    required: true, default: 0 
  },
  is_active: {
     type: Boolean, 
    default: true 
  },
  profile: {
     type: Object, 
    default: {} 
},
  tasks: {
     type: [Object], 
    default: [] 
  },
  gold: {
     type: Number, 
    default: 0 
  },
  created_date: {
     type: Date, 
    default: Date.now 
  },
  socketId: {
     type: String, 
    default: '' 
  },
  role: {
     type: String, 
    default: '' 
  },
  isInsideLab: {
     type: Boolean, 
    default: false 
  },
  fcm_token: {
     type: String, 
    default: '' 
  },
  isInsideHall: {
     type: Boolean, 
    default: false 
  },
  obituaryDiscovered: {
     type: Boolean, 
    default: false 
  },
  __v: {
     type: Number, 
    select: false },
});

const Player = mongoose.models.Demoplayer || mongoose.model('Demoplayer', playerSchema);
export default Player;
