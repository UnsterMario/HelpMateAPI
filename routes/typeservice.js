import Router from 'express-promise-router';
import {
    createTypeServiceHandler,
    getAllTypeServicesHandler,
    getTypeServiceByIDHandler,
    updateTypeServiceHandler,
    deleteTypeServiceHandler
} from '../controler/typeservice.js';

import { checkJWT } from '../middleware/identification/jwt.js';
import { checkAdmin } from '../middleware/identification/admin.js';
import { typeServiceValidatorMiddleware as TSM } from '../middleware/validation.js';

const router = Router();

// Routes publiques
router.get('/typeservices', getAllTypeServicesHandler);  
router.get('/typeservice/:id', getTypeServiceByIDHandler);

// Routes protégées (admin uniquement)
router.post('/typeservice', checkJWT, checkAdmin, TSM.create, createTypeServiceHandler);
router.patch('/typeservice/:id', checkJWT, checkAdmin, TSM.update, updateTypeServiceHandler);
router.delete('/typeservice/:id', checkJWT, checkAdmin, deleteTypeServiceHandler);

export default router;
