const Person = require('../dao/PersonDao');




async function  addPerson(person){
	let now = Date.now();
	let p = await Person.create({
		id: 'g-' + now,
		name: 'Gaffey',
		gender: false,
		birth: '2007-07-07',
		createdAt: now,
		updatedAt: now
	});
	return p;
};

async function findById() {
	let p = Person.findById('g-1512486677842');
	return p
}

module.exports = {
	addPerson,
	findById
}

