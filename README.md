# JavaScript Util (P101)

Paulio's personal JavaScript utility library. It is a collection of packages, classes, and functions that are useful to me, in my projects, and for my style of development.

I try hard to keep things as isolated as possible to make copy+paste easier. This means there will be some duplication where an abstraction would normally be appropriate.

## Usage

1. Copy+paste packages, classes, and functions needed from _[/src](./src)_. Tests are written in [Jest](https://jestjs.io/) but should be easy to adapt to whatever you use.

2. I may put on NPM at some point.

## API

- **[src/ArrayUtil](./src/ArrayUtil/ArrayUtil.md)**: Functions for manipulating and querying arrays.

## Why?

This stuff is usually stored as Gists. I've used maybe 1 or 2 of the Gists I've created over the years because I forget they exist. I figured exploring alternative approaches to storing code snippets. Another problem with Gists is that I can't easily clone and run automated tests like a repository.

At work, I occasionally pull in [Lodash](https://lodash.com/docs) as others will be more familiar with it, but only when I need non-trivial functions on need to use a significant number of them. Remember that this library is optimised for me, not general usage.
