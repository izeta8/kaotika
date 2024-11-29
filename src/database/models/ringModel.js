import mongoose from '../connection.js';

const { Schema } = mongoose;

const ringSchema = new Schema({
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
    enum: ['ring', 'necklace', 'bracelet', 'amulet', 'other'] // Adjust types as needed
  },
  image: {
    type: String,
    required: true
  },
  value: {
    type: Number,
    required: true
  },
  modifiers: {
    type: Object,
    default: {
      min_lvl: 1
    }
  },
  profiles: {
    type: Array,
    default: []
  }
});

const Ring = mongoose.models.Ring || mongoose.model('Ring', ringSchema);
export default Ring;
