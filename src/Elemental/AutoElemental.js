import Elemental from './Elemental.js'

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

	attr(...args) {
		this.attribute(...args)
	}

	attribute(...args) {
		super.attribute(...args)
		this._update()
		return this
	}

	style(...args) {
		super.style(...args)
		this._update()
		return this
	}

	trans(...args) {
		this.transform(...args)
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
		this._elements.forEach(this.applyTo)
	}
}
