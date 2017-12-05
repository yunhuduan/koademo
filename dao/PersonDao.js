const sequelize = require('../db/MysqlSequelize');
const Sequelize = require("sequelize");

const Person = sequelize.define('person', {
	id: {
		type: Sequelize.STRING(50),
		primaryKey: true
	},
	name: Sequelize.STRING(100),
	gender: Sequelize.BOOLEAN,
	birth: Sequelize.STRING(10),
	createdAt: Sequelize.BIGINT,
	updatedAt: Sequelize.BIGINT
},{
	timestamps: false,
	tableName: 'person'
});

module.exports = Person
