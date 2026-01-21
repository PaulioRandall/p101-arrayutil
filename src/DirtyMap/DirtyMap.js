function err(msg) {
	return new Error(`[DirtyMap] ${msg}`)
}

function strictEquals(a, b) {
	return a === b
}

function checkCmpFunc(f) {
	if (!f || typeof f !== 'function') {
		throw err(`Compare function must be a function, not a '${typeof f}'`)
	}
}

export default class DirtyMap extends Map {
	_dirty = new Set()

	get dirty() {
		return this._dirty
	}

	clean() {
		this._dirty.clear()
		return this
	}

	clear() {
		for (const k of this.keys()) {
			this._dirty.add(k)
		}

		super.clear()
		return this
	}

	delete(k) {
		if (this.has(k)) {
			super.delete(k)
			this._dirty.add(k)
		}

		return this
	}

	getOrInsert(k, defaultValue) {
		if (this.has(k)) {
			return this.get(k)
		}

		super.set(k, defaultValue)
		this._dirty.add(k)

		return defaultValue
	}

	getOrInsertComputed(k, valueGenerator) {
		if (this.has(k)) {
			return this.get(k)
		}

		const v = valueGenerator(k)
		super.set(k, v)
		this._dirty.add(k)

		return v
	}

	isDirty() {
		return this._dirty.size > 0
	}

	isKeyDirty(k) {
		return this._dirty.has(k)
	}

	put(k, v, f = strictEquals) {
		checkCmpFunc(f)
		this._put(k, v, f)
		return this
	}

	putAll(obj, f = strictEquals) {
		checkCmpFunc(f)
		const keys = Object.getOwnPropertyNames(obj)

		for (const k of keys) {
			this._put(k, obj[k], f)
		}

		return this
	}

	putMissing(k, v, f = strictEquals) {
		checkCmpFunc(f)

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

	putWillDirty(k, v, f = strictEquals) {
		checkCmpFunc(f)

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
