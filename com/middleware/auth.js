
function noop() {
}

/**
 * 鉴权中间件
 * @param options {
 *  excludePaths: Array不需要鉴权的路径
 *  staticSuffix: Array静态资源不需要鉴权的后缀默认:['.js', '.png', '.gif', 'jpeg', '.jpg', '.css', '.woff', '.eot', '.ttf', '.svg']
 *  validFunc: function(ctx)验证方法
 * }
 * @returns {function(*=, *)}
 */
module.exports = (options) => {
	let excludePaths = options.excludePaths || [];
	let staticSuffix = options.staticSuffix || ['.js', '.png', '.gif', 'jpeg', '.jpg', '.css', '.woff', '.eot', '.ttf', '.svg'];
	let validFunc = options.valid || noop;
	return async function auth(ctx, next) {
		let path = ctx.path;
		let suffixIndex = path.lastIndexOf('.');
		let suffix = suffixIndex !== -1 ? path.substring(suffixIndex) : '';
		if (suffix && staticSuffix.includes(suffix) || excludePaths.includes(path)) {
			await next();
		} else {
			if (validFunc) {
				let isValid = await validFunc(ctx);
				if (isValid) {
					await next();
				} else {
					ctx.status = 401;
					ctx.body = {
						code: '401'
					};
				}
			} else {
				await next();
			}
		}
	};
};
