import mongoose from 'mongoose';

const { Schema } = mongoose;

const weaponSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  type: {
    type: String,
    required: true,
    enum: ['weapon', 'shield', 'armor', 'ring', 'other'] // Adjust types as needed
  },
  image: {
    type: String,
    required: true
  },
  base_percentage: {
    type: Number,
    required: true
  },
  modifiers: {
    type: Object,
    default: {
      min_lvl: 1
    }
  },
  profiles: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Profile',
    },
  ],
});

const Weapon = mongoose.models.Weapon || mongoose.model('Weapon', weaponSchema);
export default Weapon;
