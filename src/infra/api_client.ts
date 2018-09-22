import axios, { AxiosInstance } from 'axios'
import * as configs from '../configs'

// axiosのオプションを返す
interface reqOpProps {
  method: string
  endpoint: string
  data?: any,
  params?: any
  headers?: any
}

interface reqOption {
  endpoint: string, // endpoint url
  callback: any // callback func
  params?: any, // parameter
}

export class APIClient {
  private axios: AxiosInstance

  constructor() {
    this.axios = axios
  }

  private getReqOption(option: reqOpProps) {
    return {
      method: option.method,
      url: configs.env.apiBaseUri + option.endpoint,
      data: option.data,
      params: option.params
    }
  }

  private async _reqData(method: string, endpoint: string, postParams: any, callback: any) {
    method = (method === 'POST') ? method : 'GET';

    let reqOption
    if(method === 'GET') {
      reqOption = {
        method: method,
        endpoint: endpoint,
        params: postParams
      }
    } else {
      let params = new URLSearchParams()
      for(let k in postParams) {
      	params.append(k, postParams[k])
      }
      reqOption = {
        method: method,
        endpoint: endpoint,
        data: params,
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      }
    }
    return await this.axios(this.getReqOption(reqOption))
      .then(res => {
        callback(res.data)
      })
      .catch(err => {
        console.error('error => ', err)
      })
  }

  private postData(option: reqOption) {
    this._reqData('POST', option.endpoint, option.params, option.callback)
  }

  private getData(option: reqOption) {
    this._reqData('GET', option.endpoint, option.params, option.callback)
  }

  fetchLyric(callback: any) {
    const option = {
      endpoint: '/lyric',
      callback: callback,
    }
    this.getData(option)
  }

  fetchLyrics(callback: any) {
    const option = {
      endpoint: '/lyric',
      callback: callback,
    }
    this.getData(option)
  }

  fetchTwitterAuthUrl(callback: any) {
    const options = {
      callback: callback,
      endpoint: '/auth/get_twitter_auth_url',
    }
    this.getData(options)
  }

  sendTwitterVerificationCode(s: string, callback: any) {
    const options = {
      callback: callback,
      endpoint: '/auth/twitter_verification_code',
      params: { verification_code: s }
    }
    this.postData(options)
  }

  fetchNotFoundLyric(callback: any) {
    const options = {
      callback: callback,
      endpoint: "/404_lyric",
    }
    this.getData(options)
  }

}
