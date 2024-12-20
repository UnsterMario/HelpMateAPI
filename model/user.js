import {hash} from '../util/index.js';

export const userExistsMail = async (SQLClient, { mailAddress }) => {
    const {rows} = await SQLClient.query(
        `SELECT * FROM AppUser WHERE mailaddress = $1`,
        [mailAddress]
    );
    return rows.length > 0;
};

export const userExistsTel = async (SQLClient, { telNumber }) => {
    const {rows} = await SQLClient.query(
        `SELECT * FROM AppUser WHERE telnumber = $1`,
        [telNumber]
    );
    return rows.length > 0;
};

export const createUser = async (SQLClient, { lastName, firstName, telNumber, mailAddress, userPassword }) => {

    const isAdmin = false;

    const {rows} = await SQLClient.query(
        'INSERT INTO AppUser(lastName, firstName, telNumber, mailAddress, userPassword,isAdmin) VALUES ($1, $2, $3, $4, $5,$6) RETURNING userID',
        [
            lastName,
            firstName,
            telNumber,
            mailAddress,
            await hash(userPassword),
            isAdmin
        ]
    );
    return rows[0].userid;
};

export const readUserByEmail = async (SQLClient, {mailAddress}) => {
    let query = 'SELECT * FROM AppUser WHERE mailAddress = $1';
    const {rows} = await SQLClient.query(query, [mailAddress]);
    return rows[0];
};

export const getUserByID = async (clientSQL, userID) => {
    return (await clientSQL.query('SELECT userID, lastName, firstName, telNumber, mailAddress FROM AppUser WHERE userID = $1', [userID])).rows[0];
};

export const updateMyInfo = async (SQLClient, userID, user) => {
    let lastName, firstName, telNumber, mailAddress;
    lastName = user.lastName || null;
    firstName = user.firstName || null;
    telNumber = user.telNumber || null;
    mailAddress = user.mailAddress || null;

    let query = 'UPDATE AppUser SET ';
    const querySet = [];
    const queryValues = [];

    if(lastName){
        queryValues.push(lastName);
        querySet.push(`lastName = $${queryValues.length}`);
    }
    if(firstName){
        queryValues.push(firstName);
        querySet.push(`firstName = $${queryValues.length}`);
    }
    if(telNumber){
        queryValues.push(telNumber);
        querySet.push(`telNumber = $${queryValues.length}`);

    }
    if(mailAddress){
        queryValues.push(mailAddress);
        querySet.push(`mailAddress = $${queryValues.length}`);
    }
    if(queryValues.length > 0){
        queryValues.push(userID);
        query += `${querySet.join(', ')} WHERE userID = $${queryValues.length} RETURNING *`;
        try {
            await SQLClient.query(query, queryValues);
            return JSON.stringify({
                message: 'User updated successfully',
            });
        } catch (error) {
            // Vérifie si l'erreur est liée à une contrainte unique grace à son code
            if (error.code === '23505') {
                return error;
            }
            // Autres erreurs SQL
            
            throw new Error(`Erreur SQL : ${error.message}`);
        }
    } else {
        throw new Error('No field given');
    }
};


// Requêtes pour les administrateurs

export const createUserAdmin = async (SQLClient, {lastName, firstName, telNumber, mailAddress, userPassword, isAdmin}) => {
    const {rows} = await SQLClient.query(
        'INSERT INTO AppUser(lastName, firstName, telNumber, mailAddress, userPassword, isAdmin) VALUES ($1, $2, $3, $4, $5, $6) RETURNING userID, lastName, firstName, telNumber, mailAddress,isAdmin',
        [
            lastName,
            firstName,
            telNumber,
            mailAddress,
            await hash(userPassword),
            isAdmin
        ]
    );

    return rows[0];
};

export const readAdminByEmail = async (SQLClient, {mailAddress}) => {

    const isAdmin = true

    const {rows} = await SQLClient.query('SELECT * FROM AppUser WHERE mailAddress = $1 AND isAdmin = $2' , [mailAddress,isAdmin]);
    return rows[0];
};

export const getUsers = async (SQLClient) => {
    return (
        await SQLClient.query(
            'SELECT userID, lastName, firstName, telNumber, mailAddress,isAdmin FROM AppUser'
        )
    ).rows;
};

export const updateUser = async (SQLClient, userID, {lastName, firstName, telNumber, mailAddress, isAdmin}) => {
    let query = 'UPDATE AppUser SET ';
    const querySet = [];
    const queryValues = [];
    
    if(lastName){
        queryValues.push(lastName);
        querySet.push(`lastName = $${queryValues.length}`);
    }
    if(firstName){
        queryValues.push(firstName);
        querySet.push(`firstName = $${queryValues.length}`);
    }
    if(telNumber){
        queryValues.push(telNumber);
        querySet.push(`telNumber = $${queryValues.length}`);
    }
    if(mailAddress){
        queryValues.push(mailAddress);
        querySet.push(`mailAddress = $${queryValues.length}`);
    }
    if(isAdmin){
        queryValues.push(isAdmin);
        querySet.push(`isAdmin = $${queryValues.length}`);
    }
    if(queryValues.length > 0){
        queryValues.push(userID);
        query += `${querySet.join(', ')} WHERE userID = $${queryValues.length}`;
        await SQLClient.query(query, queryValues);
        const { rows } = await SQLClient.query('SELECT userID, lastName, firstName, telNumber, mailAddress, isAdmin FROM AppUser WHERE userID = $1', [userID]);
        return rows[0];
    } else {
        throw new Error('No field given');
    }
};

export const deleteUser = async (SQLClient, userID) => {
    try {
        await SQLClient.query(`
            DELETE FROM AppUser
            WHERE userid = $1
        `, [userID]);
    } catch (error) {
        throw new Error(`Failed to delete user: ${error.message}`);
    }
};
