/**
 * pattern: Fields can be any of:
 %r time in toLocaleTimeString format
 %p log level
 %c log category
 %h hostname
 %m log data
 %d date, formatted - default is ISO8601, format options are: ISO8601, ISO8601_WITH_TZ_OFFSET, ABSOLUTE, DATE, or any string compatible with the date-format library. e.g. %d{DATE}, %d{yyyy/MM/dd-hh.mm.ss}
 %% % - for when you want a literal % in your output
 %n newline
 %z process id (from process.pid)
 %x{<tokenname>} add dynamic tokens to your log. Tokens are specified in the tokens parameter.
 %X{<tokenname>} add values from the Logger context. Tokens are keys into the context values.
 %[ start a coloured block (colour will be taken from the log level, similar to colouredLayout)
 %] end a coloured block
 */
module.exports = {
	appenders: {
		out: {
			type: "stdout",
			layout: {
				type: "pattern",
				pattern: "[%z][%c][%p][%d{yyyy-MM-dd-hh:mm:ss.SSS}]%m%n"
			}
		},
		dateFile: {
			type: "dateFile",
			filename: "logs/app.log",
			pattern: ".yyyyMMdd",//备份日志时文件名格式
			compress: true,//是否压缩备份日志
			keepFileExt: true,//保留文件的拓展名
			layout: {
				type: "pattern",
				pattern: "[%z][%c][%p][%d{yyyy-MM-dd-hh:mm:ss.SSS}]%m%n"
			}
		}
	},
	categories: {
		default: {
			appenders: ["dateFile", "out"],
			level: "info"
		}
	}
};
