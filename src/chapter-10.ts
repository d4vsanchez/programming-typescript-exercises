// ==========
// Exercise 1
// ==========

type CurrencyUnit = 'EUR' | 'GBP' | 'JPY' | 'USD'
type Currency = {
  unit: CurrencyUnit
  value: number
}

namespace Currency {
  export const DEFAULT: CurrencyUnit = 'USD'

  export function from(value: number, unit = Currency.DEFAULT) {
    return {unit, value}
  }
}

let amountDue: Currency = {
  unit: 'JPY',
  value: 873733.1,
}

let otherAmountDue = Currency.from(330, 'EUR')

// ==========
// Exercise 2
// ==========

enum Currencies {
  EUR = 'EUR',
  GBP = 'GBP',
  JPY = 'JPY',
  USD = 'USD',
}

namespace CurrencyWithEnum {
  export const DEFAULT: Currencies = Currencies.EUR

  export function from(
    value: number,
    unit: Currencies = CurrencyWithEnum.DEFAULT
  ) {
    return {unit, value}
  }
}

let otherAmountDueEnum = Currency.from(100, Currencies.USD)
