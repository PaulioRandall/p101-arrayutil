// Tests '@paulio/array-util-js' can be imported and used.

import ArrayUtil from '@paulio/array-util-js'

test('ArrayUtil', () => {
	const letters = ['A', 'B', 'C']
	const act = ArrayUtil.last(letters)
	expect(act).toEqual('C')
})
