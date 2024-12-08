import {pool} from '../database/database.js';
import {updateClient as updateC} from '../model/manager.js';

export const updateClient = async (req, res) => {
    try {
        await updateC(pool, req.val);
        res.sendStatus(204);
    } catch (err) {
        res.sendStatus(500);
    }
};