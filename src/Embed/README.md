# EmbedUtil

Minimalist function for replicating [Go struct embedding](https://pkg.go.dev/embed). Embedding is a form of polymorphism and an alternative to both inheritance and mixins. I'd say the approach lies somewhere between inheritance and mixins in terms of flexibility, complexity, and error proneness.

An interesting experiment. Very limited and will probably break when using anything except basic class properties. It has potential and I intend to play around with it a bit.

A good use case is in helping to avoid god classes by meaningfully spliting functionality down into isolated component classes each with a clear responsibility. The former 'god' class now has a single responsibility, to integrate the component classes.

Your main issue with embedding in JavaScript is conflict in property and method names. It may force you to embed more context into your method names, making them longer and less readable. Maybe forcing you to think about your design more carefully is a good thing.

## API

```js
import Embed from './path/to/Embed.js'
```

**Functions**

- [`Embed(...classes)`](#embedclasses)

### `Embed(...classes)`

Returns a new class that embeds the argument classes. Public properties with the same name in one class will be redifined by subsequent classes, thus will only be accessible by referencing the embedded class instance specifically.

```js
import Embed from './path/to/Embed.js'

class DerivedClass extends Embed(Class1, Class2, ...etc) {
	// Derived class specific code.
}

// Or if you want a class instance to be a public field.
class DerivedClass extends Embed(
	{ type: Class1, public: true },
	{ type: Class2, public: false },
	Class3, // Can still pass other classes directly.
	...etc
) {
	// Derived class specific code.
}
```

**Simple Example**

A more detailed example can be found at [./Example.js](./Example.js).

```js
import Embed from './path/to/Embed.js'

// Class to be embedded.
class WithName {
	_name = ''

	getName() {
		return this._name
	}

	setName(name) {
		this._name = name
	}
}

// Another class to be embedded.
class WithAge {
	_age = 64

	get age() {
		return this._age
	}

	set age(v) {
		this._age = v
	}
}

const Person = Embed(WithName, WithAge)

// Derived class.
//
// Alternatively extend directly, e.g.
// `class PersonWithEyeColor extends Embed(WithName, WithAge)`
class PersonWithEyeColor extends Person {
	_eyeColor = ''

	constructor(name, age, eyeColor) {
		this.setName(name)
		this.age = age
		this._eyeColor = eyeColor
	}

	get eyeColor() {
		return this._eyeColor
	}
}
```
