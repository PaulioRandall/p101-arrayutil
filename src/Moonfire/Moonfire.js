export function invoke(obj, criteria, startFromBack = false) {
	const funcs = functions(obj, criteria)

	if (startFromBack) {
		funcs.reverse()
	}

	for (const { func, context } of funcs) {
		func.call(context)
	}
}

export function functions(obj, criteria) {
	return prototypes(obj) //
		.map((proto) => matchOwnFuncs(proto, criteria, obj)) //
		.flat() //
}

export function prototypes(obj) {
	const result = []
	let proto = Object.getPrototypeOf(obj)

	while (proto) {
		result.push(proto)
		proto = Object.getPrototypeOf(proto)
	}

	return result
}

function matchOwnFuncs(proto, criteria, context) {
	const funcNames = matchOwnFuncNames(proto, criteria)

	return funcNames.map((name) => ({
		proto,
		name,
		func: proto[name],
		context,
	}))
}

function matchOwnFuncNames(proto, criteria) {
	const isFunction = (n) => typeof proto[n] === 'function'
	const names = Object.getOwnPropertyNames(proto)

	if (criteria.constructor === RegExp) {
		return names //
			.filter((n) => criteria.test(n)) //
			.filter(isFunction)
	}

	if (names.includes(criteria) && isFunction(criteria)) {
		return [criteria]
	}

	return []
}

export default {
	functions,
	prototypes,
	invoke,
}
