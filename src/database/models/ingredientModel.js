import mongoose from '../connection.js';

const { Schema } = mongoose;

const ingredientSchema = new Schema({
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
    enum: ['ingredient'],
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  value: {
    type: Number,
    required: true,
  },
  rarity: {
    type: String,
    enum: ['common', 'uncommon', 'rare', 'epic', 'legendary'],
    required: true,
  },
  effects: {
    type: [String],
    required: false,
  },
});

const Ingredient = mongoose.models.Ingredient || mongoose.model('Ingredient', ingredientSchema);
export default Ingredient;
