# P101: JavaScript Util

Paulio's personal JavaScript utility library. It is a collection of packages, classes, and functions that are useful to me, in my projects, and for my style of development.

I try hard to keep things as isolated as possible to make copy+paste easier. This means there will be some duplication where abstraction would normally be appropriate.

## Usage

Copy+paste packages, classes, and functions needed from _[/src](./src)_. Tests are written in [Jest](https://jestjs.io/) but should be easy to adapt to whatever you use.

## Packages

- **[src/ArrayUtil](./src/ArrayUtil/README.md)**: Functions for manipulating and querying arrays. When pulling in [Lodash](https://lodash.com/docs) would be overkill.
- (Experimental) **[src/EmbedUtil](./src/EmbedUtil/README.md)**: Function for replicating [Go struct embedding](https://pkg.go.dev/embed).

## Discussion

This stuff is usually stored as Gists. I've used maybe 1 or 2 of the Gists I've ever created. I forget they exist. I figured this could be a better way to store code snippets. Another problem with Gists is that I can't easily clone and run automated tests like I can here.

At work, I occasionally pull in [Lodash](https://lodash.com/docs) as other JavaScript programmers are likely to be familiar with it. But only when I need a few non-trivial functions. It annoys me that I can't easily copy+paste from other libraries (with tests) in scenarios where I just want 1 or 2 trivial functions.
