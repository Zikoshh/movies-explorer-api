import { HTTP_CODES } from '../config.mjs';

class NotFoundError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = HTTP_CODES.NOT_FOUND_ERROR;
  }
}

export default NotFoundError;
