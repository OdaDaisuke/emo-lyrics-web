import axios, { AxiosInstance } from 'axios'
import * as configs from '../configs'
import * as interfaces from '../interfaces'

export class APIClient {
  private axios: AxiosInstance

  constructor() {
    this.axios = axios.create({
      baseURL: configs.env.apiBaseUri,
    })

    this.axios.interceptors.request.use((req) => {
      const header = {
        'Content-Type': 'application/x-www-form-urlencoded',
      }
      req.headers = Object.assign({}, req.headers, header)
      return req
    })
  }

  async fetchLyric(): Promise<interfaces.Lyric[]> {
    const res = await this.axios.get<interfaces.Lyric[]>('/lyric')
    return res.data
  }

  async fetchNotFoundLyric(): Promise<interfaces.Lyric> {
    const res = await this.axios.get<interfaces.Lyric>('/404_lyric')
    return res.data
  }

  async signup(account: interfaces.Account) {
    let params = this.buildParams(account)
    const res = await this.axios.post<interfaces.Account>('/account', params)
    return res.data
  }

  async signin(id: string) {
    const res = await this.axios.get<interfaces.Account>(`/account/me?twitterId=${id}`)
    return res.data
  }

  private buildParams(keyVal: any) {
    let params = new URLSearchParams()
    for(let k in keyVal) {
      params.append(k, keyVal[k])
    }
    return params
  }

}