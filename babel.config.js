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

	const plugins = ['@babel/plugin-syntax-dynamic-import'];

	api.cache.using(() => process.env.NODE_ENV);

	return {
		presets,
		plugins
	};
};
