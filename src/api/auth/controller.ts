import httpStatus from 'http-status';
import User from '../user/model';
const { successResponse, errorResponse } = require('../../utils/response');

export async function login(req, res) {
  const { username, password } = req.body;
  const user = await User.findOne({ username });
  if (!user) return errorResponse(res);
  let loginResult = await User.Login(user, password);
  if (!loginResult) return errorResponse(res);
  return successResponse(user, res);
}

export async function signup(req, res) {
  const { username, password } = req.body;
  const duplicate = await User.findOne({ username });
  if (duplicate) return res.status(httpStatus.CONFLICT).json('Username adready exits');
  let user = new User({ username, password });
  user = await user.save();
  return res.json(user);
}

export function check(req, res) {
  res.status(httpStatus.OK).end();
}