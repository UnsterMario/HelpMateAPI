import express from 'express';
import { createMessageHandler, getMessagesHandler, getLastMessageHandler } from '../controler/message.js';

const router = express.Router();

router.post('/:conversationId', createMessageHandler);
router.get('/:conversationId', getMessagesHandler);
router.get('/last/:conversationId', getLastMessageHandler);


export default router;
