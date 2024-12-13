import express from 'express';
import { createConversationHandler, getConversationsHandler, getConversationIDHandler } from '../controler/conversation.js';

const router = express.Router();

router.post('/', createConversationHandler);
router.get('/:userID', getConversationsHandler);
router.get('/conversation-between/:user1/:user2', getConversationIDHandler);

export default router;
