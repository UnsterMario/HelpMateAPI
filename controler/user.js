import {pool} from '../database/database.js';
import * as userModel from '../model/user.js';
import {sign, verify} from '../util/jwt.js';
import {readPerson, readAdmin} from '../model/person.js';


//ICI

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

export const registration = async (req, res) => {
    try {
        const emailExists = await userModel.userExistsMail(pool, {mailAddress:req.val.mailAddress});
        const phoneExists = await userModel.userExistsTel(pool, {telNumber:req.val.telNumber});

        if (phoneExists) {
            return res.status(409).json({ message: 'Phone number already used' });

        }
        if (emailExists) {
            return res.status(409).json({ message: 'Email already used' });
        }
        const user = await userModel.createUser(pool, req.val);
        const jwt = sign(user.userid, {
            expiresIn: '8h'
        });
        return res.status(201).json({ message: 'User created successfully', token: jwt });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'Internal server error' });
    }
};



// Requêtes pour les utilisateurs réguliers

export const getMyInfo = async (req, res) => {
    const id = req.session;
    console.log('ID:', id);
    try {
        const info = await userModel.getUserByID(pool, id);
        console.log('Info:', info);
        res.send(info);
    } catch (e) {
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
        await userModel.deleteUser(pool, id);
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
                expiresIn: '24h'
            });
            console.log('Generated JWT:', jwt);
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
        console.error('Error during admin login:', err);
        res.sendStatus(500);
    }
};

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
        const updatedUser = await userModel.updateUser(pool, req.params.id, req.val);
        res.json(updatedUser).status(204);
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
        const { id } = req.params; // Extraction de l'identifiant à partir des paramètres de la requête
        const user = await userModel.getUserByID(pool, id); // Appel au modèle pour récupérer l'utilisateur
        if (user) {
            res.status(200).json(user); // Retourne les informations utilisateur
        } else {
            res.status(404).send('User not found'); // Gère le cas où l'utilisateur n'existe pas
        }
    } catch (error) {
        console.error('Error fetching user by ID:', error);
        res.sendStatus(500); // Gère les erreurs internes
    }
};


