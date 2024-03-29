import mongoose from 'mongoose';
import Movie from '../models/movies.mjs';
import NotFoundError from '../errors/NotFoundError.mjs';
import BadRequestError from '../errors/BadRequestError.mjs';

export const getMovies = async (req, res, next) => {
  try {
    const movies = await Movie.find(
      { inFavorites: req.user._id },
    );
    return res.send(movies);
  } catch (error) {
    return next(error);
  }
};

export const createMovie = async (req, res, next) => {
  try {
    const dbHasMovie = await Movie.findOne({ id: req.body.id });

    if (dbHasMovie) {
      const updatedMovie = await Movie.findOneAndUpdate(
        { id: req.body.id },
        { $addToSet: { inFavorites: req.user._id } },
        {
          new: true,
          runValidators: true,
        },
      );

      return res.send(updatedMovie);
    }

    const newMovie = await Movie.create(req.body);

    const updatedMovie = await Movie.findByIdAndUpdate(
      newMovie._id,
      { $addToSet: { inFavorites: req.user._id } },
      {
        new: true,
        runValidators: true,
      },
    );

    return res.send(updatedMovie);
  } catch (error) {
    if (error instanceof mongoose.Error.ValidationError) {
      return next(new BadRequestError(error.message));
    }

    return next(error);
  }
};

export const deleteSavedMovie = async (req, res, next) => {
  try {
    const updatedMovie = await Movie.findOneAndUpdate(
      { id: req.params.movieId },
      { $pull: { inFavorites: req.user._id } },
      {
        new: true,
        runValidators: true,
      },
    ).orFail(() => next(new NotFoundError('Фильма с таким id не существует')));

    return res.send(updatedMovie);
  } catch (error) {
    if (error instanceof mongoose.Error.CastError) {
      return next(new BadRequestError('Невалидное id фильма'));
    }
    return next(error);
  }
};
