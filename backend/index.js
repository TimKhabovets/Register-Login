import express from 'express';
import UserRoute from './routes/UserRoute.js';
import cors from 'cors';


const app = express();

//app.use(express.static(path.join(__dirname, 'build')));

app.use(cors());
app.use(express.json());
app.use(UserRoute);

console.log('server running');


// app.get('/', function (req, res) {
//     res.sendFile(path.join(__dirname, 'build', 'index.html'));
// });

app.listen(5000);