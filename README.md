# CompositionJS: A lightweight CSS-in-JS compiler

CompositionJS is a lightweight CSS-in-JS compiler that makes it easy to add CSS directly inside your JavaScript code. The focus is based around simpilicty, usability, and readablity.

## Installation

### Node.js (Install)

Requirements:

* Node.js
* npm (Node.js package manager)

```
npm install @compositionjs/core

yarn add @compositionjs/core
```

#### Usage

ES6 import:

```js
import { css } from '@composition/core'

const styles = {
  margin: 0,
  padding: 0,
};

// Pass styles and the HTML element to add the styles to
css(styles, document.body);
```

Modular include:

```js
var css = require('@compositionjs/core').css;

// Pass styles and the HTML element to add the styles to
css(styles, document.body);
```

## Writing Styles

Styles are written as a JavaScript object:

```js
const styles = {
  backgroundColor: 'red',
  color: 'white',
  display: 'block',
}
```

You can use camelcase or quoted strings for properties:

```js
const styles = {
  // These are the same
  backgroundColor: 'blue',
  'background-color': 'blue',
}
```

### Nested Styles

CompositionJS provides the ability to use nested styles with an easy to use syntax:

```js
const styles = {
  backgroundColor: 'blue',
  'ul': {
    listStyle:
  }
}
```

## Available Functions

### `css()`

This function runs through the entire CompositionJS process with the following steps:

1. Creates a unique id based on the provided styles
2. Generates a string of CSS using the id as a class name
3. Adds the class name to the provided element
4. Adds the styles to the document

| Property | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| **styles** | `object` | `true` | | Object of CSS properties |
| **element** | `HTMLElement` | `false` | | HTML element to apply the properties to |

### `objectToCssLoop()`

This function is used by `css()` and creates a string of CSS with a unique id as the base class name.

| Property | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| **object** | `object` | `true` | | Object of CSS properties |
| **element** | `string` | `false` | | Starting identifier to wrap the properties in |

## Optimizations

### Unique Class Name

The `css()` function first checks for changes in the styles automatically. If no changes are detected the function stops running. This works through the unique id that is created and used as a class name. The id is created based on the provided CSS. If styles change so does the class name. This provides the additional value of utilizing common styles for multiple elements by avoiding duplication.
