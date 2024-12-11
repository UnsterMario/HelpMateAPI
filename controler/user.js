import {pool} from '../database/database.js';
import * as userModel from '../model/user.js';
import {sign} from '../util/jwt.js';
import {readPerson, readAdmin} from '../model/person.js';


//ICI
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
    const {id} = req.session;
    try {
        await userModel.deleteMyAccount(pool, id);
        res.sendStatus(204);
    } catch (e) {
        res.sendStatus(500);
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
        console.log("ouais ma biche");
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


