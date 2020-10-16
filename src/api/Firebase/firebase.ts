import app from 'firebase/app'
import 'firebase/auth'

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
  public auth: app.auth.Auth;

  constructor() {
    app.initializeApp(config)
    this.auth = app.auth()
  }

  // *** Auth API ***

  createUserWithEmailAndPassword = (email: string, password: string) => {
    return this.auth.createUserWithEmailAndPassword(email, password)
  }

  signInWithEmailAndPassword = (email: string, password: string) => {
    return this.auth.signInWithEmailAndPassword(email, password)
  }

  // TODO Fix type
  updateProfile = (profile: UserProfile) => {
    return (this.auth as any).currentUser.updateProfile(profile)
  }

  signOut = () => this.auth.signOut()
}
