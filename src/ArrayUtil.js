export function beforeLast(array) {
	const i = beforeLastIndex(array)
	return i < 0 ? null : array[i]
}

export function beforeLastIndex(array) {
	return array.length - 2
}

export function callAll(array, ...args) {
	array.forEach((item) => {
		if (typeof item === 'function') {
			item(...args)
		}
	})
}

export function clear(array) {
	array.splice(0)
}

export function insert(array, index, item) {
	if (!withinRange(array, index, true)) {
		throw new Error('Index is out of range')
	}

	array.splice(index, 0, item)
}

export function insertAfter(array, refItem, item) {
	const i = array.indexOf(refItem)

	if (i < 0) {
		throw new Error("Reference item doesn't exist")
	}

	array.splice(i + 1, 0, item)
}

export function insertBefore(array, refItem, item) {
	const i = array.indexOf(refItem)

	if (i < 0) {
		throw new Error("Reference item doesn't exist")
	}

	array.splice(i, 0, item)
}

export function itemAfter(array, refItem) {
	const i = array.indexOf(refItem)
	const lastIdx = lastIndex(array)
	return i < 0 || i >= lastIdx ? null : array[i + 1]
}

export function itemBefore(array, refItem) {
	const i = array.indexOf(refItem)
	return i <= 0 ? null : array[i - 1]
}

export function last(array) {
	const i = lastIndex(array)
	return i < 0 ? null : array[i]
}

// Return the index of the last item. The number will be
// negative if list is empty.
export function lastIndex(array) {
	return array.length - 1
}

// Find and remove the item if it exists.
export function remove(array, item) {
	const i = array.indexOf(item)

	if (i > -1) {
		array.splice(i, 1)
	}
}

// Replace an existing item with a new item. If the
// current item doesn't exist it is appended to the list.
// If the current item doesn't exist an exception is
// thrown.
export function replace(array, currentItem, newItem) {
	const i = array.indexOf(currentItem)

	if (i < 0) {
		throw new Error("Current item doesn't exist")
	}

	array.splice(i, 1, newItem)
}

// Returns true if the index is an accessible list item.
//
// If includeLength is true, will also return true if the
// index is equal to the length.
export function withinRange(array, index, includeLength = false) {
	return (
		(index >= 0 && index < array.length) || //
		(includeLength && index === array.length)
	) //
}

export default {
	beforeLast, //
	beforeLastIndex,
	callAll,
	clear,
	insert,
	insertAfter,
	insertBefore,
	itemAfter,
	itemBefore,
	last,
	lastIndex,
	remove,
	replace,
	withinRange,
}
