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

	get dirtySize() {
		return this._dirty.length
	}

	clean() {
		this._dirty.clear()
		return this
	}

	equalsIf(f) {
		checkCmpFunc(f)
		this._equals = f
		return this
	}

	delete(k) {
		if (this.has(k)) {
			super.delete(k)
			this._dirty.add(k)
		}

		return this
	}

	isDirty() {
		return this._dirty.size > 0
	}

	isKeyDirty(key) {
		return this._dirty.has(key)
	}

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

	putMissing(k, v, f) {
		if (!this.has(k)) {
			this.put(k, v, f)
		}
		return this
	}

	set(k, v) {
		super.set(k, v)
		this._dirty.add(k)
		return this
	}

	setDirty(k) {
		this._dirty.add(k)
		return this
	}

	/*


		// Puts all enumerable own properties of the object into
	// the map. Triggers a single update notification.
	putProps(obj) {
		if (this._putProps(obj)) {
			this.updated()
		}

		return this
	}

	_putProps(obj) {
		const names = Object.getOwnPropertyNames(obj)
		let changed = false

		for (const n of names) {
			changed = this._put(n, obj[n], false) || changed
		}

		return changed
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
