import express from 'express';
import * as controller from './controller';
import authentication from '../../middleware/authentication';

const router = express.Router();

router
  .route('/')
  .get(authentication(['admin', 'user']), controller.list)
  .post(controller.create);

router
  .route('/:userId')
  .get(authentication(['admin', 'user']), controller.get)
  .put(authentication(['admin', 'user']), controller.update)
  .delete(authentication(['admin', 'user']), controller.remove);

router.param('userId', controller.load);

export default router;
