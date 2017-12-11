module.exports = {
	appenders: {
		out: {
			type: 'stdout',
			layout: {
				type: 'pattern',
				pattern: '[%z][%c][%p][%d{yyyy-MM-dd-hh:mm:ss.SSS}]%m%n'
			}
		},
		dateFile: {
			type: 'dateFile',
			filename: 'logs/app.log',
			pattern: '.yyyyMMdd',//备份日志时文件名格式
			compress: true,//是否压缩备份日志
			keepFileExt: true,//保留文件的拓展名
			layout: {
				type: 'pattern',
				pattern: '[%z][%c][%p][%d{yyyy-MM-dd-hh:mm:ss.SSS}]%m%n'
			}
		}
	},
	categories: {
		default: {
			appenders: ['dateFile', 'out'],
			level: 'info'
		}
	}
}
