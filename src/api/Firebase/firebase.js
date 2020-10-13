import app from 'firebase/app'
import 'firebase/auth'

const config = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_DATABASE_URL,
  projectId: process.env.REACT_APP_PROJECT_ID,
}

export default class Firebase {
  constructor() {
    app.initializeApp(config)
    this.auth = app.auth()
  }

  // *** Auth API ***

  createUserWithEmailAndPassword = (email, password) => this.auth.createUserWithEmailAndPassword(email, password)

  signInWithEmailAndPassword = (email, password) => this.auth.signInWithEmailAndPassword(email, password)

  updateProfile = profile => this.auth.currentUser.updateProfile(profile)

  signOut = () => this.auth.signOut()
}
