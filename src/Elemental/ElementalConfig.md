# Class: ElementalConfig

Provides a simplified way to apply property configurations to elements.

## API

```js
import ElementConfig from './path/to/ElementConfig.js'
```

**Instance Methods**

- [`applyTo(element)`](#applyToelement)
- [`attr(key, value)`](#attrkey-value)
- [`attribute(key, value)`](#attributekey-value)
- [`style(key, value)`](#stylekey-value)
- [`trans(key, value)`](#transkey-value)
- [`transform(key, value)`](#transformkey-value)

### `applyTo(element)`

Applies the configuration to the passed element. Throws an error if the passed value is not an instance of [Element](https://developer.mozilla.org/en-US/docs/Web/API/Element). Returns the Elemental instance for chaining.

```js
import ElementConfig from './path/to/ElementConfig.js'

const ec = new ElementConfig()
const div = document.createElement('div')

ec.transform('rotate', '45deg')
ec.applyTo(div)
```

### `attr(key, value)`

Alias for `attribute(key, value)`.

### `attribute(key, value)`

If the value is not undefined, adds the attribute to the map of attributes. If value is undefined or omitted then deletes any existing entry instead. Returns the ElementConfig instance for chaining.

```js
import ElementConfig from './path/to/ElementConfig.js'

const ec = new ElementConfig()

ec.attribute('width', '120px')
ec.attribute('class', 'centered button-style')

// Array items are joined with a space during element application.
ec.attribute('class', ['centered', 'button-style'])
```

**Delete Attribute**

```js
import ElementConfig from './path/to/ElementConfig.js'

const ec = new ElementConfig()

ec.attribute('width', '120px')

// Either of these will delete the attribute.
ec.attribute('width')
ec.attribute('width', undefined)
```

### `style(key, value)`

If the value is not undefined, adds the style to the map of styles. If value is undefined or omitted then deletes any existing entry instead. Returns the ElementConfig instance for chaining.

```js
import ElementConfig from './path/to/ElementConfig.js'

const ec = new ElementConfig()

ec.style('color', 'green')
ec.style('border', '1px solid black')

// Array items are joined with a space during element application.
ec.style('border', ['1px', 'solid', 'black'])
```

**Delete Style**

```js
import ElementConfig from './path/to/ElementConfig.js'

const ec = new ElementConfig()

ec.style('color', 'green')

// Either of these will delete the style.
ec.style('color')
ec.style('color', undefined)
```

### `trans(key, value)`

Alias for `transform(key, value)`.

### `transform(key, value)`

If the value is not undefined, adds the transformation to the map of transforms. If value is undefined or omitted then deletes any existing entry instead. Returns the ElementConfig instance for chaining.

```js
import ElementConfig from './path/to/ElementConfig.js'

const ec = new ElementConfig()

ec.transform('rotate', '45deg')
ec.transform('translate', '25px 50px')

// Array items are joined with a space during element application.
ec.transform('translate', ['25px', '50px'])
```

**Delete Transformation**

```js
import ElementConfig from './path/to/ElementConfig.js'

const ec = new ElementConfig()

ec.transform('rotate', '45deg')

// Either of these will delete the transformation.
ec.transform('rotate')
ec.transform('rotate', undefined)
```
