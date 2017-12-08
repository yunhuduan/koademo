const path = require('path');
const Koa = require('koa');
const koaBody = require('koa-body');
const app = new Koa();
const config = require('./config');
const mappingRouter = require('./com/MappingRouter');
const qs = require('./com/middleware/query-string')
const cors = require('./com/middleware/cors')

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

app.use(mappingRouter(path.resolve(__dirname + '/controller')));

app.listen(config.port);

console.log("server start on port:" + config.port);
