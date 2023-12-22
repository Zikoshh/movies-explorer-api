import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import User from '../models/users.mjs';
import NotFoundError from '../errors/NotFoundError.mjs';
import DuplicateError from '../errors/DuplicateError.mjs';
import BadRequestError from '../errors/BadRequestError.mjs';
import UnAuthorizedError from '../errors/UnAuthorizedError.mjs';
import generateJwt from '../utils/generateJwt.mjs';
import { HTTP_CODES, MONGODB_DUPLICATE_ERROR } from '../config.mjs';

export const getUserByJwt = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id, '_id name email').orFail(
      () => next(new NotFoundError('Пользователь с таким id не найден.')),
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
    }).orFail(() => next(new NotFoundError('Пользователь с таким id не найден.')));

    return res.send(newUserInfo);
  } catch (error) {
    if (error.code === MONGODB_DUPLICATE_ERROR) {
      return next(new DuplicateError('Пользователь с таким email уже существует.'));
    }

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
      .status(HTTP_CODES.CREATED_SUCCES)
      .send({ _id: newUser._id, name: newUser.name, email: newUser.email });
  } catch (error) {
    if (error.code === MONGODB_DUPLICATE_ERROR) {
      return next(new DuplicateError('Пользователь с таким email уже существует.'));
    }

    if (error instanceof mongoose.Error.ValidationError) {
      return next(new BadRequestError(error.message));
    }

    return next(error);
  }
};

export const login = async (req, res, next) => {
  try {
    const userInfo = await User.findOne({ email: req.body.email })
      .select('+password')
      .orFail(() => next(new UnAuthorizedError('Вы ввели неправильный логин или пароль.')));

    const matched = await bcrypt.compare(req.body.password, userInfo.password);

    if (!matched) {
      return next(new UnAuthorizedError('Вы ввели неправильный логин или пароль.'));
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
