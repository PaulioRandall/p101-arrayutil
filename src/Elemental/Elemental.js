import ElementConfig from './ElementConfig'

function err(msg) {
	return new Error(`[Elemental] ${msg}`)
}

function checkElement(elem) {
	if (elem === null) {
		return
	}

	if (!(elem instanceof Element)) {
		throw err(`Not an Element, was given '${typeof elem}'`)
	}
}

export default class Elemental extends ElementConfig {
	_autoUpdate = false
	_element = null

	constructor(elem = null, autoUpdate = false) {
		super()

		this.setElement(elem)
		this.enableAutoUpdate(autoUpdate)
	}

	get autoUpdate() {
		return this._autoUpdate
	}

	get element() {
		return this._element
	}

	attr(...args) {
		super.attribute(...args)
		this._tryAutoUpdate()
		return this
	}

	attribute(...args) {
		super.attribute(...args)
		this._tryAutoUpdate()
		return this
	}

	enableAutoUpdate(v = true) {
		if (typeof v !== 'boolean') {
			throw err(`Boolean required, instead got '${typeof v}'`)
		}

		this._autoUpdate = v
		return this
	}

	setElement(elem) {
		checkElement(elem)
		this._element = elem
		this._tryAutoUpdate()
		return this
	}

	style(...args) {
		super.style(...args)
		this._tryAutoUpdate()
		return this
	}

	trans(...args) {
		super.transform(...args)
		this._tryAutoUpdate()
		return this
	}

	transform(...args) {
		super.transform(...args)
		this._tryAutoUpdate()
		return this
	}

	update() {
		if (!this._element) {
			return
		}

		this.applyTo(this._element)
		return this
	}

	_tryAutoUpdate() {
		if (this._autoUpdate) {
			this.update()
		}
	}
}
