// ==========
// Exercise 1
// ==========

import {create} from 'node:domain'

// An interface is just a "blueprint" of what a class must have
// when using the interface as its implementation. An interface
// cannot have any implemented methods, just its signatures. An
// interface cannot be instantiated.
// A class implements the methods and can be instantiated.

// ==========
// Exercise 2
// ==========

class PrivateClass {
  private constructor() {}
}

// Cannot be extended
class PrivateExtended extends PrivateClass {}
const privateInstance = new PrivateClass() // Cannot be instantiated

class ProtectedClass {
  protected constructor() {}
}

// It can be extended
class ProtectedExtended extends ProtectedClass {}
const protectedClass = new ProtectedClass() // Cannot be instantiated directly

// ==========
// Exercise 3
// ==========

type Shoe = {purpose: string}

class BalletFlat implements Shoe {
  purpose = 'dancing'
}

class Boot implements Shoe {
  purpose = 'woodcutting'
}

class Sneaker implements Shoe {
  purpose = 'walking'
}

type ShoeCreator = {
  create(type: 'boot'): Boot
  create(type: 'sneaker'): Sneaker
  create(type: 'balletFlat'): BalletFlat
}

let Shoe: ShoeCreator = {
  create(type: 'balletFlat' | 'boot' | 'sneaker'): Shoe {
    switch (type) {
      case 'balletFlat':
        return new BalletFlat()
      case 'boot':
        return new Boot()
      case 'sneaker':
        return new Sneaker()
    }
  },
}

// ==========
// Exercise 4
// ==========

// class RequestBuilder {
//   private data: object | null = null
//   private method: 'get' | 'post' | null = null
//   private url: string | null = null

//   setMethod(method: 'get' | 'post'): this {
//     this.method = method
//     return this
//   }

//   setUrl(url: string): this {
//     this.url = url
//     return this
//   }

//   setData(data: object): this {
//     this.data = data
//     return this
//   }

//   send() {
//     // Send data...
//   }
// }

// Part 1: The builder should be called in an specific order
type Method = 'get' | 'post'

class RequestBuilderWithUrl {
  data: object | null = null

  constructor(private method: Method, private url: string) {}

  setData(data: object): this {
    this.data = data
    return this
  }

  send() {
    // Send data...
  }
}

class RequestBuilderWithMethod {
  constructor(private method: Method) {}

  setUrl(url: string): RequestBuilderWithUrl {
    return new RequestBuilderWithUrl(this.method, url)
  }
}

class RequestBuilderSpecificOrder {
  setMethod(method: Method): RequestBuilderWithMethod {
    return new RequestBuilderWithMethod(method)
  }
}

// Part 2: The builder must call the two methods, it doesn't matter
// in which order they're called.
type RequestBuilderAnyOrderType = {
  method: Method
  url: string
  data?: object
}

class RequestBuilderAnyOrder {
  method?: Method
  url?: string
  data?: object

  setMethod(method: string): this & Pick<RequestBuilderAnyOrderType, 'method'> {
    return Object.assign(this, {method})
  }

  setUrl(url: string): this & Pick<RequestBuilderAnyOrderType, 'url'> {
    return Object.assign(this, {url})
  }

  setData(data: object): this & Pick<RequestBuilderAnyOrderType, 'data'> {
    return Object.assign(this, {data})
  }

  send(this: RequestBuilderAnyOrderType) {
    // Send data...
  }
}

new RequestBuilderAnyOrder().setUrl('asdf').setMethod('post').send()
