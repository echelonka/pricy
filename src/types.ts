import firebase from 'firebase'

export type Wallet = {
  name: string,
  balance: number,
  created_at: firebase.firestore.Timestamp,
  currency: string,
  id: string,
}
