exports.validateConversation = (req, res, next) => {
    const { user1, user2 } = req.body;
    if (!user1 || !user2 || typeof user1 !== 'number' || typeof user2 !== 'number') {
        return res.status(400).json({ error: 'Invalid user IDs' });
    }
    next();
};
