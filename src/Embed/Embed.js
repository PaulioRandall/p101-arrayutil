function Embed(classes = [], props = {}) {
	class BaseClazz {
		constructor() {
			for (const EmbedClazz of classes) {
				this['_' + EmbedClazz.name] = new EmbedClazz()
			}

			for (const propName in props) {
				this['_' + propName] = props[propName]
			}
		}
	}

	for (const EmbedClazz of classes) {
		defineEmbedClazzProps(BaseClazz, EmbedClazz)
	}

	for (const propName in props) {
		defineAccessorProp(BaseClazz, propName)
	}

	return BaseClazz
}

function defineEmbedClazzProps(BaseClazz, EmbedClazz) {
	const propName = '_' + EmbedClazz.name
	const subPropNames = Object.getOwnPropertyNames(
		EmbedClazz.prototype //
	)

	for (const subPropName of subPropNames) {
		const desc = describeClazzProp(
			EmbedClazz, //
			propName, //
			subPropName //
		)

		if (ignoreProp(desc)) {
			continue
		}

		if (desc.hasGetter || desc.hasSetter) {
			defineClazzAccessorProp(BaseClazz, desc)
			continue
		}

		if (desc.isFunc) {
			defineFuncProp(BaseClazz, desc)
		}
	}
}

function defineAccessorProp(Clazz, name) {
	const fieldName = '_' + name

	Object.defineProperty(Clazz.prototype, name, {
		configurable: true,
		enumerable: false,
		get: function () {
			return this[fieldName]
		},
		set: function (v) {
			this[fieldName] = v
		},
	})
}

function ignoreProp(desc) {
	return desc.subName.startsWith('_')
}

function describeClazzProp(Clazz, name, subName) {
	const desc = Object.getOwnPropertyDescriptor(
		Clazz.prototype, //
		subName //
	)

	return {
		name,
		subName,
		hasGetter: typeof desc.get === 'function',
		hasSetter: typeof desc.set === 'function',
		isFunc: typeof desc.value === 'function',
	}
}

function defineClazzAccessorProp(Clazz, desc) {
	Object.defineProperty(Clazz.prototype, desc.subName, {
		configurable: true,
		enumerable: false,
		get: makeGetter(desc.hasGetter, desc.name, desc.subName),
		set: makeSetter(desc.hasSetter, desc.name, desc.subName),
	})
}

function makeGetter(hasGetter, name, subName) {
	if (hasGetter) {
		return function () {
			return this[name][subName]
		}
	}
}

function makeSetter(hasSetter, name, subName) {
	if (hasSetter) {
		return function (v) {
			this[name][subName] = v
		}
	}
}

function defineFuncProp(Clazz, desc) {
	Object.defineProperty(Clazz.prototype, desc.subName, {
		value: makeFunc(desc.name, desc.subName),
		writable: true,
		enumerable: false,
		configurable: true,
	})
}

function makeFunc(name, subName) {
	return function (...args) {
		return this[name][subName](...args)
	}
}

export default Embed
