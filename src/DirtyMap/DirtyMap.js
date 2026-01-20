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

	get dirty() {
		return this._dirty
	}

	clean() {
		this._dirty.clear()
		return this
	}

	delete(k) {
		if (this.has(k)) {
			super.delete(k)
			this._dirty.add(k)
		}

		return this
	}

	equalsIf(f) {
		checkCmpFunc(f)
		this._equals = f
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

	putAll(obj, f) {
		const keys = Object.getOwnPropertyNames(obj)

		for (const k of keys) {
			this.put(k, obj[k], f)
		}

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

	setAll(obj) {
		const keys = Object.getOwnPropertyNames(obj)

		for (const k of keys) {
			this.set(k, obj[k])
		}

		return this
	}

	/*
	// Returns true if putting this name value pair will
	// cause the name to be become dirty.
	willPutDirty(k, v) {
		return !this.has(k) || this.get(k) !== v
	}
	*/
}
