import React from 'react'
import {User} from 'firebase'

export type AuthUserContextType = User | null

const AuthUserContext = React.createContext<AuthUserContextType>(null)

export default AuthUserContext
