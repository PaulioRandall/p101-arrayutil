import DirtyMap from './DirtyMap.js'

function onUpdate(map) {
	const observer = { count: 0 }
	map.onUpdate(() => observer.count++)
	return observer
}

describe('DirtyMap.js', () => {
	test('put(k,v): New entry causes key to become dirty', () => {
		const m = new DirtyMap()
		const result = m.put('a', 1)

		expect(m.get('a')).toEqual(1)
		expect(m.isKeyDirty('a')).toEqual(true)

		expect(result).toEqual(m)
	})

	test('put(k,v): Updating entry with new value causes key to become dirty', () => {
		const m = new DirtyMap()

		m.put('a', 1)
		m.clean()
		m.put('a', 2)

		expect(m.get('a')).toEqual(2)
		expect(m.isKeyDirty('a')).toEqual(true)
	})

	test('put(k,v): Updating entry with the same value does not cause key to become dirty', () => {
		const m = new DirtyMap()

		m.put('a', 1)
		m.clean()
		m.put('a', 1)

		expect(m.get('a')).toEqual(1)
		expect(m.isKeyDirty('a')).toEqual(false)
	})

	test('put(k,v,f): Custom compare function overides default function', () => {
		const m = new DirtyMap()

		m.put('a', 1)
		m.clean()
		m.put('a', '1', (a, b) => a == b)

		expect(m.get('a')).toEqual(1)
		expect(m.isKeyDirty('a')).toEqual(false)
	})

	test('set(k,v): New entry causes key to become dirty', () => {
		const m = new DirtyMap()
		const result = m.set('a', 1)

		expect(m.get('a')).toEqual(1)
		expect(m.isKeyDirty('a')).toEqual(true)

		expect(result).toEqual(m)
	})

	test('set(k,v): Updating entry with new value causes key to become dirty', () => {
		const m = new DirtyMap()

		m.set('a', 1)
		m.clean()
		m.set('a', 2)

		expect(m.get('a')).toEqual(2)
		expect(m.isKeyDirty('a')).toEqual(true)
	})

	test('set(k,v): Updating entry with the same value causes key to become dirty', () => {
		const m = new DirtyMap()

		m.set('a', 1)
		m.clean()
		m.set('a', 1)

		expect(m.isKeyDirty('a')).toEqual(true)
	})

	/*

	test('putMissing: already exists', () => {
		const m = new DirtyMap()

		m.put('a', undefined)
		m.putMissing('a', 123)

		expect(m.get('a')).toEqual(undefined)
	})

	test('putProps()', () => {
		const m = new DirtyMap()

		const obj = Object.create(
			{ a: 1 }, //
			{ b: { value: 2 } } //
		)

		m.putProps(obj)

		expect(m.has('a')).toEqual(false)
		expect(m.get('b')).toEqual(2)

		expect(m.listDirty()).toEqual(['b'])
	})

	test('val: gets', () => {
		const m = new DirtyMap()

		m.put('a', 1)
		m.put('b', 2)

		expect(m.val('a')).toEqual(1)
		expect(m.val('b')).toEqual(2)
	})

	test('val: puts', () => {
		const m = new DirtyMap()

		m.val('a', 1)
		m.val('b', 2)

		expect(m.get('a')).toEqual(1)
		expect(m.get('b')).toEqual(2)
	})

	test('del', () => {
		const m = new DirtyMap()

		m.put('a', 1)
		m.put('b', 2)

		m.del('a')

		expect(m.has('a')).toEqual(false)
		expect(m.get('a')).toEqual(undefined)
		expect(m.get('b')).toEqual(2)
	})

	test('del: calls update', () => {
		const m = new DirtyMap()
		m.put('a', 1)
		m.put('b', 2)

		const observer = onUpdate(m)

		expect(observer.count).toEqual(0)
		m.del('a')
		expect(observer.count).toEqual(1)
		m.del('a')
		expect(observer.count).toEqual(1)
	})
	*/
})
