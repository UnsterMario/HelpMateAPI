import {pool} from '../database/database.js';
import * as clientModel from '../model/client.js';
import {sign} from '../util/jwt.js';
import {readPerson} from '../model/person.js';

export const registration = async (req, res) => {
    try {
        const exist = await clientModel.clientExists(pool, req.val.email);
        if(exist){
            res.status(409).send('Email already used');
        } else {
            await clientModel.createUser(pool, req.val);
            res.sendStatus(201);
        }
    } catch (err) {
        console.error(err);
        res.sendStatus(500);
    }
};

export const login = async (req, res) => {
    try {
        const rep = await readPerson(pool, req.val);
        if(rep.id) {
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

export const getClientInfo = async (req, res) => {
    const {id} = req.session;
    try {
        const info = await clientModel.getClientByID(pool, id);
        res.send(info);
    } catch (e) {
        res.sendStatus(500);
    }
};
export const updateClient = async (req, res) => {
    try {
        await clientModel.updateClient(pool, req.session.id, req.val);
        res.sendStatus(204);
    } catch (e) {
        console.error(e);
        res.sendStatus(500);
    }
};