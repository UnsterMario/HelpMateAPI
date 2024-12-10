
export const typeServiceExists = async ({ typeName }) => {
    const { rows } = await pool.query(
        'SELECT COUNT(*) FROM TypeService WHERE typeName = $1',
        [typeName]
    );
    return rows[0].count > 0;
};

export const createTypeService = async ({ typeName, typeDescription, imagePath }) => {
    const { rows } = await pool.query(
        'INSERT INTO TypeService(typeName, typeDescription, imagePath) VALUES ($1, $2, $3) RETURNING typeID',
        [typeName, typeDescription, imagePath]
    );
    return rows[0];
};

export const readTypeServiceByID = async ({ typeID }) => {
    const { rows } = await pool.query(
        'SELECT * FROM TypeService WHERE typeID = $1',
        [typeID]
    );
    return rows[0];
};

export const updateTypeService = async (typeID, { typeName, typeDescription, imagePath }) => {
    let query = 'UPDATE TypeService SET ';
    const querySet = [];
    const queryValues = [];

    if (typeName) {
        queryValues.push(typeName);
        querySet.push(`typeName = $${queryValues.length}`);
    }
    if (typeDescription) {
        queryValues.push(typeDescription);
        querySet.push(`typeDescription = $${queryValues.length}`);
    }
    if (imagePath) {
        queryValues.push(imagePath);
        querySet.push(`imagePath = $${queryValues.length}`);
    }

    if (queryValues.length > 0) {
        queryValues.push(typeID);
        query += `${querySet.join(', ')} WHERE typeID = $${queryValues.length}`;
        return await pool.query(query, queryValues);
    } else {
        throw new Error('No fields provided for update');
    }
};

export const deleteTypeService = async (typeID) => {
    return await pool.query('DELETE FROM TypeService WHERE typeID = $1', [typeID]);
};

export const getAllTypeServices = async (pool) => {
  const result = await pool.query('SELECT typeid, typename, typedescription, imagepath FROM TypeService');
  return result.rows;
};

