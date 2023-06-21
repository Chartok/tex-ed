import express, { static, urlencoded, json } from 'express';
express.static(root, [options]);

const app = express();
const PORT = process.env.PORT || 3000;

app.use(static('../client/dist'));
app.use(urlencoded({ extended: true }));
app.use(json());

require('./routes/htmlRoutes')(app);

app.listen(PORT, () => console.log(`Now listening on port: ${PORT}`));
