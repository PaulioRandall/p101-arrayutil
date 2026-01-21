import Elemental from './Elemental.js'

// TODO: This could accept a set of elements??

function removeFromArray(array, item) {
	const i = array.indexOf(item)

	if (i > -1) {
		array.splice(i, 1)
	}
}

export default class AutoElemental extends Elemental {
	_elements = []

	constructor(...elements) {
		this.addElements(...elements)
	}

	get elements() {
		return this._elements
	}

	addElements(...elements) {
		this._elements.push(...elements)
		this._update()
		return this
	}

	removeElements(...elements) {
		elements.forEach(this._removeElement)
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

	_removeElement(item) {
		const i = this._elements.indexOf(item)

		if (i > -1) {
			this._elements.splice(i, 1)
		}
	}

	_update() {
		if (this._element) {
			this.applyTo(this._element)
		}
	}
}
