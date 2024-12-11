import express from 'express';
import { createConversationHandler, getConversationsHandler } from '../controler/conversation.js';

const router = express.Router();

router.post('/', createConversationHandler);
router.get('/:userID', getConversationsHandler);

export default router;
