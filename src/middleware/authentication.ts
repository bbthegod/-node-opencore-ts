import { verify } from 'jsonwebtoken';
import { UNAUTHORIZED } from 'http-status';
import { JWT_SECRET } from '../config/config';
import User from '../api/user/model';

function authentication(array) {
  return async (req, res, next) => {
    verify(req.token, JWT_SECRET, async (err, data) => {
      if (err) return next(err);
      const filter = { createdAt: 0, updatedAt: 0 };
      const user = await User.findOne({ username: data.username }, filter);
      if (user && array.indexOf(user.role) >= 0) {
        req.auth = user;
        return next();
      }
      return res.status(UNAUTHORIZED).json('UNAUTHORIZED');
    });
  };
}

export default authentication;
