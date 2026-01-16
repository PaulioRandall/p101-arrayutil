# EmbedUtil

Minimalist function for replicating [Go struct embedding](https://pkg.go.dev/embed). Embedding is an alternative to inheritance and allows for multiple embedded classes, unlike 'extends'.

Interesting experiment. Very limited and will probably break when using anything except basic class properties. It's basically a 'decorator' generator (see decorator pattern).

## Discussion

There's advantages and disadvantages to Embedding vs Inheritance. You can't store or pass the value of 'super', because
it's just an accessor to properties, but you can store
and pass the embedded properties. Because they're just class instances assigned to a field in the embedor class. Whether you should share embedded class instances is a different argument. E.g:

```js
const embeddedClass = this.\_embeddedClassInstance`
```

## API

```js
import Embed from './path/to/Embed.js'

class Derived extends Embed(
	BaseClass1,
	BaseClass2,
	...,
) {
	// Derived class specific code.
}
```

## Quick Example

```js
import Embed from './path/to/Embed.js'

class WithName {
	_name = ''

	getName() {
		return this._name
	}

	setName(name) {
		this._name = name
	}
}

class WithAge {
	_age = 64

	get age() {
		return this._age
	}

	set age(v) {
		this._age = v
	}
}

class Person extends Embed([WithName, WithAge]) {
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

const charlie = new Person('Charlie', 65, 'blue')

console.log(charlie.getName()) // Prints `Charlie`
console.log(charlie.age) // Prints `65`
console.log(charlie.eyeColor) // Prints `blue`
```
