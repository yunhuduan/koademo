const path = require('path');
const Koa = require('koa');
const koaBody = require('koa-body');
const app = new Koa();
const config = require('./config');
const mappingRouter = require('./com/MappingRouter');
const qs = require('./com/middleware/query-string')

app.use(qs());

app.use(koaBody({
	multipart: true
}));

app.use(mappingRouter(path.resolve(__dirname + '/controller')));

app.listen(config.port);

console.log("server start on port:" + config.port);
