import * as userValidator from './validator/user.js';
import * as typeServiceValidator from './validator/typeservice.js';
import * as serviceValidator from './validator/service.js';
import * as aboutUsValidator from './validator/aboutus.js';

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

export const aboutUsValidatorMiddleware = {
    create: async (req, res, next) => {
        try {
            req.val = await aboutUsValidator.create.validate(req.body);
            next();
        } catch (e) {
            res.status(400).send(e.messages);
        }
    },
    update: async (req, res, next) => {
        try {
            req.val = await aboutUsValidator.update.validate(req.body);
            next();
        } catch (e) {
            res.status(400).send(e.messages);
        }
    },
};      

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
    },
    userWithService: async (req, res, next) => {
        try {
            req.val = await userValidator.userWithService.validate(req.body);
            next();
        } catch (e) {
            res.status(400).send(e.messages);
        }
    }
};

export const serviceValidatorMiddleware = {
    create: async (req, res, next) => {
        try {
            console.log('serviceValidatorMiddleware.create', req.body);
            req.val = await serviceValidator.create.validate(req.body);
            next();
        } catch (e) {
            console.log('serviceValidatorMiddleware.create.error', e);
            res.status(400).send(e.messages);
        }
    },
    update: async (req, res, next) => {
        try {
            req.val = await serviceValidator.update.validate(req.body);
            next();
        } catch (e) {
            res.status(400).send(e.messages);
        }
    },
    delete: async (req, res, next) => {
        try {
            req.val = await serviceValidator.delete.validate(req.params);
            next();
        } catch (e) {
            res.status(400).send(e.messages);
        }
    },
    getByID: async (req, res, next) => {
        try {
            req.val = await serviceValidator.getByID.validate(req.params);
            next();
        } catch (e) {
            res.status(400).send(e.messages);
        }
    },
    getByUser: async (req, res, next) => {
        try {
            req.val = await serviceValidator.getByUser.validate(req.params);
            next();
        } catch (e) {
            res.status(400).send(e.messages);
        }
    },
};



export const typeServiceValidatorMiddleware = {
    create: async (req, res, next) => {
        try {
            req.val = await typeServiceValidator.create.validate(req.body);
            next();
        } catch (e) {
            res.status(400).send(e.messages);
        }
    },
    update: async (req, res, next) => {
        try {
            req.val = await typeServiceValidator.update.validate(req.body);
            next();
        } catch (e) {
            res.status(400).send(e.messages);
        }
    },
    delete: async (req, res, next) => {
        try {
            req.val = await typeServiceValidator.delete.validate(req.params);
            next();
        } catch (e) {
            res.status(400).send(e.messages);
        }
    },
    getByID: async (req, res, next) => {
        try {
            req.val = await typeServiceValidator.getByID.validate(req.params);
            next();
        } catch (e) {
            res.status(400).send(e.messages);
        }
    }
};

