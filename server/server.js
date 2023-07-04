// import express, { static, urlencoded, json } from 'express';
import express from 'express';
import path from 'path';
express.static(root, [options]);

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, '../client/dist')));
app.use(urlencoded({ extended: true }));
app.use(json());

import htmlRoutes from './routes/htmlRoutes';
htmlRoutes(app);


app.listen(PORT, () => console.log(`Now listening on port: ${PORT}`));
