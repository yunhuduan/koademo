const logger = require("./utils/logger");
console.log = logger.info;//replace console.log info
console.debug = logger.debug;
console.info = logger.info;
console.warn = logger.warn;
console.error = logger.error;

const path = require("path");
const Koa = require("koa");
const koaBody = require("koa-body");
const app = new Koa();
const config = require("./config");
const mappingRouter = require("./com/MappingRouter");
const qs = require("./com/middleware/query-string");
const cors = require("./com/middleware/cors");
const session = require("koa-session");
const redis = require("./com/RedisFacade");
const globalError = require("./com/middleware/global-error");
const httplog = require("./com/middleware/http-log");
const auth = require("./com/middleware/auth");
//全局error处理
app.use(globalError({
	logger: logger
}));
//http 请求日志
app.use(httplog({
	logger: logger.httpLogger
}));

//跨域中间件
app.use(cors({
	allowHeaders: ["Content-Type", "Content-Length"],
	maxAge: 1800,
	credentials: true
}));

//queryString中间件
app.use(qs());

app.use(koaBody({
	multipart: true
}));

app.keys = ["this is app key"];

const sessionConfig = {
	key: "sess", /** (string) cookie key (default is koa:sess) */
	/** (number || 'session') maxAge in ms (default is 1 days) */
	/** 'session' will result in a cookie that expires when session/browser is closed */
	/** Warning: If a session cookie is stolen, this cookie will never expire */
	maxAge: 86400000,
	overwrite: true,
	/** (boolean) can overwrite or not (default true) */
	httpOnly: true,
	/** (boolean) httpOnly or not (default true) */
	signed: true,
	/** (boolean) signed or not (default true) */
	rolling: false,
	/** (boolean) Force a session identifier cookie to be set on every response. The expiration is reset to the original maxAge, resetting the expiration countdown. default is false **/
	store: {
		get: async function (key) {
			let res = await redis.get(key);
			return JSON.parse(res);
		},
		set: async function (key, sess, maxAge) {
			return await redis.set(key, JSON.stringify(sess), maxAge / 1000);
		},
		destroy: async function (key) {
			return await redis.expire(key, 0);
		}
	}
};

app.use(session(sessionConfig, app));

//auth
app.use(auth({
	excludePaths:['/getUserinfo'],
	valid: async function (ctx) {
		return !!ctx.session.userInfo;
	}
}));

app.use(mappingRouter(path.resolve(__dirname + "/controller")));

app.listen(config.port);

logger.info("server start on port:" + config.port);

