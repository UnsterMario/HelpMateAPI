import {updateClient as updateC} from './client.js';

export const updateClient = (SQLClient, info) => {
    return updateC(SQLClient, info.id, info);
};
export const readManager = async (clientSQL, {email}) => {
    const {rows} = await clientSQL.query(
        'SELECT * FROM manager WHERE email = $1 ',
        [email]
    );
    return rows[0];
};