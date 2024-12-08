import Router from 'express-promise-router';

import {
    addProduct,
    updateProduct,
    getProduct, deleteProduct
} from '../controler/product.js';
//import {authBasic} from '../middleware/identification/basic.js';
import {checkJWT} from '../middleware/identification/jwt.js';
import manager from './manager.js';
import {productValidatorMiddlewares as PVM} from '../middleware/validation.js';

/*
import {
    addProduct,
    updateProduct,
    getProduct, deleteProduct
} from "../controler/productORM.js";
*/

const router = Router();

/**
 * @swagger
 * /product:
 *  post:
 *      security:
 *          - bearerAuth: []
 *      tags:
 *          - Product
 *      requestBody:
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/ProductToAdd'
 *      responses:
 *          201:
 *              $ref: '#/components/responses/ProductAdded'
 *          400:
 *              description: the error(s) described
 *              content:
 *                  text/plain:
 *                      schema:
 *                          type: string
 *          401:
 *              $ref: '#/components/responses/UnauthorizedError'
 *          403:
 *              $ref: '#/components/responses/mustBeManager'
 *          500:
 *              description: Error server
 */
router.post('/', checkJWT, manager, PVM.productToAdd, addProduct);
/**
 * @swagger
 * /product:
 *  patch:
 *      security:
 *          - bearerAuth: []
 *      tags:
 *          - Product
 *      requestBody:
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/ProductToUpdate'
 *      responses:
 *          204:
 *              description: product updated
 *          401:
 *              $ref: '#/components/responses/UnauthorizedError'
 *          403:
 *              $ref: '#/components/responses/mustBeManager'
 *          400:
 *              description: the error(s) described
 *              content:
 *                  text/plain:
 *                      schema:
 *                          type: string
 *          500:
 *              description: Error server
 */
router.patch('/', checkJWT, manager, PVM.productToUpdate, updateProduct);
/**
 * @swagger
 * /product/{id}:
 *  get:
 *      security:
 *          - bearerAuth: []
 *      tags:
 *          - Product
 *      parameters:
 *         - in: path
 *           name: id
 *           schema:
 *             type: integer
 *           required: true
 *           description: Numeric ID of the product to get
 *      responses:
 *          200:
 *              $ref: '#/components/schemas/Product'
 *          400:
 *              description: the error(s) described
 *              content:
 *                  text/plain:
 *                      schema:
 *                          type: string
 *          404:
 *              description: product not found
 *              content:
 *                  text/plain:
 *                      schema:
 *                          type: string
 *          500:
 *              description: Error server
 */
router.get('/:id', PVM.searchedProduct, getProduct);
/**
 * @swagger
 * /product/{id}:
 *  delete:
 *      security:
 *          - bearerAuth: []
 *      tags:
 *          - Product
 *      parameters:
 *         - in: path
 *           name: id
 *           schema:
 *             type: integer
 *           required: true
 *           description: Numeric ID of the product to delete
 *      responses:
 *          204:
 *              description: product deleted
 *          400:
 *              description: the error(s) described
 *              content:
 *                  text/plain:
 *                      schema:
 *                          type: string
 *          403:
 *              $ref: '#/components/responses/mustBeManager'
 *          401:
 *              $ref: '#/components/responses/UnauthorizedError'
 *          500:
 *              description: Error server
 */
router.delete('/:id', checkJWT, manager, PVM.productToDelete, deleteProduct);

export default router;