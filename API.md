# API

```js
import ArrayUtil from './path/to/file.js'
```

## `beforeLast(array)`

Return the second from last item. Null if no such item.

```js
import ArrayUtil from './path/to/file.js'

const list = ['A', 'B', 'C', 'D']
const item = ArrayUtil.beforeLast(list)

// item === "C"
```

## `beforeLastIndex(array)`

Return the index of the item second from last. The number
will be negative if list length is less than 2.

```js
import ArrayUtil from './path/to/file.js'

//             0,   1,   2,   3
const list = ['A', 'B', 'C', 'D']
const item = ArrayUtil.beforeLastIndex(list)

// item === 2
```

## `callAll(array, ...args)`

Iterates the list calling all callable items with the
passed arguments. Callable items are those that return true
for `typeof item === 'function'`.

```js
import ArrayUtil from './path/to/file.js'

const list = [
	(...args) => {
		/* Called first */
	},
	(...args) => {
		/* Called second */
	},
]

ArrayUtil.callAll(list, 'arg1', 'arg2')
```

## `clear(array)`

Remove all items.

```js
import ArrayUtil from './path/to/file.js'

const list = ['A', 'B', 'C', 'D']
ArrayUtil.clear(list)

// list === []
```

## `insert(array)`

Insert an item at the index location. An exception is
thrown if the index is out of range.

```js
import ArrayUtil from './path/to/file.js'

const list = ['A', 'B', 'D']
ArrayUtil.insert(list, 2, 'C')

// list === ['A', 'B', 'C', 'D']
```

## `insertAfter(array, referenceItem, itemToInsert)`

Insert an item after another item. If the reference item
doesn't exist an exception is thrown.

```js
import ArrayUtil from './path/to/file.js'

const list = ['A', 'B', 'D']
ArrayUtil.insertAfter(list, 'B', 'C')

// list === ['A', 'B', 'C', 'D']
```

## `insertBefore(array, referenceItem, itemToInsert)`

Inserts an item before another item. If the reference item
doesn't exist an exception is thrown.

```js
import ArrayUtil from './path/to/file.js'

const list = ['A', 'C', 'D']
ArrayUtil.insertBefore(list, 'C', 'B')

// list === ['A', 'B', 'C', 'D']
```

## `itemAfter(array, referenceItem)`

Return the item after the reference item. Null if no such
item exists.

```js
import ArrayUtil from './path/to/file.js'

const list = ['A', 'B', 'C', 'D']
const item = ArrayUtil.itemAfter(list, 'B')

// item === 'C'
```

## `itemAfter(array, referenceItem)`

Return the item before the reference item. Null if no
such item exists.

```js
import ArrayUtil from './path/to/file.js'

const list = ['A', 'B', 'C', 'D']
const item = ArrayUtil.itemBefore(list, 'C')

// item === 'B'
```

## `last(array)`

Returns the last item. Null if no such item.

```js
import ArrayUtil from './path/to/file.js'

const list = ['A', 'B', 'C', 'D']
const item = ArrayUtil.last(list)

// item === 'D'
```

## `lastIndex(array)`

Returns the index of the last item. The number will be
negative if list is empty.

```js
import ArrayUtil from './path/to/file.js'

//             0,   1,   2,   3
const list = ['A', 'B', 'C', 'D']
const index = ArrayUtil.lastIndex(list)

// index === 3
```

## `remove(array)`

Remove the item if it exists.

```js
import ArrayUtil from './path/to/file.js'

const list = ['A', 'B', 'C', 'D']
ArrayUtil.remove(list, 'B')

// list === ['A', 'C', 'D']
```

## `replace(array, currentItem, newItem)`

Replace an existing item with a new item. If the
existing item doesn't exist then an error is thrown.

```js
import ArrayUtil from './path/to/file.js'

const list = ['A', 'B', 'C', 'D']
ArrayUtil.replace(list, 'B', 'Beta')

// list === ['A', 'Beta', 'C', 'D']
```

## `withinRange(array, index, includeLength=false)`

Returns true if the index is an accessible list item. If
includeLength is true, then true will be returned when the
index is equal to the array length.

```js
import ArrayUtil from './path/to/file.js'

const list = ['A', 'B', 'C', 'D']

let index = ArrayUtil.withinRange(list, 2)
// index === true

index = ArrayUtil.withinRange(list, 4)
// index === false

index = ArrayUtil.withinRange(list, 4, true)
// index === true
```
