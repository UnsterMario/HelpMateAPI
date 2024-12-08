import express from 'express';
import {default as Router} from './routes/index.js';
import cors from 'cors';
const app = express();
const port = 3001;


const corsOptions = {
    origin: 'http://localhost:5173',
    optionsSuccessStatus: 200
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(Router);

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});