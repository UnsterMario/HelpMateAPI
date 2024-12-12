// Fonction pour vérifier si une conversation existe déjà entre deux utilisateurs
export const conversationExists = async ({ pool, user1, user2 }) => {
    const { rows } = await pool.query(
        'SELECT COUNT(*) FROM Conversation WHERE (user1 = $1 AND user2 = $2) OR (user1 = $2 AND user2 = $1)',
        [user1, user2]
    );
    return rows[0].count > 0;
};

// Fonction pour créer une nouvelle conversation
export const createConversation = async ({ pool, user1, user2 }) => {
    if (user1 >= user2) {
        throw new Error('user1 doit être inférieur à user2');
    }

    const { rows } = await pool.query(
        `INSERT INTO Conversation(user1, user2) 
         VALUES ($1, $2) 
         RETURNING user1, user2`,
        [user1, user2]
    );
    return rows[0]; // Retourne la conversation créée
};

// Fonction pour récupérer les conversations d'un utilisateur
export const getConversationsByUser = async ({ pool, userID }) => {
    const { rows } = await pool.query(
        'SELECT user1, user2, conversationid FROM Conversation WHERE user1 = $1 OR user2 = $1',
        [userID]
    );
    return rows; // Retourne la liste des conversations
};

export const getConversationID = async ({ user1, user2, pool }) => {
    if (!pool) {
        throw new Error('Le pool de base de données n\'est pas défini');
    }

    const query = `
        SELECT conversationid
        FROM Conversation
        WHERE (user1 = $1 AND user2 = $2) OR (user1 = $2 AND user2 = $1)
        LIMIT 1;
    `;
    const values = [user1, user2];

    try {
        console.log('Executing query:', query);
        console.log('With values:', values);

        const result = await pool.query(query, values);
        
        if (result.rows.length > 0) {
            return result.rows[0].conversationid;  // Retourne l'ID de la conversation
        }
        return null;  // Si aucune conversation n'est trouvée
    } catch (error) {
        console.error('Error executing query:', error);
        throw error;
    }
};


