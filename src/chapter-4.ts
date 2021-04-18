// ==========
// Exercise 1
// ==========

// TypeScript will always try to infer the function's return type.

// ==========
// Exercise 2
// ==========

// The `arguments` object is not typesafe, you should try to always
// use the rest operator instead.

function multiplyByThree(): number[] {
  return Array.from(arguments).map((value) => value * 3)
}

multiplyByThree('this', 'is', 'not', 'ok')

function multiplyByThreeTypesafe(...rest: number[]): number[] {
  return rest.map((value) => value * 3)
}

multiplyByThreeTypesafe(3, 4, 5, 6)

// ==========
// Exercise 3
// ==========

type Reservation = unknown

type Reserve = {
  (from: Date, to: Date, destination: string): Reservation
  (from: Date, destination: string): Reservation
  (destination: string): Reservation
}

let reserve: Reserve = (
  fromOrDestination: Date | string,
  toOrDestination?: Date | string,
  destination?: string
) => {
  if (
    toOrDestination instanceof Date &&
    toOrDestination instanceof Date &&
    destination !== undefined
  ) {
    // Book a one-way trip
  } else if (
    fromOrDestination instanceof Date &&
    typeof toOrDestination === 'string'
  ) {
    // Book a round trip
  } else if (typeof fromOrDestination === 'string') {
    // Book a trip right now
  }
}

// ==========
// Exercise 4
// ==========

function call<T extends [unknown, string, ...unknown[]], R>(
  f: (...args: T) => R,
  ...args: T
): R {
  return f(...args)
}

function slice(array: number[], start: number): void {}
function fill(length: number, value: string): void {}

call(slice, [1, 2, 3], 2)
call(fill, 5, 'a')

// ==========
// Exercise 5
// ==========

function is<T>(a: T, ...b: [T, ...T[]]): boolean {
  return b.every((element) => element === a)
}

is('string', 'otherstring')
is(true, false)
is(42, 42)
is(10, 'foo')
is([1], [1, 2], [1, 2, 3])
