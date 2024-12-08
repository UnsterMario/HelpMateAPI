import {pool} from '../database/database.js';
import * as productModel from '../model/productDB.js';

/**
 * @swagger
 * components:
 *  schemas:
 *      Product:
 *          type: object
 *          properties:
 *              id:
 *                  type: integer
 *              name:
 *                  type: string
 *              price:
 *                  type: number
 */
/**
 * @swagger
 * components:
 *  responses:
 *      getProduct:
 *          description: the product
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/Product'
 */
export const getProduct = async (req, res)=> {
    try {
        const produit = await productModel.readProduct(pool, req.val);
        if (produit) {
            res.json(produit);
        } else {
            res.sendStatus(404);
        }
    } catch (err) {
        res.sendStatus(500);
    }
};

/**
 * @swagger
 * components:
 *  responses:
 *      ProductAdded:
 *          description: the product
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          id:
 *                              type: integer
 */
export const addProduct = async (req, res) => {
    try {
        const id = await productModel.createProduct(pool, req.val);
        res.status(201).json({id});
    } catch (err) {
        res.sendStatus(500);
    }
};

export const updateProduct = async (req, res) => {
    try {
        await productModel.updateProduct(pool, req.val);
        res.sendStatus(204);
    } catch (err) {
        res.sendStatus(500);
    }
};

export const deleteProduct = async (req, res) => {
    try {
        await productModel.deleteProduct(pool, req.val);
        res.sendStatus(204);
    } catch (err) {
        res.sendStatus(500);
    }
};
