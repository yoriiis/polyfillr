module.exports = function (api) {
	const presets = [
		[
			'@babel/preset-env',
			{
				targets: {
					node: '12.14.0'
				}
			}
		]
	];

	const plugins = [];

	api.cache.using(() => process.env.NODE_ENV);

	if (api.env('test')) {
		plugins.push('babel-plugin-dynamic-import-node');
	}

	return {
		presets,
		plugins
	};
};
