import Elemental from './Elemental.js'

export default class AutoElemental extends Elemental {
	setElement(...args) {
		super.setElement(...args)
		super.update()
		return this
	}

	transform(...args) {
		super.transform(...args)
		super.update()
		return this
	}
}
