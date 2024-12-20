import {default as swaggerJSDoc} from 'swagger-jsdoc';
import * as fs from 'node:fs';

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'API HelpMate', // Title (required)
            version: '1.1.2', // Version (required)
        },
        servers: [
            {
                url: 'http://localhost:3001',
                description: 'Local server',
            },
        ],
        tags: [
            {
                name: 'User',
                description: 'User management, himself and admin',
            },
            {
                name: 'Service',
                description: 'Service management',
            }
        ],
    },
    // Path to the API docs
    apis: [
        './controler/*.js',
        './middleware/**/*.js',
        './routes/*.js',
    ],
};

// Initialize swagger-jsdoc -> returns validated swagger spec in json format
const swaggerSpec = swaggerJSDoc(options);
fs.writeFileSync('./swagger/spec.json', JSON.stringify(swaggerSpec));