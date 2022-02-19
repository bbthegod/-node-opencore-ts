import express from 'express';
import user from './api/user/route';
import auth from './api/auth/route';
// GENERATE NEW IMPORT ABOVE, DO NOT DELETE IT

const router = express.Router();
router.get('/health', (req, res) => res.send('OK'));
router.use('/user', user);
router.use('/auth', auth);
// GENERATE NEW ROUTER ABOVE, DO NOT DELETE IT

export default router;
