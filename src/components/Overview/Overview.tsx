import React, {ChangeEvent, useContext, useEffect, useMemo, useState} from 'react'
import classname from 'classnames'
import {useTranslation} from 'react-i18next'
import {TimeSeriesRequest, TimeSeriesResponse, Wallet} from 'types'
import {ExchangerateContext} from 'context/Exchangerate'
import {Area, AreaChart, ResponsiveContainer, Tooltip, XAxis} from 'recharts'

type NewProps = {
  loading: boolean,
  wallets: Wallet[],
}
type Props = NewProps & Omit<React.ComponentProps<'section'>, keyof NewProps>
type Timeframe = 'total' | 'month' | 'week'

const timeframeData = {
  total: {
    offset: 365,
    tickInterval: 30,
    tickFormatter: (date: string) => new Date(date).toDateString().slice(4, 7)
  },
  month: {
    offset: 30,
    tickInterval: 5,
    tickFormatter: (date: string) => new Date(date).toDateString().slice(4, 10)
  },
  week: {
    offset: 7,
    tickInterval: 0,
    tickFormatter: (date: string) => new Date(date).toDateString().slice(4, 10)
  }
}

const Overview = (props: Props) => {
  const {className, loading, wallets} = props
  const classNames = classname(
    className,
  )
  const {t} = useTranslation()
  const exchangerate = useContext(ExchangerateContext)
  const [timeSeriesResponse, setTimeSeriesResponse] = useState<TimeSeriesResponse | null>(null)
  const baseCurrency: string = 'UAH'
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
  const data: any[] = useMemo(() => {
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

  const changeTimeframe = ({target: {value}}: ChangeEvent<HTMLSelectElement>) => setTimeframe(value as Timeframe)

  return (
    <section
      className={classNames}
    >
      <h2>{t('overview')}</h2>
      <p>Base currency is <b>{baseCurrency}</b></p>
      <p>Time frame is <b>{timeframe}</b></p>
      <select name={'timeframe'} value={timeframe} onChange={changeTimeframe}>
        {Object.keys(timeframeData).map(key => (
          <option value={key} key={key}>{key}</option>
        ))}
      </select>
      {loading ? (
        <ChartLoader/>
      ) : (
        <ResponsiveContainer width={'100%'} height={300}>
          <AreaChart width={600} height={400} data={data}>
            <defs>
              <linearGradient id={'balance-gradient'} x1={0} y1={0} x2={0} y2={1}>
                <stop offset={'5%'} stopColor={'#8884d8'} stopOpacity={0.8}/>
                <stop offset={'95%'} stopColor={'#8884d8'} stopOpacity={0}/>
              </linearGradient>
            </defs>
            <Area type={'monotone'} dataKey={'value'} stroke={'#8884d8'} strokeWidth={3} fill={'url(#balance-gradient)'}/>
            <Tooltip/>
            <XAxis
              interval={timeframeData[timeframe].tickInterval}
              dataKey={'date'}
              axisLine={false}
              padding={{left: 20, right: 20}}
              tickLine={false}
              tickFormatter={timeframeData[timeframe].tickFormatter}
            />
          </AreaChart>
        </ResponsiveContainer>
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
