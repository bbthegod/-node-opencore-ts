import httpStatus from 'http-status';
import User from './model';

export async function load(req, res, next, id) {
  const user = await User.findById(id);
  if (!user) return res.status(httpStatus.NOT_FOUND).end();
  req.user = user;
  return next();
}

export function get(req, res) {
  return res.json(req.user);
}

export async function create(req, res, next) {
  const { username, password, role } = req.body;
  const duplicate = await User.findOne({ username });
  if (duplicate) return res.status(httpStatus.CONFLICT).json('Username already exist');
  const user = new User({ username, password, role });
  user.save();
  return res.json(user);
}

export function update(req, res) {
  const { password, role } = req.body;
  const { user } = req;
  user.password = password;
  user.role = role;
  user.save();
  return res.json(user);
}

export async function list(req, res) {
  const { limit = 50, skip = 0, filter, sort } = req.query;
  const users = await User.List({ limit, skip, filter, sort });
  return res.json(users);
}

export async function remove(req, res) {
  const { user } = req;
  user.remove();
  return res.json(user);
}
