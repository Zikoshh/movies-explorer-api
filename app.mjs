import express from 'express';
import mongoose from 'mongoose';
import routes from './routes/index.mjs';

const { PORT = 3000, MONGO_URL = 'mongodb://127.0.0.1:27017/bitfilmsdb' } =
  process.env;

const app = express();

mongoose.connect(MONGO_URL);

app.use(routes);

app.listen(PORT);
