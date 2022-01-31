import app from 'firebase/compat/app'
import 'firebase/compat/auth'
import 'firebase/compat/firestore'
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

  updateProfile = (profile: Partial<UserProfile>) => {
    return this.auth.currentUser!.updateProfile(profile)
  }

  // *** User API ***

  get userData() {
    return this.db.doc(`users/${this.auth.currentUser?.uid}`)
  }

  updateUserData = (userData: Partial<UserData>) => {
    return this.userData.update(userData)
  }
}
