import { Schema, model, ObjectId } from 'mongoose';
import validator from 'validator';

const movieSchema = new Schema(
  {
    duration: {
      type: Number,
      required: true,
    },
    trailerLink: {
      type: String,
      required: true,
      validate: {
        validator: validator.isURL,
        message: (props) => `${props.value} неверный формат ссылки`,
      },
    },
    image: {
      url: {
        type: String,
        required: true,
      },
    },
    inFavorites: [
      {
        type: ObjectId,
        ref: 'user',
        default: [],
      },
    ],
    id: {
      type: Number,
      required: true,
    },
    nameRU: {
      type: String,
      required: true,
    },
    nameEN: {
      type: String,
      required: true,
    },
  },
  { versionKey: false, timestamps: true },
);

export default model('movie', movieSchema);
