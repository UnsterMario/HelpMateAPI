import Router from 'express-promise-router';
import {default as productRouter} from './product.js';
import {default as managerRouter} from './manager.js';
import {default as purchaseRouter} from './purchase.js';
import {default as clientRouter} from './client.js';
import {default as userRouter} from './user.js';
import {default as typeServiceRouter} from './typeservice.js';
import {default as serviceRouter} from './service.js';
import {default as conversationRouter} from './conversation.js';
import {default as messageRouter} from './message.js';

const router = Router();

router.use('/user', userRouter);
router.use('/client', clientRouter);
router.use('/product', productRouter);
router.use('/manager', managerRouter);
router.use('/purchase', purchaseRouter);
router.use('/typeservice', typeServiceRouter);
router.use('/service',serviceRouter);
router.use('/conversation',conversationRouter);
router.use('/message',messageRouter);

export default router;