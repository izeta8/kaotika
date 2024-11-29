import mongoose from '../connection.js';

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
});

const Armor = mongoose.models.Armor || mongoose.model('Armor', armorSchema);
export default Armor;