import express from 'express';
import { createMessageHandler, getMessagesHandler, getLastMessageHandler, updateMessageHandler, deleteMessageHandler } from '../controler/message.js';
import {checkJWT} from '../middleware/identification/jwt.js';
import  {messageValidatorMiddleware as MVM} from '../middleware/validation.js';
const router = express.Router();

router.post('/:conversationId', MVM.create, createMessageHandler);
router.get('/:conversationId', getMessagesHandler);
router.get('/last/:conversationId', getLastMessageHandler);

//admin
router.patch('/:id', checkJWT, MVM.update, updateMessageHandler);
router.delete('/:id', checkJWT, deleteMessageHandler);


export default router;
