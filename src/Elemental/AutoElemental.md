# Class: AutoElemental

> TODO: Summary description.

> TODO: Revert to only having one element.

> TODO: Change name to `Elemental` once the current elemental class has had its name changed.

> TODO: Add pause and resume auto-update functionality.

> TODO: Create `Moonfire` package.

## API

```js
import Elemental from './path/to/Elemental.js'
```

Only overridden methods are specified here.

**Instance Values**

- [`element`](#element)

**Instance Methods**

- [`attr(key, value)`](#attrkey-value)
- [`attribute(key, value)`](#attributekey-value)
- [`setElement(element)`](#setElementelement)
- [`style(key, value)`](#stylekey-value)
- [`trans(key, value)`](#transkey-value)
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

### `attr(key, value)`

Alias for `attribute(key, value)`.

### `attribute(key, value)`

Overides to call the applyTo function, with the set element, after setting the attribute. Does nothing if no element set.

### `setElement(element)`

Sets the underlying element being adapted. Must be an instance or sub class of [Element](https://developer.mozilla.org/en-US/docs/Web/API/Element), else an error is thrown.

```js
import AutoElemental from './path/to/AutoElemental.js'

const etal = new AutoElemental()
const elem = document.createElement('div')

etal.setElement(elem)
```

### `style(key, value)`

Overides to call the applyTo function, with the set element, after setting the style. Does nothing if no element set.

### `trans(key, value)`

Alias for `transform(key, value)`.

### `transform(key, value)`

Overides to call the applyTo function, with the set element, after setting the transformation. Does nothing if no element set.
