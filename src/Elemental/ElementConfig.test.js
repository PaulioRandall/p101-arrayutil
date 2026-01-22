import ElementConfig from './ElementConfig.js'

describe('ElementConfig.js', () => {
	test('applyTo(elem): Happy path', () => {
		const ec = new ElementConfig()

		ec.attribute('width', '120px')
		ec.style('border', ['1px', 'solid', 'black'])
		ec.transform('rotate', '45deg')

		const div = document.createElement('div')
		ec.applyTo(div)

		expect(div.getAttribute('width')).toEqual('120px')
		expect(div.style.border).toEqual('1px solid black')
		expect(div.style.transform).toEqual('rotate(45deg)')
	})

	test('applyTo(elem): Throws error when not an element', () => {
		const ec = new ElementConfig()
		const f = () => ec.applyTo('')
		expect(f).toThrow(Error)
	})

	test('attribute(key, value): Adds attribute', () => {
		const ec = new ElementConfig()

		ec.attribute('width', '120px')
		expect(ec._attributes.get('width')).toEqual('120px')
	})

	test('attribute(key, value): Removes attribute', () => {
		const ec = new ElementConfig()

		ec.style('width', '120px')
		ec.style('width')

		expect(ec._attributes.has('width')).toEqual(false)
	})

	test('style(key, value): Adds style', () => {
		const ec = new ElementConfig()

		ec.style('color', 'green')
		expect(ec._styles.get('color')).toEqual('green')
	})

	test('style(key, value): Removes style', () => {
		const ec = new ElementConfig()

		ec.style('color', 'green')
		ec.style('color')

		expect(ec._styles.has('green')).toEqual(false)
	})

	test('transform(key, value): Adds transform', () => {
		const ec = new ElementConfig()

		ec.transform('rotate', '45deg')

		expect(ec._transforms.get('rotate')).toEqual('45deg')
	})

	test('transform(key, value): Removes transform', () => {
		const ec = new ElementConfig()

		ec.transform('rotate', '45deg')
		ec.transform('rotate')

		expect(ec._transforms.has('rotate')).toEqual(false)
	})
})
