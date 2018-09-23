import axios, { AxiosInstance } from 'axios'
import * as configs from '../configs'
import * as interfaces from '../interfaces'

export class APIClient {
  private axios: AxiosInstance

  constructor() {
    this.axios = axios.create({
      baseURL: configs.env.apiBaseUri,
    })
  }

  async fetchLyric(): Promise<interfaces.Lyric> {
    const res = await this.axios.get<interfaces.Lyric>('/lyric')
    return res.data
  }

  async fetchLyrics(): Promise<interfaces.Lyric[]> {
    const res = await this.axios.get<interfaces.Lyric[]>('/lyrics')
    return res.data
  }

  async fetchTwitterAuthUrl(): Promise<any> {
    const res = await this.axios.get<any>('/auth/get_twitter_auth_url')
    return res.data
  }

  async sendTwitterVerificationCode(code: string): Promise<any> {
    const params = {
      verification_code: code,
    }
    const res = await this.axios.post<any>('/auth/twitter_verification_code', params)
    return res.data
  }

  async fetchNotFoundLyric(): Promise<interfaces.Lyric> {
    const res = await this.axios.get<interfaces.Lyric>('/404_lyric')
    return res.data
  }

}