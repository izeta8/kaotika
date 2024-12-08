import mongoose from 'mongoose';

const { Schema } = mongoose;

// Reuse the player schema for test players
const testPlayerSchema = new Schema({
  _id: { 
    type: mongoose.Schema.Types.ObjectId, 
    required: false 
  },
  isTest: {
    type: Boolean,
    default: false,
  },
  attributes: {
    type: Object, 
    default: {} 
  },
  equipment: {
    type: Object, 
    default: {} 
  },
  inventory: {
    type: Object, 
    default: {} 
  },
  name: {
    type: String, 
    required: false 
  },
  nickname: {
    type: String, 
    required: false 
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
    required: false, 
    default: 1 
  },
  experience: {
    type: Number, 
    required: false, 
    default: 0 
  },
  is_active: {
    type: Boolean, 
    default: false 
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
    select: false 
  },
});

const TestPlayer = mongoose.models.TestPlayer || mongoose.model('TestPlayer', testPlayerSchema);
export default TestPlayer;
