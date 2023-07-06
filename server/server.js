const express = require('express');
const { urlencoded, json } = require('express');
const { fileURLToPath } = require('url');
const { dirname, join } = require('path');
const htmlRoutes = require('./routes/htmlRoutes.js');

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

const setupRoutes = async () => {
    try {
        app.use(express.static(join(__dirname, '../client/dist')));
        app.use(urlencoded({ extended: true }));
        app.use(json());

        console.log('Setting up routes...');
        await htmlRoutes(app);

        app.listen(PORT, () => {
            console.log(`Now listening on port: ${PORT}`);
        });
    } catch (error) {
        console.error('There was an error setting up routes');
        throw error;
    }
};

setupRoutes();

// import express from 'express';
// import { urlencoded, json } from 'express';
// import { fileURLToPath } from 'url';
// import { dirname, join } from 'path';
// import htmlRoutes from './routes/htmlRoutes.js';

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = dirname(__filename);

// const app = express();
// const PORT = process.env.PORT || 3000;

// app.use(express.static(join(__dirname, '../client/dist')));
// app.use(urlencoded({ extended: true }));
// app.use(json());

// console.log('Setting up routes...');
// htmlRoutes(app);

// app.listen(PORT, () => { 
//     console.log(`Now listening on port: ${PORT}`);
// });
