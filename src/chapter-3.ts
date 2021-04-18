// ==========
// Exercise 1
// ==========

// As is using let, the type is going to be `number`.
let a = 1042;

// As is using let, the type is going to be `string`.
let b = 'apples and oranges';

// As is using const, the type is going to be `pineapples`.
const c = 'pineapples';

// As is using let, the type is going to be `boolean[]`.
let d = [true, true, false];

// As is using let, the type is going to be `{ type: string }`.
let e = { type: 'ficus' };

// As is using const and is an array, the type is going to be `number[]`.
const g = [3];

// As is using let, is using `any`.
let h = null;


// ==========
// Exercise 2
// ==========

// a.
// This will throw an error because we want to change the value from
// 3 to 4, and we typed it to be 3, not number.
let i: 3 = 3;
i = 4;

// b.
// This will throw an error because TypeScript types the variable to be
// `number[]` and we're adding a new string to the array.
let j = [1, 2, 3];
j.push(4);
j.push('5');

// c.
// This will throw because 4 is not a subtype of `never`
let k: never = 4;

// d.
// `unknown` is a type that represents that it could be anything at runtime
// you'll need to prove TypeScript that a value of `unknown` actually has a
// more specific value.
let l: unknown = 4;
let m = l * 2;
