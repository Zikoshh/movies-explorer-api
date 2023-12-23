import { HTTP_CODES } from '../config.mjs';

class DuplicateError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = HTTP_CODES.DUPLICATE_ERROR;
  }
}

export default DuplicateError;
