import { createConversation, getConversationsByUser, getConversationID, conversationExists, getAllConversations } from '../model/conversation.js';
import { pool } from '../database/database.js';

export const createConversationHandler = async (req, res) => {
    const { user1, user2 } = req.body;
    try {
        if (user1 >= user2) {
            return res.status(400).json({ error: 'user1 must be less than user2' });
        }
        const conversation = await createConversation({ pool, user1, user2 });
        res.status(201).json({ message: 'Conversation created successfully', conversationID: conversation.conversationid });
    } catch (error) {
        console.error('Error creating conversation:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

export const getConversationsHandler = async (req, res) => {
    const userID = parseInt(req.params.userID);
    try {
        const conversations = await getConversationsByUser({ pool, userID });
        res.status(200).json(conversations);
    } catch (error) {
        console.error('Error fetching conversations:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

export const getAllConversationsHandler = async (req, res) => {
    try {
        const conversations = await getAllConversations({ pool });
        res.status(200).json(conversations);
    } catch (error) {
        console.error('Error fetching conversations:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

export const getConversationIDHandler = async (req, res) => {
    const { user1, user2 } = req.params; // Get users from request parameters
    try {
        const conversationID = await getConversationID({
            user1: parseInt(user1, 10), // Parse as integers
            user2: parseInt(user2, 10), // Parse as integers
            pool,
        });

        if (!conversationID) {
            return res.status(404).json({ error: 'Conversation not found' });
        }

        res.status(200).json({ conversationID });
    } catch (error) {
        console.error('Error retrieving conversation ID:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

export const conversationExistsHandler = async (req, res) => {
    const { user1, user2 } = req.params; // Récupération depuis req.params
    try {
        const exists = await conversationExists({ 
            pool, 
            user1: parseInt(user1, 10), // Assurez-vous que ce sont des entiers
            user2: parseInt(user2, 10),
        });
        res.status(200).json({ exists });
    } catch (error) {
        console.error('Error checking conversation:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};


