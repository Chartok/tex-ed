// import express, { static, urlencoded, json } from 'express';
import express from 'express';
import { urlencoded, json } from 'express';
import path from 'path';
import htmlRoutes from './routes/htmlRoutes.js';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, '../client/dist')));
app.use(urlencoded({ extended: true }));
app.use(json());

htmlRoutes(app);

app.listen(PORT, () => { 
    console.log(`Now listening on port: ${PORT}`);
});
