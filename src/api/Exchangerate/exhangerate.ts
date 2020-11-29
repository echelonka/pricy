import {ConvertRequest, ConvertResponse, TimeSeriesRequest, TimeSeriesResponse} from 'types'

export default class Exchangerate {
  private readonly api: string
  public readonly epoch: Date

  constructor() {
    this.api = process.env.REACT_APP_EXCHANGE_API as string
    this.epoch = new Date('2020-05-07')
  }

  private makeRequest = async <T, R>(url: string, request?: R): Promise<T> => {
    const params = new URLSearchParams(request as any).toString()
    const response = await fetch(`${url}?${params}`)
    return await response.json()
  }

  convertCurrency = async (request: ConvertRequest) => {
    return await this.makeRequest<ConvertResponse, ConvertRequest>(`${this.api}/convert`, request)
  }

  getTimeSeries = async (request: TimeSeriesRequest) => {
    return await this.makeRequest<TimeSeriesResponse, TimeSeriesRequest>(`${this.api}/timeseries`, request)
  }
}
