
import { 
    createMessage, 
    getMessagesByConversation, 
    deleteMessage, 
    getLastMessageByConversation, 
    updateMessage 
} from '../model/message.js';


import { pool } from '../database/database.js';  

export const createMessageHandler = async (req, res) => {
    const { conversationid, senderid, content } = req.body;

    try {
        if (!content || content.trim() === '') {
            return res.status(400).json({ error: 'Content cannot be empty' });
        }

        // Vérifier si senderid est bien défini
        if (!senderid) {
            return res.status(400).json({ error: 'senderID is required' });
        }

        const result = await createMessage({
            conversationID: conversationid,
            senderID: senderid,
            content,
            pool
        });

        res.status(201).json({ message: 'Successfull send', data: result });
    } catch (error) {
        console.error('Error creating message:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};



export const getMessagesHandler = async (req, res) => {
    const conversationID = parseInt(req.params.conversationId, 10);
    try {
        // Vérifier si l'ID de la conversation existe dans la base de données
        const messages = await getMessagesByConversation({ conversationID, pool });
        if (!messages) {
            return res.status(404).json({ error: 'Messages not found' });
        }
        res.status(200).json(messages);
    } catch (error) {
        console.error('Error getting all messages:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};


export const deleteMessageHandler = async (req, res) => {
    const messageID = req.params.id;
    try {
        const success = await deleteMessage({ messageID, pool });
        if (!success) {
            return res.status(404).json({ error: 'Message not found' });
        }

        res.status(200).json({ message: 'Successfull deleting message' });
    } catch (error) {
        console.error('Error during the deleting:', error);
        res.status(500).json({ error: 'Internal server error admin delete message' });
    }
};

export const getLastMessageHandler = async (req, res) => {
    const conversationID = parseInt(req.params.conversationId, 10);

    try {
        // Récupérer le dernier message de la conversation
        const lastMessage = await getLastMessageByConversation({ conversationID, pool });

        if (!lastMessage) {
            return res.status(404).json({ error: 'Message not found for this conversation' });
        }

        // Retourne le dernier message avec les détails
        res.status(200).json(lastMessage);
    } catch (error) {
        console.error('Error to get the last message :', error);
        res.status(500).json({ error: 'Internal server error get last message' });
    }
};

export const updateMessageHandler = async (req, res) => {

    const id = req.params.id;
    const { content } = req.body;

    try {
        if (!content || content.trim() === '') {
            return res.status(400).json({ error: 'Content cannot be empty' });
        }

        const result = await updateMessage({ messageID: id, content, pool });

        if (!result) {
            return res.status(404).json({ error: 'Message not found' });
        }

        res.status(200).json({ message: result });
    } catch (error) {
        console.error('Error updating the message:', error);
        res.status(500).json({ error: 'Internal server error admin update message' });
    }
}