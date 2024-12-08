export const readProduct = async (SQLClient, {id}) => {
    const {rows} = await SQLClient.query('SELECT * FROM product WHERE id = $1', [id]);
    return rows[0];
};

export const createProduct = async (SQLClient, {name, price}) => {
    const {rows} = await SQLClient.query('INSERT INTO product (name, price) VALUES ($1, $2) RETURNING id', [name, price]);
    return rows[0]?.id;
};

export const deleteProduct = async (SQLClient, {id}) => {
    return await SQLClient.query('DELETE FROM product WHERE id = $1', [id]);
};


export const updateProduct = async(SQLClient, {name, price, id}) => {
    let query = 'UPDATE product SET ';
    const querySet = [];
    const queryValues = [];
    if(name){
        queryValues.push(name);
        querySet.push(`name = $${queryValues.length}`);
    }
    if(price){
        queryValues.push(price);
        querySet.push(`price = $${queryValues.length}`);
    }
    if(queryValues.length > 0){
        queryValues.push(id);
        query += `${querySet.join(', ')} WHERE id = $${queryValues.length}`;
        return await SQLClient.query(query, queryValues);
    } else {
        throw new Error('No field given');
    }
};