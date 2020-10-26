import React from 'react'
import styles from './Wallets.module.scss'
import {Currency, Wallet} from 'types'
import currencies from 'assets/currencies.json'

type Props = Wallet

const WalletCard = (props: Props) => {
  const {name, balance, currency} = props
  const currencyInfo = (currencies as Record<string, Currency>)[currency]

  return (
    <article className={styles.card}>
      <div className={styles.symbol}>{currencyInfo.symbol_native}</div>
      <section>
        <header>
          <h3>{name}</h3>
        </header>
        <p className={styles.balance}>{balance.toFixed(2)} {currency}</p>
      </section>
    </article>
  )
}

export default WalletCard
