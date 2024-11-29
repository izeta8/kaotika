import mongoose from '../connection';

const { Schema } = mongoose;

const artifactSchema = new Schema({
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
    enum: ['artifact'],
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
  modifiers: {
    type: Object,
    required: false,
  },
  min_lvl: {
    type: Number,
    required: true,
  },
  profiles: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Profile',
    },
  ],
});

const Artifact = mongoose.models.Artifact || mongoose.model('Artifact', artifactSchema);
export default Artifact;
