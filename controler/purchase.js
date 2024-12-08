import {createUser} from '../model/client.js';
import {createPurchase} from '../model/purchase.js';
import {pool} from '../database/database.js';

/**
 * @swagger
 * components:
 *  responses:
 *      PurchaseAdded:
 *          description: The purchase is saved
 */
export const postPurchase = async (req, res) => {
   try {
       await createPurchase(pool, req.val, req.session.id);
       res.sendStatus(201);
   } catch (e) {
       console.error(e);
       res.sendStatus(500);
   }
};

/**
 * @swagger
 * components:
 *  responses:
 *      purchaseWithRegistration:
 *          description: The purchase and the client are saved
 */
export const purchaseWithRegistration = async (req, res) => {
    let SQLClient;
    try {
        SQLClient = await pool.connect();
        await SQLClient.query('BEGIN');
        const {id : clientID} = await createUser(SQLClient, req.val.client);
        await createPurchase(SQLClient, req.val.purchase, clientID);
        await SQLClient.query('COMMIT');
        res.sendStatus(201);
    } catch (err) {
        console.error(err);
        try {
            if(SQLClient){
                await SQLClient.query('ROLLBACK');
            }
        } catch (err) {
            console.error(err);
        } finally {
            res.sendStatus(500);
        }
    } finally {
        if(SQLClient){
            SQLClient.release();
        }
    }
};