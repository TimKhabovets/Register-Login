import express from 'express';
import cors from 'cors';
import UserRoute from './routes/UserRoute.js';
var cors = require('cors');


const app = express();

//app.use(express.static(path.join(__dirname, 'build')));

app.use(cors());
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.header("Access-Control-Allow-Headers", "x-access-token, Origin, X-Requested-With, Content-Type, Accept");
    next();
  });
app.use(express.json());
app.use(UserRoute);

console.log('server running');


// app.get('/', function (req, res) {
//     res.sendFile(path.join(__dirname, 'build', 'index.html'));
// });

app.listen(5000);