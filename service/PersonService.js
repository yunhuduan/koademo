const Person = require('../dao/PersonDao');

function addPerson(person){
	let now = Date.now();
	let p = Person.create(person);
	return p;
};

function findById(id) {
	let p = Person.findById(id);
	return p
}

function findAll() {
	let ps = Person.findAll();
	return ps;
}

module.exports = {
	addPerson,
	findById,
	findAll
}

