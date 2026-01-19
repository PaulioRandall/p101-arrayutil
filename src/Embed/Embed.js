function Embed(...classes) {
	const classList = prepClassList(classes)

	class BaseClazz {
		constructor() {
			for (const entry of classList) {
				this[entry.name] = new entry.type()
			}
		}
	}

	for (const entry of classList) {
		defineEmbedClazzProps(BaseClazz, entry)
	}

	return BaseClazz
}

function prepClassList(classes) {
	return classes.map((clazz) => {
		const isObjType = isBaseObject(clazz)
		const type = isObjType ? clazz.type : clazz
		const namePrefix = isObjType && clazz.public ? '' : '_'

		return {
			type: type,
			name: namePrefix + type.name,
		}
	})
}

function isBaseObject(type) {
	const proto = Object.getPrototypeOf(
		Object.getPrototypeOf(type) //
	)

	return proto === null
}

function defineEmbedClazzProps(BaseClazz, entry) {
	//console.log(entry)
	const EmbedClazz = entry.type
	const propName = entry.name
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
