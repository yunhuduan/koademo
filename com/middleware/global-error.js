module.exports = function (options) {
	let logger = options.logger || console;
	return async function globalError (ctx, next) {
		try {
			await next();
		} catch (err) {
			logger.error(err.stack);
			ctx.status = err.statusCode || err.status || 500;
			let resbody = {
				code: ctx.status
			};
			if (err.expose) {
				resbody = {
					code: ctx.status,
					msg: err.message
				};
			}
			ctx.body = resbody;
			throw err;
		}
	};
};
