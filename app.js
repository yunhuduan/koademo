const path = require('path');
const Koa = require('koa');
const koaBody = require('koa-body');
const app = new Koa();
const config = require('./config');
const mappingRouter = require('./com/MappingRouter');
const qs = require('./com/middleware/query-string');
const cors = require('./com/middleware/cors');
const session = require('koa-session');
const redis = require('./com/RedisFacade')

//queryString中间件
app.use(qs());

//跨域中间件
app.use(cors({
	allowHeaders:['Content-Type','Content-Length'],
	maxAge: 1800,
	credentials:true
}));

app.use(koaBody({
	multipart: true
}));

app.keys = ['some secret hurr'];

const sessionConfig = {
	key: 'sess', /** (string) cookie key (default is koa:sess) */
	/** (number || 'session') maxAge in ms (default is 1 days) */
	/** 'session' will result in a cookie that expires when session/browser is closed */
	/** Warning: If a session cookie is stolen, this cookie will never expire */
	maxAge: 86400000,
	overwrite: true, /** (boolean) can overwrite or not (default true) */
	httpOnly: true, /** (boolean) httpOnly or not (default true) */
	signed: true, /** (boolean) signed or not (default true) */
	rolling: false,/** (boolean) Force a session identifier cookie to be set on every response. The expiration is reset to the original maxAge, resetting the expiration countdown. default is false **/

	store: {
		get: async function(key,maxage,{rolling}){
			console.log('get from redis');
			console.log(key,maxage,rolling)
			let res = await redis.get(key);
			return JSON.parse(res);
		},
		set: async function(key, sess, maxAge, { rolling, changed }){
			console.log('set to redis');
			console.log(key,maxAge,rolling,changed)
			return await redis.set(key,JSON.stringify(sess),maxAge/1000)
		},
		destroy: async function(key){
			return await redis.expire(key,0)
		}
	}
};

app.use(session(sessionConfig,app));

app.use(mappingRouter(path.resolve(__dirname + '/controller')));

app.listen(config.port);

console.log("server start on port:" + config.port);
