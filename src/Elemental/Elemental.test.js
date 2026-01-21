import Elemental from './Elemental.js'
import './AutoElemental.js'

describe('Elemental.js', () => {
	test('setElement(elem): Happy path', () => {
		const etal = new Elemental()

		const elem = document.createElement('div')
		etal.setElement(elem)

		expect(etal.element).toEqual(elem)
	})

	test('setElement(elem): Throws error if non-Element passed', () => {
		const etal = new Elemental()
		const f = () => etal.setElement('not an element')
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
