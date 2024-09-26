import dotenv from 'dotenv';
import Sequelize from 'sequelize';
dotenv.config()

const { DATABASE_URL} = process.env;

const db = new Sequelize(DATABASE_URL, {
    define: {
        timestamps: false
    },
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    },
    operatorAlias: false
});

export default db;