// messageController.js (Contrôleur)

import { createMessage, getMessagesByConversation, deleteMessage, getLastMessageByConversation } from '../model/message.js';
import { getConversationID } from '../model/conversation.js'; 

import { pool } from '../database/database.js';  

export const createMessageHandler = async (req, res) => {
    console.log("Requête reçue:", req.body); // Ajout du log
    const { conversationid, senderid, content } = req.body;

    try {
        if (!content || content.trim() === '') {
            return res.status(400).json({ error: 'Le contenu du message ne peut pas être vide' });
        }

        // Vérifier si senderid est bien défini
        if (!senderid) {
            return res.status(400).json({ error: 'Le senderID est requis' });
        }

        const result = await createMessage({
            conversationID: conversationid,
            senderID: senderid,
            content,
            pool
        });

        res.status(201).json({ message: 'Message envoyé avec succès', data: result });
    } catch (error) {
        console.error('Erreur lors de la création du message:', error);
        res.status(500).json({ error: 'Erreur serveur interne' });
    }
};



export const getMessagesHandler = async (req, res) => {
    const conversationID = parseInt(req.params.conversationId, 10);
    try {
        // Vérifier si l'ID de la conversation existe dans la base de données
        const messages = await getMessagesByConversation({ conversationID, pool });
        if (!messages) {
            return res.status(404).json({ error: 'Messages introuvables' });
        }
        res.status(200).json(messages);
    } catch (error) {
        console.error('Erreur lors de la récupération des messages:', error);
        res.status(500).json({ error: 'Erreur serveur interne' });
    }
};


export const deleteMessageHandler = async (req, res) => {
    const { messageID } = req.params;
    try {
        const success = await deleteMessage({ messageID, pool });
        if (!success) {
            return res.status(404).json({ error: 'Message introuvable' });
        }

        res.status(200).json({ message: 'Message supprimé avec succès' });
    } catch (error) {
        console.error('Erreur lors de la suppression du message:', error);
        res.status(500).json({ error: 'Erreur serveur interne' });
    }
};

export const getLastMessageHandler = async (req, res) => {
    const conversationID = parseInt(req.params.conversationId, 10);

    try {
        // Récupérer le dernier message de la conversation
        const lastMessage = await getLastMessageByConversation({ conversationID, pool });

        if (!lastMessage) {
            return res.status(404).json({ error: 'Aucun message trouvé pour cette conversation' });
        }

        // Retourne le dernier message avec les détails
        res.status(200).json(lastMessage);
    } catch (error) {
        console.error('Erreur lors de la récupération du dernier message:', error);
        res.status(500).json({ error: 'Erreur serveur interne' });
    }
};