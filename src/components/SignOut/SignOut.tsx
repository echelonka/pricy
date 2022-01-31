import React from 'react'
import {useTranslation} from 'react-i18next'
import styles from './SignOut.module.scss'

import {useAuth} from 'context/AuthProvider'

const SignOut = () => {
  const {signOut} = useAuth()
  const {t} = useTranslation()

  return (
    <button className={styles.button} onClick={signOut}>{t('signOut')}</button>
  )
}

export default SignOut
