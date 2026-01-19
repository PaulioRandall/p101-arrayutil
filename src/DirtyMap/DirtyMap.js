function err(msg) {
	return new Error(`[DirtyMap] ${msg}`)
}

function defaultEquals(a, b) {
	return a === b
}

function checkCmpFunc(f, skipIfUndefined = false) {
	if (skipIfUndefined && f === undefined) {
		return
	}

	if (!f || typeof f !== 'function') {
		throw err(`Compare function must be a function, not a '${typeof f}'`)
	}
}

// DirtyMap keeps track of entries that have changed. It
// does not record what or how those changes were made.
// Calling the clean function will clear all keys of dirt.
export default class DirtyMap extends Map {
	_dirty = new Set()
	_equals = defaultEquals

	// Returns the number of dirty keys in the map.
	get dirtySize() {
		return this._dirty.length
	}

	// Removes all keys from the dirty set. Returns the
	// DirtyMap instance.
	clean() {
		this._dirty.clear()
		return this
	}

	// Sets the default function that tests for equality.
	// For some functions that mutate the map, this
	// determines whether a key will become dirty as a result
	// of the operation. Returns the DirtyMap instance.
	//
	// By default, a strict equality (triple equals) is used.
	equalsIf(f) {
		checkCmpFunc(f)
		this._equals = f
		return this
	}

	// Puts the value in the map for the given key. If the
	// old and new values are not equal then the key will be
	// added to the dirty set. Returns the DirtyMap
	// instance.
	//
	// The set function will always add the key to the dirty
	// set.
	put(k, v, f) {
		checkCmpFunc(f, true)

		const hasKey = this.has(k)
		const currValue = this.get(k)
		const areEqual = f ? f : this._equals

		if (hasKey && areEqual(currValue, v)) {
			return this
		}

		super.set(k, v)
		this._dirty.add(k)

		return this
	}

	// Returns true if the map is dirty, i.e. 1 or more
	// values have changed since the map creation or the last
	// call to clean.
	isDirty() {
		return this._dirty.size > 0
	}

	// Returns true if the specified key is dirty, i.e. its
	// value has changed since the map creation or the last
	// call to clean.
	isKeyDirty(key) {
		return this._dirty.has(key)
	}

	/*
		// Puts a value into the map only if the name is not
	// a key currently in the map.
	putMissing(name, value) {
		if (!this._map.has(name)) {
			this.put(name, value)
		}

		return this
	}

		// Puts all enumerable own properties of the object into
	// the map. Triggers a single update notification.
	putProps(obj) {
		if (this._putProps(obj)) {
			this.updated()
		}

		return this
	}

	_put(name, value, forceDirty = false) {
		const changed = this.willDirty(name, value)

		if (changed) {
			this._map.set(name, value)
		}

		if (forceDirty || changed) {
			this._dirty.add(name)
			return true
		}

		return false
	}



	_putProps(obj) {
		const names = Object.getOwnPropertyNames(obj)
		let changed = false

		for (const n of names) {
			changed = this._put(n, obj[n], false) || changed
		}

		return changed
	}

	// If value is undefined, then returns the result of the
	// 'get' function. If value is defined, then this calls
	// the 'put' function.
	val(name, value = undefined, forceDirty = false) {
		if (value === undefined) {
			return this.get(name)
		}
		return this.put(name, value, forceDirty)
	}

	// Deletes an entry if it exists. Causes the name to be
	// entered into the dirty map if a deletion occurred.
	del(name) {
		if (this._map.has(name)) {
			this._dirty.add(name)
			this._map.delete(name)
			this.updated()
		}
		return this
	}

	// Returns the underlying map entries.
	map(f) {
		const result = []

		for (const entry of this._map.entries()) {
			result.push(f(entry))
		}

		return result
	}

	// Returns true if putting this name value pair will
	// cause the name to be become dirty.
	willDirty(name, value) {
		return !this._map.has(name) || this._map.get(name) !== value
	}

	// Sets a name as dirty. Name does not have to be in the
	// map itself.
	dirty(name) {
		this._dirty.add(name)
		this.updated()
		return this
	}

	// Returns an array of all dirty names.
	listDirty() {
		return [...this._dirty]
	}


	*/
}
