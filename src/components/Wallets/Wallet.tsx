import React from 'react'
import styles from './Wallets.module.scss'
import {Wallet} from 'types'

type Props = Wallet

const WalletCard = (props: Props) => {
  const {name, balance, currency} = props

  return (
    <div className={styles.card}>
      <h3>{name}</h3>
      <p>{currency}</p>
      <p>{balance}</p>
    </div>
  )
}

export default WalletCard
