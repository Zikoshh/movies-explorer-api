import { Router } from 'express';
import {
  getMovies,
  createMovie,
  deleteSavedMovie,
} from '../controllers/movies.mjs';
import { validationConfig } from '../config.mjs';

const { createMovieValidation, deleteSavedMovieValidation } = validationConfig;
const movies = Router();

movies.get('/', getMovies);
movies.post('/', createMovieValidation, createMovie);
movies.delete('/:movieId', deleteSavedMovieValidation, deleteSavedMovie);

export default movies;
