import React from 'react'
import styles from './Wallets.module.scss'
import classname from 'classnames'
import ContentLoader from 'react-content-loader'
import {Wallet} from 'types'
import WalletCard from './Wallet'
import Button from 'components/Button/Button'
import {useTranslation} from 'react-i18next'

type NewProps = {
  loading: boolean,
  wallets: Wallet[],
}

type Props = NewProps & Omit<React.ComponentProps<'section'>, keyof NewProps>

const Wallets = (props: Props) => {
  const {loading, wallets, className, ...attrs} = props
  const classNames = classname(
    className,
  )
  const {t} = useTranslation()

  return (
    <section className={classNames} {...attrs}>
      <header className={styles.header}>
        <h2>{t('wallets')}</h2>
        <Button>+ {t('addWallet')}</Button>
      </header>
      <div className={styles.container}>
        {loading ? (
          <>
            <WalletLoader/>
            <WalletLoader/>
            <WalletLoader/>
          </>
        ) : (
          wallets.map(wallet => <WalletCard key={wallet.id} {...wallet} />)
        )}
      </div>
    </section>
  )
}

const WalletLoader = () => {
  return (
    <article className={styles.card}>
      <ContentLoader
        height={90}
        gradientRatio={.75}
        backgroundColor={'#fff'}
        backgroundOpacity={.5}
        foregroundOpacity={.25}
        width={'100%'}
      >
        <rect x="0" y="0" rx="4" ry="4" width="150" height="20"/>
        <rect x="0" y="35" rx="4" ry="4" width="200" height="15"/>
        <rect x="0" y="65" rx="4" ry="4" width="100" height="20"/>
      </ContentLoader>
    </article>
  )
}

export default Wallets
