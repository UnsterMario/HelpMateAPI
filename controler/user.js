import {pool} from '../database/database.js';
import * as userModel from '../model/user.js';
import {createService} from '../model/service.js';
import {sign, verify} from '../util/jwt.js';
import {readPerson, readAdmin} from '../model/person.js';

export const checkAuth = async (req, res) => {
    try {
        // Récupérer le JWT depuis l'en-tête Authorization
        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({ message: 'Token manquant ou invalide' });
        }

        const token = authHeader.split(' ')[1];

        // Vérifier le JWT
        const decoded = verify(token);
        console.log('Decoded:', decoded);

        if (!decoded) {
            return res.status(401).json({ message: 'Token invalide' });
        }

        // Rechercher l'utilisateur dans la base de données
        const user = await userModel.getUserByID(pool, decoded);

        if (!user) {
            return res.status(401).json({ message: 'Utilisateur non trouvé' });
        }

        // Retourner l'utilisateur si tout est valide
        return res.status(200).json({ message: 'Authentification réussie', user: user.lastname });
    } catch (err) {
        // Gérer les erreurs liées au JWT (ex: expiré, signature invalide)
        console.error(err);
        if (err.name === 'TokenExpiredError') {
            return res.status(401).json({ message: 'Token expiré' });
        }
        return res.status(500).json({ message: 'Erreur interne au serveur' });
    }
};


export const login = async (req, res) => {
    try {
        const rep = await readPerson(pool, {mailAddress: req.val.mailAddress, userPassword: req.val.userPassword});
        if(rep) {
            console.log('User logged in:', rep);
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



// Requêtes pour les utilisateurs réguliers

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

export const deleteMe = async (req, res) => {
    const id = req.session;
    try {
        await userModel.deleteMyAccount(pool, id);
        res.status(200).json({ message: 'User deleted successfully' });
    } catch (e) {
        res.status(500).json({ message: 'Erreur serveur' });
    }
};

// Requêtes pour les administrateurs

export const adminLogin = async (req, res) => {
    try {
        const user = await readAdmin(pool, req.val);
        if (user && user.isAdmin) { 
            const jwt = sign({ userID: user.userID, isAdmin: user.isAdmin },{
                expiresIn: '8h'
            });
            console.log('Generated JWT:', jwt);
            res.status(201).send(jwt);
        } else {
            res.sendStatus(403); 
        }
    } catch (err) {
        console.error('Error during admin login:', err);
        res.sendStatus(500);
    }
};

export const getAllUsers = async (req, res) => {
    try {
        const users = await userModel.getUsers(pool);
        res.json(users);
    } catch (e) {
        res.sendStatus(500);
    }
};

export const updateUser = async (req, res) => {
    try {
        await userModel.updateUser(pool, req.params.id, req.val);
        res.sendStatus(204);
    } catch (e) {
        res.sendStatus(500);
    }
};

export const deleteUser = async (req, res) => {
    try {
        await userModel.deleteUser(pool, req.params.id);
        res.sendStatus(204);
    } catch (e) {
        res.sendStatus(500);
    }
};

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
        console.error('Error fetching user by ID:', error);
        res.sendStatus(500);
    }
};


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
        console.log('User created dans regi:', user);
        const jwt = sign({ userID : user }, { expiresIn: '8h' });
        return res.status(201).json({ message: 'User created successfully', token: jwt });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'Internal server error' });
    }
};

export const registerUserWithService = async (req, res) => {
    let SQLClient;  
    console.log('body : ', req.body);
    try {
        // 1. Connexion à la base et début de la transaction
        SQLClient = await pool.connect();
        await SQLClient.query("BEGIN");
        console.log('Transaction started');
        
        // 2. Création de l'utilisateur
        const { lastName, firstName, telNumber, mailAddress, userPassword } = req.body.user;
        const userID = await userModel.createUser(SQLClient, { lastName, firstName, telNumber, mailAddress, userPassword });
        console.log('User created in controller:', userID);
        
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
        console.log('Service created:', serviceID);
        
        // 5. Validation de la transaction
        await SQLClient.query("COMMIT");

        // 6. Réponse avec le JWT
        res.status(201).json({
            message: "Utilisateur et service créés avec succès",
            userID,
            serviceID,
            token: jwt, // Ajout du token dans la réponse
        });
    } catch (err) {
        console.error("Erreur lors de la transaction :", err);

        try {
            // Annulation de la transaction en cas d'erreur
            if (SQLClient) {
                console.log("Rollbacking...");
                await SQLClient.query("ROLLBACK");
            }
        } catch (rollbackError) {
            console.error("Erreur lors du rollback :", rollbackError);
        } finally {
            // Réponse en cas d'erreur
            res.status(500).json({ message: "Une erreur est survenue lors de l'enregistrement." });
        }
    } finally {
        // Libération du client SQL
        if (SQLClient) {
            SQLClient.release();
        }
    }
};
