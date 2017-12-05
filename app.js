const path = require('path');
const Koa = require('koa');
const app = new Koa();
const config = require('./config');
const mappingRouter = require('./com/MappingRouter');
app.use(mappingRouter(path.resolve(__dirname + '/controller')));

// 响应
app.use(ctx => {
	ctx.body = 'Hello Koa';
});

app.listen(config.port);

console.log("server start on port:"+ config.port);
