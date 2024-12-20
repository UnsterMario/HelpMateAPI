
export const conversationExists = async ({ pool, user1, user2 }) => {
    const { rows } = await pool.query(
        'SELECT COUNT(*) FROM Conversation WHERE (user1 = $1 AND user2 = $2) OR (user1 = $2 AND user2 = $1)',
        [user1, user2]
    );
    return parseInt(rows[0].count, 10) > 0;
};


export const createConversation = async ({ pool, user1, user2 }) => {
    const { rows } = await pool.query(
        `INSERT INTO Conversation(user1, user2) 
         VALUES ($1, $2) 
         RETURNING user1, user2, conversationid`, 
        [user1, user2]
    );
    return rows[0];
};


export const getConversationsByUser = async ({ pool, userID }) => {
    const { rows } = await pool.query(
        'SELECT user1, user2, conversationid FROM Conversation WHERE user1 = $1 OR user2 = $1',
        [userID]
    );
    return rows;
};

export const getAllConversations = async ({ pool }) => {
    const { rows } = await pool.query(`SELECT 
    c.conversationID,
    u1.userID AS user1ID, 
    u1.firstName AS user1FirstName, 
    u1.lastName AS user1LastName,
    u2.userID AS user2ID, 
    u2.firstName AS user2FirstName, 
    u2.lastName AS user2LastName
FROM 
    Conversation c
JOIN 
    AppUser u1 ON c.user1 = u1.userID
JOIN 
    AppUser u2 ON c.user2 = u2.userID;`);
    return rows; 
}

export const getConversationID = async ({ user1, user2, pool }) => {
    if (!pool) {
        throw new Error('Pool is not defined');
    }
    const query = `
        SELECT conversationid
        FROM Conversation
        WHERE (user1 = $1 AND user2 = $2) OR (user1 = $2 AND user2 = $1)
        LIMIT 1;
    `;
    const values = [parseInt(user1), parseInt(user2)]; 
    try {
        const result = await pool.query(query, values);
        
        if (result.rows.length > 0) {
            return result.rows[0].conversationid;
        }
        return null;
    } catch (error) {
        console.error('Error executing query:', error);
        throw error;
    }
};

export const deleteConversations = async (SQLClient, userID) => {
    try {
        await SQLClient.query(`
            DELETE FROM Conversation
            WHERE user1 = $1 OR user2 = $1
        `, [userID]);
    } catch (error) {
        throw new Error(`Failed to delete conversations: ${error.message}`);
    }
};




