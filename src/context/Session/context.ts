import React from 'react'
import firebase from 'firebase'

export type AuthUserContextType = firebase.User | null

const AuthUserContext = React.createContext<AuthUserContextType>(null)

export default AuthUserContext
