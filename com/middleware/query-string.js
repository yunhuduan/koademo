let qs = require('querystring');
/**
 * 请求url的querystring处理中间件,querystring解析成对象存放在ctx.params属性上
 * @param options
 * @returns {paramsmid}
 */
module.exports = function queryString(options) {
	let op = options || {};
	return async function paramsmid (ctx, next) {
		let params = qs.parse(ctx.request.querystring);
		ctx.params = params;
		await next();
	}
}
