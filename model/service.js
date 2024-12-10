
export const serviceExists = async ({ title }) => {
    const { rows } = await pool.query(
        'SELECT COUNT(*) FROM Service WHERE title = $1',
        [title]
    );
    return rows[0].count > 0;
};

export const createService = async ({ 
    pool,
    title, 
    serviceDescription, 
    authorUser, 
    providerUser = null, 
    serviceType, 
    latitude = null, 
    longitude = null 
}) => {
    const { rows } = await pool.query(
        `INSERT INTO Service(
            title, 
            serviceDescription, 
            authorUser, 
            providerUser, 
            serviceType, 
            latitude, 
            longitude
        ) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING serviceID`,
        [title, serviceDescription, authorUser, providerUser, serviceType, latitude, longitude]
    );
    return rows[0];
};

export const readServiceByID = async ({ serviceID }) => {
    const { rows } = await pool.query(
        'SELECT * FROM Service WHERE serviceID = $1',
        [serviceID]
    );
    return rows[0];
};

export const updateService = async (serviceID, { 
    title, 
    serviceDescription, 
    providerUser, 
    latitude, 
    longitude 
}) => {
    let query = 'UPDATE Service SET ';
    const querySet = [];
    const queryValues = [];

    if (title) {
        queryValues.push(title);
        querySet.push(`title = $${queryValues.length}`);
    }
    if (serviceDescription) {
        queryValues.push(serviceDescription);
        querySet.push(`serviceDescription = $${queryValues.length}`);
    }
    if (providerUser) {
        queryValues.push(providerUser);
        querySet.push(`providerUser = $${queryValues.length}`);
    }
    if (latitude) {
        queryValues.push(latitude);
        querySet.push(`latitude = $${queryValues.length}`);
    }
    if (longitude) {
        queryValues.push(longitude);
        querySet.push(`longitude = $${queryValues.length}`);
    }

    if (queryValues.length > 0) {
        queryValues.push(serviceID);
        query += `${querySet.join(', ')} WHERE serviceID = $${queryValues.length}`;
        return await pool.query(query, queryValues);
    } else {
        throw new Error('No fields provided for update');
    }
};

export const deleteService = async (serviceID) => {
    return await pool.query('DELETE FROM Service WHERE serviceID = $1', [serviceID]);
};

export const getAllServices = async (pool) => {
    const { rows } = await pool.query(`
        SELECT 
            s.serviceid,
            s.title,
            s.servicedescription,
            s.authoruser,
            s.provideruser,
            s.servicetype,
            s.latitude,
            s.longitude,
            t.typeid,
            t.typename,
            t.typedescription,
            t.imagepath
        FROM Service s
        INNER JOIN TypeService t ON s.servicetype = t.typeid
    `);
    return rows;
};


export const getServicesByUser = async (userID) => {
    const { rows } = await pool.query(
        'SELECT * FROM Service WHERE authorUser = $1 OR providerUser = $1',
        [userID]
    );
    return rows;
};
