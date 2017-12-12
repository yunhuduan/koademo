const PersonService = require("../service/PersonService");
const Redis = require("../com/RedisFacade");
const logger = require("../utils/logger");

let getUserinfo = async (ctx, next) => {
	ctx.response.type = "text/html";
	logger.info(ctx.request.body, ctx);
	logger.info(ctx.params, ctx);
	//redis测试
	let redisData = await Redis.get("query_id" + ctx.params.id);
	ctx.session.userInfo = {id: 12345};
	ctx.session.IP = "192.168.1.100";
	logger.info("redis get redisData:" + redisData, ctx);
	let hash = await Redis.hgetall("hashtest");
	logger.info("redis hashtest:" + JSON.stringify(hash));
	//db测试
	let p = await PersonService.findById(ctx.params.id);
	ctx.response.body = JSON.stringify(p);
	//session+redis测试
	ctx.session.views = (ctx.session.views || 0) + 1;

	ctx.session.params = ctx.params;
	return next();
};

let saveUserinfo = async (ctx, next) => {
	logger.info("add person");
	//TODO数据处理
	let now = Date.now();
	let person = {
		id: "g-" + now,
		name: "Gaffey",
		gender: false,
		birth: "2007-07-07",
		createdAt: now,
		updatedAt: now
	};
	await Redis.set("query_id" + person.id, JSON.stringify(person));
	await Redis.hmset("hashtest", {a: 1, b: 2});
	let p = await PersonService.addPerson(person);
	logger.info("add succ:" + p);
	ctx.response.type = "text/html";
	ctx.response.body = "succ id:" + person.id;
	return next();
};

let findAll = async (ctx, next) => {
	logger.info("find ALl person", ctx);
	logger.info(ctx.session.IP);
	logger.info(ctx.session.userInfo);
	//TODO数据处理
	let ps = await  PersonService.findAll();
	logger.info("findAll succ:");
	ctx.response.type = "text/html";
	ctx.response.body = JSON.stringify(ps);
	return next();
};

let exist = async (ctx, next) => {
	let exist = await Redis.exists(ctx.params.key);
	ctx.response.body = ctx.params.key + ":" + exist;
	return next();
};

let expire = async (ctx, next) => {
	await Redis.expire(ctx.params.key, ctx.params.time || 0);
	ctx.response.body = ctx.params.key + "expired";
	return next();
};

let exec = async (ctx, next) => {
	let res = await Redis.exec(ctx.params.func, [ctx.params.arg]);
	ctx.response.body = ctx.params.func + " exec res:" + res;
	return next();
};

module.exports = {
	"GET : /getUserinfo": getUserinfo,
	"GET : /saveUserinfo": saveUserinfo,
	"GET : /exist": exist,
	"GET : /expire": expire,
	"GET : /exec": exec,
	"GET : /findall": findAll
};
