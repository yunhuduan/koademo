const log4jsconfig = require('../config/log4jsconfig');
const log4js = require('log4js');

log4js.configure(log4jsconfig);
console.log('log4js config finished......')
var logger = {};

var log = log4js.getLogger();


function formatMsg(args) {
	if (args.length === 1) {
		return getTextMsg(args[0]);
	} else if (args.length === 2) {
		return getFormatMsg(args[0], args[1]);
	} else if (args.length === 3) {
		return getFormatMsg(args[0] + getErrorMsg(args[2]), args[1]);
	} else {
		return getTextMsg(args[0]);
	}
};

function getFormatMsg(msg, ctx) {
	var session = ctx.session || {};
	var userInfo = session.userInfo || {};
	var ip= session.IP || '';
	var userKey = (userInfo.id ? '[' + userInfo.id + ']' : '') + (ip ? '[' + ip + ']' : '');
	return userKey + getTextMsg(msg);
};

function getTextMsg(msg) {
	if(typeof msg === 'object'){
		return JSON.stringify(msg);
	}else{
		return msg;
	}

}

function getErrorMsg(error) {
	if(!error){
		return '';
	}
	return error.name + error.message + error.stack
}

/**
 * @param msg
 * @param ctx
 */
logger.debug = function () {
	log.debug(formatMsg(arguments));
};

/**
 * @param msg
 * @param ctx
 */
logger.info = function () {
	log.info(formatMsg(arguments));
};

/**
 * @param msg
 * @param ctx
 */
logger.warn = function () {
	log.warn(formatMsg(arguments));
};
/**
 * @param msg
 * @param ctx
 * @param error
 */
logger.error = function () {
	log.error(formatMsg(arguments));
};
/**
 * @param msg
 * @param ctx
 * @param error
 */
logger.fatal = function () {
	log.fatal(formatMsg(arguments));
};

module.exports = logger;

