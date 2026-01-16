import Embed from './Embed.js'

// A simple class that holds an ID and allows the ID to be
// checked for equality.
class Identifiable {
	_id = ''

	get id() {
		return this._id
	}

	set id(id) {
		this._id = id
	}

	// id may be a string or instance of Identifiable.
	equals(id) {
		if (!this._id) {
			return false
		}

		if (typeof id === 'string') {
			return this._id === id
		}

		if (id instanceof Identifiable) {
			return this._id === id._id
		}

		return false
	}
}

// A simple class that allows styles to be stored and
// retrieved.
class Styleable {
	_styles = new Map()

	getStyle(k) {
		return this._styles.get(k)
	}

	setStyle(k, v = undefined) {
		if (v === undefined) {
			this._del(k)
		} else {
			this._set(k, v)
		}
	}

	_del(k) {
		this._styles.delete(k)
	}

	_set(k, v) {
		this._styles.set(k, v)
	}
}

// Class embedding Identifiable and Styleable using the
// Embed function.
class AutoEmbed extends Embed([Identifiable, Styleable]) {
	constructor() {
		this.id = crypto.randomUUID()
	}

	show() {
		this.setStyle('visibility', 'visible')
	}

	hide() {
		this.setStyle('visibility', 'hidden')
	}
}

// This class represents the class returned from
// Embed(Identifiable, Styleable) which is extended by
// AutoEmbed.
class ClassReturnedFromEmbed {
	constructor() {
		this._Identifiable = new Identifiable()
		this._Styleable = new Styleable()
	}

	get id() {
		return this._Identifiable.id
	}

	set id(id) {
		this._Identifiable.id = id
	}

	equals(...args) {
		return this._Identifiable.equals(...args)
	}

	getStyle(...args) {
		return this._Styleable.getStyle(...args)
	}

	setStyle(...args) {
		return this._Styleable.setStyle(...args)
	}
}

// If you were to write it yourself it would probably look
// like this.
class ManualEmbed {
	constructor() {
		this._Identifiable = new Identifiable()
		this._Styleable = new Styleable()

		this.id = crypto.randomUUID()
	}

	get id() {
		return this._Identifiable.id
	}

	set id(id) {
		this._Identifiable.id = id
	}

	equals(...args) {
		return this._Identifiable.equals(...args)
	}

	getStyle(...args) {
		return this._Styleable.getStyle(...args)
	}

	setStyle(...args) {
		return this._Styleable.setStyle(...args)
	}

	show() {
		this.setStyle('visibility', 'visible')
	}

	hide() {
		this.setStyle('visibility', 'hidden')
	}
}

export default {}
