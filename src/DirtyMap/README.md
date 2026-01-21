# Class: DirtyMap

DirtyMap keeps a set of all keys for entries that are dirty, i.e. those that have been added, changed, deleted, or flagged by the user. It does not record what changes were made. Calling the clean function will clear the dirty set.

Implementation wise, it decorates the builtin JavaScript [Map](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map).

## API

```js
import DirtyMap from './path/to/DirtyMap.js'
```

All new and overidden values and functions are listed. Use standard builtin [Map documentation](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map) to learn about other map values and functions.

**Instance Values**

- [`dirty`](#dirty)

**Instance Functions**

- [`clean()`](#clean)
- [`clear()`](#clear)
- [`delete(key)`](#deletekey)
- [`getOrInsert(key, defaultValue)`](#getOrInsertkey-defaultValue)
- [`getOrInsertComputed(key, valueGenerator)`](#getOrInsertComputedkey-valueGenerator)
- [`isDirty()`](#isDirty)
- [`isKeyDirty(key)`](#isKeyDirtykey)
- [`put(key, value, compareFunction)`](#putkey-value-compareFunction)
- [`putAll(object, compareFunction)`](#putAllobject-compareFunction)
- [`putMissing(key, value, compareFunction)`](#putMissingkey-value-compareFunction)
- [`putWillDirty(key, value, compareFunction)`](#putWillDirtykey-value-compareFunction)
- [`set(key, value)`](#setkey-value)
- [`setAll(object)`](#setAllobject)

### `dirty`

Returns the dirty set, which is a standard [JavaScript Set](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set).

```js
import DirtyMap from './path/to/DirtyMap.js'

const map = new DirtyMap()

map.set('a', 1)
map.set('b', 2)

const numberOfDirtyKeys = map.dirty.size
// numberOfDirtyKeys === 2

const dirtyKeys = map.dirty.keys
// dirtyKeys = ['a', 'b']
```

### `clean()`

Removes all keys from the dirty set. Returns the DirtyMap instance.

```js
import DirtyMap from './path/to/DirtyMap.js'

const map = new DirtyMap()
map.set('a', 1)
map.set('b', 2)

// map.dirty.size === 2
map.clean()
// map.dirty.size === 0
```

### `clear()`

Clears the map adding all keys to the dirty set. Returns the DirtyMap instance.

```js
import DirtyMap from './path/to/DirtyMap.js'

const map = new DirtyMap()

map.set('a', 1)
map.set('b', 2)
map.set('c', 3)

map.clean()
// map === {'a': 1, 'b': 2, 'c': 3}
// map.dirty === []

map.clear()
// map === {}
// map.dirty === ['a', 'b', 'c']
```

### `delete(key)`

Deletes an entry if it exists. The key is flagged as dirty only if a deletion occurred.

```js
import DirtyMap from './path/to/DirtyMap.js'

const map = new DirtyMap()

map.set('a', 1)
map.clean()

map.delete('a')
// map.isKeyDirty('a') === true

map.clean()
map.delete('a')
// map.isKeyDirty('a') === false
```

### `getOrInsert(key, defaultValue)`

Returns the value associated with the key. If the key does not exist within the map, the default value is set as the value within the map, the key is added to the dirty set, and the default value is returned.

```js
import DirtyMap from './path/to/DirtyMap.js'

const map = new DirtyMap()

// map.get('a') === undefined
// map.isKeyDirty('a') === false

map.getOrInsert('a', 1)

// map.get('a') === 1
// map.isKeyDirty('a') === true
```

### `getOrInsertComputed(key, valueGenerator)`

Returns the value associated with the key. If the key does not exist within the map, the value generator function is called and result set as the value within the map, the key is added to the dirty set, and the generated value is returned. The key is passed to the value generator when invoked.

```js
import DirtyMap from './path/to/DirtyMap.js'

const map = new DirtyMap()

// map.get('abc') === undefined
// map.isKeyDirty('abc') === false

map.getOrInsertComputed('abc', (key) => {
	return key.length
})

// map.get('abc') === 3
// map.isKeyDirty('abc') === true
```

### `isDirty()`

Returns true if the map is dirty, i.e. 1 or more keys have been flagged as dirty since the map creation or the last call to clean.

```js
import DirtyMap from './path/to/DirtyMap.js'

const map = new DirtyMap()
map.isDirty() // === false

map.put('a', 1)
map.isDirty() // === true

map.clean()
map.isDirty() // === false
```

### `isKeyDirty(key)`

Returns true if the specified key is dirty. Usually the key is dirty because its value has changed since the map creation or the last call to clean.

Note that a key for a deleted entry will still return true until the map is cleaned.

```js
import DirtyMap from './path/to/DirtyMap.js'

const map = new DirtyMap()
// map.isKeyDirty('a') === false

map.put('a', 1)
// map.isKeyDirty('a') === true

map.clean()
// map.isKeyDirty('a') === false

map.put('a', 2)
// map.isKeyDirty('a') === true
```

### `put(key, value, compareFunction)`

Puts the value in the map for the given key only if the values are not equal. If they are equal then the new value is map and the key is added to the dirty set. An optional compare function may be passed, otherwise `(a, b) => a === b` is used. Returns the DirtyMap instance.

Unlike this put function, the set function will always add the key to the dirty set, even if the values are considered equal.

```js
import DirtyMap from './path/to/DirtyMap.js'

const map = new DirtyMap()

map.put('a', 1)
map.set('b', 2)

// map.isKeyDirty('a') === true
// map.isKeyDirty('b') === true

map.clean()

map.put('a', 1)
map.set('b', 2)

// map.isKeyDirty('a') === false
// map.isKeyDirty('b') === true
```

**With optional compare function**

```js
import DirtyMap from './path/to/DirtyMap.js'

const map = new DirtyMap()

map.put('a', 3)
// map.isKeyDirty('a') === true

map.clean()

// By default, strict equality is used (===).
// Overriding with loose equality so strings are
// implicitly converted to numbers for comparison.
map.put('a', '3', (a, b) => a == b)

// map.get('a') === 3 (number, not string)
// map.isKeyDirty('a') === true
```

### `putAll(object, compareFunction)`

Puts all key/value pairs into the map that either do not currently exist or are not considered equal to the current value. Only keys that resulted in setting a new value become dirty. An optional compare function may be passed, otherwise `(a, b) => a === b` is used. Returns the DirtyMap instance.

```js
import DirtyMap from './path/to/DirtyMap.js'

const map = new DirtyMap()

map.set('a', 1)
map.set('b', 2)
map.clean()

map.putAll({
	a: 1,
	b: -2,
	c: 3,
})

// map.get('a') === 1
// map.get('b') === -2
// map.get('c') === 3

// map.dirty === ['b', 'c']
```

### `putMissing(key, value, compareFunction)`

Puts a value into the map only if the key does not currently exist. The key does not become dirty if the value is not put. An optional compare function may be passed, otherwise `(a, b) => a === b` is used. Returns the DirtyMap instance.

```js
import DirtyMap from './path/to/DirtyMap.js'

const map = new DirtyMap()

map.putMissing('a', 1)
// map.isKeyDirty('a') === true

map.clean()
map.putMissing('a', 2)
// map.isKeyDirty('a') === false
// map.get('a') === 1
```

### `putWillDirty(key, value, compareFunction)`

Returns true if the key is already dirty or putting the key/value pair will result in the key becomming dirty. An optional compare function may be passed, otherwise `(a, b) => a === b` is used.

```js
import DirtyMap from './path/to/DirtyMap.js'

const map = new DirtyMap()

let willbeDirty = map.putWillDirty('a', 1)
// willbeDirty === true

map.set('a', 1)
map.clean()

willbeDirty = map.putWillDirty('a', 1)
// willbeDirty === false
```

### `set(key, value)`

Sets the value in the map for the given key and the key is added to the dirty set. Returns the DirtyMap instance.

Unlike this set function, the put function will only change the value (and key be added to the dirty set) if the values are not considered equal.

```js
import DirtyMap from './path/to/DirtyMap.js'

const map = new DirtyMap()

map.set('a', 1)
map.put('b', 2)

// map.isKeyDirty('a') === true
// map.isKeyDirty('b') === true

map.clean()

map.set('a', 1)
map.put('b', 2)

// map.isKeyDirty('a') === true
// map.isKeyDirty('b') === false
```

### `setAll(object)`

Sets all key/value pairs in the map. All set keys will become become dirty. Returns the DirtyMap instance.

```js
import DirtyMap from './path/to/DirtyMap.js'

const map = new DirtyMap()

map.set('a', 1)
map.set('b', 2)
map.clean()

map.setAll({
	a: 1,
	b: -2,
	c: 3,
})

// map.get('a') === 1
// map.get('b') === -2
// map.get('c') === 3

// map.dirty === ['a', 'b', 'c']
```
