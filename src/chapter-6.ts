// ==========
// Exercise 1
// ==========

// a. Assignable, 1 is a subtype of number.
// b. Not assignable, number is not a subtype of 1. It's its supertype.
// c. Assignable, string is a subtype of number | string.
// d. Not assignable, boolean is not a subtype of number.
// e. Assignable, number[] is a subtype of (number | string)[].
// f. Not assignable, (number | string)[] is not a subtype of number[].
// g. Assignable, { a: true } is a subtype of { a: boolean }.
// h. Assignable, {a: { b: [string] } } is a subtype of { a: { b: [number | string] } }.
// i. Assignable, (a: number) => string is a subtype of (b: number) => string.
// j. Not assignable, (a: number) => string is not a subtype of (a: string) => string.
// k. Assignable, (a: number | string) => string is a subtype of (a: string) => string.
// l. Not assignable, Enums are nominally typed and thus E is different to F.

// ==========
// Exercise 2
// ==========

// The type of keyof O is 'a'
// The type of O['a']['b'] is { c: string }

type O = {a: {b: {c: string}}}
type KeyOfO = keyof O
type OAB = O['a']['b']

// ==========
// Exercise 3
// ==========

type Exclusive<T, U> = (T extends U ? never : T) | (U extends T ? never : U)
type Exclusive2<T, U> = Exclude<T, U> | Exclude<U, T>

// ==========
// Exercise 4
// ==========

const globalCache = {
  get(cacheKey: string): string {
    return '4' // https://xkcd.com/221/
  },
}

function fetchUser(): string {
  return globalCache.get('userId')
}

const userId = fetchUser()
userId.toUpperCase()
