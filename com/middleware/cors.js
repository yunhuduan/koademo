/**
 * 跨域请求中间件
 * @param {Object} [options]
 *  - {String|Function(ctx)} origin `Access-Control-Allow-Origin`, 默认是请求的Origin
 *  - {String|Array} allowMethods `Access-Control-Allow-Methods`, 默认是 'GET,HEAD,PUT,POST,DELETE,PATCH'
 *  - {String|Array} allowHeaders `Access-Control-Allow-Headers`
 *  - {String|Number} maxAge `Access-Control-Max-Age` 最大超时时间单位秒
 *  - {Boolean} credentials `Access-Control-Allow-Credentials`
 * @returns {cors} 中间件方法
 */
module.exports = function (options) {

	const defaults = {
		allowMethods: "GET,HEAD,PUT,POST,DELETE,PATCH"
	};

	options = Object.assign({}, defaults, options);

	if (Array.isArray(options.allowMethods)) {
		options.allowMethods = options.allowMethods.join(",");
	}

	if (Array.isArray(options.allowHeaders)) {
		options.allowHeaders = options.allowHeaders.join(",");
	}

	if (options.maxAge) {
		options.maxAge = String(options.maxAge);
	}

	options.credentials = !!options.credentials;


	return function cors(ctx, next) {
		const requestOrigin = ctx.get("Origin");
		//this setting see: https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Access-Control-Allow-Origin
		ctx.response.vary("Origin");

		//get origin
		let origin;
		if (typeof options.origin === "function") {
			origin = options.origin(ctx);
			if (!origin) {
				return next();
			}
		} else {
			origin = options.origin || requestOrigin;
		}

		ctx.set("Access-Control-Allow-Origin", origin);

		if (options.credentials === true) {
			ctx.set("Access-Control-Allow-Credentials", "true");
		}

		if (options.maxAge) {
			ctx.set("Access-Control-Max-Age", options.maxAge);
		}

		if (options.allowMethods) {
			ctx.set("Access-Control-Allow-Methods", options.allowMethods);
		}

		let allowHeaders = options.allowHeaders;
		if (!allowHeaders) {
			allowHeaders = ctx.get("Access-Control-Request-Headers");
		}
		if (allowHeaders) {
			ctx.set("Access-Control-Allow-Headers", allowHeaders);
		}

		if (ctx.request.method.toUpperCase() === "OPTIONS") {
			ctx.status = 204;
		} else {
			return next();
		}

	};

};
