import Embed from './Embed.js'
import _ from './Example.js'

class A {
	_a = 'alpha'

	get a() {
		return this._a
	}

	set a(v) {
		this._a = v
	}

	getA() {
		return this._a
	}

	setA(v) {
		this._a = v
	}
}

class B {
	_b = 'beta'

	get b() {
		return this._b
	}

	set b(v) {
		this._b = v
	}

	getB() {
		return this._b
	}

	setB(v) {
		this._b = v
	}
}

describe('Embed.js', () => {
	test('Adds getter', () => {
		class AddsGetters extends Embed(A, B) {}
		const instance = new AddsGetters()

		expect(instance.a).toEqual('alpha')
		expect(instance.b).toEqual('beta')
	})

	test('Adds setter', () => {
		class AddsSetters extends Embed(A, B) {}
		const instance = new AddsSetters()

		instance.a = 'changed alpha'
		instance.b = 'changed beta'

		expect(instance.a).toEqual('changed alpha')
		expect(instance.b).toEqual('changed beta')
	})

	test('Adds functions', () => {
		class AddsFunctions extends Embed(A, B) {}
		const instance = new AddsFunctions()

		expect(typeof instance.getA).toEqual('function')
		expect(typeof instance.setA).toEqual('function')

		expect(typeof instance.getB).toEqual('function')
		expect(typeof instance.setB).toEqual('function')

		expect(instance.getA()).toEqual('alpha')
		expect(instance.getB()).toEqual('beta')

		instance.setA('changed alpha')
		instance.setB('changed beta')

		expect(instance.a).toEqual('changed alpha')
		expect(instance.b).toEqual('changed beta')
	})
})
