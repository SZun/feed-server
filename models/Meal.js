import mongoose, { Schema } from 'mongoose';

const mealSchema = new Schema({
  meal: {
    type: String,
    trim: true,
    minlength: 3,
    maxlength: 255,
    required: true
  },
  user: {
    ref: 'users',
    type: Schema.Types.ObjectId,
    index: true
  }
});

const User = mongoose.model('meals', mealSchema);

export default User;
