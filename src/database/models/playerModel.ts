import mongoose from 'mongoose';

const { Schema } = mongoose;

const playerSchema = new Schema({
  _id: { 
    type: mongoose.Schema.Types.ObjectId, 
    required: true 
},
  attributes: {
     type: Object, 
    default: {} 
},
  testRunId: {
  type: String, 
  default: null
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
    required: true 
  },
  nickname: {
     type: String, 
    required: true 
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
    required: true, default: 1 
  },
  experience: {
     type: Number, 
    required: true, default: 0 
  },
  is_active: {
     type: Boolean, 
    default: true 
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
    select: false },
});

const Player = mongoose.models.Player || mongoose.model('Player', playerSchema);
export default Player;
