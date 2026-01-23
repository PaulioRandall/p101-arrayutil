# Object: Moonfire

Moonfire identifies and and invokes functions on the prototype chain for a specific object.

**Object Functions**

- [`functions(object, criteria)`](#functionsobject-criteria)
- [`prototypes(object)`](#prototypesobject)
- [`invoke(object, criteria, startFromBack)`](#invokeobject-criteria-startFromBack)

## `functions(object, criteria)`

Finds and returns an array of all functions, from all prototypes of _object_, that match the _criteria_. _Criteria_ may be a string or regular expression.

```js
// Result item schema
{
	proto,   // The prototype the function belongs to.
	name,    // Name of the prototype, e.g. class name.
	func,    // The function.
	context, // The source object, i.e. the thing that
	         // should be bound to the function before
	         // invoking it.
}
```

```js
import Moonfire from './path/to/Moonfire.js'

class BaseClass {
	doThing1() {}
}

class SubClass extends BaseClass {
	doThing1() {}
	doThing2() {}
}

const thingy = new SubClass()

const functions = Moonfire.functions(thingy, 'doThing1')
// Precise function order may vary.
//
// functions === [
//   {
//     proto: SubClass.prototype,
//     name "SubClass",
//     func: SubClass.prototype.doThing1,
//     context: thingy,
//   },
//   {
//     proto: BaseClass.prototype,
//     name "BaseClass",
//     func: BaseClass.prototype.doThing1,
//     context: thingy,
//   },
// ]

const regexp = /$doThing[_a-zA-Z0-9]*/
const functions = Moonfire.functions(thingy, regexp)
// Precise function order may vary.
//
// functions === [
//   {
//     proto: SubClass.prototype,
//     name "SubClass",
//     func: SubClass.prototype.doThing2,
//     context: thingy,
//   },
//   {
//     proto: SubClass.prototype,
//     name "SubClass",
//     func: SubClass.prototype.doThing1,
//     context: thingy,
//   },
//   {
//     proto: BaseClass.prototype,
//     name "BaseClass",
//     func: BaseClass.prototype.doThing1,
//     context: thingy,
//   },
// ]
```

## `prototypes(object)`

Returns the chain of prototypes for the _object_ as an array. The _object's_ prototype will be first and the JavaScript's base Object prototype will be last.

```js
import Moonfire from './path/to/Moonfire.js'

class BaseClass {}
class SubClass extends BaseClass {}

const protos = Moonfire.prototypes(new SubClass())
// protos = [
//   SubClass.prototype,
//   BaseClass.prototype,
//   Object.prototype,
// ]
```

## `invoke(object, criteria, startFromBack)`

Invokes the functions on the _object's_ prototype chain that match the _criteria_. It ignores override mechanics so functions with the same name a different points in the prototype chain will be invoked.

_Criteria_ may be a string, representing a specific function name, or a regular expression, representing a set of function names.

If _startFromBack_ is true, the identified function list is reveresed so the last function identified is invoked first and to the first identified invoked last. See the [functions](#functionsobject-criteria) function.

```js
import Moonfire from './path/to/Moonfire.js'

class BaseClass {
	doThing1() {
		// Whatever.
	}

	doNotDoThing() {
		// Whatever.
	}
}

class SubClass extends BaseClass {
	doThing1() {
		// Overide whatever.
	}

	doThing2() {
		// Whatever.
	}
}

const thingy = new SubClass()

// Invokes the 'doThing1' for SubClass then BaseClass.
Moonfire.invoke(thingy, 'doThing1')

// Invokes the 'doThing1' for BaseClass then SubClass.
Moonfire.invoke(thingy, 'doThing1', true)

// Invokes any function that starts with 'doThing', i.e.
// - BaseClass.doThing1()
// - SubClass.doThing1()
// - SubClass.doThing2()
Moonfire.invoke(thingy, /$doThing[_a-zA-Z0-9]*/)
```
