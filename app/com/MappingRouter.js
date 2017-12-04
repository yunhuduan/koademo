const fs = require('fs');
const path = require('path');
const router = require('koa-router')();

function addMapping(router, mapping) {
	for (var url in mapping) {
		if (url.startsWith('GET ')) {
			var path = url.substring(4);
			router.get(path, mapping[url]);
			console.log(`register URL mapping: GET ${path}`);
		} else if (url.startsWith('POST ')) {
			var path = url.substring(5);
			router.post(path, mapping[url]);
			console.log(`register URL mapping: POST ${path}`);
		} else if (url.startsWith('PUT ')) {
			var path = url.substring(4);
			router.put(path, mapping[url]);
			console.log(`register URL mapping: PUT ${path}`);
		} else if (url.startsWith('DELETE ')) {
			var path = url.substring(7);
			router.del(path, mapping[url]);
			console.log(`register URL mapping: DELETE ${path}`);
		} else {
			console.warn(`invalid URL: ${url}`);
		}
	}
}

function addControllers(router, dir) {
	fs.readdirSync(dir).filter((f) => {
		return f.endsWith('.js');
	}).forEach((f) => {
		console.log(`process controller: ${f}...`);
		let mapping = require(dir + '/' + f);
		addMapping(router, mapping);
	});
}

module.exports = function (dir) {
	var controllersDir = dir || __dirname + '../controller';
	if (!fs.existsSync(dir)) {
		console.error('controller dir is not exist');
		return;
	}
	addControllers(router, controllersDir);
	return router.routes();
};