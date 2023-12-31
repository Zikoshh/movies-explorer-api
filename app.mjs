import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import { errors } from 'celebrate';
import dotenv from 'dotenv';
import errorHandler from './middlewares/errorHandler.mjs';
import { requestLogger, errorLogger } from './middlewares/logger.mjs';
import { corsConfig, limitter } from './config.mjs';
import routes from './routes/index.mjs';

dotenv.config();
const { PORT = 3000, MONGO_URL = 'mongodb://127.0.0.1:27017/bitfilmsdb' } =
  process.env;

const app = express();
app.use(cors(corsConfig));

mongoose.connect(MONGO_URL);

app.use(express.json());
app.use(helmet());
app.use(limitter);
app.use(cookieParser());
app.use(requestLogger);

app.use(routes);

app.use(errorLogger);
app.use(errors());
app.use(errorHandler);
app.listen(PORT);
