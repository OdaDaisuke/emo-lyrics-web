import { APIClient } from '../infra'
import { LyricProps } from '../data'

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

  shuffle(lyrics: LyricProps[]) {
    const SHUFFLE_ROUND = 55
    const len = lyrics.length
    for(let i = 0; i < SHUFFLE_ROUND; ++i) {
      const r1 = parseInt(String(Math.random() * len))
      const r2 = parseInt(String(Math.random() * len))
      const tmp = lyrics[r1]
      lyrics[r1] = lyrics[r2]
      lyrics[r2] = tmp
    }
    return lyrics
  }

}
