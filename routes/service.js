import Router from 'express-promise-router';
import {
    createServiceHandler,
    getAllServicesHandler,
    getServiceByIDHandler,
    updateServiceHandler,
    deleteServiceHandler,
    getServicesByUserHandler,
} from '../controler/service.js';

import { checkJWT } from '../middleware/identification/jwt.js';
import { serviceValidatorMiddleware as SVM } from '../middleware/validation.js';

const router = Router();

/**
 * @swagger
 * /services:
 *   get:
 *     summary: Get all services
 *     tags: [Service]
 *     responses:
 *       200:
 *         description: List of services
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/ServiceCreateSchema'
 *       500:
 *         description: Internal server error
 */
router.get('/services', getAllServicesHandler); // Récupérer tous les services

/**
 * @swagger
 * /service/{id}:
 *   get:
 *     summary: Get service by ID
 *     tags: [Service]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Service ID
 *     responses:
 *       200:
 *         description: Service info
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ServiceCreateSchema'
 *       400:
 *         description: Service ID is required
 *       404:
 *         description: Service not found
 *       500:
 *         description: Internal server error
 */
router.get('/service/:id', getServiceByIDHandler); // Récupérer un service par son ID

/**
 * @swagger
 * /user/{userID}/services:
 *   get:
 *     summary: Get services by user ID
 *     tags: [Service]
 *     parameters:
 *       - in: path
 *         name: userID
 *         schema:
 *           type: integer
 *         required: true
 *         description: User ID
 *     responses:
 *       200:
 *         description: List of services by user
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/ServiceCreateSchema'
 *       400:
 *         description: User ID is required
 *       500:
 *         description: Internal server error
 */
router.get('/user/:userID/services', getServicesByUserHandler); // Récupérer les services liés à un utilisateur

/**
 * @swagger
 * /service:
 *   post:
 *     summary: Create a new service
 *     tags: [Service]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ServiceCreateSchema'
 *     responses:
 *       201:
 *         description: Service created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ServiceCreateSchema'
 *       400:
 *         description: Missing required fields
 *       500:
 *         description: Internal server error
 */
router.post('/service', checkJWT, SVM.create, createServiceHandler); // Créer un service

/**
 * @swagger
 * /service/{id}:
 *   patch:
 *     summary: Update service by ID
 *     tags: [Service]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Service ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ServiceUpdateSchema'
 *     responses:
 *       204:
 *         description: Service updated
 *       400:
 *         description: Service ID is required or No fields to update provided
 *       500:
 *         description: Internal server error
 */
router.patch('/service/:id', checkJWT, SVM.update, updateServiceHandler); // Mettre à jour un service

/**
 * @swagger
 * /service/{id}:
 *   delete:
 *     summary: Delete service by ID
 *     tags: [Service]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Service ID
 *     responses:
 *       204:
 *         description: Service deleted
 *       400:
 *         description: Service ID is required
 *       500:
 *         description: Internal server error
 */
router.delete('/:id', checkJWT, deleteServiceHandler); // Supprimer un service

export default router;
