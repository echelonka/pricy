import React from 'react'
import {Area, AreaChart, ResponsiveContainer, Tooltip, XAxis} from 'recharts'
import {ChartDataItem, Timeframe} from '../../types'
import {useTranslation} from 'react-i18next'
import {timeframeData} from '../../constants/timeframeData'
import {locales} from '../../i18n'

type NewProps = {
  data: ChartDataItem[],
  timeframe: Timeframe,
}

type Props = NewProps

const Chart = (props: Props) => {
  const {data, timeframe} = props
  const {i18n} = useTranslation()
  const tickFormatter = (date: string) => {
    const {language} = i18n
    let options: Intl.DateTimeFormatOptions = {}
    if (timeframe === 'week') options = {weekday: 'short'}
    else if (timeframe === 'month') options = {month: 'short', day: '2-digit'}
    else if (timeframe === 'total') options = {month: 'short'}
    return new Intl.DateTimeFormat(locales[language], options).format(new Date(date))
  }

  return (
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
          tickFormatter={tickFormatter}
          dataKey={'date'}
          axisLine={false}
          padding={{left: 20, right: 20}}
          tickLine={false}
        />
      </AreaChart>
    </ResponsiveContainer>
  )
}

export default Chart
