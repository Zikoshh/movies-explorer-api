import { Schema, model, ObjectId } from 'mongoose';
import validator from 'validator';

const movieSchema = new Schema(
  {
    country: {
      type: String,
      required: true,
    },
    director: {
      type: String,
      required: true,
    },
    duration: {
      type: Number,
      required: true,
    },
    year: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
      validate: {
        validator: validator.isURL,
        message: (props) => `${props.value} неверный формат ссылки`,
      },
    },
    trailerLink: {
      type: String,
      required: true,
      validate: {
        validator: validator.isURL,
        message: (props) => `${props.value} неверный формат ссылки`,
      },
    },
    thumbnail: {
      type: String,
      required: true,
      validate: {
        validator: validator.isURL,
        message: (props) => `${props.value} неверный формат ссылки`,
      },
    },
    owner: [
      {
        type: ObjectId,
        ref: 'user',
        default: [],
      },
    ],
    movieId: {
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
