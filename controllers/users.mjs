import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import User from '../models/users.mjs';
import NotFoundError from '../errors/NotFoundError.mjs';
import DuplicateError from '../errors/DuplicateError.mjs';
import BadRequestError from '../errors/BadRequestError.mjs';
import UnAuthorizedError from '../errors/UnAuthorizedError.mjs';
import generateJwt from '../utils/generateJwt.mjs';

export const getUserByJwt = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id, '_id name email').orFail(
      () => next(new NotFoundError('Пользователя нету в базе данных')),
    );

    res.send(user);
  } catch (error) {
    return next(error);
  }
};

export const updateInfo = async (req, res, next) => {
  try {
    const newUserInfo = await User.findByIdAndUpdate(req.user._id, req.body, {
      new: true,
      runValidators: true,
      select: '_id name email',
    }).orFail(() => next(new NotFoundError('Пользователь с указанным id не найден')));

    return res.send(newUserInfo);
  } catch (error) {
    if (error instanceof mongoose.Error.ValidationError) {
      return next(new BadRequestError(error.message));
    }

    return next(error);
  }
};

export const createUser = async (req, res, next) => {
  try {
    const hash = await bcrypt.hash(req.body.password, 10);
    const newUser = await User.create({
      name: req.body.name,
      email: req.body.email,
      password: hash,
    });

    return res
      .status(201)
      .send({ _id: newUser._id, name: newUser.name, email: newUser.email });
  } catch (error) {
    if (error.code === 11000) {
      return next(new DuplicateError('Такой пользователь уже существует'));
    }

    if (error.name === 'ValidationError') {
      return next(
        new BadRequestError('Переданы невалидные данные для регистрации'),
      );
    }

    return next(error);
  }
};

export const login = async (req, res, next) => {
  try {
    const userInfo = await User.findOne({ email: req.body.email })
      .select('+password')
      .orFail(() => next(new UnAuthorizedError('Неверные email или password')));

    const matched = await bcrypt.compare(req.body.password, userInfo.password);

    if (!matched) {
      return next(new UnAuthorizedError('Неверные email или password'));
    }

    const token = generateJwt({ _id: userInfo._id });

    res.cookie('jwt', token, {
      maxAge: 3600000 * 24 * 30,
      httpOnly: true,
      sameSite: 'None',
      secure: true,
    });

    res.send({ userId: userInfo._id });
  } catch (error) {
    return next(error);
  }
};
