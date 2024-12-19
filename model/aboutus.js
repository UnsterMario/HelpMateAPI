
export const createAboutUs = async (clientSQL, content) => {
    const {rows} = await clientSQL.query('INSERT INTO about_us content VALUES ($1) RETURNING last_updated', content);
    return rows[0];
};

export const getAboutUs = async (clientSQL) => {
    const {rows} = await clientSQL.query('SELECT content FROM about_us');
    return rows[0];
};

export const updateAboutUs = async (clientSQL, {content}) => {
    const {rows} = await clientSQL.query('UPDATE about_us SET content = $1 RETURNING last_updated', [content]);
    return rows[0];
};
