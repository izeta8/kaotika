const mongoose = require('../connection');

const { Schema } = mongoose;

const helmetSchema = new Schema({
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
    enum: ['helmet'],
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
});

module.exports = mongoose.model('Helmet', helmetSchema);
