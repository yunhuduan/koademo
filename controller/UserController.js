const PersonService = require('../service/PersonService');
var getUserinfo = async (ctx, next) => {
	ctx.response.type = 'text/html';
	let p = await PersonService.findById();
	ctx.response.body = JSON.stringify(p);
};

var saveUserinfo = async (ctx, next) => {
	const requestString = ctx.data;
	console.log('add person')
	//TODO数据处理
	var p = await  PersonService.addPerson();
	console.log('add succ:' + p)
	ctx.response.type = 'text/html';
	ctx.response.body = 'succ';

};

module.exports = {
	'GET : /getUserinfo': getUserinfo,
	'GET : /saveUserinfo': saveUserinfo
};
