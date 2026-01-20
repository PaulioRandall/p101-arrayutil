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

	isKeyDirty(k) {
		return this._dirty.has(k)
	}

	put(k, v, f) {
		checkCmpFunc(f, true)
		this._put(k, v, f)
		return this
	}

	putAll(obj, f) {
		checkCmpFunc(f, true)
		const keys = Object.getOwnPropertyNames(obj)

		for (const k of keys) {
			this._put(k, obj[k], f)
		}

		return this
	}

	putMissing(k, v, f) {
		checkCmpFunc(f, true)

		if (!this.has(k)) {
			this._put(k, v, f)
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

	willPutDirty(k, v, f) {
		checkCmpFunc(f, true)

		return (
			this._dirty[k] || //
			!this.has(k) || //
			!this._isEqual(k, v, f)
		)
	}

	_put(k, v, f) {
		if (!this._isEqual(k, v, f)) {
			super.set(k, v)
			this._dirty.add(k)
		}
	}

	_isEqual(k, v, f) {
		const hasKey = this.has(k)
		const currValue = this.get(k)
		const areEqual = f ? f : this._equals
		return hasKey && areEqual(currValue, v)
	}
}
