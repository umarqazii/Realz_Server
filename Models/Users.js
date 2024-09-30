import mongoose from 'mongoose';

const { Schema } = mongoose;

const userSchema = new Schema({
  userid: {
    type: String,
  },
  name: {
    type: String,
  },
  email: {
    type: String,
  },
  phone: {
    type: Number,
  },
  address: {
    type: String,
  },
}, {
  collection: 'users',
});

export default mongoose.model('Users', userSchema);
