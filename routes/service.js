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

// Routes publiques
router.get('/services', getAllServicesHandler); // Récupérer tous les services
router.get('/service/:id', getServiceByIDHandler); // Récupérer un service par son ID
router.get('/user/:userID/services', getServicesByUserHandler); // Récupérer les services liés à un utilisateur

// Routes protégées (authentification requise)
router.post('/service', checkJWT, SVM.create, createServiceHandler); // Créer un service
router.patch('/service/:id', checkJWT, SVM.update, updateServiceHandler); // Mettre à jour un service
router.delete('/:id', checkJWT, deleteServiceHandler); // Supprimer un service

export default router;
