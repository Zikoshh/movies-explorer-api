import { HTTP_CODES } from '../config.mjs';

const { INTERNAL_SERVER_ERROR } = HTTP_CODES;

const errorHandler = (err, req, res, next) => {
  const { statusCode = INTERNAL_SERVER_ERROR, message } = err;
  res.status(statusCode).send({
    message:
      statusCode === INTERNAL_SERVER_ERROR ? 'На сервере произошла ошибка' : message,
  });
  next();
};

export default errorHandler;
