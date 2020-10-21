import app from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'

type UserProfile = {
  displayName?: string | null,
  photoURL?: string | null,
}

const config = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_DATABASE_URL,
  projectId: process.env.REACT_APP_PROJECT_ID,
}

export default class Firebase {
  readonly auth: app.auth.Auth
  readonly db: app.firestore.Firestore

  constructor() {
    app.initializeApp(config)
    this.auth = app.auth()
    this.db = app.firestore()
  }

  // *** Auth API ***

  createUserWithEmailAndPassword = (email: string, password: string) => {
    return this.auth.createUserWithEmailAndPassword(email, password)
  }

  signInWithEmailAndPassword = (email: string, password: string) => {
    return this.auth.signInWithEmailAndPassword(email, password)
  }

  updateProfile = (profile: UserProfile) => {
    return this.auth.currentUser!.updateProfile(profile)
  }

  signOut = () => this.auth.signOut()

  // *** User API ***

  get walletsCollection() {
    return this.db.collection(`users/${this.auth.currentUser?.uid}/wallets`)
  }
}
