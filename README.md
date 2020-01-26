# Polyfillr

![Polyfillr](https://img.shields.io/badge/polyfillr-v2.0.0-546e7a.svg?style=for-the-badge) [![TravisCI](https://img.shields.io/travis/com/yoriiis/polyfillr/master?style=for-the-badge)](https://travis-ci.com/yoriiis/polyfillr) ![Node.js](https://img.shields.io/node/v/polyfillr?style=for-the-badge) [![Bundlephobia](https://img.shields.io/bundlephobia/minzip/polyfillr?style=for-the-badge)](https://bundlephobia.com/result?p=polyfillr@latest)

`polyfillr` is a minimalist function to dynamically load polyfills before start your application. The function is inspired by [Anuj Nair](https://github.com/AnujRNair/) about the [conditionally load of multiple Polyfills using Webpack](https://anujnair.com/blog/13-conditionally-load-multiple-polyfills-using-webpack-promises-and-code-splitting)

## Installation

The plugin is available as the `polyfillr` package name on [npm](https://www.npmjs.com/package/polyfillr) and [Github](https://github.com/yoriiis/polyfillr).

```bash
npm i --save-dev polyfillr
```

```bash
yarn add --dev polyfillr
```

## Environment

`polyfillr` was built for Node.js `>=8.11.2`.

## Usage

Webpack need `__webpack_public_path__` variable to find the path to dynamically load files. More information in the [Webpack documentation](https://webpack.js.org/guides/public-path/#on-the-fly).

### Load polyfill from node modules

The following example load `Array.from` polyfill from `core-js` node modules with dynamic import.

```javascript
const polyfillr = require('polyfillr');

polyfillr({
    polyfills: [
        {
            name: 'Array.from',
            test: typeof Array.from !== 'function',
            load: () => {
                return import('core-js/es/array/from')
            }
        }
    ]
});
```

### Callback function when polyfills loaded

The following example load `Array.from` polyfill from `core-js` node modules with dynamic import and executed the callback function.

```javascript
const polyfillr = require('polyfillr');

polyfillr({
    polyfills: [
        {
            name: 'Array.from',
            test: typeof Array.from !== 'function',
            load: () => {
                return import('core-js/es/array/from');
            }
        }
    ],
    callback: () => {
        console.log('Polyfill loaded');
    }
});
```

### Webpack magic comments

The following example load `Array.from` polyfill from `core-js` node modules with dynamic import and add Webpack chunk name `polyfill.array-from` for the loaded polyfill file.

More information about [Webpack magic comments](https://webpack.js.org/api/module-methods/#magic-comments).

```javascript
const polyfillr = require('polyfillr');

polyfillr({
    polyfills: [
        {
            name: 'Array.from',
            test: typeof Array.from !== 'function',
            load: () => {
                return import(/* webpackChunkName: "polyfill.array-from" */ 'core-js/es/array/from');
            }
        }
    ]
});
```

### Load polyfill from local file

The following example load `HTMLPictureElement` polyfill from `./polyfills` project directory with dynamic import.

```javascript
const polyfillr = require('polyfillr');

polyfillr({
    polyfills: [
        {
            name: 'HTMLPictureElement',
            test: typeof window.HTMLPictureElement !== 'function',
            load: () => {
                return import('./polyfills/picturefill.min.js');
            }
        }
    ]
});
```

### Multiple polyfills load

The following example load `HTMLPictureElement` polyfill from `./polyfills` project directory and `Array.from` polyfill from `core-js` node modules with dynamic import.

```javascript
const polyfillr = require('polyfillr');

polyfillr({
    polyfills: [
        {
            name: 'HTMLPictureElement',
            test: typeof window.HTMLPictureElement !== 'function',
            load: () => {
                return import('./polyfills/picturefill.min.js');
            }
        },
        {
            name: 'Array.from',
            test: typeof Array.from !== 'function',
            load: () => {
                return import('core-js/es/array/from');
            }
        }
    ]
});
```

### Debug mode

The following example load `Array.from` polyfill from `core-js` node modules with dynamic import and enables debug log in the browser devtools.

```javascript
const polyfillr = require('polyfillr');

polyfillr({
    polyfills: [
        {
            name: 'Array.from',
            test: typeof Array.from !== 'function',
            load: () => {
                return import('core-js/es/array/from');
            }
        }
    ],
    debug: true
});
```

## Parameters

### `polyfills`

`Array`

Tells to the function the list of polyfills to load. The `polyfills` array accept configurations of polyfills with an object with three parameters:

#### `name`

`String`

The name of the polyfill.

#### `test`

`Boolean`

The test to see if we need to download the polyfill to the browser.

#### `load`

`Function`

The function to executes to dynamically import the polyfill file.

### `callback`

`Function = () => {}`

Tells the optional function to execute when all polyfills are loaded.

### `debug`

`Boolean = false`

Tells to the function to enable the debug mode. Log messages will be displayed in the browser devtools for every polyfill files load.

## Licence

`polyfillr` is licensed under the [MIT License](http://opensource.org/licenses/MIT).

Created with ♥ by [@yoriiis](http://github.com/yoriiis).
