import express from 'express';
import { createMessageHandler, getMessagesHandler, getLastMessageHandler } from '../controler/message.js';
import {checkJWT} from '../middleware/identification/jwt.js';

const router = express.Router();

router.post('/:conversationId', createMessageHandler);
router.get('/:conversationId', getMessagesHandler);
router.get('/last/:conversationId', getLastMessageHandler);

//admin
//router.patch('/:id', checkJWT, updateMessageHandler);
//router.delete('/:id', checkJWT, deleteMessageHandler);


export default router;
