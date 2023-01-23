import { Sequelize } from 'sequelize';
import mysql2 from 'mysql2';

const db = new Sequelize('freedb_users-db', 'freedb_timkhab', 'XE@dX$mQR?43DGv', {
    host: 'sql.freedb.tech',
    dialect: 'mysql',
    dialectModule: mysql2,
}); 

export default db;