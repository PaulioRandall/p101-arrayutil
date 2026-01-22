function err(msg) {
	return new Error(`[ElementConfig] ${msg}`)
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

export default class ElementConfig {
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
