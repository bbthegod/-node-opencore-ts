import { UNAUTHORIZED } from 'http-status';
import { MASTER_SECRET } from '../config/config';

export default function (req, res, next) {
  if (req.token && req.token === MASTER_SECRET) return next();
  return res.status(UNAUTHORIZED).json('MASTER KEY IS REQUIRED OR NOT CORRECT');
}
