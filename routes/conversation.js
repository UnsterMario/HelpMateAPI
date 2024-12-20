import express from 'express';
import { createConversationHandler, 
    getConversationsHandler, 
    getConversationIDHandler, 
    conversationExistsHandler,
    getAllConversationsHandler
 } from '../controler/conversation.js';

import {checkJWT} from '../middleware/identification/jwt.js';
import { conversationValidatorMiddleware as CVM } from '../middleware/validation.js';

const router = express.Router();

router.post('/', CVM.create, createConversationHandler);
router.get('/:userID', getConversationsHandler);
router.get('/conversation-between/:user1/:user2', getConversationIDHandler);
router.get('/exists/:user1/:user2', conversationExistsHandler);


//admin
router.get('/', checkJWT, getAllConversationsHandler);

export default router;
