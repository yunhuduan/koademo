
var getUserinfo = (ctx, next) => {

	ctx.response.type ='text/html';
	ctx.response.body = 'get userInfo';
};

var saveUserinfo = (ctx, next) => {
	const requestString = ctx.data;
	//TODO数据处理
	Console.log(requestString);
};

module.exports = {
	'GET /getUserinfo': getUserinfo,
	'POST /saveUserinfo': saveUserinfo
};