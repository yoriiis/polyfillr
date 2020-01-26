import polyfillr from '../../src/index';

// Set Webpack public path to dynamically load module
// https://webpack.js.org/guides/public-path/#on-the-fly
__webpack_public_path__ = `${window.location.protocol}//${window.location.host}${window.location.pathname}dist/`;

polyfillr({
	polyfills: [
		{
			name: 'Array.from',
			test: typeof Array.from !== 'function',
			load: () => {
				return import(
					/* webpackChunkName: "polyfill.array-from" */ 'core-js/es/array/from'
				);
			}
		},
		{
			name: 'Array.includes',
			test: typeof Array.prototype.includes !== 'function',
			load: () => {
				return import(
					/* webpackChunkName: "polyfill.array-includes" */ 'core-js/es/array/includes'
				);
			}
		}
	],
	debug: true,
	callback: () => {
		console.log('Polyfill loaded');
	}
});
