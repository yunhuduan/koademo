/**
 * 数据库配置信息,当前是mysql
 * @type {{database: string, username: string, password: string, options: {host: string, port: string, dialect: string, pool: {max: number, min: number, idle: number, acquire: number}}}}
 */
module.exports = {
	database: "zx_cnpmjs",
	username: "zx_cnpmjs",
	password: "zx_cnpmjs#5402",
	options: {
		host:"10.0.0.135",
		port:"3306",
		dialect:"mysql",
		pool:{
			max:10,
			min:5,
			idle: 10000,//The maximum time, in milliseconds, that a connection can be idle before being released.
			acquire: 10000//The maximum time, in milliseconds, that pool will try to get connection before throwing error
		},
		define: {
			underscored: true,
			freezeTableName: true,
			charset: 'utf8',
			timestamps: false
		},

	}
};
