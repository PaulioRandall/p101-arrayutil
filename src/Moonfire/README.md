# Object: Moonfire

> TODO: Summary

**Object Functions**

- [`functions(object, criteria)`](#functionsobject-criteria)
- [`prototypes(object)`](#prototypesobject)
- [`invoke(object, criteria, capture)`](#invokeobject-criteria-capture)

## `functions(object, criteria)`

> TODO

## `prototypes(object)`

> TODO

## `invoke(object, criteria, capture)`

Invokes the functions on the _object's_ prototype chain that match the _criteria_. It ignores override mechanics so functions with the same name a different points in the prototype chain will be invoked.

_Criteria_ may be a string, representing a specific function name, or a regular expression, representing a set of function names.

If _capture_ is true, the _object's_ prototype implementation is invoked first and the root extended implementation is called last. This mimics the behaviour of Event's capture-bubble API and mechanics.

```js
import Moonfire from './path/to/Moonfire.js'

class BaseThingy {
	doThing1() {
		// Whatever.
	}

	doNotDoThing() {
		// Whatever.
	}
}

class DerivedThingy extends BaseThingy {
	doThing1() {
		// Overide whatever.
	}

	doThing2() {
		// Whatever.
	}
}

const thingy = new DerivedThingy()

// Invokes 'doThing1' for BaseThingy then DerivedThingy.
Moonfire.invoke(thingy, 'doThing1')

// Invokes any function that starts with 'doThing', i.e.
// - BaseThingy.doThing1()
// - DerivedThingy.doThing1()
// - DerivedThingy.doThing2()
Moonfire.invoke(thingy, /$doThing[_a-zA-Z0-9]*/)
```
