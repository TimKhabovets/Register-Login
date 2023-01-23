import { Sequelize } from 'sequelize'

const db = new Sequelize('freedb_users-db', 'freedb_timkhab', 'XE@dX$mQR?43DGv', {
    host: 'sql.freedb.tech',
    dialect: 'mysql2',
    dialectModule: require('mysql2')
}); 

export default db;