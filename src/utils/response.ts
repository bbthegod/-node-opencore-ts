import jwt from 'jsonwebtoken';
import httpStatus from 'http-status';
import { JWT_SECRET } from '../config/config';

export function successResponse(user, res) {
  const token = jwt.sign({ id: user.id, username: user.username}, JWT_SECRET);
  res.status(httpStatus.OK).json({
    token,
    user: {
      id: user.id,
      username: user.username
    },
  });
}

export function errorResponse(res) {
  return res.status(httpStatus.UNAUTHORIZED).json('UNAUTHORIZED');
}
