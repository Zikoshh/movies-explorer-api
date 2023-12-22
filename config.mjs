import rateLimit from 'express-rate-limit';

export const corsConfig = {
  origin: ['http://localhost:5173'],
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

export const validationConfig = {};
