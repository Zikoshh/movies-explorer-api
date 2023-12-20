import { Schema, model } from 'mongoose';
import isEmail from 'validator/lib/isEmail';

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: (email) => isEmail(email),
      message: (props) => `${props.value} это не валидный email`,
    },
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
});

export default model('user', userSchema);
