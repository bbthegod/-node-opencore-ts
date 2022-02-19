import { NOT_FOUND } from 'http-status';
import { ValidationError } from 'express-validation';
import { ENVIRONMENT } from '../config/config';
import ErrorHandler from '../utils/ErrorHandler';

export function handler(err, req, res, next) {
  const error = new ErrorHandler(err.message, err.status, ENVIRONMENT === 'development' ? err.stack : null);
  return next(error);
}

export function converter(err, req, res, next) {
  if (err instanceof ValidationError) {
    return res.status(err.statusCode).json({
      message: err.error,
      stack: err.details,
    });
  }
  if (!(err instanceof ErrorHandler)) {
    const error = new ErrorHandler(err.message, err.status);
    return next(error);
  }
  return next(err);
}

export function notFound(req, res) {
  return res.status(NOT_FOUND).json('No API !');
}
