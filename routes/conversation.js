import express from 'express';
import { createConversationHandler, getConversationsHandler, getAllConversationsHandler } from '../controler/conversation.js';
import {checkJWT} from '../middleware/identification/jwt.js';

const router = express.Router();

router.post('/', createConversationHandler);
router.get('/:userID', getConversationsHandler);

//admin
router.get('/', checkJWT, getAllConversationsHandler);

export default router;
