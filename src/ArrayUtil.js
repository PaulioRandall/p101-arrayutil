function err(msg) {
	return new Error(`[ArrayUtil] ${msg}`)
}

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
		throw err('Index is out of range')
	}

	array.splice(index, 0, item)
}

export function insertAfter(array, refItem, item) {
	const i = array.indexOf(refItem)

	if (i < 0) {
		throw err("Reference item doesn't exist")
	}

	array.splice(i + 1, 0, item)
}

export function insertBefore(array, refItem, item) {
	const i = array.indexOf(refItem)

	if (i < 0) {
		throw err("Reference item doesn't exist")
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

export function lastIndex(array) {
	return array.length - 1
}

export function remove(array, item) {
	const i = array.indexOf(item)

	if (i > -1) {
		array.splice(i, 1)
	}
}

export function replace(array, currentItem, newItem) {
	const i = array.indexOf(currentItem)

	if (i < 0) {
		throw err("Current item doesn't exist")
	}

	array.splice(i, 1, newItem)
}

export function withinRange(array, index, includeLength = false) {
	return (
		(index >= 0 && index < array.length) || //
		(includeLength && index === array.length) //
	)
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
