const PersonService = require('../service/PersonService');
const Redis = require('../com/RedisFacade')

var getUserinfo = async (ctx, next) => {
	ctx.response.type = 'text/html';
	console.log(ctx.request.body)
	console.log(ctx.params)
	var redisData = await Redis.get('query_id' + ctx.params.id);
	console.log('redis get redisData:' + redisData);
	var hash = await Redis.hgetall('hashtest');
	console.log('redis hashtest:' + JSON.stringify(hash))
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
	await Redis.hmset('hashtest', {a: 1, b: 2});
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

var exist = async (ctx, next) => {
	var exist = await Redis.exists(ctx.params.key);
	ctx.response.body = ctx.params.key + ':' + exist
}

var expire = async (ctx, next) => {
	await Redis.expire(ctx.params.key, ctx.params.time || 0);
	ctx.response.body = ctx.params.key + 'expired'
}

var exec = async (ctx,next)=>{
	var res = await Redis.exec(ctx.params.func, [ctx.params.arg]);
	ctx.response.body = ctx.params.func + ' exec res:'+res
}

module.exports = {
	'GET : /getUserinfo': getUserinfo,
	'GET : /saveUserinfo': saveUserinfo,
	'GET : /exist' : exist,
	'GET : /expire' : expire,
	'GET : /exec' : exec,
	'GET : /findall': findAll
};
