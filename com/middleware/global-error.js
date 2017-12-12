module.exports = function () {
	return async function globalError (ctx, next) {
		try {
			await next();
		} catch (err) {
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
		}
	};
};
