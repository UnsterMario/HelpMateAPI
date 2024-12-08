export const checkAdmin = (req, res, next) => {
    if (req.session && req.session.isAdmin) {
        next();
    } else {
        res.sendStatus(403); // Forbidden
    }
};