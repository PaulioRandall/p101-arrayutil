# Object: Moonfire

> TODO: Summary

**Object Functions**

- [`invoke(object, criteria, options)`](#invokeobject-criteria-options)

## `invoke(object, criteria, options)`

Invokes all functions on the object that match the criteria. Criteria may be a string, representing a specific function name, or a regular expression, representing a set of function names.

```js
import Moonfire from './path/to/Moonfire.js'

class ThingDoer {
	doThing1() {
		// Whatever.
	}

	doThing2() {
		// Whatever.
	}

	doNotDoThing() {
		// Whatever.
	}
}

const thingy = new ThingDoer()

// Invokes the 'doThing1' function.
Moonfire.invoke(thingy, 'doThing1')

// Invokes any function that starts with 'doThing'.
Moonfire.invoke(thingy, /$doThing[_a-zA-Z0-9]*/)
```
