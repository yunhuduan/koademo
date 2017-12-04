const path = require('path');
const Koa = require('koa');
const app = new Koa();
const config = require('./config');
console.log(path.resolve(__dirname + '/app/controller'))
const mappingRouter = require('./app/com/MappingRouter');

console.log(path.resolve(__dirname + '/app/controller'))
app.use(mappingRouter(path.resolve(__dirname + '/app/controller')));

// 响应
app.use(ctx => {
	ctx.body = 'Hello Koa';
});

app.listen(config.port);

console.log("server start on port:"+ config.port);