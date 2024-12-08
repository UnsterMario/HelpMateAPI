import Router from 'express-promise-router';
import {postPurchase, purchaseWithRegistration} from '../controler/purchase.js';
//import {authBasic} from '../middleware/identification/basic.js';
import {checkJWT} from '../middleware/identification/jwt.js';
//import {postPurchase, purchaseWithRegistration} from "../controler/purchaseORM.js";
import {purchaseValidatorMiddlewares as PVM} from '../middleware/validation.js';


const router = new Router();

/**
 * @swagger
 * /purchase:
 *  post:
 *      security:
 *         - bearerAuth: []
 *      tags:
 *          - Purchase
 *      requestBody:
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/purchaseToAdd'
 *      responses:
 *          201:
 *              $ref: '#/components/responses/PurchaseAdded'
 *          400:
 *              description: the error(s) described
 *              content:
 *                  text/plain:
 *                      schema:
 *                          type: string
 *          401:
 *              $ref: '#/components/responses/UnauthorizedError'
 *          500:
 *              description: Server error
 *
 */
router.post('/', checkJWT, PVM.purchaseToAdd, postPurchase);
/**
 * @swagger
 * /purchase/withRegistration:
 *  post:
 *      security:
 *         - bearerAuth: []
 *      tags:
 *          - Purchase
 *      requestBody:
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/purchaseWithRegistration'
 *      responses:
 *          400:
 *              description: the error(s) described
 *              content:
 *                  text/plain:
 *                      schema:
 *                          type: string
 *          401:
 *              $ref: '#/components/responses/UnauthorizedError'
 *          500:
 *              description: Server error
 *
 */
router.post('/withRegistration', PVM.purchaseWithRegistration, purchaseWithRegistration);

export default router;