function err(msg) {
	return new Error(`[Elemental] ${msg}`)
}

function checkElement(elem) {
	if (!(elem instanceof Element)) {
		throw err(`Not an Element, was given '${typeof elem}'`)
	}
}

function formatAttrValue(v) {
	return Array.isArray(v) ? v.join(' ') : v
}

function setOrDeleteMapEntry(map, k, v) {
	if (v === undefined) {
		map.delete(k)
	} else {
		map.set(k, v)
	}
}

export default class Elemental {
	_attributes = new Map()
	_styles = new Map()
	_transforms = new Map()

	applyTo(elem) {
		checkElement(elem)

		this._applyAttributes(elem)
		this._applyStyles(elem)
		this._applyTransforms(elem)

		return this
	}

	attr(...args) {
		return attribute(...args)
	}

	attribute(k, v = undefined) {
		setOrDeleteMapEntry(this._attributes, k, v)
		return this
	}

	style(k, v = undefined) {
		setOrDeleteMapEntry(this._styles, k, v)
		return this
	}

	trans(...args) {
		return trans(...args)
	}

	transform(k, v = undefined) {
		setOrDeleteMapEntry(this._transforms, k, v)
		return this
	}

	_applyAttributes(elem) {
		for (const [k, v] of this._attributes.entries()) {
			const value = formatAttrValue(v)
			elem.setAttribute(k, value)
		}

		this._cleanUpAttributes(elem)
	}

	_applyStyles(elem) {
		for (const [k, v] of this._styles.entries()) {
			const value = formatAttrValue(v)
			elem.style[k] = value
		}

		this._cleanUpStyles(elem)
	}

	_applyTransforms(elem) {
		const values = []

		for (const [k, v] of this._transforms.entries()) {
			const strVal = formatAttrValue(v)
			values.push(`${k}(${strVal})`)
		}

		if (values.length > 0) {
			elem.style.transform = values.join(' ')
		} else {
			delete elem.style.transform
		}
	}

	_cleanUpAttributes(elem) {
		const names = elem.getAttributeNames()
		const attrKeys = Array.from(this._attributes.keys())

		for (const name of names) {
			if (name === 'style') {
				continue
			}

			if (!attrKeys.includes(name)) {
				elem.removeAttribute(name)
			}
		}
	}

	_cleanUpStyles(elem) {
		const styleKeys = Array.from(this._styles.keys())

		for (let i = 0; i < elem.style.length; i++) {
			const key = elem.style.item(i)

			if (key === 'transform') {
				continue
			}

			if (!styleKeys.includes(key)) {
				delete elem.style[key]
			}
		}
	}
}

/*
import { randomId } from './util.js'
import Updateable from './Updateable.js'
import DirtyMap from './DirtyMap.js'

// Classes extending Elemental map to a single HTML
// element.
export default class Elemental extends Updateable {

	updated() {
		if (this._updating) {
			// To prevent calls triggered by this function.
			return
		}

		try {
			this._updating = true

			if (this.element) {
				this._updateAttr()
				this._updateStyle()
				this._updateTransform()
			}

			super.updated()
		} finally {
			this._updating = false
		}
	}

	_setElement(element) {
		this._element = element
	}

	_updateAttr() {
		for (const name of this._attrs.listDirty()) {
			const v = this._attrs.val(name)

			if (v === undefined) {
				this.element.removeAttribute(name)
			} else {
				this.element.setAttribute(name, v)
			}
		}

		this._attrs.clean()
	}

	_updateStyle() {
		if (this._styles.isDirty()) {
			const style = this._styles
				.map(([k, v]) => `${k}: ${v};`) //
				.join('') //
			this.element.setAttribute('style', style)
		}

		this._styles.clean()
	}

	_updateTransform() {
		if (this._transforms.isDirty()) {
			const transforms = this._transforms
				.map(this._transformValueToString) //
				.map(this._transformPairToString) //
				.join('') //
			this.element.setAttribute('transform', transforms)
		}

		this._transforms.clean()
	}

	_transformValueToString([k, v]) {
		if (Array.isArray(v)) {
			return [k, v.join(' ')]
		}

		return [k, v]
	}

	_transformPairToString([k, v]) {
		return `${k}(${v})`
	}
}

function randomId() {
	return crypto.randomUUID().slice(24)
}
*/
