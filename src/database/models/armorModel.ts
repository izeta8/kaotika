import mongoose from 'mongoose';

const { Schema } = mongoose;

const armorSchema = new Schema({
  _id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    default: "armor",
  },
  image: {
    type: String,
    required: true,
  },
  value: {
    type: Number,
    required: true,
  },
  defense: {
    type: Number,
    required: true,
  },
  modifiers: {
    type: Object,
    required: false,
  },
  profiles: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Profile',
    },
  ],
  min_lvl: {
    type: Number,
    required: true,
  }, 
  isUnique: {
    type: Boolean,
    default: false,
  },
  isActive: {
    type: Boolean,
    default: false,
  },
});

const Armor = mongoose.models.Armor || mongoose.model('Armor', armorSchema);
export default Armor;