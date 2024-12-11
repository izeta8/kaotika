import mongoose from 'mongoose';

const { Schema } = mongoose;

const bootSchema = new Schema({
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
    enum: ['boot'],
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
  defense: {
    type: Number,
    required: true,
  },
  modifiers: {
    type: Object,
    required: false,
  },
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
  }
});

const Boot = mongoose.models.Boot || mongoose.model('Boot', bootSchema);
export default Boot;