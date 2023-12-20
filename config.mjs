import rateLimit from 'express-rate-limit';

export const corsConfig = {
  origin: ['http://localhost:5173'],
  credentials: true,
};

export const limitter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 300,
});

export const validationConfig = {};
