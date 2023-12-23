import { HTTP_CODES } from '../config.mjs';

class BadRequestError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = HTTP_CODES.BAD_REQUEST_ERROR;
  }
}

export default BadRequestError;
