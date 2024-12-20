import * as argon2 from 'argon2';


export const hash = (password) => {
    console.log(argon2.hash(password, {secret: Buffer.from(process.env.PEPPER)}));
    return argon2.hash(password, {secret: Buffer.from(process.env.PEPPER)});
};


export const compare = (plainText, hash) => {
    return argon2.verify(
        hash,
        plainText,
        {secret: Buffer.from(process.env.PEPPER)}
    );
};