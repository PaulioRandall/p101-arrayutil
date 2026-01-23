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

	dispatch(eventType, detail = null, options = {}) {
		if (!this._element) {
			return this
		}

		options.detail = detail !== null ? detail : options.detail

		const event = new CustomEvent(eventType, options)
		this._element.dispatchEvent(event)
	}

	enableAutoUpdate(v = true) {
		if (typeof v !== 'boolean') {
			throw err(`Boolean required, instead got '${typeof v}'`)
		}

		this._autoUpdate = v
		return this
	}

	off(eventType, listener, options) {
		const elem = this._element

		if (elem) {
			elem.removeEventListener(eventType, listener, options)
		}

		return this
	}

	on(eventType, listener, options) {
		const elem = this._element

		if (!elem) {
			return null
		}

		elem.addEventListener(eventType, listener, options)
		return () => elem.removeEventListener(eventType, listener, options)
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
