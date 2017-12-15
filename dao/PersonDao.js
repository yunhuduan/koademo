const sequelize = require("../db/MysqlSequelize");
const Sequelize = require("sequelize");

const Person = sequelize.define("person", {
	id: {
		type: Sequelize.STRING(50),
		primaryKey: true
	},
	name: Sequelize.STRING(100),
	gender: Sequelize.BOOLEAN,
	birth: Sequelize.STRING(10),
	createdAt: Sequelize.BIGINT,
	updatedAt: Sequelize.BIGINT
});

Person.listTotal = function(){
	return sequelize.query('select p.*, ifnull(s.c , 0) c from person p left join( select pid , count(pl.pid) c from person_log pl group by pl.pid) s on p.id = s.pid');
};

module.exports = Person;
