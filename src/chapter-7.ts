// ==========
// Exercise 1
// ==========

type UserID = unknown

interface Option<T> {
  flatMap<U>(f: (value: T) => None): None
  flatMap<U>(f: (value: U) => Option<U>): Option<U>
  getOrElse(value: T): T
}

class Some<T> implements Option<T> {
  constructor(private value: T) {}

  flatMap(f: (value: T) => None): None
  flatMap(f: (value: T) => Some<T>): Some<T>
  flatMap(f: (value: T) => Option<T>): Option<T> {
    return f(this.value)
  }

  getOrElse() {
    return this.value
  }
}

class None implements Option<never> {
  flatMap(): None {
    return this
  }

  getOrElse<U>(value: U): U {
    return value
  }
}

declare class API {
  getLoggedInUserID(): Option<UserID>
  getFriendIDs(userID: UserID): Option<UserID[]>
  getUserName(userID: UserID): Option<string>
}
