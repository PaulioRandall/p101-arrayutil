import Elemental from './Elemental.js'

describe('Elemental.js', () => {
	test('enableAutoUpdate(): Sets auto update', () => {
		const elem = new Elemental()

		elem.enableAutoUpdate()
		expect(elem.autoUpdate).toEqual(true)

		elem.enableAutoUpdate(false)
		expect(elem.autoUpdate).toEqual(false)
	})

	test('Performs auto update', () => {
		const div = document.createElement('div')
		const elem = new Elemental(div, true)

		elem.attribute('width', '120px')
		expect(div.getAttribute('width')).toEqual('120px')

		elem.style('border', ['1px', 'solid', 'black'])
		expect(div.style.border).toEqual('1px solid black')

		elem.transform('rotate', '45deg')
		expect(div.style.transform).toEqual('rotate(45deg)')
	})

	test('enableAutoUpdate(): Throws error if not bool', () => {
		const elem = new Elemental()
		const f = () => elem.enableAutoUpdate('not a bool')
		expect(f).toThrow(Error)
	})

	test('setElement(): Happy path', () => {
		const elem = new Elemental()
		const div = document.createElement('div')

		elem.setElement(div)
		expect(elem.element).toEqual(div)
	})

	test('setElement(elem): Throws error when not an element', () => {
		const elem = new Elemental()
		const f = () => elem.setElement('not an element')
		expect(f).toThrow(Error)
	})

	test('update()', () => {
		const div = document.createElement('div')
		const elem = new Elemental(div)

		elem.attribute('width', '120px')
		elem.style('border', ['1px', 'solid', 'black'])
		elem.transform('rotate', '45deg')

		elem.update(div)

		expect(div.getAttribute('width')).toEqual('120px')
		expect(div.style.border).toEqual('1px solid black')
		expect(div.style.transform).toEqual('rotate(45deg)')
	})
})
