// ==========
// Exercise 1
// ==========

import {readFile} from 'fs'
import {fork} from 'child_process'

function promisify<T, U>(
  fn: (arg: U, cb: (error: unknown, result: T | null) => void) => void
): (arg: U) => Promise<T> {
  return (arg: U) =>
    new Promise<T>((resolve, reject) => {
      fn(arg, (error, result) => {
        if (result === null || error) {
          return reject(error)
        }
        return resolve(result)
      })
    })
}

const readFilePromise = promisify(readFile)
readFilePromise('./chapter-3.ts')
  .then((result) => console.log(result))
  .catch((error) => console.error(error))

// ==========
// Exercise 2
// ==========

type Matrix = number[][]

type MatrixProtocol = {
  determinant: {
    in: [Matrix]
    out: number
  }
  'dot-product': {
    in: [Matrix, Matrix]
    out: Matrix
  }
  invert: {
    in: [Matrix]
    out: Matrix
  }
}

type Protocol = {
  [command: string]: {
    in: unknown[]
    out: unknown
  }
}

function createProtocol<T extends Protocol>(scriptPath: string) {
  return <K extends keyof T>(command: K) => (...args: T[K]['in']) =>
    new Promise<T[K]['out']>((resolve, reject) => {
      const child = fork(scriptPath)
      child.on('message', (result) => resolve(result))
      child.on('error', (error) => reject(error))
      child.send({type: command, data: args})
    })
}

const runMatrixWithProtocol = createProtocol<MatrixProtocol>(
  './MatrixProtocol.js'
)
const determinant = runMatrixWithProtocol('determinant')
determinant([
  [1, 2],
  [3, 4],
]).then((result) => console.log(result))
