import Router from 'express-promise-router';

import {default as userRouter} from './user.js';
import {default as typeServiceRouter} from './typeservice.js';
import {default as serviceRouter} from './service.js';
import {default as conversationRouter} from './conversation.js';
import {default as messageRouter} from './message.js';
import {default as aboutRouter} from './aboutus.js';

const router = Router();

router.use('/user', userRouter);
router.use('/typeservice', typeServiceRouter);
router.use('/service',serviceRouter);
router.use('/conversation',conversationRouter);
router.use('/message',messageRouter);
router.use('/about',aboutRouter);

export default router;