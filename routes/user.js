// remarque: - on peut update le password mais pas dans l'interface mobile ?
//           - lors de la creation d'un utilisateur, on doit extraire la localisation du telephone ... Et s'il était en deplacement ?




import Router from 'express-promise-router';
import {
    login,
    registration,
    //normal user
    getMyInfo,
    updateMe,
    deleteMe,
    //admin user
    adminLogin,
    getAllUsers,
    updateUser,
    deleteUser
} from '../controler/user.js';


import {checkJWT} from '../middleware/identification/jwt.js';
import {userValidatorMiddleware as UVM} from '../middleware/validation.js';
import {checkAdmin} from '../middleware/identification/admin.js';


const router = Router();

// Routes pour les utilisateurs réguliers
router.post('/login', UVM.login, login);
router.post('/registration', UVM.user, registration);
router.get('/me', checkJWT, getMyInfo);
router.patch('/me', checkJWT, UVM.update, updateMe);
router.delete('/me', checkJWT, deleteMe);

// Routes pour les administrateurs
router.post('/admin/login', UVM.login,adminLogin);
router.post('/admin/users', checkJWT, checkAdmin, UVM.admin, registration);
router.get('/admin/users', checkJWT, checkAdmin, getAllUsers);
router.patch('/admin/users/:id/role', checkJWT, checkAdmin, UVM.update, updateUser);
router.delete('/admin/users/:id', checkJWT, checkAdmin, deleteUser);

export default router;