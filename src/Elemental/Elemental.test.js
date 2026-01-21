import Elemental from './Elemental.js'

describe('Elemental.js', () => {
	test('applyTo(elem): Happy path', () => {
		const etal = new Elemental()

		etal.style('border', ['1px', 'solid', 'black'])
		etal.transform('rotate', '45deg')

		const div = document.createElement('div')
		etal.applyTo(div)

		expect(div.style.border).toEqual('1px solid black')
		expect(div.style.transform).toEqual('rotate(45deg)')
	})

	test('applyTo(elem): Throws error when not an element', () => {
		const etal = new Elemental()
		const f = () => etal.applyTo('')
		expect(f).toThrow(Error)
	})

	test('style(key, value): Adds style', () => {
		const etal = new Elemental()

		etal.style('color', 'green')
		expect(etal._styles.get('color')).toEqual('green')
	})

	test('style(key, value): removes style', () => {
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

	test('transform(key, value): Remoces transform', () => {
		const etal = new Elemental()

		etal.transform('rotate', '45deg')
		etal.transform('rotate')

		expect(etal._transforms.has('rotate')).toEqual(false)
	})
})
