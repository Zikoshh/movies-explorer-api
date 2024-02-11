import rateLimit from 'express-rate-limit';
import { celebrate, Joi } from 'celebrate';

export const corsConfig = {
  origin: ['http://localhost:3000'],
  credentials: true,
};

export const limitter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 300,
});

export const HTTP_CODES = {
  CREATED_SUCCES: 201,
  BAD_REQUEST_ERROR: 400,
  DUPLICATE_ERROR: 409,
  NOT_FOUND_ERROR: 404,
  UNAUTHORIZED_ERROR: 401,
  INTERNAL_SERVER_ERROR: 500,
};

export const MONGODB_DUPLICATE_ERROR = 11000;

const URL_REGEX =
  /^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_\+.~#?&\/=]*)$/;

export const validationConfig = {
  createMovieValidation: celebrate({
    body: Joi.object().keys({
      country: Joi.string().required(),
      director: Joi.string().required(),
      duration: Joi.number().required(),
      year: Joi.string().required(),
      description: Joi.string().required(),
      image: Joi.string().required().regex(URL_REGEX),
      trailer: Joi.string().required().regex(URL_REGEX),
      thumbnail: Joi.string().required().regex(URL_REGEX),
      movieId: Joi.number().required(),
      nameRU: Joi.string().required(),
      nameEN: Joi.string().required(),
    }),
  }),
  deleteSavedMovieValidation: celebrate({
    params: Joi.object().keys({
      movieId: Joi.string().required(),
    }),
  }),
  updateInfoValidation: celebrate({
    body: Joi.object().keys({
      name: Joi.string().required().min(2).max(30),
      email: Joi.string().required().email(),
    }),
  }),
  createUserValidation: celebrate({
    body: Joi.object().keys({
      name: Joi.string().required().min(2).max(30),
      email: Joi.string().required().email(),
      password: Joi.string().required(),
    }),
  }),
  loginValidation: celebrate({
    body: Joi.object().keys({
      email: Joi.string().required().email(),
      password: Joi.string().required(),
    }),
  }),
};
