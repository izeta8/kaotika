import mongoose from '../connection.js';

const { Schema } = mongoose;

const shieldSchema = new Schema({
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
    enum: ['shield', 'armor', 'helmet', 'boots', 'other'] // Adjust types as needed
  },
  image: {
    type: String,
    required: true
  },
  value: {
    type: Number,
    required: true
  },
  defense: {
    type: Number,
    required: true
  },
  modifiers: {
    type: Object,
    default: {
      min_lvl: 1,
      isUnique: false,
      isActive: true
    }
  }
});

const Shield = mongoose.models.Shield || mongoose.model('Shield', shieldSchema);
export default Shield;
