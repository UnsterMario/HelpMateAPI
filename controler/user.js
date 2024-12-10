import {pool} from '../database/database.js';
import * as userModel from '../model/user.js';
import {sign} from '../util/jwt.js';
import {readPerson, readAdmin} from '../model/person.js';


//ICI
export const login = async (req, res) => {
    try {
        const rep = await readPerson(pool, req.val);
        if(rep) {
            const jwt = sign(rep, {
                expiresIn: '8h'
            });
            res.status(201).send(jwt);
        } else {
            res.sendStatus(404);
        }
    } catch (err) {
        console.error(err);
        res.sendStatus(500);
    }
};

export const registration = async (req, res) => {
    try {
        
        const exist = await userModel.userExists(pool, req.val.mailAddress);
        if(exist){
            res.status(409).send('Email already used');
        } else {
            await userModel.createUser(pool, req.val);
            res.sendStatus(201);
        }
    } catch (err) {
        console.error(err);
        res.sendStatus(500);
    }
};


// Requêtes pour les utilisateurs réguliers

export const getMyInfo = async (req, res) => {
    const {id} = req.session;
    try {
        const info = await userModel.getUserByID(pool, id);
        res.send(info);
    } catch (e) {
        res.sendStatus(500);
    }
};
export const updateMe = async (req, res) => {
    try {
        await userModel.updateMyInfo(pool, req.session.id, req.val);
        res.sendStatus(204);
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


