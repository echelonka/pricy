import React, {ChangeEvent, useContext, useEffect, useMemo, useState} from 'react'
import classname from 'classnames'
import {useTranslation} from 'react-i18next'
import {ChartDataItem, Timeframe, TimeSeriesRequest, TimeSeriesResponse, UserData, Wallet} from 'types'
import {ExchangerateContext} from 'context/Exchangerate'
import ButtonGroup from '../ButtonGroup'
import Button from '../Button/Button'
import Chart from './Chart'
import {timeframeData} from '../../constants/timeframeData'
import {FirebaseContext} from '../../context/Firebase'
import currenciesList from 'assets/currencies.json'
// import cryptocurrenciesList from 'assets/cryptocurrencies.json'

type NewProps = {
  loading: boolean,
  wallets: Wallet[],
}
type Props = NewProps & Omit<React.ComponentProps<'section'>, keyof NewProps>

const Overview = (props: Props) => {
  const {className, loading, wallets} = props
  const classNames = classname(
    className,
  )
  const {t} = useTranslation()
  const firebase = useContext(FirebaseContext)
  const exchangerate = useContext(ExchangerateContext)
  const [timeSeriesResponse, setTimeSeriesResponse] = useState<TimeSeriesResponse | null>(null)
  const [baseCurrency, setBaseCurrency] = useState<string | undefined>(undefined)
  const [timeframe, setTimeframe] = useState<Timeframe>('week')
  const currencies: string[] = useMemo(() => {
    return wallets.reduce((currencies: string[], {currency}) => {
      if (!currencies.includes(currency)) currencies.push(currency)
      return currencies
    }, [])
  }, [wallets])
  const currenciesBalance: Map<string, number> = useMemo(() => {
    const currenciesBalance = new Map()
    wallets.forEach(({balance, currency}) => currenciesBalance.set(currency, balance))
    return currenciesBalance
  }, [wallets])
  const data: ChartDataItem[] = useMemo(() => {
    if (!timeSeriesResponse) return []
    return Object.keys(timeSeriesResponse.rates).reduce((newData: any[], date) => {
      newData.push({
        date,
        value: Object.keys(timeSeriesResponse.rates[date]).reduce((total, currency) => {
          const balance = currenciesBalance.get(currency) || 0
          const rate = timeSeriesResponse.rates[date][currency] / (10 ** 6)
          return total + (rate > 0 ? balance / rate : balance * rate)
        }, 0)
      })
      return newData
    }, [])
  }, [currenciesBalance, timeSeriesResponse])

  useEffect(() => {
    const userDataListener = firebase!.userData.onSnapshot(snapshot => {
      setBaseCurrency((snapshot.data() as UserData).base_currency)
    })
    return () => userDataListener()
  }, [firebase])

  useEffect(() => {
    const fetchData = async () => {
      const now = new Date()
      const startDate = new Date()
      const offset = (24 * 60 * 60 * 1000) * timeframeData[timeframe].offset
      const newTime = now.getTime() - offset
      startDate.setTime(newTime < exchangerate!.epoch.getTime() ? exchangerate!.epoch.getTime() : newTime)
      const requestObj: TimeSeriesRequest = {
        start_date: startDate.toISOString().split('T')[0],
        end_date: now.toISOString().split('T')[0],
        symbols: currencies.join(','),
        source: 'crypto',
        amount: 10 ** 6,
        base: baseCurrency,
      }
      const response = await exchangerate!.getTimeSeries(requestObj)
      setTimeSeriesResponse(response)
    }
    if (wallets.length) fetchData()
  }, [baseCurrency, currencies, exchangerate, timeframe, wallets])

  const changeBaseCurrency = async ({target: {value}}: ChangeEvent<HTMLSelectElement>) => {
    await firebase!.updateUserData({base_currency: value})
  }

  return (
    <section
      className={classNames}
    >
      <h2>{t('overview')}</h2>
      <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap'}}>
        <p>
          <select name="base_currency" id="base_currency" value={baseCurrency} onChange={changeBaseCurrency}>
            <optgroup label={'General currencies'}>
              {Object.values(currenciesList).map(({code, name}) => (
                <option key={code} value={code}>{name}</option>
              ))}
            </optgroup>
            {/*<optgroup label={'Cryptocurrencies'}>*/}
            {/*  {Object.keys(cryptocurrenciesList).map(key => (*/}
            {/*    <option key={key} value={key}>{(cryptocurrenciesList as any)[key].name}</option>*/}
            {/*  ))}*/}
            {/*</optgroup>*/}
          </select>
        </p>
        <ButtonGroup>
          {Object.keys(timeframeData).map(key => (
            <Button
              key={key}
              onClick={() => setTimeframe(key as Timeframe)}
              active={timeframe === key}
            >
              {t(key)}
            </Button>
          ))}
        </ButtonGroup>
      </div>
      {loading ? (
        <ChartLoader/>
      ) : (
        <Chart data={data} timeframe={timeframe} />
      )}
    </section>
  )
}

const ChartLoader = () => {
  return (
    <div>Loading chart...</div>
  )
}

export default Overview
