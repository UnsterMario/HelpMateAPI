import Router from 'express-promise-router';
import {
    getClientInfo,
    login,
    registration,
    updateClient
} from '../controler/client.js';


//import {authBasic} from '../middleware/identification/basic.js';
import {checkJWT} from '../middleware/identification/jwt.js';
import {userValidatorMiddleware as CVM} from '../middleware/validation.js';

const router = Router();

router.post('/registration', CVM.user, registration);
router.post('/login', CVM.login, login);
router.get('/me', checkJWT, getClientInfo);
router.patch('/me', checkJWT, CVM.update, updateClient);

export default router;