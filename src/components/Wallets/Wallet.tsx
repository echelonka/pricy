import React from 'react'
import styles from './Wallets.module.scss'
import {CryptoCurrency, Currency, Wallet} from 'types'
import currencies from 'assets/currencies.json'
import cryptocurrencies from 'assets/cryptocurrencies.json'

type Props = Wallet

const WalletCard = (props: Props) => {
  const {name, balance, currency} = props
  const currencyInfo: Currency | CryptoCurrency = (currencies as Record<string, Currency>)[currency]
    || (cryptocurrencies as Record<string, CryptoCurrency>)[currency]

  return (
    <article className={styles.card}>
      <div className={styles.symbol}>{currencyInfo.symbol}</div>
      <section>
        <header>
          <h3>{name}</h3>
        </header>
        <p className={styles.balance}>{balance.toFixed(currencyInfo.decimal_digits)} {currency}</p>
      </section>
    </article>
  )
}

export default WalletCard
