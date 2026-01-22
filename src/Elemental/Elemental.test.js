import Elemental from './Elemental.js'

describe('Elemental.js', () => {
	test('applyTo(elem): Happy path', () => {
		const etal = new Elemental()

		etal.attribute('width', '120px')
		etal.style('border', ['1px', 'solid', 'black'])
		etal.transform('rotate', '45deg')

		const div = document.createElement('div')
		etal.applyTo(div)

		expect(div.getAttribute('width')).toEqual('120px')
		expect(div.style.border).toEqual('1px solid black')
		expect(div.style.transform).toEqual('rotate(45deg)')
	})

	test('applyTo(elem): Throws error when not an element', () => {
		const etal = new Elemental()
		const f = () => etal.applyTo('')
		expect(f).toThrow(Error)
	})

	test('attribute(key, value): Adds attribute', () => {
		const etal = new Elemental()

		etal.attribute('width', '120px')
		expect(etal._attributes.get('width')).toEqual('120px')
	})

	test('attribute(key, value): Removes attribute', () => {
		const etal = new Elemental()

		etal.style('width', '120px')
		etal.style('width')

		expect(etal._attributes.has('width')).toEqual(false)
	})

	test('style(key, value): Adds style', () => {
		const etal = new Elemental()

		etal.style('color', 'green')
		expect(etal._styles.get('color')).toEqual('green')
	})

	test('style(key, value): Removes style', () => {
		const etal = new Elemental()

		etal.style('color', 'green')
		etal.style('color')

		expect(etal._styles.has('green')).toEqual(false)
	})

	test('transform(key, value): Adds transform', () => {
		const etal = new Elemental()

		etal.transform('rotate', '45deg')

		expect(etal._transforms.get('rotate')).toEqual('45deg')
	})

	test('transform(key, value): Removes transform', () => {
		const etal = new Elemental()

		etal.transform('rotate', '45deg')
		etal.transform('rotate')

		expect(etal._transforms.has('rotate')).toEqual(false)
	})
})
