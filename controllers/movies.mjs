import mongoose from 'mongoose';
import Movie from '../models/movies.mjs';
import NotFoundError from '../errors/NotFoundError.mjs';
import BadRequestError from '../errors/BadRequestError.mjs';
import InsufficientPermissionsError from '../errors/InsufficientPermissionsError.mjs';

export const getMovies = async (req, res, next) => {
  try {
    const movies = await Movie.find(
      { owner: req.user._id },
      'country director duration year description image trailer thumbnail owner movieId nameRU nameEN',
    );
    return res.send(movies);
  } catch (error) {
    return next(error);
  }
};

export const createMovie = async (req, res, next) => {
  try {
    const newMovie = await Movie.create({
      country: req.body.country,
      director: req.body.director,
      duration: req.body.duration,
      year: req.body.year,
      description: req.body.description,
      image: req.body.image,
      trailer: req.body.trailer,
      thumbnail: req.body.thumbnail,
      owner: req.user._id,
      movieId: req.body.movieId,
      nameRU: req.body.nameRU,
      nameEN: req.body.nameEN,
    });

    return res.send(newMovie);
  } catch (error) {
    if (error instanceof mongoose.Error.ValidationError) {
      return next(new BadRequestError(error.message));
    }

    return next(error);
  }
};

export const deleteSavedMovie = async (req, res, next) => {
  try {
    const movie = await Movie.findOne({
      movieId: req.params.movieId,
      owner: req.user._id,
    }).orFail(() => next(new NotFoundError('Фильм с переданным id не найден')));

    if (movie.owner !== req.user._id) {
      return next(
        new InsufficientPermissionsError(
          'Недостаточно прав для удаления',
        ),
      );
    }

    await Movie.findOneAndDelete({
      movieId: req.params.movieId,
      owner: req.user._id,
    });

    return res.send({ message: 'Фильм удален' });
  } catch (error) {
    if (error instanceof mongoose.Error.CastError) {
      return next(new BadRequestError('Передано невалидное id фильма'));
    }
    return next(error);
  }
};
