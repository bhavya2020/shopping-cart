const Sequelize = require('sequelize');
const DataTypes = Sequelize.DataTypes;
const DB = require('../config.json').DB;

const db = new Sequelize(
    DB.DATABASE,
    DB.USER,
    DB.PASSWORD,
    {
        host: DB.HOST,
        dialect: "mysql"
    }
);

const products = db.define('products', {
    img:DataTypes.STRING,
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: DataTypes.STRING,
    price:DataTypes.INTEGER,
});
db.sync({force: true})
    .then(() => console.info("Database configured"))
    .catch((err) => console.error(err));

exports.models = {
   products
};