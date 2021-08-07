import React, {useContext, useEffect, useMemo, useState} from 'react'
import classname from 'classnames'
import styled from 'styled-components'
import {useTranslation} from 'react-i18next'
import {ChartDataItem, Timeframe, TimeSeriesRequest, TimeSeriesResponse, UserData, Wallet} from 'types'
import {ExchangerateContext} from 'context/Exchangerate'
import {timeframeData} from '../../constants/timeframeData'
import {FirebaseContext} from '../../context/Firebase'
import currenciesList from 'assets/currencies.json'
// import cryptocurrenciesList from 'assets/cryptocurrencies.json'
// Components
import Button from '../Button'
import ButtonGroup from '../ButtonGroup'
import Chart from './Chart'
import Dropdown, {DropdownOption} from '../Dropdown'

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
  const generalCurrencies = useMemo(() => {
    return Object.values(currenciesList)
      .map(({ code, name }) => ({ id: code, name }))
      .sort((a, b) => {
        return a.name.toLowerCase().localeCompare(b.name.toLowerCase())
      })
  }, [])
  const selectedCurrency = useMemo(() => {
    return generalCurrencies.find(({ id }) => id === baseCurrency)
  }, [baseCurrency, generalCurrencies])

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

  const changeBaseCurrency = async ({ id }: DropdownOption) => {
    await firebase!.updateUserData({ base_currency: id as string })
  }

  return (
    <section
      className={classNames}
    >
      <h2>{t('overview')}</h2>
      <OverviewTopBar>
        <Dropdown
          onChange={changeBaseCurrency}
          options={generalCurrencies}
          placeholder={t('baseCurrency')}
          value={selectedCurrency}
        />
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
      </OverviewTopBar>
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

const OverviewTopBar = styled.div`
  margin-bottom: 2rem;
  display: grid;
  row-gap: 1rem;
  justify-items: center;
  
  ${({ theme }) => theme.breakpoints.phones`
    grid-template-columns: 200px auto;
    justify-content: space-between;
  `}
`
OverviewTopBar.displayName = 'OverviewTopBar'

export default Overview
