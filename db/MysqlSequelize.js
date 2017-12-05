const Sequelize = require('sequelize');
const dbConfig = require('../config/dbConfig')

const sequelize = new Sequelize(dbConfig.database, dbConfig.username, dbConfig.password, dbConfig.options);

sequelize.authenticate().then(() => {
	console.log('Connection has been established successfully.');
}).catch(err => {
	console.error('Unable to connect to the database:', err);
});

module.exports = sequelize;
