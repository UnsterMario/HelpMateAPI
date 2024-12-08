import {hash} from '../util/index.js';


export const clientExists = async (SQLClient, {email}) => {
    const {rows} = await SQLClient.query(
        'SELECT COUNT(*) FROM client WHERE email = $1',
        [email]
    );
    return rows.count > 0;
};
export const createUser = async (SQLClient, {name, firstname, address, email, password}) => {
    const {rows} = await SQLClient.query(
        'INSERT INTO client(name, firstname, address, email, password) VALUES ($1, $2, $3, $4, $5) RETURNING id',
        [
            name,
            firstname,
            address,
            email,
            await hash(password)
        ]
    );
    return rows[0];
};

export const readClientByEmail = async (SQLClient, {email}) => {
    let query = 'SELECT * FROM client WHERE email = $1';
    const {rows} = await SQLClient.query(query, [email]);
    return rows[0];
};

export const getClientByID = async (clientSQL, id) => {
    return (await clientSQL.query('SELECT id, name, firstname, address, email FROM client WHERE id = $1', [id])).rows[0];
};

export const updateClient = async (SQLClient, id, {name, firstname, address, password}) => {
    let query = 'UPDATE client SET ';
    const querySet = [];
    const queryValues = [];
    if(name){
        queryValues.push(name);
        querySet.push(`name = $${queryValues.length}`);
    }
    if(firstname){
        queryValues.push(firstname);
        querySet.push(`firstname = $${queryValues.length}`);
    }
    if(address){
        queryValues.push(address);
        querySet.push(`address = $${queryValues.length}`);
    }
    if(password){
        queryValues.push(await hash(password));
        querySet.push(`password = $${queryValues.length}`);
    }
    if(queryValues.length > 0){
        queryValues.push(id);
        query += `${querySet.join(', ')} WHERE id = $${queryValues.length}`;
        return await SQLClient.query(query, queryValues);
    } else {
        throw new Error('No field given');
    }
};