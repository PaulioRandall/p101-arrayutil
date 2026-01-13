# API

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

## `clear()`

Remove all items.

```js
import ArrayUtil from './path/to/file.js'

const list = ['A', 'B', 'C', 'D']
ArrayUtil.clear(list)

// list === []
```
