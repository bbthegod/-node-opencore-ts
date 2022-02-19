import express from 'express';
import { validate } from 'express-validation';
import validator from './validation';
import * as controller from './controller';
import master from '../../middleware/master';
import authentication from '../../middleware/authentication';

const router = express.Router();
router.route('/login').post(master, validate(validator.login), controller.login);
router.route('/signup').post(master, validate(validator.signup), controller.signup);
router.route('/check').get(authentication(['user', 'admin']), controller.check);

export default router;
