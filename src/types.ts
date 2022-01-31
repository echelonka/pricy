import {Timestamp} from 'firebase/firestore'

export type UserData = {
  base_currency: string,
}

export type Wallet = {
  name: string,
  balance: number,
  created_at: Timestamp,
  updated_at: Timestamp,
  currency: string,
  id: string,
}

export type Currency = {
  symbol: string,
  name: string,
  symbol_native: string,
  decimal_digits: number,
  code: string,
  name_plural: string,
}

export type CryptoCurrency = {
  symbol: string,
  name: string,
  decimal_digits: number,
}

export type ExchangeRequest = {
  /**
   * @desc Changing base currency. Enter the three-letter currency code of your preferred base currency.
   * @example base=USD
   */
  base?: string,
  /**
   * @desc Enter a list of comma-separated currency codes to limit output currencies.
   * @example symbols=USD,EUR,CZK
   */
  symbols?: string,
  /**
   * @desc The amount to be converted.
   * @example amount=1200
   */
  amount?: number,
  /**
   * @desc Round numbers to decimal place.
   * @example places=2
   */
  places?: number,
  /**
   * @desc You can switch source data between (default) forex, bank view or crypto currencies.
   * @example source=crypto
   */
  source?: 'ecb' | 'crypto',
}

export type ConvertRequest = ExchangeRequest & {
  /**
   * @desc The three-letter currency code of the currency you would like to convert from.
   */
  from: string,
  /**
   * @desc The three-letter currency code of the currency you would like to convert to.
   */
  to: string,
  /**
   * @desc It is also possible to convert currencies using historical exchange rate data.
   * @example date=1970-01-01
   */
  date?: string,
}

export type TimeSeriesRequest = ExchangeRequest & {
  /**
   * @desc The start date of your preferred timeframe.
   */
  start_date: string,
  /**
   * @desc The end date of your preferred timeframe.
   */
  end_date: string,
}

export type ConvertResponse = {
  date: string,
  historical: boolean,
  result: number,
  info: {
    rate: number,
  },
  query: {
    amount: number,
    from: string,
    to: string,
  },
  success: boolean,
}

export type TimeSeriesResponse = {
  base: string,
  end_date: string,
  start_date: string,
  rates: Record<string, Record<string, number>>,
  timeseries: boolean,
  success: boolean,
}

export type Timeframe = 'week' | 'month' | 'total'

export type ChartDataItem = {
  date: string,
  value: number,
}
