# Elemental

> TODO: Summary description.

## Class API

```js
import Elemental from './path/to/Elemental.js'
```

**Instance Values**

- [`element`](#element)

**Instance Methods**

- [`transform(key, value)`](#transformkey-value)
- [`update()`](#update)

### `element`

Gets or sets the element. When setting, must be an [Element](https://developer.mozilla.org/en-US/docs/Web/API/Element) or sub class of it.

```js
import Elemental from './path/to/Elemental.js'

const etal = new Elemental()

etal.element = document.createElement('div')

const el = etal.element
// el === HTMLElement of type 'div'
```

### `transform(key, value)`

> TODO

### `update()`

> TODO
