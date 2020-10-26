import firebase from 'firebase'

export type Wallet = {
  name: string,
  balance: number,
  created_at: firebase.firestore.Timestamp,
  updated_at: firebase.firestore.Timestamp,
  currency: string,
  id: string,
}

export type Currency = {
  symbol: string,
  name: string,
  symbol_native: string,
  decimal_digits: number,
  rounding: number,
  code: string,
  name_plural: string,
}
