module.exports = {
	port: 6379,
	host: '10.0.0.114',
	options: {
		db: 6,
		password: '',
		connectTimeout: 10000,
		keyPrefix: 'koademo:'
	},
	//redis pool config
	poolops: {
		min: 2,
		max: 10
	}
}
