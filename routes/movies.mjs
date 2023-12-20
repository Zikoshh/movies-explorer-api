import { Router } from 'express';
import {
  getMovies,
  createMovie,
  deleteSavedMovie,
} from '../controllers/movies.mjs';

const movies = Router();

movies.get('/', getMovies);
movies.post('/', createMovie);
movies.delete('/:movieId', deleteSavedMovie);

export default movies;
