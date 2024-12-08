import Router from 'express-promise-router';
import {updateClient} from '../controler/manager.js';
//import {authBasic} from '../middleware/identification/basic.js';
import {checkJWT} from '../middleware/identification/jwt.js';
import {manager} from '../middleware/authorization/mustBe.js';
import {managerValidatorMiddleware as MVM} from '../middleware/validation.js';

const router = Router();

router.patch('/client', checkJWT, manager, MVM.updateClient, updateClient);

export default router;