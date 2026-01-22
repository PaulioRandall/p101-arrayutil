# Class: Elemental

Provides a simplified way to apply changes to a specific element. When auto update is disabled, allows batching of changes to the element.

## API

```js
import Elemental from './path/to/Elemental.js'
```

> TODO: `dispatch`, `on`, `off` functions.

**Instance Values**

- [`autoUpdate`](#autoUpdate)
- [`element`](#element)

**Instance Methods**

Methods inherited from [ElementConfig](./ElementConfig.md) are not documented here. They have been decorated to support auto updating.

- [`enableAutoUpdate(bool)`](#enableAutoUpdatebool)
- [`setElement(element)`](#setElementelement)
- [`update()`](#update)

### `autoUpdate`

Gets the currently auto update state. Always a boolean.

```js
import Elemental from './path/to/Elemental.js'

const elem = new Elemental()

let isAutoUpdateSet = elem.autoUpdate
// isAutoUpdateSet === false

elem.enableAutoUpdate()

isAutoUpdateSet = elem.autoUpdate
// isAutoUpdateSet === true
```

### `element`

Gets the currently set element. It may be null.

```js
import Elemental from './path/to/Elemental.js'

const elem = new Elemental()
const div = document.createElement('div')

const elem = elem.element
// elem === HTMLELement{ type: 'div' }
```

### `enableAutoUpdate(bool)`

Enable or disables auto update on change. This means changes to attributes, styles, and transform configuration will synchronously be applied to the set element, if one is set.

Without a parameter, always enables. Passed parameter must be a boolean else an error is thrown.

```js
import Elemental from './path/to/Elemental.js'

const div = document.createElement('div')
const elem = new Elemental(div)

elem.enableAutoUpdate(true)
```

### `setElement(element)`

Sets the underlying element being adapted. Must be an instance or sub class of [Element](https://developer.mozilla.org/en-US/docs/Web/API/Element) else an error is thrown.

```js
import Elemental from './path/to/Elemental.js'

const elem = new Elemental()
const div = document.createElement('div')

elem.setElement(div)
```

### `update()`

Applies the configuration to the set element. Does nothing if no element currently set.

```js
import Elemental from './path/to/Elemental.js'

const div = document.createElement('div')
const elem = new Elemental(div)

elem.attribute('width', '120px')
elem.style('border', ['1px', 'solid', 'black'])
elem.transform('rotate', '45deg')

elem.update()
```
