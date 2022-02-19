import { INTERNAL_SERVER_ERROR } from 'http-status';

class ExtendableError extends Error {
  status: number;
  isPublic: boolean;
  constructor(message, status, isPublic) {
    super(message);
    this.name = this.constructor.name;
    this.message = message;
    this.status = status;
    this.isPublic = isPublic;
  }
}

class ErrorHandler extends ExtendableError {
  constructor(message, status = INTERNAL_SERVER_ERROR, isPublic = false) {
    super(message, status, isPublic);
  }
}

export default ErrorHandler;
