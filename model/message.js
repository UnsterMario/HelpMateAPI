// message.js (Modèle)

export const createMessage = async ({ conversationID, senderID, content, pool }) => {
    if (!conversationID || !senderID || !content) {
        throw new Error('Les paramètres conversationID, senderID, et content sont requis');
    }
    console.log("dans create : ",conversationID, senderID, content);
    const query = `
    INSERT INTO Message (conversationID, senderID, content, sendDate)
    VALUES ($1, $2, $3, NOW())
    RETURNING *;
    `;
    const values = [conversationID, senderID, content];
    const result = await pool.query(query, values);
    return result.rows[0];
};


export const getMessagesByConversation = async ({ conversationID, pool }) => {
    const query = `
        SELECT 
            m.messageID,
            m.sendDate,
            m.content,
            m.senderID,
            u.firstName AS senderFirstName,
            u.lastName AS senderLastName
        FROM 
            Message m
        JOIN 
            AppUser u ON m.senderID = u.userID
        WHERE 
            m.conversationID = $1
        ORDER BY 
            m.sendDate ASC;
    `;
    const values = [conversationID];

    const result = await pool.query(query, values);
    return result.rows;  // Retourne les messages de la conversation
};

export const deleteMessage = async ({ messageID, pool }) => {
    const query = `
        DELETE FROM Message
        WHERE messageID = $1
        RETURNING *;
    `;
    const values = [messageID];

    const result = await pool.query(query, values);
    return result.rowCount > 0;  // Retourne true si le message a été supprimé
};

export const getLastMessageByConversation = async ({ conversationID, pool }) => {
    const query = `
        SELECT 
            m.messageID,
            m.sendDate,
            m.content,
            m.senderID,
            u.firstName AS senderFirstName,
            u.lastName AS senderLastName
        FROM 
            Message m
        JOIN 
            AppUser u ON m.senderID = u.userID
        WHERE 
            m.conversationID = $1
        ORDER BY 
            m.sendDate DESC
        LIMIT 1;
    `;
    const values = [conversationID];

    const result = await pool.query(query, values);
    return result.rows[0];  // Retourne le dernier message de la conversation
};

export const updateMessage = async ({ messageID, content, pool }) => {
    const query = `
        UPDATE Message
        SET content = $1
        WHERE messageID = $2
        RETURNING *;
    `;
    const values = [content, messageID];

    const result = await pool.query(query, values);
    return result.rows[0];  // Retourne le message modifié
}