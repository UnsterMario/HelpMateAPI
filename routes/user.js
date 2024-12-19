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

/**
 * @swagger
 * /login:
 *   post:
 *     summary: User login
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Successful login
 *       401:
 *         description: Unauthorized
 */
// Routes pour les utilisateurs réguliers
router.post('/login', UVM.login, login);

/**
 * @swagger
 * /registration:
 *   post:
 *     summary: User registration
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *               name:
 *                 type: string
 *     responses:
 *       201:
 *         description: User created
 *       400:
 *         description: Bad request
 */
router.post('/registration', UVM.user, registration);

/**
 * @swagger
 * /me:
 *   get:
 *     summary: Get my info
 *     tags: [User]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: User info
 *       401:
 *         description: Unauthorized
 */
router.get('/me', checkJWT, getMyInfo);

/**
 * @swagger
 * /{id}:
 *   get:
 *     summary: Get user by ID
 *     tags: [User]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: User ID
 *     responses:
 *       200:
 *         description: User info
 *       404:
 *         description: User not found
 */
router.get('/:id', getUserById);

/**
 * @swagger
 * /me:
 *   patch:
 *     summary: Update my info
 *     tags: [User]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               name:
 *                 type: string
 *     responses:
 *       200:
 *         description: User updated
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized
 */
router.patch('/me', checkJWT, UVM.update, updateMe);

/**
 * @swagger
 * /me:
 *   delete:
 *     summary: Delete my account
 *     tags: [User]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: User deleted
 *       401:
 *         description: Unauthorized
 */
router.delete('/me', checkJWT, deleteUser);

/**
 * @swagger
 * /auth:
 *   post:
 *     summary: Check authentication
 *     tags: [User]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Authenticated
 *       401:
 *         description: Unauthorized
 */
router.post('/auth', checkJWT, checkAuth);

/**
 * @swagger
 * /admin/login:
 *   post:
 *     summary: Admin login
 *     tags: [Admin]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Successful login
 *       401:
 *         description: Unauthorized
 */
// Routes pour les administrateurs
router.post('/admin/login', UVM.login, adminLogin);

/**
 * @swagger
 * /admin/users:
 *   post:
 *     summary: Register a new admin user
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *               name:
 *                 type: string
 *     responses:
 *       201:
 *         description: Admin user created
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized
 */
router.post('/admin/users', checkJWT, checkAdmin, UVM.admin, registrationAdmin);

/**
 * @swagger
 * /admin/users:
 *   get:
 *     summary: Get all users
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of users
 *       401:
 *         description: Unauthorized
 */
router.get('/admin/users', checkJWT, checkAdmin, getAllUsers);

/**
 * @swagger
 * /admin/users/{id}:
 *   patch:
 *     summary: Update user by ID
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: User ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               name:
 *                 type: string
 *     responses:
 *       200:
 *         description: User updated
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: User not found
 */
router.patch('/admin/users/:id', checkJWT, checkAdmin, UVM.update, updateUser);

/**
 * @swagger
 * /admin/users/{id}:
 *   delete:
 *     summary: Delete user by ID
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: User ID
 *     responses:
 *       200:
 *         description: User deleted
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: User not found
 */
router.delete('/admin/users/:id', checkJWT, checkAdmin, deleteUser);

export default router;