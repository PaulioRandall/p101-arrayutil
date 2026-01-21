# Classes: Elemental & AutoElemental

> TODO: Summary description.

## API

```js
import Elemental from './path/to/Elemental.js'
```

**Instance Values**

- [`element`](#element)

**Instance Methods**

- [`setElement(element)`](#setElementelement)
- [`transform(key, value)`](#transformkey-value)
- [`update()`](#update)

### `element`

Gets the underlying element, or null if no element has been set yet.

```js
import Elemental from './path/to/Elemental.js'

const elem = document.createElement('div')
const etal = new Elemental(elem)

const el = etal.element
// el === HTMLElement of type 'div'
```

### `setElement(element)`

Sets the underlying element being adapted. Must be an instance or sub class of [Element](https://developer.mozilla.org/en-US/docs/Web/API/Element), else an error is thrown.

```js
import Elemental from './path/to/Elemental.js'

const etal = new Elemental()
const elem = document.createElement('div')

etal.setElement(elem)
```

### `transform(key, value)`

If the value is not undefined, adds a transformation to the map of transforms and returns the elemental for chaining. If value is undefined or omitted then deletes any existing entry instead. Also calls the update function if using `AutoElemental`.

```js
import Elemental from './path/to/Elemental.js'

const elem = document.createElement('div')
const etal = new Elemental(elem)

etal.transform('rotate', '45deg')
etal.transform('translate', ['25px', '50px'])
```

**Delete Transformation**

```js
import Elemental from './path/to/Elemental.js'

const elem = document.createElement('div')
const etal = new Elemental(elem)

etal.transform('rotate', '45deg')

// Either of these will delete the transformation.
etal.transform('rotate')
etal.transform('rotate', undefined)
```

### `update()`

Updates the underlying element with the staged changes.
