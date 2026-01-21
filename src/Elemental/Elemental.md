# Class: Elemental

> TODO: Summary description.

## API

```js
import Elemental from './path/to/Elemental.js'
```

**Instance Methods**

- [`transform(key, value)`](#transformkey-value)
- [`applyTo(element)`](#applyToelement)

### `transform(key, value)`

If the value is not undefined, adds a transformation to the map of transforms. If value is undefined or omitted then deletes any existing entry instead. Returns the Elemental instance for chaining.

```js
import Elemental from './path/to/Elemental.js'

const etal = new Elemental()

etal.transform('rotate', '45deg')
etal.transform('translate', ['25px', '50px'])
```

**Delete Transformation**

```js
import Elemental from './path/to/Elemental.js'

const etal = new Elemental()

etal.transform('rotate', '45deg')

// Either of these will delete the transformation.
etal.transform('rotate')
etal.transform('rotate', undefined)
```

### `applyTo(element)`

Applies the configuration to the passed element. Throws an error if the passed value is not an instance of [Element](https://developer.mozilla.org/en-US/docs/Web/API/Element). Returns the Elemental instance for chaining.

```js
import Elemental from './path/to/Elemental.js'

const etal = new Elemental()
const div = document.createElement('div')

etal.transform('rotate', '45deg')
etal.applyTo(div)
```
