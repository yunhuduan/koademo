const PersonService = require('../service/PersonService');
const Redis = require('../com/RedisFacade')

var getUserinfo = async (ctx, next) => {
	ctx.response.type = 'text/html';
	console.log(ctx.request.body)
	console.log(ctx.params)
	var redisData = await Redis.get('query_id' + ctx.params.id);
	console.log('redis get redisData:' + redisData)
	let p = await PersonService.findById(ctx.params.id);
	ctx.response.body = JSON.stringify(p);
	return next();
};

var saveUserinfo = async (ctx, next) => {
	console.log('add person')
	//TODO数据处理
	let now = Date.now();
	var person = {
		id: 'g-' + now,
		name: 'Gaffey',
		gender: false,
		birth: '2007-07-07',
		createdAt: now,
		updatedAt: now
	};
	await Redis.set('query_id' + person.id, JSON.stringify(person));
	var p = await PersonService.addPerson(person);
	console.log('add succ:' + p)
	ctx.response.type = 'text/html';
	ctx.response.body = 'succ id:' + person.id;
	return next();
};

var findAll = async (ctx, next) => {
	console.log('find ALl person')
	//TODO数据处理
	var ps = await  PersonService.findAll();
	console.log('findAll succ:' + ps)
	ctx.response.type = 'text/html';
	ctx.response.body = JSON.stringify(ps);
	return next();
};

module.exports = {
	'GET : /getUserinfo': getUserinfo,
	'GET : /saveUserinfo': saveUserinfo,
	'GET : /findall': findAll
};
