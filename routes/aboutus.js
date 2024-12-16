import Router from 'express-promise-router';
import {getText, updateText} from '../controler/aboutus.js';
import {checkJWT} from '../middleware/identification/jwt.js';
import {aboutUsValidatorMiddleware as AVM} from '../middleware/validation.js';

const router = Router();

router.get('/about', getText);

//admin
router.patch('/update', checkJWT, AVM.update, updateText);

export default router;