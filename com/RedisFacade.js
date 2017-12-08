var genericPool = require("generic-pool");
var Redis = require('ioredis');
var config = require('../config/redisConfig')

/**
 * Step 1 - Create pool using a factory object
 */
const factory = {
	create: function () {
		return new Redis(config.port, config.host, config.options);
	},
	destroy: function (client) {
		client.quit();
	}
};

const opts = {
	max: 10, // maximum size of the pool
	min: 2 // minimum size of the pool
};

const redisPool = genericPool.createPool(factory, opts);

/**
 * Step 3 - Drain pool during shutdown (optional)
 */
// Only call this once in your application -- at the point you want
// to shutdown and stop using this pool.
process.on('exit', (code) => {
	console.log(`process to exit with code: ${code}`);
	redisPool.drain().then(function () {
		redisPool.clear();
	});
});

async function set(key, val, seconds) {
	var client = await redisPool.acquire();
	await client.set(key, val);
	await client.expire(key, seconds || 600);
	await redisPool.release(client);
}

async function get(key) {
	var client = await redisPool.acquire();
	var res = await client.get(key);
	await redisPool.release(client);
	return res;
}

async function hmset(key, obj, seconds) {
	var client = await redisPool.acquire();
	await client.hmset(key, obj);
	await client.expire(key, seconds || 600);
	await redisPool.release(client);
}

async function hgetall(key) {
	var client = await redisPool.acquire();
	var res = await client.hgetall(key);
	await redisPool.release(client);
	return res;
}

async function exists(key) {
	var client = await redisPool.acquire();
	var res = await client.exists(key);
	await redisPool.release(client);
	return res === 1;
}

async function expire(key, seconds) {
	var client = await redisPool.acquire();
	var res = await client.expire(key, seconds || 600);
	await redisPool.release(client);
}

module.exports = {
	get,
	set,
	hmset,
	hgetall,
	exists,
	expire
}
