import { Schema, model } from 'mongoose';
import validator from 'validator';

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
      validator: validator.isEmail,
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
