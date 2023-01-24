import { Sequelize } from 'sequelize';
import mysql2 from 'mysql2';

const db = new Sequelize('freedb_users-db', 'freedb_timkhab', 'XE@dX$mQR?43DGv', {
    host: 'sql.freedb.tech',
    dialect: 'mysql',
    dialectModule: mysql2,
}); 

db.authenticate().then(() => {
    console.log('Connection has been established successfully.');
 }).catch((error) => {
    console.error('Unable to connect to the database: ', error);
 });

export default db;