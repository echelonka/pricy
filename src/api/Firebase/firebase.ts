import app from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'
import {UserData} from '../../types'

type UserProfile = {
  displayName: string | null,
  photoURL: string | null,
}

const config = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_DATABASE_URL,
  projectId: process.env.REACT_APP_PROJECT_ID,
}

export default class Firebase {
  public readonly auth: app.auth.Auth
  private readonly db: app.firestore.Firestore

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

  updateProfile = (profile: Partial<UserProfile>) => {
    return this.auth.currentUser!.updateProfile(profile)
  }

  signOut = () => this.auth.signOut()

  // *** User API ***

  get walletsCollection() {
    return this.db.collection(`users/${this.auth.currentUser?.uid}/wallets`)
  }

  get userData() {
    return this.db.doc(`users/${this.auth.currentUser?.uid}`)
  }

  updateUserData = (userData: Partial<UserData>) => {
    return this.userData.update(userData)
  }
}
