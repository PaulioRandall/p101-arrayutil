import Elemental from './Elemental.js'

// TODO: This could accept a set of elements??

export default class AutoElemental extends Elemental {
	_element = null

	constructor(elem) {
		this.setElement(elem)
	}

	get element() {
		return this._element
	}

	setElement(v) {
		this._element = v
		this._update()
		return this
	}

	style(...args) {
		super.style(...args)
		this._update()
		return this
	}

	transform(...args) {
		super.transform(...args)
		this._update()
		return this
	}

	_update() {
		if (this._element) {
			this.applyTo(this._element)
		}
	}
}
