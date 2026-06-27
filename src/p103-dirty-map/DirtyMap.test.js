// Tests '@paulio/dirty-map-js' can be imported and used.

import DirtyMap from '@paulio/dirty-map-js'

test('DirtyMap', () => {
	const m = new DirtyMap()

	m.put('cheese', 2)
	m.put('milk', 4)
	m.put('bread', 1)

	expect(m.isDirty()).toEqual(true)
	expect(m.isKeyDirty('milk')).toEqual(true)
	expect(m.isKeyDirty('jam')).toEqual(false)

	m.put('buns', 3, (a, b) => {
		// If both items start with 'b', then they are equal
		// and the insert should be skipped.
		return a.startsWith('b') && b.startsWith('b')
	})
	expect(m['buns']).toEqual(undefined)

	m.clean()
	expect(m.isDirty()).toEqual(false)

	// Quick way to add entries.
	m.putAll({
		chocolate: 9,
		butter: 2,
	})

	const s = new Set()
	s.add('chocolate')
	s.add('butter')
	expect(m.dirty).toEqual(s)
})
