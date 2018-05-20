import { APIClient } from '../infra'

export class LyricService {

  getSome(callback: any) {
    APIClient.getLyrics(callback)
  }

  get(callback: any) {
    APIClient.getLyric(callback)
  }

  create(options: any, callback: any) {
    APIClient.create(options, callback)
  }

}
