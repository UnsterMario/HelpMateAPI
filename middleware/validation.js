import * as userValidator from './validator/user.js';
import * as productValidator from './validator/product.js';
import * as purchaseValidator from './validator/purchase.js';
import * as managerValidator from './validator/manager.js';

/**
 * @swagger
 * components:
 *  responses:
 *      ValidationError:
 *          description: the error(s) described
 *          content:
 *              text/plain:
 *                  schema:
 *                      type: string
 */
export const userValidatorMiddleware = {
    login: async (req, res, next) => {
        try {
            req.val = await userValidator.login.validate(req.body);
            next();
        } catch (e) {
            res.status(400).send(e.messages);
        }
    },
    user : async (req, res, next) => {
        try {
            req.val = await userValidator.user.validate(req.body);
            next();
        } catch (e){
            res.status(400).send(e.messages);
        }
    },
    update: async (req, res, next) => {
        try {
            req.val = await userValidator.update.validate(req.body);
            next();
        } catch (e){
            res.status(400).send(e.messages);
        }
    },
    admin: async (req, res, next) => {
        try {
            req.val = await userValidator.admin.validate(req.body);
            next();
        } catch (e) {
            res.status(400).send(e.messages);
        }
    }
};

export const productValidatorMiddlewares = {
    searchedProduct : async (req, res, next) => {
        try {
            req.val  = await productValidator.searchedProduct.validate(req.params);
            next();
        } catch (e) {
            res.status(400).send(e.messages);
        }
    },
    productToAdd: async(req, res, next) => {
        try {
            req.val  = await productValidator.productToAdd.validate(req.body);
            next();
        } catch (e) {
            res.status(400).send(e.messages);
        }
    },
    productToUpdate: async(req, res, next) => {
        try {
            req.val  = await productValidator.productToUpdate.validate(req.body);
            next();
        } catch (e) {
            res.status(400).send(e.messages);
        }
    },
    productToDelete: async(req, res, next) => {
        try {
            req.val  = await productValidator.productToDelete.validate(req.params);
            next();
        } catch (e) {
            res.status(400).send(e.messages);
        }
    }
};

export const purchaseValidatorMiddlewares = {
    purchaseToAdd : async (req, res, next) => {
        try {
            req.val = await purchaseValidator.purchaseToAdd.validate(req.body);
            next();
        } catch (e) {
            res.status(400).send(e.messages);
        }
    },
    purchaseWithRegistration : async (req, res, next) => {
        try {
            req.val = await purchaseValidator.purchaseWithRegistration.validate(req.body);
            next();
        } catch (e) {
            res.status(400).send(e.messages);
        }
    }
};

export const managerValidatorMiddleware = {
    updateClient: async (req, res, next) => {
        try {
            req.val = await managerValidator.client.validate(req.body);
            next();
        } catch (e) {
            res.status(400).send(e.messages);
        }
    }
};
