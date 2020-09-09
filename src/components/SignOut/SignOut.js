import React from 'react'
import {withFirebase} from 'context/withFirebase'
import styles from './SignOut.module.scss'

const SignOut = ({firebase}) => {
  return (
    <button className={styles.button} onClick={firebase.signOut}>Sign Out</button>
  )
}

export default withFirebase(SignOut)
