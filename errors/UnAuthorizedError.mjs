import { HTTP_CODES } from '../config.mjs';

class UnAuthorizedError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = HTTP_CODES.UNAUTHORIZED_ERROR;
  }
}

export default UnAuthorizedError;
