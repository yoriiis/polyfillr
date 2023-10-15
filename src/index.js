/**
 * @license MIT
 * @name polyfillr
 * @version 2.0.0
 * @author: Yoriiis
 * @description: Polyfillr dynamically load polyfills with dynamic import before start your application
 * {@link https://github.com/yoriiis/polyfillr}
 * @copyright 2020 Joris DANIEL
 **/

const Promise = require('promise-polyfill');

// Load Promise polyfill if necessary
if (!window.Promise) {
	window.Promise = Promise;
}

/**
 * Function inspire by Anuj Nair
 * https://anujnair.com/blog/13-conditionally-load-multiple-polyfills-using-webpack-promises-and-code-splitting
 *
 * @param {Array} polyfills List of polyfills
 * @param {String} callback Function executed when all polyfills are loaded
 */
module.exports = function polyfillr ({ polyfills, callback = () => {}, debug = false }) {
	if (polyfills.some(polyfill => polyfill.test)) {
		const polyfillFns = [];

		// Loop on all polyfills to test
		polyfills.forEach(polyfill => {
			if (polyfill.test) {
				if (debug) {
					console.log('%c[Polyfillr -> loadPolyfills]', 'color: #11a8cd;', polyfill.name);
				}
				polyfillFns.push(polyfill.load());
			}
		});

		// Promise all polyfills and executes the callback
		window.Promise.all(polyfillFns).then(() => callback());
	} else {
		callback();
	}
};
