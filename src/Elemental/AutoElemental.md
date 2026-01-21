# Class: AutoElemental

> TODO: Summary description.

## API

```js
import Elemental from './path/to/Elemental.js'
```

Only overridden methods are specified here.

**Instance Values**

- [`element`](#element)

**Instance Methods**

- [`setElement(element)`](#setElementelement)
- [`style(key, value)`](#stylekey-value)
- [`transform(key, value)`](#transformkey-value)

### `element`

Gets the underlying element, or null if no element has been set yet.

```js
import AutoElemental from './path/to/AutoElemental.js'

const elem = document.createElement('div')
const autoElem = new AutoElemental(elem)

const gotElement = autoElem.element
// gotElement === HTMLElement of type 'div'
```

### `setElement(element)`

Sets the underlying element being adapted. Must be an instance or sub class of [Element](https://developer.mozilla.org/en-US/docs/Web/API/Element), else an error is thrown.

```js
import AutoElemental from './path/to/AutoElemental.js'

const etal = new AutoElemental()
const elem = document.createElement('div')

etal.setElement(elem)
```

### `style(key, value)`

Overides to call the applyTo function, with the set element, after setting a style. Does nothing if no element set.

### `transform(key, value)`

Overides to call the applyTo function, with the set element, after setting a transformation. Does nothing if no element set.
