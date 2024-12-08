import {compare} from '../util/index.js';
import {readUserByEmail} from './user.js';
import {readAdminByEmail} from './user.js';

export const readPerson = async (clientSQL, {mailAddress,userPassword }) => {
    const client = await readUserByEmail(clientSQL, { mailAddress });

    if (client && await compare(userPassword, client.userPassword)) {
        return client.userID;
    }

    return null;
};

export const readAdmin = async (clientSQL, {mailAddress, userPassword }) => {
    const client = await readAdminByEmail(clientSQL, { mailAddress });
    if (client && await compare(userPassword, client.userpassword)) {
        return {
            userID: client.userid, // ABSOLUMENT PAS client.userID !!!
            isAdmin: client.isadmin // ABSOLUMENT PAS client.isAdmin !!! postgres met automatiquement en minuscule les noms de colonnes
        };
    }
    return null;
};