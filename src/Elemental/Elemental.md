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

- [`dispatch(eventType, detail)`](#dispatcheventType-detail)
- [`enableAutoUpdate(bool)`](#enableAutoUpdatebool)
- [`off(eventType, listener, options)`](#offeventType-listener-options)
- [`on(eventType, listener, options)`](#oneventType-listener-options)
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

### `dispatch(eventType, detail)`

Dispatches an event on the element if an element is set, else does nothing. Returns the Elemental instance for method chaining.

```js
import Elemental from './path/to/Elemental.js'

const div = document.createElement('div')
const elem = new Elemental(div)

elem.dispatch('scrolledintoview')

elem.dispatch('scrolledintoview', {
	// event.detail: put what ever you want here.
	scrollDirection: 'down',
})
```

### `enableAutoUpdate(bool)`

Enable or disables auto update on change. This means changes to attributes, styles, and transform configuration will synchronously be applied to the set element, if one is set. Returns the Elemental instance for method chaining.

Without a parameter, always enables. Passed parameter must be a boolean else an error is thrown.

```js
import Elemental from './path/to/Elemental.js'

const div = document.createElement('div')
const elem = new Elemental(div)

elem.enableAutoUpdate(true)
```

### `off(eventType, listener, options)`

Unregisters an event listener from the element if it's set, else does nothing. Essentailly a short cut for `removeEventListener`. Returns the Elemental instance for method chaining.

```js
import Elemental from './path/to/Elemental.js'

const div = document.createElement('div')
const elem = new Elemental(div)

function handleClick() {
	// Whatever.
}

elem.on('click', handleClick)

elem.off('click', handleClick)
```

### `on(eventType, listener, options)`

Registers an event listener to the element if it's set, else does nothing. Essentailly a short cut for `addEventListener`. Returns a function that will unregister the listener when invoked.

```js
import Elemental from './path/to/Elemental.js'

const div = document.createElement('div')
const elem = new Elemental(div)

const unregister = elem.on('click', () => {
	// Whatever.
})

// Unregisters the event listener.
// Alternative is to use the off method.
unregister()
```

### `setElement(element)`

Sets the underlying element being adapted. Must be an instance or sub class of [Element](https://developer.mozilla.org/en-US/docs/Web/API/Element) else an error is thrown. Returns the Elemental instance for method chaining.

```js
import Elemental from './path/to/Elemental.js'

const elem = new Elemental()
const div = document.createElement('div')

elem.setElement(div)
```

### `update()`

Applies the configuration to the set element. Does nothing if no element currently set. Returns the Elemental instance for method chaining.

```js
import Elemental from './path/to/Elemental.js'

const div = document.createElement('div')
const elem = new Elemental(div)

elem.attribute('width', '120px')
elem.style('border', ['1px', 'solid', 'black'])
elem.transform('rotate', '45deg')

elem.update()
```
