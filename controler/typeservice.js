import { 
    createTypeService, 
    getAllTypeServices, 
    readTypeServiceByID, 
    updateTypeService, 
    deleteTypeService 
} from '../model/typeservice.js';
import {pool} from '../database/database.js';


export const createTypeServiceHandler = async (req, res) => {
    try {
        const { typeName, typeDescription, imagePath } = req.body;

        if (!typeName || !typeDescription) {
            return res.status(400).send('Missing required fields: typeName or typeDescription');
        }

        const newTypeService = await createTypeService(req.clientSQL, { typeName, typeDescription, imagePath });
        res.status(201).json(newTypeService);
    } catch (error) {
        console.error('Error creating TypeService:', error);
        res.status(500).send('Internal server error');
    }
};

export const getAllTypeServicesHandler = async (req, res) => {
    try {
        const typeServices = await getAllTypeServices(pool); 
        res.status(200).json(typeServices);
    } catch (error) {
        console.error('Error fetching all TypeServices:', error);
        res.status(500).json({ error: error.message });
    }
};

export const getTypeServiceByIDHandler = async (req, res) => {
    try {
        const { id: typeID } = req.params;

        if (!typeID) {
            return res.status(400).send('TypeService ID is required');
        }

        const service = await readTypeServiceByID(req.clientSQL, { typeID });

        if (!service) {
            return res.status(404).send('TypeService not found');
        }

        res.status(200).json(service);
    } catch (error) {
        console.error('Error fetching TypeService by ID:', error);
        res.status(500).send('Internal server error');
    }
};

export const updateTypeServiceHandler = async (req, res) => {
    try {
        const { id: typeID } = req.params;
        const { typeName, typeDescription, imagePath } = req.body;

        if (!typeID) {
            return res.status(400).send('TypeService ID is required');
        }

        if (!typeName && !typeDescription && !imagePath) {
            return res.status(400).send('No fields to update provided');
        }

        await updateTypeService(req.clientSQL, typeID, { typeName, typeDescription, imagePath });
        res.status(204).send();
    } catch (error) {
        console.error('Error updating TypeService:', error);
        res.status(500).send('Internal server error');
    }
};

export const deleteTypeServiceHandler = async (req, res) => {
    try {
        const { id: typeID } = req.params;

        if (!typeID) {
            return res.status(400).send('TypeService ID is required');
        }

        await deleteTypeService(req.clientSQL, typeID);
        res.status(204).send();
    } catch (error) {
        console.error('Error deleting TypeService:', error);
        res.status(500).send('Internal server error');
    }
};
