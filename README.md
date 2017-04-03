[![npm](https://img.shields.io/npm/v/no-undefined-style-loader.svg)](https://www.npmjs.com/package/no-undefined-style-loader)
[![CircleCI](https://img.shields.io/circleci/project/github/andrewbranch/no-undefined-style-loader.svg)](https://circleci.com/gh/andrewbranch/no-undefined-style-loader)
[![styled with prettier](https://img.shields.io/badge/styled_with-prettier-ff69b4.svg)](https://github.com/prettier/prettier)

# no-undefined-style-loader

Webpack loader that warns when an undefined class name is referenced on a CSS file you imported into JavaScript. Works when chained after [css-loader](https://github.com/webpack-contrib/css-loader) with the [modules](https://github.com/webpack-contrib/css-loader#css-modules) option enabled.

I’ve found it’s painfully easy to mistype class names (or just forget to write the CSS rule I intended to reference), and it’s not always immediately obvious what went wrong. This tool intends to catch those mistakes faster than you would by hand.

**This loader is not intended to be used in production.**

## Usage

```js
// webpack.config.js (Webpack 2 syntax shown)

export default {
  entry: './app',
  module: {
    rules: [{
      test: /\.css$/,
      use: [{
        loader: 'style-loader'
      }, {
        loader: 'no-undefined-style-loader',
        options: {
          fail: true // default: false
        }
      }, {
        loader: 'css-loader',
        options: { modules: true }
      }
    }]
  }
}
```

```css
/* app.css */

.hide {
  display: none;
}
```

```js
// app.jsx

import React from 'react';
import ReactDOM from 'react-dom';
import styles from './app.css';

// This works as usual
ReactDOM.render(
  <div className={styles.hide} />,
  document.getElementById('app')
);

// This results in a warning or error
ReactDOM.render(
  <div className={styles.thisClassNameObviouslyDoesNotExist} />,
  document.getElementById('app')
);
```

The browser console will warn the developer:

```
Warning: CSS class `.thisClassNameObviouslyDoesNotExist` not found in `/Users/you/path/to/app.css`.
```

## Options

- **`fail: boolean = false`** When false, accessing undefined class names warns with `console.error`. When true, attempting to access an undefined class name throws an error.

## Browser support

This loader relies on [Proxies](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy), which have good [support](http://caniuse.com/#search=proxy) in modern browsers. If Proxies are unavailable, the loader will emit a warning in the browser console and then do nothing.