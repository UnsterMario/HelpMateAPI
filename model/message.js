// message.js (Modèle)

export const createMessage = async ({ conversationID, senderID, content, pool }) => {
    
    console.log("dans create : ",conversationID, senderID, content);
    if (!conversationID || !senderID || !content) {
        throw new Error('conversationID, senderID and content are required');
    }
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
    return result.rows; 
};

export const deleteMessage = async ({ messageID, pool }) => {
    const query = `
        DELETE FROM Message
        WHERE messageID = $1
        RETURNING *;
    `;
    const values = [messageID];

    const result = await pool.query(query, values);
    return result.rowCount > 0;
};


export const deleteMessages = async (SQLClient, userID) => {
    try {
        await SQLClient.query(`
            DELETE FROM Message
            WHERE conversationID IN (
                SELECT conversationID FROM Conversation WHERE user1 = $1 OR user2 = $1
            )
        `, [userID]);
    } catch (error) {
        throw new Error(`Failed to delete messages: ${error.message}`);
    }
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
    return result.rows[0];
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
    return result.rows[0];
}