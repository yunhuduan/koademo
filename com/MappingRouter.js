const fs = require('fs');
const path = require('path');
const router = require('koa-router')();

function addMapping(router, mapping) {
	let pathArr, method, path;
	for (var url in mapping) {
		pathArr = url.split(":");
		if (pathArr.length < 2) {
			console.warn(`invalid URL: ${url}`);
			continue;
		}
		method = pathArr[0].trim().toUpperCase();
		path = pathArr[1].trim();
		if (method === "GET") {
			router.get(path, mapping[url]);
			console.log(`register URL mapping: GET ${path}`);
		} else if (method === "POST") {
			router.post(path, mapping[url]);
			console.log(`register URL mapping: POST ${path}`);
		} else if (method === "PUT") {
			router.put(path, mapping[url]);
			console.log(`register URL mapping: PUT ${path}`);
		} else if (method === "DELETE") {
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
		console.error('=====controller dir is not exist=====');
		return;
	}
	console.log('=====>>>parse controller dir:' + controllersDir);
	addControllers(router, controllersDir);
	return router.routes();
};
