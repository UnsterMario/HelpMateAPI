import { 
    createService, 
    getAllServices, 
    readServiceByID, 
    updateService, 
    deleteService, 
    getServicesByUser 
} from '../model/service.js';
import {pool} from '../database/database.js';

/**
 * @swagger
 * /services:
 *   post:
 *     summary: Create a new service
 *     tags: [Service]
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
export const createServiceHandler = async (req, res) => {
    console.log('createServiceHandler : ', req.body);
    try {
        const { 
            title, 
            serviceDescription, 
            authorUser,
            providerUser, 
            serviceType, 
            latitude, 
            longitude 
        } = req.body;

        if (!title || !serviceDescription || !authorUser || !serviceType) {
            return res.status(400).json({ error: 'Missing required fields' });
        }

        const newService = await createService({ 
            pool,
            title, 
            serviceDescription, 
            authorUser, 
            providerUser, 
            serviceType, 
            latitude, 
            longitude 
        });

        res.status(201).json(newService);
    } catch (error) {
        console.error('Error creating Service:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

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
export const getAllServicesHandler = async (req, res) => {
    try {
        const services = await getAllServices(pool);
        res.status(200).json(services);
    } catch (error) {
        console.error('Error fetching all services:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

/**
 * @swagger
 * /services/{id}:
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
//c'est utilisé ca ?
export const getServiceByIDHandler = async (req, res) => {
    try {
        const { id: serviceID } = req.params;

        if (!serviceID) {
            return res.status(400).json({ error: 'Service ID is required' });
        }

        const service = await readServiceByID({ serviceID });

        if (!service) {
            return res.status(404).json({ error: 'Service not found' });
        }

        res.status(200).json(service);
    } catch (error) {
        console.error('Error fetching Service by ID:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

/**
 * @swagger
 * /services/{id}:
 *   patch:
 *     summary: Update service by ID
 *     tags: [Service]
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
export const updateServiceHandler = async (req, res) => {
    try {
        const { id: serviceID } = req.params;
        const { title, serviceDescription, providerUser, latitude, longitude } = req.body;

        if (!serviceID) {
            return res.status(400).json({ error: 'Service ID is required' });
        }

        if (!title && !serviceDescription && !providerUser && !latitude && !longitude) {
            return res.status(400).json({ error: 'No fields to update provided' });
        }

        await updateService(serviceID, { title, serviceDescription, providerUser, latitude, longitude });
        res.status(204).send();
    } catch (error) {
        console.error('Error updating Service:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

/**
 * @swagger
 * /services/{id}:
 *   delete:
 *     summary: Delete service by ID
 *     tags: [Service]
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
export const deleteServiceHandler = async (req, res) => {
    try {
        const { id: serviceID } = req.params;

        if (!serviceID) {
            return res.status(400).json({ error: 'Service ID is required' });
        }

        await deleteService(serviceID, pool);
        res.sendStatus(204);
    } catch (error) {
        console.error('Error deleting Service:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

/**
 * @swagger
 * /services/user/{userID}:
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
export const getServicesByUserHandler = async (req, res) => {
    try {
        const { userID } = req.params;

        if (!userID) {
            return res.status(400).json({ error: 'User ID is required' });
        }

        const services = await getServicesByUser(userID);
        res.status(200).json(services);
    } catch (error) {
        console.error('Error fetching Services by User:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};
