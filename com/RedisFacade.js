let genericPool = require("generic-pool");
let Redis = require("ioredis");
let config = require("../config/redisConfig");

const factory = {
	create: function () {
		return new Redis(config.port, config.host, config.options);
	},
	destroy: function (client) {
		client.quit();
	}
};

const redisPool = genericPool.createPool(factory, config.poolops);

process.on("exit", (code) => {
	console.log(`process to exit with code: ${code}`);
	redisPool.drain().then(function () {
		redisPool.clear();
	});
});

/**
 * redis中添加key的值
 * @param key redis中key
 * @param val 设置的值
 * @param seconds 设置失效时间单位秒
 * @returns {Promise.<void>}
 */
async function set(key, val, seconds) {
	let client = await redisPool.acquire();
	await client.set(key, val);
	await client.expire(key, seconds || 600);
	await redisPool.release(client);
}

/**
 * redis中根据key获取值
 * @param key redis中key
 * @returns {Promise.<*>}
 */
async function get(key) {
	let client = await redisPool.acquire();
	let res = await client.get(key);
	await redisPool.release(client);
	return res;
}

/**
 * redis中添加hash值
 * @param key key
 * @param obj 对象
 * @param seconds 失效时间单位秒
 * @returns {Promise.<void>}
 */
async function hmset(key, obj, seconds) {
	let client = await redisPool.acquire();
	await client.hmset(key, obj);
	await client.expire(key, seconds || 600);
	await redisPool.release(client);
}

/**
 * 从redis中获取hash值
 * @param key
 * @returns {Promise.<*>}
 */
async function hgetall(key) {
	let client = await redisPool.acquire();
	let res = await client.hgetall(key);
	await redisPool.release(client);
	return res;
}

/**
 * 判断redis中是否存在key
 * @param key
 * @returns {Promise.<boolean>}
 */
async function exists(key) {
	let client = await redisPool.acquire();
	let res = await client.exists(key);
	await redisPool.release(client);
	return res === 1;
}

/**
 * 设置redis中key的失效时间
 * @param key
 * @param seconds
 * @returns {Promise.<void>}
 */
async function expire(key, seconds) {
	let client = await redisPool.acquire();
	await client.expire(key, seconds || 600);
	await redisPool.release(client);
}

/**
 * 执行redis中其他方法,不建议直接使用
 * @param funcName 方法名如: get ,set等
 * @param args 指向funcName的参数如: funcName=get时 args = ['key']
 * @returns {Promise.<*>}
 */
async function exec(funcName,args){
	let client = await redisPool.acquire();
	let res = await client[funcName].apply(client,args);
	await redisPool.release(client);
	return res;
}

module.exports = {
	get,
	set,
	hmset,
	hgetall,
	exists,
	expire,
	exec
};
