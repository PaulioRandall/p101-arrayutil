# DirtyMap

Wraps the builtin JavaScript Map to keep a track of what's changed.

## API

```js
import DirtyMap from './path/to/DirtyMap.js'
```

All map values and functions are listed but only those that differ
from the [builtin Map](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map#instance_properties) are documented here.

**Values**

- `size`
- [`dirtySize`](#dirtysize)

**Functions**

- [`clean()`](#clean)
- [`equalsIf()`](#equalsif)
- [`isDirty()`](#isDirty)
- [`isKeyDirty(key)`](#isKeyDirtykey)
- [`put(key, value, compareFunction)`](#equalsifkey-value-compareFunction)

### `clean()`

> TODO
