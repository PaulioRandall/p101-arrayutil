import Elemental from './Elemental.js'

describe('Elemental.js', () => {
	test('applyTo(elem): Happy path', () => {
		const etal = new Elemental()

		etal.transform('rotate', '45deg')

		const div = document.createElement('div')
		etal.applyTo(div)

		expect(div.style.transform).toEqual('rotate(45deg)')
	})

	test('applyTo(elem): Throws error when not an element', () => {
		const etal = new Elemental()
		const f = () => etal.applyTo('')
		expect(f).toThrow(Error)
	})

	test('transform(key, value): Add transform', () => {
		const elem = document.createElement('div')
		const etal = new Elemental(elem)

		etal.transform('rotate', '45deg')

		expect(etal._transforms.get('rotate')).toEqual('45deg')
	})

	test('transform(key, value): Add transform', () => {
		const elem = document.createElement('div')
		const etal = new Elemental(elem)

		etal.transform('rotate', '45deg')
		etal.transform('rotate')

		expect(etal._transforms.has('rotate')).toEqual(false)
	})
})
