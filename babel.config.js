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

	return {
		presets,
		plugins
	};
};
