const PersonService = require('../service/PersonService');
var getUserinfo = async (ctx, next) => {
	ctx.response.type = 'text/html';
	console.log(ctx.request.body)
	console.log(ctx.params)
	let p = await PersonService.findById(ctx.params.id);
	ctx.response.body = JSON.stringify(p);
};

var saveUserinfo = async (ctx, next) => {
	const requestString = ctx.data;
	console.log('add person')
	//TODO数据处理
	let now = Date.now();
	var p = await PersonService.addPerson({
		id: 'g-' + now,
		name: 'Gaffey',
		gender: false,
		birth: '2007-07-07',
		createdAt: now,
		updatedAt: now
	});
	console.log('add succ:' + p)
	ctx.response.type = 'text/html';
	ctx.response.body = 'succ';
};

var findAll = async (ctx, next) => {
	console.log('find ALl person')
	//TODO数据处理
	var ps = await  PersonService.findAll();
	console.log('findAll succ:' + ps)
	ctx.response.type = 'text/html';
	ctx.response.body = JSON.stringify(ps);

};

module.exports = {
	'GET : /getUserinfo': getUserinfo,
	'POST : /saveUserinfo': saveUserinfo,
	'GET : /findall': findAll
};
