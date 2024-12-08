export const createPurchase = async (SQLClient, {articleID, quantity}, clientID) => {
    const {rows} = await SQLClient.query(
        'INSERT INTO purchase(product_id, client_id, quantity) VALUES ($1, $2, $3)',
        [articleID, clientID, quantity]
    );

    return rows;
};