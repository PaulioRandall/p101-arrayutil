# Class: Elemental

> TODO: Summary description.

## API

```js
import Elemental from './path/to/Elemental.js'
```

**Instance Methods**

- [`applyTo(element)`](#applyToelement)
- [`style(key, value)`](#stylekey-value)
- [`transform(key, value)`](#transformkey-value)

### `applyTo(element)`

Applies the configuration to the passed element. Throws an error if the passed value is not an instance of [Element](https://developer.mozilla.org/en-US/docs/Web/API/Element). Returns the Elemental instance for chaining.

```js
import Elemental from './path/to/Elemental.js'

const etal = new Elemental()
const div = document.createElement('div')

etal.transform('rotate', '45deg')
etal.applyTo(div)
```

### `style(key, value)`

If the value is not undefined, adds the style to the map of styles. If value is undefined or omitted then deletes any existing entry instead. Returns the Elemental instance for chaining.

```js
import Elemental from './path/to/Elemental.js'

const etal = new Elemental()

etal.style('color', 'green')
etal.style('border', '1px solid black')

// Array items are joined with a space during element application.
etal.style('border', ['1px', 'solid', 'black'])
```

### `transform(key, value)`

If the value is not undefined, adds the transformation to the map of transforms. If value is undefined or omitted then deletes any existing entry instead. Returns the Elemental instance for chaining.

```js
import Elemental from './path/to/Elemental.js'

const etal = new Elemental()

etal.transform('rotate', '45deg')
etal.transform('translate', '25px 50px')

// Array items are joined with a space during element application.
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
