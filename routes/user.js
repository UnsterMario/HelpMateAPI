// remarque: - on peut update le password mais pas dans l'interface mobile ?
//           - lors de la creation d'un utilisateur, on doit extraire la localisation du telephone ... Et s'il était en deplacement ?




import Router from 'express-promise-router';
import {
    login,
    registration,
    deleteUser,
    //normal user
    checkAuth,
    getMyInfo,
    updateMe,
    deleteMe,
    registerUserWithService,
    //admin user
    registrationAdmin,
    adminLogin,
    getAllUsers,
    updateUser,
    deleteUser,
    getUserById,
} from '../controler/user.js';


import {checkJWT} from '../middleware/identification/jwt.js';
import {userValidatorMiddleware as UVM} from '../middleware/validation.js';
import {checkAdmin} from '../middleware/identification/admin.js';



const router = Router();

// Routes pour les utilisateurs réguliers
router.post('/login', UVM.login, login);
router.post('/registration', UVM.user, registration);
router.get('/me', checkJWT, getMyInfo);
router.get('/:id', getUserById);
router.patch('/me', checkJWT, UVM.update, updateMe);
router.delete('/me', checkJWT, deleteUser);
router.post('/auth',checkJWT, checkAuth);
router.post('/registration-with-service', UVM.userWithService, registerUserWithService);

// Routes pour les administrateurs
router.post('/admin/login', UVM.login,adminLogin);
router.post('/admin/users', checkJWT, checkAdmin, UVM.admin, registrationAdmin);
router.get('/admin/users', checkJWT, checkAdmin, getAllUsers);
router.patch('/admin/users/:id', checkJWT, checkAdmin, UVM.update, updateUser);
router.delete('/admin/users/:id', checkJWT, checkAdmin, deleteUser);

export default router;