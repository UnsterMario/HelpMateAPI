import {pool} from '../database/database.js';
import * as userModel from '../model/user.js';
import {createService} from '../model/service.js';
import {sign, verify} from '../util/jwt.js';
import {readPerson, readAdmin} from '../model/person.js';
import { deleteMessages } from '../model/message.js';
import { deleteConversations } from '../model/conversation.js';
import { deleteUserServices } from '../model/service.js';


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
export const checkAuth = async (req, res) => {
    try {
        // Récupérer le JWT depuis l'en-tête Authorization
        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({ message: 'No bearer token' });
        }

        const token = authHeader.split(' ')[1];

        // Vérifier le JWT
        const decoded = verify(token);

        if (!decoded) {
            return res.status(401).json({ message: 'Invalid token' });
        }

        // Rechercher l'utilisateur dans la base de données
        const user = await userModel.getUserByID(pool, decoded);

        if (!user) {
            return res.status(401).json({ message: "Doesn't found an user" });
        }

        // Retourner l'utilisateur si tout est valide
        return res.status(200).json({ message: 'Successfull auth', user: user.lastname });
    } catch (err) {
        // Gérer les erreurs liées au JWT (ex: expiré, signature invalide)
        console.error(err);
        if (err.name === 'TokenExpiredError') {
            return res.status(401).json({ message: 'Expired token' });
        }
        return res.status(500).json({ message: 'Internal server error auth check' });
    }
};

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
 *             $ref: '#/components/schemas/LoginSchema'
 *     responses:
 *       201:
 *         description: User logged in successfully
 *       404:
 *         description: User not found
 *       500:
 *         description: Internal server error
 */
export const login = async (req, res) => {
    try {
        const rep = await readPerson(pool, {mailAddress: req.val.mailAddress, userPassword: req.val.userPassword});
        if(rep) {
            const jwt = sign(rep, {
                expiresIn: '8h'
            });
            res.status(201).json({ message: 'User logged in successfully', token: jwt, mailAddress: rep });
        } else {
            console.log('User not found');
            res.sendStatus(404);
        }
    } catch (err) {
        console.error(err);
        res.sendStatus(500);
    }
};

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
 *             $ref: '#/components/schemas/UserSchema'
 *     responses:
 *       201:
 *         description: User created successfully
 *       409:
 *         description: Email or phone number already used
 *       500:
 *         description: Internal server error
 */
export const registration = async (req, res) => {
    try {
        const emailExists = await userModel.userExistsMail(pool, { mailAddress: req.val.mailAddress });
        const phoneExists = await userModel.userExistsTel(pool, { telNumber: req.val.telNumber });

        if (phoneExists) {
            return res.status(409).json({ message: 'Phone number already used' });
        }
        if (emailExists) {
            return res.status(409).json({ message: 'Email already used' });
        }

        const user = await userModel.createUser(pool, req.val);
        const jwt = sign({ userID: user.userid }, { expiresIn: '8h' });
        return res.status(201).json({ message: 'User created successfully', token: jwt });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'Internal server error' });
    }
};


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
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UpdateSchema'
 *       500:
 *         description: Internal server error
 */
export const getMyInfo = async (req, res) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const decoded = verify(token);
        console.log('Decoded:', decoded);

       // Vérifiez si le token décodé est un objet ou un nombre
       const id = typeof decoded === 'object' ? decoded.userID : decoded;
       if (!id) {
           console.log('Token invalide');
           return res.status(401).json({ message: 'Token invalide' });
       }
        console.log('ID dans getMyInfo ish ish:', id);

        const info = await userModel.getUserByID(pool, id);
        console.log('Info:', info);
        res.send(info);
    } catch (e) {
        console.error('Erreur lors de la récupération des informations utilisateur:', e);
        res.sendStatus(500);
    }
};

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
 *             $ref: '#/components/schemas/UpdateSchema'
 *     responses:
 *       200:
 *         description: User updated
 *       409:
 *         description: Email or phone number already used
 *       500:
 *         description: Internal server error
 */
export const updateMe = async (req, res) => {
    try {
        const info = await userModel.updateMyInfo(pool, req.session, req.val);
        if ( info.detail && info.detail.startsWith('Key (mail')) {
            res.status(409).json({ message: 'Email already used' });
        }else {
            if (info.detail && info.detail.startsWith('Key (tel')) {
                res.status(409).json({ message: 'Phone number already used' });
            }
        }
        res.send(info);
    } catch (e) {
        console.error(e);
        res.sendStatus(500);
    }
};

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
 *         description: User deleted successfully
 *       500:
 *         description: Internal server error
 */export const deleteUser = async (req, res) => {
    let SQLClient;
    try {
        // 1. Connexion à la base et début de la transaction
        SQLClient = await pool.connect();
        await SQLClient.query('BEGIN');
        // 2. Déterminer l'ID utilisateur à supprimer
        const userID = req.params.id || req.session; // Priorité à req.params.id
        if (!userID) {
            return res.status(400).json({ message: "User ID is required" });
        }

        // 3. Suppression des données liées à l'utilisateur
        await deleteMessages(SQLClient, userID);
        await deleteConversations(SQLClient, userID);
        await deleteUserServices(SQLClient, userID);
        await userModel.deleteUser(SQLClient, userID);

        // 4. Validation de la transaction
        await SQLClient.query('COMMIT');

        // 5. Réponse réussie
        res.sendStatus(200);
    } catch (err) {
        console.error('Error during deletion:', err);

        try {
            // 6. ROLLBACK si une erreur survient
            if (SQLClient) {
                await SQLClient.query('ROLLBACK');
            }
        } catch (rollbackError) {
            console.error('Rollback failed:', rollbackError);
        } finally {
            // 7. Réponse en cas d'erreur
            res.sendStatus(500);
        }
    } finally {
        // 8. Libération du client SQL
        if (SQLClient) {
            SQLClient.release();
        }
    }
};



/**
 * @swagger
 * /admin/login:
 *   post:
 *     summary: Admin login
 *     tags: [User]
 *     description: Admin only
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/LoginSchema'
 *     responses:
 *       201:
 *         description: Admin logged in successfully
 *       403:
 *         description: Forbidden
 *       500:
 *         description: Internal server error
 */
export const adminLogin = async (req, res) => {
    try {
        const user = await readAdmin(pool, req.val);
        if (user && user.isAdmin) { 
            const jwt = sign({ userID: user.userID, isAdmin: user.isAdmin },{
                expiresIn: '24h'
            });
            res.status(201).json({
                token: jwt,
                user: {
                    lastName: user.lastName,
                    firstName: user.firstName,
                }
            });
        } else {
            res.sendStatus(403); 
        }
    } catch (err) {
        res.status(500).json({ message: 'Internal server error admin login' });
    }
};

/**
 * @swagger
 * /admin/users:
 *   post:
 *     summary: Register a new admin user
 *     tags: [User]
 *     description: Admin only
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserSchema'
 *     responses:
 *       201:
 *         description: Admin user created
 *       409:
 *         description: Email already used
 *       500:
 *         description: Internal server error
 */
export const registrationAdmin = async (req, res) => {
    try {
        
        const exist = await userModel.userExistsMail(pool, req.val.mailAddress);
        if(exist){
            res.status(409).send('Email already used');
        } else {
            const newUser = await userModel.createUserAdmin(pool, req.val);
            // renvoyer l'utilisateur créé
            res.json(newUser).status(201);
        }
    } catch (err) {
        console.error(err);
        res.sendStatus(500);
    }
};

/**
 * @swagger
 * /admin/users:
 *   get:
 *     summary: Get all users
 *     tags: [User]
 *     description: Admin only
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of users
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/AdminPanelSchema'
 *       500:
 *         description: Internal server error
 */
export const getAllUsers = async (req, res) => {
    try {
        const users = await userModel.getUsers(pool);
        res.json(users);
    } catch (e) {
        res.sendStatus(500);
    }
};

/**
 * @swagger
 * /admin/users/{id}:
 *   patch:
 *     summary: Update user by ID
 *     tags: [User]
 *     description: Admin only
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: User ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/AdminPanelSchema'
 *     responses:
 *       204:
 *         description: User updated
 *       500:
 *         description: Internal server error
 */
export const updateUser = async (req, res) => {
    try {
        const updatedUser = await userModel.updateUser(pool, req.params.id, req.val);
        res.json(updatedUser).status(204);
    } catch (e) {
        res.sendStatus(500);
    }
};

/**
 * @swagger
 * /admin/users/{id}:
 *   delete:
 *     summary: Delete user by ID
 *     tags: [User]
 *     description: Admin only
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: User ID
 *     responses:
 *       204:
 *         description: User deleted
 *       500:
 *         description: Internal server error
 */

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
 *           type: integer
 *         required: true
 *         description: User ID
 *     responses:
 *       200:
 *         description: User info
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UpdateSchema'
 *       404:
 *         description: User not found
 *       500:
 *         description: Internal server error
 */
export const getUserById = async (req, res) => {
    try {
        const { id } = req.params; 
        const user = await userModel.getUserByID(pool, id);
        if (user) {
            res.status(200).json(user);
        } else {
            res.status(404).send('User not found'); 
        }
    } catch (error) {
        res.status(500).json({ message: 'Internal server error user by id admin' });
    }
};

/**
 * @swagger
 * /registration-with-service:
 *   post:
 *     summary: Register user with service
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserWithServiceSchema'
 *     responses:
 *       201:
 *         description: User and service created successfully
 *       500:
 *         description: Internal server error
 */
export const registerUserWithService = async (req, res) => {
    let SQLClient;  
    try {
        // 1. Connexion à la base et début de la transaction
        SQLClient = await pool.connect();
        await SQLClient.query("BEGIN");
        
        // 2. Création de l'utilisateur
        const { lastName, firstName, telNumber, mailAddress, userPassword } = req.body.user;
        const userID = await userModel.createUser(SQLClient, 
            { lastName, firstName, telNumber, mailAddress, userPassword });
        
        // 3. Génération du JWT pour l'utilisateur
        const jwt = sign({ userID }, { expiresIn: '8h' });
        
        // 4. Création du service avec l'ID de l'utilisateur comme auteur
        const { title, serviceDescription, serviceType, latitude, longitude } = req.body.service;
        const { serviceID } = await createService({
            pool: SQLClient,
            title,
            serviceDescription,
            authorUser: userID, // L'ID utilisateur créé précédemment
            serviceType,
            latitude,
            longitude,
        });
        
        // 5. Validation de la transaction
        await SQLClient.query("COMMIT");

        // 6. Réponse avec le JWT
        res.status(201).json({
            message: "User and service created successfully",
            userID,
            serviceID,
            token: jwt, // Ajout du token dans la réponse
        });
    } catch (err) {
        try {
            // Annulation de la transaction en cas d'erreur
            if (SQLClient) {
                await SQLClient.query("ROLLBACK");
            }
        } catch (rollbackError) {
            res.status(500).json({ message: "Rollback error", error: rollbackError });
        } finally {
            // Réponse en cas d'erreur
            res.status(500).json({ message: "Error during the registration" });
        }
    } finally {
        // Libération du client SQL
        if (SQLClient) {
            SQLClient.release();
        }
    }
};
