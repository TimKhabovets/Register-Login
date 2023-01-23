import express from 'express';
import UserRoute from './routes/UserRoute.js';
import cors from 'cors';

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(UserRoute);

console.log('server running');

const server = http.createServer(app);
server.listen(5000);