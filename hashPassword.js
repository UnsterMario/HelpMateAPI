import * as argon2 from 'argon2';
import 'dotenv/config';

const hashPassword = async (password) => {
    try {
        const hashedPassword = await argon2.hash(password, { secret: Buffer.from(process.env.PEPPER) });
        console.log(`Hashed password: ${hashedPassword}`);
    } catch (err) {
        console.error('Error hashing password:', err);
    }
};

const password = 'password'; // Remplacez par le mot de passe en clair que vous souhaitez hacher
hashPassword(password);