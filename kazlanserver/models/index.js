const config = require("../config/db.config");
const { Sequelize } = require("sequelize");
const mysql2 = require("mysql2"); 

const sequelize = new Sequelize(config.DB, config.USER, config.PASSWORD, {
  host: config.HOST,
  dialect: config.dialect,
  dialectModule: mysql2, 
  pool: {
    max: config.pool.max,
    min: config.pool.min,
    acquire: config.pool.acquire,
    idle: config.pool.idle
  },
  logging: false, 
});


// Create `db` object
const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;




module.exports = db;
