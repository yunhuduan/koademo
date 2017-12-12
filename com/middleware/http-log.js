/**
 * 系统http日志记录
 * @param options {
 *  logger:日志对象
 * }
 * @returns {function(*, *)}
 */
module.exports = function (options) {
	let logger = options.logger || console;
	return async (ctx, next) => {
		let startTime = Date.now();
		let method = ctx.method;
		let url = ctx.url;
		let ip = ctx.ip;
		let status = '';
		logger.info('req url:' + url + ',method:' + method + ',ip:' + ip);
		try {
			await next();
		} catch (err) {
			status = err.statusCode || err.status || '500';
			logger.error('res url:' + url + ',method:' + method + ',status:' + status + ',ip:' + ip + ',cost:' + (Date.now() - startTime));
			throw err;
		}
		status = status ? status : (ctx.status || 404);
		logger.info('res url:' + url + ',method:' + method + ',status:' + status + ',ip:' + ip + ',cost:' + (Date.now() - startTime));
	};
};
