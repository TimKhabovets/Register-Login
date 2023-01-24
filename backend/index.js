import express from 'express';
import UserRoute from './routes/UserRoute.js';
import cors from 'cors';
import https from 'https';

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(UserRoute);

const server = https.createServer(app);
server.listen(5000);

console.log('server running');