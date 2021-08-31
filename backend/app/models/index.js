const dbConfig = require("../config/db.config.js");
const Sequelize = require('sequelize');
const DataTypes = require("sequelize").DataTypes;

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
    host: dbConfig.HOST,
    port: dbConfig.PORT,
    dialect: dbConfig.dialect,
    pool: {
        max: dbConfig.pool.max,
        min: dbConfig.pool.min,
        acquire: dbConfig.pool.acquire,
        idle: dbConfig.pool.idle,
    },
});

// const sequelize = new Sequelize('sportsx', 'sportsxlogin', '123456', {
//     dialect: 'mssql',
//     host: 'localhost',
//     port: '1433'
// })


sequelize
    .authenticate()
    .then(() => {
        console.log('Connection has been established successfully.'); // eslint-disable-line no-console
    })
    .catch((err) => {
        console.error('Unable to connect to the database:' + err.message); // eslint-disable-line no-console
    });

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.customers = require("./customer.model.js")(sequelize, DataTypes);
db.phones = require("./phones.model.js")(sequelize, DataTypes);

module.exports = db;