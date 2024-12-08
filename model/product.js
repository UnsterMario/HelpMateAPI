//permets de simuler une base de données
const products = [
    {id: 1, name: 'Playstation 4', price:400},
    {id: 2, name: 'Xbox One', price:399.9},
    {id: 3, name: 'Nintendo Switch', price:349.99}
];

export const readProduct = (id) => {
    const results = products.filter(p => p.id === id);
    if(results.length > 0){
        return results[0];
    } else {
        throw new Error('Aucun produit trouvé');
    }
};

export const createProduct = (id, name, price) => {
    products.push({
        id,
        name,
        price
    });
    return true;
};

export const updateProduct = (id, price) => {
    for(let i = 0; i < products.length; i++){
        if(products[i].id === id){
            products[i].price = price;
            return true;
        }
    }
    return false;
};

export const deleteProduct = (id) => {
    for (let i = 0; i < products.length; i++){
        if(products[i].id === id){
            products.splice(i, 1);
            return true;
        }
    }
    return true;
};